// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import{ getDatabase,onValue,ref,get,set,child,update,remove }
from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

import{ getStorage, ref as refS,uploadBytes,getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBF4qRXZ-BYNPfAxTvSvFpn3xKiv1EUPxk",
    authDomain: "sitioweb-8072c.firebaseapp.com",
    projectId: "sitioweb-8072c",
    databaseURL:"https://sitioweb-8072c-default-rtdb.firebaseio.com",
    storageBucket: "sitioweb-8072c.appspot.com",
    messagingSenderId: "458412831830",
    appId: "1:458412831830:web:16bd6f23a6069ad61a77f7"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db=getDatabase();


var IdProducto;
var NombreProducto;
var Descripcion;
var Cantidad;
var Estatus;
var Precio;
var Url;

function leerInputs()
{

    IdProducto=document.getElementById('id').value;
    NombreProducto=document.getElementById('nombre').value;
    Descripcion=document.getElementById('descripcion').value;
    Cantidad=document.getElementById('cantidad').value;
    Estatus=document.getElementById('estatus').value;
    Precio=document.getElementById('precio').value;
    Url=document.getElementById('url').value;


}

function insertarDatos()
{
    leerInputs();
    set(ref(db,'productos/'+IdProducto),{
        NombreProducto:NombreProducto,Descripcion:Descripcion,Cantidad:Cantidad,Precio:Precio,Estatus:Estatus,Url:Url
    }).then((resp)=>{
        alert("Producto Registrado");
        limpiarInputs();
    }).catch((error)=>{
        alert("ERROR"+" "+error);
    })
}

function limpiarInputs()
{
    document.getElementById('id').value="";
    document.getElementById('nombre').value="";
    document.getElementById('descripcion').value="";
    document.getElementById('cantidad').value="";
   
    document.getElementById('precio').value="";
    document.getElementById('url').value="";

    document.getElementById('imagenp').src="";
}



function modificar()
{


    leerInputs();
    update(ref(db,'productos/'+IdProducto),{
        NombreProducto:NombreProducto, Descripcion:Descripcion, Cantidad:Cantidad, Precio:Precio,Estatus:Estatus,Url:Url
    }).then(resp=>{
        alert("La modificación se ha realizado");
        limpiarInputs();
    }).catch((error)=>{
        alert("Error: "+error);
    })

}

function buscarCartas()
{
    leerInputs();
    if(IdProducto=="")
    {
        alert("CAMPOS VACIOS");
    }
    else{



        const dbref=ref(db);
        get(child(dbref,'productos/'+IdProducto)).then((snapshot)=>{
            if(snapshot.exists())
            {
                Cantidad=snapshot.val().Cantidad;
                Descripcion=snapshot.val().Descripcion;
                Estatus=snapshot.val().Estatus;
                NombreProducto=snapshot.val().NombreProducto;
                Precio=snapshot.val().Precio;
                Url=snapshot.val().Url;

                llenarInputs();
                cargarImagen2();
            }
            else{
                alert("Producto no Registrado");
            }
        })


    }
}

function borrarCarta()
{
    Estatus=1;
    update(ref(db,'productos/'+IdProducto),{ 
        Estatus:Estatus,
    }).then(resp=>{
        alert("Producto Eliminado");
        limpiarInputs();
    }).catch((error)=>{
        alert("Error: "+error);
    })
}
function llenarInputs()
{


    document.getElementById('nombre').value=NombreProducto;
    document.getElementById('descripcion').value=Descripcion;
    document.getElementById('cantidad').value=Cantidad;
    document.getElementById('estatus').value=Estatus;
    document.getElementById('precio').value=Precio;
    document.getElementById('url').value=Url;

}

async function cargarImagen()
{
    const file=event.target.files[0];
    const name=event.target.files[0].name;

    const storage=getStorage();
    const storageRef= refS(storage, 'imagenes/'+name);

    await uploadBytes(storageRef,file).then((snapshot)=>{
        descargarImagen(name);
    })
}

async function descargarImagen(name)
{
    const storage =getStorage();
    const starsRef=refS(storage,'imagenes/'+name);


    await getDownloadURL(refS(storage,'imagenes/'+name))
    .then((url)=>{
        document.getElementById('url').value=url;
        cargarImagen2()
    })
}
function cargarImagen2()
{
   var link=document.getElementById('url').value;

    document.getElementById('imagenp').src=link;
}

function existe()
{
    leerInputs();
    if(IdProducto=="" || NombreProducto=="" || Descripcion=="" ||Cantidad==""||Estatus==""||Precio=="")
    {
        alert("CAMPOS VACIOS")
       
    }
    else if(Url=="")
    {
        alert("INSERTAR IMAGEN");
        
    }
    else
    {
        const dbref=ref(db);
        get(child(dbref,'productos/'+IdProducto)).then((snapshot)=>{
            if(snapshot.exists())
            {
                alert("Ya Existe un producto con el mismo id");
            }
            else{
                insertarDatos();
            }
    
        }).catch((error)=>{
            alert("ERROR"+" "+error);
        });
    }
        
    
    
}


var btnRegistro=document.getElementById('registrar');
var btnBuscar=document.getElementById('buscar');
var btnModificar=document.getElementById('modificar');
var btnLimpiar=document.getElementById('limpiar');
var archivo=document.getElementById('archivo');
var btnBorrar=document.getElementById('borrar');
btnBorrar.addEventListener('click',borrarCarta);
btnLimpiar.addEventListener('click',limpiarInputs);
btnBuscar.addEventListener('click',buscarCartas);
archivo.addEventListener('change',cargarImagen);
btnRegistro.addEventListener('click',existe);
btnModificar.addEventListener('click',modificar);

