
<template>
  <div>
    <div>
      <q-layout view="hHh lpr fFf" container class="shadow-2 fullscreen">
        <q-header elevated class="bg-teal-10">
          <q-toolbar>
            <q-btn flat @click="toggleLeftDrawer" round dense icon="menu"><q-toolbar-title>MENU</q-toolbar-title></q-btn>
            <q-space></q-space>
            <q-btn flat icon="fa-regular fa-user" class="q-mr-sm" />
            <q-btn flat icon="fa-solid fa-ellipsis-vertical">

              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="col-6 column items-center">
                    <q-avatar size="72px">
                      <img src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png">
                    </q-avatar>

                    <q-btn color="teal-8" label="Logout" push size="sm" v-close-popup />
                  </div>
                  
                  <div class="col-6">
                    <div class="text-h6 q-mt-sm">Pepita Perez</div>
                    <q-toggle  label="Use Mobile Data" />
                    <q-toggle  label="Bluetooth" />
                  </div>


                </div>
              </q-menu>
            </q-btn>


          </q-toolbar>
        </q-header>
        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="">
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list padding>
              <router-link to="/home" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-teal-8 text-white q-mb-sm">
                  <q-item-section avatar>
                    <i class="fa-solid fa-house-user" style="font-size: 20px;"></i>
                  </q-item-section>

                  <q-item-section style="font-size: medium;">
                    MANTENIMIENTO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/profile" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-teal-8 text-white q-mb-sm">
                  <q-item-section avatar>
                    <i class="fa-solid fa-user" style="font-size: 20px;"></i>
                  </q-item-section>

                  <q-item-section style="font-size: medium;">
                    COSTOS
                  </q-item-section>
                </q-item>
              </router-link>
              <router-link to="/edit" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-teal-8 text-white q-mb-sm">
                  <q-item-section avatar>
                    <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    PEDIDOS
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/register" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-teal-8 text-white q-mb-sm">
                  <q-item-section avatar>
                    <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    TRANSFROMACION
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/register" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-teal-8 text-white q-mb-sm">
                  <q-item-section avatar>
                    <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    INVENTARIO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link to="/register" style="text-decoration: none;">
                <q-item clickable v-ripple class="bg-teal-8 text-white q-mb-sm">
                  <q-item-section avatar>
                    <i class="fa-solid fa-user-pen" style="font-size: 20px;"></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium;">
                    REPORTES
                  </q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-scroll-area>

          <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bolder text-h6">Karen y Sandy</div>
              <text-subtitle2>Super usuario</text-subtitle2>
            </div>
          </q-img>
        </q-drawer>

        <q-page-container>
          <q-page padding>
            <router-view></router-view>
          </q-page>
        </q-page-container>

        <q-footer bordered class="bg-teal-10 text-white">
          <q-toolbar>
            <q-toolbar-title class="text-center" style="font-size: 14px;">
              <div> Copyright © 2023 Sandy y Karen</div>
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>
      </q-layout>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>

