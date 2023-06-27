<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">TIPO DE PAGO</div>
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
              </span> Tipo de pagos
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
              <q-btn class="bg-green-10 text-white" @click="cleanForm(), prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span>Crear nuevo tipo de pago</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
              <q-table style="height: 50vh" flat bordered :rows="rows" :columns="columns" row-key="index">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="cleanForm(),index = props.row._id, goInfo(props.row),  promptEdit = true "></q-btn>
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
                <q-form @submit.prevent.stop="postTypePay()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input  filled type="text" v-model="name" label="Digite el nombre del tipo de pago (jornal, detajo, contrato)" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to="" v-close-popup><span
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
                <q-form @submit.prevent.stop="putInfo()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input  filled type="text" v-model="name" label="Digite el nombre del tipo de pago (jornal, detajo, contrato)" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />

                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to=""  v-close-popup><span
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
import { typePayStore} from "../../store/Maintenance/TypePay.js"

const useTypePay= typePayStore()
let promptEdit = ref(false)

let prompt = ref(false)
let name = ref("")
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: 'N°',field: 'index'},
  {name: 'name',label: 'NOMBRE TIPO PAGO',field: 'name',align: 'center'},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },

])

let rows = ref([])



// get registros proceso diario 
async function getTypePay() {
  const res = await useTypePay.listTypePay()
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
      row.index = index + 1
    })
  } else {
    alert(res)
  }
}
getTypePay()

//post proceso diario
async function postTypePay() {
  const res = await useTypePay.newTypePay(
    name.value, // se llama a las variables del modal
  )
  getTypePay()
  console.log(res);
  prompt.value = false
  cleanForm()
}


// activar y desactivar proceso diario 
async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await useTypePay.active(data._id, 0)
    console.log(res);
    getTypePay()
  } else {
    res = await useTypePay.active(data._id, 1)
    console.log(res);
    getTypePay()
  }
}

function goInfo(data){
    name.value = data.name
}

async function putInfo(){
  console.log(index.value);
  const res = await useTypePay.putTypePay(index.value, 
    name.value, 
   )
    console.log(res);
    getTypePay()
    promptEdit.value = false
    cleanForm()
}

function cleanForm(){
  name.value = ""
  index.value = null
}


onBeforeMount(()=>{
  getTypePay();
})

</script>