import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const farmRegistryStore = defineStore('counter', () => {
    const farm = ref("")
    
    async function listFarms() {
      try {
        return await axios.get("http://localhost:3500/registroFinca")
      } catch (error) {
        console.log(error);
      }
    }
    async function newFarm(name, registrationNumber, extent) {
        try {
            return await axios.post(`http://localhost:3500/refistroFinca`,{
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
        return await axios.put(`http://localhost:3500/registroFinca/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listFarms, farm, active, newFarm }
  })