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
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">Hola</div>
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
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>
                    <q-input class="q-mb-md" filled type="text" v-model="names" label="Digite el nombre"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="lastNames" label="Digite los apellidos"></q-input>
                  <q-input class="q-mb-md"  filled type="text" v-model="typeDocument" label="Seleccione el tipo de documento"></q-input>
                  <q-input class="q-mb-md" filled type="number" v-model="numberDocument" label="Digite el numero de documento"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="rol" label="Seleccione el rol"></q-input>
                  <q-input class="q-mb-md"  filled type="number" v-model="cel" label="Digite el numero celular"></q-input>
                  <q-input  class="q-mb-md" filled type="text" v-model="address" label="Digite la direccion"></q-input>
                  <q-input filled type="text" v-model="email" label="Digite el email"></q-input>
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"  @click="postUser()"/>
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>

          
        <q-dialog v-model="promptEdit">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
               EDITAR LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>
                    <q-input class="q-mb-md" filled type="text" v-model="names" label="Digite el nombre"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="lastNames" label="Digite los apellidos"></q-input>
                  <q-input class="q-mb-md"  filled type="text" v-model="typeDocument" label="Seleccione el tipo de documento"></q-input>
                  <q-input class="q-mb-md" filled type="number" v-model="numberDocument" label="Digite el numero de documento"></q-input>
                  <q-input class="q-mb-md" filled type="text" v-model="rol" label="Seleccione el rol"></q-input>
                  <q-input class="q-mb-md"  filled type="number" v-model="cel" label="Digite el numero celular"></q-input>
                  <q-input  class="q-mb-md" filled type="text" v-model="address" label="Digite la direccion"></q-input>
                  <q-input filled type="text" v-model="email" label="Digite el email"></q-input>
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
import {ref, onMounted} from 'vue'
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



let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
  {name: 'name',label: 'NOMBRE',field: 'names',align: 'center'},
  {name: 'lastNames',label: 'APELLIDOS',align: 'center',field: row => row.lastNames,format: val => `${val}`,sortable: true},
  { name: 'typeDocument', align: 'center', label: 'TIPO DE DOCUMENTO', field: 'typeDocument',align: 'center', sortable: true },
  { name: 'numberDocument', align: 'center', label: 'NUMERO DOCUMENTO', field: 'numberDocument',align: 'center', sortable: true },
  {name: 'rol',label: 'ROL',field: 'rol',align: 'center'},
  {name: 'cel',label: 'CEL',field: 'cel',align: 'center'},
  {name: 'address',label: 'DIRECCION',field: 'address',align: 'center'},
  {name: 'email',label: 'CORREO',field: 'email',align: 'center'},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])

getUsers()
const postUser= async ()=>{
  const res = await userStore.newUsers(
    names.value, 
    lastNames.value, 
    typeDocument.value,
    numberDocument.value, 
    rol.value, 
    cel.value, 
    address.value, 
    email.value )
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
}

async function getUsers () {
  const res = await userStore.listUsers()
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data
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
}

async function putInfo(){
  console.log(index.value);
  const res = await userStore.putUsers(index.value, 
    names.value, 
    lastNames.value, 
    typeDocument.value,
    numberDocument.value, 
    rol.value, 
    cel.value, 
    address.value, 
    email.value )
    console.log(res);
    getUsers()
}

onMounted(()=>{
  getUsers()
})

</script>