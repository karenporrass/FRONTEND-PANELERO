<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <div style="font-size: xx-large" class="text-weight-bolder">FINCAS</div>
      </div>
      <div class="col-1"></div>
    </div>
    <q-separator class="q-my-md bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px" />
    <div class="row q-mb-sm">
      <div class="col-1"></div>
      <div class="col-10" style="display: flex">
        <router-link to="/homeMantenimiento" style="text-decoration: none; font-size: larger" class="text-dark">
          <div class="q-mr-md">
            <span style="font-size: 35px" class="material-icons-outlined">
              arrow_right
            </span>
            Mantenimiento
          </div>
        </router-link>
        <div style="font-size: larger">
          <span style="font-size: 35px" class="material-icons-outlined">
            arrow_right
          </span>
          Fincas
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <q-btn class="text-capitalize bg-green-10 text-white" @click="cleanForm(), (prompt = true)"><span
            class="material-symbols-outlined q-mr-sm" style="font-size: 20px">
            add_circle </span>Crear nueva finca</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
        <q-table style="height: 50vh" flat bordered :rows="rows" :columns="columns" row-key="index" virtual-scroll
          v-model:pagination="pagination" :rows-per-page-options="[0]">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="
                  cleanForm(),
                  (index = props.row._id),
                  goInfo(props.row),
                  (promptEdit = true)
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
      <q-card class="my-card">
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="postFarmRegistry()" @reset.prevent.stop="cleanForm()">
            <div>
              <q-input filled type="number" v-model="registrationNumber" label="Digite el número de matrícula" lazy-rules
                :rules="[(val) => val > 0 || 'El campo es requerido']" />
              <q-input filled type="text" v-model="name" label="Digite el nombre de la Finca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <q-input filled type="number" v-model="extent" label="Digite en metros la extención del terreno" lazy-rules
                :rules="[(val) => val > 0 || 'El campo es requerido']" />
              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                    cancel </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="promptEdit">
      <q-card class="my-card">
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="putInfo()" @reset.prevent.stop="cleanForm()">
            <div>
              <q-input filled type="number" v-model="registrationNumber" label="Digite el número de matrícula" lazy-rules
                :rules="[(val) => val > 0 || 'El campo es requerido']" />
              <q-input filled type="text" v-model="name" label="Digite el nombre de la Finca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

              <q-input filled type="number" v-model="extent" label="Digite en metros la extención del terreno" lazy-rules
                :rules="[(val) => val > 0 || 'El campo es requerido']" />
              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
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
import { ref, onMounted, onBeforeMount } from "vue";
import { farmRegistryStore } from "../../store/Maintenance/FarmRegistry.js";
const farmStore = farmRegistryStore();
let promptEdit = ref(false);
let prompt = ref(false);
let name = ref("");
let registrationNumber = ref("");
let extent = ref();
let index = ref();
let pagination = ref({
  rowsPerPage: 0,
});
let columns = ref([
  { name: "index", label: "#", field: "index" },
  { name: "name", label: "NOMBRE DE LA FINCA", field: "name", align: "center" },
  {
    name: "registrationNumber",
    label: "NÚMERO DE MATRICULA",
    align: "center",
    field: (row) => row.registrationNumber,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "extent",
    align: "center",
    label: "EXTENCIÓN EN METROS",
    field: "extent",
    align: "center",
    sortable: true,
  },
  {name: "status",label: "ESTADO",field: (row) => (row.state == 1 ? "Activo" : "Inactivo"),align: "center",},

  {
    name: "options",
    align: "center",
    label: "OPCIONES",
    align: "center",
    sortable: true,
  },
]);

let rows = ref([]);

const postFarmRegistry = async () => {
  const farm = await farmStore.newFarm(
    name.value,
    registrationNumber.value,
    extent.value
  );
  console.log(farm);
  getFarmRegistry();
  prompt.value = false;
  cleanForm();
};
async function getFarmRegistry() {
  const res = await farmStore.listFarms();
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
  } else {
    alert(res);
  }
}

async function activarDesactivar(data) {
  let res = "";
  if (data.state == 1) {
    res = await farmStore.active(data._id, 0);
    console.log(res);
    getFarmRegistry();
  } else {
    res = await farmStore.active(data._id, 1);
    console.log(res);
    getFarmRegistry();
  }
}

function goInfo(data) {
  name.value = data.name;
  registrationNumber.value = data.registrationNumber;
  extent.value = data.extent;
}

async function putInfo() {
  console.log(index.value);
  const res = await farmStore.putFarm(
    index.value,
    name.value,
    registrationNumber.value,
    extent.value
  );
  console.log(res);
  getFarmRegistry();
  promptEdit.value = false;
  cleanForm();
}

function cleanForm() {
  name.value = "";
  registrationNumber.value = "";
  extent.value = null;
  index.value = null;
}

onBeforeMount(() => {
  getFarmRegistry();
});
</script>
