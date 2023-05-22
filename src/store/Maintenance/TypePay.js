import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const typePayStore = defineStore('counter', () => {
    const pay = ref("")
    
    async function listTypePay() {
      try {
        return await requestAxios.get("/tipoPago")
      } catch (error) {
        console.log(error);
      }
    }

    async function newTypePay(name) {
        try {
            return await requestAxios.post(`/tipoPago`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putTypePay(id, name) {
        try {
            return await requestAxios.post(`/tipoPago/${id}`,{
             name: name,

            })
          } catch (error) {
            console.log(error);
          }
    }

    async function active(id, estado){
      try {

        return await requestAxios.put(`/tipoPago/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion

      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listTypePay, pay, active, newTypePay, putTypePay }
  })