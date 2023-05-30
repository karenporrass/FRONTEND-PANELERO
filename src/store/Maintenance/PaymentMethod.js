import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const paymentStore = defineStore('counter', () => {
    const payment = ref("")
    
    async function listPayments() {
      try {
        return await requestAxios.get("/metodoPago/all")
      } catch (error) {
        console.log(error);
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
            return await requestAxios.post(`/metodoPago`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putPayment(id, name) {
        try {
            return await requestAxios.put(`/metodoPago/update/${id}`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/metodoPago/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPayments, payment, active, newPayment, putPayment, listPayments }
  }, {
    persist: true,
  },)