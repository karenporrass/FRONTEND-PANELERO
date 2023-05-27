import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const farmRegistryStore = defineStore('counter', () => {
    const farm = ref("")
    
    async function listFarms() {
      try {
        return await requestAxios.get("/registroFinca/all")
      } catch (error) {
        console.log(error);
      }
    }

    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function newFarm(name, registrationNumber, extent) {
        try {
            return await requestAxios.post(`/registroFinca`,{
              name: name,
              registrationNumber: registrationNumber,
             extent: extent
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putFarm(id, name, registrationNumber, extent) {
        try {
            return await requestAxios.post(`/registroFinca/${id}`,{
              name: name,
              registrationNumber: registrationNumber,
             extent: extent
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/registroFinca/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listFarms, farm, active, newFarm, putFarm, listFarmsActive }
  })