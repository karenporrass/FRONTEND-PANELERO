<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder"> USUARIOS </div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row q-mb-sm">
          <div class="col-1"></div>
          <div class="col-10" style="display: flex;" > 
            <router-link to="/homeMantenimiento" style="text-decoration: none; font-size:larger;" class="text-dark">
          <div class="q-mr-md" ><span style="font-size: 35px; " class="material-icons-outlined ">
                arrow_right
              </span> Mantenimiento</div>
          </router-link>
          <div style="font-size: larger;">
            <span style="font-size: 35px; " class="material-icons-outlined ">
                arrow_right
              </span> Usuarios
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        
       
        
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear nuevo usuario</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" >
                    <template v-slot:body-cell-options="props" >
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row),  promptEdit = true "></q-btn>
                <q-btn v-if="props.row.state == 0" round size="xs" color="green-10"
                  @click="activarDesactivar(props.row)"><span class="material-symbols-outlined" style="font-size: 18px;">
                    check
                  </span></q-btn>
                <q-btn v-else round size="xs" color="red" @click="activarDesactivar(props.row)"><span
                    class="material-symbols-outlined" style="font-size: 18px;">
                    close
                  </span></q-btn>
              </div>
            </q-td>
            
          </template>
        </q-table>
            </div>
            <div class="col-1"></div>
        </div> 

        <q-dialog v-model="prompt">
          <q-card style="height: 60%;">
        <q-card-section class="bg-green-9 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit="postUser()" >
            <div>
              <q-input class="q-mb-md" filled type="text" v-model="names" label="Digite el nombre" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input class="q-mb-md" filled type="text" v-model="lastNames" label="Digite los apellidos" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
               <q-select filled v-model="typeDocument" :options="optionsDocument" label="Seleccione el tipo documento" lazy-rules :rules="[
                (val) =>
                  ( val !== null && val !== '' && val !== undefined)  || 'El campo es requerido',
              ]" />
                  <q-input class="q-mb-md" filled type="number" v-model="numberDocument" label="Digite el numero de documento" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input class="q-mb-md" filled type="text" v-model="rol" label="Seleccione el rol" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input class="q-mb-md"  filled type="number" v-model="cel" label="Digite el numero celular" lazy-rules :rules="[
                (val) =>
                  (val  !== 0 && val > 0 ) || 'El campo es requerido',
              ]"/>
                  <q-input  class="q-mb-md" filled type="text" v-model="address" label="Digite la direccion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input  class="q-mb-md" filled type="text" v-model="email" label="Digite el email" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input class="q-mb-md"  filled type="text" v-model="emergencyPersonName" label="Digite el nombre de una persona de emergencia" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input  filled type="number" v-model="emergencyPersonPhone" label="Digite el numero de la persona" lazy-rules :rules="[
                (val) =>
                  (val  > 0) || 'El campo es requerido',
              ]"/>

              

              <div class="justify-center flex">
                <!-- <q-btn class="button_style q-mt-md" :loading="useInstructors.loading" color="secondary" type="submit" label="GUARDAR" /> -->

                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"  @click="postUser()"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm bg-green-9" to="" v-close-popup><span class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
          </q-card>
          </q-dialog>

          
        <q-dialog v-model="promptEdit">
            <q-card class="my-card" >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
               EDITAR LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>
                    <!-- <q-input class="q-mb-md" filled type="text" v-model="names" label="Digite el nombre"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="lastNames" label="Digite los apellidos"></q-input> -->
                  <q-select filled v-model="typeDocument" :options="optionsDocument" label="Seleccione el tipo documento" />
                  <!-- <q-input class="q-mb-md" filled type="number" v-model="numberDocument" label="Digite el numero de documento"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="rol" label="Seleccione el rol"></q-input>
                  <q-input class="q-mb-md"  filled type="number" v-model="cel" label="Digite el numero celular"></q-input>
                  <q-input  class="q-mb-md" filled type="text" v-model="address" label="Digite la direccion"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="email" label="Digite el email"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="password" label="Digite la contraseña"></q-input>
                  <q-input class="q-mb-md"  filled type="text" v-model="emergencyPersonName" label="Digite el nombre de una persona de emergencia"></q-input>
                  <q-input  filled type="number" v-model="emergencyPersonPhone" label="Digite el numero de la persona"></q-input> -->
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"  @click="putInfo()"/>
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>
      </div> 
</template>
  
<script setup>
import {ref, onBeforeMount, onMounted} from 'vue'
import {usersStore} from "../../store/Maintenance/CreateUsers.js"
const userStore = usersStore()

let prompt = ref(false)
let promptEdit = ref(false)
let names = ref("")
let lastNames = ref("")
let typeDocument = ref("")
let numberDocument = ref()
let rol = ref("")
let cel = ref()
let address = ref("")
let email = ref("")
let index = ref()
let emergencyPersonName= ref("")
let emergencyPersonPhone= ref()
let password = ref("")


let pagination = ref({
        rowsPerPage: 0
      })
 let optionsDocument = ref([])
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE',field: 'names',align: 'center'},
  {name: 'lastNames',label: 'APELLIDOS',align: 'center',field: row => row.lastNames,format: val => `${val}`,sortable: true},
  { name: 'typeDocument', align: 'center', label: 'TIPO DE DOCUMENTO', field: 'typeDocument',align: 'center', sortable: true },
  { name: 'numberDocument', align: 'center', label: 'NUMERO DOCUMENTO', field: 'numberDocument',align: 'center', sortable: true },
  {name: 'rol',label: 'ROL',field: 'rol',align: 'center'},
  {name: 'cel',label: 'CELULAR',field: 'cel',align: 'center'},
  {name: 'address',label: 'DIRECCION',field: 'address',align: 'center'},
  {name: 'email',label: 'CORREO',field: 'email',align: 'center'},
  {name: 'namePerson',label: 'PERSONA EMERGENCIA',field: 'emergencyPersonName',align: 'center'},
  {name: 'phonePerson',label: 'NUMERO DE CONCTATO',field: 'emergencyPersonPhone',align: 'center'},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])


const postUser= async ()=>{
  console.log("hola");
  const res = await userStore.newUsers(
    names.value, 
    lastNames.value, 
    typeDocument.value.value,
    numberDocument.value, 
    rol.value, 
    cel.value, 
    address.value, 
    email.value,
    emergencyPersonName.value,
    emergencyPersonPhone.value
     )
    console.log(res);
  getUsers()
}

async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await userStore.active(data._id, 0)
    console.log(res);
    getUsers()
  } else {
    res = await userStore.active(data._id, 1)
    console.log(res);
    getUsers()
  }
  getUsers()
}

async function getUsers () {
  const res = await userStore.listUsers()
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
    row.index = index+1
  })
  } else {
    alert(res)
  }
}

const getDocument = async ()=>{
 const res = await userStore.listDocuments()
 console.log(res.data);
 if (res.status < 299) {
  for(let i in res.data){
    console.log(i);
    let object = {label: res.data[i].acronym, value: res.data[i]._id};
    optionsDocument.value.push(object)
  }
 console.log(optionsDocument.value);
} else {
 alert(res)
}
}


function goInfo(data){
    names.value = data.names 
    lastNames.value = data.lastNames
    typeDocument.value = data.typeDocument
    numberDocument.value = data.numberDocument
    rol.value = data.rol
    cel.value = data.cel
    address.value = data. address
    email.value = data.email
    emergencyPersonName.value = data.emergencyPersonName
    emergencyPersonPhone.value = data.emergencyPersonPhone
}

async function putInfo(){
  console.log(index.value);
  const res = await userStore.putUsers(index.value, 
    names.value, 
    lastNames.value, 
    typeDocument.value.value,
    numberDocument.value, 
    rol.value, 
    cel.value, 
    address.value, 
    email.value,
    password.value,
    emergencyPersonName.value,
    emergencyPersonPhone.value

    )
    console.log(res);
    getUsers()
}


onBeforeMount(()=>{
  getUsers();
  getDocument();
})


</script>
<!-- 
<style scoped>
.my-card
  height: 60%
  max-height: 80%
</style> -->