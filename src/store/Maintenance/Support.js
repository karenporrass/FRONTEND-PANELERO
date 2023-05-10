import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const supportStore = defineStore('counter', () => {
    const support = ref("")
    
    async function listSupport() {
      try {
        return await axios.get("http://localhost:3500/soporte")
      } catch (error) {
        console.log(error);
      }
    }
    async function newSupport( emailUser, coment) {
        try {
            return await axios.post(`http://localhost:3500/soporte`,{
              emailUser: emailUser,
              coment: coment
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/soporte/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listSupport, support, active, newSupport }
  })