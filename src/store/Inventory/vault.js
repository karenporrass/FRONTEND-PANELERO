import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {requestAxios} from "../../Global/axios.js"
import {LoginStore} from "../../store/Login/login.js"


export const vaultStore = defineStore("vaultStore", () => {
  const useToken = LoginStore();

  async function listVault() {
    try {
      return  await requestAxios.get("/cellars",  {
        headers: {
          token: useToken.token,
        }})
     
    } catch (error) {
      notifyError('No fue posible obtener los datos de bodegas');
      console.log(error);
      return error
    }
  }


  async function listVaultActive() {
    try {
      return  await requestAxios.get("/cellars/active",  {
        headers: {
          token: useToken.token,
        }})
     
    } catch (error) {
      notifyError('No fue posible obtener los datos de bodegas');
      console.log(error);
      return error
    }
  }


  async function newVault(vault) {
    try {
      return await requestAxios.post('/cellars', vault, {
        headers: {
          token: useToken.token,
        }}),
        notifySuccess('La bodega fue registrada correctamente')
      
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
        }, {
          headers: {
            token: useToken.token,
          }},
        notifySuccess('la bodega fue actualizada correctamente')
        )
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/cellars/state/${id}`, {state:estado}, {
        headers: {
          token: useToken.token,
        }},
      notifySuccess('Estado cambiado correctamente')) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listMethods() {
    try {
      return await requestAxios.get("/metodoPago/active", {
        headers: {
          token: useToken.token,
        }})
    } catch (error) {
      console.log(error);
    }
  }

  
  async function listUsersActive() {
    console.log("listUsersActive")
    console.log(useToken.token)
    try {
      return await requestAxios.get("/usuarios/active",{
        headers: {
          token: useToken.token,
        },
    });
    } catch (error) {
      console.log(error);
      return error
    }
  }

  return { listVault, newVault, putVault,  listVaultActive, active, listUsersActive, listMethods };
},
{
  persist: true,
},
);
