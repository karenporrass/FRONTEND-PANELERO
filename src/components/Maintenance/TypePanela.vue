<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">TIPO DE PANELAS</div>
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
              </span>Tipo de panelas
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nuevo Tipo de panela</q-btn>
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
                <q-form @submit="postPanela()">
                <div>
                  <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la forma de la panela" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input class="q-mb-md" filled type="text" v-model="price" label="Digite el precio por unidad"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />

                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"
                  @click="postPanela()"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm bg-green-9" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
                </q-form>
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

                <q-form @submit="putInfo()">
                <div>
                  <q-input class="q-mb-md" filled type="text" v-model="name" label="Digite el nombre de la forma de la panela" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

               <q-input class="q-mb-md" filled type="text" v-model="price" label="Digite el precio por unidad"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'El campo es requerido',
                ]" />

                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"
                  @click="putInfo()"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm bg-green-9" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>
    </div> 
</template>
  
<script setup>
import {ref, onMounted, onBeforeMount} from 'vue'
import { panelaStore } from "../../store/Maintenance/TypePanela.js"
const panelasStore = panelaStore()
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let price= ref()
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE TIPO PANELA',field: 'name',align: 'center'},
  {name: 'price',label: 'PRICE',align: 'center',field: row => row.price,format: val => `${val}`,sortable: true},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
])

let rows = ref([])

const postPanela = async ()=>{
    const panela = await panelasStore.newPanela( 
      name.value,
      price.value 
       )
    getPanela()
    console.log(panela);
}

const getPanela = async ()=>{
    const panela = await panelasStore.listPanela()
    console.log(panela);
    if (panela.status < 299) {
      rows.value=panela.data
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
    res = await panelasStore.active(data._id, 0)
    console.log(res);
    getPanela()
  } else {
    res = await panelasStore.active(data._id, 1)
    console.log(res);
    getPanela()
  }
}

function goInfo(data){
    name.value = data.name
    price.value = data.price
}

async function putInfo(){
  console.log(index.value);
  const res = await panelasStore.putPanela(index.value, 
  name.value,
  price.value
  )
    console.log(res);
    getPanela()
}

onBeforeMount(()=>{
  getPanela();
 })


</script>