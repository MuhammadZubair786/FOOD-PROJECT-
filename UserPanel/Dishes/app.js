var dish_key = localStorage.getItem("current_Cat")
console.log(dish_key)

async function getDishes(){
    await firebase.database().ref("dishes").child(dish_key).get()
    .then((snap)=>{
        console.log(snap.val())
    })
    .catch((e)=>{
        console.log(e)
    })
}
getDishes()