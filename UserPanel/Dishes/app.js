var dish_key = localStorage.getItem("current_Cat")
var dish_card = document.getElementById("dish_card")
var add_to_Card_List = localStorage.getItem("add_to_card")
var userId = localStorage.getItem("userId")
var maindata = []
if (userId == null) {
    window.location.href = "../../Auth/SignIn/index.html"

}

else if (dish_key == null) {
    // alert("you delete key from local Storage ")
    window.location.href = "../Home/index.html"

}
else {
    getDishes()
}
async function getDishes() {
    dish_card.innerHTML = ""
    await firebase.database().ref("dishes").child(dish_key).get()
        .then((snap) => {
            // console.log(snap.val())
            var data = Object.values(snap.val())
            // console.log(data)
            maindata = data;
            for (var index in data) {

                dish_card.innerHTML += `
            <div class="col col-lg-4 col-md-6 col-sm-6 col-12 " >
            <div class="card" style="">
                <img src=${data[index]["dish_image"]} class="card-img-top" alt="..." > 
                <div class="card-body">
                  <h5 class="card-title">${data[index]["dish_name"]}</h5>
                  <h5 class="card-title">Rs${data[index]["dish_price"]}</h5>
                  <a href="#" class="btn btn-primary" id=${index} onclick=AddToCard(this)>Add To Card</a>
                </div>
              </div>

        </div>
            
            `

            }
        })
        .catch((e) => {
            console.log(e)
        })
}

// arr-=[]
// arr[0]
// arr[2]
// var data = {
//     name:"jcjbcb"
// }

//local storage =>string
//array 

function AddToCard(e) {

    var data = JSON.parse(localStorage.getItem("add_to_card")) ?? []

    var i = 0;
    var check = false
    while (i < data.length) {
        console.log(data[i]["dish_key"])
        if (maindata[e.id]["dish_key"] == data[i]["dish_key"]) {
            check = true
            break
        }
        i++
    }
    if (check == false) {
        maindata[e.id]["userId"] = userId
        maindata[e.id]["quantity"] = 1
        console.log(maindata)
        data.push(maindata[e.id])
        localStorage.setItem("add_to_card", JSON.stringify(data))
        console.log(data)
        Toastify({

            text: "Add To cart ",
            className: "Toastify",

            duration: 3000,
            style: {
                background: "green"
            },


        }).showToast();


    }
    else {
        Toastify({

            text: "Add To cart Already",
            className: "Toastify",

            duration: 3000,
            style: {
                background: "red"
            },


        }).showToast();

    }
}
