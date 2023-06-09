import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const vaultStore = defineStore("vaultStore", () => {
  const vault = ref("");


  async function listVault() {
    console.log("listPays")
    try {
      return await requestAxios.get("/cellars")
    } catch (error) {
      console.log(error);
    }
  }


  async function newVault(vault ) {
    console.log(newVault)
    try {
      console.log("entro");
        let r = await requestAxios.post('/cellars',vault);
        console.log(r);
        return r
      } catch (error) {
        return error
        console.log(error)
      }
  }

  async function putVault(id, name_cellars, content, administrator, extension, dirrecion) { //recivir las variables 
    try {
        return await requestAxios.put(`/cellars/update/${id}`,{
          name_cellars: name_cellars,
          content: content,
          administrator: administrator,
          extension: extension,
          dirrecion: dirrecion,
        })
      } catch (error) {
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/cellars/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listVaultActive() {
    try {console.log("yes");
      return await requestAxios.get("/metodoPago/active")
      
    } catch (error) {
      console.log(error);
    }
  }

  

  return {  vault, listVault, newVault, putVault,  listVaultActive, active };
},
{
  persist: true,
},
);
