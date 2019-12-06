
// SCRIPT PARA LA CONEXION A FIREBASE
firebase.initializeApp({
    apiKey: "AIzaSyCZTfcGWvoLhtGWKm1JIxb-_wWCVipxiDo",
    authDomain: "reservacion-bc34e.firebaseapp.com",
    databaseURL: "https://reservacion-bc34e.firebaseio.com",
    projectId: "reservacion-bc34e",
    storageBucket: "reservacion-bc34e.appspot.com",
    messagingSenderId: "1068494562428",
    appId: "1:1068494562428:web:b6faeed7e86491067315f9"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();



 
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
});

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.href = "login.html";
    }).catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
}
