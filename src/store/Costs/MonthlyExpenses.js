import { defineStore } from "pinia";
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";

export const monthlyStore = defineStore("monthlyStore", () => {


  async function listMonthly() {

    try {
      let r= await requestAxios.get("/monthlyExpenses")
      
      return r
    } catch (error) {
      notifyError('No fue posible obtener los gastos');
      console.log(error);
      
    }
  }

  

  async function newMonthly(Name_spent, Finca, Description, PAYMENT_METHOD, costValue, Total ) {
     
    try {
        return await requestAxios.post(`/monthlyExpenses`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue,
          Total: Total
        },
        notifySuccess('Gasto registrado correctamente'))
      } catch (error) {
        notifyError(error.response.data.errors.join(", "));
        console.log(error);
      }
  }

  async function putMonthly(id, Name_spent, Finca, Description, PAYMENT_METHOD, costValue, Total ) {
    
    try {
        return await requestAxios.put(`/monthlyExpenses/update/${id}`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue,
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
      return await requestAxios.put(`/monthlyExpenses/state/${id}`, {state:estado}, 
      notifySuccess('Estado cambiado correctamente')) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listMonthlyActive() {
    try {
      return await requestAxios.get("/metodoPago/active")
      
    } catch (error) {
      console.log(error);
    }
  }

  async function listFarmsActive() {
    try {
      return await requestAxios.get("/registroFinca/active");
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
