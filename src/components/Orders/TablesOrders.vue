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


            <div class="q-pa-md">
    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="[
        
      ]"
    />

    <q-table
      flat bordered
      :rows="rows"
      :columns="columns"
      :footer="footer"
      row-key="name"
      :separator="separator"
    />
  </div>

        </div>

        <div 
        class="col-1">
        </div>
    </div>


   <!-- modal crear  -->
  
   <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10 ">
                <!-- <q-table style="height: 400px" flat bordered  :rows="rows" :columns="columns" row-key="index"
                    virtual-scroll v-model:pagination = "pagination"  :rows-per-page-options="[0]" /> -->
            </div>
            <div class="col-1"></div>
        </div> 

        <q-dialog v-model="abrirCrear">
            <q-card >
              <q-card-section class="bg-green-10">
                <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
                  DILIGENCIA LA INFORMACIÓN
                </h5>
              </q-card-section>
              <div class="q-pa-md " >
                <div>

                <div style="display: flex;">

                <div id="inputs">
                  <q-input  filled type="number" v-model="document" label="Digite el numero de documento"></q-input>
                  <q-input  filled type="text" v-model="document" label="Nombre"></q-input>
                  <q-input filled type="text" v-model="rol" label="Telefono"></q-input>
                  <q-input  filled type="text" v-model="concept" label="Dirección"></q-input>
                  <q-select filled v-model="TipoPanela" :options="options" label="Escoga el tipo de panela" />
                </div>

                <div id="inputs">
                  <q-select filled v-model="FormaPanela" :options="options2" label="Escoga la forma de la panela" />
                  <q-input  filled type="number" v-model="total" label="Cantidad"></q-input>
                  <q-select filled v-model="TipoEmpaque" :options="options3" label="Escoga el tipo de empaque" />
                  <q-input  filled type="text" v-model="total" label="Comprobante"></q-input>
                  <q-input  filled type="text" v-model="total" label="Abono"></q-input>
                </div>

                </div>

                  <div>
                    <br />
                    <q-btn  label="guardar" class="text-white bg-green-10"  />
                    <q-btn class="q-ml-md" label="cerrar" v-close-popup />
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>
   

    




</div>
</template>


<script setup>
import { ref } from "vue";

let abrirCrear=ref(false)

let TipoPanela=ref(null)
let FormaPanela=ref(null)
let TipoEmpaque=ref(null)

      let options= [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]

      let options2= [
        'Google', 'Facebook', 'casa', 'Apple', 'Oracle'
      ]   
      
      let options3= [
        'agua', 'Facebook', 'casa', 'Apple', 'Oracle'
      ] 



let columns = ref([
  {
    name: 'name',
    label: 'Names',
    align: 'left',
    field: row => row.name,
    
    
  },
  { name:'calories', align:'center', label: 'Calories', field: 'calories' },
  { name:'fat', align:'center', label: 'Fat (g)', field: 'fat' },
  { name:'carbs', align:'center', label: 'Carbs (g)', field: 'carbs' },
  { name:'protein', align:'center', label: 'Protein (g)', field: 'protein' },
  { name:'sodium', align:'center', label: 'Sodium (mg)', field: 'sodium' },
  { name:'calcium', align:'center', label: 'Calcium (%)', field: 'calcium' },
  { name:'iron', align:'center', label: 'Iron (%)', field: 'iron' }
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
 
])


</script>

<style>

#table{
  margin-left: 50px;
}
#butonAdd{
  border-radius: 10px ;
  float: right;
  margin-left: 20px;
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
  
}



</style>