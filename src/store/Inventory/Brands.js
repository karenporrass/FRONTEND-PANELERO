import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const BrandsStore = defineStore("counter", () => {
  const brands = ref("");


  async function listPBrands() {
    console.log("listBrands")
    try {
      return await requestAxios.get("/brands")
    } catch (error) {
      console.log(error);
    }
  }


  async function newBrands(name_brands, description, creator ) {
    try {
        return await requestAxios.post(`/brands`,{
            name_brands: name_brands,
            description: description,
            creator: creator,
          

        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putBrands(id, name_brands, description, creator) { //recivir las variables 
    try {
        return await requestAxios.post(`/brands/update/${id}`,{
            name_brands: name_brands,
            description: description,
            creator: creator,
        })
      } catch (error) {
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/brands/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }



  

  return { brands, listPBrands, newBrands, putBrands, active };
});
