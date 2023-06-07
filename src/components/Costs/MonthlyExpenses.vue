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
        <q-btn class="bg-green-10 text-white" @click="promptEdit = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span>Crear nuevo gasto</q-btn>
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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row),  prompt = true "></q-btn>
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

    <q-dialog v-model="promptEdit">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <div>

            <q-input filled type="text" v-model="Name_spent" label="Digite el nombre del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
            <q-input filled type="text" v-model="Finca" label="Escoga la finca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
            <q-input filled type="text" v-model="Description" label="Digite la descripcion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
           <q-select filled type="text" v-model="PAYMENT_METHOD" :options="optionsMethod" label="seleccione el metodo de pago" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length  > 0) || 'El campo es requerido',
              ]"/>
            <q-input filled type="number" v-model="costValue" label="tiempo a pagar" lazy-rules :rules="[
                (val) =>
                  (val  > 0) || 'El campo es requerido',
              ]"></q-input>
            <q-input filled type="number" v-model="total" label="Total" ></q-input>

            <div>
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="postMonthly()" />
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <div>

            <q-input filled type="text" v-model="Name_spent" label="Digite el nombre del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
            <q-input filled type="text" v-model="Finca" label="Escoga la finca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
            <q-input filled type="text" v-model="Description" label="Digite la descripcion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
             <q-select filled type="text" v-model="PAYMENT_METHOD" :options="optionsMethod" label="seleccione el metodo de pago" lazy-rules :rules="[
                (val) =>
                  (val  > 0) || 'El campo es requerido',
              ]"/>
            <q-input filled type="number" v-model="costValue" label="tiempo a pagar" lazy-rules :rules="[
                (val) =>
                  (val  > 0) || 'El campo es requerido',
              ]"></q-input>
            <q-input filled type="number" v-model="total" label="Total" lazy-rules :rules="[
                (val) =>
                  (val  > 0) || 'El campo es requerido',
              ]"></q-input>

            <div>
              <br />
              <q-btn label="guardar" class="text-white bg-green-10" @click="putInfo()" />
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
import { monthlyStore } from "../../store/Costs/MonthlyExpenses.js"
const MonthlyStore = monthlyStore()

let promptEdit = ref(false)
let index = ref()
let prompt = ref(false)
let Name_spent = ref()
let Finca = ref()
let Description = ref()
let PAYMENT_METHOD = ref()
let costValue = ref()
let optionsMethod = ref([])


let pagination = ref({
  rowsPerPage: 0
})
let columns = ref([
{name: 'Name_spent',label: 'Nombre del gasto',field: 'Name_spent',align: 'center'},
  { name: 'finca', align: 'center', label: 'FINCA', field: 'Finca',align: 'center' },
  { name: 'Description', label: 'DESCRIPCION', field: 'Description' ,align: 'center'},
  { name: 'Date', label: 'FECHA', field: 'Date',align: 'center' },
  {
    name: "PAYMENT_METHOD",
    label: "Metodo de pago",
    field: (row) => row.PAYMENT_METHOD,
    align: "center",
  },
  { name: 'costValue', label: 'VALOR DEL GASTO', field: 'costValue',align: 'center' },
  {
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
])  



let rows = ref([])

rows.value.forEach((row, index) => {
  row.index = index
})



async function getMethod() {
  // optionsPeople.value=[]
  const res = await MonthlyStore.listMonthlyActive();
  console.log(res);
  if (res.status < 299) {
   
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsMethod.value.push(object);

      console.log(optionsMethod.value);
    }
    
  } else {
    throw new Error ("Error al obtener los datos de metodo de pago")
  }
}

const getMonthly = async () => {

const res = await MonthlyStore.listMonthly()
if (res.status < 299) {
  rows.value = res.data
  rows.value.forEach((row, index) => {
    row.index = index + 1
  })
} else {
  console.log(res)
}
}


const postMonthly = async () => {
  const monthly = await MonthlyStore.newMonthly(

Name_spent.value,
Finca.value,
Description.value,
PAYMENT_METHOD.value,
costValue.value,

  )
  console.log(monthly);
  getMonthly()

}


async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await MonthlyStore.active(data._id, 0)
    console.log(res);
    getMonthly()
  } else {
    res = await MonthlyStore.active(data._id, 1)
    console.log(res);
    getMonthly()
  }
}

function goInfo(data) {
Name_spent.value = data.Name_spent
Finca.value = data.Finca
Description.value = data.Description
PAYMENT_METHOD.value = data.PAYMENT_METHOD
costValue.value = data.costValue

}

async function putInfo() {
  console.log(index.value);
  const res = await MonthlyStore.putMonthly(index.value,
Name_spent.value,
Finca.value,
Description.value,
PAYMENT_METHOD.value,
costValue.value,
  )
  console.log(res);
  getMonthly()
}


onMounted(() => {
  getMonthly()
  getMethod()
})
</script>

<style scoped>
.q-input {
  margin-bottom: 20px;
}
</style>














