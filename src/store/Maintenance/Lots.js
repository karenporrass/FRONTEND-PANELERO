import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const lotsStore = defineStore('counter', () => {
    const lots = ref("")
    
    async function listlots() {
      try {
        return await axios.get("https://project-panelero.onrender.com/lotes")
      } catch (error) {
        console.log(error);
      }
    }
    async function newlots(name, extent) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/lotes`,{
              name: name,
              extent: extent
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/lotes/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listlots, lots, active, newlots }
  })