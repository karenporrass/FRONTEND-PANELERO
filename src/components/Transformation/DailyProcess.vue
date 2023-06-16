<template>
  <div>
    <div class="row q-mt-md justify-center">
      <div class="col-10  text-center q-mt-md q-mb-md">
        <div class="text-weight-bolder text-h4">PROCESO DIARIO</div>
      </div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row q-mb-sm">
      <div class="col-1"></div>
      <div class="col-10" style="display: flex">
        <router-link to="/homeTransformacion" style="text-decoration: none; font-size: larger" class="text-dark">
          <div class="q-mr-md">
            <span style="font-size: 30px" class="material-icons-outlined">
              arrow_right </span>Transformación
          </div>
        </router-link>
        <div style="font-size: larger">
          <span style="font-size: 30px" class="material-icons-outlined text-overline">
            arrow_right
          </span>
          Proceso diario
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <q-btn class="bg-green-10 text-white" @click="prompt = true, cleanForm()"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span>
          Crear nuevo proceso diario</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="
                  (index = props.row._id), showInfo(props.row), (edit = true)
                  "></q-btn>
                <q-btn v-if="props.row.state == 0" round size="xs" color="green-10"
                  @click="activarDesactivar(props.row)"><span class="material-symbols-outlined" style="font-size: 18px">
                    check
                  </span></q-btn>
                <q-btn v-else round size="xs" color="red" @click="activarDesactivar(props.row)"><span
                    class="material-symbols-outlined" style="font-size: 18px">
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
          <q-form ref="myForm" @submit.prevent.stop="postDailyProcess()">
            <div>
              <q-input filled type="text" v-model="name" label="Nombre del proceso" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <q-input filled type="text" v-model="description" label="Descripción del proceso" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <q-input filled type="number" v-model="hours" label="Cuántas horas tomó el proceso" lazy-rules :rules="[
                (val) => val != ' ' || 'El campo es requerido',
                (val) => val > 0 || 'El campo debe ser mayor a 0',
              ]" />

              <q-select filled v-model="people" :options="optionsPeople" label="Seleccione las personas" lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="farm" :options="optionsFarm" label="Seleccione la finca" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

              <q-select filled v-model="lot" :options="optionsLot" label="Seleccione el lote" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

              <q-input v-model="date" filled type="date" label="Seleccione la fecha" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-10 text-white"></q-btn>
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
          <q-form ref="myForm" @submit.prevent.stop="putDaily()" @reset.prevent.stop="reset()">
            <div>
              <q-input filled type="text" v-model="name" label="Nombre del proceso" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <q-input filled type="text" v-model="description" label="Descripción del proceso" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <q-input filled type="number" v-model="hours" label="Cuántas horas tomó el proceso" lazy-rules :rules="[
                (val) => val !== '' || 'El campo es requerido',
                (val) => val > 0 || 'El campo debe ser mayor a 0',
              ]" />

              <q-select filled v-model="people" :options="optionsPeople" label="Seleccione las personas" lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="farm" :options="optionsFarm" label="Seleccione la finca" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

              <q-select filled v-model="lot" :options="optionsLot" label="Seleccione el lote" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

              <q-input v-model="date" filled type="date" label="Seleccione la fecha" :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as"></q-btn>
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
import { onMounted, ref } from "vue";
import { useDailyStore } from "../../store/Transformation/dailyProcess.js";
import { usersStore } from "../../store/Maintenance/CreateUsers";
import { farmRegistryStore } from "../../store/Maintenance/FarmRegistry.js"
import { lotsStore } from "../../store/Maintenance/Lots.js"


const useFarms = farmRegistryStore();
const useDaily = useDailyStore();
const useUsers = usersStore();
const useLots = lotsStore()



let prompt = ref(false);
let edit = ref(false);
let name = ref("");
let description = ref("");
let hours = ref();
let people = ref([]);
let lot = ref([]);
let farm = ref([]);
let date = ref();
let index = ref();
let optionsPeople = ref([]);
let optionsFarm = ref([]);
let optionsLot = ref([]);
// let filterOptions = ref(optionsPeople);


let columns = ref([
  {
    name: "index",
    label: "N°",
    field: "index",
    align: "center",
  },
  {
    name: "name",
    label: "NOMBRE",
    field: "name",
    align: "center",
  },
  {
    name: "description",
    label: "DESCRIPCIÓN",
    field: "description",
    align: "center",
  },
  {
    name: "hours",
    label: "HORAS",
    field: "hours",
    align: "center",
  },
  {
    name: "people",
    label: "PERSONA ENCARGADA",
    field: (row) => row.people.names,
    align: "center",
  },
  {
    name: "farm",
    label: "FINCA",
    field: (row) => row.farm.name,
    align: "center",
  },
  {
    name: "lot",
    label: "LOTE",
    field: (row) => row.lot.name,
    align: "center",
  },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.date.slice(0, 10),
    align: "center",
  },
  {
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  {
    name: "options",
    label: "OPCIONES",
    align: "center",
  },
]);

let rows = ref([]);

onMounted(() => {
  getListDaily();
  getPeople();
  getFarms();
  getLots()
});



// get registros proceso diario
async function getListDaily() {
  const res = await useDaily.getDaily();
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
  } else {
    console.log(res);
  }
}
getListDaily();



// post proceso diario
async function postDailyProcess() {
  console.log("hola post");
  await useDaily.postDaily({
    // name: name.value,
    description: description.value,
    hours: hours.value,
    people: people.value.value,
    farm: farm.value.value,
    lot: lot.value.value,
    date: date.value,
  });
  console.log("paseeeeee ");
  console.log(people.value.value);
  prompt.value = false;
  // console.log(res);
  getListDaily();
  reset()
}

// activar y desactivar proceso diario
async function activarDesactivar(data) {
  console.log(data);
  let res = "";
  if (data.state == 1) {
    res = await useDaily.active(data._id, 0);
    console.log(res);
    getListDaily();
  } else {
    res = await useDaily.active(data._id, 1);
    console.log(res);
    getListDaily();
  }
}

async function showInfo(data) {
  name.value = data.name;
  description.value = data.description;
  hours.value = data.hours;
  people.value = {
    label: data.people.names,
    value: data.people._id
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
  console.log(date.value);
  console.log(lot.value);
}




async function putDaily() {
  console.log(index.value);
  console.log(people.value);
  const res = await useDaily.updateDaily(index.value, {
    name: name.value,
    description: description.value,
    hours: hours.value,
    people: people.value.value,
    farm: farm.value.value,
    lot: lot.value.value,
    date: date.value,
  });
  console.log(res);
  console.log("termine actualizar");
  edit.value = false;
  getListDaily();
}


async function getPeople() {
  // optionsPeople.value=[]
  const res = await useUsers.listUsersActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].names, value: res.data[i]._id };
      optionsPeople.value.push(object);

      console.log(optionsPeople.value);
    }
    return optionsPeople.value
  } else {
    throw new Error("Error al obtener los datos de people")
  }
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
    return optionsPeople.value
  } else {
    throw new Error("Error al obtener los datos de lotes")
  }
}



function cleanForm() {
    name.value = "",
    description.value = "",
    hours.value = "",
    people.value = "",
    farm.value = "",
    lot.value = "",
    date.value = ""
}


</script>



<style scoped>
.q-field__control {
  color: rgb(248, 244, 5) !important;
}
</style>