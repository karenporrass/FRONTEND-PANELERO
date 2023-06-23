import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const workStore = defineStore('workStore', () => {
    const work = ref("")    
    const useToken = LoginStore();
    async function listWork() {
      try {
        return await requestAxios.get("/tipoLabor/all",
        {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de labores');
      }
    }

    async function listWorkActive() {
      try {
        return await requestAxios.get("/tipoLabor/Active",
        {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }

    
    async function newWork(name, area, dailyPayment) {
        try {
             await requestAxios.post(`/tipoLabor`,{
              headers: {
             token: useToken.token,
           },},{
              name: name,
              area: area,
              dailyPayment: dailyPayment
            });
            notifySuccess('Tipo de labor registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

      async function putWork(id, name, area, dailyPayment) {
        try {
             await requestAxios.put(`/tipoLabor/update/${id}`,{
              name: name,
              area: area,
              dailyPayment: dailyPayment
            });
            notifySuccess('Tipo de labor actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/tipoLabor/state/${id}`, {state:estado});
         notifySuccess('Estado cambiado correctamente');
         //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listWork, work, active, newWork, putWork, listWorkActive }
  }, {
    persist: true,
  }
  );