<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div class="text-weight-bolder text-h4">COSTOS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />

        <div class="row q-mt-xl">
            <div class="col-2"></div>
            <div class="col-2 q-mt-xl ">
                <q-card class="my-card  shadow-8 q-py-lg" style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div style="margin: 0px auto; width: 20%; ">
                            <span class="material-symbols-outlined" style="font-size: 50px; color: black; font-weight:bold;">
                            attach_money
                        </span></div>
                        
                    </q-card-section>
                    <q-separator class="bg-green-10 " style="height: 2px;" />

    

                    <router-link to="/pagos" style="text-decoration: none;" class=" text-dark" > <q-card-actions vertical align="center">
                      <q-btn flat  >Pagos</q-btn>
                    </q-card-actions></router-link>
                </q-card>
            </div>
            <div class="col-1"></div>

            <div class="col-2 text-center  q-mt-xl ">
                <q-card class="my-card  shadow-8 q-py-lg" style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"><i class="fa-solid fa-money-bill" style="font-size: 50px;"></i></div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;"/>

                 

                    <router-link to="/gastosMensuales" style="text-decoration: none;" class="text-dark" >
                   <q-card-actions vertical align="center" class="q-pt-none">
                         <q-btn flat >Gastos Mensuales </q-btn>
                    </q-card-actions>
                </router-link>
                </q-card>
            </div>
            <div class="col-1"></div>
            <div class="col-2 text-center  q-mt-xl ">
                <q-card class="my-card  shadow-8 q-py-lg" style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"><i class="fa-solid fa-money-bill" style="font-size: 50px;"></i></div>
                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />

                  
                    <router-link to="/gastosOcasionales" style="text-decoration: none;" class="text-dark" >
                     <q-card-actions vertical align="center">
                        <q-btn flat >Gastos ocasionales </q-btn>
                    </q-card-actions>
                    </router-link>
                </q-card>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>

<script setup>

</script>