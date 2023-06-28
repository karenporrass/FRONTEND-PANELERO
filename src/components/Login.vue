<template>
  <div class="fullscreen">
    <div id="imagen-fondo" style="background-image: url(/images/FONDO.jpg)">
      <div class="row" id="contendor-imagen2">
        <div class="col-1"></div>
        <div id="contenedor-col2" class="col-10">
          <!-- Imagen -->
          <div id="div-img">
            <img id="imagen3" src="images/PANELA.jpg" alt="" />
          </div>
          <div id="div-login">
            <q-form ref="myForm" @submit.prevent.stop="validar()">
              <p id="text-ingresar"><strong>INGRESAR</strong></p>
              <div id="div_icon">
                <q-icon id="icon" name="account_circle" />
              </div>
              <p id="p-usuario"><strong>USUARIO</strong></p>
              <q-input
                id="input-usuario"
                filled
                v-model="user"
                label="DIGITE SU USUARIO"
                stack-label
                
              />

              />
              <br />
              <p id="p-contraseña"><strong>CONTRASEÑA</strong></p>
              <q-input
                id="input-contraseña"
                type="password"
                filled
                v-model="password"
                label="DIGITE SU CONTRASEÑA"
                stack-label
               
              />

              /> /><br />
              <p id="p-olvido">¿Olvido su contraseña?</p>
              <div class="column items-center">
                <q-btn
                  type="submit"
                  id="boton-ingresar"
                  :loading="loading"
                  color="teal-10"
                  label="INICIAR SESIÓN"
                >
                  <template v-slot:loading>
                    <q-spinner-oval color="white" size="1em" />
                  </template>
                </q-btn>
              </div>
            </q-form>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LoginStore } from "../store/Login/login.js";

const store = LoginStore();

let router = useRouter();
let dense = ref(false);
let user = ref("sandygarcia2105@gmail.com");
let password = ref("123456");
let index = ref(0);
let loading = ref(false);

async function validar() {
  loading.value = true;
  await store
    .newLogin({
      user: user.value,
      password: password.value,
    })
    .then((res) => {
      pasarHome();
    });
  loading.value = false;
}

function pasarHome() {
  if (store.token == store.token) {
    router.push("/home");
  }
}
</script>

<style>
#imagen-fondo {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
}

#contendor-imagen2 {
  min-height: 90vh;
}

#contenedor-col2 {
  background-color: white;
  margin-top: 35px;
  margin-bottom: 10px;
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
  background-size: 100%;
}

#div-login {
  margin: 0% auto;
  padding-top: 70px;
  width: 30%;
}

#text-ingresar {
  color: black;
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
}

#div_icon {
  margin: 0px auto;
  width: 100px;
}

#icon {
  color: black;
  font-size: 100px;
}

#p-usuario {
  color: black;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#p-contraseña {
  color: black;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
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

#boton-ingresar {
  width: 150px;
  font-size: 15px;
  margin-bottom: 30px;
}
/* 
@media (max-height: 1200px) {
  #contenedor-col2 {
    height: 620px;
  }
  #boton-ingresar {
    border-radius: 10px;
    width: 100px;
    font-size: 15px;
  }
  #p-olvido {
    color: black;
    font-size: 12px;
  }
  #p-usuario {
    color: black;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 11px;
  }

  #p-contraseña {
    color: black;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 11px;
  }
} */
</style>