import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const epsStore = defineStore('counter', () => {
    const eps = ref("")
    
    async function listEps() {
      try {
        return await axios.get("http://localhost:4500/eps")
      } catch (error) {
        console.log(error);
      }
    }
    async function newEps(name, attentionLine) {
        try {
            return await axios.post(`http://localhost:4500/eps`,{
                name: name,
                attentionLine: attentionLine
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:4500/eps/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listEps, eps, active, newEps }
  })