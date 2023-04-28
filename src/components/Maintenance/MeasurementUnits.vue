<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">UNIDADES DE MEDIDA</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class=" text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nueva unidad de medida</q-btn>
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
                    <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la unidad de medida"></q-input>
                  <q-input filled type="text" v-model="format" label="Digite el formato"></q-input>
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postUnits()" />
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
let format = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE DE LA UNIDAD DE MEDIDA',field: 'name',align: 'center'},
  {name: 'weight',label: 'FORMATO',align: 'center',field: row => row.format,format: val => `${val}`,sortable: true},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([
{name:"kadnska", maxWeight: 3,  unitsPerBox: 4}
])
rows.value.forEach((row, index) => {
  row.index = index
})

const postUnits = async ()=>{
  try {
    const unit = await axios.post(`http://localhost:3500/unidadesMedida`,{
      name: name.value,
      format: format.value,
    })
    getUnits()
    console.log(unit);
  } catch (error) {
    console.log(error);
  }
}
const getUnits = async ()=>{
  try {
    const units = await axios.get(`http://localhost:3500/unidadesMedida`)
    console.log(units);
    rows.value=units.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=>{
  getUnits()
})

</script>