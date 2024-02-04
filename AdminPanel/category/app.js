var image = document.getElementById("image")
var category = document.getElementById("category")
var model1 = document.getElementsByClassName("modal")
var btn = document.getElementById("btn")
var Data = document.getElementById("Data")
let cat_image = document.getElementById("cat_image")
let check = false
let currentEditKey = ""

var dbref = firebase.database().ref("category")
// console.log(model1[0].modal("hide"))

var imageUrl = ""

image.addEventListener("change", function (e) {
    console.log(e.target.files[0])
    imageUpload(e)
})

function imageUpload(e) {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(`Category/${e.target.files[0].name}`).put(e.target.files[0]);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress)
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {

            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                imageUrl = url
                btn.disabled = false
                cat_image.src = imageUrl

                console.log('File available at', url);

            });
        }
    );

}


async function AddCategory() {
    btn.disabled = true
    var response = ValidateData()
    if(response){
        if (check == false) {

            var key = dbref.push().getKey();
            console.log(key)
    
            var categoryData = {
                categoryname: category.value,
                categoryimage: imageUrl,
                categoryKey: key
            }
            await dbref.child(key).set(categoryData)
    
            var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'));
            myModal.hide();
            Toastify({
    
                text: "Add New category",
    
                duration: 3000
    
            }).showToast();
        }
        else {
            console.log("edit function hit ")
            EditCategoryApi()
          
        }
        viewCategory()
    category.value = ""
    imageUrl = ""

    }
    else{
        btn.disabled = false
        Toastify({
    
            text: "Enter Correct data",

            duration: 3000

        }).showToast();
    }
    

    

}

function viewCategory() {
    Data.innerHTML = ""

    dbref.get()
        .then((snapshoot) => {
            console.log(snapshoot.val())
            if (snapshoot.val() != undefined || snapshoot.val() != null) {
                var dataValue = Object.values(snapshoot.val())
                // console.log(dataValue)
                for (var i in dataValue) {
                    console.log(i)
                    Data.innerHTML += `
                <tr>
      <th scope="row">${(Number(i) + 1)}</th>
      <td>${dataValue[i]["categoryname"]}</td>
      <td>
      <img src="${dataValue[i]["categoryimage"]}"  />
      </td>
      <td>
      <button class='btn btn-danger' id='${dataValue[i]["categoryKey"]}' onclick="DeletCategory(this)">Delete</button>
      <button class='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal" id='${dataValue[i]["categoryKey"]}' onclick="EditFunctionText(this)">Edit</button>
     

      </td>
    </tr>
                `

                }

            }
        })

}

function EditFunctionText(e) {
    console.log(e)
    btn.innerText = "Update Category "
    console.log(e.parentNode.parentNode.childNodes[5].childNodes[1].src)
    cat_image.src = e.parentNode.parentNode.childNodes[5].childNodes[1].src
    category.value = e.parentNode.parentNode.childNodes[3].innerText
    cat_image.style.display = "inline"
    cat_image.style.margin = 2 + "px"
    imageUrl=e.parentNode.parentNode.childNodes[5].childNodes[1].src
    check = true
    currentEditKey = e.id
    btn.disabled=false


}

function AddCategoryText() {
    btn.innerText = "Add Category "
    category.value = ""
    imageUrl=""
    check = false
    btn.disabled=true

    cat_image.style.display = "none"


}

function DeletCategory(elem) {
    console.log(elem.parentNode.parentNode)
    elem.parentNode.parentNode.remove()
    dbref.child(elem.id).remove()


}

async function EditCategoryApi(){
    console.log(currentEditKey)

    var updateobject = {
        categoryname: category.value,
        categoryimage: imageUrl,
    }
   await dbref.child(currentEditKey).update(updateobject)


    Toastify({

        text: "Edit  category",

        duration: 3000

    }).showToast();
    
    var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'));
    myModal.hide();
}

function ValidateData(){
    if(category.value!="" &&  imageUrl !=""){
        return true
    }
    else{
        return false
    }

}

viewCategory()


