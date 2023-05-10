import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const workStore = defineStore('counter', () => {
    const work = ref("")
    
    async function listWork() {
      try {
        return await axios.get("http://localhost:3500/tipoLabor")
      } catch (error) {
        console.log(error);
      }
    }
    async function newWork(name, area, dailyPayment) {
        try {
            return await axios.post(`http://localhost:3500/tipoLabor`,{
              name: name,
              area: area,
              dailyPayment: dailyPayment
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/tipoLabor/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listWork, work, active, newWork }
  })