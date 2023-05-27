<template>
    <div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 q-mt-lg q-mb-sm text-center text-weight-bolder text-h4">
                MANTENIMIENTO
            </div>
            <div class="col-4"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />

        <div class="row" style="margin-top: 60px;">
            <div class="col-2"></div>
            <div class="col-2 q-px-lg">
                <router-link to="/usuarios" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style:solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-sliders" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />

                        <q-card-section>
                            <div class="text-center" >
                                PERSONAS
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>

            <div class="col-2 q-px-lg">
                <router-link to="/labores" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                LABORES
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>

            <div class="col-2 q-px-lg">
                <router-link to="/metodosPago" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                MÉTODO DE PAGO
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>

            <div class="col-2 q-px-lg">
                <router-link to="/tiposPago" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-cart-shopping" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                TIPO DE PAGO
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2"></div>
        </div>

        <div class="row" style="margin-top: 60px;">
            <div class="col-2"></div>
            <div class="col-2 q-px-md">
                <router-link to="/unidadesMedida" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style:solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-sliders" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                UNIDADES DE MEDIDA
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2 q-px-md">
                <router-link to="/eps" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                EPS
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2 q-px-md">
                <router-link to="/tipoDocumento" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                TIPO DE DOCUMENTO
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>

            <div class="col-2 q-px-md">
                <router-link to="/lotes" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-cart-shopping" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section>
                            <div class="text-center">
                                LOTES
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
                </div>
            <div class="col-2"></div>
        </div>


        <div class="row" style="margin-top: 60px;">
        <div class="col-2"></div>
            <div class="col-2 q-px-md">
                <router-link to="/etapas" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style:solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-sliders" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                ETAPAS
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2 q-px-md">
                <router-link to="/fincas" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                FINCAS
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2 q-px-md">
                <router-link to="/tipoEmpaques" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid  fa-coins" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                EMPAQUES
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>

            <div class="col-2 q-px-md">
                <router-link to="/tipoPanela" style="text-decoration: none; color: black;">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px;">
                    <q-card-section>
                        <div class="row column items-center">
                            <q-icon name="fa-solid fa-cart-shopping" style="font-size: 50px;"></q-icon>
                        </div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                        <q-card-section class="q-pt-none">
                            <div class="text-center q-mt-md">
                                TIPO DE PANELA
                            </div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2"></div>
        </div>

    </div>
</template>


<style></style>