
var image = document.getElementById("image")
var category = document.getElementById("category")
var model1 = document.getElementsByClassName("modal")
var btn = document.getElementById("btn")
var Data = document.getElementById("Data")

var dbref =  firebase.database().ref("category")
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
                console.log('File available at', url);

            });
        }
    );

}


async function AddCategory() {
    btn.disabled = true

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
    viewCategory()


    Toastify({

        text: "Add New category",

        duration: 3000

    }).showToast();



}

function viewCategory() {
    Data.innerHTML=""

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
      <button class='btn btn-success'>Edit</button>
     

      </td>
    </tr>
                `

                }

            }
        })

}

function DeletCategory(elem){
    console.log( elem.parentNode.parentNode)
    elem.parentNode.parentNode.remove()
    dbref.child(elem.id).remove()
   

}

viewCategory()


