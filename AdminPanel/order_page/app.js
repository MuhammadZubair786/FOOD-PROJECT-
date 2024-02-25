var view_order = document.getElementById("view_order")

async function getAllOrder(status) {

  view_order.innerHTML = ""

  await firebase.database().ref("allorders").get()
    .then((snap) => {

      var data = Object.values(snap.val())
      for (var i = 0; i < data.length; i++) {

        if (data[i]["status"] == status || status == "all") {

          console.log(data[i])
          data[i]["status"] == "pending" ?

            view_order.innerHTML += `
            <div class="col col-lg-4">
          <div class="card" >
            <div class="card-body">
              <h5 class="card-title" id='${data[i]["userId"]}'>${data[i]["userName"]}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Total Amount : ${data[i]["total_amount"]}</h6>
              <p class="card-text">Total No Of Dishes :  ${data[i]["dishes"].length} </p>
            
              <a href="#" class="btn btn-danger" id='${data[i]['orderKey']}' onclick='order_Status_Update(this)'>Reject</a>
              <a href="#" class="btn btn-primary">Views Order </a>
              <a href="#" class="btn btn-success"  id='${data[i]['orderKey']}' onclick='order_Status_Update(this)'>Accept</a>
              
            </div>
          </div>

        </div>
            `
            :

            view_order.innerHTML += `
            <div class="col col-lg-4">
          <div class="card" >
            <div class="card-body">
              <h5 class="card-title" id='${data[i]["userId"]}'>${data[i]["userName"]}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Total Amount : ${data[i]["total_amount"]}</h6>
              <p class="card-text">Total No Of Dishes :  ${data[i]["dishes"].length} </p>
            
              
              <a href="#" class="btn btn-primary">Views Order </a>
             
              
            </div>
          </div>

        </div>
            `


        }


      }
    })

}
getAllOrder("all")

async function order_Status_Update(e) {
  var userId = e.parentNode.childNodes[1].id
  var order_status = e.innerText.toLowerCase()
  var order_key = e.id


  await firebase.database().ref("allorders").child(order_key).update({
    "status": order_status
  })

  await firebase.database().ref("userorders").child(userId).child(order_key).update({
    "status": order_status
  })

  e.parentNode.parentNode.parentNode.remove()

  // e.remove()


}