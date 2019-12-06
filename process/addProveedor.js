//<!--script de firebse--> ESTOS 2 LINKS COLOCARLOS EN EL HEAD DE SUS HTML
//   <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"> </script>
//  <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase-firestore.js"> </script>
//
//Y EL ARCHIVO .JS AL FINAL AL FINALIZAR TODOS LOS COMPONENTES HTML

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

//guardar datos
function RegistrarProve() {
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var correo = document.getElementById('correo').value;
    var telefono = document.getElementById('telefono').value;

    db.collection("proveedores").add({
            nombre: nombre,
            descripcion: descripcion,
            correo: correo,
            telefono: telefono,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            nombre = document.getElementById('nombre').value = '';
            descripcion = document.getElementById('descripcion').value = '';
            correo = document.getElementById('correo').value = '';
            telefono = document.getElementById('telefono').value = '';
            alert(" Registro Exitosamente!!");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//mostrar datos
//tablaS ES el id dela tabla <tbody id="tablaS"> donde se imprimira la tabla
var tablaProvetablaProve = document.getElementById('tablaProve');
db.collection("proveedores").onSnapshot((querySnapshot) => {
    tablaProve.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tablaProve.innerHTML +=
            `<tr>
                  <td>${doc.data().nombre}</th>
                 <td>${doc.data().descripcion}</td>
                  <td>${doc.data().correo}</td>                  
                 <td>${doc.data().telefono}</td>

                  <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>

                <button class="btn btn-warning" data-toggle="modal" data-target="#registrarEmpleado" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().descripcion}','${doc.data().correo}','${doc.data().telefono}')">Editar</button></td>
                </tr>
        `
        //,'${doc.data().descripcion}','${doc.data().correo}','${doc.data().telefono}'
    });
});
//borrar datos
function eliminar(id) {
    db.collection("proveedores").doc(id).delete().then(function () {
        alert("Datos  Eliminados Exitosamente!!");
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//actualizar datos
function editar(id, nombre, descripcion, correo, telefono) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('correo').value = correo;
    document.getElementById('telefono').value = telefono;


    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';
    boton.onclick = function () {
        var washingtonRef = db.collection("proveedores").doc(id);
        var nombre = document.getElementById('nombre').value;
        var descripcion = document.getElementById('descripcion').value;
        var correo = document.getElementById('correo').value;
        var telefonoo = document.getElementById('telefono').value;

        var washingtonRef = db.collection("proveedores").doc(id);
        return washingtonRef.update({
                nombre: nombre,
                descripcion: descripcion,
                correo: correo,
                telefonoo: telefonoo,
            })
            .then(function () {
                alert("Datos Editados Exitosamente!!");
                console.log("Document successfully updated!");
                boton.innerHTML = 'Registrar';
                form.reset();
            })
            .catch(function (error) {

                console.error("Error updating document: ", error);
            });
    }
}
