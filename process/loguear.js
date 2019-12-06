
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

 
function loguear() {
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(correo, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
    db.collection("Admin").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().correo}`);
            var userL = document.getElementById("correo").value;
            var passL = document.getElementById('password').value;
            var userDB = doc.data().correo;
            var passDB = doc.data().password;
            //console.log(userDB);		
            if ((userDB == userL) && (passDB == passL)) {
                alert("Bienvenido, Al Administrador burgues: " + userDB);
                window.location.href = "admin.html";
            } else {
                alert("Error al loguearse, Email/Password, incorrecta: " + userDB);
            }
        });
    });
}
