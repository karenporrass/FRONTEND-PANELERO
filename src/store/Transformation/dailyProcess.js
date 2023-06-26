import { defineStore } from "pinia";
import { requestAxios } from "../../Global/axios";
import { notifyError, notifySuccess } from "../../Global/notify.js";

export const useDailyStore = defineStore(
  "Daily",
  () => {
    
    
    const getDaily = async () => {
      try {
        return await requestAxios.get("/procesoDiario/dailyProcess");
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los procesos diarios');
      }
    };


    async function listDailyActive() {
      try {
        let r= await requestAxios.get("/procesoDiario/dailyProcess/active", {
          headers: {
            token: useToken.token,
          },
      });
      return r
      } catch (error) {
        console.log(error);
        return error
      }
    };


    
    const postDaily = async (infoDaily) => {
      console.log("post");
      try {
        await requestAxios.post("/procesoDiario/register", infoDaily, {
        });
        notifySuccess('Proceso diario registrado correctamente');
      } catch (error) {
        console.log(infoDaily);
        console.log(error);
        notifyError(error.response.data.errors.join(", "));

      }
    };

    async function active(id, estado) {
      try {
        await requestAxios.put(`/procesoDiario/state/${id}`, {
          state: estado,
        });
        notifySuccess('Estado cambiado correctamente');
      } catch (error) {
        console.log(error);
        return error;
      }
    }

    const updateDaily = async (id, infoDaily) => {
      console.log(infoDaily);
      try {
        await requestAxios.put(`/procesoDiario/update/${id}`,infoDaily,{
          });
          notifySuccess('Proceso diario actualizado correctamente');
      } catch (error) {
        console.log(infoDaily);
        console.log(error);
        notifyError(error.response.data.errors.join(", "));
      }
    };



    return {
      getDaily,
      active,
      postDaily,
      updateDaily,
      listDailyActive
    };
  },
  {
    persist: true,
  }
);
