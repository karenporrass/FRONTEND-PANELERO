import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";


export const packagingStore = defineStore('packagingStore', () => {
    const packaging = ref("")
    
    async function listPackaging() {
      try {
        return await requestAxios.get("/tipoEmpaque/all")
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de empaques');

      }
    }

    async function listPackagingActive() {
    try {
      return await requestAxios.get("/tipoEmpaque/active")
    } catch (error) {
      console.log(error);
    }
  }

    async function newPackaging(name, maxWeight, units) {
        try {
             await requestAxios.post(`/tipoEmpaque`,{
              name: name,
              maxWeigth: maxWeight,
              unitsPerBox: units
            });
            notifySuccess('Tipo de empaque registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function putPackaging(id, name, maxWeight, units) {
        try {
             await requestAxios.put(`/tipoEmpaque/update/${id}`,{
              name: name,
              maxWeigth: maxWeight,
              unitsPerBox: units
            });
            notifySuccess('TIpo de empaque actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/tipoEmpaque/state/${id}`, {state:estado});
        notifySuccess('Estado cambiado correctamente');
        //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listPackaging, packaging, active, newPackaging, putPackaging, listPackagingActive}
  }, {
    persist: true,
  }
  );