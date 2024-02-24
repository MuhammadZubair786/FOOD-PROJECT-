
async function getAllOrder(){
    await firebase.database().ref("allorders").get()
    .then((snap)=>{
        var data = Object.values(snap.val())
        for(var i=0;i<data.length;i++){
            console.log(data[i])

        }
    })

}
getAllOrder()