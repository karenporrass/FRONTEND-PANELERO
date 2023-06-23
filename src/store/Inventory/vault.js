import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {requestAxios} from "../../Global/axios.js"

export const vaultStore = defineStore("vaultStore", () => {

  async function listVault() {
    try {
      let res=  await requestAxios.get("/cellars")
      console.log(res);
    } catch (error) {
      notifyError('No fue posible obtener los datos de bodegas');
      console.log(error);
    }
  }


  async function newVault(vault ) {
    try {
        let r = await requestAxios.post('/cellars',vault);
        notifySuccess('La bodega fue registrada correctamente')
        console.log(r);
        return r
      } catch (error) { 
        notifyError(error.response.data.errors.join(", "));
        console.log(error)
        return error
       
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
        },
        notifySuccess('la bodega fue actualizada correctamente')
        )
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/cellars/state/${id}`, {state:estado},
      notifySuccess('Estado cambiado correctamente')) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listVaultActive() {
    try {
      return await requestAxios.get("/metodoPago/active")
    } catch (error) {
      console.log(error);
    }
  }

  
  async function listUsersActive() {
    console.log("listUsersActive")
    try {
      return await requestAxios.get("/usuarios/active")
    } catch (error) {
      console.log(error);
      return error
    }
  }

  return { listVault, newVault, putVault,  listVaultActive, active, listUsersActive };
},
{
  persist: true,
},
);
