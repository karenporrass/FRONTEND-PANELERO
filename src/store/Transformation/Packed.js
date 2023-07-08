import { defineStore } from 'pinia';
import { requestAxios } from '../../Global/axios';
import { notifyError, notifySuccess } from "../../Global/notify.js";
import { LoginStore } from "../../store/Login/login.js";


export const usePackedStore = defineStore('usePackedStore', () => {
      const useToken = LoginStore();

    const listPacked = async()=> {
      try {
        let r= await requestAxios.get("/empacados/packed" , {
          headers: {
            token: useToken.token,
          },
        });
        console.log(r);
        return r
      } catch (error) {
        console.log(error);
        notifyError("No fue posible obtener los empacados")
      }
    }
    
    
    const postPacked = async (infoPacked) => {
      console.log("post");
      try {
        await requestAxios.post("/empacados/register", infoPacked, {
          headers: {
            token: useToken.token,
          },
        });
        notifySuccess("Nuevo empaquetado guardado correctamente")
      } catch (error) {
        console.log(infoPacked);
        console.log(error);
        notifyError(error.response.data.errors.join(', '))
      }
    }
    
        async function active(id, estado){
          try {
          await requestAxios.put(`/empacados/state/${id}`, {state:estado}, {
          headers: {
            token: useToken.token,
          },
        });
          notifySuccess("Estado cambiado correctamente")
          } catch (error) {
            console.log(error);
            return error
          }
        }
    
        const updatePacked = async (id, infoPacked) => {
          console.log(infoPacked);
          try {
            await requestAxios.put(`/empacados/update/${id}`, infoPacked, {
          headers: {
            token: useToken.token,
          },
        });
            notifySuccess("Empaquetado editado correctamente")
          } catch (error) {
            console.log(infoPacked);
            console.log(error);
            notifyError(error.response.data.errors.join(', '))
          }
        };

        async function listPackagingActive() {
          try {
            return await requestAxios.get("/tipoEmpaque/active", {
          headers: {
            token: useToken.token,
          },
        });
          } catch (error) {
            console.log(error);
          }
        }
      
        async function listPanelaActive() {
          try {
            return await requestAxios.get("/tipoPanela/active" , {
          headers: {
            token: useToken.token,
          },
        });
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