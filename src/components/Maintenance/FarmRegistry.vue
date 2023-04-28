<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">FINCAS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class=" text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nueva finca</q-btn>
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
              <div >
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10"></q-btn>
                <q-btn round icon="delete" size="xs" color="green-10"></q-btn>
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
                    <q-input class="q-mb-md"  filled type="number" v-model="registrationNumber" label="Digite el numero de matricula"></q-input>
                    <q-input class="q-mb-md"  filled type="text" v-model="name" label="Digite el nombre de la finca"></q-input>
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
  {name: 'registrationNumber',label: 'NUMERO DE MATRICULA',align: 'center',field: row => row.registrationNumber,format: val => `${val}`,sortable: true},
  { name: 'extent', align: 'center', label: 'EXTENCION M', field: 'extent',align: 'center', sortable: true },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([
{name:"kadnska", maxWeight: 3,  unitsPerBox: 4}
])
rows.value.forEach((row, index) => {
  row.index = index
})

const postFarmRegistry = async ()=>{
  try {
    const farm = await axios.post(`http://localhost:3500/registroFinca`,{
      name: name.value,
      registrationNumber: registrationNumber.value,
     extent: extent.value
    })
    getFarmRegistry()
    console.log(farm);
  } catch (error) {
    console.log(error);
  }
}
const getFarmRegistry = async ()=>{
  try {
    const farm = await axios.get(`http://localhost:3500/registroFinca`)
    console.log(farm);
    rows.value=farm.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=>{
  getFarmRegistry()
})



</script>