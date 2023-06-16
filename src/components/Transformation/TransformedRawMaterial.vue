<template>
  <div>
    <div class="row q-mt-md justify-center">
      <div class="col-10  text-center q-mt-md q-mb-md">
        <div class="text-weight-bolder text-h4">MATERIA PRIMA TRANSFORMADA</div>
      </div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10" style="display: flex">
        <router-link to="/homeTransformacion" style="text-decoration: none; font-size: larger" class="text-dark">
          <div class="q-mr-md">
            <span style="font-size: 30px" class="material-icons-outlined">
              arrow_right </span>Transformación
          </div>
        </router-link>
        <div style="font-size: medium">
          <span style="font-size: 30px" class="material-icons-outlined text-overline">
            arrow_right
          </span>
          Materia prima transformada
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row q-mb-md">
      <div class="col-1"></div>
      <div class="col-10">
        <q-btn class="bg-green-10 text-white" @click="prompt = true, cleanForm()"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span> Crear nueva transformación</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index" class="my-table">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="
                  (index = props.row._id), showInfo(props.row), (edit = true)"></q-btn>
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
        <q-card-section class="bg-green-9 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="postTransformed()">
            <div>
              <q-input filled type="number" v-model="quantity" label="Digite la cantidad" lazy-rules :rules="[
                (val) =>
                  (val !== ' ') || 'El campo es requerido',
                  (val > 0 ) || 'El campo debe ser mayor a 0',
              ]" />

            <q-select filled v-model="type" :options="optionsTypes" label="Seleccione la unidad de medida" lazy-rules :rules="[
                (val) =>
                  ((val) => val !== null || val !== '' || val !== undefined) ||
                  'El campo es requerido',
              ]" />

              <q-select filled v-model="farm" :options="optionsFarm" label="Seleccione la finca" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null || val !== '' || val !== undefined) || 'El campo es requerido',
              ]" />
              
              <q-select filled v-model="lot" :options="optionsLot" label="Seleccione el lote" :rules="[
                (val) =>
                ((val) => val !== null || val !== '' || val !== undefined) || 'El campo es requerido',
              ]"/>
              
              <q-input v-model="date" filled type="date" label="Seleccione la fecha" :rules="[
                (val) =>
                ((val) => val !== null || val !== '' || val !== undefined) || 'El campo es requerido',
              ]"/>


              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-10 text-white"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                    cancel </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>


    <q-dialog v-model="edit">
      <q-card>
        <q-card-section class="bg-green-9 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            MODIFICA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="putTransformed()">
            <div>
              <q-input filled type="number" v-model="quantity" label="Digite la cantidad" lazy-rules :rules="[
                (val) =>
                  (val !== ' ') || 'El campo es requerido',
                  (val > 0 ) || 'El campo debe ser mayor a 0',
              ]" />

            <q-select filled v-model="type" :options="optionsTypes" label="Seleccione la unidad de medida" lazy-rules :rules="[
                (val) =>
                  ((val) => val !== null && val !== '' && val !== undefined) ||
                  'El campo es requerido',
              ]" />

              <q-select filled v-model="farm" :options="optionsFarm" label="Seleccione la finca" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
              ]" />
              
              <q-select filled v-model="lot" :options="optionsLot" label="Seleccione el lote" :rules="[
                (val) =>
                ((val) => val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
              ]"/>
              
              <q-input v-model="date" filled type="date" label="Seleccione la fecha" :rules="[
                (val) =>
                ((val) => val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
              ]"/>


              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-10 text-white"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                    cancel </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
   

  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue"
import { storeTransformed } from "../../store/Transformation/TransformedRawMaterial.js"
import {lotsStore} from "../../store/Maintenance/Lots.js"
import { farmRegistryStore } from "../../store/Maintenance/FarmRegistry.js"
import {unitsStore} from "../../store/Maintenance/MeasurementUnits.js"
const useTransformed = storeTransformed()
const useLots = lotsStore()
const useFarms = farmRegistryStore();
const useTypes = unitsStore()


let prompt = ref(false);
let edit= ref(false);
let index = ref();
let type = ref();
let quantity = ref("");
let lot = ref("");
let farm = ref("");
let date = ref();
let optionsFarm = ref([]);
let optionsLot = ref([]);
let optionsTypes = ref([]);

let columns = ref([
  { 
  name: 'index', 
  label: 'N°', 
  field: 'index', 
  align: 'center' 
},
  { 
  style: 'max-width: 10px; white-space: normal; text-overflow: initial !important;',
  name: 'type', 
  label: 'TIPO DE UNIDAD DE MEDIDA', 
  align: 'center', 
  field: (row) => row.type.name,
},
  { 
  name: 'quantity', 
  label: 'CANTIDAD', 
  field: (row) => row.quantity,
  align: 'center', 

},
  { 
  name: 'farm', 
  label: 'FINCA', 
  field: (row) => row.farm.name,
  align: 'center' 
},
  { 
  name: 'lot', 
  label: 'LOTE', 
  field: (row) => row.lot.name,
  align: 'center' 
},
  { 
  name: 'date', 
  label: 'FECHA', 
  field: (row) => row.date.slice(0, 10),
  align: 'center' 
},
{
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  { 
  name: 'options', 
  label: 'OPCIONES', 
  align: 'center' 
},
])

let rows = ref([])

onMounted(() => {
  getTransformed()
  getFarms()
  getLots()
  getTypes()
})



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



//post proceso diario
async function postTransformed() {
  await useTransformed.addTransformed({
    type: type.value.value,
    quantity: quantity.value,
    lot: lot.value.value,
    farm: farm.value.value,
    date: date.value,
  });
  console.log("hola post");
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


function showInfo(data) {
  quantity.value = data.quantity;
  type.value = {
    label: data.type.name,
    value: data.type._id
  };
  farm.value = {
    label: data.farm.name,
    value: data.farm._id
  };
  lot.value = {
    label: data.lot.name,
    value: data.lot._id
  };
  date.value = data.date.slice(0, 10);
}

async function putTransformed() {
  console.log(index.value);
  const res = await useTransformed.updateTransformed(index.value, {
    // type: type.value.value,
    quantity: quantity.value,
    lot: lot.value.value,
    farm: farm.value.value,
    date: date.value,
  });
  console.log(res);
  getTransformed();
  edit.value = false;
}




async function getFarms() {
  const res = await useFarms.listFarmsActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsFarm.value.push(object);

      console.log(optionsFarm.value);
    }
  }
}

async function getLots() {
  const res = await useLots.listlotsActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsLot.value.push(object);

      console.log(optionsLot.value);
    }
  }
}

async function getTypes() {
  const res = await useTypes.listUnitsActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsTypes.value.push(object);

      console.log(optionsTypes.value);
    }
  }
}




function cleanForm(){
  quantity.value = "",
  type.value = null,
  farm.value = null,
  lot.value = null,
  date.value = ""
}



</script>



<style scoped>
.my-table .q-table__middle tbody tr th,
.my-table .q-table__middle tbody tr td {
  white-space: normal;
  overflow: visible;
  text-overflow: initial !important; /* text-overflow: ellipsis; para cortar el texto */
}
</style>


