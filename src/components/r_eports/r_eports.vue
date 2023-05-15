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
            <div class="col-1"></div>
            <div class="col-2 text-center  q-mt-xl ">
               
            </div>
            <div class="col-2"></div>
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
                  <q-input filled type="date"  label="Fecha"></q-input><br>
                  <q-select filled v-model="tipo" :options="options2" label="Escoja" />
                  <div>
                    <br />
                    <q-btn  label="Descargar pdf" class="text-white bg-green-10"  />
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
                    <q-btn  label="Descargar pdf" class="text-white bg-green-10"  />
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
                    <q-btn  label="Descargar pdf" class="text-white bg-green-10"  />
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
                    <q-btn  label="Descargar pdf" class="text-white bg-green-10"  />
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
import {ref} from "vue"
import jsPDF from 'jspdf';

let abrirDescargar=ref(false)
let abrirDescargar3=ref(false)
let abrirDescargar4=ref(false)
let abrirDescargar5=ref(false)
let abrirDescargar6=ref(false)


let TipoModulo=ref("null")
let tipo=ref(null)




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


 function validarNumeros() {
      copiNumeros.value = numeros.value.filter((x) => x.state === '1')
    }

function downloadPdfPersonas() {
      validarNumeros()
      pdf.value = new jsPDF();
      pdf.value.setFont("helvetica", "bold");
      pdf.value.setFontSize(16);

      pdf.value.text("Reporte", 20, 20); // agrega un título al archivo PDF

      pdf.value.setFont("helvetica", "normal");
      pdf.value.setFontSize(12);

      var columns = ["N° Balota", "Nombre", "Celular", "Direccion", "Estado", "Metodo de pago"];
      var rows = [];

      for (i in copiNumeros.value) {
        console.log(i);
        rows.push([copiNumeros.value[i].Id, copiNumeros.value[i].nombreComprador, copiNumeros.value[i].celularComprador, copiNumeros.value[i].direccionComprador, copiNumeros.value[i].estado, copiNumeros.value[i].Tipodepago]);
      }
      pdf.value.autoTable({
        head: [columns],
        body: rows,
        startY: 20,// posición Y donde se iniciará la tabla

      });
      pdf.value.save("Reporte.pdf");
    }


    function descargarPdf() {
        if (options2.value=="Personas") {
            downloadPdfPersonas()
        }
        // if (options2.value=="Labores") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Método de pago") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }if (options2.value=="Personas") {
        //     downloadPdfPersonas()
        // }
    }

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


</style>