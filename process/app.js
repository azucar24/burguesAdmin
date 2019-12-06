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

//Capturar Fecha
  var dt = new Date();
	var month = dt.getMonth() + 1;
	var mes = "";
	if(month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9){
		mes = "0" + month;
	}else{
		mes = month;
	}
	var day = dt.getDate();
	var year = dt.getFullYear();
	var fecha_formato = year + "-" + mes + "-" + day
    console.log(fecha_formato);


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

var emplead = 0;
db.collection("empleados").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(id);
        //var id = "'" + dato.key + "'";
        emplead++;
        console.log(emplead);
        document.getElementById("emplead").innerHTML = emplead;
    });
});

var usuariosclientes = 0;
db.collection("Ordenes").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(id);
        //var id = "'" + dato.key + "'";
        usuariosclientes++;
        console.log(usuariosclientes);
        document.getElementById("usuariosclientes").innerHTML = usuariosclientes;
    });
});
var comentariosclientes = 0;
db.collection("comentarios").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(id);
        //var id = "'" + dato.key + "'";
        comentariosclientes++;
        console.log(comentariosclientes);
        document.getElementById("comentariosclientes").innerHTML = comentariosclientes;
    });
});
var reser = 0;
db.collection("Reservaciones").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(id);
        //var id = "'" + dato.key + "'";
        reser++;
        console.log(reser);
        document.getElementById("reser").innerHTML = reser;
    });
});




//===============================================================================================================================*/
//Listar reservaciones
var section = document.getElementById("panelitos");
var conta_reservaciones = 0;
var hora = "";
var section_ordenes_hechas;
	db.collection("Reservaciones").onSnapshot((querySnapshot) => {
		section.innerHTML = "";
	    querySnapshot.forEach((doc) => {
	        //console.log(`${doc.id} => ${doc.data().responsable}`);

	    	if(doc.data().fecha == fecha_formato){
	    		if(doc.data().estado == "asistio"){
	    			section.innerHTML +=`	
			           	<div class="col-md-4">
				            <div class="panel panel-primary">
				                <div class="panel-heading">${doc.data().responsable}
				                    <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
				                <div class="panel-body">
				                    <p style="font-size:18px;"><b>Telefono: ${doc.data().telefono}</b></p>
				                    <p style="font-size:18px;"><b>Personas: ${doc.data().cant_personas}</b></p>
				                    <p style="font-size:18px;"><b>Fecha: ${doc.data().fecha}</b></p>
				                    <p style="font-size:18px;"><b>Hora: ${doc.data().hora}</b></p>
				                    <center>
					                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal_options${conta_reservaciones}">
										  Opciones
										</button>
										<!-- MODAL -->
										<div class="modal fade" id="exampleModal_options${conta_reservaciones}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title" id="exampleModalLabel">Opciones</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body">
										        <button onclick="set_mesa_cliente('${doc.data().zona}', '${doc.data().responsable}')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal_tomarOrden">
								                  Tomar Orden
								                </button>
								              </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
									</center>
				                </div>
				                <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc.data().zona}</b></p></center></div>
				            </div>
				        </div>

			        `
	    		}else if(doc.data().estado == "ep"){
	    			section.innerHTML +=`	
			           	<div class="col-md-4">
				            <div class="panel panel-primary">
				                <div class="panel-heading">${doc.data().responsable}
				                    <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
				                <div class="panel-body">
				                    <p style="font-size:18px;"><b>Telefono: ${doc.data().telefono}</b></p>
				                    <p style="font-size:18px;"><b>Personas: ${doc.data().cant_personas}</b></p>
				                    <p style="font-size:18px;"><b>Fecha: ${doc.data().fecha}</b></p>
				                    <p style="font-size:18px;"><b>Hora: ${doc.data().hora}</b></p>
				                    <center>
					                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal_options${conta_reservaciones}">
										  Opciones
										</button>
										<!-- MODAL -->
										<div class="modal fade" id="exampleModal_options${conta_reservaciones}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title" id="exampleModalLabel">Opciones</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body">
										        <button onclick="marcar_asistencia('${doc.id}')" type="button" class="btn btn-success" data-dismiss="modal">Asistencia</button>
										        <button onclick="marcar_inasistencia('${doc.id}')" type="button" class="btn btn-danger" data-dismiss="modal">Inasistencia</button>
										      </div>
										      <div class="modal-footer">
										        <button id="close_modal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
									</center>
				                </div>
				                <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc.data().zona}</b></p></center></div>
				            </div>
				        </div> 
			        `
	    		}
	        }
	        conta_reservaciones++;
	    });
	});
//Buscar reservaciones
function buscar(){
	//Busqueda de reservaciones
	var parametro = document.getElementById("busqueda").value;
	var id = "";
	if(parametro == ""){
		alert("Parametro vacio");
	}else{
	    var encontrados = document.getElementById("encontrados");
		db.collection("Reservaciones").onSnapshot((querySnapshot) => {
			encontrados.innerHTML = "";
			panelitos.innerHTML = "";
			querySnapshot.forEach((doc1) => {
			    //console.log(`${doc.id} => ${doc.data().responsable}`);
			    if(doc1.data().responsable == parametro && doc1.data().fecha == fecha_formato){
					encontrados.innerHTML +=`	
					    <div class="col-md-4">
						    <div class="panel panel-primary">
						        <div class="panel-heading">${doc1.data().responsable}
						            <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
						           	<div class="panel-body">
						               <p style="font-size:18px;"><b>Telefono: ${doc1.data().telefono}</b></p>
						               <p style="font-size:18px;"><b>Personas: ${doc1.data().cant_personas}</b></p>
						               <p style="font-size:18px;"><b>Fecha: ${doc1.data().fecha}</b></p>
						               <p style="font-size:18px;"><b>Hora: ${doc1.data().hora}</b></p>
						        	</div>
						           <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc1.data().zona}</b></p></center>
						           </div>
						        </div>
						    </div>
						</div>
					`
				}else if(doc1.data().telefono == parametro){
					encontrados.innerHTML +=`	
					    <div class="col-md-4">
						    <div class="panel panel-primary">
						        <div class="panel-heading">${doc1.data().responsable}
						            <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
						           	<div class="panel-body">
						               <p style="font-size:18px;"><b>Telefono: ${doc1.data().telefono}</b></p>
						               <p style="font-size:18px;"><b>Personas: ${doc1.data().cant_personas}</b></p>
						               <p style="font-size:18px;"><b>Fecha: ${doc1.data().fecha}</b></p>
						               <p style="font-size:18px;"><b>Hora: ${doc1.data().hora}</b></p>
						        	</div>
						           <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc1.data().zona}</b></p></center>
						           </div>
						        </div>
						    </div>
						</div>
					`
				}
			});
		});
	}
}
