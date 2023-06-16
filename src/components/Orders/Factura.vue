<template>
    <div>

        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div class="text-weight-bolder text-h4">FACTURA</div>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />



        <div style="display: flex; margin-left: 40px;">
          <router-link to="/pedidosDos" style="text-decoration: none;" class="text-dark">
            <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
                arrow_right
              </span> Pedidos Clientes</p>
          </router-link>
          <p style="font-size: 20px; "><span style="font-size: 50px; " class="material-icons-outlined">
              arrow_right
            </span> Factura</p>
        </div>

<!-- factura  -->



<div class="row">

    <div class="col-1"></div>
    <div class="col-8"><strong>Nombre: {{ factura.nombre }} <br> Ciudad:{{ ciudad }} <br> Dirección:{{ factura.direccion }} <br> N° Documento:{{factura.documento  }} </strong></div>
    <div class="col-3"><strong> Numero De Factura #{{ numeroFactura }} <br> Fecha:{{ factura.fecha }} <br> Nombre de la empresa: Trapiche Panelero</strong></div>
   
</div>

<div class="row">
    
</div>



    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table tyle="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]">

        </q-table>
      </div>
      <div class="col-1"></div>
    </div>


   <!-- fin div container  -->
    </div>
</template>


<script setup>
import {ref} from "vue";

let numeroFactura = Math.floor(Math.random() * 1000000) + 1;

let ciudad=ref("San Gil")

 let pagination = ref({
        rowsPerPage: 0
      })



let columns = ref([
  { name: 'index', label: 'N°', field: 'index', align: 'center' },
  { name:'telefono', align:'center', label: 'ARTICULO', field: 'Telefono' },
  { name:'cantidad', align:'center', label: 'CANTIDAD', field: 'Cantidad' },
  { name:'comprobantePago', align:'center', label: 'TIPO DE EMPAQUE', field: 'ComprobantePago' },
  { name:'saldoPendiente', align:'center', label: 'SALDO PENDIENTE', field: 'SaldoPendiente' },
  {name: "tipoPanela",
    label: "TIPO DE PANELA",
    field: (row) => row.tipoPanela,
    align: "center",
  }, 
  { name:'abono', align:'center', label: 'ABONO', field: 'Abono' },
  { name:'valorTotal', align:'center', label: 'VALOR TOTAL', field: 'ValorTotal' },
])


let rows = ref([])
rows.value.forEach((row, index) => {
  row.index = index
})



let factura= ref({
      numeroFactura: 123456,
      nombre: 'John',
      documento: '',
      direccion: '',
      telefono: '',
      tipoPanela: '',
      formaPanela: '',
      tipoEmpaque: '',
      cantidad: "",
      comprobantePago: '',
      abono: 100,
      valorTotal: 500,
      saldoPendiente: 400
    }) 
    
      
    function goInfo(data){
      factura.documento.value =data.Documento
      factura.telefono.value= data.Telefono 
      factura.tipoPanela.value= {
        label: data.tipoPanela.name,
        value: data.tipoPanela._id,
      }
      factura.cantidad.value= data.Cantidad
      factura.comprobantePago.value=data.ComprobantePago 
      factura.saldopendiente.value=data.SaldoPendiente
      factura.nombre.value= data.Nombre
      factura.direccion.value= data.Direccion
      factura.formaPanela.value=data.FormaPanela
      factura.tipoEmpaque.value= data.TipoEmpaque
      factura.abono.value=data.Abono 
      factura.valorTotal.value= data.ValorTotal
}


</script>


<style>
#Formularios{
    text-align: center;
    font-family:Georgia, 'Times New Roman', Times, serif;
    margin-bottom:10px ;
}





</style>