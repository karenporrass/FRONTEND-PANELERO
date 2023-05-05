<template>
    <div>
        <div class="row">
            
            <div class="col-12 text-h3 text-weight-bolder text-center"  style="padding: 0px; ">
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

