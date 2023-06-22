<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            
            <div class="col-10  text-center">
                <div  class="text-weight-bolder text-h4">Categorias</div>
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
            </span> Categoria</p>
        </div>
                <q-btn class="bg-green-10 text-white" @click="prompt = true, toEmpty()">Crear categoria</q-btn>
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

        <q-dialog v-model="prompt">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <q-form ref="myForm" @submit.prevent.stop="postCategory()" >
                <div>
                    <q-input  filled type="text" v-model="name_category" label="Digite el nombre de la categoria" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite la descripción" lazy-rules :rules="[
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
                    <q-input  filled type="text" v-model="name_category" label="Digite el nombre de la categoria" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite la descripción" lazy-rules :rules="[
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
import {ref,  onMounted} from "vue"
import { CategoryStore } from "../../store/Inventory/category.js"
const categoryStore = CategoryStore()

let prompt = ref(false)
let promptEdit = ref(false)

let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
      let columns = ref([
  {name: 'name_category',label: 'NOMBRE DE LA CATEGORIA',field: 'name_category',align: 'center'},
  {name: 'description',required: true, label: 'DESCRIPCION',align: 'center',field: 'description'},
  {
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
  
])

 let rows= ref( [
  {
    name_category: 1, description: 1, index: 0,
  }
])

let name_category = ref()
let description  = ref()



rows.value.forEach((row, index) => {
  row.index = index
})




const postCategory = async () => {
  const pays = await categoryStore.newCategory(
  name_category.value,
  description.value,
  
  )
  console.log(pays);
  getCategory()
  prompt.value = false
}




async function getCategory() {
    const res = await categoryStore.listCategory()
    
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
    res = await categoryStore.active(data._id, 0)

    getCategory()
  } else {
    res = await categoryStore.active(data._id, 1)

    getCategory()
  }
}

function goInfo(data) {
  name_category.value = data.name_category
  description.value = data.description


    
}

async function putInfo() {
  console.log(index.value);
  const res = await categoryStore.putCategory(index.value,
  name_category.value,
  description.value,

  )
  console.log(res);
  getCategory()
  promptEdit.value = false
}


function toEmpty() {
  name_category.value = ""
description.value  = ""

}

onMounted(() => {
  getCategory()
})





</script>

<style scoped>
</style>