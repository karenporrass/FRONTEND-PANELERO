import { defineStore } from "pinia";


import {requestAxios} from "../../Global/axios.js"

export const payStore = defineStore("payStore", () => {



  async function listPays() {
    console.log("listPays")
    try {
      return await requestAxios.get("/payments")
    } catch (error) {
      console.log(error);
    }
  }


  async function newPays(pay) {
    
    try {
      console.log(22);
        return await requestAxios.post('/payments', pay)
        
      } 
      catch (error) {
        return error
       
      }
  }

  async function putPays(id, DNI, ROL, CONCEPT,  PAYMENT_METHOD,  TIME_TO_PAY, total) { 
      console.log("cambiar");
    try {
        return await requestAxios.put(`/payments/update/${id}`,{
          DNI: DNI,
          ROL: ROL,
          CONCEPT: CONCEPT,
          PAYMENT_METHOD: PAYMENT_METHOD,
          TIME_TO_PAY: TIME_TO_PAY,
          Total: total
        })  
      } 
      catch (error) {
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

  async function listUsersActive() {
    console.log("listUsersActive");
    try {
      return await requestAxios.get("/usuarios/active");
    } catch (error) {
      console.log(error);
    }
  }

  

  return {  listPays, newPays, putPays, active, listPaymentsActive, listUsersActive };
},
{
  persist: true,
},
);
