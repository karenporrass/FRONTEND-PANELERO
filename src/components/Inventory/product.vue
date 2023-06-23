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
              <q-input  filled type="text" v-model="nameProduct" label="Digite el nombre del producto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input> 
                <q-select filled  v-model="marca" :options="OpBrands"
              label="seleccione la marca" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
              <q-select filled  v-model="categoria" :options="OpCategory"
              label="seleccione la categoria" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
                   <q-input  filled type="text" v-model="Cantidad" label="Digite la cantidad" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-input  filled type="text" v-model="timeUseful" label="Digite la vida util (años)" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
            
                  <q-input  filled type="text" v-model="timeUsed" label="Digite el tiempo utilizado (años)"  lazy-rules :rules="[
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
              <q-input  filled type="text" v-model="nameProduct" label="Digite el nombre del producto" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input> 
                <q-select filled  v-model="marca" :options="OpBrands"
              label="seleccione la marca" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
              <q-select filled  v-model="categoria" :options="OpCategory"
              label="seleccione la categoria" lazy-rules
              :rules="[val => val && val.toString().trim().length > 0 || 'El campo es requerido']" />
                   <q-input  filled type="text" v-model="Cantidad" label="Digite la cantidad" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-input  filled type="text" v-model="timeUseful" label="Digite la vida util (años)" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
            
                  <q-input  filled type="text" v-model="timeUsed" label="Digite el tiempo utilizado (años)" lazy-rules :rules="[
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

let edit = ref(false)
let OpBrands = ref([]);
let OpCategory= ref([]);
let nameProduct = ref()
let marca = ref([])
let categoria = ref([])
let Cantidad = ref()
let timeUseful = ref()
let timeUsed = ref()
let pagination = ref({
        rowsPerPage: 0
      })
      let columns = ref([
  {name: 'Nombre producto',label: 'NOMBRE',field: 'nameProduct',align: 'center'},
  {
    name: "categoria",
    label: "CATEGORIA",
    field: (row) => row.categoria.name_category,
    align: "center",
  }, 
  {
    name: "marca",
    label: "MARCA",
    field: (row) => row.marca.name_brands,
    align: "center",
  }, 
  { name: 'Cantidad', align: 'center', label: 'CANTIDAD', field: 'Cantidad',align: 'center', },
  { name: 'timeUseful', label: 'TIEMPO DE VIDA UTIL', field: 'timeUseful',align: 'center' },
  
  { name: 'timeUsed', label: 'TIEMPO DE USO', field: 'timeUsed',align: 'center' },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.Date.slice(0, 10),
    align: "center",
  },
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

const postProduct = async () => {
  console.log("hola");
  const product = await ProductStore.newProduct({
   nameProduct: nameProduct.value,
   marca: marca.value.value,
   categoria: categoria.value.value,
   Cantidad: Cantidad.value,
   timeUseful: timeUseful.value,
   timeUsed: timeUsed.value,
  })
  console.log("pos");
  getProduct()
  prompt.value = false;


}

async function getProduct() {
  
    const res = await ProductStore.listProduct()
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
  
nameProduct.value = data.nameProduct
   marca.value = {
    label: data.marca.name_brands,
    value: data.marca._id,
  };
   categoria.value = {
    label: data.categoria.name_category,
    value: data.categoria._id,
  };
   Cantidad.value = data.Cantidad
   timeUseful.value = data.timeUseful
   timeUsed.value = data.timeUsed

}

async function putInfo() {
  console.log(index.value);
  const res = await ProductStore.putProduct(index.value,{
  nameProduct: nameProduct.value,
   marca: marca.value.value,
   categoria: categoria.value.value,
   Cantidad: Cantidad.value,
   timeUseful: timeUseful.value,
   timeUsed: timeUsed.value,
})
  console.log(res);
  getProduct()
  edit.value = false
}




async function getBrands() {
  const res = await ProductStore.listBrandsActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].name_brands, value: res.data[i]._id };
      OpBrands.value.push(object);

      console.log("b", OpBrands.value);

    }
  }
}

async function getCategory() {
  const res = await ProductStore.listCategoryActive();
  if (res.status < 299) {
    for (let i in res.data) {
      let object = { label: res.data[i].name_category, value: res.data[i]._id };
      OpCategory.value.push(object);

      console.log("c", OpCategory.value);

    }
  }
}

function toEmpty() {
  nameProduct.value = ""
   marca.value = ""
   categoria.value = ""
   Cantidad.value = ""
   timeUseful.value = ""
   timeUsed.value = ""
}

onMounted(() => {
  getProduct()
  getBrands()
  getCategory()
})


</script>


<style scoped>

</style>