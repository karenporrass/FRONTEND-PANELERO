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


  async function newOccasional(Name_spent, Finca, Description, PAYMENT_METHOD, costValue ) {
    try {
        return await requestAxios.post(`/occasionalExpenses`,{
         

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

  async function putOccasional(id, Name_spent, Finca, Description, PAYMENT_METHOD, costValue ) { //recivir las variables 
    try {
        return await requestAxios.put(`/occasionalExpenses/update/${id}`,{
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
      return await requestAxios.put(`/occasionalExpenses/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }



  

  return {  Occasional, listOccasional, newOccasional, putOccasional, active };
});
