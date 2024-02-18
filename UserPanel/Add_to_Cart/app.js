var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card")) //local storage
var add_to_cart_div = document.getElementById("add_to_cart")
var order_btn = document.getElementById("order-now")
console.log(add_to_Cart)

function getAllAddToCart() {
    add_to_cart_div.innerHTML = ""
    if(add_to_Cart.length>=1){
        order_btn.style.display="inline"
    }
    else{
        order_btn.style.display="none"

    }
    for (var index in add_to_Cart) {
        add_to_cart_div.innerHTML += `
        <div class="col col-lg-4 col-md-6 col-sm-6 col-12 " >
        <div class="card" style="">
            <img src=${add_to_Cart[index]["dish_image"]} class="card-img-top" alt="..." > 
            <div class="card-body">
              <h5 class="card-title">${add_to_Cart[index]["dish_name"]}</h5>
              <div class="mt-1">
              <button class="btn btn-success "  style='font-size:20px;font-weight:bold'
              id=${index}
              onClick="IncrementQuantity(this)"
              >+</button>

              <p style='display:inline;color:blue;font-size:25px;font-weight:bold;margin:5px'>${add_to_Cart[index]["quantity"]}</p>
            
                <button class="btn btn-danger" style='font-size:20px;font-weight:bold' 
                ${add_to_Cart[index]["quantity"] == 1 ? "disabled" : null}
                id=${index}
                onClick="decrementQuantity(this)"
                >-</button>
              
                <br/>
                <b>Price : Rs .${add_to_Cart[index]["dish_price"]}</b>
                <br/>
                <b>Total Cost  : Rs .${add_to_Cart[index]["dish_price"]*add_to_Cart[index]["quantity"]}</b>
               
              <br/>
              <button class="btn btn-danger "  style='font-size:20px;font-weight:bold'
              id=${index}
              onClick="DeleteFromCart(this)"
           
              >Remove from Add to cart</button>
              

              </div>
              <br/>
            </div>
          </div>

    </div>
        `
    }

}

getAllAddToCart()

function decrementQuantity(e) {
    console.log(e.id)
    console.log(e.parentNode.childNodes[3].innerText)
    if (e.parentNode.childNodes[3].innerText != 1) {
        var counter = e.parentNode.childNodes[3].innerText
        e.parentNode.childNodes[3].innerText = counter - 1
        add_to_Cart[e.id]["quantity"] = Number(counter) - 1
        localStorage.setItem("add_to_card",JSON.stringify( add_to_Cart))
        var cost = Number(add_to_Cart[e.id]["quantity"])*(add_to_Cart[e.id]["dish_price"])
        e.parentNode.parentNode.childNodes[3].childNodes[13].innerText = "Total Cost  : "+cost 
        if (e.parentNode.childNodes[3].innerText == 1) {
            e.disabled = true
        }
        else {

        }

    }


}
function IncrementQuantity(e) {
    console.log(e.id)
    console.log(e.parentNode.parentNode.childNodes[3].childNodes[13].innerText)
 
    var counter = e.parentNode.childNodes[3].innerText //quanantity
    e.parentNode.childNodes[3].innerText = Number(counter) + 1
    add_to_Cart[e.id]["quantity"] = Number(counter) + 1
    localStorage.setItem("add_to_card",JSON.stringify( add_to_Cart))
    var cost = Number(add_to_Cart[e.id]["quantity"])*(add_to_Cart[e.id]["dish_price"])
    e.parentNode.childNodes[5].removeAttribute("disabled")
    e.parentNode.parentNode.childNodes[3].childNodes[13].innerText = "Total Cost  : "+cost 
    // if(Number(e.parentNode.childNodes[3].innerText)>1){
    // e
    // }

}

function DeleteFromCart(e){
    // console.log(e.parentNode.parentNode.parentNode)
    // e.parentNode.parentNode.parentNode.remove()
    
   add_to_Cart.splice([e.id],1)
    localStorage.setItem("add_to_card",JSON.stringify( add_to_Cart))
    getAllAddToCart()



}

