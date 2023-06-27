<template>

    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder"> EMPAQUES</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row q-mb-sm" >
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
              </span> Tipo de empaques
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
              <q-btn class="bg-green-10 text-white" @click="cleanForm(),prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span>Crear nuevo tipo de empaque</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
              <q-table style="height: 50vh" flat bordered :rows="rows" :columns="columns" row-key="index">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="cleanForm(), index = props.row._id, goInfo(props.row),  promptEdit = true "></q-btn>
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
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <q-form @submit.prevent.stop="postTypePackaging()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre del empaque" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input class="q-mb-md" filled type="number" v-model="maxWeigth" label="Peso maximo"
                lazy-rules :rules="[
                  (val) =>
                    (val  > 0) || 'El campo es requerido',
                ]" />

                <q-input class="q-mb-md" filled type="number" v-model="unitsPerBox" label="Dijite la cantidad de unidades por caja"
                lazy-rules :rules="[
                  (val) =>
                    (val  > 0) || 'El campo es requerido',
                ]" />
                  
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to=""  v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
                </q-form>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="promptEdit">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">

          <q-form @submit.prevent.stop="putInfo()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre del empaque" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input class="q-mb-md" filled type="number" v-model="maxWeigth" label="Peso maximo"
                lazy-rules :rules="[
                  (val) =>
                    (val  > 0) || 'El campo es requerido',
                ]" />

                <q-input class="q-mb-md" filled type="number" v-model="unitsPerBox" label="Dijite la cantidad de unidades por caja"
                lazy-rules :rules="[
                  (val) =>
                    (val  > 0) || 'El campo es requerido',
                ]" />
                  
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to=""  v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
                </q-form>
        </div>
      </q-card>
          </q-dialog>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios';
import {packagingStore} from "../../store/Maintenance/TypePackaging.js"
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let maxWeigth = ref()
let unitsPerBox = ref()
let index = ref()
// let pagination = ref({
//   rowsPerPage: 0
// })
let columns = ref([

{ name: 'index', label: 'N°',field: 'index'},
  {name: 'name',label: 'NOMBRE EMPAQUE',field: 'name',align: 'center'},
  {name: 'maxWeight',label: 'PESO MAXIMO ',align: 'center',field: row => row.maxWeigth,format: val => `${val}`,sortable: true},
  { name: 'unitsPerBox', align: 'center', label: 'UNIDADES POR CAJA', field: 'unitsPerBox',align: 'center', sortable: true },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
])

let rows = ref([])


const usePackaging = packagingStore()


// get registros proceso diario 
async function getPackaging() {
  const res = await usePackaging.listPackaging()
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
getPackaging()

//post proceso diario
async function postTypePackaging() {
  const res = await usePackaging.newPackaging(
    name.value, // se llama a las variables del modal
    maxWeigth.value,
    unitsPerBox.value,
  )
  getPackaging()
  console.log(res);
  prompt.value = false
  cleanForm()
}


// activar y desactivar proceso diario 
async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await usePackaging.active(data._id, 0)
    console.log(res);
    getPackaging()
  } else {
    res = await usePackaging.active(data._id, 1)
    console.log(res);
    getPackaging()
  }
}

function goInfo(data){
    name.value = data.name
    maxWeigth.value = data.maxWeigth
    unitsPerBox.value= data.unitsPerBox
}

async function putInfo(){
  console.log(index.value);
  const res = await usePackaging.putPackaging(index.value, 
    name.value, 
    maxWeigth.value,
    unitsPerBox.value
    )
    console.log(res);
    getPackaging()
    promptEdit.value = false
    cleanForm()
}

function cleanForm(){
  name.value = ""
  maxWeigth.value= null
  unitsPerBox.value = null
  index.value = null
}



onBeforeMount(() => {
  getPackaging();
})



</script>