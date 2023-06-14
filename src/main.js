

// import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/line-awesome/line-awesome.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

import 'quasar/src/css/index.sass'



import App from './App.vue'
import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import {createRouter, createWebHashHistory} from 'vue-router'
import {routes} from "../routes/routes.js"
import { createPinia } from "pinia"
const app = createApp(App)

const pinia = createPinia()

app.use(Quasar, {
    plugins: {
        Notify,
    }, 
})

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


app.use(pinia)

app.use(router)
app.mount('#app')