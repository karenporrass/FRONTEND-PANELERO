<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <div class="text-weight-bolder text-h4">GASTOS OCASIONALES</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />

    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div style="display: flex">
          <router-link
            to="/homeCostos"
            style="text-decoration: none"
            class="text-dark"
          >
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
            Gastos Ocacionales
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
          >Crear nuevo gasto</q-btn
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
                    (index = props.row._id), goInfo(props.row), (promptEdit = true)
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

 
    <!--  Modal crear -->

    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">

          <q-form ref="myForm" @submit.prevent.stop="postOccasional ()" >
          <div>
            <q-input
              filled
              type="text"
              v-model="Name_spent"
              label="Digite el nombre del gasto"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"
            ></q-input>
            <q-select
              filled
             
              v-model="Finca"
              :options="optionsFarm"
              label="seleccione la finca" 
              lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
            <q-input
              filled
              type="text"
              v-model="Description"
              label="Digite la descripcion"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"
            ></q-input>
            <q-select
              filled
              
              v-model="PAYMENT_METHOD"
              :options="optionsMethod"
              label="seleccione el metodo de pago"
              lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]"
            />
            
            <q-input
              filled
              type="number"
              v-model="Total"
              label="Total"
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
                label="GUARDAR"
                type="submit"
                class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white" >
              </q-btn>
              <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" v-close-popup
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

<!-- Modal editar  -->
    <q-dialog v-model="promptEdit">
      <q-card style="width: 400px">
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            Actualizar informaciòn
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form ref="myForm" @submit.prevent.stop="putInfo()" >
          <div>
            <q-input
              filled
              type="text"
              v-model="Name_spent"
              label="Digite el nombre del gasto"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"
            ></q-input>
            <q-select
              filled
              
              v-model="Finca"
              :options="optionsFarm"
              label="seleccione la finca" 
              lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]" />
            <q-input
              filled
              type="text"
              v-model="Description"
              label="Digite la descripcion"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"
            ></q-input>
            <q-select
              filled
              
              v-model="PAYMENT_METHOD"
              :options="optionsMethod"
              label="seleccione el metodo de pago"
              lazy-rules
                :rules="[
                  (val) =>
                    (val && val.toString().trim().length > 0) ||
                    'El campo es requerido',
                ]"
            />
           
            <q-input
              filled
              type="number"
              v-model="Total"
              label="Total"
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
                class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"
          
              ></q-btn>
              <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" v-close-popup
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
import { OccasionalStore } from "../../store/Costs/OccasionalExpenses.js";
const occasionalStore = OccasionalStore();
let prompt = ref(false);
let promptEdit = ref(false);
let index = ref();
let pagination = ref({
  rowsPerPage: 0,
});
let columns = ref([
{
    name: "index",
    label: "#",
    field: "index",
    align: "center",
  },
  {
    name: "Name_spent",
    label: "NOMBRE DEL GASTO",
    field: "Name_spent",
    align: "center",
  },
  {
    name: "finca",
    label: "FINCA",
    field: (row) => row.Finca.name,
    align: "center",
  },
  {
    name: "Description",
    label: "DESCRIPCION",
    field: "Description",
    align: "center",
  },
  {
    name: "PAYMENT_METHOD",
    label: "METODO DE PAGO",
    field: (row) => row.PAYMENT_METHOD.name,
    align: "center",
  },
  
  {
    name: "total",
    label: "TOTAL A PAGAR",
    align: "center",
    field: "Total",
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

let Name_spent = ref();
let Finca = ref([]);
let Description = ref();
let PAYMENT_METHOD = ref([]);

let optionsMethod = ref([]);
let optionsFarm = ref([]);
let Total = ref();
let rows = ref([]);

rows.value.forEach((row, index) => {
  row.index = index;
});

function toEmpty() {
  Name_spent.value = "";
  Finca.value = null;
  Description.value = "";
  PAYMENT_METHOD.value = null;

  Total.value = "";
}

const postOccasional = async () => {
  const occasional = await occasionalStore.newOccasional(
    Name_spent.value,
    Finca.value.value,
    Description.value,
    PAYMENT_METHOD.value.value,

    Total.value
  );
  console.log(occasional);
  getOccasional();
  prompt.value = false;
};

async function getOccasional() {
  const res = await occasionalStore.listOccasional();

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
    res = await occasionalStore.active(data._id, 0);
    
    getOccasional();
  } else {
    res = await occasionalStore.active(data._id, 1);
    console.log(res);
    getOccasional();
  }
}

function goInfo(data) {
  Name_spent.value = data.Name_spent;
  Finca.value = {
    label: data.Finca.name,
    value: data.Finca._id,
  };
  Description.value = data.Description;
  PAYMENT_METHOD.value = {
    label: data.PAYMENT_METHOD.name,
    value: data.PAYMENT_METHOD._id,
  };
 
  Total.value = data.Total;
}

async function putInfo() {
  const res = await occasionalStore.putOccasional(
    index.value,
    Name_spent.value,
    Finca.value.value,
    Description.value,
    PAYMENT_METHOD.value.value,

    Total.value
  );
  getOccasional();
  promptEdit.value = false;
}

async function getMethod() {
  // optionsPeople.value=[]
  const res = await occasionalStore.listOccacionalActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsMethod.value.push(object);

    }
  } else {
    throw new Error("Error al obtener los datos de metodo de pago");
  }
}

async function getFarms() {
  const res = await occasionalStore.listFarmsActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsFarm.value.push(object);
    }
  }
}

onMounted(() => {
  getOccasional();
  getMethod();
  getFarms();
});
</script>

<style scoped>

</style>
