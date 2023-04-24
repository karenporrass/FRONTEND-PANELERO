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
import people from '../src/components/Maintenance/People.vue'
import farmRegistry from '../src/components/Maintenance/FarmRegistry.vue'
import stages from '../src/components/Maintenance/Stages.vue'
import support from '../src/components/Maintenance/Support.vue'
import typePackaging from '../src/components/Maintenance/TypePackaging.vue'
import lots from '../src/components/Maintenance/Lots.vue'

export const routes=[
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/homePedidos", component:orders},
    {path:"/pedidosDos", component:tablesOrders},
    {path:"/homeCostos", component: homeCosts},
    {path:"/pagos", component: pays},
    {path:"/gastosMensuales", component: mounthlyExpenses},
    {path:"/gastosOcasionales", component: occasionalExpenses},
    {path:"/personas", component:people},
    {path: "/registroFincas", component: farmRegistry},
    {path: "/etapas", component: stages},
    {path: "/soporte", component: support},
    {path: "/tipoEmpaques", component: typePackaging},
    {path: "/lotes", component:lots}
]