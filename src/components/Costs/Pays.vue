<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <div class="text-weight-bolder text-h4">PAGOS</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div style="display: flex">
          <router-link to="/homeCostos" style="text-decoration: none" class="text-dark">
            <p style="font-size: 20px">
              <span style="font-size: 50px" class="material-icons-outlined">
                arrow_right
              </span>
              Costos
            </p>
          </router-link>
          <p style="font-size: 20px">
            <span style="font-size: 50px" class="material-icons-outlined">
              arrow_right
            </span>
            Pagos
          </p>
        </div>
        <q-btn class="bg-green-10 text-white" @click="(prompt = true), toEmpty()"><span
            class="material-symbols-outlined q-mr-sm" style="font-size: 20px">
            add_circle
          </span>
          Crear nuevo pago</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md justify-center">
      <div class="col-11">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index" virtual-scroll
          v-model:pagination="pagination" :rows-per-page-options="[0]">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="
                  (index = props.row._id), goInfo(props.row), (edit = true)
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
    </div>

    <!-- crear  -->
    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form ref="myForm" @submit.prevent.stop="postPays()">
            <div>


              <q-select filled v-model="DNI" :options="optionsDNI" label="Seleccione el DNI" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

             

              <q-input filled type="text" v-model="CONCEPT" label="Concepto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-select filled v-model="PAYMENT_METHOD" :options="optionsMethod" label="Seleccione el método de pago"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
                   <q-select filled v-model="TypePays" :options="optionsType" label="Seleccione el tipo de pago"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
              <q-input filled type="date" v-model="START_WORK" label="Fecha inicio" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-input filled type="date" v-model="END_WORK" label="Fecha fin" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-input filled type="number" v-model="total" label="Total" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>

              <div class="justify-center flex">
                <br />

                <q-btn icon="save_as" label="GUARDAR" type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                    cancel </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <!-- editar -->
    <q-dialog v-model="edit">
      <q-card style="width: 400px">
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            Actualizar Información
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form ref="myForm" @submit.prevent.stop="putInfo()">
            <div>
              <q-select filled v-model="DNI" :options="optionsDNI" label="Seleccione el DNI" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

            

              <q-input filled type="text" v-model="CONCEPT" label="Concepto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-select filled v-model="PAYMENT_METHOD" :options="optionsMethod" label="Seleccione el método de pago"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
                <q-select filled v-model="TypePays" :options="optionsType" label="Seleccione el tipo de pago"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
              <q-input filled type="date" v-model="START_WORK" label="Fecha inicio" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-input filled type="date" v-model="END_WORK" label="Fecha fin" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-input filled type="number" v-model="total" label="Total" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>

              <div>
                <div class="justify-center flex">
                  <br />

                  <q-btn icon="save_as" label="Actualizar" type="submit"
                    class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                  <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" v-close-popup><span
                      class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                      cancel </span>CERRAR</q-btn>
                </div>
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
import { payStore } from "../../store/Costs/Pays.js";
import { notifyError, notifySuccess } from "../../Global/notify.js";

const PayStore = payStore();
let prompt = ref(false);
let edit = ref(false);
let index = ref();
let pagination = ref({
  rowsPerPage: 0,
});
let columns = ref([

  {
    name: "DNI",
    label: "DNI",
    field: (row) => row.DNI.numberDocument,

    align: "center",
  },

  {
    name: "Name",
    required: true,
    label: "NOMBRE",
    align: "center",
    field: (row) => row.DNI.names,
  },

  {
    name: "ROL",
    label: "ROL",
    field: (row) => row.DNI.rol,

    align: "center",
  },
  {
    name: "CONCEPT",
    label: "CONCEPTO",
    align: "center",
    field: "CONCEPT",
  },
  {
    name: "PAYMENT_METHOD",
    label: "METODO DE PAGO",
    field: (row) => row.PAYMENT_METHOD.name,
    align: "center",
  },
  {
    name: "TypePays",
    label: "TIPO DE PAGO",
    field: (row) => row.TypePays.name,
    align: "center",
  },

  
  {

    name: "START_WORK",
    label: "FECHA INICIO",
    align: "center",
    field: "START_WORK",
  },
  {
    name: "END_WORK",
    label: "FECHA FIN",
    align: "center",
    field: "END_WORK",
  },
  {
    name: "total",
    label: "TOTAL A PAGAR",
    align: "center",
    field: "Total",
  },
  {
    name: "date",
    label: "FECHA DEL PAGO",
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

let rows = ref([]);
let DNI = ref([]);
let ROL = ref([]);
let CONCEPT = ref();
let optionsMethod = ref([]);
let optionsDNI = ref([]);
let PAYMENT_METHOD = ref([]);
let START_WORK = ref();
let END_WORK = ref();
let Name = ref([]);
let total = ref();
let optionsType = ref([]);
let TypePays = ref([]);
rows.value.forEach((row, index) => {
  row.index = index;
});

const postPays = async () => {

  if (START_WORK.value < END_WORK.value) {
      console.log('si');
      const pays = await PayStore.newPays({
    DNI: DNI.value.value,
    CONCEPT: CONCEPT.value,
    PAYMENT_METHOD: PAYMENT_METHOD.value.value,
    TypePays: TypePays.value.value,
    START_WORK: START_WORK.value,
    END_WORK: END_WORK.value,
    Total: total.value,
  });
  console.log(pays);
  getPays();
  prompt.value = false;
  toEmpty();
    } else {
      notifyError('La fecha de fin del trabajo no puede ser menor a la de inicio');
    }

  
};

async function getPays() {
  const res = await PayStore.listPays();

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
    res = await PayStore.active(data._id, 0);
    getPays();
  } else {
    res = await PayStore.active(data._id, 1);
    getPays();
  }
}

function goInfo(data) {
  DNI.value = {
    label: data.DNI.numberDocument,
    value: data.DNI._id,
  };
  CONCEPT.value = data.CONCEPT;
  PAYMENT_METHOD.value = {
    label: data.PAYMENT_METHOD.name,
    value: data.PAYMENT_METHOD._id,
  };
  TypePays.value = {
    label: data.TypePays.name,
    value: data.TypePays._id,
  };

  START_WORK.value = data.START_WORK;
  END_WORK.value = data.END_WORK;
  total.value = data.Total;
}

async function putInfo() {
  console.log(index.value);
  const res = await PayStore.putPays(index.value,{
    DNI: DNI.value.value,
    CONCEPT: CONCEPT.value,
    PAYMENT_METHOD: PAYMENT_METHOD.value.value,
    TypePays: TypePays.value.value,
    START_WORK: START_WORK.value,
    END_WORK: END_WORK.value,
    Total: total.value,
  });
  console.log(res);
  console.log("termine actualizar");
  getPays();
  edit.value = false;
}

function toEmpty() {
  DNI.value = "";
  CONCEPT.value = "";
  PAYMENT_METHOD.value = null;
  TypePays.value = null;
  START_WORK.value = "";
  END_WORK
  total.value = "";
}

async function getMethod() {
  // optionsPeople.value=[]
  const res = await PayStore.listPaymentsActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsMethod.value.push(object);
     

    }
  } else {
    throw new Error("Error al obtener los datos de metodo de pago");
  }
}

async function getPeople() {
  // optionsPeople.value=[]
  const res = await PayStore.listUsersActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object1 = { label: res.data[i].numberDocument, value: res.data[i]._id };
      optionsDNI.value.push(object1);
   
    }
    return optionsDNI.value  
  } else {
    throw new Error("Error al obtener los datos de people");
  }
}


async function getTypePay() {
  // optionsPeople.value=[]
  const res = await PayStore.listTypePayActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsType.value.push(object);
     console.log(optionsType.value);

    }
  } else {
    throw new Error("Error al obtener los datos de metodo de pago");
  }
}



onMounted(() => {
  getTypePay() 
  getPays();
  getPeople();
  getMethod();
});
</script>

<style scoped></style>
