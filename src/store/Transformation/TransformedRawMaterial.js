import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const useTransformedStore = defineStore('counter', () => {
    const transformed = ref("")
    
    const listTransformed = computed(async ()=>{
      try {
        return await axios.get("https://project-panelero.onrender.com/materiaTransformada")
      } catch (error) {
        console.log(error);
        return error
      }
    })
    
    
    const addTransformed= computed(async (type, quantity, lot, date)=>{  {
      try {
        return await axios.post(`https://project-panelero.onrender.com/materiaTransformada`,{
          type: type,
          quantity: quantity,
          lot: lot,
          date: date,
        })
      } catch (error) {
        console.log(error);
      }
    }})
    
    
        async function active(id, estado){
          try {
            return await axios.put(`https://project-panelero.onrender.com/materiaTransformada/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
          } catch (error) {
            console.log(error);
            return error
          }
        }
    
    return { listTransformed, transformed, active, addTransformed }
  }) 


  // export const useTransformedStore = defineStore('transf',{
  //   state:()=>({

  //   }),
  //   actions:{
  //     async listTransformed() {
  //       try {
  //         return await axios.get("https://project-panelero.onrender.com/materiaTransformada")
  //       } catch (error) {
  //         console.log(error);
  //         return error
  //       }
  //     }
  //   }
  // })