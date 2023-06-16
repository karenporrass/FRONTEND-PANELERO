import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {requestAxios} from "../../Global/axios.js"

export const payStore = defineStore("payStore", () => {



  async function listPays() {
    
    try {
      return await requestAxios.get("/payments")
    } catch (error) {
      console.log(error);
      notifyError('No fue posible obtener los pagos');
    }
  }


  async function newPays(pay) {
    
    try {
      console.log(22);
        return await requestAxios.post('/payments', pay, 
        notifySuccess('Pago registrado correctamente'));
       
      } 
      catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
        return error;
        
      }
  }

  async function putPays(id, DNI, ROL, Name, CONCEPT,  PAYMENT_METHOD,  TIME_TO_PAY, total) { 
      console.log("cambiar");
    try {
        return await requestAxios.put(`/payments/update/${id}`,{
          DNI: DNI,
          ROL: ROL,
          CONCEPT: CONCEPT,
          PAYMENT_METHOD: PAYMENT_METHOD,
          TIME_TO_PAY: TIME_TO_PAY,
          Total: total,
          Name: Name
        },
        notifySuccess('Pagos actualizado correctamente'));
        
      } 
      catch (error) {
      notifyError(error.response.data.errors.join(", "));
      console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/payments/state/${id}`, {state:estado},
      notifySuccess('Estado cambiado correctamente')
      );
      
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listPaymentsActive() {
    try {
      return await requestAxios.get("/metodoPago/active")
      
    } catch (error) {
      console.log(error);
    }
  }

  async function listUsersActive() {
    try {
      return await requestAxios.get("/usuarios/active");
    } catch (error) {
      console.log(error);
    }
  }

  

  return {  listPays, newPays, putPays, active, listPaymentsActive, listUsersActive };
},
{persist: true,},
);
