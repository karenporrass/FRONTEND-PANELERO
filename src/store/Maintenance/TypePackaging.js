import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const packagingStore = defineStore('packagingStore', () => {
    const packaging = ref("")
    const useToken = LoginStore();
    
    async function listPackaging() {
      try {
        return await requestAxios.get("/tipoEmpaque/all",
        {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de empaques');

      }
    }

    async function listPackagingActive() {
    try {
      return await requestAxios.get("/tipoEmpaque/active", {
        headers: {
       token: useToken.token,
     },})
    } catch (error) {
      console.log(error);
    }
  }

    async function newPackaging(name, maxWeigth, unitsPerBox) {
        try {
             await requestAxios.post(`/tipoEmpaque`,{
              name: name,
              maxWeigth:  maxWeigth,
              unitsPerBox: unitsPerBox
            },{
              headers: {
             token: useToken.token,
           }});
            notifySuccess('Tipo de empaque registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function putPackaging(id, name, maxWeigth, unitsPerBox) {
        try {
             await requestAxios.put(`/tipoEmpaque/update/${id}`,{
              name: name,
              maxWeigth: maxWeigth,
              unitsPerBox:unitsPerBox
            },
            {
              headers: {
             token: useToken.token,
           }});
            notifySuccess('TIpo de empaque actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/tipoEmpaque/state/${id}`, {state:estado}, {
          headers: {
         token: useToken.token,
       }});
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