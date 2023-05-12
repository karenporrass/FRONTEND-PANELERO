import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const typePayStore = defineStore('counter', () => {
    const pay = ref("")
    
    async function listTypePay() {
      try {
        return await axios.get("https://project-panelero.onrender.com/tipoPago")
      } catch (error) {
        console.log(error);
      }
    }

    async function newTypePay(name) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/tipoPago`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putTypePay(id, name) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/tipoPago/${id}`,{
             name: name,

            })
          } catch (error) {
            console.log(error);
          }
    }

    async function active(id, estado){
      try {

        return await axios.put(`https://project-panelero.onrender.com/tipoPago/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion

      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listTypePay, pay, active, newTypePay, putTypePay }
  })