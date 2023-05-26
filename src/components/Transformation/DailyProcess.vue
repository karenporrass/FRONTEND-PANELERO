<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <div class="text-weight-bolder text-h4">PROCESO DIARIO</div>
      </div>
      <div class="col-1"></div>
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
        <q-btn class="bg-green-10 text-white" @click="prompt = true"><span class="material-symbols-outlined q-mr-sm"
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
          <q-form @submit.prevent.stop="postDailyProcess()" novalidate>
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
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
                  (val) => val > 0 || 'El campo debe ser mayor a 0',
              ]" />

              <q-select filled v-model="people" use-input use-chips multiple input-debounce="0" @new-value="createValue"
                :options="filterOptions" @filter="filterFn" label="Seleccione las personas" lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null && val !== '' && val !== undefined) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="labor" use-input use-chips multiple input-debounce="0" @new-value="createValue"
                :options="filterOptions" @filter="filterFn" label="Seleccione las labores" lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null && val !== '' && val !== undefined) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="farm" :options="options" label="Seleccione la finca" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null && val !== '') || 'El campo es requerido',
              ]" />
              
              <q-select filled v-model="lot" :options="options" label="Seleccione el lote" :rules="[
                (val) =>
                ((val) => val !== null && val !== '') || 'El campo es requerido',
              ]"/>
              
              <q-input v-model="date" filled type="date" label="Seleccione la fecha" :rules="[
                (val) =>
                ((val) => val !== null && val !== '') || 'El campo es requerido',
              ]"/>


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

    <q-dialog v-model="edit">
      <q-card>
        <q-card-section class="bg-green-10 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            MODIFICA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="putDaily()" novalidate>
            <div>
              <q-input filled class="q-mb-md" type="text" v-model="name" label="Digite el nombre del proceso" lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />
              <q-input filled class="q-mb-md" type="text" v-model="description"
                label="Digite una descripción del proceso"></q-input>
              <q-input filled class="q-mb-md" type="number" v-model="hours"
                label="Digite cuántas horas tomó el proceso"></q-input>
              <q-select filled class="q-mb-md" v-model="people" use-input use-chips multiple input-debounce="0"
                @new-value="createValue" :options="filterOptions" @filter="filterFn" label="Seleccione las personas" />
              <q-select filled class="q-mb-md" v-model="labor" use-input use-chips multiple input-debounce="0"
                @new-value="createValue" :options="filterOptions" @filter="filterFn" label="Seleccione la labor"
                lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null && val !== '') ||
                    'El campo es requerido',
                ]" />
              <q-select filled class="q-mb-md" v-model="farm" :options="options" label="Seleccione la finca" />
              <q-select filled class="q-mb-md" v-model="lot" :options="options" label="Seleccione el lote" />
              <q-input v-model="date" class="q-mb-xs" filled type="date" label="Seleccione la fecha" />
              <div class="q-pb-sm">
                <br />
                <q-btn label="guardar" type="submit" class="text-white bg-green-10" />
                <q-btn class="q-ml-md" label="cerrar" v-close-popup />
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useDailyStore } from "../../store/Transformation/dailyProcess.js";
import { usersStore } from "../../store/Maintenance/CreateUsers";

let prompt = ref(false);
let edit = ref(false);
let name = ref("");
let description = ref("");
let hours = ref();
let people = ref();
let labor = ref();
let lot = ref();
let farm = ref();
let date = ref();
let index = ref();
let optionsPeople = ref([]);
let options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
let stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
let filterOptions = ref(optionsPeople);

const useDaily = useDailyStore();
const useUsers = usersStore();

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
    label: "PERSONAS",
    field: (row) => row,
    align: "center",
  },
  {
    name: "labor",
    label: "LABOR",
    field: "labor",
    align: "center",
  },
  {
    name: "farm",
    label: "FINCA",
    field: "farm",
    align: "center",
  },
  {
    name: "lot",
    label: "LOTE",
    field: "lot",
    align: "center",
  },
  {
    name: "date",
    label: "FECHA",
    field: "date",
    align: "center",
  },
  {
    name: "options",
    label: "OPCIONES",
    align: "center",
  },
]);

let rows = ref([]);

// const newDate = new date.value.toLocaleDateString('en-CO',
// { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')
// console.log(newDate);

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

//post proceso diario
async function postDailyProcess() {
  console.log("hola post");
  const res = await useDaily.postDaily({
    name: name.value,
    description: description.value,
    hours: hours.value,
    people: people.value.value,
    labor: labor.value.value,
    farm: farm.value.value,
    lot: lot.value.value,
    date: date.value,
  });
  console.log("paseeeeee ");
  prompt.value = false;
  getListDaily();
  console.log(res);
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
  people.value = data.people;
  labor.value = data.labor;
  farm.value = data.farm;
  lot.value = data.lot;
  date.value = data.date;
}

async function putDaily() {
  console.log(index.value);
  const res = await useDaily.updateDaily(index.value, {
    name: name.value,
    description: description.value,
    hours: hours.value,
    // people: people.value.value,
    // labor: labor.value.value,
    // farm: farm.value.value,
    // lot: lot.value.value,
    // date: date.value,
  });
  console.log(res);
  getListDaily();
  edit.value = false;
}

async function getPeople() {
  const res = await useUsers.listUsers();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].names, value: res.data[i]._id };
      optionsPeople.value.push(object);

      console.log(optionsPeople.value);
    }
  }
  // res.forEach((row, index) => {
  //   optionsPeople.value.push({ label: row.name, value: row._id });
  //   console.log(optionsPeople.value);
  // });
}

//function de options en modal
function createValue(val, done) {
  if (val.length > 0) {
    if (!optionsPeople.value.includes(val)) {
      optionsPeople.value.push(val);
    }
    done(val, "toggle");
  }
}

function filterFn(val, update) {
  update(() => {
    if (val === "") {
      filterOptions.value = optionsPeople.value;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = optionsPeople.value.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
}

onBeforeMount(() => {
  getListDaily();
  getPeople();
});
</script>
