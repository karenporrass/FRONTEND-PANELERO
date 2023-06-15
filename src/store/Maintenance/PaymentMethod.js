import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";


export const paymentStore = defineStore('paymentStore', () => {
    const payment = ref("")
    
    async function listPayments() {
      try {
        return await requestAxios.get("/metodoPago/all")
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los metodos de pago');
      }
    }

    async function listPaymentsActive() {
      try {
        return await requestAxios.get("/metodoPago/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function newPayment(name) {
        try {
             await requestAxios.post(`/metodoPago`,{
             name: name,
            });
            notifySuccess('Metodo de pago registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

      async function putPayment(id, name) {
        try {
             await requestAxios.put(`/metodoPago/update/${id}`,{
             name: name,
            });
            notifySuccess('Unidad de medida actualizada correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/metodoPago/state/${id}`, {state:estado});
        notifySuccess('Estado cambiado correctamente');
        //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPayments, payment, active, newPayment, putPayment, listPayments, listPaymentsActive }
  }, {
    persist: true,
  }
  );