<template>
    <div class="fullscreen">
        <div id="imagen-fondo" >
            <div class="row" id="contendor-imagen2">
                <div class="col-1"></div>
                <div id="contenedor-col2" class="col-10">
                    <!-- Imagen -->
                    <div id="div-img">
                        <img id="imagen3"
                            src="https://images.pexels.com/photos/4086273/pexels-photo-4086273.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="">
                    </div>
                    <div id="div-login">
                        <p id="text-ingresar"><strong>INGRESAR</strong></p>
                        <div id="div_icon">
                            <q-icon id="icon" name="account_circle" />
                        </div>
                        
                        <p id="p-usuario"><strong>USUARIO</strong> </p>
                        <q-input  id="input-usuario" filled v-model="user" label="DIGITE SU USUARIO" stack-label
                            :dense="dense" /><br>
                        <p id="p-contraseña"><strong>CONTRASEÑA</strong></p>
                        <q-input id="input-contraseña" type="password" filled v-model="password" label="DIGITE SU CONTRASEÑA" stack-label
                            :dense="dense" /><br>
                        <p id="p-olvido">¿Olvido su contraseña?</p>
                        <div id="div-boton">
                        <q-btn @click="validar() " id="boton-ingresar" color="teal-10" label="INGRESAR " />
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>

            </div>
        </div>
        <!-- termina div que contiene todo -->
    </div>
</template>



<script setup>
import { ref } from "vue";
import axios from "axios"
import {useRouter} from "vue-router"
import {LoginStore} from '../store/Login/login.js'

const store = LoginStore()

let router= useRouter();
let dense = ref(false)
let user = ref("daniel")
let password = ref("123")
let index   = ref(0)
let usuario = ref([
    {
        nameUser: "daniel",
        password: "123",
      }
    ])



const addUser = async()=>{
    try {

        const newuser = await axios.post("http://localhost:3500/login/login",{
            user:user.value,
            password:password.value 
            

        })
        
        store.getToken(newuser.data);

       console.log("Se genero token")
    } catch (error) {
        console.log(error);
    }
}

function pasarHome() {
    if (store.token==store.token) {
        router.push("/home")
    }
    

}
function validar() {
        for (let i = 0; i < usuario.value.length; i++) {
            index.value = i
            if (user.value == usuario.value[index.value].nameUser && password.value == usuario.value[index.value].password) {
            console.log("se logio con exito");
            addUser()
            pasarHome()
            }   
            else{
                console.log("No es correcto");
            }
            console.log("pos ", i);
        }}
       

</script>







<style>
#imagen-fondo {
  min-height: 100vh;
  background-image: url(https://images.pexels.com/photos/4086273/pexels-photo-4086273.jpeg?auto=compress&cs=tinysrgb&w=1600);
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
}

#contendor-imagen2 {

    min-height: 90vh;

}

#contenedor-col2 {
    background-color: white;
    margin-top: 45px;
    color: white;
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px;
    border: 1px solid black;

}

#div-img {
    width: 60%;
    height: 100%;
}

#imagen3 {
    width: 100%;
    height: 100%;
    border-right: 2px solid black;
    border-radius: 10px;
}

#div-login {
    margin: 0% auto;
    padding-top: 70px;
    width: 30%;
}

#text-ingresar {
    color: black;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-size: 30px;
}

#div_icon{
    margin: 0px auto;
 
    width: 100px;
}

#icon {
    color: black;
    font-size: 100px;
   
}

#p-usuario {
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

#p-contraseña {
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

#input-usuario {
    background-color: white;
    width: 90%;
    border-radius: 10px;
}

#input-contraseña {
    background-color: white;
    width: 90%;
    border-radius: 10px;
}

#p-olvido {
    color: black;
    margin-bottom: 40px;
}

#div-boton {
    width: 40%;
    margin: 0px auto;
  
}

#boton-ingresar {
    width: 120px;
    font-size: 15px;
}

@media (max-height: 720px) {
    #contenedor-col2{
        height: 620px;
        
    }
    #boton-ingresar {
    border-radius: 10px;
    width: 100px;
    font-size: 12px;
    }
    #p-olvido {
    color: black;
    font-size: 12px;
}
#p-usuario {
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 11px;
    
}

#p-contraseña {
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 11px;
}
}


</style>