
<template>
  <div>
    <div>
      <q-layout view="hHh lpR fFf" container class="shadow-2 fullscreen">
        <q-header elevated class="bg-green-10">
          <q-toolbar>
            <q-btn v-show="TituloPedidos == false" flat @click="toggleLeftDrawer" round dense
              icon="menu"><q-toolbar-title>MENU</q-toolbar-title></q-btn>
            <q-btn v-show="TituloPedidos == true" flat @click="toggleLeftDrawer" round dense
              icon="menu"><q-toolbar-title>PEDIDOS</q-toolbar-title></q-btn>

            <q-space></q-space>
            <q-btn flat icon="fa-regular fa-user" class="q-mr-sm" />
            <q-btn flat icon="fa-solid fa-ellipsis-vertical">

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


          </q-toolbar>
        </q-header>
        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="c">
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list class="column items-center" style="padding-top: 40px;">

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
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">

                  <q-item-section avatar style="  min-width: 1px; ">
                    <i class="fa-solid fa-house-user" style="font-size: 20px;"></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    MANTENIMIENTO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/homeCostos" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">



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
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">


                  <q-item-section avatar style=" min-width: 1px;">
                    <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                  </q-item-section>
                  <q-item-section  style="font-size: medium;">
                    PEDIDOS
                  </q-item-section>
                </q-item> 
              </router-link>


    
              

              <router-link to="/homeTransformacion" style="text-decoration: none; color:white;">

              <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">

                <q-item-section avatar style=" min-width: 1px;">
                  <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                </q-item-section>
                <q-item-section style="font-size: medium;">
                  TRANSFORMACIÓN
                </q-item-section>
              </q-item>
              </router-link>
                
                <router-link @click="MenuInventory()" to="/homeInventory" style="text-decoration: none; color:white;">
                  <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">
                    <q-item-section avatar>
                      <span class="material-symbols-outlined" style="font-size: 25px;">
                        inventory
                      </span>
                    </q-item-section>
                    <q-item-section style="font-size: medium;">
                      INVENTARIO
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link  to="/reports" style="text-decoration: none; color:white;">
                <q-item clickable v-ripple class="bg-green-9 text-white q-mb-md" style="border-radius: 12px; width: 230px;">
                <q-item-section avatar style=" min-width: 1px;">
                  <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                </q-item-section>
                <q-item-section style="font-size: medium;">
                  REPORTES
                </q-item-section>
              </q-item>
              </router-link>

            </q-list>
          </q-scroll-area>

          <q-img class="absolute-top"
            src="https://img.freepik.com/foto-gratis/foto-pequena-palmera-serenoa-repens-que-crece-sombra_181624-10193.jpg?w=740&t=st=1682119825~exp=1682120425~hmac=a9dd3a5be68c5c3641e5e6162b1a1eacf64dcf7fd9b49e133d0636e81c1697b1"
            style="height: 150px">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bolder text-h6">Angel</div>
              <div class="text-subtitle2">Super usuario</div>
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
              <div> Copyright © 2023 Angel</div>
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

