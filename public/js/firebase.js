const config = {
    apiKey: "AIzaSyBgQE_DFr-Q0lreomoqeEF3CkZV38oCn7Y",
    authDomain: "time-6c867.firebaseapp.com",
    databaseURL: "https://time-6c867.firebaseio.com",
    projectId: "time-6c867",
    storageBucket: "",
    messagingSenderId: "340408137782"
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
$("#signin").click(function() {
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.

            const { email: user, photoURL: picURL } = result.user;

            $.post(
                "/api/users",
                {
                    user,
                    picURL
                },
                function(data) {
                    console.log("user sent");
                    location.reload();
                }
            );
        })
        .catch(function(error) {
            // Handle Errors here.
            const { code, message, email, credential } = error.code;

            console.log(code, message, email, credential);
        });
});

$("#logout").click(function() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.

            $.post("/logout", () => location.reload());
        })
        .catch(function(error) {
            throw error;
        });
});
