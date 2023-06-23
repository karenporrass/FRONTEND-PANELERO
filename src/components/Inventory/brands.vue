<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            
            <div class="col-10  text-center">
                <div  class="text-weight-bolder text-h4">Marcas</div>
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
            </span> Marcas</p>
        </div>
                <q-btn class="bg-green-10 text-white" @click="prompt = true, toEmpty()"><span
            class="material-symbols-outlined q-mr-sm" style="font-size: 20px">
            add_circle
          </span>Crear marca</q-btn>
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

            <div class="col-1"></div>
        </div> 

        <q-dialog v-model="prompt">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <q-form ref="myForm" @submit.prevent.stop="postBrands()" >
                <div>
                  <q-input  filled type="text" v-model="name_brands" label="Digite el nombre de la marca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite la descripción" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-input filled type="text" v-model="creator" label="Digite el nombre del creador" lazy-rules :rules="[
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


          <q-dialog v-model="promptEdit">
            <q-card style="width: 400px">
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  Actualizar informaciòn
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <q-form ref="myForm" @submit.prevent.stop="putInfo()" >
                <div>
                  <q-input  filled type="text" v-model="name_brands" label="Digite el nombre de la marca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite la descripción" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                  <q-input filled type="text" v-model="creator" label="Digite el nombre del creador" lazy-rules :rules="[
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
    </div> 
  </template>
  
<script setup>
import {ref, onMounted} from "vue"
import { BrandsStore } from "../../store/Inventory/Brands.js"
const brandStore = BrandsStore()
let prompt = ref(false)
let promptEdit = ref(false)
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
      let columns = ref([
  {name: 'name_Spent',label: 'NOMBRE DE MARCA',field: 'name_brands',align: 'center'},
  {name: 'DESCRIPTION',required: true,label: 'DESCRIPCION',align: 'center',field: 'description',},
  { name: 'creator', align: 'center', label: 'CREADOR', field: 'creator',align: 'center', },
  {
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

 
])

 let rows= ref( [])

let name_brands = ref()
let description = ref()
let creator = ref()

rows.value.forEach((row, index) => {
  row.index = index
})




const postBrands = async () => {
  const brands = await brandStore.newBrands(
  name_brands.value,
  description.value,
  creator.value,
  )
 
  getBrands()
  prompt.value = false
}




async function getBrands() {
    const res = await brandStore.listPBrands()
    
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
    res = await brandStore.active(data._id, 0)
    getBrands()
  } else {
    res = await brandStore.active(data._id, 1)
    getBrands()
  }
}

function goInfo(data) {
  name_brands.value = data.name_brands
  description.value = data.description
  creator.value = data.creator

    



}

async function putInfo() {
  console.log(index.value);
  const res = await brandStore.putBrands(index.value,
  name_brands.value,
description.value,
creator.value,
  )
  getBrands()
  promptEdit.value = false
}


function toEmpty() {
  name_brands.value = ""
  description.value = ""
  creator.value = ""


}


onMounted(() => {
  getBrands()
})


</script>


<style scoped>

</style>