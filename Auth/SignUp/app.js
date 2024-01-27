let email = document.getElementById("email")
let password = document.getElementById("password")
let userName = document.getElementById("name")

async function createAccount() {

    await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(async (snap) => {
            console.log(snap.user.uid)
            let userId = snap.user.uid //unique

            var object = {
                email:email.value,
                password:password.value,
                userName:userName.value,
                userType:"user",
                userId,

            }

            //set data
           await  firebase.database().ref("users").child(snap.user.uid)
            .set(object)

            window.location.href="../SignIn/index.html"


            Toastify({

                text: "Account create and save db",

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
