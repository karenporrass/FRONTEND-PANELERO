<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>

      <div class="col-10 text-center">
        <div class="text-weight-bolder text-h4">Bodegas</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div style="display: flex">
          <router-link
            to="/homeInventory"
            style="text-decoration: none"
            class="text-dark"
          >
            <p style="font-size: 20px">
              <span style="font-size: 50px" class="material-icons-outlined">
                arrow_right
              </span>
              Inventario
            </p>
          </router-link>
          <p style="font-size: 20px">
            <span style="font-size: 50px" class="material-icons-outlined">
              arrow_right
            </span>
            Bodegas
          </p>
        </div>
        <q-btn
          class="bg-green-10 text-white"
          @click="(prompt = true), toEmpty()"
          ><span
            class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px"
          >
            add_circle </span
          >Crear nueva bodega</q-btn
        >
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
        <q-table
          style="height: 400px"
          flat
          bordered
          :rows="rows"
          :columns="columns"
          row-key="index"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn
                  round
                  icon="edit"
                  class="q-mx-md"
                  size="xs"
                  color="green-10"
                  @click="
                    (index = props.row._id),
                      goInfo(props.row),
                      (promptEdit = true)
                  "
                ></q-btn>
                <q-btn
                  v-if="props.row.state == 0"
                  round
                  size="xs"
                  color="green-10"
                  @click="activarDesactivar(props.row)"
                  ><span
                    class="material-symbols-outlined"
                    style="font-size: 18px"
                  >
                    check
                  </span></q-btn
                >
                <q-btn
                  v-else
                  round
                  size="xs"
                  color="red"
                  @click="activarDesactivar(props.row)"
                  ><span
                    class="material-symbols-outlined"
                    style="font-size: 18px"
                  >
                    close
                  </span></q-btn
                >
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="col-1"></div>
    </div>
    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form ref="myForm" @submit.prevent.stop="postVault()">
            <div>
              <q-select
                filled
                v-model="administrator"
                :options="optionsDNI"
                label="seleccione el administrador"
                lazy-rules
                use-input
                input-debounce="0"
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]"
              />

              <q-input
                filled
                type="text"
                v-model="name_cellars"
                label="Digite el nombre de la bodega"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>
              <q-input
                filled
                type="text"
                v-model="content"
                label="Digite el contenido de la bodega"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>

              <q-input
                filled
                type="text"
                v-model="extension"
                label="Digite la extension"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>
              <q-input
                filled
                type="text"
                v-model="dirrecion"
                label="Digite la dirrecion"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>

              <div class="justify-center flex">
                <br />
                <q-btn
                  icon="save_as"
                  label="Guardar"
                  type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"
                ></q-btn>
                <q-btn
                  type="button"
                  class="q-mt-md q-mb-sm q-mx-sm"
                  v-close-popup
                  ><span
                    class="material-symbols-outlined q-mr-sm"
                    style="font-size: 23px"
                  >
                    cancel </span
                  >CERRAR</q-btn
                >
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="promptEdit">
      <q-card style="width: 400px">
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            Actualizar Información
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form ref="myForm" @submit.prevent.stop="putInfo()">
            <div>
              <q-select
                filled
                v-model="administrator"
                :options="optionsDNI"
                label="seleccione el administrador"
                lazy-rules
                use-input
                input-debounce="0"
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]"
              />

              <q-input
                filled
                type="text"
                v-model="name_cellars"
                label="Digite el nombre de la bodega"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>
              <q-input
                filled
                type="text"
                v-model="content"
                label="Digite el contenido de la bodega"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>

              <q-input
                filled
                type="text"
                v-model="extension"
                label="Digite la extension"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>
              <q-input
                filled
                type="text"
                v-model="dirrecion"
                label="Digite la dirrecion"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]"
              ></q-input>

              <div class="justify-center flex">
                <br />
                <q-btn
                  icon="save_as"
                  label="Actualizar"
                  type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"
                ></q-btn>
                <q-btn
                  type="button"
                  class="q-mt-md q-mb-sm q-mx-sm"
                  v-close-popup
                  ><span
                    class="material-symbols-outlined q-mr-sm"
                    style="font-size: 23px"
                  >
                    cancel </span
                  >CERRAR</q-btn
                >
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { vaultStore } from "../../store/Inventory/vault.js";
import {usersStore} from "../../store/Maintenance/CreateUsers.js";

const useU= usersStore()
const VaultStore = vaultStore();
let prompt = ref(false);

let pagination = ref({
  rowsPerPage: 0,
});
let columns = ref([
  {
    name: "name",
    required: true,
    label: "NOMBRE BODEGA",
    align: "center",
    field: "name_cellars",
  },
  {
    name: "Contenido",
    align: "center",
    label: "CONTENIDO DE LA BODEGA",
    field: "content",
    align: "center",
  },
  {
    name: "administrator",
    label: "ADMINISTRADOR",
    field: (row) => row.administrator.names,

    align: "center",
  },
  {
    name: "extension",
    label: "EXTENSION",
    field: "extension",
    align: "center",
  },
  {
    name: "dirrecion",
    label: "DIRRECION",
    field: "dirrecion",
    align: "center",
  },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.Date.slice(0, 10),
    align: "center",
  },
  {
    name: "status",
    label: "ESTADO",
    field: (row) => (row.state == 1 ? "Activo" : "Inactivo"),
    align: "center",
  },
  {
    name: "options",
    align: "center",
    label: "OPCIONES",
    align: "center",
    sortable: true,
  },
]);

let name_cellars = ref();
let content = ref();
let administrator = ref([]);
let extension = ref();
let dirrecion = ref();
let promptEdit = ref(false);
let index = ref();
let optionsDNI = ref([]);
let rows = ref([]);

rows.value.forEach((row, index) => {
  row.index = index;
});

async function getVault() {
  const res = await VaultStore.listVault();
  if (res.status < 299) {
    rows.value = res.data;
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });
  } else {
    console.log(res);  
  }
  console.log(res);
}

const postVault = async () => {
  console.log("hola");
  const vault = await VaultStore.newVault({
    name_cellars: name_cellars.value,
    content: content.value,
    administrator: administrator.value.value,
    extension: extension.value,
    dirrecion: dirrecion.value,
  });
console.log(vault);
  console.log("pos");
  console.log(extension.value);
  getVault();
  prompt.value = false;
};


async function activarDesactivar(data) {
  let res = "";
  if (data.state == 1) {
    res = await VaultStore.active(data._id, 0);
    console.log(res);
    getVault();
  } else {
    res = await VaultStore.active(data._id, 1);
    console.log(res);
    getVault();
  }
}

function goInfo(data) {
  name_cellars.value = data.name_cellars;
  content.value = data.content;
  administrator.value = {
    label: data.administrator.names,
    value: data.administrator._id,
  };
  nameUsers.value = data.administrator.names
  extension.value = data.extension;
  dirrecion.value = data.dirrecion;
  console.log(administrator.value);
}

async function putInfo() {
  console.log(index.value);
  const res = await VaultStore.putVault(
    index.value,
    name_cellars.value,
    content.value,
    administrator.value.value,
    extension.value,
    dirrecion.value
  );
  console.log(res);
  promptEdit.value = false;
  getVault();
}

function toEmpty() {
  name_cellars.value = "";
  content.value = "";
  administrator.value = null;
  extension.value = "";
  dirrecion.value = "";
}

async function getPeople() {
  const res = await VaultStore.listUsersActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object1 = {
        label: res.data[i].names, value: res.data[i]._id,
      };
      optionsDNI.value.push(object1);
    }
    return optionsDNI.value;
  } else {
    throw new Error("Error al obtener los datos de people");
  }
}




onMounted(() => {
  getVault();
  getPeople();
});
</script>

<style scoped></style>
