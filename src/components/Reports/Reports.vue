<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <div class="text-weight-bolder text-h4">REPORTES</div>
      </div>
      <div class="col-1"></div>
    </div>
    <q-separator
      inset
      class="q-mt-md bg-green-10"
      style="height: 2px; margin-left: 100px; margin-right: 100px"
    />

    <div class="row q-mt-xl">
      <div class="col-2"></div>
      <div class="col-2 q-mt-xl">
        <q-card
          class="my-card shadow-8"
          style="border: solid; border-color: darkgreen; border-radius: 15px"
        >
          <q-card-section>
            <div class="text-center">
              <i class="fa-solid fa-sliders" style="font-size: 50px"></i>
            </div>
          </q-card-section>
          <q-separator class="bg-green-10" />
          <q-card-actions vertical align="center">
            <q-btn
              flat
              class="text-subtitle1 text-dark"
              @click="abrirDescargar = true"
              >Mantenimiento</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-1"></div>

      <div class="col-2 text-center q-mt-xl">
        <q-card
          class="my-card shadow-8"
          style="border: solid; border-color: darkgreen; border-radius: 15px"
        >
          <q-card-section>
            <div class="text-center">
              <i class="fa-solid fa-coins" style="font-size: 50px"></i>
            </div>
          </q-card-section>
          <q-separator class="bg-green-10" />

          <q-card-actions vertical align="center" class="q-pt-none">
            <q-btn flat class="text-subtitle1" @click="abrirDescargar3 = true"
              >Costos
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-1"></div>
      <div class="col-2 text-center q-mt-xl">
        <q-card
          class="my-card shadow-8"
          style="border: solid; border-color: darkgreen; border-radius: 15px"
        >
          <q-card-section>
            <div class="text-center">
              <i class="fa-solid fa-cart-shopping" style="font-size: 50px"></i>
            </div>
          </q-card-section>
          <q-separator class="bg-green-10" />

          <q-card-actions vertical align="center">
            <q-btn flat class="text-subtitle1" @click="abrirDescargar4 = true"
              >Pedidos
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3"></div>
      <div class="col-2 q-mt-xl">
        <q-card
          class="my-card shadow-8"
          style="border: solid; border-color: darkgreen; border-radius: 15px"
        >
          <q-card-section>
            <div class="text-center">
              <i class="fa-solid fa-arrows-spin" style="font-size: 50px"></i>
            </div>
          </q-card-section>
          <q-separator class="bg-green-10" />
          <q-card-actions vertical align="center">
            <q-btn
              flat
              class="text-subtitle1 text-dark"
              @click="abrirDescargar5 = true"
              >Trasformación</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-1"></div>

      <div class="col-2 text-center q-mt-xl">
        <q-card
          class="my-card shadow-8"
          style="border: solid; border-color: darkgreen; border-radius: 15px"
        >
          <q-card-section>
            <div class="text-center">
              <i class="fa-solid fa-clipboard-list" style="font-size: 50px"></i>
            </div>
          </q-card-section>
          <q-separator class="bg-green-10" />

          <q-card-actions vertical align="center">
            <q-btn flat class="text-subtitle1" @click="abrirDescargar6 = true"
              >Inventario
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- modal descargar mantenimiento -->
    <q-dialog v-model="abrirDescargar">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <q-select
            filled
            v-model="fecha"
            :options="fechas"
            label="Seleccione la fecha"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '' && val !== undefined) ||
                'El campo es requerido',
            ]"
          />

          <q-select
            filled
            v-model="tipo"
            :options="options2"
            label="Escoja"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.trim().length > 0) || 'El campo es requerido',
              /* val => val > 0 && val < 100 || 'Please type a real age' */
            ]"
          />

          <q-btn
            @click="validate()"
            label="Descargar pdf"
            class="text-white bg-green-10"
          >
          </q-btn>
          <q-btn class="q-ml-md" label="cerrar" v-close-popup />
        </div>
      </q-card>
    </q-dialog>

    <!-- modal costos  -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
      </div>
      <div class="col-1"></div>
    </div>

    <q-dialog v-model="abrirDescargar3">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <div>
            <q-select
              filled
              v-model="fecha"
              :options="fechas"
              label="Seleccione la fecha"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '' && val !== undefined) ||
                  'El campo es requerido',
              ]"
            />
            <q-select
              filled
              v-model="tipo"
              :options="options3"
              label="Escoja"
            />
            <div>
              <br />
              <q-btn
                @click="validate()"
                label="Descargar pdf"
                class="text-white bg-green-10"
              >
              </q-btn>
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- modal pedidos  -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">

      </div>
      <div class="col-1"></div>
    </div>

    <q-dialog v-model="abrirDescargar4">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <div>
            <q-select
              filled
              v-model="fecha"
              :options="fechas"
              label="Seleccione la fecha"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '' && val !== undefined) ||
                  'El campo es requerido',
              ]"
            />

            <q-select
              filled
              v-model="tipo"
              :options="options4"
              label="Escoja"
            />
            <div>
              <br />
              <q-btn
                @click="validate()"
                label="Descargar pdf"
                class="text-white bg-green-10"
              >
              </q-btn>
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- modal trasformacion  -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
      </div>
      <div class="col-1"></div>
    </div>

    <q-dialog v-model="abrirDescargar5">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <div>
            <q-select
              filled
              v-model="fecha"
              :options="fechas"
              label="Seleccione la fecha"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '' && val !== undefined) ||
                  'El campo es requerido',
              ]"
            />
            <q-select
              filled
              v-model="tipo"
              :options="options5"
              label="Escoja"
            />
            <div>
              <br />
              <q-btn
                @click="validate()"
                label="Descargar pdf"
                class="text-white bg-green-10"
              >
              </q-btn>
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- modal Inventario  -->
    <div class="row q-mt-md">
      <div class="col-1"></div>
      <div class="col-10">
      </div>
      <div class="col-1"></div>
    </div>

    <q-dialog v-model="abrirDescargar6">
      <q-card>
        <q-card-section class="bg-green-10">
          <h5 class="q-mt-sm q-mb-sm text-white text-center text-weight-bold">
            DILIGENCIA LA INFORMACIÓN
          </h5>
        </q-card-section>
        <div class="q-pa-md">
          <div>
            <q-select
              filled
              v-model="fecha"
              :options="fechas"
              label="Seleccione la fecha"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '' && val !== undefined) ||
                  'El campo es requerido',
              ]"
            />
            <q-select
              filled
              v-model="tipo"
              :options="options6"
              label="Escoja"
            />
            <div>
              <br />
              <q-btn
                @click="validate()"
                label="Descargar pdf"
                class="text-white bg-green-10"
              >
              </q-btn>
              <q-btn class="q-ml-md" label="cerrar" v-close-popup />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import jsPDF from "jspdf";
import "jspdf-autotable";

// matenimiento
import { usersStore } from "../../store/Maintenance/CreateUsers.js";
import { workStore } from "../../store/Maintenance/TypeWork.js";
import { paymentStore } from "../../store/Maintenance/PaymentMethod.js";
import { typePayStore } from "../../store/Maintenance/TypePay.js";
import { unitsStore } from "../../store/Maintenance/MeasurementUnits.js";
import { epsStore } from "../../store/Maintenance/Eps.js";
import { documentStore } from "../../store/Maintenance/TypeDocument.js";
import { lotsStore } from "../../store/Maintenance/Lots.js";
import { stagesStore } from "../../store/Maintenance/Stages.js";
import { farmRegistryStore } from "../../store/Maintenance/FarmRegistry.js";
import { packagingStore } from "../../store/Maintenance/TypePackaging.js";
import { panelaStore } from "../../store/Maintenance/TypePanela.js";

// costos
import { monthlyStore } from "../../store/Costs/MonthlyExpenses.js";
import { OccasionalStore } from "../../store/Costs/OccasionalExpenses.js";
import { payStore } from "../../store/Costs/Pays.js";

// mantenimiento
import { useDailyStore } from "../../store/Transformation/dailyProcess.js";
import { storeTransformed } from "../../store/Transformation/TransformedRawMaterial.js";
import { usePackedStore } from "../../store/Transformation/Packed.js";

// inventario
import { BrandsStore } from "../../store/Inventory/Brands.js";
import { CategoryStore } from "../../store/Inventory/category.js";
import { productStore } from "../../store/Inventory/Product.js";
import { vaultStore } from "../../store/Inventory/vault.js";

import { onBeforeMount, ref } from "vue";

// matenimiento
const useUsers = usersStore();
const useTypeWork = workStore();
const paymentStores = paymentStore();
const useTypePay = typePayStore();
const unitStore = unitsStore();
const epsStores = epsStore();
const documentsStores = documentStore();
const lotsStores = lotsStore();
const stageStore = stagesStore();
const farmStore = farmRegistryStore();
const usePackaging = packagingStore();
const panelasStore = panelaStore();

// costos
const MonthlyStore = monthlyStore();
const occasionalStore = OccasionalStore();
const PayStore = payStore();

// transformación
const transforStore = useDailyStore();
const useMaterial = storeTransformed();
const usePacked = usePackedStore();

// inventario
const useBrands = BrandsStore();
const useCategory = CategoryStore();
const useProducts = productStore();
const useVault = vaultStore();

let abrirDescargar = ref(false);
let abrirDescargar3 = ref(false);
let abrirDescargar4 = ref(false);
let abrirDescargar5 = ref(false);
let abrirDescargar6 = ref(false);
let pdf = ref();
let res = "";
let tipo = ref(null);
let fecha = ref();
let now = "";

var columns = "";
var rows = [];

let fechas = ref([
  { label: "Enero", value: "01" },
  { label: "Febrero", value: "02" },
  { label: "Marzo", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Mayo", value: "05" },
  { label: "Junio", value: "06" },
  { label: "Julio", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Septiembre", value: "09" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
]);
let options2 = ref([
  "Personas",
  "Labores",
  "Método de pago",
  "Tipo de pago",
  "Unidad de medida",
  "Eps",
  "Tipo de documento",
  "Lotes",
  "Etapas",
  "Fincas",
  "Empaques",
  "Tipo de panela",
]);

let options3 = ref(["Gastos Ocasionales", "Gastos Mensuales", "Pagos"]);

let options4 = ref(["Pedidos"]);

let options5 = ref([
  "Proceso diario",
  "Materia prima transformada",
  "Empacados",
]);

let options6 = ref(["Marcas", "Categorias", "Productos", "Bodegas"]);

// onBeforeMount(() => {
// useBrands
// });

async function validate() {
  // mantenimiento
  console.log(tipo.value);
  if (tipo.value == "Personas") {
    rows = [];
    columns = [];
    res = await useUsers.listUsers();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].names,
          res.data[i].typeDocument.acronym,
          res.data[i].numberDocument,
          res.data[i].rol,
          res.data[i].cel,
          res.data[i].email,
        ]);
        columns = [
          "NOMBRES",
          "TIPO DE DOCUMENTO",
          "NUMERO DOCUMENTO",
          "ROL",
          "CEL",
          "EMAIL",
        ];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Labores") {
    rows = [];
    columns = [];
    res = await useTypeWork.listWork();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].name,
          res.data[i].area,
          res.data[i].dailyPayment,
        ]);
        columns = ["LABOR", "AREA A EJERCER", "PAGO DIARIO"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Método de pago") {
    res = await paymentStores.listPayments();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name]);
        columns = ["MÉTODO DE PAGO"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Tipo de pago") {
    res = await useTypePay.listTypePay();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name]);
        columns = ["TIPO DE PAGO"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Unidad de medida") {
    res = await unitStore.listUnits();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name, res.data[i].acronym]);
        columns = ["UNIDAD DE MEDIDA", "ACRONIMO"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Eps") {
    res = await epsStores.listEps();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name, res.data[i].attentionLine]);
        columns = ["EPS", "NÚMERO DE ATENCIÓN"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Tipo de documento") {
    res = await documentsStores.listDocuments();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name, res.data[i].acronym]);
        columns = ["TIPO DE DOCUMENTO", "ACRONIMO"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Lotes") {
    res = await lotsStores.listlots();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name, res.data[i].extent, res.data[i].farm]);
        columns = ["NOMBRE DEL LOTE", "EXTENSIÓN", "NOMBRE FINCA"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Etapas") {
    res = await stageStore.listStages();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name, res.data[i].description]);
        columns = ["ETAPA", "DESCRIPCIÓN"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Fincas") {
    res = await farmStore.listFarms();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].name,
          res.data[i].registrationNumber,
          res.data[i].extent,
        ]);
        columns = ["FINCA", "NÚMERO DE MATRICULA", "EXTENSIÓN EN METROS"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Empaques") {
    res = await usePackaging.listPackaging();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].name,
          res.data[i].maxWeigth,
          res.data[i].unitsPerBox,
        ]);
        columns = ["EMPAQUE", "PESO MÁXIMO", "UNIDADES POR CAJA"];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Tipo de panela") {
    res = await panelasStore.listPanela();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name, res.data[i].price]);
        columns = ["TIPO DE PANELA", "PRECIO"];
      } else console.log("no");
    }
    descargarPdf();
  }

  // costos

  if (tipo.value == "Gastos Mensuales") {
    res = await MonthlyStore.listMonthly();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].Name_spent,
          res.data[i].Finca,
          res.data[i].Description,
          res.data[i].PAYMENT_METHOD,
          res.data[i].Total,
        ]);
        columns = [
          "GASTO",
          "FINCA",
          "DESCRIPCIÓN",
          "METODO DE PAGO",
          "VALOR A PAGAR",
        ];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Gastos Ocasionales") {
    res = await occasionalStore.listOccasional();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].Name_spent,
          res.data[i].Finca,
          res.data[i].Description,
          res.data[i].PAYMENT_METHOD,
          res.data[i].Total,
        ]);
        columns = [
          "GASTO",
          "FINCA",
          "DESCRIPCIÓN",
          "METODO DE PAGO",
          "TOTAL A PAGAR",
        ];
      } else console.log("no");
    }
    descargarPdf();
  }

  if (tipo.value == "Pagos Empleados") {
    rows = [];
    columns = [];
    res = await PayStore.listPays();
    console.log(res.data);

    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].name,
          res.data[i].rol,
          res.data[i].CONCEPT,
          res.data[i].PAYMENT_METHOD,
          res.data[i].START_WORK,
          res.data[i].END_WORK,
          res.data[i].total,
        ]);
        columns = [
          "NOMBRE",
          "ROL",
          "CONCEPTO",
          "METODO DE PAGO",
          "FECHA INICIO",
          "FECHA FIN",
          "TOTAL A PAGAR",
        ];
      } else console.log("no");
    }
    descargarPdf();
  } else console.log("no");

  // transformación

  if (tipo.value == "Proceso diario") {
    rows = [];
    columns = [];
    res = await transforStore.listDailyActive();
    console.log(res.data);

    for (let i in res.data.daily) {
      let dates = res.data.daily[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data.daily[i].description,
          res.data.daily[i].farm.name,
          res.data.daily[i].labor.name,
          res.data.daily[i].lot.name,
          res.data.daily[i].people.names,
          res.data.daily[i].stage.name,
        ]);
        columns = [
          "DESCRIPCIÓN",
          "FINCA",
          "LABOR",
          "LOTE",
          "PERSONA ENCARGADA",
          "ETAPA DEL PROCESO",
        ];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }

  if (tipo.value == "Materia prima transformada") {
    rows = [];
    columns = [];
    res = await useMaterial.listTransformed();
    console.log(res.data);
    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].process.description,
          res.data[i].type.name,
          res.data[i].quantity,
          res.data[i].farm.name,
          res.data[i].lot.name,
        ]);
        columns = [
          "PROCESO",
          "TIPO DE UNIDAD DE MEDIDA",
          "CANTIDAD",
          "FINCA",
          "LOTE",
        ];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }

  if (tipo.value == "Empacados") {
    rows = [];
    columns = [];
    res = await usePacked.listPacked();
    console.log(res.data);
    for (let i in res.data) {
      let dates = res.data[i].date;
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].cellarName.content,
          res.data[i].formPanela.name,
          res.data[i].typePacking.name,
          res.data[i].typePanela,
          res.data[i].totalPanelas,
        ]);
        columns = [
          "NOMBRE DE LA BODEGA",
          "FORMA DE LA PANELA",
          "TIPO DE EMPAQUE",
          "TIPO DE PANELA",
          "TOTAL DE PANELAS",
        ];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }

  // inventario

  if (tipo.value == "Marcas") {
    console.log("hola");
    rows = [];
    columns = [];
    res = await useBrands.listPBrands();
    console.log(res);
    console.log(res.data);
    for (let i in res.data) {
      console.log(i);
      let dates = res.data[i].Date;
      console.log(dates);
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].name_brands,
          res.data[i].description,
          res.data[i].creator,
        ]);
        columns = ["NOMBRE DE LA MARCA", "DESCRIPCIÓN", "CREADOR"];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }

  if (tipo.value == "Categorias") {
    console.log("hola");
    rows = [];
    columns = [];
    res = await useCategory.listCategory();
    console.log(res);
    console.log(res.data);
    for (let i in res.data) {
      console.log(i);
      let dates = res.data[i].Date;
      console.log(dates);
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([res.data[i].name_category, res.data[i].description]);
        columns = ["NOMBRE DE LA CATEGORIA", "DESCRIPCIÓN"];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }

  if (tipo.value == "Productos") {
    console.log("hola");
    rows = [];
    columns = [];
    res = await useProducts.listProduct();
    console.log(res);
    console.log(res.data);
    for (let i in res.data) {
      console.log(i);
      let dates = res.data[i].Date;
      console.log(dates);
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].nameProduct,
          res.data[i].Cantidad,
          res.data[i].marca.name_brands,
          res.data[i].categoria.name_category,
          res.data[i].timeUsed,
          res.data[i].timeUseful,
        ]);
        columns = [
          "NOMBRE DEL PRODUCTO",
          "CANTIDAD",
          "NOMBRE DE LA MARCA",
          "NOMBRE DE LA CATEGORIA",
          "TIEMPO DE USO",
          "TIEMPO DE VIDA UTIL",
        ];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }

  if (tipo.value == "Bodegas") {
    console.log("hola");
    rows = [];
    columns = [];
    res = await useVault.listVault();
    console.log(res);
    console.log(res.data);
    for (let i in res.data) {
      console.log(i);
      let dates = res.data[i].Date;
      console.log(dates);
      now = dates.substring(5, 7);
      console.log(now);
      if (now == fecha.value.value) {
        console.log("si");
        rows.push([
          res.data[i].name_cellars,
          res.data[i].content,
          res.data[i].administrator.names,
          res.data[i].extension,
          res.data[i].dirrecion,
        ]);
        columns = [
          "NOMBRE DE LA BODEGA",
          "CONTENIDO",
          "NOMBRE DEL ADMINISTRADOR",
          "EXTENSIÓN DE LA BODEGA",
          "DIRECCIÓN DE LA BODEGA",
        ];
      } else console.log("no");
    }
    descargarPdf();
  } else {
    console.log("no");
  }
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
</script>

<style>
#titulo {
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
}
#input2 {
  margin-bottom: 10px;
  height: 20px;
  margin-right: 30px;
}
@media (max-width: 1300px) {
  .q-btn {
    font-size: 10px;
  }
}
</style>
