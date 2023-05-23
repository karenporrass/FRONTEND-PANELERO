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

            <q-btn @click="abrirCrear=true" id="butonAdd">Crear <q-icon name="add"></q-icon> </q-btn>


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
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index">

          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="index = props.row._id, goInfo(props.row), promptEdit == true "></q-btn>
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

    <q-dialog v-model="abrirCrear">
      <q-card>
        <q-card-section class="bg-green-10 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md ">
          <div style="display: flex;">

              <div id="inputs">
                <q-input  filled class="q-mb-md" type="number" v-model="documento" label="Digite el numero de documento"></q-input>
                <q-input  filled class="q-mb-md" type="text"   v-model="nombre" label="Nombre"></q-input>
                <q-input  filled class="q-mb-md" type="text"   v-model="telefono" label="Telefono"></q-input>
                <q-input  filled class="q-mb-md" type="text"   v-model="direccion" label="Dirección"></q-input>
                <q-input  filled class="q-mb-md" type="number" v-model="saldopendiente" label="Saldo Pendiente"></q-input>
                <q-select filled class="q-mb-md" v-model="tipoPanela" :options="options" label="Escoga el tipo de panela" />
              </div>

              <div id="inputs">
                <q-select filled class="q-mb-md"               v-model="formaPanela" :options="options2" label="Escoga la forma de la panela" />
                <q-input  filled class="q-mb-md" type="number" v-model="cantidad" label="Cantidad"></q-input>
                <q-select filled class="q-mb-md"               v-model="tipoEmpaque" :options="options3" label="Escoga el tipo de empaque" />
                <q-input  filled class="q-mb-md" type="text"   v-model="comprobantePago" label="Comprobante"></q-input>
                <q-input  filled class="q-mb-md" type="text"   v-model="abono" label="Abono"></q-input>
                <q-input  filled class="q-mb-md" type="number" v-model="valorTotal" label="Valor Total"></q-input>
              </div>

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
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
               EDITAR LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div style="display: flex;">
                    <div id="inputs">
                      <q-input  filled class="q-mb-md" type="number" v-model="documento" label="Digite el numero de documento"></q-input>
                      <q-input  filled class="q-mb-md" type="text"   v-model="nombre" label="Nombre"></q-input>
                      <q-input  filled class="q-mb-md" type="text"   v-model="telefono" label="Telefono"></q-input>
                      <q-input  filled class="q-mb-md" type="text"   v-model="direccion" label="Dirección"></q-input>
                      <q-input  filled class="q-mb-md" type="number" v-model="saldopendiente" label="Saldo Pendiente"></q-input>
                      <q-select filled class="q-mb-md" v-model="tipoPanela" :options="options" label="Escoga el tipo de panela" />
                    </div>

                    <div id="inputs">
                      <q-select filled class="q-mb-md"               v-model="formaPanela" :options="options2" label="Escoga la forma de la panela" />
                      <q-input  filled class="q-mb-md" type="number" v-model="cantidad" label="Cantidad"></q-input>
                      <q-select filled class="q-mb-md"               v-model="tipoEmpaque" :options="options3" label="Escoga el tipo de empaque" />
                      <q-input  filled class="q-mb-md" type="text"   v-model="comprobantePago" label="Comprobante"></q-input>
                      <q-input  filled class="q-mb-md" type="text"   v-model="abono" label="Abono"></q-input>
                      <q-input  filled class="q-mb-md" type="number" v-model="valorTotal" label="Valor Total"></q-input>
                    </div>
                    <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"  @click="putInfo()"/>
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>

                    </div>
            </q-card>
          </q-dialog>


</div>
</template>


<script setup>
import { ref, onMounted} from "vue";
import { OrderStore } from "../../store/Orders/TablesOrders.js"
const orderStore = OrderStore()


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
 let saldopendiente=ref()
 


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
  { name: 'date', label: 'Fecha', align: 'center', field: 'Date'  },
  { name: 'name', label: 'Nombre', align: 'center', field: 'Nombre'  },
  { name:'telefono', align:'center', label: 'Telefono', field: 'Telefono' },
  { name:'cantidad', align:'center', label: 'Cantidad', field: 'Cantidad' },
  { name:'comprobantePago', align:'center', label: 'Comprobante De Pago', field: 'ComprobantePago' },
  { name:'saldoPendiente', align:'center', label: 'Saldo Pendiente', field: 'SaldoPendiente' },
  { name:'direccion', align:'center', label: 'Direccion', field: 'Direccion' },
  { name:'abono', align:'center', label: 'Abono', field: 'Abono' },
  { name:'valorTotal', align:'center', label: 'ValorTotal', field: 'ValorTotal' },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center' },

])


let rows = ref([
  {
    Documento: null, Date: null,Telefono: null,TipoPanela: null,Cantidad: null,ComprobantePago: null,SaldoPendiente: null, Nombre: null,Direccion: null,FormaPanela: null,TipoEmpaque: null,Abono: null,ValorTotal: null
  }
 
])
rows.value.forEach((row, index) => {
  row.index = index
})


function goInfo(data){
      documento.value =data.documento,
      telefono.value= data.telefono ,
      tipoPanela.value= data.tipoPanela,
      cantidad.value= data.cantidad,
      comprobantePago.value=data.comprobantePago ,
      saldopendiente.value=data.saldopendiente,
      nombre.value= data.nombre,
      direccion.value= data.direccion,
      formaPanela.value=data.formaPanela,
      tipoEmpaque.value= data.tipoEmpaque,
      abono.value=data.abono ,
      Date.value= data.Date,
      valorTotal.value= data.valorTotal
}


const orderGet = async () => {

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

const orderPost = async () => {
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
    valorTotal.value
  )
  console.log(order);
  orderGet()

}

async function putInfo() {
  console.log(index.value);
  const res = await orderStore.putPays(index.value,
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
  orderGet()
  limpiar()
}

onMounted(() => {
  orderGet()
})



async function activarDesactivar(data) {
  console.log(data);
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
  height: 800px;
}
#pCrear{
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 1px;
}

#inputs{
  width: 250px;
  margin-bottom: 10px;
  margin-right: 40px;
}
#botones{
  margin-left: 160px;
}



</style>