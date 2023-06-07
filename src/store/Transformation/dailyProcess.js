import { defineStore } from "pinia";
import { requestAxios } from "../../Global/axios";
// import { notifyError, notifySuccess } from "../../Global/notify.js";

export const useDailyStore = defineStore(
  "Daily",
  () => {
    const getDaily = async () => {
      try {
        await requestAxios.get("/procesoDiario/dailyProcess");
      } catch (error) {
        console.log(error);
        // notifyError(error.response.data.errors.join(", "));
      }
    };
    const postDaily = async (infoDaily) => {
      console.log("post");
      try {
         await requestAxios.post("/procesoDiario/register", infoDaily, {
        });
      } catch (error) {
        console.log(infoDaily);
        console.log(error);
      }
    };

    async function active(id, estado) {
      try {
        return await requestAxios.put(`/procesoDiario/state/${id}`, {
          state: estado,
        }); //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error;
      }
    }

    const updateDaily = async (id, infoDaily) => {
      console.log(infoDaily);
      try {
        let r = await requestAxios.put(`/procesoDiario/update/${id}`,infoDaily,{
          }
        );
        console.log(r);
        return r;
      } catch (error) {
        console.log(infoDaily);
        console.log(error);
        return error;
      }
    };

    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca/active");
      } catch (error) {
        console.log(error);
      }
    }
    async function listUsersActive() {
      console.log("listUsersActive");
      try {
        return await requestAxios.get("/usuarios/active");
      } catch (error) {
        console.log(error);
      }
    }

    async function listlotsActive() {
      try {
        return await requestAxios.get("/lotes/active");
      } catch (error) {
        console.log(error);
      }
    }

    return {
      getDaily,
      active,
      postDaily,
      updateDaily,
      listFarmsActive,
      listUsersActive,
      listlotsActive,
    };
  },
  {
    persist: true,
  }
);
