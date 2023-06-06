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
            </span> Pedidos clientes</p>
        </div>
        <q-btn class="bg-green-10 text-white" @click="promptEdit = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span> Crear nuevo pago</q-btn>
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
          <q-form @submit.prevent.stop="postProduct()">

            <div>
              <q-input  filled type="number" v-model="amount" label="Digite el cantidad del gasto"></q-input>
                    <q-input  filled type="number" v-model="expense_name" label="Digite el nombre del gasto"></q-input>
                    <q-input  filled type="text" v-model="administrator" label="Digite el nombre del administrador"></q-input>
                  <q-input filled type="text" v-model="Finca" label="Escoga la finca"></q-input>
                  <q-input  filled type="text" v-model="description" label="Digite el descripcion"></q-input>
                  <q-input  filled type="text" v-model="PAYMENT_METHOD" label="Escoga el metodo de pago"></q-input>
                  <q-input filled type="number" v-model="cost_value" label="Digite el valor del gasto"></q-input>
                  <q-input  filled type="number" v-model="total" label="Digite el total"></q-input>

                  <div>
              <br />
              <q-btn label="guardar" type="submit" class="text-white bg-green-10"  />
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
          </q-form>
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
            <q-input  filled type="number" v-model="amount" label="Digite el cantidad del gasto"></q-input>
                    <q-input  filled type="number" v-model="expense_name" label="Digite el nombre del gasto"></q-input>
                    <q-input  filled type="text" v-model="administrator" label="Digite el nombre del administrador"></q-input>
                  <q-input filled type="text" v-model="Finca" label="Escoga la finca"></q-input>
                  <q-input  filled type="text" v-model="description" label="Digite el descripcion"></q-input>
                  <q-input  filled type="text" v-model="PAYMENT_METHOD" label="Escoga el metodo de pago"></q-input>
                  <q-input filled type="number" v-model="cost_value" label="Digite el valor del gasto"></q-input>
                  <q-input  filled type="number" v-model="total" label="Digite el total"></q-input>
                  

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
import {ref} from "vue"
import { productStore } from "../../store/Inventory/Product.js"
const ProductStore = productStore()
let prompt = ref(false)
let promptEdit = ref(false)
let amount = ref()
let expense_name = ref()
let administrator = ref()
let Finca = ref()
let description = ref()
let PAYMENT_METHOD = ref()
let cost_value = ref()
let total = ref()
let pagination = ref({
        rowsPerPage: 0
      })
      let columns = ref([
  {name: 'index',label: 'CANTIDAD',field: 'amount',align: 'center'},
  {name: 'name',required: true,label: 'NOMBRE DEL GASTO',align: 'center',field: "expense_name",},
  { name: 'administrador', align: 'center', label: 'Administrador', field: 'administrator',align: 'center', },
  { name: 'finca', label: 'Finca', field: 'Finca' ,align: 'center'},
  { name: 'description', label: 'Descripcion', field: 'description',align: 'center' },
  { name: 'PAYMENT_METHOD', label: 'METODO DE PAGO', field: 'PAYMENT_METHOD',align: 'center' },
  { name: 'cost_value', label: 'VALOR DEL GASTO', field: 'sodium',align: 'cost_value' },
  { name: 'total', label: 'TOTAL', field: 'total',align: 'center',}
])

let rows = ref([])

rows.value.forEach((row, index) => {
  row.index = index
})



async function getMethod() {
  // optionsPeople.value=[]
  const res = await ProductStore.listPaymentsActive();
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


const postProduct = async () => {
  console.log("hola");
  const pays = await ProductStore.newProduct({
amount: amount.value,
expense_name: expense_name.value,
administrator: administrator.value,
Finca: Finca.value,
description: description.value,
PAYMENT_METHOD: PAYMENT_METHOD.value,
cost_value: cost_value.value,
total: total.value,
  })
  console.log("pos");
  console.log(pays);
  getPays()
  promptEdit.value = false;


}




async function getProduct() {
    const res = await ProductStore.listProduct()
    console.log(res);
    if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
    row.index = index+1
})
  } else {
    alert(res)
  }
}



async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await ProductStore.active(data._id, 0)
    console.log(res);
    getProduct()
  } else {
    res = await ProductStore.active(data._id, 1)
    console.log(res);
    getProduct()
  }
}

function goInfo(data) {
    
amount.value = data.amount 
expense_name.value = data.expense_name 
administrator.value = data.administrator 
Finca.value = data.Finca 
description.value = data.description 
PAYMENT_METHOD.value = data.PAYMENT_METHOD 
cost_value.value = data.cost_value 
total.value = data.total 
}

async function putInfo() {
  console.log(index.value);
  const res = await ProductStore.putProduct(index.value,
amount.value,
expense_name.value,
administrator.value,
Finca.value,
description.value,
PAYMENT_METHOD.value,
cost_value.value,
total.value,
  )
  console.log(res);
  getProduct()
}


onMounted(() => {
  getProduct()
  getMethod()
})


</script>


<style scoped>
.q-input {
  margin-bottom: 20px;
}
</style>