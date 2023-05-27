
//INITIAL
import Login from '../src/components/Login.vue'
import Home from '../src/components/Home.vue'
//ORDERS
import orders from '../src/components/orders/Orders.vue'

import tablesOrders from '../src/components/orders/TablesOrders.vue'
//COSTS
import homeCosts from '../src/components/Costs/HomeCosts.vue'
import pays from '../src/components/Costs/Pays.vue'
import mounthlyExpenses from '../src/components/Costs/MonthlyExpenses.vue'
import occasionalExpenses from '../src/components/Costs/OccasionalExpenses.vue'
//MAINTENANCE
import users from '../src/components/Maintenance/CreateUsers.vue'
import typeDocument from '../src/components/Maintenance/TypeDocument.vue'
import eps from '../src/components/Maintenance/Eps.vue'
import farmRegistry from '../src/components/Maintenance/FarmRegistry.vue'
import homeMaintenance from '../src/components/Maintenance/HomeMaintenance.vue'
import labors from '../src/components/Maintenance/TypeWork.vue'
import lots from '../src/components/Maintenance/Lots.vue'
import measurementUnits from '../src/components/Maintenance/MeasurementUnits.vue'
import paymentMethod from '../src/components/Maintenance/PaymentMethod.vue'
import paymentType from '../src/components/Maintenance/TypePay.vue'
import stages from '../src/components/Maintenance/Stages.vue'
import TypePanela from '../src/components/Maintenance/TypePanela.vue'
import typePackaging from '../src/components/Maintenance/TypePackaging.vue'
// reports
import report from '../src/components/Reports/Reports.vue'
// inventory
import Inventory from '../src/components/Inventory/homeInventory.vue'

import vault from '../src/components/Inventory/vault.vue'
import brands from '../src/components/Inventory/brands.vue'
import category from '../src/components/Inventory/category.vue'
import product from '../src/components/Inventory/product.vue'


//TRANSFORMATION
import HomeTranformation from '../src/components/Transformation/HomeTransformation.vue'
import DailyProcess from '../src/components/Transformation/DailyProcess.vue'
import TransformedRawMaterial from '../src/components/Transformation/TransformedRawMaterial.vue'
import Packed from '../src/components/Transformation/Packed.vue'



export const routes=[
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/procesoDiario", component:DailyProcess},
    {path:"/homePedidos", component:orders},
    {path:"/homeInventory", component:Inventory}, 
    {path:"/vault", component:vault},
    {path:"/brands", component:brands},
    {path:"/category", component:category},
    {path:"/product", component:product },
    {path:"/pedidosDos", component:tablesOrders},
    {path:"/homeCostos", component: homeCosts},
    {path:"/usuarios", component:users},
    {path:"/tipoDocumento", component:typeDocument},
    {path:"/eps", component:eps},
    {path: "/fincas", component: farmRegistry},
    {path:"/homeMantenimiento", component: homeMaintenance},
    {path:"/labores", component: labors},
    {path: "/lotes", component:lots},
    {path: "/unidadesMedida", component:measurementUnits},
    {path: "/metodosPago", component:paymentMethod},
    {path: "/tiposPago", component:paymentType},
    {path:"/pagos", component: pays},
    {path:"/gastosMensuales", component: mounthlyExpenses},
    {path:"/gastosOcasionales", component: occasionalExpenses},
    {path: "/etapas", component: stages},
    {path: "/tipoPanela", component: TypePanela},
    {path: "/tipoEmpaques", component: typePackaging},
    {path: "/reports", component: report},
    {path: "/homeTransformacion", component: HomeTranformation},
    {path: "/procesoDiario", component: DailyProcess},
    {path: "/materiaTransformada", component:TransformedRawMaterial},
    {path: "/empacado", component: Packed},
]