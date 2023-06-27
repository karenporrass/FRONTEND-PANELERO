<template>
<div>
  <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div class="text-weight-bolder text-h4">PEDIDOS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />



    <div class="row">
        <div 
        class="col-1">
        </div>


        <div id="table" class="col-10" > 

          <div style="display: flex;">
          <router-link to="/homePedidos" style="text-decoration: none;" class="text-dark">
            <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
                arrow_right
              </span> Pedidos</p>
          </router-link>
          <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> Pedidos Clientes</p>
        </div>

            <q-btn class="bg-green-10 text-white" @click="abrirCrear=true,  limpiar()"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px">
            add_circle
          </span>Crear Nuevo Pedido</q-btn>


        </div>

        <div 
        class="col-1">
        </div>
    </div>


    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table tyle="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]">

          <!-- opciones  -->

          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row), promptEdit =true"></q-btn>
                <q-btn v-if="props.row.state == 0" round size="xs" color="green-10"
                  @click="activarDesactivar(props.row)"><span class="material-symbols-outlined" style="font-size: 18px;">
                    check
                  </span></q-btn>
                <q-btn v-else round size="xs" color="red" @click="activarDesactivar(props.row)"><span
                    class="material-symbols-outlined" style="font-size: 18px;">
                    close
                  </span>
                </q-btn>
                
                <router-link style="text-decoration:  none; color: black;" to="/factura">
                <q-btn round class="q-mx-md" size="xs" color="green-10" 
                @click="index = props.row._id, goInfo(props.row)">
                <span style="font-size: 20px;" class="material-icons-outlined">request_quote</span>
                </q-btn></router-link>



              </div>
            </q-td>
          </template>

        </q-table>
      </div>
      <div class="col-1"></div>
    </div>

    <!-- modal crear  -->
    <q-dialog v-model="abrirCrear">
  <q-card id="modalCrear" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <q-card-section class="bg-green-10 q-px-lg">
      <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
        DILIGENCIA LA INFORMACIÓN
      </h5>
    </q-card-section>
    <div class="q-pa-md" style="display: flex; flex-direction: column; align-items: center;">
      <q-form ref="myForm" @submit.prevent.stop="orderPost()">
      <div style="display: flex;">
        <div id="inputs">
                      <q-input  filled class="q-mb-md" type="number" v-model="documento" label="Digite el numero de documento" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su documento',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="text"   v-model="nombre" label="Nombre" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su nombre',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="number"   v-model="telefono" label="Telefono" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su telefono',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="text"   v-model="direccion" label="Dirección" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su Dirección',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-select filled class="q-mb-md" v-model="TipoPanela" :options="optionsPacking" label="Escoja el tipo de panela" lazy-rules :rules="[
          (val) => (val && val.toString().trim().length > 0) || 'Llene el campo de tipo de panela',
        ]" />
                    </div>

                    <div id="inputs">
                      <q-input  filled class="q-mb-md" type="number" v-model="cantidad" label="Cantidad" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite la Cantidad',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-select filled class="q-mb-md"   v-model="TipoEmpaque" :options="Packing" label="Escoga el tipo de empaque" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) || 'Llene el campo de tipo de empaque',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                 <q-select filled class="q-mb-md"   v-model="comprobantePago" :options="options2" label="Comprobante" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) || 'Escoja el comprobante de pago',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="number"   v-model="abono" label="Abono" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite el Abono',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="number" v-model="valorTotal" label="Valor Total" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite el valor total',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
            </div>
      </div>

      <div style="display: flex; justify-content: center; margin-top: 1rem;">
        <q-table :rows="rows2" row-key="name" flat bordered />
      </div>

      <div id="botones">
        <div class="justify-center flex">
                <br />

                <q-btn
                  icon="save_as"
                  label="Guardar"
                  type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"
              
                ></q-btn>
                <q-btn
                  type="button"
                  class="q-mt-md q-mb-sm q-mx-sm"
                  v-close-popup
                  ><span
                    class="material-symbols-outlined q-mr-sm"
                    style="font-size: 23px"
                  >
                    cancel </span
                  >CERRAR</q-btn
                >
              </div>
        
      </div>
    </q-form>
    </div>
    
  </q-card>
</q-dialog>

    <!-- modal editar  -->
    <q-dialog v-model="promptEdit">
  <q-card  style="width: 400px; height: 900px; ">
    <q-card-section class="bg-green-10">
      <h5 class="q-mt-sm  text-white" style="text-align: center;">
        EDITAR LA INFORMACIÓN
      </h5>
    </q-card-section  >
    <div class="q-pa-md" style="display: flex; flex-direction: column; align-items: center;">
      <q-form ref="myForm" @submit.prevent.stop="putInfo()" >
      <div id="inputs" style="min-width: 100px; margin-left: 30px; margin-top: 20px; ">
        <q-input filled class="q-mb-md" type="number" v-model="documento" label="Digite el número de documento" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su documento',
        ]" />
        <q-input filled class="q-mb-md" type="text" v-model="nombre" label="Nombre" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su nombre',
        ]" />
        <q-input filled class="q-mb-md" type="number" v-model="telefono" label="Teléfono" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su teléfono',
        ]" />
        <q-input filled class="q-mb-md" type="text" v-model="direccion" label="Dirección" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su dirección',
        ]" />
        <q-input filled class="q-mb-md" type="number" v-model="saldopendiente" label="Saldo Pendiente" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su documento',
        ]" />
        <q-select filled class="q-mb-md" v-model="TipoPanela" :options="optionsPacking" label="Escoja el tipo de panela" lazy-rules :rules="[
          (val) => (val && val.toString().trim().length > 0) || 'Llene el campo de tipo de panela',
        ]" />
      </div>

      <div id="inputs" style="min-width: 200px; margin-left: 30px;margin-top: 20px;">
        <q-input filled class="q-mb-md" type="number" v-model="cantidad" label="Cantidad" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite la cantidad',
        ]" />
        <q-select filled class="q-mb-md" v-model="TipoEmpaque" :options="Packing" label="Escoja el tipo de empaque" lazy-rules :rules="[
              (val) =>
                  (val && val.toString().trim().length > 0) ||
                  'El campo es requerido',
              ]" />
        <q-select filled class="q-mb-md"   v-model="comprobantePago" :options="options2" label="Comprobante" lazy-rules :rules="[
                (val) =>
                  (val && val.toString().trim().length > 0) || 'Escoja el comprobante de pago',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
         <q-input filled class="q-mb-md" type="number" v-model="abono" label="Abono" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite el abono',
        ]" />
        <q-input filled class="q-mb-md" type="number" v-model="valorTotal" label="Valor Total" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite el valor total',
        ]" />
      </div>
    
      <div class="justify-center flex" style="margin-bottom: 30px;">
        <div >
                <q-btn
                  icon="save_as"
                  label="Actualizar"
                  type="submit"
                  class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-9"
              
                ></q-btn>
                <q-btn
                  type="button"
                  class="q-mt-md q-mb-sm q-mx-sm"
                  v-close-popup
                  ><span
                    class="material-symbols-outlined q-mr-sm"
                    style="font-size: 23px"
                  >cancel</span
                  >CERRAR</q-btn
                >
              </div>
      </div>
    </q-form>
    </div>
  </q-card>
</q-dialog>


</div>
</template>


<script setup>
import { ref, onMounted} from "vue";
import { OrderStore } from "../../store/Orders/TablesOrders.js"
import { LoginStore } from "../../store/Login/login.js";
import {packagingStore} from "../../store/Maintenance/TypePackaging.js"




const orderStore = OrderStore()
const loginStore = LoginStore()
const usePacking= packagingStore()

let abrirCrear=ref(false)
let promptEdit = ref(false)
let index = ref()
let optionsPacking= ref([])
let Packing = ref([])
let TipoPanela=ref([])
let TipoEmpaque=ref([])
 let documento=ref() 
 let telefono=ref()
 let cantidad= ref()
 let comprobantePago=ref()
 let nombre= ref()
 let direccion=ref() 
 let abono= ref()
 let valorTotal=ref()
 let saldopendiente=ref()
 let pagination = ref({
        rowsPerPage: 0
      })
 


      let options2= [
        'Si', 'No'
      ]   
      
    



let columns = ref([
  { name: 'index', label: 'N°', field: 'index', align: 'center' },
  { name:'documento', align:'center', label: 'Documento', field: 'Documento' },
  {
    name: "date",
    label: "FECHA",
    field: (row) => row.Date.slice(0, 10),
    align: "center",
  },
  { name: 'name', label: 'NOMBRE', align: 'center', field: 'Nombre'  },
  { name:'telefono', align:'center', label: 'TELEFONO', field: 'Telefono' },
  { name:'cantidad', align:'center', label: 'CANTIDAD', field: 'Cantidad' },
  { name:'comprobantePago', align:'center', label: 'COMPROBANTE DE PAGO', field: 'ComprobantePago' },
  { name:'saldoPendiente', align:'center', label: 'SALDO PENDIENTE', field: 'SaldoPendiente' },
  { name:'direccion', align:'center', label: 'DIRECCION', field: 'Direccion' },
  {name: "TipoPanela",
    label: "TIPO DE PANELA",
    field: (row) => row.TipoPanela.name,
    align: "center",
  }, 
  { 
    name: 'typePacking', 
  label: 'TIPO DE EMPAQUE', 
  field: (row) => row.TipoEmpaque.name, 
  align: 'center' 
},
  { name:'abono', align:'center', label: 'ABONO', field: 'Abono' },
  { name:'valorTotal', align:'center', label: 'VALOR TOTAL', field: 'ValorTotal' },
  {
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center' },

])



let rows2= ref([
  {
    name:'Yogur',
    
  }
])

let rows = ref([])
rows.value.forEach((row, index) => {
  row.index = index
})


function goInfo(data){
      documento.value =data.Documento
      telefono.value= data.Telefono 
      TipoPanela.value= {
        label: data.TipoPanela.name,
        value: data.TipoPanela._id,
      }
      cantidad.value= data.Cantidad
      comprobantePago.value=data.ComprobantePago 
      saldopendiente.value=data.SaldoPendiente
      nombre.value= data.Nombre
      direccion.value= data.Direccion
      TipoEmpaque.value=  {
    label: data.TipoEmpaque.name,
    value: data.TipoEmpaque._id
  };
      abono.value=data.Abono 
      valorTotal.value= data.ValorTotal

}


async function orderGet(){
  const res = await orderStore.listOrders()
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
    row.index = index+1
  })
  } else {
    alert(res)
   
  }
}

async function orderPost(){
  const order = await orderStore.newOrder(
    documento.value, 
    telefono.value, 
    TipoPanela.value.value, 
    cantidad.value, 
    comprobantePago.value,
    saldopendiente.value=valorTotal.value-abono.value,
    nombre.value,
    direccion.value,
    TipoEmpaque.value.value,
    abono.value,
    valorTotal.value,
    loginStore.token
  )

  abrirCrear.value=false

  orderGet()
  limpiar()
  
}

async function putInfo() {
  const res = await orderStore.putOrder(index.value,
    documento.value, 
    telefono.value, 
    TipoPanela.value.value, 
    cantidad.value, 
    comprobantePago.value,
    saldopendiente.value=valorTotal.value-abono.value,
    nombre.value,
    direccion.value,
    TipoEmpaque.value.value,
    abono.value,
    valorTotal.value 
  )
  promptEdit.value=false
  orderGet()
  
}

onMounted(() => {
  orderGet()
  getTypePanela()
  getPackaingPanela()
})



async function activarDesactivar(data) {
  let res = ""
  if (data.state == 1) {
    res = await orderStore.active(data._id, 0)
    orderGet()
  } else {
    res = await orderStore.active(data._id, 1)

    orderGet()
  }
  orderGet()
}


function limpiar() {
      documento.value=""
      telefono.value =""
      TipoPanela.value=""
      cantidad.value=""
      comprobantePago.value =""
      saldopendiente.value =""
      nombre.value=""
      direccion.value=""
      TipoEmpaque.value=""
      abono.value=""
      valorTotal.value =""
}


async function getTypePanela() {
  const res = await orderStore.listPanelaActive();
  console.log(res);
  if (res.status < 299) {
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsPacking.value.push(object);

      console.log(optionsPacking.value);
    }
    return optionsPacking.value
  } else {
    throw new Error ("Error al obtener los datos de people")
  }
}
 
async function getPackaingPanela() {
  const res = await orderStore.listPackagingActive();
  console.log(res);
  if (res.status < 299) {
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      Packing.value.push(object);
      console.log(Packing.value);
    }
    return Packing.value
  } else {
    throw new Error ("Error al obtener los datos de people")
  }
}

</script>

<style>
#butonAdd{
  border-radius: 10px ;
  color: white;
  background-color: green;
  
}
#modalCrear{
  min-width: 45%;
  height: 900px;
}
#pCrear{
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 1px;
}

#inputs{
  width: 250px;
  margin-bottom: 10px;
  margin-right: 50px;
}



</style>