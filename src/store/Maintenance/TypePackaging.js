import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const packagingStore = defineStore('packagingStore', () => {
    const packaging = ref("")
    const useToken = LoginStore();
    
    async function listPackaging() {
      try {
        return await requestAxios.get("/tipoEmpaque/all",
        {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de empaques');

      }
    }

    async function listPackagingActive() {
    try {
      return await requestAxios.get("/tipoEmpaque/active", {
        headers: {
       token: useToken.token,
     },})
    } catch (error) {
      console.log(error);
    }
  }

    async function newPackaging(name, maxWeight, units) {
        try {
             await requestAxios.post(`/tipoEmpaque`,{
              headers: {
             token: useToken.token,
           },},{
              name: name,
              maxWeigth: maxWeight,
              unitsPerBox: units
            });
            notifySuccess('Tipo de empaque registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function putPackaging(id, name, maxWeight, units) {
        try {
             await requestAxios.put(`/tipoEmpaque/update/${id}`,{
              headers: {
             token: useToken.token,
           },},{
              name: name,
              maxWeigth: maxWeight,
              unitsPerBox: units
            });
            notifySuccess('TIpo de empaque actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/tipoEmpaque/state/${id}`,{
          headers: {
         token: useToken.token,
       },}, {state:estado});
        notifySuccess('Estado cambiado correctamente');
        //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPackaging, packaging, active, newPackaging, putPackaging, listPackagingActive}
  }, {
    persist: true,
  }
  );