<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">TIPO DE DOCUMENTOS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator class="q-my-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class=" text-capitalize bg-green-10 text-white" @click="prompt = true">Crear nuevo tipo de documento</q-btn>
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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10"></q-btn>
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
                <q-input class="q-mb-md"  filled type="text" v-model="name" label="Digite el nombre del tipo de documento"></q-input>
                  <q-input filled type="text" v-model="acronym" label="Digite el acronimo a las siglas"></q-input>
                 
                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postTypeDocument()"  />
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
import { documentStore} from "../../store/Maintenance/TypeDocument.js"
const documentsStore = documentStore()
let prompt = ref(false)
let name = ref("")
let acronym = ref("")
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE TIPO DOCUMENTO',field: 'name',align: 'center'},
  {name: 'acronym',label: 'ACRONIMO',align: 'center',field: row => row.acronym,format: val => `${val}`,sortable: true},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
])

let rows = ref([])


const postTypeDocument = async ()=>{
    const document = await documentsStore.newDocument( name.value, acronym.value)
    getTypeDocument()
    console.log(document);
}

const getTypeDocument = async ()=>{
    const document = await documentsStore.listDocuments()
    console.log(document);
    if (document.status < 299) {
    rows.value=document.data
    rows.value.forEach((row, index) => {
    row.index = index+1
    })
    } else {
      alert(document)
    }
}

async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await documentsStore.active(data._id, 0)
    console.log(res);
    getTypeDocument()
  } else {
    res = await documentsStore.active(data._id, 1)
    console.log(res);
    getTypeDocument()
  }
}


  getTypeDocument()


</script>