<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">EMPAQUETADO</div>
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
          </span> Crear nuevo empaque</q-btn>
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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="edit= true"></q-btn>
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
      <q-card>
        <q-card-section class="bg-green-10 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <div>
            <q-select filled class="q-mb-md" v-model="cellarCode" :options="options" label="Seleccione el código de la bodega" />
            <q-select filled class="q-mb-md" v-model="typePacking" :options="options" label="Seleccione el tipo de empaque" />
            <q-select filled class="q-mb-md" v-model="typePanela" :options="options" label="Seleccione el tipo de panela" />
            <q-select filled class="q-mb-xs" v-model="formPanela" :options="options" label="Seleccione la forma de la panela" />
            <q-input filled class="q-mb-md"  v-model="totalPanelas" type="number" label="Digite el total de panelas"></q-input>
            <div class="q-pb-sm">
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="postPacked()"/>
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>



    <q-dialog v-model="edit">
      <q-card>
        <q-card-section class="bg-green-10 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            MODIFICA LA INFORMACIÓN
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
import { ref, onMounted } from "vue"
import { usePackedStore } from "../../store/Transformation/Packed.js"
let prompt = ref(false)
let edit= ref(false)
let cellarCode = ref("")
let typePacking = ref("")
let typePanela = ref()
let formPanela = ref()
let totalPanelas = ref()
let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]

//f
let columns = ref([
  { name: 'index', label: 'N°', field: 'index', align: 'center' },
  { name: 'cellarCode', label: 'CODIGO DE BODEGA', field: 'cellarCode', align: 'center' },
  { name: 'typePacking', label: 'TIPO DE EMPAQUE', field: 'typePacking', align: 'center' },
  { name: 'typePanela', label: 'TIPO DE PANELA', field: 'typePanela', align: 'center' },
  { name: 'formPanela', label: 'FORMA DE LA PANELA', field: 'formPanela', align: 'center' },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center' },

])

let rows = ref([])
const usePacked= usePackedStore()

// getPacked()

// get registros empaques
async function getPacked() {
  const res = await usePacked.listPacked()
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
getPacked()

//post empaques
async function postPacked() {
  const res = await usePacked.addPacked(
    cellarCode.value, // se llama a las variables del modal
    typePacking.value,
    typePanela.value,
    formPanela.value,
    totalPanelas.value,
  )
  console.log(res);
  getPacked()
}


// activar y desactivar empaques 
async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await usePacked.active(data._id, 0)
    console.log(res);
    getPacked()
  } else {
    res = await usePacked.active(data._id, 1)
    console.log(res);
    getPacked()
  }
}


onMounted(
  () => {
  getPacked()
})





</script>


