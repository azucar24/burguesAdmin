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

var sucursal = document.getElementById('sucursal');
db.collection("Sucursales").onSnapshot((querySnapshot) => {
    sucursal.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        sucursal.innerHTML +=
            `    
            <option> ${doc.data().nombre}</option>  
            `
    });
});

//guardar datos
function RegistrarEmpleados() {
    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var sexo = document.getElementById('sexo').value;
    var telefono = document.getElementById('telefono').value;
    var dui = document.getElementById('dui').value;
    var area_trabajo = document.getElementById('area_trabajo').value;
    var direccion = document.getElementById('direccion').value;
    var sucursal = document.getElementById('sucursal').value;
    var password = document.getElementById('password').value;

    db.collection("empleados").add({
            nombre: nombre,
            correo: correo,
            sexo: sexo,
            telefono: telefono,
            dui: dui,
            area_trabajo: area_trabajo,
            direccion: direccion,
            sucursal: sucursal,
            password: password,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            nombre = document.getElementById('nombre').value = '';
            correo = document.getElementById('correo').value = '';
            sexo = document.getElementById('sexo').value = '';
            telefono = document.getElementById('telefono').value = '';
            dui = document.getElementById('dui').value = '';
            area_trabajo = document.getElementById('area_trabajo').value = '';
            direccion = document.getElementById('direccion').value = '';
            sucursal = document.getElementById('sucursal').value = '';
            password = document.getElementById('password').value = '';
            alert(" Registro Exitosamente!!");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
//mostrar datos
var tablaE = document.getElementById('tablaE');
db.collection("empleados").onSnapshot((querySnapshot) => {
    tablaE.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tablaE.innerHTML +=
            `<tr>
                  <td>${doc.data().nombre}</th>
                  <td>${doc.data().telefono}</td>
                  <td>${doc.data().sexo }</td>
                  <td>${doc.data().direccion}</td>
                  <td>${doc.data().area_trabajo}</td>
                  <td>${doc.data().dui}</td>
              <td>${doc.data().sucursal}</td>
                  <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>

                <button class="btn btn-warning" data-toggle="modal" data-target="#registrarEmpleado" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().telefono}','${doc.data().sexo}','${doc.data().direccion}','${doc.data().area_trabajo}','${doc.data().dui}','${doc.data().sucursal}','${doc.data().correo}','${doc.data().password}')">Editar</button></td>
                </tr>
        `
    });
});
//borrar datos
function eliminar(id) {
    db.collection("empleados").doc(id).delete().then(function () {
        alert("Datos de Usuario Eliminados Exitosamente!!");
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//actualizar datos
function editar(id, nombre, telefono, sexo, direccion, area_trabajo, dui, sucursal, correo, password) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('telefono').value = telefono;
    document.getElementById('sexo').value = sexo;
    document.getElementById('direccion').value = direccion;
    document.getElementById('area_trabajo').value = area_trabajo;
    document.getElementById('dui').value = dui;
    document.getElementById('sucursal').value = sucursal;
    document.getElementById('correo').value = correo;
    document.getElementById('password').value = password;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';
    boton.onclick = function () {
        var washingtonRef = db.collection("empleados").doc(id);
        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        var sexo = document.getElementById('sexo').value;
        var telefono = document.getElementById('telefono').value;
        var dui = document.getElementById('dui').value;
        var area_trabajo = document.getElementById('area_trabajo').value;
        var direccion = document.getElementById('direccion').value;
        var sucursal = document.getElementById('sucursal').value;
        var password = document.getElementById('password').value;

        var washingtonRef = db.collection("empleados").doc(id);
        return washingtonRef.update({
                nombre: nombre,
                correo: correo,
                sexo: sexo,
                telefono: telefono,
                dui: dui,
                area_trabajo: area_trabajo,
                direccion: direccion,
                sucursal: sucursal,
                password: password,
            })
            .then(function () {
                alert("Datos de Usuario Editados Exitosamente!!");
                console.log("Document successfully updated!");
                boton.innerHTML = 'Registrar';
                form.reset();
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}
