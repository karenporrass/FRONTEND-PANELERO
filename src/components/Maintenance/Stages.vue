<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">ETAPAS DE PRODUCCION</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nueva etapa</q-btn>
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
                    <q-input  filled type="text" v-model="name" label="Digite el nombre del tipo de pago"></q-input>
                  
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postPayment()"  />
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
                    <q-input  filled type="text" v-model="name" label="Digite el nombre del tipo de pago"></q-input>
                  
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="putInfo()"  />
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
import {stagesStore} from "../../store/Maintenance/Stages.js"
const stageStore = stagesStore()
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let description = ref("")
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE ETAPA',field: 'name',align: 'center'},
  {name: 'description',label: 'DESCRIPCION',align: 'center',field: row => row.description,format: val => `${val}`,sortable: true},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])

const postStages = async ()=>{
    const stage = await stageStore.newStage(
      name.value,
      description.value
      )
    getStages()
    console.log(stage);
}

const getStages = async ()=>{
    const stage = await stageStore.listStages()
    console.log(stage);
    if (stage.status < 299) {
      rows.value=stage.data
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
    res = await stageStore.active(data._id, 0)
    console.log(res);
    getStages()
  } else {
    res = await stageStore.active(data._id, 1)
    console.log(res);
    getStages()
  }
}

function goInfo(data){
    name.value = data.name 
    description.value = data.description
}

async function putInfo(){
  console.log(index.value);
  const res = await stageStore.putStage(index.value, 
  name.value,
  description.value
  )
    console.log(res);
    getStages()
}

onMounted(()=>{
  getStages()
})


</script>