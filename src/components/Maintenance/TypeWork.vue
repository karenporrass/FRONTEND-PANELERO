<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">TIPO DE EMPAQUES</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear nuevo tipo de empaque</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" />
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
                    <q-input  filled type="text" v-model="name" label="Digite el nombre de la labor"></q-input>
                  <q-input filled type="text" v-model="area" label="Digite el area "></q-input>
                  <q-input  filled type="number" v-model="dailyPayment" label="Digite el pago diario"></q-input>
                  

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postLabors()" />
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
import axios from 'axios';

let prompt = ref(false)
let name = ref("")
let area = ref("")
let dailyPayment = ref("")
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE LABOR',field: 'name',align: 'center'},
  {name: 'area',label: 'AREA A EJERCER',align: 'center',field: row => row.area,format: val => `${val}`,sortable: true},
  { name: 'dailyPayment', align: 'center', label: 'PAGO DIARIO', field: 'dailyPayment',align: 'center', sortable: true },
])

let rows = ref([])
rows.forEach((row, index) => {
  row.index = index
})

const postLabors = async ()=>{
  try {
    const labors = await axios.post(`http://localhost:3500/tipoLabor`,{
      name: name.value,
      area: area.value,
      dailyPayment: dailyPayment.value
    })
    getLabors()
    console.log(labors);
  } catch (error) {
    console.log(error);
  }
}
const getLabors = async ()=>{
  try {
    const labors = await axios.get(`http://localhost:3500/tipoLabor`)
    console.log(labors);
    rows.value=labors.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=>{
  getLabors()
})



</script>