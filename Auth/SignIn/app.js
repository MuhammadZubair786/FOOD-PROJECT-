let email = document.getElementById("email")
let password = document.getElementById("password")



async function Login() {

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(async (snap) => {
            console.log(snap.user.uid)
            let userId = snap.user.uid

            await firebase.database().ref("users").child(userId).get()
                .then((snapshot) => {
                    console.log(snapshot.val())
                    if (snapshot.val() != undefined && snapshot.val()["userType"] == "user") {
                        console.log("user panel")
                    }
                    else if (snapshot.val() != undefined && snapshot.val()["userType"] == "admin") {
                        console.log("admin panel")

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