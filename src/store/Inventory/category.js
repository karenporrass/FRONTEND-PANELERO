import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const CategoryStore = defineStore("CategoryStore", () => {
  const Category = ref("");


  async function listCategory() {
    try {
      return await requestAxios.get("/category",{
        headers: {
          token: useToken.token,
        },
      })
    } catch (error) {
      notifyError('No fue posible obtener las categorias');
      console.log(error);
    }
  }


  async function newCategory(name_category, description ) {
    try {
        return await requestAxios.post("/category",{
          name_category: name_category,
            description: description,
            
          

        },
        notifySuccess('Categoria registrada correctamente')
        )
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function putCategory(id, name_category, description) { //recivir las variables 
    try {
        return await requestAxios.put(`/category/update/${id}`,{
          name_category: name_category,
            description: description,
          
        },
        notifySuccess('Categoria actualizada correctamente'))
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/category/state/${id}`, {state:estado},
      notifySuccess('Estado cambiado correctamente')
      ) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }



  

  return { Category, listCategory, newCategory, putCategory, active };
},
{  persist: true,},
);
