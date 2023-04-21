import Login from "../src/components/Login.vue"
// import Register from "../src/components/Register.vue"
// import Card from "../src/components/Card.vue"
import Home from "../src/components/Home.vue"
import orders from "../src/components/orders/Orders.vue"
import tablesOrders from "../src/components/orders/TablesOrders.vue"
import HomeCosts from "../src/components/Costs/HomeCosts.vue"


export const routes=[
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/pedidos", component:orders},
    {path:"/pedidosDos", component:tablesOrders},
    {path:"/HomeCostos", component: HomeCosts}
]