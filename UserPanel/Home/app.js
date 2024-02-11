// console.log(firebase.database())

var category_card = document.getElementById("category_card")
var spinner = document.getElementById("spinner")

async function getAllCategories(){
    await firebase.database().ref("category").get()
    .then((snap)=>{
        var Categorydata = Object.values(snap.val())
        for(var data of Categorydata){
            category_card.innerHTML += `
            <div class="col col-lg-4 col-md-6 col-sm-6 col-12 " >
            <div class="card" style="">
                <img src=${data["categoryimage"]} class="card-img-top" alt="..." > 
                <div class="card-body">
                  <h5 class="card-title">${data["categoryname"]}</h5>
                  <a href="#" class="btn btn-primary" id=${data["categoryKey"]} onclick=ViewDish(this)>View Dish</a>
                </div>
              </div>

        </div>
            `

        }
        // setTimeout(() => {
            spinner.style.display="none"
        // }, 3000);


    })
    .catch((e)=>{
        console.log(e)
    })

}

function ViewDish(e){
    console.log(e.id)
    localStorage.setItem("current_Cat",e.id)
    window.location.href="../Dishes/index.html"

}

getAllCategories()