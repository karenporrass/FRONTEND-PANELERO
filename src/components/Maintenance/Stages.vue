<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">ETAPAS DE PRODUCCION</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nueva etapa</q-btn>
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
                    <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la etapa"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite una descripcion"></q-input>
                  

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postStages()" />
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
let descripcion = ref("")
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE ETAPA',field: 'name',align: 'center'},
  {name: 'description',label: 'DESCRIPCION',align: 'center',field: row => row.descripcion,format: val => `${val}`,sortable: true}
])

let rows = ref([])

rows.value.forEach((row, index) => {
  row.index = index
})


const postStages = async ()=>{
  try {
    const stage = await axios.post(`http://localhost:3500/etapas`,{
      name: name.value,
      descripcion: descripcion.value,
    })
    getStages()
    console.log(stage);
  } catch (error) {
    console.log(error);
  }
}
const getStages = async ()=>{
  try {
    const stage = await axios.get(`http://localhost:3500/etapas`)
    console.log(stage);
    rows.value=stage.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=>{
  getStages()
})

</script>