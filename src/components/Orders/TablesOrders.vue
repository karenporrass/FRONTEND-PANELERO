<template>
<div>
    <div class="row">
        <div class="col">
            <h2 id="Formularios">Pedidos</h2>
            <hr class="bg-green q-mb-xl" style="width: 70%; height: 2px; ">
        </div>
    </div> 


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


   <!-- modal crear  -->
  
   

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
                  </span></q-btn>
                <q-btn name="request_quote" round icon="edit" class="q-mx-md" size="xs" color="green-10"> Factura<span class="material-icons-outlined">
request_quote
</span></q-btn>

<!-- <span class="material-icons-outlined">
request_quote
</span> -->

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
                      <q-input  filled class="q-mb-md" type="text"   v-model="telefono" label="Telefono" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su telefono',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="text"   v-model="direccion" label="Dirección" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su Dirección',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-select filled class="q-mb-md" v-model="tipoPanela" :options="options" label="Escoga el tipo de panela" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Llene el campo de tipo de panela',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                    </div>

                    <div id="inputs">
                      <q-select filled class="q-mb-md"  v-model="formaPanela" :options="options2" label="Escoga la forma de la panela" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Llene el campo de forma de la panela',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="number" v-model="cantidad" label="Cantidad" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite la Cantidad',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-select filled class="q-mb-md"               v-model="tipoEmpaque" :options="options3" label="Escoga el tipo de empaque" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Llene el campo de tipo de empaque',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="text"   v-model="comprobantePago" label="Comprobante" lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Dijite su Comprobante',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                      <q-input  filled class="q-mb-md" type="text"   v-model="abono" label="Abono" lazy-rules :rules="[
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
        <br />
        <q-btn @click="orderPost()" label="guardar" class="text-white bg-green-10"  />
        <q-btn class="q-ml-md" label="cerrar" v-close-popup />
      </div>
    </div>
  </q-card>
</q-dialog>

    <!-- modal editar  -->
    <q-dialog v-model="promptEdit">
  <q-card >
    <q-card-section class="bg-green-10">
      <h5 class="q-mt-sm  text-white">
        EDITAR LA INFORMACIÓN
      </h5>
    </q-card-section >
    <div style="display: flex;">
      <div id="inputs" style="min-width: 200px; margin-left: 30px; margin-top: 20px;">
        <q-input filled class="q-mb-md" type="number" v-model="documento" label="Digite el número de documento" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su documento',
        ]" />
        <q-input filled class="q-mb-md" type="text" v-model="nombre" label="Nombre" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su nombre',
        ]" />
        <q-input filled class="q-mb-md" type="text" v-model="telefono" label="Teléfono" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su teléfono',
        ]" />
        <q-input filled class="q-mb-md" type="text" v-model="direccion" label="Dirección" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su dirección',
        ]" />
        <q-input filled class="q-mb-md" type="number" v-model="saldopendiente" label="Saldo Pendiente" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su documento',
        ]" />
        <q-select filled class="q-mb-md" v-model="tipoPanela" :options="options" label="Escoja el tipo de panela" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Llene el campo de tipo de panela',
        ]" />
      </div>

      <div id="inputs" style="min-width: 200px; margin-left: 30px;margin-top: 20px;">
        <q-select filled class="q-mb-md" v-model="formaPanela" :options="options2" label="Escoja la forma de la panela" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Llene el campo de forma de la panela',
        ]" />
        <q-input filled class="q-mb-md" type="number" v-model="cantidad" label="Cantidad" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite la cantidad',
        ]" />
        <q-select filled class="q-mb-md" v-model="tipoEmpaque" :options="options3" label="Escoja el tipo de empaque" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Llene el campo de tipo de empaque',
        ]" />
        <q-input filled class="q-mb-md" type="text" v-model="comprobantePago" label="Comprobante" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite su comprobante',
        ]" />      <q-input filled class="q-mb-md" type="text" v-model="abono" label="Abono" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite el abono',
        ]" />
        <q-input filled class="q-mb-md" type="number" v-model="valorTotal" label="Valor Total" lazy-rules :rules="[
          (val) => (val && val.trim().length > 0) || 'Digite el valor total',
        ]" />
      </div></div>
      <div id="botones_editar" style="margin-left: 170px; margin-bottom: 20px;">
        <q-btn label="Guardar" class="text-white bg-green-10" @click="putInfo()" />
        <q-btn class="q-ml-md" label="Cerrar" v-close-popup />
      </div>
    
  </q-card>
</q-dialog>


</div>
</template>


<script setup>
import { ref, onMounted} from "vue";
import { OrderStore } from "../../store/Orders/TablesOrders.js"
import { LoginStore } from "../../store/Login/login.js";

const orderStore = OrderStore()
const loginStore = LoginStore()

let abrirCrear=ref(false)
let promptEdit = ref(false)
let index = ref()


let tipoPanela=ref()
let formaPanela=ref()
let tipoEmpaque=ref()
 let documento=ref() 
 let telefono=ref()
 let cantidad= ref()
 let comprobantePago=ref()
 let nombre= ref()
 let direccion=ref() 
 let abono= ref()
 let valorTotal=ref()
 let saldopendiente=ref(valorTotal-abono)
 let pagination = ref({
        rowsPerPage: 0
      })
 


      let options= [
        'Blanca', 'Negra'
      ]

      let options2= [
        'Bloque Rectangular', 'Cono', 'Cono Trunco','Granulada'
      ]   
      
      let options3= [
        'Bolsas Termoencogibles Para Panela', 'Bolsa Con Ventana Impresa', 'Empaque flowpack', 'Bolsa doypack con zipper '
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
  { name: 'name', label: 'Nombre', align: 'center', field: 'Nombre'  },
  { name:'telefono', align:'center', label: 'Telefono', field: 'Telefono' },
  { name:'cantidad', align:'center', label: 'Cantidad', field: 'Cantidad' },
  { name:'comprobantePago', align:'center', label: 'Comprobante De Pago', field: 'ComprobantePago' },
  { name:'saldoPendiente', align:'center', label: 'Saldo Pendiente', field: 'SaldoPendiente' },
  { name:'direccion', align:'center', label: 'Direccion', field: 'Direccion' },
  { name:'abono', align:'center', label: 'Abono', field: 'Abono' },
  { name:'valorTotal', align:'center', label: 'ValorTotal', field: 'ValorTotal' },
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
      tipoPanela.value= data.TipoPanela
      cantidad.value= data.Cantidad
      comprobantePago.value=data.ComprobantePago 
      saldopendiente.value=data.SaldoPendiente
      nombre.value= data.Nombre
      direccion.value= data.Direccion
      formaPanela.value=data.FormaPanela
      tipoEmpaque.value= data.TipoEmpaque
      abono.value=data.Abono 
      valorTotal.value= data.ValorTotal
}


async function orderGet(){
  const res = await orderStore.listOrders()
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

async function orderPost(){
  const order = await orderStore.newOrder(
    documento.value, 
    telefono.value, 
    tipoPanela.value, 
    cantidad.value, 
    comprobantePago.value,
    saldopendiente.value,
    nombre.value,
    direccion.value,
    formaPanela.value,
    tipoEmpaque.value,
    abono.value,
    valorTotal.value,
    loginStore.token
  )
  console.log(order);
  abrirCrear.value=false
  orderGet()
  limpiar()
  
}

async function putInfo() {
  console.log(index.value);
  const res = await orderStore.putOrder(index.value,
    documento.value, 
    telefono.value, 
    tipoPanela.value, 
    cantidad.value, 
    comprobantePago.value,
    saldopendiente.value,
    nombre.value,
    direccion.value,
    formaPanela.value,
    tipoEmpaque.value,
    abono.value,
    valorTotal.value 
  )
  console.log(res);
  abrirCrear.value=false
  orderGet()
  
}

onMounted(() => {
  orderGet()
})



async function activarDesactivar(data) {
  console.log(data);
  console.log(33);
  let res = ""
  if (data.state == 1) {
    res = await orderStore.active(data._id, 0)
    console.log(res);
    orderGet()
  } else {
    res = await orderStore.active(data._id, 1)
    console.log(res);
    orderGet()
  }
  orderGet()
}


function limpiar() {
      documento.value=""
      telefono.value =""
      tipoPanela.value=""
      cantidad.value=""
      comprobantePago.value =""
      saldopendiente.value =""
      nombre.value=""
      direccion.value=""
      formaPanela.value=""
      tipoEmpaque.value=""
      abono.value=""
      valorTotal.value =""
}

</script>

<style>
#butonAdd{
  border-radius: 10px ;
  color: white;
  background-color: green;
  
}
#modalCrear{
  min-width: 50%;
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