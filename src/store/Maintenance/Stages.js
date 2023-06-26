import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const stagesStore = defineStore('stagesStore', () => {
    const stage = ref("")
    const useToken = LoginStore();
    
    async function listStages() {
      try {
        return await requestAxios.get("/etapas/all",{
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener las etapas');

      }
    }

    async function listStagesActive() {
      try {
        return await requestAxios.get("/etapas/active", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }

    async function newStage(name, description) {
        try {
             await requestAxios.post(`/etapas`,{
              name: name,
              description: description,
            }, {
              headers: {
             token: useToken.token,
           }});
            notifySuccess('Etapa registrada correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function putStage(id, name, description) {
        try {
             await requestAxios.put(`/etapas/update/${id}`, {
              name: name,
              description: description,
            }, {
              headers: {
             token: useToken.token,
           }});

            notifySuccess('Etapa actualizada correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    

    async function active(id, estado){
      try {
         await requestAxios.put(`/etapas/state/${id}`, {state:estado}, {
          headers: {
         token: useToken.token,
       }});
        notifySuccess('Estado cambiado correctamente');
        //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listStages, stage, active, newStage, putStage, listStagesActive }
  },
  {
    persist: true,
  });
