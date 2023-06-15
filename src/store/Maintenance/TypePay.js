import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";


export const typePayStore = defineStore('typePayStore', () => {
    const pay = ref("")
    
    async function listTypePay() {
      try {
        return await requestAxios.get("/tipoPago/all")
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de pagos');

      }
    }

    async function listTypePayActive() {
      try {
        return await requestAxios.get("/tipoPago/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function newTypePay(name) {
        try {
             await requestAxios.post(`/tipoPago`,{
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
             name: name,
            });
            notifySuccess('TIpo de panela actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
    }

    async function active(id, estado){
      try {

         await requestAxios.put(`/tipoPago/state/${id}`, {state:estado});
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