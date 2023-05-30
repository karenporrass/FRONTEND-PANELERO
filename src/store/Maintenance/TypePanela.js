import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const panelaStore = defineStore('counter', () => {
    const panela = ref("")
    
    async function listPanela() {
      try {
        return await requestAxios.get("/tipoPanela/all")
      } catch (error) {
        console.log(error);
      }
    }

    async function listPanelaActive() {
    try {
      return await requestAxios.get("/tipoPanela/active")
    } catch (error) {
      console.log(error);
    }
  }

    async function newPanela(name, price) {
        try {
            return await requestAxios.post(`/tipoPanela`,{
              name: name,
              price: price
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putPanela(id, name, price) {
        try {
            return await requestAxios.put(`/tipoPanela/update/${id}`,{
              name: name,
              price: price
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/tipoPanela/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { panela, listPanela, listPanelaActive, newPanela, putPanela, active}
  },
  {
    persist: true,
  },)