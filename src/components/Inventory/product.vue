<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">Productos</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row ">
      <div class="col-1"></div>
      <div class="col-10 ">
        <div style="display: flex;">
          <router-link to="/homeInventory" style="text-decoration: none;" class="text-dark">
            <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
                arrow_right
              </span> Inventario</p>
          </router-link>
          <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> Productos</p>
        </div>
        <q-btn class="bg-green-10 text-white" @click="prompt = true, toEmpty()"><span class="material-symbols-outlined q-mr-sm"
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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row),  edit = true "></q-btn>
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

    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <q-form @submit.prevent.stop="postProduct()">

            <div>
              <q-input  filled type="number" v-model="amount" label="Digite el cantidad del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="expense_name" label="Digite el nombre del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="administrator" label="Digite el nombre del administrador" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-select filled type="text" v-model="Finca" :options="optionsFarm"
              label="seleccione la finca" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
                  <q-input  filled type="text" v-model="description" label="Digite la descripcion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-select filled type="text" v-model="PAYMENT_METHOD" :options="optionsMethod"
              label="seleccione el metodo de pago" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />

                  <q-input filled type="number" v-model="cost_value" label="Digite el valor del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-input  filled type="number" v-model="total" label="Digite el total" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>

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

    <q-dialog v-model="edit">
      <q-card style="width: 400px">
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            Actualizar informaciòn
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <q-form @submit.prevent.stop="putInfo()">

            <div>
              <q-input  filled type="number" v-model="amount" label="Digite el cantidad del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="expense_name" label="Digite el nombre del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="administrator" label="Digite el nombre del administrador" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-select filled type="text" v-model="Finca" :options="optionsFarm"
              label="seleccione el metodo de pago" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
                  <q-input  filled type="text" v-model="description" label="Digite el descripcion" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-select filled type="text" v-model="PAYMENT_METHOD" :options="optionsMethod"
              label="seleccione el metodo de pago" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
                  <q-input filled type="number" v-model="cost_value" label="Digite el valor del gasto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-input  filled type="number" v-model="total" label="Digite el total" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>

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
import {ref, onMounted} from "vue"
import { productStore } from "../../store/Inventory/Product.js"
const ProductStore = productStore()
let prompt = ref(false)
let index = ref();
let optionsMethod = ref([])
let optionsFarm = ref([])
let edit = ref(false)
let amount = ref()
let expense_name = ref()
let administrator = ref()
let Finca = ref([])
let description = ref()
let PAYMENT_METHOD = ref([])
let cost_value = ref()
let total = ref()
let pagination = ref({
        rowsPerPage: 0
      })
      let columns = ref([
  {name: 'amount',label: 'Cantidad',field: 'amount',align: 'center'},
  {name: 'name',required: true,label: 'Nombre de gasto',align: 'center',field: "expense_name",},
  { name: 'administrador', align: 'center', label: 'Administrador', field: 'administrator',align: 'center', },
  {
    name: "finca",
    label: "Finca",
    field: (row) => row.Finca.name,
    align: "center",
  },
  { name: 'description', label: 'Descripcion', field: 'description',align: 'center' },
  {
    name: "PAYMENT_METHOD",
    label: "Metodo de pago",
    field: (row) => row.PAYMENT_METHOD.name,
    align: "center",
  },
  { name: 'cost_value', label: 'Valor del gasto', field: 'cost_value',align: 'center' },
  { name: 'total', label: 'Total', field: 'total',align: 'center',},
  {
    name: "status",
    label: "Estado",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  { name: 'options', align: 'center', label: 'Opciones', align: 'center', sortable: true },
  
])

let rows = ref([])

rows.value.forEach((row, index) => {
  row.index = index
})

const postProduct = async () => {
  console.log("hola");
  const product = await ProductStore.newProduct(
amount.value,
expense_name.value,
administrator.value,
Finca.value.value,
description.value,
PAYMENT_METHOD.value.value,
cost_value.value,
total.value,
)
  console.log("pos");
  console.log(product);
  getProduct()
  prompt.value = false;


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
Finca.value  = {
    label: data.Finca.name,
    value: data.Finca._id,
  };
description.value = data.description 
PAYMENT_METHOD.value = {
    label: data.PAYMENT_METHOD.name,
    value: data.PAYMENT_METHOD._id
  };
  cost_value.value = data.cost_value 
total.value = data.total 
}

async function putInfo() {
  console.log(index.value);
  const res = await ProductStore.putProduct(index.value,
amount.value,
expense_name.value,
administrator.value,
Finca.value.value,
description.value,
PAYMENT_METHOD.value.value,
cost_value.value,
total.value,
  )
  console.log(res);
  getProduct()
  edit.value = false
}

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
    throw new Error("Error al obtener los datos de metodo de pago")
  }
}

async function getFarms() {
  const res = await ProductStore.listFarmsActive();
  console.log(res);
  if (res.status < 299) {
    console.log("hols");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsFarm.value.push(object);

      console.log(optionsFarm.value);
    }
  }
}

function toEmpty() {
  amount.value = ""
expense_name.value = ""
administrator.value = ""
Finca.value = ""
description.value = ""
PAYMENT_METHOD.value = ""
cost_value.value = ""
total.value = ""
}

onMounted(() => {
  getProduct()
  getMethod()
  getFarms()
})


</script>


<style scoped>
.q-input {
  margin-bottom: 20px;
}
.q-select {
  margin-bottom: 20px;
}
</style>