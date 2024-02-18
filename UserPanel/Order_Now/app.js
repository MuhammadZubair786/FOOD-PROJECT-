var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card"))
var order_data = document.getElementById("order_data")
var final_price = document.getElementById("final_price")

var total_price = 0

function getAllAddToCart(){
    for(var index in add_to_Cart){
        total_price += Number(add_to_Cart[index]["quantity"]*add_to_Cart[index]["dish_price"])
        order_data.innerHTML += `
        <tr>
        <th scope="row">${Number(Number(index)+1)}</th>
        <td>${add_to_Cart[index]["dish_name"]}</td>
        <td>${add_to_Cart[index]["quantity"]}</td>
        <td>${add_to_Cart[index]["dish_price"]}</td>
        <td>${add_to_Cart[index]["quantity"]*add_to_Cart[index]["dish_price"]}</td>
      
      </tr>
        `
    }
    final_price.innerText = total_price   

}
getAllAddToCart()
