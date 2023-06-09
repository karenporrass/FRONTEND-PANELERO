import { defineStore } from "pinia";
import {requestAxios} from "../../Global/axios.js"

export const monthlyStore = defineStore("monthlyStore", () => {


  async function listMonthly() {
    console.log("listMonthly")
    try {
      let r= await requestAxios.get("/monthlyExpenses")
      console.log(r);
      return r
    } catch (error) {
      console.log(error);
      
    }
  }

  

  async function newMonthly(Name_spent, Finca, Description, PAYMENT_METHOD, costValue, Total ) {
      console.log("2 crea");
    try {
        return await requestAxios.post(`/monthlyExpenses`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue,
          Total: Total
        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putMonthly(id, Name_spent, Finca, Description, PAYMENT_METHOD, costValue, Total ) {
    console.log("actualiza");
    try {
        return await requestAxios.put(`/monthlyExpenses/update/${id}`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue,
          Total: Total
        })
      } catch (error) {
        console.log(error);
      }
  }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/monthlyExpenses/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async function listMonthlyActive() {
    try {console.log("yes");
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
