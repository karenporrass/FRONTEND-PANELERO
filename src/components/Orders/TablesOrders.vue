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
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10"></q-btn>
                <q-btn round icon="delete" size="xs" color="green-10"></q-btn>
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
                <q-input  filled class="q-mb-md" type="number" v-model="Document" label="Digite el numero de documento"></q-input>
                <q-input  filled class="q-mb-md" type="text" v-model="Nombre" label="Nombre"></q-input>
                <q-input filled  class="q-mb-md" type="text" v-model="Telefono" label="Telefono"></q-input>
                <q-input  filled class="q-mb-md" type="text" v-model="Dirección" label="Dirección"></q-input>
                <q-select filled class="q-mb-md" v-model="TipoPanela" :options="options" label="Escoga el tipo de panela" />
              </div>

              <div id="inputs">
                <q-select filled class="q-mb-md" v-model="FormaPanela" :options="options2" label="Escoga la forma de la panela" />
                <q-input  filled class="q-mb-md" type="number" v-model="Cantidad" label="Cantidad"></q-input>
                <q-select filled class="q-mb-md" v-model="TipoEmpaque" :options="options3" label="Escoga el tipo de empaque" />
                <q-input  filled class="q-mb-md" type="text" v-model="Comprobante" label="Comprobante"></q-input>
                <q-input  filled class="q-mb-md" type="text" v-model="Abono" label="Abono"></q-input>
                <q-input  filled class="q-mb-md" type="number" v-model="ValorTotal" label="Valor Total"></q-input>
              </div>

          </div>

          
          <div id="botones">
                    <br />
                    <q-btn @click="addOrder()" label="guardar" class="text-white bg-green-10"  />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>

        </div>
      </q-card>
    </q-dialog>




</div>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";

let abrirCrear=ref(false)
let TipoPanela=ref(null)
let FormaPanela=ref(null)
let TipoEmpaque=ref(null)


 let Documento=ref() 
 let Telefono=ref()
 let Cantidad= ref()
 let ComprobantePago=ref()
 let SaldoPendiente=ref() 
 let Nombre= ref()
 let Direccion=ref() 
 let Abono= ref()
 let ValorTotal=ref()


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
  { name:'Documento', align:'center', label: 'Documento', field: 'Documento' },
  { name: 'name', label: 'NOMBRE', align: 'center', field: row => row.name, format: val => `${val}`, sortable: true },
  { name:'Telefono', align:'center', label: 'Telefono', field: 'Telefono' },
  { name:'Cantidad', align:'center', label: 'Cantidad', field: 'Cantidad' },
  { name:'ComprobantePago', align:'center', label: 'Comprobante De Pago', field: 'ComprobantePago' },
  { name:'SaldoPendiente', align:'center', label: 'Saldo Pendiente', field: 'SaldoPendiente' },
  { name:'Direccion', align:'center', label: 'Direccion', field: 'Direccion' },
  { name:'Abono', align:'center', label: 'Abono', field: 'Abono' },
  { name:'ValorTotal', align:'center', label: 'ValorTotal', field: 'ValorTotal' },
  { name: 'options', align: 'center', label: 'OPCIONES', align: 'center' },

])


let rows = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
 
])
rows.value.forEach((row, index) => {
  row.index = index
})

const addOrder = async()=>{
    try {
        const neworder = await axios.post("http://localhost:3500/pedidos",{
            Documento: Documento.value,
            Telefono: Telefono.value ,
            TipoPanela: TipoPanela.value,
            Cantidad: Cantidad.value,
            ComprobantePago:ComprobantePago.value ,
            SaldoPendiente: SaldoPendiente.value ,
            Nombre: Nombre.value,
            Direccion: Direccion.value,
            FormaPanela:FormaPanela.value,
            TipoEmpaque: TipoEmpaque.value,
            Abono:Abono.value ,
            ValorTotal: ValorTotal.value ,
        })
        console.log(neworder);
    } catch (error) {
        console.log(error);
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