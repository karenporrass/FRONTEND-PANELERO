import { defineStore } from 'pinia'
import { requestAxios } from '../../Global/axios'


export const useTransformedStore = defineStore('Tranformed', () => {
    
    const listTransformed = async ()=>{
      try {
        return await requestAxios.get("/materiaTransformada",  {
        })
      } catch (error) {
        console.log(error);
        return error
      }
    }
    
    
    const addTransformed= async (infoTrans)=>{  {
      try {
        return await requestAxios.post(`/materiaTransformada`, infoTrans,{

        });
        console.log(infoTrans);
      } catch (error) {
        console.log(error);
      }
    }
    
    
        async function active(id, estado){
          try {
            return await requestAxios.put(`/materiaTransformada/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
          } catch (error) {
            console.log(error);
            return error
          }
        }}
    
    return { listTransformed, active, addTransformed }
  }
)

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