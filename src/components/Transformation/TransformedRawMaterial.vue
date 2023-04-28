<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">MATERIA PRIMA TRANSFORMADA</div>
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
          </span> Crear nueva transformación</q-btn>
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
                <q-btn round icon="delete" size="xs" color="green-10"></q-btn>
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
            <q-select filled class="q-mb-md" v-model="type" :options="options" label="Seleccione la unidad de medida" />
            <q-input filled class="q-mb-md" type="text" v-model="quantity" label="Digite la cantidad"></q-input>
              <q-select filled class="q-mb-xs" v-model="farm" :options="options" label="Seleccione la finca" />
              <q-select filled class="q-mb-xs" v-model="lot" :options="options" label="Seleccione el lote" />
            <div class="q-pb-sm">
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" />
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref } from "vue"
let prompt = ref(false)
let type = ref("")
let quantity = ref("")
let lot = ref()
let date = ref()
let farm= ref()

let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]


let columns = ref([
  { name: 'index', label: 'N°', field: 'index', align: 'center' },
  { name: 'name', label: 'NOMBRE', align: 'center', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'description', align: 'center', label: 'DESCRIPCIÓN', field: 'description', align: 'center', sortable: true },
  { name: 'hours', label: 'HORAS', field: 'hours', align: 'center', sortable: true },
  { name: 'people', label: 'PERSONAS', field: 'people', align: 'center' },


])

let rows = ref([

  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
  }
])

rows.value.forEach((row, index) => {
  row.index = index
})


const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]
    const filterOptions = ref(stringOptions)

      function createValue (val, done){
        if (val.length > 0) {
          if (!stringOptions.includes(val)) {
            stringOptions.push(val)
          }
          done(val, 'toggle')
        }
      }

      function filterFn (val, update){
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
    






</script>


