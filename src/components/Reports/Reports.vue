<template>
  <div>
      <div class="row q-mt-md">
          <div class="col-1"></div>
          <div class="col-10  text-center">
              <div  class="text-weight-bolder text-h4" >REPORTES</div>
          </div>
          <div class="col-1"></div>
      </div>
      <q-separator inset class="q-mt-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />

      <div class="row q-mt-xl">
          <div class="col-2"></div>
          <div class="col-2 q-mt-xl ">
              <q-card class="my-card  shadow-8 "
                  style="border: solid; border-color: darkgreen; border-radius: 15px;">
                  <q-card-section>
                      <div class="text-center"> <i class="fa-solid fa-sliders" style="font-size: 50px;"></i> </div>
                  </q-card-section>
                  <q-separator class="bg-green-10 " />
                 <q-card-actions vertical align="center">
                    <q-btn flat class="text-subtitle1 text-dark" @click="abrirDescargar=true">Mantenimiento</q-btn>
                  </q-card-actions>
              </q-card>
          </div>
          <div class="col-1"></div>

          <div class="col-2 text-center  q-mt-xl ">
              <q-card class="my-card  shadow-8"
                  style="border: solid; border-color: darkgreen; border-radius: 15px;">
                  <q-card-section>
                      <div class="text-center"><i class="fa-solid  fa-coins" style="font-size: 50px;"></i></div>
                  </q-card-section>
                  <q-separator class="bg-green-10" />
                  
                 <q-card-actions vertical align="center" class="q-pt-none">
                       <q-btn flat class="text-subtitle1" @click="abrirDescargar3=true">Costos </q-btn>
                  </q-card-actions>
              
              </q-card>
          </div>
          <div class="col-1"></div>
          <div class="col-2 text-center  q-mt-xl ">
              <q-card class="my-card  shadow-8 " style="border: solid; border-color: darkgreen; border-radius: 15px;">
                  <q-card-section>
                      <div class="text-center"><i class="fa-solid fa-cart-shopping" style="font-size: 50px;"></i></div>
                  </q-card-section>
                  <q-separator class="bg-green-10" />
                  
                   <q-card-actions vertical align="center">
                      <q-btn flat class="text-subtitle1" @click="abrirDescargar4=true">Pedidos </q-btn>
                  </q-card-actions>
                  
              </q-card>
          </div>
          <div class="col-3"></div>
          <div class="col-2 q-mt-xl ">
              <q-card class="my-card  shadow-8 "
                  style="border: solid; border-color: darkgreen; border-radius: 15px;">
                  <q-card-section>
                      <div class="text-center"> <i class="fa-solid fa-arrows-spin" style="font-size: 50px;"></i> </div>
                  </q-card-section>
                  <q-separator class="bg-green-10 " />
                <q-card-actions vertical align="center">
                    <q-btn flat class="text-subtitle1 text-dark" @click="abrirDescargar5=true">Trasformación</q-btn>
                  </q-card-actions>
              </q-card>
          </div>
          <div class="col-1"></div>

          <div class="col-2 text-center  q-mt-xl ">
              <q-card class="my-card  shadow-8"
                  style="border: solid; border-color: darkgreen; border-radius: 15px;">
                  <q-card-section>
                      <div class="text-center"><i class="fa-solid fa-clipboard-list" style="font-size: 50px;"></i></div>
                  </q-card-section>
                  <q-separator class="bg-green-10" />
                  
                 <q-card-actions vertical align="center" class="q-pt-none">
                       <q-btn flat class="text-subtitle1" @click="abrirDescargar6=true">Inventario </q-btn>
                  </q-card-actions>
            
              </q-card>
          </div>
          
      </div>

<!-- modal descargar mantenimiento -->
<div class="row q-mt-md">
          <div class="col-1"></div>
          <div class="col-10 ">
              <!-- <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                  virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" /> -->
          </div>
          <div class="col-1"></div>
      </div> 

      <q-dialog v-model="abrirDescargar">
          <q-card >
            <q-card-section class="bg-green-10">
              <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                DILIGENCIA LA INFORMACIÓN
              </h5>
            </q-card-section>
            <div class="q-pa-md " >
            
          
                <div>
                <q-select filled v-model="fecha" :options="fechas" label="Seleccione la fecha"
                lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
                ]" />
              
                  <q-select filled v-model="tipo" :options="options2" label="Escoja"  lazy-rules :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'El campo es requerido',
                /* val => val > 0 && val < 100 || 'Please type a real age' */
              ]"/>
                  <div>
                

              
                  <q-btn @click="validate()" label="Descargar pdf" class="text-white bg-green-10"  />
                  <q-btn class="q-ml-md" label="cerrar" v-close-popup />

                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>
 
<!-- modal costos  -->
<div class="row q-mt-md">
          <div class="col-1"></div>
          <div class="col-10 ">
              <!-- <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                  virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" /> -->
          </div>
          <div class="col-1"></div>
      </div> 

      <q-dialog v-model="abrirDescargar3">
          <q-card >
            <q-card-section class="bg-green-10">
              <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                DILIGENCIA LA INFORMACIÓN
              </h5>
            </q-card-section>
            <div class="q-pa-md " >
              <div>
                <q-input filled type="date"  label="Fecha"></q-input><br>
                <q-select filled v-model="tipo" :options="options3" label="Escoja" />
                <div>
                  <br />
                  <q-btn @click="descargarPdf()" label="Descargar pdf" class="text-white bg-green-10"  />
                  <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>


<!-- modal pedidos  -->
<div class="row q-mt-md">
          <div class="col-1"></div>
          <div class="col-10 ">
              <!-- <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                  virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" /> -->
          </div>
          <div class="col-1"></div>
      </div> 

      <q-dialog v-model="abrirDescargar4">
          <q-card >
            <q-card-section class="bg-green-10">
              <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                DILIGENCIA LA INFORMACIÓN
              </h5>
            </q-card-section>
            <div class="q-pa-md " >
              <div>
                <q-input filled type="date"  label="Fecha"></q-input><br>
                <q-select filled v-model="tipo" :options="options4" label="Escoja" />
                <div>
                  <br />
                  <q-btn @click="descargarPdf()" label="Descargar pdf" class="text-white bg-green-10"  />
                  <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>


        <!-- modal trasformacion  -->
<div class="row q-mt-md">
          <div class="col-1"></div>
          <div class="col-10 ">
              <!-- <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                  virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" /> -->
          </div>
          <div class="col-1"></div>
      </div> 

      <q-dialog v-model="abrirDescargar5">
          <q-card >
            <q-card-section class="bg-green-10">
              <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                DILIGENCIA LA INFORMACIÓN
              </h5>
            </q-card-section>
            <div class="q-pa-md " >
              <div >
      
                <q-input  filled type="date"  label="Fecha"></q-input> <br>
                <q-select  filled v-model="tipo" :options="options5" label="Escoja" />
              
                <div>
                  <br />
                  <q-btn @click="validate()" label="Descargar pdf" class="text-white bg-green-10"  />
                  <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>


        <!-- modal Inventario  -->
<div class="row q-mt-md">
          <div class="col-1"></div>
          <div class="col-10 ">
              <!-- <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                  virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" /> -->
          </div>
          <div class="col-1"></div>
      </div> 

      <q-dialog v-model="abrirDescargar6">
          <q-card >
            <q-card-section class="bg-green-10">
              <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                DILIGENCIA LA INFORMACIÓN
              </h5>
            </q-card-section>
            <div class="q-pa-md " >
              <div>
                <q-input filled type="date"  label="Fecha"></q-input><br>
                <q-select filled v-model="tipo" :options="options6" label="Escoja" />
                <div>
                  <br />
                  <q-btn @click="descargarPdf()" label="Descargar pdf" class="text-white bg-green-10"  />
                  <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>




  </div>
</template>

<script setup>
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import {usersStore} from "../../store/Maintenance/CreateUsers.js"
import {ref} from "vue"

const useUsers= usersStore()

let abrirDescargar=ref(false)
let abrirDescargar3=ref(false)
let abrirDescargar4=ref(false)
let abrirDescargar5=ref(false)
let abrirDescargar6=ref(false)
let pdf = ref()
let res = ""
let tipo=ref(null)
let fecha = ref()
let now = ""

var columns = ""
var rows = []

let fechas = ref([
{label:'Enero', value: '06'}
])
let options2= ref([
      'Personas', 'Labores', 'Método de pago', 'Tipo de pago', 'Unidad de medida', 'Eps', 'Tipo de documento', 'Lotes', 'Etapas', 'Fincas' , 
      'Empaques', 'Soporte'
    ]   )

let options3= ref([
      'Gastos Ocasionales', 'Gastos Mensuales', 'Pagos'
    ]   )
    
let options4= ref([
      'Pedidos'
    ]   )

let options5= ref([
      'Proceso diario', 'Materia prima transformada', 'Empacados'
    ]   )

let options6= ref([
      'Marcas', 'Categorias', 'Productos', 'Bodegas'
    ]   )


async function validate(){
console.log(tipo.value);
if(tipo.value=="Personas"){
  res = await useUsers.listUsers() 
  console.log(res.data);

  for(let i in res.data ){
  let dates = res.data[i].date
  now = dates.substring(5,7);
  console.log(now);
  if(now == fecha.value.value){
    console.log('si');
    rows.push([res.data[i].names, res.data[i].typeDocument.acronym, res.data[i].numberDocument, res.data[i].rol, res.data[i].cel, res.data[i].email]);
     columns = ["Nombres", "Tipo de documento", "Numero documento", "Rol", "Cel", "Email"];
  }
  else(
    console.log("no")
  )
}
descargarPdf()
}
else( console.log('hola')
)

}


function descargarPdf() {
    pdf.value = new jsPDF();
    pdf.value.setFont("helvetica", "bold");
    pdf.value.setFontSize(16);

    pdf.value.text(`Informacion ${tipo.value}`, 10, 10); 

    pdf.value.setFont("helvetica", "normal");
    pdf.value.setFontSize(12);

    console.log(columns);
    console.log(rows);
    pdf.value.autoTable({
      head: [columns],
      body: rows,
      startY: 20,

    });
    pdf.value.save("Reporte.pdf");
  }


  // function descargarPdf() {
  //     if (tipo.value=="Personas") {
  //         downloadPdfPersonas()
  //     }
      // if (tipo.value=="Labores") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Método de pago") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Tipo de pago") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Unidad de medida") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Eps") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Tipo de documento") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Lotes") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Etapas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Fincas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Empaques") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Soporte") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }if (tipo.value=="Personas") {
      //     downloadPdfPersonas()
      // }
  // }





</script>

<style>

#titulo{
  font-family:'Times New Roman', Times, serif;
  font-size: 30px;

}
#input2{
margin-bottom: 10px;
height: 20px;
margin-right: 30px;

}
@media (max-width: 1300px){
.q-btn {
  font-size: 10px;
}
}

</style>