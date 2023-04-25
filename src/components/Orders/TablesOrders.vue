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
   <div  class="q-pa-md q-gutter-sm" >
              <q-dialog v-model="abrirCrear" persistent >
                <q-card id="modalCrear" class="card bg-light">
                  <div  class="q-pa-md" style=" margin-left: 15px; color: black">
                    <q-form style="padding: 30px" class="q-gutter-md">
                      <h4>Crear Pedido</h4>



                      <!-- inputs  -->
                      <div style="display: flex;">

                        <div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                    </div>

                      <div>
                        <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      <div style="display: flex;">
                      <p id="pCrear">N° Doc:</p>
                      <q-input filled type="text" label="Premio" v-model="premio" />
                      </div>
                      </div>

                      <!-- termina div de inputs  -->
                    </div>
                    
                    </q-form>
                  </div>
                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Guardar" v-close-popup />
                  </q-card-actions>

                </q-card></q-dialog>
              
    </div>
    




</div>
</template>


<script setup>
import { ref } from "vue";

let abrirCrear=ref(false)

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
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
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

.q-input{
  width: 400px;
  margin-bottom: 20px;
}


</style>