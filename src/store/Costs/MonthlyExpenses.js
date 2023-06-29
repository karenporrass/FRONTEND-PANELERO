import { defineStore } from "pinia";
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"

export const monthlyStore = defineStore("monthlyStore", () => {
  const useToken = LoginStore();

  async function listMonthly() {

    try {
      let r= await requestAxios.get("/monthlyExpenses", {
        headers: {
          token: useToken.token,
        }})
      
      return r
    } catch (error) {
      notifyError('No fue posible obtener los gastos');
      console.log(error);
      
    }
  }

  

  async function newMonthly(Name_spent, Finca, Description, PAYMENT_METHOD, Total ) {
     
    try {
        return await requestAxios.post(`/monthlyExpenses`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          Total: Total
        },
        notifySuccess('Gasto registrado correctamente'))
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function putMonthly(id, Name_spent, Finca, Description, PAYMENT_METHOD,  Total ) {
    
    try {
        return await requestAxios.put(`/monthlyExpenses/update/${id}`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          
          Total: Total
        },
        notifySuccess('Gastos actualizado correctamente'))
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/monthlyExpenses/state/${id}`, {state:estado},  {  headers: {token: useToken.token,},},
      notifySuccess('Estado cambiado correctamente'))
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listMonthlyActive() {
    try {
      return await requestAxios.get("/metodoPago/active", {  headers: {token: useToken.token,},},)
      
    } catch (error) {
      console.log(error);
    }
  }

  async function listFarmsActive() {
    try {
      return await requestAxios.get("/registroFinca/active", {  headers: {token: useToken.token,},},);
    } catch (error) {
      console.log(error);
    }
  }
  

  return { listMonthly, newMonthly, putMonthly, active, listMonthlyActive, listFarmsActive };
},
{
  persist: true,
},
);
