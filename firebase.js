// Initialize Firebase
var config = {
    apiKey: "AIzaSyBgQE_DFr-Q0lreomoqeEF3CkZV38oCn7Y",
    authDomain: "time-6c867.firebaseapp.com",
    databaseURL: "https://time-6c867.firebaseio.com",
    projectId: "time-6c867",
    storageBucket: "",
    messagingSenderId: "340408137782"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

$('#trigger').click(function () {

    console.log('clicked')

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log('hi');
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    })
});