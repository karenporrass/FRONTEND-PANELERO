import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const packagingStore = defineStore('counter', () => {
    const packaging = ref("")
    
    async function listPackaging() {
      try {
        return await requestAxios.get("/tipoEmpaque/packaing")
      } catch (error) {
        console.log(error);
      }
    }
    async function newPackaging(name, maxWeight, units) {
        try {
            return await requestAxios.post(`/tipoEmpaque`,{
              name: name,
              maxWeigth: maxWeight,
              unitsPerBox: units
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putPackaging(id, name, maxWeight, units) {
        try {
            return await requestAxios.post(`/tipoEmpaque/${id}`,{
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
        return await requestAxios.put(`/tipoEmpaque/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPackaging, packaging, active, newPackaging, putPackaging}
  })