<template>
    <div>
      <div class="row justify-center" style="margin-top: 40px;">
        <div class="col-10 text-center text-weight-bold text-h4">
          <div>BIENVENIDOS</div>
        </div>
      </div>
        <div class="row justify-center q-mt-xl">
          <div class="col-1"></div>
            <div class="col-10 text-center" style="padding: 0px;  ">
              <div class="text-subtitle1 text-weight-bold q-mb-sm">Imagenes corporativas</div>          

                <div style="padding: 0px; ">
    <q-carousel 
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      style="height: 65vh;"
    >
      <q-carousel-slide :name="1" img-src="/images/panela1.jpg" />
      <q-carousel-slide :name="2" img-src="/images/panela2.jpg" />
      <q-carousel-slide :name="3" img-src="/images/panela43.jpg" />
    </q-carousel>
  </div>
            </div>
            <div class="col-1"></div>
           
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

