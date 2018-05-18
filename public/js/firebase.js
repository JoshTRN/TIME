// Initialize Firebase
// var db = require('../models');

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
$('#signin').click(function () {

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.

        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        console.log(user.photoURL);

        $.post('/api/users',{ 
            "user": user.email,
            "picURL": user.photoURL
        },
         function (data) {
            console.log('user sent');

            location.reload();
        })
        
        app.get('/'+user.email+"/tasks")

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

$('#logout').click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.

        $.get('/logout');
        console.log('signed out');
    }).catch(function (error) {
        // An error happened.
    });
});