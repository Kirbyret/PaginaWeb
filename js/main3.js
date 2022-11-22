
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


var login=document.getElementById('login');
var formulario=document.getElementById('formulario');

var usuario;
var contraseña;
var Contraseña;
var btnIniciar=document.getElementById('iniciar');
function ocultar(){
    

    login.style.display="none";
    formulario.style.display="block";

}

function comprobar()
{
    leerInputs();
    const dbref=ref(db);
    get(child(dbref,'usuarios/'+usuario)).then((snapshot)=>{
        if(snapshot.exists())
        {
            Contraseña=snapshot.val().Contraseña;
            verificar();
        }
        else{
            alert("Datos Erroneos");
        }
    }).catch((error)=>{
        alert("Error: "+error);
    });
}

function leerInputs()
{
    usuario=document.getElementById('usuario').value;
    contraseña=document.getElementById('contraseña').value;
}


function verificar()
{
    if(contraseña==Contraseña)
    {
        alert("Bienvenido de vuelta administrador");
        ocultar();
    }
    else{
        alert("Datos Erroneos");
    }
}

btnIniciar.addEventListener('click',comprobar);