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


var sucursal = document.getElementById('sucursal');
db.collection("sucursales").onSnapshot((querySnapshot) => {
    sucursal.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        sucursal.innerHTML +=
            `    
            <option> ${doc.data().nombre}</option>  
            `
    });
});
var proveedor = document.getElementById('proveedor');
db.collection("proveedores").onSnapshot((querySnapshot) => {
    proveedor.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        proveedor.innerHTML +=
            `    
            <option> ${doc.data().nombre}</option>  
            `
    });
});

//guardar datos
function RegistrarOrdenes() {
    var sucursal = document.getElementById('sucursal').value;
    var descripcion = document.getElementById('descripcion').value;
    var proveedor = document.getElementById('proveedor').value;
   

    db.collection("pedidos").add({
            sucursal: sucursal,
            descripcion: descripcion,
            proveedor: proveedor,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            sucursal = document.getElementById('sucursal').value = '';
            descripcion = document.getElementById('descripcion').value = '';
            proveedor = document.getElementById('proveedor').value = '';
            alert(" Registro Exitosamente!!");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}


//mostrar datos
//tablaS ES el id dela tabla <tbody id="tablaS"> donde se imprimira la tabla
var tablaPedidostablaPedidos = document.getElementById('tablaPedidos');
db.collection("pedidos").onSnapshot((querySnapshot) => {
    tablaPedidos.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tablaPedidos.innerHTML +=
            `<tr>
                  <td>${doc.data().sucursal}</th>
                  <td>${doc.data().descripcion}</td>
                  <td>${doc.data().proveedor}</td>
                  <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>
                   <button class="btn btn-warning" data-toggle="modal"  data-toggle="tooltip" data-placement="top" title="Actualizar datos" data-target="#registrarEmpleado" onclick="editar('${doc.id}','${doc.data().sucursal}','${doc.data().descripcion}','${doc.data().proveedor}')"><em class="fa fa-edit">&nbsp;</em></button></td>
                </tr>
        `
    });
});
//borrar datos
function eliminar(id) {
    db.collection("pedidos").doc(id).delete().then(function () {
        alert("Datos  Eliminados Exitosamente!!");
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//actualizar datos
function editar(id, sucursal, descripcion, proveedor) {
    document.getElementById('sucursal').value = sucursal;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('proveedor').value = proveedor;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';
    boton.onclick = function () {
        var washingtonRef = db.collection("pedidos").doc(id);
        var sucursal = document.getElementById('sucursal').value;
        var descripcion = document.getElementById('descripcion').value;
        var proveedor = document.getElementById('proveedor').value;
        var washingtonRef = db.collection("pedidos").doc(id);
        return washingtonRef.update({
                sucursal: sucursal,
                descripcion: descripcion,
                proveedor: proveedor,
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
