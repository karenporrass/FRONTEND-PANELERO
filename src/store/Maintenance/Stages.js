import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const stagesStore = defineStore('stagesStore', () => {
    const stage = ref("")
    
    async function listStages() {
      try {
        return await requestAxios.get("/etapas/all")
      } catch (error) {
        console.log(error);
      }
    }

    async function listStagesActive() {
      try {
        return await requestAxios.get("/etapas/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function newStage(name, description) {
        try {
            return await requestAxios.post(`/etapas`,{
              name: name,
              description: description,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putStage(id, name, description) {
        try {
            return await requestAxios.put(`/etapas/update/${id}`,{
              name: name,
              description: description,
            })
          } catch (error) {
            console.log(error);
          }
      }

    

    async function active(id, estado){
      try {
        return await requestAxios.put(`/etapas/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listStages, stage, active, newStage, putStage, listStagesActive }
  },
  {
    persist: true,
  },)