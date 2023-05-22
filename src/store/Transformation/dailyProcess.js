import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"
import { requestAxios } from '../../Global/axios'

export const useDailyStore = defineStore('counter', () => {
    const daily = ref("")
    
    async function listDaily() {
      try {
        return await requestAxios.get("/procesoDiario")
      } catch (error) {
        console.log(error);
      }
    }

  
    async function addDailyProcess(infoDialy){
      try {
        return await requestAxios.post("/procesoDiario",infoDialy {
        })
        console.log(infoDialy);
      } catch (error) {
        console.log(error);
      }
    }
    
    async function active(id, estado){
      try {
        return await requestAxios.put("/procesoDiario/state/${id}", {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }


    async function edit(){
      try{
        return await requestAxios.put(`/procesoDiario/update/${id}`, {name:nombre, description: descripcion, hours: horas, people: personas, date: fecha, lot: lote})
      } catch (error){
        console.log(error);
        return error
      }
    }
  
    return { listDaily, daily, active, addDailyProcess, edit }
  })
