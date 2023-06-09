<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10  text-center">
        <div class="text-weight-bolder text-h4">EMPAQUETADO</div>
      </div>
      <div class="col-1"></div>
    </div>
    <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />
    <div class="row ">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-btn class="bg-green-10 text-white" @click="prompt = true, cleanForm()"><span class="material-symbols-outlined q-mr-sm"
            style="font-size: 20px;">
            add_circle
          </span> Crear nuevo empaque</q-btn>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- TABLE INFO -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 ">
        <q-table style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index">
          <template v-slot:body-cell-options="props">
            <q-td :props="props">
              <div>
                <q-btn round icon="edit" class="q-mx-md" size="xs" color="green-10" @click="
                  (index = props.row._id), showInfo(props.row), (edit = true)
                  "></q-btn>
                <q-btn v-if="props.row.state == 0" round size="xs" color="green-10"
                  @click="activarDesactivar(props.row)"><span class="material-symbols-outlined" style="font-size: 18px">
                    check
                  </span></q-btn>
                <q-btn v-else round size="xs" color="red" @click="activarDesactivar(props.row)"><span
                    class="material-symbols-outlined" style="font-size: 18px">
                    close
                  </span></q-btn>
              </div>
            </q-td>
          </template>

        </q-table>
      </div>
      <div class="col-1"></div>
    </div>

    <q-dialog v-model="prompt">
      <q-card>
        <q-card-section class="bg-green-9 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="postPacked()">
            <div>
              <q-select filled v-model="cellar" :options="optionsColorPanela" label="Seleccione la bodega" lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null || val !== '' || val !== undefined) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="colorPanela" :options="optionsColorPanela" label="Seleccione el color de la panela" lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null || val !== '' || val !== undefined) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="formPanela" :options="optionsFormPanela" label="Seleccione la forma de la panela" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null || val !== '' || val !== undefined) || 'El campo es requerido',
              ]" />
              
              <q-select filled v-model="typePacking" :options="optionsPacking" label="Seleccione el empaque" :rules="[
                (val) =>
                ((val) => val !== null && val !== '' && val !== undefined) || 'El campo es requerido',
              ]"/>
              
              <q-input v-model="totalPanelas" filled type="number" label="Digite la cantidad total de las panelas" :rules="[
                (val) =>
                ((val) => val !== null && val !== '') || 'El campo es requerido',
                ((val) => val > 0) || 'El campo debe ser mayor a 0',
              ]"/>

              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-10 text-white"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                    cancel </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>


    <q-dialog v-model="edit">
      <q-card>
        <q-card-section class="bg-green-9 q-px-lg">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            MODIFICA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="putPacked()">
            <div>
              <q-select filled v-model="cellar" :options="optionsCellar" label="Seleccione la bodega" lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null || val !== '' || val !== undefined) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="colorPanela" :options="optionsColorPanela" label="Seleccione el color de la panela" lazy-rules :rules="[
                  (val) =>
                    ((val) => val !== null || val !== '' || val !== undefined) ||
                    'El campo es requerido',
                ]" />

              <q-select filled v-model="formPanela" :options="optionsFormPanela" label="Seleccione la forma de la panela" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null || val !== '' || val !== undefined) || 'El campo es requerido',
              ]" />
              
              <q-select filled v-model="typePacking" :options="optionsPacking" label="Seleccione el empaque" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null || val !== '' || val !== undefined) || 'El campo es requerido',
              ]"/>
              
              <q-input v-model="totalPanelas" filled type="number" label="Digite la cantidad total de las panelas" lazy-rules :rules="[
                (val) =>
                ((val) => val !== null && val !== '') || 'El campo es requerido',
                ((val) => val > 0) || 'El campo debe ser mayor a 0',
              ]"/>


              <div class="justify-center flex">
                <q-btn icon="save_as" label="GUARDAR" type="submit" class="q-mt-md q-mb-sm q-mx-sm save_as bg-green-10 text-white"></q-btn>
                <q-btn type="button" class="q-mt-md q-mb-sm q-mx-sm" to="" v-close-popup><span
                    class="material-symbols-outlined q-mr-sm" style="font-size: 23px">
                    cancel </span>CERRAR</q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue"
import { usePackedStore } from "../../store/Transformation/Packed.js"

const usePacked= usePackedStore()

let prompt = ref(false)
let edit= ref(false)
let index= ref()
let totalPanelas = ref();
let cellar = ref([]);
let typePacking = ref([]);
let colorPanela = ref([]);
let formPanela = ref([]);
let optionsColorPanela = ref([
{ label: "Morena", value: "Morena" },
{ label: "Blanca", value: "Blanca" },
{ label: "Intermedia", value: "Intermedia" },
])
let optionsCellar = ref([]);
let optionsPacking = ref([]);
let optionsFormPanela = ref([])


let columns = ref([
  { 
    name: 'index', 
  label: 'N°', 
  field: 'index', 
  align: 'center' 
}
  ,
  { 
    name: 'cellar', 
  label: 'BODEGA', 
  field: 'cellar', 
  align: 'center' 
},
  { 
    name: 'colorPanela', 
  label: 'TIPO DE PANELA', 
  field: 'colorPanela', 
  align: 'center' 
},
  { 
    name: 'formPanela', 
  label: 'FORMA DE LA PANELA', 
  field: (row) => row.formPanela.name,
  align: 'center' 
},
  { 
    name: 'typePacking', 
  label: 'TIPO DE EMPAQUE', 
  field: (row) => row.typePacking.name, 
  align: 'center' 
},
  { 
    name: 'totalPanelas', 
  label: 'TOTAL DE PANELAS', 
  field: 'totalPanelas', 
  align: 'center' 
},
  {
    name: "status",
    label: "ESTADO",
    field: (row) => row.state == 1 ? 'Activo' : 'Inactivo',
    align: "center",
  },

  { 
    name: 'options', 
    align: 'center', 
    label: 'OPCIONES', 
    align: 'center' 
  },


])

let rows = ref([])

// get registros empaques
async function getPacked() {
  const res = await usePacked.listPacked()
  console.log(res);
  if (res.status < 299) {
    rows.value = res.data
    rows.value.forEach((row, index) => {
      row.index = index + 1
    })
  } else {
    console.log(res)
  }
}


onMounted(
  () => {
  getPacked()
  getFormPanela()
  getPackaingPanela() 
})

//post empaques
async function postPacked() {
  console.log("hola post");
  const res = await usePacked.postPacked({
    cellar: cellar.value, 
    colorPanela: colorPanela.value.value,
    formPanela: formPanela.value.value,
    typePacking: typePacking.value.value,
    totalPanelas: totalPanelas.value,
  });
  console.log(res);
  prompt.value = false;
  getPacked()
}


// activar y desactivar empaques 
async function activarDesactivar(data) {
  console.log(data);
  let res = ""
  if (data.state == 1) {
    res = await usePacked.active(data._id, 0)
    console.log(res);
    getPacked()
  } else {
    res = await usePacked.active(data._id, 1)
    console.log(res);
    getPacked()
  }
}



async function showInfo(data) {
  cellar.value = data.cellar;
  colorPanela.value = data.colorPanela;
  formPanela.value = {
    label: data.formPanela.name,
    value: data.formPanela._id
  };
  totalPanelas.value = data.totalPanelas;
  typePacking.value = {
    label: data.typePacking.name,
    value: data.typePacking._id
  };
  console.log(date.value);
} 

async function putPacked(){
  const res= await usePacked.updatePacked(index.value, {    
    cellar: cellar.value, 
    colorPanela: colorPanela.value.value,
    formPanela: formPanela.value.value,
    typePacking: typePacking.value.value,
    totalPanelas: totalPanelas.value, 
  });
  console.log(res);
  getPacked()
  edit.value = false;
}


async function getFormPanela() {
  const res = await usePacked.listPanelaActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
    for (let i in res.data) {
      console.log(i);
      let object = { label: res.data[i].name, value: res.data[i]._id };
      optionsFormPanela.value.push(object);

      console.log(optionsFormPanela.value);
    }
    return optionsFormPanela.value
  } else {
    throw new Error ("Error al obtener los datos del tipo de panela")
  }
}



async function getPackaingPanela() {
  const res = await usePacked.listPackagingActive();
  console.log(res);
  if (res.status < 299) {
    console.log("holis");
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

function cleanForm(){
  cellar.value = null,
  colorPanela.value= null,
  formPanela.value= null,
  typePacking.value= null,
  totalPanelas.value = ""
}


</script>


