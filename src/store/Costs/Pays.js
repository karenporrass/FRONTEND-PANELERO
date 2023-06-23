import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {requestAxios} from "../../Global/axios.js"
import { log } from "pdfkit-browserify";

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
      console.log("hola post");
       let r= await requestAxios.post('/payments/register', pay, {
        });
        notifySuccess('Pago registrado correctamente'),
        console.log(r);
      } catch (error) {
        console.log(pay);
        console.log(r);
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function putPays(id, inforPays) { 
      console.log("cambiar");
      console.log(inforPays);
    try {
       await requestAxios.put(`/payments/update/${id}`,inforPays,{
       }),
      notifySuccess('Pagos actualizado correctamente');
      }catch (error) {
        
        console.log(inforPays);
        console.log(error);
        notifyError(error.response.data.errors.join(", "));
        return error
        
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
