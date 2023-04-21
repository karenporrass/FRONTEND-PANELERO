import Login from "../src/components/Login.vue"
import Home from "../src/components/Home.vue"
import homeCosts from "../src/components/Costs/HomeCosts.vue"



export const routes=[
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/homeCosts", component:homeCosts}
]