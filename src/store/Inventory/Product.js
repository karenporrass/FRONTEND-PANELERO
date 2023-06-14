import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import { ref } from "vue";

import { requestAxios } from "../../Global/axios.js"

export const productStore = defineStore("productStore", () => {
  const product = ref("");


  async function listProduct() {
  
    try {
      return await requestAxios.get("/product")
    } catch (error) {
      notifyError('No fue posible obtener los gastos');
      console.log(error);
    }
  }


  async function newProduct(amount, expense_name,  administrator, Finca, description, PAYMENT_METHOD, cost_value, total  ) {
    try {
      return await requestAxios.post("/product", {
      amount: amount, 
      expense_name: expense_name, 
      administrator: administrator, 
      Finca: Finca, 
      description: description, 
      PAYMENT_METHOD: PAYMENT_METHOD, 
      cost_value: cost_value, 
      total: total, 
      },
      notifySuccess('Producto registrado correctamente'))
    } catch (error) {
      notifyError(error.response.data.errors.join(", "));
      console.log(error);
    }
  }

  async function putProduct(id, amount,expense_name,  administrator, Finca, description, PAYMENT_METHOD, cost_value, total) { //recivir las variables 
    try {
      return await requestAxios.put(`/product/update/${id}`, {
        amount: amount, 
        expense_name: expense_name, 
        administrator: administrator, 
        Finca: Finca, 
        description: description, 
        PAYMENT_METHOD: PAYMENT_METHOD, 
        cost_value: cost_value, 
        total: total, 
   

      },
      notifySuccess('Producto actualizado correctamente'))
    } catch (error) {
      notifyError(error.response.data.errors.join(", "));
      console.log(error);
    }
  }

  async function active(id, estado) {
    try {
      return await requestAxios.put(`/product/state/${id}`, { state: estado },
      notifySuccess('Estado cambiado correctamente')) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
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

  
  async function listFarmsActive() {
    try {
      return await requestAxios.get("/registroFinca/active");
    } catch (error) {
      console.log(error);
    }
  }
  



  return { product, listProduct, newProduct, putProduct, active, listPaymentsActive, listFarmsActive };},
{  persist: true,},
);
  