<template>
    <div>
        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div class="text-weight-bolder text-h4">INVENTARIO</div>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />

        <div class="row q-mt-xl">
            <div class="col-3"></div>


            <div class="col-2 q-mt-xl ">
                <q-card class="my-card  shadow-8 q-py-lg "
                    style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"> <span class="material-symbols-outlined" style="font-size: 50px;">
                                add_business
                            </span> </div>
                    </q-card-section>


                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/vault" style="text-decoration: none;" class="text-dark"> <q-card-actions vertical
                            align="center" class="q-pt-none">
                            <q-btn flat class="text-subtitle1 text-dark">Bodegas</q-btn>
                        </q-card-actions></router-link>



                </q-card>
            </div>

            <div class="col-2"></div>

            <div class="col-2 q-mt-xl ">
                <q-card class="my-card  shadow-8 q-py-lg  ">



                    style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"><span class="material-symbols-outlined" style="font-size: 50px;">
                                new_releases
                            </span></div>

                    </q-card-section>
                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/brands" style="text-decoration: none;" class="text-dark">
                        <q-card-actions vertical align="center">
                            <q-btn flat class="text-subtitle1">Marcas </q-btn>
                        </q-card-actions>
                    </router-link>
                </q-card>


            </div>

            <div class="col-3"></div>
        </div>

        <div class="row q-mt-xl">
            <div class="col-3"></div>

            <div class="col-2 q-mt-xl ">
                <q-card class="my-card  shadow-8  q-py-lg "
                    style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"> <span class="material-symbols-outlined" style="font-size: 50px;">
                                category
                            </span> </div>
                    </q-card-section>

                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/category" style="text-decoration: none;" class="text-dark"> <q-card-actions vertical
                            align="center" class="q-pt-none">
                            <q-btn flat class="text-subtitle1 text-dark">Categorias</q-btn>
                        </q-card-actions></router-link>



                </q-card>
            </div>
            <div class="col-2"></div>


            <div class="col-2 q-mt-xl ">
                <q-card class="my-card  shadow-8 q-py-lg "
                    style="border: solid; border-color: darkgreen; border-radius: 15px;">
                    <q-card-section>
                        <div class="text-center"> <span class="material-symbols-outlined" style="font-size: 50px;">
                                inventory_2
                            </span> </div>
                    </q-card-section>

                    <q-separator class="bg-green-10" style="height: 2px;" />
                    <router-link to="/product" style="text-decoration: none;" class="text-dark"> <q-card-actions vertical
                            align="center" class="q-pt-none">
                            <q-btn flat class="text-subtitle1 text-dark">Productos</q-btn>
                        </q-card-actions></router-link>


                </q-card>
            </div>

            <div class="col-3"></div>
        </div>


    </div>
</template>

<script setup>

</script>