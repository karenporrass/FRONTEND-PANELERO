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
                <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear categoria</q-btn>
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
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>
                    <q-input  filled type="number" v-model="name_category" label="Digite el cantidad del gasto"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite el nombre del gasto"></q-input>
                   
                 

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postCategory()" />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>

          <q-dialog v-model="prompt">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>
                    <q-input  filled type="text" v-model="name_category" label="Digite el cantidad del gasto"></q-input>
                    <q-input  filled type="text" v-model="description" label="Digite el nombre del gasto"></q-input>
               

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="putInfo()" />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
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
  {name: 'name_category',label: 'nombre categoria',field: 'name_category',align: 'center'},
  {name: 'description',required: true, label: 'description',align: 'center',field: 'description'},
  
  
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

}




async function getCategory() {
    const res = await categoryStore.listCategory()
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
    res = await categoryStore.active(data._id, 0)
    console.log(res);
    getCategory()
  } else {
    res = await categoryStore.active(data._id, 1)
    console.log(res);
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
}


onMounted(() => {
  getCategory()
})





</script>

<style scoped>
.q-input {
  margin-bottom: 20px;
}
</style>