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


  async function newPays(DNI, ROl, CONCEPT,  PAYMENT_METHOD,  TIME_TO_PAY ) {
    try {
        return await requestAxios.post(`/payments`,{
          DNI: DNI,
          ROl: ROl,
          CONCEPT: CONCEPT,
          PAYMENT_METHOD: PAYMENT_METHOD,
          TIME_TO_PAY: TIME_TO_PAY,

        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putPays(id, DNI, ROl, CONCEPT,  PAYMENT_METHOD,  TIME_TO_PAY) { //recivir las variables 
    try {
        return await requestAxios.put(`/payments/update/${id}`,{
          DNI: DNI,
          ROl: ROl,
          CONCEPT: CONCEPT,
          PAYMENT_METHOD: PAYMENT_METHOD,
          TIME_TO_PAY: TIME_TO_PAY,
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
