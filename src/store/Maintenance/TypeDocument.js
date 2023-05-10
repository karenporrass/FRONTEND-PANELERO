import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const documentStore = defineStore('counter', () => {
    const document = ref("")
    
    async function listDocuments() {
      try {
        return await axios.get("http://localhost:3500/tipoDocumento")
      } catch (error) {
        console.log(error);
      }
    }
    async function newDocument(name, acronym) {
        try {
            return await axios.post(`http://localhost:3500/tipoDocumento`,{
              name: name,
              acronym: acronym
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`http://localhost:3500/tipoDocumento/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listDocuments, document, active, newDocument }
  })