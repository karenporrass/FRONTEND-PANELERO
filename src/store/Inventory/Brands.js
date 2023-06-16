 import { defineStore } from "pinia";
import { ref } from "vue";
import { notifyError, notifySuccess } from "../../Global/notify.js";

import {requestAxios} from "../../Global/axios.js"

export const BrandsStore = defineStore("counter", () => {
  const brands = ref("");


  async function listPBrands() {
    
    try {
      return await requestAxios.get("/brands")
    } catch (error) {
      console.log(error);
      notifyError('No fue posible obtener las marcas');
    }
  }


  async function newBrands(name_brands, description, creator ) {
 
    try {
        return await requestAxios.post(`/brands`,{
          name_brands: name_brands,
            description: description,
            creator: creator,
          

        },
        notifySuccess('Marca registrada correctamente')
        )
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function putBrands(id, name_brands, description, creator) { //recivir las variables 
    try {
        return await requestAxios.put(`/brands/update/${id}`,{
          name_brands: name_brands,
            description: description,
            creator: creator,
        },
        notifySuccess('Marca actualizado correctamente'))
      } catch (error) {
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/brands/state/${id}`, {state:estado},
      notifySuccess('Estado cambiado correctamente')
      ) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }



  

  return { brands, listPBrands, newBrands, putBrands, active };
},{  persist: true,},
);
