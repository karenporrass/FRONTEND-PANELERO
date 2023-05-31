import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const monthlyStore = defineStore("counter", () => {
  const monthly = ref("");


  async function listMonthly() {
    console.log("listMonthly")
    try {
      return await requestAxios.get("/monthlyExpenses")
    } catch (error) {
      console.log(error);
    }
  }

  

  async function newMonthly(Name_spent, Finca, Description, PAYMENT_METHOD, costValue ) {
    try {
        return await requestAxios.post(`/monthlyExpenses`,{
         

          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue

        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putMonthly(id, Name_spent, Finca, Description, PAYMENT_METHOD, costValue ) { //recivir las variables 
    try {
        return await requestAxios.put(`/monthlyExpenses/update/${id}`,{
          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue
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
  

  return {  monthly, listMonthly, newMonthly, putMonthly, active, listMonthlyActive };
});
