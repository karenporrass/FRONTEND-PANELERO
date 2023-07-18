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
      <div class="col-10" style="display: flex;">
        <router-link to="/homeMantenimiento" style="text-decoration: none; font-size:larger;" class="text-dark">
          <div class="q-mr-md"><span style="font-size: 35px; " class="material-icons-outlined ">
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
      <div class="col-10">
        <q-btn class="bg-green-10 text-white" @click="cleanForm(), prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span>
          <span class="q-mt-xs">
            Crear nuevo usuario
          </span></q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md justify-center">
      <div class="col-11">
        <q-table style="height: 50vh" flat bordered  ref="tableRef" :rows="rows" :columns="columns" row-key="index" virtual-scroll  :virtual-scroll-item-size="48"
             >
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10"
                  @click="cleanForm(), index = props.row._id, goInfo(props.row), promptEdit = true"></q-btn>
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
    </div>

    <q-dialog v-model="prompt">
      <q-card class="my-card" >
        <q-card-section class="bg-green-9 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form  @submit.prevent.stop="postUser()" @reset.prevent.stop="cleanForm()">
            <div>
              <q-input  filled type="text" v-model="names" label="Digite el nombre" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
              <q-select filled v-model="typeDocument" :options="optionsDocument" label="Seleccione el tipo documento"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
              <q-input  filled type="number" v-model="numberDocument" label="Digite el numero de documento"
                lazy-rules :rules="[
                  (val) =>
                    (val > 0) || 'El campo es requerido',
                ]" />
            <q-select filled v-model="rol" :options="optionsRol" label="Seleccione el rol"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
                <q-select filled v-model="eps" :options="optionsEps" label="Seleccione la Eps"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
              <q-input  filled type="number" v-model="cel" label="Digite el numero celular" lazy-rules
                :rules="[
                  (val) =>
                    (val !== 0 && val > 0) || 'El campo es requerido',
                ]" />
              <q-input  filled type="text" v-model="address" label="Digite la direccion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
              <q-input  filled type="text" v-model="email" label="Digite el email" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
              <q-input  filled type="text" v-model="emergencyPersonName"
                label="Digite el nombre de una persona de emergencia" lazy-rules :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />
              <q-input filled type="number" v-model="emergencyPersonPhone" label="Digite el numero de la persona"
                lazy-rules :rules="[
                  (val) =>
                    (val > 0) || 'El campo es requerido',
                ]" />


              <div class="justify-center flex q-mt-sm q-mb-sm ">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mx-sm save_as bg-green-9 text-white" ></q-btn>
                <q-btn type="reset" to="" class="q-mx-sm"   v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>


    <q-dialog v-model="promptEdit">
      <q-card class="my-card">
        <q-card-section class="bg-green-10 ">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            EDITAR LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <q-form    @submit.prevent.stop="putInfo()" @reset.prevent.stop="cleanForm()">
            <div>
              <q-input  filled type="text" v-model="names" label="Digite el nombre" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
              <q-select filled v-model="typeDocument" :options="optionsDocument" label="Seleccione el tipo documento"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
              <q-input  filled type="number" v-model="numberDocument" label="Digite el numero de documento"
                lazy-rules :rules="[
                  (val) =>
                    (val  > 0) || 'El campo es requerido',
                ]" />
              
              <q-select filled v-model="rol" :options="optionsRol" label="Seleccione el rol"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
                 <q-select filled v-model="eps" :options="optionsEps" label="Seleccione la Eps"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
              <q-input  filled type="number" v-model="cel" label="Digite el numero celular" lazy-rules
                :rules="[
                  (val) =>
                    (val !== 0 && val > 0) || 'El campo es requerido',
                ]" />
              <q-input  filled type="text" v-model="address" label="Digite la direccion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
              <q-input  filled type="text" v-model="email" label="Digite el email" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
              
              <q-input  filled type="text" v-model="emergencyPersonName"
                label="Digite el nombre de una persona de emergencia" lazy-rules :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />
              <q-input filled type="number" v-model="emergencyPersonPhone" label="Digite el numero de la persona"
                lazy-rules :rules="[
                  (val) =>
                    (val > 0) || 'El campo es requerido',
                ]" />



              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"
                 ></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref, onBeforeMount} from 'vue'
import { usersStore } from "../../store/Maintenance/CreateUsers.js"
import { epsStore } from "../../store/Maintenance/Eps.js"
const epsStores = epsStore()

const userStore = usersStore()

let prompt = ref(false)
let promptEdit = ref(false)
let names = ref("")
let typeDocument = ref("")
let numberDocument = ref()
let rol = ref("")
let cel = ref()
let address = ref("")
let email = ref("")
let index = ref()
let emergencyPersonName = ref("")
let emergencyPersonPhone = ref()
let eps = ref()

let optionsEps = ref([])
let optionsRol = ref(['Administrador' ,'Trabajador'])
let optionsDocument = ref([])
let columns = ref([
  { name: 'index', label: '#', field: 'index'},
  { name: 'name', label: 'NOMBRES', field: 'names', align: 'center' },
  { name: 'typeDocument', align: 'center', label: 'TIPO DE DOCUMENTO', field: (row)=> row.typeDocument.acronym, align: 'center', sortable: true },
  { name: 'numberDocument', align: 'center', label: 'N° DOCUMENTO', field: 'numberDocument', align: 'center', sortable: true },
  { name: 'eps', label: 'Eps', field: (row)=> row.eps.name, align: 'center' },
  { name: 'rol', label: 'ROL', field: 'rol', align: 'center' },
  { name: 'cel', label: 'CELULAR', field: 'cel', align: 'center' },
  { name: 'address', label: 'DIRECCION', field: 'address', align: 'center' },
  { name: 'email', label: 'CORREO', field: 'email', align: 'center' },
  { name: 'namePerson', label: 'PERSONA EMERGENCIA', field: 'emergencyPersonName', align: 'center' },
  { name: 'phonePerson', label: 'NUMERO DE CONCTATO', field: 'emergencyPersonPhone', align: 'center' },
  {name: "status",label: "ESTADO",field: (row) => (row.state == 1 ? "Activo" : "Inactivo"),align: "center",},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])


const postUser = async () => {
  console.log("hola");
  const res = await userStore.newUsers(
    names.value,
    typeDocument.value.value,
    numberDocument.value,
    eps.value.value,
    rol.value,
    cel.value,
    address.value,
    email.value,
    emergencyPersonName.value,
    emergencyPersonPhone.value,
    
  )
  console.log(res);
  getUsers()
  prompt.value = false
  cleanForm()
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

async function getUsers() {
  const res = await userStore.listUsers()
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
      row.index = index + 1
    })
  } else {
    alert(res)
  }
}

async function getAdmis() {
  const res = await userStore.checkAdmi()
  console.log(res);
  if (res.status < 299) {
    optionsRol = [ 'Trabajador']
  } else {
    optionsRol = ['Administrador', 'Trabajador']
  }
}

const getDocument = async () => {
  const res = await userStore.listDocuments()
  console.log(res.data);
  optionsDocument.value = [];
  if (res.status < 299) {
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].acronym, value: res.data[i]._id };
      optionsDocument.value.push(object)
    }
    console.log(optionsDocument.value);
  } else {
    alert(res)
  }
}

const getEps = async () => {
  const res = await epsStores.listEpsActive()
  console.log(res.data);
  optionsEps.value = [];
  if (res.status < 299) {
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsEps.value.push(object)
    }
    console.log(optionsEps.value);
  } else {
    alert(res)
  }
}

function goInfo(data) {
  names.value = data.names
  typeDocument.value = {
    label: data.typeDocument.acronym,
  value: data.typeDocument._id},
  numberDocument.value = data.numberDocument
  eps.value = {
    label: data.eps.name,
  value: data.eps._id},
  rol.value = data.rol
  cel.value = data.cel
  address.value = data.address
  email.value = data.email
  emergencyPersonName.value = data.emergencyPersonName
  emergencyPersonPhone.value = data.emergencyPersonPhone
}

async function putInfo() {
  console.log(index.value);
  console.log(rol.value);
  const re = await userStore.putUsers(index.value,
    names.value,
    typeDocument.value.value,
    numberDocument.value,
    eps.value.value,
    rol.value,
    cel.value,
    address.value,
    email.value,
    emergencyPersonName.value,
    emergencyPersonPhone.value

  )
  console.log(re);
  getUsers()
  promptEdit.value = false
  cleanForm()
}

function cleanForm(){
  names.value = ""
  typeDocument.value = ""
  numberDocument.value= null
  eps.value = ""
  rol.value = ""
  cel.value = ""
  address.value= ""
  email.value = ""
  index.value = null
  emergencyPersonName.value = ""
  emergencyPersonPhone.value = null
}


onBeforeMount(() => {
  getUsers();
  getDocument();
  getAdmis();
  getEps();
})


</script>

<style scoped>
.my-card{
  max-height: 80%;
  min-height: 70%;

}

</style>