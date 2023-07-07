import { defineStore } from 'pinia'
import { requestAxios } from '../../Global/axios'
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const storeTransformed = defineStore('storeTransformed', () => {
  const useToken = LoginStore();

    const listTransformed = async ()=>{
      try {
        return await requestAxios.get("/materiaTransformada/transformed", {
          headers: {
            token: useToken.token,
          },
      });
      } catch (error) {
        console.log(error);
        notifyError("No fue posible obtener las materias primas transformadas")
        return error
      }
    }
    
    
    const addTransformed = async (infoTrans)=>  {
      try {
        await requestAxios.post(`/materiaTransformada/register`, infoTrans, {
          headers: {
            token: useToken.token,
          },
        });
        console.log(infoTrans);
        notifySuccess('Materia prima transformada registrada correctamente ')

      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        notifyError(error.response.data.errors.join(', '))
      }
    }
    
  
    
        const active = async (id, estado)=>{ 
          try {
            await requestAxios.put(`/materiaTransformada/state/${id}`, {state:estado}, {
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
    

    const updateTransformed = async (id, infoTrans) => {
      console.log(infoTrans);
      try {
        await requestAxios.put(`/materiaTransformada/update/${id}`, infoTrans, {
          headers: {
            token: useToken.token,
          },
        });
        console.log(infoTrans);
        notifySuccess('Materia prima transformada editada correctamente')
      } catch (error) {
        console.log(error);

        notifyError(error.response.data.errors.join(', '))


      }
    };


    async function listUnitsActive() {
      try {
        return await requestAxios.get("/unidadesMedida/active", {
          headers: {
            token: useToken.token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }


    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca/active", {
          headers: {
            token: useToken.token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function listlotsActive() {
      try {
        return await requestAxios.get("/lotes/active" , {
          headers: {
            token: useToken.token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function listDailyActive() {
      try {
        return await requestAxios.get("/procesoDiario/dailyProcess/active", {
          headers: {
            token: useToken.token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    
      return { listDailyActive, listTransformed,  addTransformed, active, updateTransformed, listUnitsActive, listFarmsActive,listlotsActive }
    },
    {
      persist: true,
    },
  )
