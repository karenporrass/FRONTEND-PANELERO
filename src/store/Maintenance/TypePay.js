import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const payStore = defineStore('counter', () => {
    const pay = ref("")
    
    async function listPays() {
      try {
        return await axios.get("http://localhost:3500/tipoPago")
      } catch (error) {
        console.log(error);
      }
    }
    async function newPays(name) {
        try {
            return await axios.post(`http://localhost:3500/tipoPago`,{
             name: name,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/tipoPago/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPays, pay, active, newPays }
  })