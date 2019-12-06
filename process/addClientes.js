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

var pedidos = 0;
db.collection("Productos").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(id);
        //var id = "'" + dato.key + "'";
        pedidos++;
        console.log(pedidos);
        document.getElementById("pedidos").innerHTML = pedidos;
    });
});

function logout(){
    alert("Haz cerrado sesion");
	firebase.auth().signOut().then(function() {
		
	  	window.location.href="index.html";
	}).catch(function(error) {
		var errorMessage = error.message;
		alert(errorMessage);
	});

}

function redirec(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    window.location.href="clientes.html";
	  } else {
	    window.location.href="index.html";
	  }
	});
}

//mostrar datos
var tablaClientes = document.getElementById('tablaClientes');
db.collection("clientes").onSnapshot((querySnapshot) => {
    tablaClientes.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tablaClientes.innerHTML +=
            `<tr>
                  <td>${doc.data().nombre}</th>
                  <td>${doc.data().correo}</td>
                  <td>${doc.data().telefono }</td>
                  <td>${doc.data().direccion}</td>
                  <td>${doc.data().sexo}</td>
                  <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>

                <button class="btn btn-warning" data-toggle="modal" data-target="#registrarEmpleado" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().correo}','${doc.data().telefono}','${doc.data().direccion}','${doc.data().sexo}')">Editar</button></td>
                </tr>
        `
    });
});