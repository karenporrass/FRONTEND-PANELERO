<template>
  <div>
    <div>
      <q-layout view="hHh lpR fFf" container class="shadow-2 fullscreen">
        <q-header elevated class="bg-green-10">
          <q-toolbar>
            <q-btn flat @click="toggleLeftDrawer" round dense
              icon="menu"><q-toolbar-title>MENU</q-toolbar-title></q-btn>
           
            <q-space></q-space>
            <q-btn flat icon="fa-regular fa-user" class="q-mr-sm" />
            <!-- <router-link to="/" style="text-decoration: none; color: white;"> -->
            <q-btn flat>
             <span class="fa-sharp fa-solid fa-arrow-up-from-bracket fa-rotate-270" style="font-size: 25px;"> 
                
              </span>
            
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="col-6 column items-center">
                    <q-avatar size="72px">
                      <img
                        src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png">
                    </q-avatar>

                    <q-btn color="teal-8" label="Logout" push size="sm" v-close-popup />
                  </div>

                  <div class="col-6">
                    <div class="text-h6 q-mt-sm">Pepita Perez</div>
                    <q-toggle label="Use Mobile Data" />
                    <q-toggle label="Bluetooth" />
                  </div>


                </div>
              </q-menu>
            </q-btn>
            <!-- </router-link> -->


          </q-toolbar>
        </q-header>
        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="c">
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list class="column items-center q-mt-md" >

              <router-link to="/home" style="text-decoration: none;">
                <q-item clickable class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">
                  <q-item-section avatar style="min-width: 1px; ">
                    <i class="fa-solid fa-house-user" style="font-size: 20px; "></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    HOME
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/homeMantenimiento" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px;">

                  <q-item-section avatar style="  min-width: 1px; ">
                    <span class="material-symbols-outlined" style="font-size: 25px;">
                      widgets
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    MANTENIMIENTO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/homeCostos" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px;">



                  <q-item-section avatar style=" min-width: 1px;">
                    <span class="material-symbols-outlined" style="font-size: 28px;">
                      monetization_on
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    COSTOS
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link @click="MenuAPedidos()" to="/homePedidos" style="text-decoration: none; color:white;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px;">
                  <q-item-section avatar style=" min-width: 1px;">
                    <span class="material-symbols-outlined" style="font-size: 25px;">
                      shopping_cart
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    PEDIDOS
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/homeTransformacion" style="text-decoration: none; color:white;">

                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px;">

                  <q-item-section avatar style=" min-width: 1px;">
                    <span class="material-symbols-outlined" style="font-size: 25px;">
                      manage_history
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    TRANSFORMACIÓN
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link @click="MenuInventory()" to="/homeInventory" style="text-decoration: none; color:white;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px;">
                  <q-item-section avatar style=" min-width: 1px;">
                    <span class="material-symbols-outlined" style="font-size: 25px;">
                      inventory
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    INVENTARIO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/reports" style="text-decoration: none; color:white;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px;">
                  <q-item-section avatar style=" min-width: 1px;">

                    <span class="material-symbols-outlined" style="font-size: 25px;">lab_profile</span>

                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    REPORTES
                  </q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-scroll-area>


          <q-img class="absolute-top"
            src="data:image/jpeg;base64,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"
            style="height: 150px">
            <div class="absolute-bottom bg-transparent column items-center">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bolder text-center">Usuario123@gmail.com</div>
              <div class="text-subtitle2 text-center">Usuario</div>
            </div>
          </q-img>
        </q-drawer>

        <q-page-container style="padding-left: 0;">
          <q-page padding>
            <router-view></router-view>
          </q-page>
        </q-page-container>

        <q-footer elevated class="bg-dark text-white">
          <q-toolbar>
            <q-toolbar-title class="text-center" style="font-size: 14px;">
              <div>Sena 2023 © Todos los derechos reservados</div>
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
let TituloPedidos = ref(false)
let TituloInventory = ref(false)

function MenuAPedidos() {
  TituloPedidos = true
}

function MenuInventory() {
  TituloInventory = true
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}



</script>

<style scoped></style>