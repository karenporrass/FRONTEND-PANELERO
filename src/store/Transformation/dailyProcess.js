import { defineStore } from 'pinia'
import { requestAxios } from '../../Global/axios'

export const useDailyStore = defineStore('Daily', () => {
    
const getDaily = async () =>{
  try {
    return await requestAxios.get("/procesoDiario/dailyProcess"
    //  {
    //   // headers: {
    //   //   token,
    //   // },
    // }
    );
  } catch (error) {
    console.log(error);
    return error
  }
}
    const postDaily = async (infoDaily) => {
      console.log("post");
      try {
        return await requestAxios.post("/procesoDiario/register", infoDaily, {
          // headers: {
          //   token,
          // },
        });
        // console.log(r);
      } catch (error) {
        console.log(infoDaily);
        console.log(error);
        return error
      }
    };

    async function active(id, estado){
      try {
        return await requestAxios.put(`/procesoDiario/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }

    const updateDaily = async (id, infoDaily) => {
      console.log(infoDaily);
      try {
        let r = await requestAxios.put(`/procesoDiario/update/${id}`, infoDaily, {
          // headers: {
          //   token,
          // },
        });
        console.log(r);
        return r
      } catch (error) {
        console.log(infoDaily);
        console.log(error);
        return error
      }
    };

    async function listFarmsActive() {
      try {
        return await requestAxios.get("/registroFinca/active")
      } catch (error) {
        console.log(error);
      }
    }
    async function listUsersActive() {
      console.log("listUsersActive")
      try {
        return await requestAxios.get("/usuarios/active")
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


    return { getDaily, active, postDaily, updateDaily, listFarmsActive, listUsersActive, listlotsActive}
  },
  {
    persist: true,
  },
  )
