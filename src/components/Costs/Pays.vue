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
            Pedidos clientes
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
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
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
      <div class="col-1"></div>
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


              <q-select filled v-model="DNI" :options="optionsDNI" label="seleccione el DNI" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

             

              <q-input filled type="text" v-model="CONCEPT" label="Concepto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-select filled v-model="PAYMENT_METHOD" :options="optionsMethod" label="seleccione el metodo de pago"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
              <q-input filled type="date" v-model="TIME_TO_PAY" label="tiempo limite a pagar" lazy-rules :rules="[
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
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"></q-btn>
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
              <q-select filled v-model="DNI" :options="optionsDNI" label="seleccione el DNI" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />

            

              <q-input filled type="text" v-model="CONCEPT" label="Concepto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
              <q-select filled v-model="PAYMENT_METHOD" :options="optionsMethod" label="seleccione el metodo de pago"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
              <q-input filled type="number" v-model="TIME_TO_PAY" label="tiempo a pagar (horas)" lazy-rules :rules="[
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
                    class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"></q-btn>
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
    name: "date",
    label: "FECHA",
    field: (row) => row.Date.slice(0, 10),
    align: "center",
  },
  {
    name: "PAYMENT_METHOD",
    label: "METODO DE PAGO",
    field: (row) => row.PAYMENT_METHOD.name,
    align: "center",
  },
  {
    name: "TIME_TO_PAY",
    label: "TIEMPO A PAGAR",
    align: "center",
    field: "TIME_TO_PAY",
  },
  {
    name: "total",
    label: "TOTAL A PAGAR",
    align: "center",
    field: "Total",
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
let TIME_TO_PAY = ref();
let Name = ref([]);
let total = ref();

rows.value.forEach((row, index) => {
  row.index = index;
});

const postPays = async () => {
  console.log("hola soy pays en vue");
  const pays = await PayStore.newPays({
    DNI: DNI.value.value,
    CONCEPT: CONCEPT.value,
    PAYMENT_METHOD: PAYMENT_METHOD.value.value,
    TIME_TO_PAY: TIME_TO_PAY.value,
    Total: total.value,
  });
  console.log(pays);
  getPays();
  prompt.value = false;
  toEmpty();
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
  TIME_TO_PAY.value = data.TIME_TO_PAY;
  total.value = data.Total;
}

async function putInfo() {
  console.log(index.value);
  const res = await PayStore.putPays(index.value,{
    DNI: DNI.value.value,
    CONCEPT: CONCEPT.value,
    PAYMENT_METHOD: PAYMENT_METHOD.value.value,
    TIME_TO_PAY: TIME_TO_PAY.value,
    Total: total.value,
  });
  console.log(ROL.value);
  console.log(res);
  console.log("termine actualizar");
  getPays();
  edit.value = false;
}

function toEmpty() {
  DNI.value = "";
  CONCEPT.value = "";
  PAYMENT_METHOD.value = null;
  TIME_TO_PAY.value = "";
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
     

      let object2 = { label: res.data[i].rol, value: res.data[i]._id };
      ROL.value.push(object2);
     

      let object3 = { label: res.data[i].names, value: res.data[i]._id };
      Name.value.push(object3);
     
    }
    return optionsDNI.value
  
  } else {
    throw new Error("Error al obtener los datos de people");
  }
}




onMounted(() => {
  getPays();
  getPeople();
  getMethod();
});
</script>

<style scoped></style>
