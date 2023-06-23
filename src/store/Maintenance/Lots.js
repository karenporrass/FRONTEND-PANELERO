import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"

export const lotsStore = defineStore('lotsStore', () => {
    const lots = ref("")
    const useToken = LoginStore();
    
    async function listlots() {
      try {
        return await requestAxios.get("/lotes/all", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los lotes');

      }
    }

    async function listlotsActive() {
      try {
        return await requestAxios.get("/lotes/active",
        {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }

    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca/active", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }
    async function newlots(name, extent,farm ) {
        try {
             await requestAxios.post(`/lotes`,{
              headers: {
             token: useToken.token,
           },}, {
              name: name,
              extent: extent,
              farm: farm
            });
            notifySuccess('Lote registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }
      async function putlots(id, name, extent, farm) {
        try {
             await requestAxios.put(`/lotes/update/${id}`,{
              headers: {
             token: useToken.token,
           },}, {
              name: name,
              extent: extent, 
              farm: farm
            });
            notifySuccess('Lote actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/lotes/state/${id}`,{
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
  
    return { listlots, lots, active, newlots, putlots, listlotsActive, listFarmsActive }
  },
  {
    persist: true,
  }
  );