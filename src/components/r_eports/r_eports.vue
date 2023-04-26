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
                         <q-btn flat class="text-subtitle1" @click="abrirDescargar=true">Costos </q-btn>
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
                        <q-btn flat class="text-subtitle1" @click="abrirDescargar=true">Pedidos </q-btn>
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
                      <q-btn flat class="text-subtitle1 text-dark" @click="abrirDescargar=true">Trasformación</q-btn>
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
                         <q-btn flat class="text-subtitle1" @click="abrirDescargar=true">Inventario </q-btn>
                    </q-card-actions>
              
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2 text-center  q-mt-xl ">
               
            </div>
            <div class="col-2"></div>
        </div>

<!-- modal descargar  -->
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
                  <q-select filled @click="cambiarOptions()" v-model="TipoModulo" :options="options" label="Escoja el Modulo" />
                  <q-input filled type="date"  label="Fecha"></q-input>
                  <q-select filled v-model="tipo" :options="options2" label="Escoja" />
                  <div>
                    <br />
                    <q-btn @click="cambiarOptions()" label="Descargar pdf" class="text-white bg-green-10"  />
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

let abrirDescargar=ref(false)

let TipoModulo=ref("null")
let tipo=ref(null)

let options= ref([
        'Mantenimiento', 'Costos', 'Pedidos', 'Trasnformación', 'Inventario'
      ])


let options2= ref([
        'Google', 'Facebook', 'casa', 'Apple', 'Oracle'
      ]   )
      
function cambiarOptions(){
    console.log(TipoModulo.value); 
    console.log(options2.value); 

    if (TipoModulo.value=="Mantenimiento") {
        options2.value= ['Persona', 'Tipo de documento', 'Eps', 'Granjas', 'Trabajos', 'lotes', 'Trabajos', 'Unidad de medida', 'Metodo de pago', 'Tipo de pago' , 
        'Etapas', 'Support', 'Tipo empaque']
        
    }
    else(
        options2.value= ['Google', 'Facebook', 'casa', 'Apple', 'Oracle']
    )
}

</script>

<style>

#titulo{
    font-family:'Times New Roman', Times, serif;
    font-size: 30px;

}

</style>