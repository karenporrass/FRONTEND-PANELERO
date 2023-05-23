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
          v-model:pagination="pagination" :rows-per-page-options="[0]">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row),  promptEdit = true "></q-btn>
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
            <q-input filled type="text" v-model="documen" label="DNI"></q-input>
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

    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <div>
            
            <q-input filled type="text" v-model="DNI" label="DNI"></q-input>
            <q-input filled type="text" v-model="ROL" label="ROL"></q-input>
            <q-input filled type="text" v-model="CONCEPT" label="Concepto"></q-input>
            <q-input filled type="text" v-model="PAYMENT_METHOD" label="Metodo de pago"></q-input>
            <q-input filled type="number" v-model="TIME_TO_PAY" label="tiempo a pagar"></q-input>
            <q-input filled type="number" v-model="total" label="Total"></q-input>

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
import { payStore } from "../../store/Costs/Pays.js"
const PayStore = payStore()
let prompt = ref(false)
let promptEdit = ref(false)
let index = ref()
let pagination = ref({
  rowsPerPage: 0
})
let columns = ref([

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

let DNI = ref()
let ROL = ref()
let CONCEPT = ref()
let PAYMENT_METHOD = ref()
let TIME_TO_PAY = ref()
let total = ref()



rows.value.forEach((row, index) => {
  row.index = index
})


const getPays = async () => {

const res = await PayStore.listPays()
if (res.status < 299) {
  rows.value = res.data
  rows.value.forEach((row, index) => {
    row.index = index + 1
  })
} else {
  console.log(res)
}
}


const postPays = async () => {
  const pays = await PayStore.newPays(

    DNI.value,
ROL.value,
CONCEPT.value,
PAYMENT_METHOD.value,
TIME_TO_PAY.value,
total.value,
  )
  console.log(pays);
  getPays()

}


async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await PayStore.active(data._id, 0)
    console.log(res);
    getPays()
  } else {
    res = await PayStore.active(data._id, 1)
    console.log(res);
    getPays()
  }
}

function goInfo(data) {
  DNI.value = data.documen
ROL.value = data.rol
CONCEPT.value = data.concept
PAYMENT_METHOD.value = data.methodPay
TIME_TO_PAY.value = data.time
total.value = data.total
    
}

async function putInfo() {
  console.log(index.value);
  const res = await PayStore.putPays(index.value,
  DNI.value,
ROL.value,
CONCEPT.value,
PAYMENT_METHOD.value,
TIME_TO_PAY.value,
total.value,
  )
  console.log(res);
  getPays()
}


onMounted(() => {
  getPays()
})


</script>

<style scoped>
.q-input {
  margin-bottom: 20px;
}

</style>