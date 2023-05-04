<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">PAGOS</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row ">
      <div class="col-1"></div>
      <div class="col-10 ">
        <div>
          <p style="font-size: 20px; " ><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> PEDIDOS CLIENTES</p>
        </div>
        <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear nuevo pago</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index" virtual-scroll
          v-model:pagination="pagination" :rows-per-page-options="[0]" />
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
          <div>
            <q-input filled type="number" v-model="document" label="Digite el numero de documento"></q-input>
            <q-input filled type="text" v-model="rol" label="Digite el rol"></q-input>
            <q-input filled type="text" v-model="concept" label="Digite el concepto"></q-input>
            <q-input filled type="text" v-model="date" label="Digite la fecha"></q-input>
            
            <q-input filled type="text" v-model="methodPay" label="Escoga el meotodo de pago"></q-input>
            <q-input filled type="number" v-model="time" label="Digite el tiempo a pagar"></q-input>
            <q-input filled type="number" v-model="total" label="Total a pagar"></q-input>

            <div>
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="getTypePays()" />
              <q-btn class="q-ml-md" label="cerrar" v-close-popup  />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios';
let prompt = ref(false)
let pagination = ref({
  rowsPerPage: 0
})
let columns = ref([
  { name: 'DNI', required: true, label: 'NUMERO DE DOCUMENTO', align: 'center', field: 
"DNI"},
  { name: 'Rol', align: 'center', label: 'ROL',  align: 'center', field: 
"rol"  },
  { name: 'concept', label: 'CONCEPTO', sortable: true, align: 'center', field: 
"concept" },
  { name: 'date', label: 'FECHA PAGO', align: 'center', field: 
"date" },
  { name: 'Method', label: 'METODO DE PAGO',  align: 'center', field: 
"Method" },
  { name: 'time', label: 'TIEMPO A PAGAR',  align: 'center', field: 
"time" },
  { name: 'total', label: 'TOTAL A PAGAR',  align: 'center', field: 
"total"}
])

let document  = ref()
let rol = ref()
let concept = ref()
let methodPay = ref()
let time = ref()
let total = ref()
let date = ref()

let rows = ref([
  {
    DNI: 1,  rol: 1, concept: 1, date: 1, Method: 1, time: 1, total: 1,
  },
  
])


const postPays = async ()=>{
  try {
    const pays = await axios.post(`http://localhost:3500/payments`,{
      DNI:document,
rol:rol,
concept:concept,
MethodmethodPay,
date :date,
total:total,
time: time
     
    
     
    })
    getTypePays()
    console.log(pays);
  } catch (error) {
    console.log(error);
  }
}
const getTypePays = async ()=>{
  try {
    const packa = await axios.get(`http://localhost:3500/payments`)
    console.log(packa);
    rows.value=packa.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=>{
  getTypePays()
})



</script>