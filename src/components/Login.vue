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
                        <q-icon id="icon" name="account_circle" />
                        <p id="p-usuario"><strong>USUARIO</strong> </p>
                        <q-input id="input-usuario" filled v-model="name" label="DIGITE SU USUARIO" stack-label
                            :dense="dense" /><br>
                        <p id="p-contraseña"><strong>CONTRASEÑA</strong></p>
                        <q-input id="input-contraseña" filled v-model="attentionLine" label="DIGITE SU CONTRASEÑA" stack-label
                            :dense="dense" /><br>
                        <p id="p-olvido">¿Olvido su contraseña?</p>
                        <div id="div-boton">

                        <q-btn @click="addEps(),pasarHome()" id="boton-ingresar" color="teal-10" label="INGRESAR " />

                        </div>
                    </div>
                </div>
                <div class="col-1"> <h2>hola</h2></div>
            </div>
        </div>
        <!-- termina div que contiene todo -->
    </div>
</template>



<script setup>
import { ref } from "vue";
import axios from "axios"
import {useRouter} from "vue-router"
let router= useRouter();
let dense = ref(false)
let name = ref()
let attentionLine = ref()

const addEps = async()=>{
    console.log("holas");
    try {
        const eps = await axios.post("http://localhost:3500/eps",{
            name:name.value,
            attentionLine:attentionLine.value 
        })
        console.log(eps);
    } catch (error) {
        console.log(error);
    }
}

function pasarHome() {
    router.push("/home")

}

</script>








































<style>
#imagen-fondo {

    min-height: 100vh;
    background-image: url(https://images.pexels.com/photos/4086273/pexels-photo-4086273.jpeg?auto=compress&cs=tinysrgb&w=1600);
    background-repeat: no-repeat;
    background-size: 100%;
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
    padding-top: 100px;
    width: 400px;
}

#text-ingresar {
    color: black;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-size: 30px;
}

#icon {
    color: black;
    font-size: 100px;
    margin-left: 150px;
    margin-bottom: 30px;
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
}

#div-boton {
    width: 29%;
    margin: 0px auto;
    margin-top: 0px;
}

#boton-ingresar {
    border-radius: 10px;
    width: 120px;
    font-size: 15px;
}</style>