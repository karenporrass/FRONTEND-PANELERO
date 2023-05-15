<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">Gastos mensuales</div>
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
            </span> Gastos mensuales</p>
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
          v-model:pagination="pagination" :rows-per-page-options="[0]">
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

            <q-input filled type="text" v-model="nameSpent" label="Digite el nombre del gasto"></q-input>
            <q-input filled type="text" v-model="finca" label="Escoga la finca"></q-input>
            <q-input filled type="text" v-model="descrip" label="Digite la descripcion"></q-input>
            <q-input filled type="text" v-model="Method" label="Escoga el metodo de pago"></q-input>
            <q-input filled type="number" v-model="valor" label="tiempo a pagar"></q-input>
            <q-input filled type="number" v-model="total" label="Total"></q-input>

            <div>
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="monthlyExpensesPost(), clear()" />
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
let nameSpent = ref()
let finca = ref()
let descrip = ref()
let Method = ref()
let valor = ref() 
let total = ref()



let pagination = ref({
  rowsPerPage: 0
})
let columns = ref([
{name: 'Name_spent',label: 'Nombre del gasto',field: 'Name_spent',align: 'center'},
  { name: 'finca', align: 'center', label: 'FINCA', field: 'Finca',align: 'center' },
  { name: 'Description', label: 'DESCRIPCION', field: 'Description' ,align: 'center'},
  { name: 'Date', label: 'FECHA', field: 'Date',align: 'center' },
  { name: 'PAYMENT_METHOD', label: 'METODO DE PAGO', field: 'PAYMENT_METHOD',align: 'center' },
  { name: 'costValue', label: 'VALOR DEL GASTO', field: 'costValue',align: 'center' },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
])  



let rows = ref([
  {
    Name_spent: 1,  Finca: 1, Description: 1, Date:1,  PAYMENT_METHOD: 1, costValue: 1,
  },
  
])

rows.value.forEach((row, index) => {
  row.index = index
})



const monthlyExpensesPost = async () => {
  try {
    const Expenses = await axios.post(`http://localhost:3500/monthlyExpenses/post`, {



Name_spent:nameSpent.value,
Finca:finca.value,
Description:descrip.value,
PAYMENT_METHOD: Method.value,
Date: Date,
costValue: valor.value,

    })
    getTypeExpenses()
    console.log(Expenses);
  } catch (error) {
    console.log(error);
  }
 
}
const getTypeExpenses = async () => {
  try {
    const packa = await axios.get(`http://localhost:3500/monthlyExpenses/get`)
    console.log(packa);
    rows.value = packa.data
  } catch (error) {
    console.log(error);
  }
  console.log("ok");
}

onMounted(() => {
  getTypeExpenses()
})


function clear() {
  nameSpent.value = ""
finca.value = ""
descrip.value = ""
Method.value = ""
valor.value = ""
total.value =""
}

</script>

<style scoped>
.q-input {
  margin-bottom: 20px;
}
</style>














