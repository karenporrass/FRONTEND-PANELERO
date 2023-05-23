import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const payStore = defineStore("counter", () => {
  const Pay = ref("");


  async function listPays() {
    console.log("listPays")
    try {
      return await requestAxios.get("/payments")
    } catch (error) {
      console.log(error);
    }
  }


  async function newPays(documen, rol, concept, methodPay, time ) {
    try {
        return await requestAxios.post(`/payments`,{
          DNI: documen,
          ROl: rol,
          CONCEPT: concept,
          PAYMENT_METHOD: methodPay,
          TIME_TO_PAY: time,

        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putPays(id, documen, rol, concept, methodPay, time ) { //recivir las variables 
    try {
        return await requestAxios.put(`/payments/update/${id}`,{
          DNI: documen,
          ROl: rol,
          CONCEPT: concept,
          PAYMENT_METHOD: methodPay,
          TIME_TO_PAY: time,
        })
      } catch (error) {
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/payments/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }



  

  return {  listPays, newPays, putPays, active, Pay };
});
