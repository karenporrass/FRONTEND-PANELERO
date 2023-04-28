<template>
    <div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 q-mt-lg q-mb-sm text-center text-weight-bolder text-h4">
                TRANSFORMACIÓN
            </div>
            <div class="col-4"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />

        <div class="row" style="margin-top: 200px">
            <div class="col-2"></div>
            <div class="col-xl-2 col-sm-2" >
                <router-link to="/procesoDiario" style="text-decoration: none; color: black">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px">
                    <q-card-section class="text-center">
                        <span class="material-symbols-outlined" style="font-size: 60px;">
                            engineering
                        </span> </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px" />
                        <q-card-section>
                            <div class="text-center q-mt-md q-my-md">PROCESO DIARIO</div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>

            <div class="col-1"></div>

            <div class="col-xl-2 col-sm-2">
                <router-link to="/materiaTransformada" style="text-decoration: none; color: black">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px">
                    <q-card-section class="text-center">
                        <span class="material-symbols-outlined" style="font-size: 60px;">
                            psychiatry
                        </span> </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px" />
                        <q-card-section >
                            <div class="text-center q-mt-md">MATERIA PRIMA TRANSFORMADA</div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-1"></div>
            <div class="col-xl-2 col-sm-2">
                <router-link to="/empacado" style="text-decoration: none; color: black">
                <q-card class="my-card" style="border-style: solid; border-color: green; border-radius: 10px">
                    <q-card-section class="text-center">
                        <span class="material-symbols-outlined" style="font-size: 60px;">
                            check_box
                        </span>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px" />
                        <q-card-section>
                            <div class="text-center q-mt-md q-my-md">EMPACADOS</div>
                        </q-card-section>
                    </q-card>
                </router-link>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>

<style></style>