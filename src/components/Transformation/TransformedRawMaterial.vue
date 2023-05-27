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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="edit = true"></q-btn>
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
            <q-select filled class="q-mb-md" v-model="type" :options="optionsTypes" label="Seleccione la unidad de medida" />
            <q-input filled class="q-mb-md" type="number" v-model="quantity" label="Digite la cantidad"></q-input>
            <q-select filled class="q-mb-xs" v-model="farm" :options="optionsFarm" label="Seleccione la finca" />  
            <q-select filled class="q-mb-xs" v-model="lot" :options="optionsLot" label="Seleccione el lote" />
              <q-input v-model="date" class="q-mb-xs" filled type="date" label="Seleccione la fecha" />
            <div class="q-pb-sm">
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="postTransformed()" />
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
              <q-btn label="guardar" class="text-white bg-green-10" @click="showInfo()" />
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
import { useTransformedStore } from "../../store/Transformation/TransformedRawMaterial.js"
import { farmRegistryStore } from "../../store/Maintenance/FarmRegistry.js"
import { lotsStore } from "../../store/Maintenance/Lots.js"
import { unitsStore } from "../../store/Maintenance/MeasurementUnits.js"

const useTransformed = useTransformedStore()
const useFarms = farmRegistryStore()
const useLots = lotsStore()
const useUnits = unitsStore()


let prompt = ref(false)
let edit= ref(false)
let type = ref()
let quantity = ref("")
let lot = ref("")
let farm = ref("")
let date = ref()
let optionsFarm = ref([]);
let optionsLot = ref([]);
let optionsTypes = ref([]);




let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]


let columns = ref([
  { name: 'index', label: 'N°', field: 'index', align: 'center' },
  { name: 'type', label: 'TIPO DE UNIDAD DE MEDIDA', align: 'center', field: 'type' },
  { name: 'quantity', align: 'center', label: 'CANTIDAD', field: 'quantity', align: 'center', sortable: true },
  { name: 'lot', label: 'LOTE', field: 'lot', align: 'center' },
  { name: 'date', label: 'FECHA', field: 'date', align: 'center' },
  { name: 'options', label: 'OPCIONES', align: 'center' },
])

let rows = ref([])




// get registros proceso diario 
async function getTransformed() {
  const res = await useTransformed.listTransformed()
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
      row.index = index + 1
    })
  } else {
    console.log(res)
  }
}

getTransformed()


//post proceso diario
async function postTransformed() {
  const res = await useTransformed.addTransformed({
    type: type.value, 
    quantity: quantity.value.value,
    lot: lot.value.value,
    farm: farm.value.value,
    date: date.value,
  }
  )
  console.log(res);
  prompt.value = false
  getTransformed()
}


// activar y desactivar proceso diario 
async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await useTransformed.active(data._id, 0)
    console.log(res);
    getTransformed()
  } else {
    res = await useTransformed.active(data._id, 1)
    console.log(res);
    getTransformed()
  }
}


async function getFarms() {
  const res = await useFarms.listFarmsActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].names, value: res.data[i]._id };
      optionsFarm.value.push(object);

      console.log(optionsFarm.value);
    }
  }
}

async function getLots() {
  const res = await useLots.listlotsActive();
  console.log(res);
  // if (res.status < 299) {
  //   console.log("holis");
  //   for (let i in res.data) {
  //     console.log(i);
  //     let object = { label: res.data[i].names, value: res.data[i]._id };
  //     optionsLot.value.push(object);

  //     console.log(optionsLot.value);
  //   }
  // }
  res.forEach((row, index) => {
    optionsLot.value.push({ label: row.name, value: row._id });
    console.log(optionsLot.value);
  });
}

async function getTypes() {
  const res = await useUnits.listUnitsActive();
  console.log(res);
  // if (res.status < 299) {
  //   console.log("holis");
  //   for (let i in res.data) {
  //     console.log(i);
  //     let object = { label: res.data[i].names, value: res.data[i]._id };
  //     optionsTypes.value.push(object);

  //     console.log(optionsTypes.value);
  //   }
  // }
  res.forEach((row, index) => {
    optionsTypes.value.push({ label: row.name, value: row._id });
    console.log(optionsTypes.value);
  });
}



onMounted(() => {
  getTransformed()
  getFarms()
  getLots()
  getTypes()
})







</script>


