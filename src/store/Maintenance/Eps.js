import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const epsStore = defineStore('epsStore', () => {
    const eps = ref("")
    const useToken = LoginStore();
    
    async function listEps() {
      try {
        return await requestAxios.get("/eps/all",
        {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener la eps');

      }
    }

    async function listEpsActive() {
      try {
        return await requestAxios.get("/eps/active",{
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }

    async function newEps(name, attentionLine) {
        try {
             await requestAxios.post(`/eps`,{
                name: name,
                attentionLine: attentionLine
            },{
              headers: {
             token: useToken.token,
           }});
            notifySuccess('Eps registrada correctamente');

          } catch (error) {
            console.log(error);
          }
      }
      async function putEps(id, name, attentionLine) {
        try {
            await requestAxios.put(`/eps/update/${id}`,{
                name: name,
                attentionLine: attentionLine
            },{
              headers: {
             token: useToken.token,
           }});
            notifySuccess('Eps actualizada correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {

       await requestAxios.put(`/eps/state/${id}`, 
     {state:estado},
     {
      headers: { token: useToken.token, }
    });

       notifySuccess('Estado cambiado correctamente');
       //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listEps, eps, active, newEps, putEps, listEpsActive }
  },
   {
    persist: true,
  }
  );