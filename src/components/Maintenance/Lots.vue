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
              </span> Lotes
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        
        
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="text-capitalize bg-green-10 text-white" @click="cleanForm(),prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span>Crear nuevo lote</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
              <q-table style="height: 50vh" flat bordered  ref="tableRef" :rows="rows" :columns="columns" row-key="index" virtual-scroll  :virtual-scroll-item-size="48"
          :pagination="pagination" :rows-per-page-options="[0]" >

                    <template v-slot:body-cell-options="props" >
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="cleanForm(), index = props.row._id, goInfo(props.row),  promptEdit = true "></q-btn>
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
            <q-card class="my-card">
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <q-form @submit.prevent.stop="postLots()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input  filled type="text" v-model="name" label="Digite el nombre del Lote" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input  filled type="number" v-model="extent" label="Digite en metros la extención del terreno"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />
                   <q-select filled v-model="farm" :options="optionsFarms" label="Seleccione la Finca"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
<div class="justify-center flex">
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
              </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>

          <q-dialog v-model="promptEdit">
            <q-card class="my-card">
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >

                <q-form @submit.prevent.stop="putInfo()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input  filled type="text" v-model="name" label="Digite el nombre de la Finca" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input  filled type="number" v-model="extent" label="Digite en metros la estencion de terreno"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />
                   <q-select filled v-model="farm" :options="optionsFarms" label="Seleccione la Finca"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
<div class="justify-center flex">
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to=""  v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
              </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>
    </div> 
</template>
  
<script setup>
import {ref, onMounted, onBeforeMount} from 'vue'
import {lotsStore} from "../../store/Maintenance/Lots.js"
const lotsStores = lotsStore()
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let extent= ref()
let farm = ref("")
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let optionsFarms =ref([])
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE LOTE',field: 'name',align: 'center'},
  {name: 'weight',label: 'EXTENCION',align: 'center',field: row => row.extent,format: val => `${val}`,sortable: true},
  {name: 'farm',label: 'NOMBRE FINCA',field: (row)=> row.farm.name, align: 'center'},
  {name: "status",label: "ESTADO",field: (row) => (row.state == 1 ? "Activo" : "Inactivo"),align: "center",},

  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])

const postLots= async ()=>{
    const lots = await lotsStores.newlots(
       name.value, 
       extent.value,
       farm.value.value
       )
    getLots()
console.log(lots);
prompt.value = false
cleanForm()
}

const getLots = async ()=>{
    const lots = await lotsStores.listlots()
    if (lots.status < 299) {
    rows.value = lots.data
    rows.value.forEach((row, index) => {
    row.index = index+1
})
console.log(lots);
  } else {
    console.log(lots)
  }
}

const getFarms = async ()=>{
 const res = await lotsStores.listFarmsActive()
 console.log(res.data);
 if (res.status < 299) {
  for(let i in res.data){
    console.log(i);
    let object = {label: res.data[i].name, value: res.data[i]._id};
    optionsFarms.value.push(object)
  }
 console.log(optionsFarms.value);
} else {
 alert(res)
}
}

async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await lotsStores.active(data._id,0)
    console.log(res);
   getLots()
  } else {
    res = await lotsStores.active(data._id,1)
    console.log(res);
   getLots()
  }
  getLots()
}

function goInfo(data){
    name.value = data.name 
    extent.value = data.extent
    farm.value = {
      label: data.farm.name,
      value: data.farm._id
    }

}

async function putInfo(){
  console.log(index.value);
  const res = await lotsStores.putlots(index.value, 
  name.value, 
  extent.value,
  farm.value.value)
    console.log(res);
    getLots()
    promptEdit.value = false
    cleanForm()
}

function cleanForm(){
  name.value = ""
  extent.value = ""
  farm.value = ""
  index.value = null
}



onBeforeMount(()=>{
  getLots();
  getFarms();
 })

</script>
