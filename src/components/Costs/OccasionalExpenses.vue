<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div  class="text-weight-bolder text-h4">GASTOS OCASIONALES</div>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
        
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
              <div style="display: flex;">
          <router-link to="/homeCostos" style="text-decoration: none;" class="text-dark" >
          <p style="font-size: 20px; " ><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> Costos</p> </router-link>
            <p style="font-size: 20px; " ><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> Gastos Ocacionales </p>
        </div>
                <q-btn class="bg-green-10 text-white"  @click="promptEdit = true, vaciar()"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span>Crear nuevo gasto</q-btn>
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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row),  prompt = true "></q-btn>
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
        
                  <q-input filled type="text" v-model="nameSpent" label="Nombre del gasto"></q-input>
                  <q-input  filled type="text" v-model="Finca" label="Finca"></q-input>
                  <q-input  filled type="text" v-model="Description" label="Descripcion"></q-input>
           
                  <q-select filled type="text" v-model="PAYMENT_METHOD" :options="optionsMethod" label="seleccione el metodo de pago" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]"/>
                  <q-input  filled type="number" v-model="costValue" label="Valor del gasto"></q-input>
                  <q-input  filled type="number" v-model="total" label="Total"></q-input>

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10" @click="postOccasional()" />
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
        
                  <q-input filled type="text" v-model="Name_spent" label="Nombre del gasto"></q-input>
                  <q-input  filled type="text" v-model="Finca" label="Finca"></q-input>
                  <q-input  filled type="text" v-model="Description" label="Descripcion"></q-input>
           
                  <q-select filled type="text" v-model="PAYMENT_METHOD" :options="optionsMethod" label="seleccione el metodo de pago" lazy-rules :rules="[
                (val) =>
                  (val  > 0) || 'El campo es requerido',
              ]"/>
                  <q-input  filled type="number" v-model="costValue" label="Valor del gasto"></q-input>
                  <q-input  filled type="number" v-model="total" label="Total"></q-input>

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
import {ref, onMounted} from "vue"
import { OccasionalStore } from "../../store/Costs/OccasionalExpenses.js"
const occasionalStore = OccasionalStore()
let prompt = ref(false)
let promptEdit = ref(false)
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
  {name: 'Name_spent',label: 'Nombre del gasto',field: 'Name_spent',align: 'center'},
  { name: 'finca', align: 'center', label: 'FINCA', field: 'Finca',align: 'center' },
  { name: 'Description', label: 'DESCRIPCION', field: 'Description' ,align: 'center'},
  { name: 'Date', label: 'FECHA', field: 'Date',align: 'center' },
  {
    name: "PAYMENT_METHOD",
    label: "Metodo de pago",
    field: (row) => row.PAYMENT_METHOD,
    align: "center",
  },
  { name: 'costValue', label: 'VALOR DEL GASTO', field: 'costValue',align: 'center' },
  {
    name: 'total', label: 'TOTAL A PAGAR', align: 'center', field:
      "Total"
  },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
  
])  



let Name_spent = ref()
let Finca = ref()
let Description = ref()
let PAYMENT_METHOD = ref()
let costValue = ref()
let optionsMethod = ref([]);
let rows = ref([])

rows.value.forEach((row, index) => {
  row.index = index
})


function vaciar() {
  Name_spent.value = ""
  Finca.value = ""
  Description.value = ""
  PAYMENT_METHOD.value = ""
  costValue.value = ""
  optionsMethod.value = ""

}


async function getMethod() {
  // optionsPeople.value=[]
  const res = await occasionalStore.listOccacionalActive();
  console.log(res);
  if (res.status < 299) {
   
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsMethod.value.push(object);

      console.log(optionsMethod.value);
    }
    
  } else {
    throw new Error ("Error al obtener los datos de metodo de pago")
  }
}

const postOccasional = async () => {
  const occasional = await occasionalStore.newOccasional(

Name_spent.value,
Finca.value,
Description.value,
PAYMENT_METHOD.value,
costValue.value,

  )
  console.log(occasional);
  getPays()

}




async function getOccasional() {
    const res = await occasionalStore.listOccasional()
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
    res = await occasionalStore.active(data._id, 0)
    console.log(res);
    getOccasional()
  } else {
    res = await occasionalStore.active(data._id, 1)
    console.log(res);
    getOccasional()
  }
}

function goInfo(data) {
  Name_spent.value = data.Name_spent
Finca.value = data.Finca
Description.value = data.Description
PAYMENT_METHOD.value = 
{
    label: data.PAYMENT_METHOD.name,
    value: data.PAYMENT_METHOD._id
  };
costValue.value = data.costValue
    
}

async function putInfo() {
  console.log(index.value);
  const res = await occasionalStore.putOccasional(index.value,
  Name_spent.value,
Finca.value,
Description.value,
PAYMENT_METHOD.value,
costValue.value,
  )
  console.log(res);
  getOccasional()
  prompt.value = false
}


onMounted(() => {
  getOccasional()
  getMethod()
})

</script>

<style scoped>
.q-input{
  margin-bottom: 20px;
}

</style>