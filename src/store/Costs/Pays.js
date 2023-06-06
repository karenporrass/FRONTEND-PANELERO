import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const payStore = defineStore("payStore", () => {
  const Pay = ref("");


  async function listPays() {
    console.log("listPays")
    try {
      return await requestAxios.get("/payments")
    } catch (error) {
      console.log(error);
    }
  }


  async function newPays(pay ) {
    console.log(pay)
    try {
      console.log("entro");
        let r = await requestAxios.post('/payments',pay);
        console.log(r);
        return r
      } catch (error) {
        return error
        console.log(error)
      }
  }

  async function putPays(id, DNI, ROL, CONCEPT,  PAYMENT_METHOD,  TIME_TO_PAY, total) { //recivir las variables 
    try {
        return await requestAxios.put(`/payments/update/${id}`,{
          DNI: DNI,
          ROl: ROL,
          CONCEPT: CONCEPT,
          PAYMENT_METHOD: PAYMENT_METHOD,
          TIME_TO_PAY: TIME_TO_PAY,
          Total: total
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


  async function listPaymentsActive() {
    try {console.log("yes");
      return await requestAxios.get("/metodoPago/active")
      
    } catch (error) {
      console.log(error);
    }
  }

  

  return {  listPays, newPays, putPays, active, listPaymentsActive, Pay };
},
{
  persist: true,
},
);
