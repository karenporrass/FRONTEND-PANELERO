import { defineStore } from 'pinia'
import { requestAxios } from '../../Global/axios'
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const payStore = defineStore("payStore", () => {
  const useToken = LoginStore();

  async function listPays() {
    
    try {
      return await requestAxios.get("/payments", {
        headers: {
          token: useToken.token,
        }})
    } catch (error) {
      console.log(error);
      notifyError('No fue posible obtener los pagos');
    }
  }


  async function newPays(pay) {
    try {
      console.log("hola post");
       let r= await requestAxios.post('/payments/register', pay, {
        headers: {
          token: useToken.token,
        }
        });
        notifySuccess('Pago registrado correctamente'),
        console.log(r);
        return r
      } catch (error) {
        console.log(pay);
       
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function putPays(id, inforPays) { 
      console.log("cambiar");
      console.log(inforPays);
    try {
       await requestAxios.put(`/payments/update/${id}`,inforPays,{
        headers: {
          token: useToken.token,
        }
       }),
      notifySuccess('Pagos actualizado correctamente');
      }catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(inforPays);
        console.log(error);
        
        return error
        
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/payments/state/${id}`,{state:estado}, {  headers: {token: useToken.token,},
    },),
      notifySuccess('Estado cambiado correctamente')
      
      
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listPaymentsActive() {
    try {
      return await requestAxios.get("/metodoPago/active", {
        headers: {
          token: useToken.token,
        }})
      
    } catch (error) {
      console.log(error);
    }
  }

  async function listUsersActive() {
    try {
      return await requestAxios.get("/usuarios/active",{
        headers: {
          token: useToken.token,
        }
      })
      } catch (error) {
      console.log(error);
    }
  }

  

  return {  listPays, newPays, putPays, active, listPaymentsActive, listUsersActive };
},
{persist: true,},
)
