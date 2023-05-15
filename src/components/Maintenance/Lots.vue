<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">LOTES</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10" style="display: flex;" > 
            <router-link to="/homeMantenimiento" style="text-decoration: none; font-size:larger;" class="text-dark">
          <div class="q-mr-md" ><span style="font-size: 35px; " class="material-icons-outlined ">
                arrow_right
              </span> Mantenimiento</div>
          </router-link>
          <div style="font-size: larger;">
            <span style="font-size: 35px; " class="material-icons-outlined ">
                arrow_right
              </span> Lotes
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        
        
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nuevo lote</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" >
                    <template v-slot:body-cell-options="props" >
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
                <div>
                    <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre del lote"></q-input>
                    <q-input  filled type="number" v-model="extent" label="Digite la extencion del lote"></q-input>

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postLots()" />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>

          <q-dialog v-model="promptEdit">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>
                    <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre del lote"></q-input>
                    <q-input  filled type="number" v-model="extent" label="Digite la extencion del lote"></q-input>

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
import {ref, onMounted} from 'vue'
import {lotsStore} from "../../store/Maintenance/Lots.js"
const lotsStores = lotsStore()
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let extent= ref()
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE LOTE',field: 'name',align: 'center'},
  {name: 'weight',label: 'EXTENCION',align: 'center',field: row => row.extent,format: val => `${val}`,sortable: true},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])

const postLots= async ()=>{
    const lots = await lotsStores.newlots(
       name.value, 
       extent.value
       )
    getLots()

}
const getLots = async ()=>{
 
    const lots = await lotsStores.listlots()
    if (lots.status < 299) {
    rows.value = lots.data
    rows.value.forEach((row, index) => {
    row.index = index+1
})
  } else {
    alert(lots)
  }
}

async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await lotsStores.active(data._id, 0)
    console.log(res);
   getLots()
  } else {
    res = await lotsStores.active(data._id, 1)
    console.log(res);
   getLots()
  }
}

function goInfo(data){
    name.value = data.name 
    extent.value = data.extent
}

async function putInfo(){
  console.log(index.value);
  const res = await lotsStores.putlots(index.value, 
  name.value, 
  extent.value)
    console.log(res);
    getLots()
}


onMounted(()=>{
  getLots()
 })

</script>