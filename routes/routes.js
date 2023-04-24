import Login from "../src/components/Login.vue"
import Home from "../src/components/Home.vue"
import orders from "../src/components/orders/Orders.vue"
import tablesOrders from "../src/components/orders/TablesOrders.vue"
import homeCosts from "../src/components/Costs/HomeCosts.vue"
import pays from "../src/components/Costs/Pays.vue"
import mounthlyExpenses from "../src/components/Costs/MonthlyExpenses.vue"
import occasionalExpenses from "../src/components/Costs/OccasionalExpenses.vue"

export const routes=[
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/homePedidos", component:orders},
    {path:"/pedidosDos", component:tablesOrders},
    {path:"/homeCostos", component: homeCosts},
    {path:"/pagos", component: pays},
    {path:"/gastosMensuales", component: mounthlyExpenses},
    {path:"/gastosOcasionales", component: occasionalExpenses }
    

]