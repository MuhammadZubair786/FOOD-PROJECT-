var userId = localStorage.getItem("userId")
var order_Data = document.getElementById("order_Data")

async function getAllorders(){
    await firebase.database().ref("userorders").child(userId)
    .get()
    .then((snap)=>{
        console.log(snap.val())
        var data = Object.values(snap.val())
        console.log(data)
        for(var i=0;i<data.length;i++){
            // console.log(data[i])
            order_Data.innerHTML += `
            
            <div class="col col-lg-4">
            <div class="card" style="">
                <div class="card-body">
                  <h5 class="card-title">Order No ${i+1}</h5>
                  <p class="card-text">Total Amount : ${data[i]["total_amount"]}</p>
                  <p class="card-text">Status : ${data[i]["status"]}</p>

                  <a href="#" class="btn btn-primary" id='${data[i]["orderKey"]}' onclick='ViewDetails(this)'>View Order Details</a>
                </div>
              </div>
        </div>
            `

        }
    })
    .catch((e)=>{
        console.log(e)
    })

}

getAllorders()

function ViewDetails(e){
    console.log(e)
    localStorage.setItem("current_order",e.id)
    window.location.href="../Order_Details/index.html"

}