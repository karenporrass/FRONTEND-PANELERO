<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">UNIDADES DE MEDIDA</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row q-mb-sm">
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
              </span> Unidades de medida
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class=" text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nueva unidad de medida</q-btn>
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
                    <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la unidad de medida"></q-input>
                  <q-input filled type="text" v-model="format" label="Digite el formato"></q-input>
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postUnits()" />
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
                    <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la unidad de medida"></q-input>
                  <q-input filled type="text" v-model="format" label="Digite el formato"></q-input>
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"  @click="putInfo()" />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>
    </div> 
</template>
  
<script setup>
import {ref, onMounted, onBeforeMount} from 'vue'
import {unitsStore} from "../../store/Maintenance/MeasurementUnits.js"
const unitStore = unitsStore()
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let format = ref()
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE DE LA UNIDAD DE MEDIDA',field: 'name',align: 'center'},
  {name: 'weight',label: 'FORMATO',align: 'center',field: row => row.format,format: val => `${val}`,sortable: true},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])

const postUnits = async ()=>{
    const unit = await unitStore.newUnits(
      name.value,
       format.value
       )
    getUnits()
    console.log(unit);
}
const getUnits = async ()=>{
    const units = await unitStore.listUnits()
    console.log(units);
    if (units.status < 299) {
      rows.value=units.data
    rows.value.forEach((row, index) => {
    row.index = index+1
  })
  } else {
    alert(units)
  }
}

async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await unitStore.active(data._id, 0)
    console.log(res);
    getUnits()
  } else {
    res = await unitStore.active(data._id, 1)
    console.log(res);
    getUnits()
  }
}

function goInfo(data){
    name.value = data.name 
    format.value = data.format
}

async function putInfo(){
  console.log(index.value);
  const res = await unitStore.putUnits(index.value, 
  name.value,
  format.value
   )
    console.log(res);
    getUnits()
}

onBeforeMount(()=>{
  getUnits();
 })


</script>