<template>
    <div>
      <div class="row justify-center" style="margin-top: 40px;">
        <div class="col-10 text-center text-weight-bold text-h5">
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
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
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

