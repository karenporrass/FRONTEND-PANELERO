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

import { LoginStore } from "../src/store/Login/login.js";

const checkAuth = () => {
  const userStore = LoginStore();
  const token = userStore.token;

  if (userStore.dateLogin == "" || userStore.dateLogin == undefined)
    return false;
  const dateLogin = userStore.dateLogin.split("T")[0];
  const dateNow = new Date().toISOString().split("T")[0];

  if (dateLogin !== dateNow || !token) return false;
  return true;
};

const auth = (to, from, next) => {
  if (checkAuth()) {
    const userStore = LoginStore();
    const userRole = userStore.rol;

    if (!to.meta.rol.includes(userRole)) {
      userStore.logoutUser();
      return next({ name: "login" });
    }
    next();
  } else {
    next({ name: "login" });
  }
};

export const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (checkAuth()) {
        next({ name: "home" });
      } else {
        next();
      }
    },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/procesoDiario",
    name: "procesoDiario",
    component: DailyProcess,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/homePedidos",
    name: "homePedidos",
    component: orders,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/homeInventory",
    name: "homeInventory",
    component: Inventory,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/vault",
    name: "vault",
    component: vault,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/brands",
    name: "brands",
    component: brands,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/category",
    name: "category",
    component: category,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/product",
    name: "product",
    component: product,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/pedidosDos",
    name: "pedidosDos",
    component: tablesOrders,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/factura",
    name: "factura",
    component: Factura,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,

  },
  {
    path: "/homeCostos",
    name: "homeCostos",
    component: homeCosts,
    meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: users,
    meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/tipoDocumento",
    name: "tipoDocumento",
    component: typeDocument,
    meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/eps",
    name: "eps",
    component: eps,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/fincas",
    name: "fincas",
    component: farmRegistry,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/homeMantenimiento",
    name: "homeMantenimiento",
    component: homeMaintenance,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  { 
    path: "/labores", 
    name: "labores", 
    component: labors,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
  },
  {
    path: "/lotes",
    name: "lotes",
    component: lots,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/unidadesMedida",
    name: "unidadesMedida",
    component: measurementUnits,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  { 
    path: "/metodosPago", 
    name: "metodosPago", 
    component: paymentMethod,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
  },
  { 
    path: "/tiposPago", 
    name: "tiposPago", 
    component: paymentType,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
  },
  { 
    path: "/pagos", 
    name: "pagos", 
    component: pays,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
  },
  {
    path: "/gastosMensuales",
    name: "gastosMensuales",
    component: mounthlyExpenses,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  {
    path: "/gastosOcasionales",
    name: "gastosOcasionales",
    component: occasionalExpenses,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth,
  },
  { 
    path: "/etapas", 
    name: "etapas", 
    component: stages,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
},
  { 
    path: "/tipoPanela",
    name: "tipoPanela", 
    component: TypePanela,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
},
  { 
    path: "/tipoEmpaques", 
    name: "tipoEmpaques", 
    component: typePackaging,
        meta: {
      rol: ["Administrador", "SUPER"],
    },
    beforeEnter: auth, 
},
  { 
    path: "/reports", 
    name: "reportes", 
    component: report,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth, 
},
  {
    path: "/homeTransformacion",
    name: "homeTransformacion",
    component: HomeTranformation,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  { 
    path: "/procesoDiario", 
    name: "procesoDiario", 
    component: DailyProcess,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth, 
  },
  {
    path: "/materiaTransformada",
    name: "materiaTransformada",
    component: TransformedRawMaterial,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth,
  },
  { 
    path: "/empacado", 
    name: "empacado", 
    component: Packed,
    meta: {
      rol: ["Administrador", "Trabajador", "SUPER"],
    },
    beforeEnter: auth, 
  },
];
