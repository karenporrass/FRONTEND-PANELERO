import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const CategoryStore = defineStore("CategoryStore", () => {
  const Category = ref("");


  async function listCategory() {
    console.log("listCategory")
    try {
      return await requestAxios.get("/category")
    } catch (error) {
      console.log(error);
    }
  }


  async function newCategory(name_brands, description, creator ) {
    try {
        return await requestAxios.post(`/category`,{
            name_brands: name_brands,
            description: description,
            creator: creator,
          

        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putCategory(id, name_brands, description, creator) { //recivir las variables 
    try {
        return await requestAxios.post(`/category/update/${id}`,{
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
      return await requestAxios.put(`/category/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }



  

  return { Category, listCategory, newCategory, putCategory, active };
});
