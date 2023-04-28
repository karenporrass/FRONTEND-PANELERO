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
                    <q-input  filled type="text" v-model="name" label="Digite el nombre del empaque"></q-input>
                  <q-input filled type="number" v-model="maxWeight" label="Peso maximo"></q-input>
                  <q-input  filled type="numeber" v-model="units" label="Digite las unidades por caja"></q-input>
                  

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"  />
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
let maxWeight = ref()
let units = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
  {name: 'name',label: 'NOMBRE EMPAQUE',field: 'name',align: 'center'},
  {name: 'weight',label: 'PESO MAXIMO lb',align: 'center',field: row => row.maxWeigth,format: val => `${val}`,sortable: true},
  { name: 'units', align: 'center', label: 'UNIDADES POR CAJA', field: 'unitsPerBox',align: 'center', sortable: true },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([
{name:"kadnska", maxWeight: 3,  unitsPerBox: 4}
])

const postTypePackaing = async ()=>{
  try {
    const packaing = await axios.post(`http://localhost:3500/tipoEmpaque`,{
      name: name.value,
      maxWeigth: maxWeight.value,
      unitsPerBox: units.value
    })
    getTypePackaing()
    console.log(packaing);
  } catch (error) {
    console.log(error);
  }
}
const getTypePackaing = async ()=>{
  try {
    const packa = await axios.get(`http://localhost:3500/tipoEmpaque`)
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