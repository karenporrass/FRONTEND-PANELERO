import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const typePayStore = defineStore('typePayStore', () => {
    const pay = ref("")
    const useToken = LoginStore();
    
    async function listTypePay() {
      try {
        return await requestAxios.get("/tipoPago/all", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de pagos');

      }
    }

    async function listTypePayActive() {
      try {
        return await requestAxios.get("/tipoPago/active", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }

    async function newTypePay(name) {
        try {
             await requestAxios.post(`/tipoPago`,{
              headers: {
             token: useToken.token,
           },},{
             name: name,
            });
            notifySuccess('Tipo de pago registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function putTypePay(id, name) {
        try {
             await requestAxios.put(`/tipoPago/update/${id}`,{
              headers: {
             token: useToken.token,
           },},{
             name: name,
            });
            notifySuccess('TIpo de panela actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
    }

    async function active(id, estado){
      try {

         await requestAxios.put(`/tipoPago/state/${id}`, {
          headers: {
         token: useToken.token,
       },},{state:estado});
         notifySuccess('Estado cambiado correctamente');
         //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion

      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listTypePay, pay, active, newTypePay, putTypePay, listTypePayActive }
  }, {
    persist: true,
  }
  );