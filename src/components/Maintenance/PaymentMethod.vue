<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">METODOS DE PAGO</div>
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
              </span> Metodo de pago
            </div>
        </div> 
          <div class="col-1"></div>
        </div>
        
        <div class="row ">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-btn class="text-capitalize bg-green-10 text-white" @click=" cleanForm(), prompt = true"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span>Crear nuevo metodo de pago</q-btn>
            </div>
            <div class="col-1"></div>
        </div>
        <!-- TABLE INFO -->
       <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
                <q-table style="height: 50vh" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" >
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
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >

                <q-form @submit.prevent.stop="postPayment()" @reset.prevent.stop="cleanForm()">
                <div>
                  <q-input  filled type="text" v-model="name" label="Digite el nombre del tipo de pago" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
<div class="justify-center flex">
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-sm q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to=""  v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px;"> cancel
                  </span>CERRAR</q-btn>
                </div></div>
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
                  <q-input  filled type="text" v-model="name" label="Digite el nombre del medtod de pago" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
              ]" />
<div class="justify-center flex">
                 <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-sm q-mb-sm q-mx-sm save_as bg-green-9 text-white"></q-btn>
                <q-btn type="reset" class="q-mt-md q-mb-sm q-mx-sm " to="" v-close-popup><span
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
import {paymentStore} from "../../store/Maintenance/PaymentMethod.js"
const paymentStores = paymentStore()
let promptEdit = ref(false)
let prompt = ref(false)
let name = ref("")
let index = ref()
let pagination = ref({
        rowsPerPage: 0
      })
let columns = ref([
{ name: 'index', label: '#',field: 'index'},
  {name: 'name',label: 'NOMBRE DEL MÉTODO DE PAGO',field: 'name',align: 'center'},
  {name: "status",label: "ESTADO",field: (row) => (row.state == 1 ? "Activo" : "Inactivo"),align: "center",},
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center', sortable: true },
  
])

let rows = ref([])


const postPayment = async ()=>{
    const payments = await paymentStores.newPayment( name.value)
    getPayment()
    console.log(payments);
    prompt.value = false
    cleanForm()
}

const getPayment = async ()=>{
    const payment = await paymentStores.listPayments()
    console.log(payment);
    if (payment.status < 299) {
      rows.value=payment.data
    rows.value.forEach((row, index) => {
    row.index = index+1
    })
  } else {
    alert(payment)
  }
}

async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await paymentStores.active(data._id, 0)
    console.log(res);
   getPayment()
  } else {
    res = await paymentStores.active(data._id, 1)
    console.log(res);
   getPayment()
  }
}

function goInfo(data){
    name.value = data.name

}

async function putInfo(){
  console.log(index.value);
  const res = await paymentStores.putPayment(index.value, 
    name.value 
    )
    console.log(res);
    getPayment()
    promptEdit.value = false
    cleanForm()
}

function cleanForm(){
  name.value = ""
  index.value= null
}

onBeforeMount(()=>{
  getPayment();
 })

</script>