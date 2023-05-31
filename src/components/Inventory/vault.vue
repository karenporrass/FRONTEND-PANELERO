<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            
            <div class="col-10  text-center">
                <div  class="text-weight-bolder text-h4">Bodegas</div>
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
            </span> Bodegas</p>
        </div>
                <q-btn class="bg-green-10 text-white" @click="prompt = true">Crear nueva bodega</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" />
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
                <div>
                    <q-input  filled type="number" v-model="name_cellars" label="Digite el cantidad del gasto"></q-input>
                    <q-input  filled type="text" v-model="content" label="Digite el nombre del gasto"></q-input>
                  <q-input filled type="text" v-model="administrator" label="Escoga la finca"></q-input>
                  <q-input  filled type="text" v-model="extension" label="Digite el descripcion"></q-input>
                  <q-input  filled type="text" v-model="dirrecion" label="Escoga el metodo de pago"></q-input>
                 

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"   />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>
    </div> 
</template>
  
<script setup>
import {ref, onMounted} from "vue"
import { vaultStore } from "../../store/Inventory/vault.js"
const VaultStore = vaultStore()
let prompt = ref(false)
let pagination = ref({
        rowsPerPage: 0
      })
      let columns = ref([
  {name: 'index',label: 'CANTIDAD',field: 'index',align: 'center'},
  {name: 'name',required: true,label: 'NOMBRE DEL GASTO',align: 'center',field: row => row.name,format: val => `${val}`,sortable: true},
  { name: 'calories', align: 'center', label: 'FINCA', field: 'calories',align: 'center', sortable: true },
  { name: 'fat', label: 'DESCRIPCION', field: 'fat', sortable: true ,align: 'center'},
  { name: 'carbs', label: 'FECHA', field: 'carbs',align: 'center' },
  { name: 'protein', label: 'METODO DE PAGO', field: 'protein',align: 'center' },
  { name: 'sodium', label: 'VALOR DEL GASTO', field: 'sodium',align: 'center' },
  { name: 'calcium', label: 'TOTAL', field: 'calcium',align: 'center',sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])
let name_cellars = ref()
let content = ref()
let administrator = ref()
let extension = ref()
let dirrecion = ref()
let promptEdit = ref(false)
let index = ref()


 let rows= ref([])

rows.value.forEach((row, index) => {
  row.index = index
})




const postVault = async () => {
  console.log("hola");
  const vault = await VaultStore.newVault({
    name_cellars: name_cellars.value,
    content: content.value,
    administrator: administrator.value,
    extension: extension.value.label,
    dirrecion: dirrecion.value,



  
  })
  console.log("pos");
  console.log(vault);
  getVault()
  promptEdit.value = false;


}




async function getVault() {
    const res = await VaultStore.listVault()
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
    res = await VaultStore.active(data._id, 0)
    console.log(res);
    getVault()
  } else {
    res = await VaultStore.active(data._id, 1)
    console.log(res);
    getVault()
  }
}

function goInfo(data) {
name_cellars.value = data.name_cellars 
content.value   = data.content 
administrator.value  = data.administrator 
extension.value.label = data.extension
dirrecion.value = data.dirrecion 
    
}

async function putInfo() {
  console.log(index.value);
  const res = await VaultStore.putVault(index.value,
  name_cellars.value,
content.value,
administrator.value,
extension.value,
dirrecion.value
  )
  console.log(res);
  getVault()
}


onMounted(() => {
  getVault()
  
})


</script>


<style scoped>
.q-input {
  margin-bottom: 20px;
}
</style>