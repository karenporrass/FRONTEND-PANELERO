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
        await requestAxios.post("/procesoDiario/register", infoDaily, {
          // headers: {
          //   token,
          // },
        });
        console.log(infoDaily);
      } catch (error) {
        console.log(error);
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
        await requestAxios.put(`/procesoDiario/update/${id}`, infoDaily, {
          // headers: {
          //   token,
          // },
        });
        console.log(infoDaily);
      } catch (error) {
        console.log(error);
      }
    };




    return { getDaily, active, postDaily, updateDaily}
  })
