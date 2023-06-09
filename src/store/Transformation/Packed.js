import { defineStore } from 'pinia'
import { requestAxios } from '../../Global/axios'


export const usePackedStore = defineStore('usePackedStore', () => {
    
    const listPacked = async()=> {
      try {
        let r= await requestAxios.get("/empacados/packed")
        console.log(r);
        return r
      } catch (error) {
        console.log(error);
      }
    }
    
    
    const postPacked = async (infoPacked) => {
      console.log("post");
      try {
        return await requestAxios.post("/empacados/register",infoPacked, {
        });
      } catch (error) {
        console.log(infoPacked);
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
    
        const updatePacked = async (id, infoPacked) => {
          console.log(infoPacked);
          try {
            return await requestAxios.put(`/empacados/update/${id}`, infoPacked, {
              // headers: {
              //   token,
              // },
            });
          } catch (error) {
            console.log(infoPacked);
            console.log(error);
          }
        };

        async function listPackagingActive() {
          try {
            return await requestAxios.get("/tipoEmpaque/active")
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

        

      


    return { listPacked, postPacked, active,  updatePacked, listPackagingActive, listPanelaActive }
  },
  {
    persist: true,
  },
  )