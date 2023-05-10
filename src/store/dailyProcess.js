import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const useDailyStore = defineStore('counter', () => {
    const daily = ref("")
    
    async function listDaily() {
      try {
        return await axios.get("http://localhost:3500/procesoDiario")
      } catch (error) {
        console.log(error);
      }
    }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/procesoDiario/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listDaily, daily, active }
  })