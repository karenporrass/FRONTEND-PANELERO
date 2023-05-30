import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const workStore = defineStore('counter', () => {
    const work = ref("")
    
    async function listWork() {
      try {
        return await requestAxios.get("/tipoLabor/all")
      } catch (error) {
        console.log(error);
      }
    }

    async function listWorkActive() {
      try {
        return await requestAxios.get("/tipoLabor/Active")
      } catch (error) {
        console.log(error);
      }
    }

    
    async function newWork(name, area, dailyPayment) {
        try {
            return await requestAxios.post(`/tipoLabor`,{
              name: name,
              area: area,
              dailyPayment: dailyPayment
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putWork(id, name, area, dailyPayment) {
        try {
            return await requestAxios.put(`/tipoLabor/update/${id}`,{

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
        return await requestAxios.put(`/tipoLabor/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listWork, work, active, newWork, putWork, listWorkActive }
  }, {
    persist: true,
  },
  )