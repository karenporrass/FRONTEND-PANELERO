import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const useTransformedStore = defineStore('counter', () => {
    const transformed = ref("")
    
    async function listTransformed() {
      try {
        return await axios.get("http://localhost:3500/materiaTransformada")
      } catch (error) {
        console.log(error);
      }
    }
    
    
    async function addTransformed(type, quantity, lot, date) {
      try {
        return await axios.post(`http://localhost:3500/materiaTransformada`,{
          type: type,
          quantity: quantity,
          lot: lot,
          date: date,
        })
      } catch (error) {
        console.log(error);
      }
    }
    
    
        async function active(id, estado){
          try {
            return await axios.put(`http://localhost:3500/materiaTransformada/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
          } catch (error) {
            console.log(error);
            return error
          }
        }
    
    return { listTransformed, transformed, active, addTransformed }
  })