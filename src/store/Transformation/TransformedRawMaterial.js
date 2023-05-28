import { defineStore } from 'pinia'
import { requestAxios } from '../../Global/axios'


export const useTransformedStore = defineStore('Tranformed', () => {
    
    const listTransformed = async ()=>{
      try {
        return await requestAxios.get("/materiaTransformada/transformed"
        );
      } catch (error) {
        console.log(error);
        return error
      }
    }
    
    
    const addTransformed = async (infoTrans)=>{  {
      try {
        return await requestAxios.post(`/materiaTransformada/register`, infoTrans,{

        });
        console.log(infoTrans);
      } catch (error) {
        console.log(error);
      }
    }
    
    
      //   const active = async (id, estado)=>{ {
      //     try {
      //       return await requestAxios.put(`/materiaTransformada/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      //     } catch (error) {
      //       console.log(error);
      //       return error
      //     }
      //   }
    }



    async function listUnitsActive() {
      try {
        return await requestAxios.get("/unidadesMedida/active")
      } catch (error) {
        console.log(error);
      }
    }


    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function listlotsActive() {
      try {
        return await requestAxios.get("/lotes/active")
      } catch (error) {
        console.log(error);
      }
    }



    
      return { listTransformed,  addTransformed, listUnitsActive, listFarmsActive,listlotsActive }
    }
    )
