import { defineStore } from "pinia";
import { ref } from "vue";

import {requestAxios} from "../../Global/axios.js"

export const OccasionalStore = defineStore("counter", () => {
  const Occasional = ref("");


  async function listOccasional() {
    console.log("listOccasional")
    try {
      return await requestAxios.get("/occasionalExpenses")
    } catch (error) {
      console.log(error);
    }
  }


  async function newOccasional(Name_spent, Finca, Description, PAYMENT_METHOD, costValue,   Total ) {
    try {
        return await requestAxios.post(`/occasionalExpenses`,{
         

          Name_spent: Name_spent,
          Finca: Finca,
          Description: Description,
          PAYMENT_METHOD: PAYMENT_METHOD,
          costValue: costValue,
          Total:   Total
        })
      } catch (error) {
        console.log(error);
      }
  }

  async function putOccasional(id, Name_spent, Finca, Description, PAYMENT_METHOD, costValue, Total ) { //recivir las variables 
    try {
        return await requestAxios.put(`/occasionalExpenses/update/${id}`,{
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
      return await requestAxios.put(`/occasionalExpenses/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async function listOccacionalActive() {
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
  

  return {  Occasional, listOccasional, newOccasional, putOccasional, active, listOccacionalActive, listFarmsActive };
},
{
  persist: true,
},);
