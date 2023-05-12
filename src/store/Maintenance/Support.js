import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const supportStore = defineStore('counter', () => {
    const support = ref("")
    
    async function listSupport() {
      try {
        return await axios.get("https://project-panelero.onrender.com/soporte")
      } catch (error) {
        console.log(error);
      }
    }
    async function newSupport( emailUser, coment) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/soporte`,{
              emailUser: emailUser,
              coment: coment
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putSupport( id, emailUser, coment) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/soporte/${id}`,{
              emailUser: emailUser,
              coment: coment
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/soporte/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listSupport, support, active, newSupport, putSupport }
  })