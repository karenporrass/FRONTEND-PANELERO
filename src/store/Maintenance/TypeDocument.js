import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const documentStore = defineStore('counter', () => {
    const document = ref("")
    
    async function listDocuments() {
      try {
        return await requestAxios.get("/tipoDocumento/all")
      } catch (error) {
        console.log(error);
      }
    }

    async function listDocumentsActive() {
      try {
        return await requestAxios.get("/tipoDocumento/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function newDocument(name, acronym) {
        try {
            return await requestAxios.post(`/tipoDocumento`,{
              name: name,
              acronym: acronym
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putDocument(id, name, acronym) {
        try {
            return await requestAxios.post(`/tipoDocumento/${id}`,{
              name: name,
              acronym: acronym
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/tipoDocumento/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listDocuments, document, active, newDocument, putDocument, listDocumentsActive }
  })