<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">PROCESO DIARIO</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row ">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-btn class="bg-green-10 text-white" @click="prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span> Crear nuevo proceso diario</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10"></q-btn>
                <q-btn v-if="props.row.state==0" round  size="xs" color="green-4" @click="activarDesactivar(props.row)">✅</q-btn>
                <q-btn v-else round  size="xs" color="green-4" @click="activarDesactivar(props.row)">❌</q-btn>
              </div>
            </q-td>
          </template>

        </q-table>
      </div>
      <div class="col-1"></div>
    </div>

    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <div>
            <q-input filled class="q-mb-md" type="text" v-model="name" label="Digite el nombre del proceso"></q-input>
            <q-input filled class="q-mb-md" type="text" v-model="description"
              label="Digite una descripción del proceso"></q-input>
            <q-input filled class="q-mb-md" type="number" v-model="hours"
              label="Digite cuántas horas tomó el proceso"></q-input>
            <q-select filled class="q-mb-md" v-model="people" use-input use-chips multiple input-debounce="0"
              @new-value="createValue" :options="filterOptions" @filter="filterFn" label="Seleccione las personas" />
            <q-select filled class="q-mb-md" v-model="labor" use-input use-chips multiple input-debounce="0"
              @new-value="createValue" :options="filterOptions" @filter="filterFn" label="Seleccione la labor" />
            <q-select filled class="q-mb-md" v-model="farm" :options="options" label="Seleccione la finca" />
            <q-select filled class="q-mb-md" v-model="lot" :options="options" label="Seleccione el lote" />
            <q-input v-model="date" class="q-mb-xs" filled type="date" label="Seleccione la fecha" />
            <div class="q-pb-sm">
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="postDailyProcess()" />
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";
import {useDailyStore} from "../../store/dailyProcess.js"

const useDaily = useDailyStore()

async function getListDaily(){
  const res = await useDaily.listDaily()
  console.log(res);
  if(res.status <299){
    rows.value=res.data
  }else{
    alert(res)
  }
}

getListDaily()

let prompt = ref(false)
let name = ref("")
let description = ref("")
let hours = ref()
let people = ref()
let labor = ref()
let lot = ref()
let farm = ref()
let date = ref()
let options = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]


let columns = ref([
  { name: 'index', label: 'N°', field: 'index', align: 'center' },
  { name: 'name', label: 'NOMBRE', field: 'name', align: 'center' },
  { name: 'description', label: 'DESCRIPCIÓN', field: 'description', align: 'center' },
  { name: 'hours', label: 'HORAS', field: 'hours', align: 'center', sortable: true },
  { name: 'people', label: 'PERSONAS', field: 'people', align: 'center' },
  { name: 'labor', label: 'LABOR', field: 'labor', align: 'center' },
  { name: 'farm', label: 'FINCA', field: 'farm', align: 'center' },
  { name: 'lot', label: 'LOTE', field: 'lot', align: 'center' },
  { name: 'date', label: 'FECHA', field: 'date', align: 'center' },
  { name: 'options', label: 'OPCIONES', align: 'center' },
])

let rows = ref([
])

async function activarDesactivar(data){
  let res=""
  if (data.state==1){
    res =await useDaily.active(data._id, 0)
    console.log(res);
    getListDaily()
  }else{
    res = await useDaily.active(data._id, 1)
    console.log(res);
    getListDaily()
  }

  
}

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]
const filterOptions = ref(stringOptions)

function createValue(val, done) {
  if (val.length > 0) {
    if (!stringOptions.includes(val)) {
      stringOptions.push(val)
    }
    done(val, 'toggle')
  }
}

function filterFn(val, update) {
  update(() => {
    if (val === '') {
      filterOptions.value = stringOptions
    }
    else {
      const needle = val.toLowerCase()
      filterOptions.value = stringOptions.filter(
        v => v.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const postDailyProcess = async () => {
  try {
    const daily = await axios.post(`http://localhost:3500/procesoDiario`, {
      name: name.value,
      description: description.value,
      hours: hours.value,
      people: people.value,
      labor: labor.value,
      farm: farm.value,
      lot: lot.value,
      date: date.value,
    })
    //getDailyProcess();
    console.log(daily);
  } catch (error) {
    console.log(error);
  }
}

/* const getDailyProcess = async () => {
  try {
    const process = await axios.get(`http://localhost:3500/procesoDiario/${1}`)
    rows.value = process.data
    rows.value.forEach((row, index) => {
      row.index = index + 1
    })
  } catch (error) {
    console.log(error);
  }
} */

/* onMounted(()=>{
  getDailyProcess()
}) */
</script>


