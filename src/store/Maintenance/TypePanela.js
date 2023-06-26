import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const panelaStore = defineStore('panelaStore', () => {
    const panela = ref("")
    const useToken = LoginStore();
    
    async function listPanela() {
      try {
        return await requestAxios.get("/tipoPanela/all",{
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de panela');
      }
    }

    async function listPanelaActive() {
    try {
      return await requestAxios.get("/tipoPanela/active", {
        headers: {
       token: useToken.token,
     },})
    } catch (error) {
      console.log(error);
    }
  }

    async function newPanela(name, price) {
        try {
             await requestAxios.post(`/tipoPanela`, {
              name: name,
              price: price
            }, {
              headers: {
             token: useToken.token,
           }}
           );
            notifySuccess('Tipo de panela registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function putPanela(id, name, price) {
        try {
             await requestAxios.put(`/tipoPanela/update/${id}`,{
              name: name,
              price: price
            },
            {
              headers: {
             token: useToken.token,
           }});
            notifySuccess('TIpo de panela actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/tipoPanela/state/${id}`, {state:estado}, {
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
  
    return { panela, listPanela, listPanelaActive, newPanela, putPanela, active}
  },
  {
    persist: true,
  });