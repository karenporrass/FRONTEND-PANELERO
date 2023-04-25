<template>
    <div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 q-mt-lg q-mb-sm text-center text-weight-bolder text-h4">
                MÓDULOS
            </div>
            <div class="col-4"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />

        <div class="row" style="margin-top: 150px;">
            <div class="col-2"></div>
            <div class="col-2">
                <q-card class="my-card" style="border-style:solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-sliders" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/homeMantenimiento" style="text-decoration: none; color: black;">
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                MANTENIMIENTO
                            </div>
                        </q-card-section>
                    </router-link>
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/homeCostos" style="text-decoration: none; color: black;">
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                COSTOS
                            </div>
                        </q-card-section>
                    </router-link>
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-cart-shopping" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/homePedidos" style="text-decoration: none; color: black;">
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                PEDIDOS
                            </div>
                        </q-card-section>
                    </router-link>
                </q-card>
            </div>
            <div class="col-2"></div>
        </div>


        <div class="row" style="padding-top: 80px;">
            <div class="col-2"></div>
            <div class="col-2">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-arrows-spin" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <q-card-section class="q-pt-none">
                        <div class="text-center q-mt-md">
                            TRANSFORMACIÓN
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2 ">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-clipboard-list" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <q-card-section class="q-pt-none">
                        <div class="text-center q-mt-md">
                            INVENTARIO
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-file-arrow-down" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <q-card-section class="q-pt-none">
                        <div class="text-center q-mt-md">
                            REPORTES
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-2"></div>

        </div>
    </div>
</template>

<style></style>