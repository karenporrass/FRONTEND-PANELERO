<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div style="font-size:xx-large;" class="text-weight-bolder">COSTOS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <q-separator inset class="q-mt-md  bg-green-10" style="height: 2px; margin-left: 100px; margin-right: 100px;" />

        <div class="row q-mt-xl">
            <div class="col-2"></div>
            <div class="col-2 ">
                <q-card class="my-card q-mr-xl shadow-8 "
                    style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"> <i class="fa-solid fa-money-bill" style="font-size: 50px;"></i> </div>
                    </q-card-section>
                    <q-separator class="bg-green-10 " />
                    <q-card-actions vertical align="center">
                        <q-btn flat class="text-subtitle1">Pagos</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col-1"></div>

            <div class="col-2 text-center">
                <q-card class="my-card q-mr-xl shadow-8"
                    style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"><i class="fa-solid fa-money-bill" style="font-size: 50px;"></i></div>
                    </q-card-section>
                    <q-separator class="bg-green-10" />
                    <q-card-actions vertical align="center" class="q-pt-none">
                        <q-btn flat class="text-subtitle1">Gastos Mensuales </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2 text-center">
                <q-card class="my-card  shadow-8 " style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"><i class="fa-solid fa-money-bill" style="font-size: 50px;"></i></div>
                    </q-card-section>
                    <q-separator class="bg-green-10" />
                    <q-card-actions vertical align="center">
                        <q-btn flat class="text-subtitle1">Gastos ocasionales </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col-2"></div>

        </div>






    </div>
</template>
  
<script setup>

</script>