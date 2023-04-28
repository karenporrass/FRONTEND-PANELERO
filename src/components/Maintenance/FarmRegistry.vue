<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">REGISTRO FINCAS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear nueva finca</q-btn>
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
                    <q-input  filled type="number" v-model="registrationNumber" label="Digite el numero de matricula"></q-input>
                    <q-input  filled type="text" v-model="name" label="Digite el nombre de la finca"></q-input>
                  <q-input filled type="text" v-model="extent" label="Digite en metros las extencion de terreno"></q-input>
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postFarmRegistry()"  />
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
let registrationNumber = ref("")
let extent = ref("")
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE DE LA FINCA',field: 'name',align: 'center'},
  {name: 'registrationNumber',label: 'NUMERO DE MATRICULA',align: 'center',field: row => row.extent,format: val => `${val}`,sortable: true},
  { name: 'extent', align: 'center', label: 'EXTENCION M', field: 'extent',align: 'center', sortable: true },
])

let rows = ref([])
rows.forEach((row, index) => {
  row.index = index
})

const postFarmRegistry = async ()=>{
  try {
    const packaing = await axios.post(`http://localhost:3500/registroFinca`,{
      name: name.value,
      registrationNumber: registrationNumber.value,
     extent: extent.value
    })
    getFarmRegistry()
    console.log(packaing);
  } catch (error) {
    console.log(error);
  }
}
const getFarmRegistry = async ()=>{
  try {
    const packa = await axios.get(`http://localhost:3500/registroFinca`)
    console.log(packa);
    rows.value=packa.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=>{
  getTypePackaing()
})



</script>