import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "../../Global/notify.js";
import { ref } from "vue";

import { requestAxios } from "../../Global/axios.js"

export const productStore = defineStore("productStore", () => {
  const product = ref("");


  async function listProduct() {
  
    try {
      return await requestAxios.get("/product",{
        headers: {
          token: useToken.token,
        },
      })
    } catch (error) {
      notifyError('No fue posible obtener los productos');
      console.log(error);
    }
  }


  async function newProduct(infoProduct ) {
    try {
      return await requestAxios.post("/product", infoProduct, {}),
     notifySuccess('Producto registrado correctamente')
    } catch (error) {
      notifyError(error.response.data.errors.join(", "));
      console.log(error);
    }
  }

  async function putProduct(id, infoProduct) { 
    try {
      return await requestAxios.put(`/product/update/${id}`, infoProduct, { },
      notifySuccess('Producto actualizado correctamente'))
    } catch (error) {
      notifyError(error.response.data.errors.join(", "));
      console.log(error);
    }
  }

  async function active(id, estado) {
    try {
      return await requestAxios.put(`/product/state/${id}`, { state: estado },
      notifySuccess('Estado cambiado correctamente')) 
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
  
  async function listCategoryActive() {
    try {
      return await requestAxios.get("/category/active")
    } catch (error) {
      console.log(error);
    }
  }

  async function listBrandsActive() {
    try {
      return await requestAxios.get("/brands/active")
    } catch (error) {
      console.log(error);
    }
  }


  return { product, listProduct, newProduct, putProduct, active, listPaymentsActive, listFarmsActive, listCategoryActive, listBrandsActive };},
{  persist: true,},
);
  