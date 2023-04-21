import Login from "../src/components/Login.vue"
// import Register from "../src/components/Register.vue"
// import Card from "../src/components/Card.vue"
import Home from "../src/components/Home.vue"
import pedidos from "../src/components/orders/pedidos.vue"
import pedidosDos from "../src/components/orders/pedidos2.vue"
import HomeCosts from "../src/components/Costs/HomeCosts.vue"


export const routes=[
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/pedidos", component:pedidos},
    {path:"/pedidosDos", component:pedidosDos},
    {path:"/HomeCostos", component: HomeCosts}
]