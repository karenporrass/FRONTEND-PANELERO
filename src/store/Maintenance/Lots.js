import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const lotsStore = defineStore('counter', () => {
    const lots = ref("")
    
    async function listlots() {
      try {
        return await requestAxios.get("/lotes")
      } catch (error) {
        console.log(error);
      }
    }
    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca")
      } catch (error) {
        console.log(error);
      }
    }
    async function newlots(name, extent,farm ) {
        try {
            return await requestAxios.post(`/lotes`,{
              name: name,
              extent: extent,
              farm: farm
            })
          } catch (error) {
            console.log(error);
          }
      }
      async function putlots(id, name, extent, farm) {
        try {
            return await requestAxios.put(`/lotes/update/${id}`,{
              name: name,
              extent: extent, 
              farm: farm
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/lotes/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listlots, lots, active, newlots, putlots, listFarmsActive }
  })