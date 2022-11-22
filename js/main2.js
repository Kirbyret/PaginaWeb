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



const dbRef=ref(db,'productos');
onValue(dbRef,(snapshot)=>{
    lista.innerHTML=""
    snapshot.forEach((childSnapshot)=>{
        const childKey=childSnapshot.key;
        const childData=childSnapshot.val();
        if(childData.Estatus=="0")
        {
            lista.innerHTML= lista.innerHTML+"<div class='box'>"+"<img src='"+childData.Url+"'>"+"<div>"+"<h2>"+childData.NombreProducto+"</h2>"+"<h5>"+childData.Descripcion+"</h5>"+"<br>"+"<h5>Precio: $"+childData.Precio+"</h5>"+"<button>COMPRAR</button>"+"</div>"+"</div>";
       


        }
    });

},{
    onlyOnce:true
})