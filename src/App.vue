<template>
  <div>
    <div>
      <q-layout view="hHh lpR fff" container class="shadow-2 fullscreen">
        <q-header elevated class="bg-green-10">
          <q-toolbar>
            <q-btn flat @click="toggleLeftDrawer" round dense icon="menu"
              ><q-toolbar-title>MENU</q-toolbar-title></q-btn
            >
            <q-space></q-space>
            <q-btn flat icon="fa-regular fa-user" class="q-mr-sm">
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="col-6 column items-center">
                    <q-avatar size="72px">
                      <img
                        src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
                      />
                    </q-avatar>
                    <q-btn
                      color="teal-8"
                      label="Logout"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                  <div class="col-6">
                    <div class="text-h6 q-mt-sm">Pepita Perez</div>
                  </div>
                </div>
              </q-menu>
            </q-btn>
            <q-btn
              flat
              icon="fa-solid fa-arrow-right-from-bracket"
              class=""
              @click="logout"
              style="font-size: 15px"
            >
            </q-btn>
          </q-toolbar>
        </q-header>
        <q-drawer
          show-if-above
          v-model="leftDrawerOpen"
          side="left"
          bordered
          class="q-mt-lg"
        >
          <q-scroll-area
            style="
              height: calc(100% - 150px);
              margin-top: 150px;
              border-right: 1px solid #ddd;
            "
          >
            <q-list class="column items-center q-mt-md">
              <router-link to="/home" style="text-decoration: none">
                <q-item
                  clickable
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <i
                      class="fa-solid fa-house-user"
                      style="font-size: 20px"
                    ></i>
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    INICIO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link
                to="/homeMantenimiento"
                style="text-decoration: none"
                v-show="
                  storelogin.rol === 'SUPER' ||
                  storelogin.rol === 'Administrador'
                "
              >
                <q-item
                  clickable
                  v-ripple
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 25px"
                    >
                      widgets
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    MANTENIMIENTO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link
                to="/homeCostos"
                style="text-decoration: none"
                v-show="
                  storelogin.rol === 'SUPER' ||
                  storelogin.rol === 'Administrador'
                "
              >
                <q-item
                  clickable
                  v-ripple
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 28px"
                    >
                      monetization_on
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    COSTOS
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link
                to="/homePedidos"
                style="text-decoration: none; color: white"
              >
                <q-item
                  clickable
                  v-ripple
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 25px"
                    >
                      shopping_cart
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    PEDIDOS
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link
                to="/homeTransformacion"
                style="text-decoration: none; color: white"
              >
                <q-item
                  clickable
                  v-ripple
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 25px"
                    >
                      manage_history
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    TRANSFORMACIÓN
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link
                to="/homeInventory"
                style="text-decoration: none; color: white"
              >
                <q-item
                  clickable
                  v-ripple
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 25px"
                    >
                      inventory
                    </span>
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    INVENTARIO
                  </q-item-section>
                </q-item>
              </router-link>

              <router-link
                to="/reports"
                style="text-decoration: none; color: white"
              >
                <q-item
                  clickable
                  v-ripple
                  class="bg-green-9 text-white q-mb-md"
                  style="border-radius: 12px; width: 230px"
                >
                  <q-item-section avatar style="min-width: 1px">
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 25px"
                      >lab_profile</span
                    >
                  </q-item-section>
                  <q-item-section style="font-size: medium">
                    REPORTES
                  </q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-scroll-area>

          <q-img
            class="absolute-top"
            src="/images/IMAGEN_TRAPICHE.png"
            style="height: 170px"
          >
            <div
              class="absolute-bottom bg-transparent column items-center text-black"
            >
              <div class="text-weight-bolder text-center">
                {{ storelogin.email }}
              </div>
              <div class="text-subtitle2 text-center">{{ storelogin.rol }}</div>
            </div>
          </q-img>
        </q-drawer>

        <q-page-container style="padding-left: 0">
          <q-page padding>
            <router-view></router-view>
          </q-page>
        </q-page-container>

        <q-footer elevated class="bg-dark text-white">
          <q-toolbar>
            <q-toolbar-title class="text-center" style="font-size: 14px">
              <div>Sena 2023 © Todos los derechos reservados</div>
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LoginStore } from "./store/Login/login.js";
import { useRouter } from "vue-router";

const storelogin = LoginStore();
const router = useRouter();
let privateMol = ref();
let per = ref(storelogin.email);
let role = ref(storelogin.rol);
console.log(role.value);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logout = () => {
  console.log("borrando token");
  storelogin.logoutUser();
  leftDrawerOpen.value = false;
  router.replace({ path: "/" });
};

const currentDate = new Date();
const dateLogin = new Date(storelogin.dateLogin);

//si la fecha actual es mayor a la fecha de inicio de sesion + 1 dia
if (currentDate > dateLogin.setDate(dateLogin.getDate() + 1)) {
  logout();
}
</script>

<style scoped></style>