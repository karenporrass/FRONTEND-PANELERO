import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"
import { requestAxios } from '../../Global/axios'


export const usePackedStore = defineStore('counter', () => {
    const packed = ref("")
    
    async function listPacked() {
      try {
        return await requestAxios.get("/empacados")
      } catch (error) {
        console.log(error);
      }
    }
    
    
    async function addPacked(cellarCode, typePacking, typePanela, formPanela, totalPanelas) {
      try {
        return await requestAxios.post(`/empacados`,{
          cellarCode: cellarCode,
          typePacking: typePacking,
          typePanela: typePanela,
          formPanela: formPanela,
          totalPanelas: totalPanelas,
        })
      } catch (error) {
        console.log(error);
      }
    }
    
    
        async function active(id, estado){
          try {
            return await requestAxios.put(`/empacados/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
          } catch (error) {
            console.log(error);
            return error
          }
        }
    
    return { listPacked, packed, active, addPacked }
  })