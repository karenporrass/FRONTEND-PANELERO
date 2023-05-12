import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const paymentStore = defineStore('counter', () => {
    const payment = ref("")
    
    async function listPayments() {
      try {
        return await axios.get("https://project-panelero.onrender.com/metodoPago")
      } catch (error) {
        console.log(error);
      }
    }
    async function newPayment(name) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/metodoPago`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putPayment(id, name) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/metodoPago/${id}`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/metodoPago/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPayments, payment, active, newPayment, putPayment }
  })