<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">PAGOS</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row ">
      <div class="col-1"></div>
      <div class="col-10 ">
        <div style="display: flex;">
          <router-link to="/homeCostos" style="text-decoration: none;" class="text-dark">
            <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
                arrow_right
              </span> Costos</p>
          </router-link>
          <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> PEDIDOS CLIENTES</p>
        </div>
        <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear nuevo pago</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index" virtual-scroll
          v-model:pagination="pagination" :rows-per-page-options="[0]" >
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10"></q-btn>
                <q-btn round icon="delete" size="xs" color="green-10"></q-btn>
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
        <div class="q-pa-md ">
          <div>
            <q-input filled type="text" v-model="document" label="DNI"></q-input>
            <q-input filled type="text" v-model="rol" label="ROL"></q-input>
            <q-input filled type="text" v-model="concept" label="Concepto"></q-input>
            <q-input filled type="text" v-model="methodPay" label="Metodo de pago"></q-input>
            <q-input filled type="number" v-model="time" label="tiempo a pagar"></q-input>
            <q-input filled type="number" v-model="total" label="Total"></q-input>

            <div>
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="postPays()" />
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
let prompt = ref(false)
let pagination = ref({
  rowsPerPage: 0
})
let columns = ref([
{
    name: 'index',
    label: '#',
    field: 'index'
  },
  {
    name: 'DNI', required: true, label: 'NUMERO DE DOCUMENTO', align: 'center', field:
      "DNI"
  },
  {
    name: 'ROL', align: 'center', label: 'ROL', align: 'center', field:
      "ROL"
  },
  {
    name: 'CONCEPT', label: 'CONCEPTO', sortable: true, align: 'center', field:
      "CONCEPT"
  },
  {
    name: 'date', label: 'FECHA PAGO', align: 'center', field:
      "Date"
  },
  {
    name: 'PAYMENT_METHOD', label: 'METODO DE PAGO', align: 'center', field:
      "PAYMENT_METHOD"
  },
  {
    name: 'TIME_TO_PAY', label: 'TIEMPO A PAGAR', align: 'center', field:
      "TIME_TO_PAY"
  },
  {
    name: 'total', label: 'TOTAL A PAGAR', align: 'center', field:
      "total"
  },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
])



let rows = ref([
  {
    DNI: 1, ROL: 1, CONCEPT: 1, PAYMENT_METHOD: 1, TIME_TO_PAY: 1, total: 1, index: 0,
  },

])

let document = ref()
let rol = ref()
let concept = ref()
let methodPay = ref()
let time = ref()
let total = ref()
let index = ref()


rows.value.forEach((row, index) => {
  row.index = index
})

for (let i = 0; i < rows.value.length; i++) {
    index.value = i;

}


const postPays = async () => {

  try {
    const pays = await axios.post(`http://localhost:4500/payments/post`, {
      DNI: document.value,
      ROL: rol.value,
      CONCEPT: concept.value,
      PAYMENT_METHOD: methodPay.value,
      Date: Date, 
      Total: total.value,
      TIME_TO_PAY: time.value,
      index: index.value

    })
    getTypePays()
    console.log(pays);
  } catch (error) {
    console.log(error);
  }
  clear()
}
const getTypePays = async () => {
  try {
    const packa = await axios.get(`http://localhost:4500/payments/get`)
    console.log(packa);
    rows.value = packa.data
  } catch (error) {
    console.log(error);
  }
  console.log("ok");
}

onMounted(() => {
  getTypePays()
})

function clear() {
  document.value = ""
  concept.value = ""
  rol.value = ""
  methodPay.value = ""
  TIME_TO_PAY.value = ""
  total.value = ""
}

</script>

<style scoped>.q-input {
  margin-bottom: 20px;
}</style>