import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const useDailyStore = defineStore('counter', () => {
    const daily = ref("")
    
    async function listDaily() {
      try {
        return await axios.get("https://project-panelero.onrender.com/procesoDiario")
      } catch (error) {
        console.log(error);
      }
    }

  
    async function addDailyProcess(name, description, hours, people, labor, farm, lot, date){
      try {
        return await axios.post(`https://project-panelero.onrender.com/procesoDiario`, {
          name: name,
          description: description,
          hours: hours,
          people: people,
          labor: labor,
          farm: farm,
          lot: lot,
          date: date,
        })
      } catch (error) {
        console.log(error);
      }
    }
    
    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/procesoDiario/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }


    async function edit(){
      try{
        return await axios.put(`https://project-panelero.onrender.com/procesoDiario/update/${id}`, {name:nombre, description: descripcion, hours: horas, people: personas, date: fecha, lot: lote})
      } catch (error){
        console.log(error);
        return error
      }
    }
  
    return { listDaily, daily, active, addDailyProcess, edit }
  })
