import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";

export const unitsStore = defineStore('unitsStore', () => {
    const unit = ref("")
    
    async function listUnits() {
      try {
        return await requestAxios.get("/unidadesMedida/all")
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener las unidades de medida');

      }
    }

    async function listUnitsActive() {
      try {
        return await requestAxios.get("/unidadesMedida/active")
      } catch (error) {
        console.log(error);
      }
    }

    async function newUnits(name,acronym) {
        try {
             await requestAxios.post(`/unidadesMedida`,{
              name: name,
              acronym: acronym
            });
            notifySuccess('Unidad de medida registrada correctamente');

          } catch (error) {
            console.log(error);
          }
      }

     async function putUnits(id,name,acronym) {
        try {
             await requestAxios.put(`/unidadesMedida/update/${id}`,{
              name: name,
              acronym: acronym
            });
            notifySuccess('Unidad de medida actualizads correctamente');


          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/unidadesMedida/state/${id}`, {state:estado});
        notifySuccess('Estado cambiado correctamente');
        //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listUnits, unit, active, newUnits, putUnits, listUnitsActive}
  }, {
    persist: true,
  }
  );