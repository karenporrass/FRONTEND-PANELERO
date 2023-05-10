import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const packaigingStore = defineStore('counter', () => {
    const packaiging = ref("")
    
    async function listPackaiging() {
      try {
        return await axios.get("http://localhost:3500/tipoEmpaque")
      } catch (error) {
        console.log(error);
      }
    }
    async function newPackaiging(name, maxWeight, units) {
        try {
            return await axios.post(`http://localhost:3500/tipoEmpaque`,{
              name: name,
              maxWeigth: maxWeight,
              unitsPerBox: units
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/tipoEmpaque/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPackaiging, packaiging, active, newPackaiging}
  })