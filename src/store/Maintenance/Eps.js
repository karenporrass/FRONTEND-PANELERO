import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const epsStore = defineStore('counter', () => {
    const eps = ref("")
    
    async function listEps() {
      try {
        return await requestAxios.get("/eps/all")
      } catch (error) {
        console.log(error);
      }
    }

    async function listEpsActive() {
      try {
        return await requestAxios.get("/eps/aactive")
      } catch (error) {
        console.log(error);
      }
    }

    async function newEps(name, attentionLine) {
        try {
            return await requestAxios.post(`/eps`,{
                name: name,
                attentionLine: attentionLine
            })
          } catch (error) {
            console.log(error);
          }
      }
      async function putEps(id, name, attentionLine) {
        try {
            return await requestAxios.put(`/eps/update/${id}`,{
                name: name,
                attentionLine: attentionLine
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/eps/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listEps, eps, active, newEps, putEps, listEpsActive }
  },
   {
    persist: true,
  },
  )