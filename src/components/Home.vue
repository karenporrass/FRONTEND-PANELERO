<template>
    <div>
      <div class="row justify-center" style="margin-top: 40px;">
        <div class="col-10 text-center text-weight-bold text-h5">
          <div>BIENVENIDOS</div>
          <div>Imagenes corporativas</div>          

        </div>
      </div>
        <div class="row justify-center q-my-xl">
            <div class="col-10"  style="padding: 0px; ">
                <div style="padding: 0px; ">
    <q-carousel 
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      style="height: 500px;"
    >
      <q-carousel-slide :name="1" img-src="/images/panela1.jpg" />
      <q-carousel-slide :name="2" img-src="/images/panela2.jpg" />
      <q-carousel-slide :name="3" img-src="/images/panela43.jpg" />
    </q-carousel>
  </div>
            </div>
           
        </div>


      
  
</div>

    
</template>
<script setup>
import { ref } from 'vue'
let slide = ref(1)

</script>


<style>
.q-layout-padding {
    padding: 0px;
}
</style>


 


<style></style>

