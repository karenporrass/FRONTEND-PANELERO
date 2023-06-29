//INITIAL
import Login from "../src/components/Login.vue";
import Home from "../src/components/Home.vue";
//ORDERS
import orders from "../src/components/orders/Orders.vue";
import Factura from "../src/components/orders/Factura.vue";
import tablesOrders from "../src/components/orders/TablesOrders.vue";
//COSTS
import homeCosts from "../src/components/Costs/HomeCosts.vue";
import pays from "../src/components/Costs/Pays.vue";
import mounthlyExpenses from "../src/components/Costs/MonthlyExpenses.vue";
import occasionalExpenses from "../src/components/Costs/OccasionalExpenses.vue";
//MAINTENANCE
import users from "../src/components/Maintenance/CreateUsers.vue";
import typeDocument from "../src/components/Maintenance/TypeDocument.vue";
import eps from "../src/components/Maintenance/Eps.vue";
import farmRegistry from "../src/components/Maintenance/FarmRegistry.vue";
import homeMaintenance from "../src/components/Maintenance/HomeMaintenance.vue";
import labors from "../src/components/Maintenance/TypeWork.vue";
import lots from "../src/components/Maintenance/Lots.vue";
import measurementUnits from "../src/components/Maintenance/MeasurementUnits.vue";
import paymentMethod from "../src/components/Maintenance/PaymentMethod.vue";
import paymentType from "../src/components/Maintenance/TypePay.vue";
import stages from "../src/components/Maintenance/Stages.vue";
import TypePanela from "../src/components/Maintenance/TypePanela.vue";
import typePackaging from "../src/components/Maintenance/TypePackaging.vue";
// reports
import report from "../src/components/Reports/Reports.vue";
// inventory
import Inventory from "../src/components/Inventory/homeInventory.vue";

import vault from "../src/components/Inventory/vault.vue";
import brands from "../src/components/Inventory/brands.vue";
import category from "../src/components/Inventory/Category.vue";
import product from "../src/components/Inventory/product.vue";

//TRANSFORMATION
import HomeTranformation from "../src/components/Transformation/HomeTransformation.vue";
import DailyProcess from "../src/components/Transformation/DailyProcess.vue";
import TransformedRawMaterial from "../src/components/Transformation/TransformedRawMaterial.vue";
import Packed from "../src/components/Transformation/Packed.vue";

export const routes = [
  { path: "/",name: "login" ,component: Login },
  { path: "/home",name: "home" , component: Home },
  { path: "/procesoDiario",name: "procesoDiario" , component: DailyProcess },
  { path: "/homePedidos",name: "homePedidos" , component: orders },
  { path: "/homeInventory",name: "homeInventory" , component: Inventory },
  { path: "/vault", name: "vault" ,component: vault },
  { path: "/brands",name: "brands" , component: brands },
  { path: "/category",name: "category" , component: category },
  { path: "/product",name: "product" , component: product },
  { path: "/pedidosDos", name: "pedidosDos" ,component: tablesOrders },
  { path: "/factura",name: "factura" , component: Factura },
  { path: "/homeCostos",name: "homeCostos" , component: homeCosts },
  { path: "/usuarios",name: "usuarios" , component: users },
  { path: "/tipoDocumento", name: "tipoDocumento" ,component: typeDocument },
  { path: "/eps",name: "eps" , component: eps },
  { path: "/fincas",name: "fincas" , component: farmRegistry },
  { path: "/homeMantenimiento",name: "homeMantenimiento" , component: homeMaintenance },
  { path: "/labores",name: "labores" , component: labors },
  { path: "/lotes",name: "lotes" , component: lots },
  { path: "/unidadesMedida", name: "unidadesMedida" ,component: measurementUnits },
  { path: "/metodosPago",name: "metodosPago" , component: paymentMethod },
  { path: "/tiposPago",name: "tiposPago" , component: paymentType },
  { path: "/pagos",name: "pagos" , component: pays },
  { path: "/gastosMensuales",name: "gastosMensuales" , component: mounthlyExpenses },
  { path: "/gastosOcasionales",name: "gastosOcasionales" , component: occasionalExpenses },
  { path: "/etapas", name: "etapas" ,component: stages },
  { path: "/tipoPanela", name: "tipoPanela" ,component: TypePanela },
  { path: "/tipoEmpaques",name: "tipoEmpaques" , component: typePackaging },
  { path: "/reports",name: "reportes" , component: report },
  { path: "/homeTransformacion",name: "homeTransformacion" , component: HomeTranformation },
  { path: "/procesoDiario",name: "procesoDiario" , component: DailyProcess },
  { path: "/materiaTransformada",name: "materiaTransformada" , component: TransformedRawMaterial },
  { path: "/empacado", name: "empacado" , component: Packed },
];
