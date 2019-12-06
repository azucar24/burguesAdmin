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
});var proveedor = document.getElementById('proveedor');
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
function RegistrarProductos() {
    var sucursal = document.getElementById('sucursal').value;
    var descripcion = document.getElementById('descripcion').value;
    var proveedor = document.getElementById('proveedor').value;

    var dt = new Date();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var year = dt.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var horaregistro = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    db.collection("Productos").add({
            fecha: {
                dia: day,
                mes: month,
                anio: year
            },
            hora: horaregistro,
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
var tablaProductos = document.getElementById('tablaProductos');
var dt = new Date();
var month = dt.getMonth() + 1;
if (month < 10) {
    month = '0' + month;
}
db.collection("Productos").onSnapshot((querySnapshot) => {
    tablaProductos.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().sucursal}`);
        tablaProductos.innerHTML +=
            `<tr>
                  <td>${doc.data().sucursal}</th>
                  <td>${doc.data().descripcion}</td>
                  <td>${doc.data().fecha.dia}/${doc.data().fecha.mes}/${doc.data().fecha.anio}</td>
                  <td>${doc.data().hora} </td>
                  <td>${doc.data().proveedor} </td>
                  <td><button class="btn btn-danger"onclick="eliminar('${doc.id}')"><em class="fa fa-eraser">&nbsp;</em>Eliminar</button>
                  <button class="btn btn-md btn-info" value="Print Div Contents" id="btnPrint"><em class="fa fa-print">&nbsp;</em>PDF</button>
                </tr>
        `
        //,'${doc.data().descripcion}','${doc.data().correo}','${doc.data().telefono}'
    });
});
//borrar datos
function eliminar(id) {
    db.collection("Productos").doc(id).delete().then(function () {
        alert("Datos  Eliminados Exitosamente!!");
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
