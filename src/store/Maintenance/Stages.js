import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const stagesStore = defineStore('counter', () => {
    const stage = ref("")
    
    async function listStages() {
      try {
        return await axios.get("https://project-panelero.onrender.com/etapas")
      } catch (error) {
        console.log(error);
      }
    }
    async function newStage(name, description) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/etapas`,{
              name: name,
              description: description,
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putStage(id, name, description) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/etapas/${id}`,{
              name: name,
              description: description,
            })
          } catch (error) {
            console.log(error);
          }
      }

    

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/etapas/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listStages, stage, active, newStage, putStage }
  })