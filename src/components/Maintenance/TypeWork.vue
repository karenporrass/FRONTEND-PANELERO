<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div style="font-size:xx-large;" class="text-weight-bolder">LABORES</div>
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
              </span> Tipo de labores
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
    <div class="row ">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-btn class="bg-green-10 text-white" @click="cleanForm(), prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span>Crear nueva labor</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index" virtual-scroll  :virtual-scroll-item-size="48"
          :pagination="pagination" :rows-per-page-options="[0]"    >
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
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <q-form ref="myForm" @submit.prevent.stop="postTypeWork()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la labor" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input class="q-mb-md" filled type="text" v-model="area" label="Digite el area"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) || 'El campo es requerido',
                ]" />

                <q-input class="q-mb-md" filled type="number" v-model="dailyPayment" label="Dijite el pago diario"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.length > 0) || 'El campo es requerido',
                ]" />
                  
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm bg-green-9" to=""  v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>

          <q-dialog v-model="promptEdit">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <q-form @submit.prevent.stop="putInfo()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la labor" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input class="q-mb-md" filled type="text" v-model="area" label="Digite el area"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) || 'El campo es requerido',
                ]" />

                <q-input class="q-mb-md" filled type="number" v-model="dailyPayment" label="Dijite el pago diario"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.length > 0) || 'El campo es requerido',
                ]" />
                  
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"></q-btn>
                <q-btn  class="q-mt-md q-mb-sm q-mx-sm bg-green-9" type="reset"  v-close-popup><span
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
import { ref,  onBeforeMount } from 'vue'
import axios from 'axios';

import {workStore} from "../../store/Maintenance/TypeWork.js"
let promptEdit = ref(false)

let prompt = ref(false)
let name = ref()
let area = ref()
let dailyPayment = ref()
let index = ref()
let pagination = ref({
  rowsPerPage: 0
})
let columns = ref([
  { name: 'index', label: 'N°', field: 'index' },
  { name: 'name', label: 'NOMBRE LABOR', field: 'name', align: 'center' },
  { name: 'area', label: 'AREA A EJERCER', align: 'center', field: row => row.area, format: val => `${val}`, sortable: true },
  { name: 'dailyPayment', align: 'center', label: 'PAGO DIARIO', field: 'dailyPayment', align: 'center', sortable: true },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])

const useTypeWork = workStore()

// getTypeWork()

// get registros proceso diario 
async function getTypeWork() {
  const res = await useTypeWork.listWork()
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
// getTypeWork()

//post proceso diario
async function postTypeWork() {
  const res = await useTypeWork.newWork(
    name.value, // se llama a las variables del modal
    area.value,
    dailyPayment.value,

  )
  getTypeWork()
  console.log(res);
  prompt.value = false
  cleanForm()
  
}


// activar y desactivar proceso diario 
async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await useTypeWork.active(data._id, 0)
    console.log(res);
    getTypeWork()
  } else {
    res = await useTypeWork.active(data._id, 1)
    console.log(res);
    getTypeWork()
  }
}

function goInfo(data){
    name.value = data.name
    area.value = data.area
    dailyPayment.value = data.dailyPayment
    
}

async function putInfo(){
  console.log(index.value);
  const res = await useTypeWork.putWork(index.value, 
    name.value, 
    area.value,
    dailyPayment.value
   )
    console.log(res);
    getTypeWork()
    promptEdit.value = false
    cleanForm()
}

function cleanForm(){
  name.value = ""
  area.value= ""
  dailyPayment.value = null
  index.value = null
}

onBeforeMount(()=>{

  getTypeWork();
})



</script>