import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const unitsStore = defineStore('counter', () => {
    const unit = ref("")
    
    async function listUnits() {
      try {
        return await axios.get("http://localhost:3500/unidadesMedida")
      } catch (error) {
        console.log(error);
      }
    }
    async function newUnits(name,format) {
        try {
            return await axios.post(`http://localhost:3500/unidadesMedida`,{
              name: name,
              format: format
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/unidadesMedida/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listUnits, unit, active, newUnits }
  })