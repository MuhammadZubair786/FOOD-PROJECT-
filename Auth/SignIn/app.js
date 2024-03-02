let email = document.getElementById("email")
let password = document.getElementById("password")



async function Login() {
    console.log(firebase)

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(async (snap) => {
            console.log(snap.user.uid)
            let userId = snap.user.uid

            await firebase.database().ref("users").child(userId).get()
                .then((snapshot) => {
                    console.log(snapshot.val()["userName"])
                    if (snapshot.val() != undefined && snapshot.val()["userType"] == "user") {
                       localStorage.setItem("userId",userId)
                       localStorage.setItem("username",JSON.stringify(snapshot.val()["userName"]) )
                        window.location.replace("../../UserPanel/Home/index.html")

                    }
                    else if (snapshot.val() != undefined && snapshot.val()["userType"] == "admin") {
                        window.location.replace("../../AdminPanel/Dashbaord/index.html")

                    }
                })

            Toastify({
                text: "Account Login",
                duration: 3000

            }).showToast();
        })


        .catch((e) => {
            Toastify({

                text: e.code,

                duration: 3000

            }).showToast();

        })

}