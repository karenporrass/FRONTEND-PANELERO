<template>
    <div>

        <div class="row q-mt-md">
            <div class="col-1"></div>
            <div class="col-10  text-center">
                <div class="text-weight-bolder text-h4">PEDIDOS</div>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="bg-green-10 q-mb-xl" style="width: 70%; height: 2px" />


    <div class="row">
        <div 
        class="col-1">
        </div>


        <div  class="col-10"> 
     


            <q-card id="card" class="my-card bg-white text-black">
            <q-card-section>
                <q-icon id="carrito" name="local_shipping"></q-icon>
            </q-card-section>
            
           

            <q-separator class="bg-green-10" />

            <q-card-actions >
                <div id="letraAbajo">
                    <router-link style="text-decoration:  none; color: black;" to="/pedidosDos"><p id="pe">Pedidos</p></router-link>
                </div>
               
            </q-card-actions>
            </q-card>
        </div>


        <div 
        class="col-1">
        </div>
    </div>


   
    



    </div>
</template>


<style>
#Formularios{
    text-align: center;
    font-family:Georgia, 'Times New Roman', Times, serif;
    margin-bottom:10px ;
}

#div-carrito{
    align-content: center;
}
#carrito{
    font-size: 100px;
    align-content: center;
  
}
#card{

    margin:0px auto;
    width: 20%;
    height:200px;
    text-align: center;
    margin-top:100px ;
    border: solid; 
    border-color: darkgreen; 
    border-radius: 15px;
    
}
#letraAbajo{
    margin: 0px auto;
    text-align: center;
    font-size: 30px;
    font-family:'Times New Roman', Times, serif;
}

</style>