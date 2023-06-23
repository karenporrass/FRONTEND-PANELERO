import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const documentStore = defineStore('documentStore', () => {
    const document = ref("")
    const useToken = LoginStore();
    async function listDocuments() {
      try {
        return await requestAxios.get("/tipoDocumento/all", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los tipos de documentos');

      }
    }

    async function listDocumentsActive() {
      try {
        return await requestAxios.get("/tipoDocumento/active", {
          headers: {
         token: useToken.token,
       },})
      } catch (error) {
        console.log(error);
      }
    }

    async function newDocument(name, acronym) {
        try {
            return await requestAxios.post(`/tipoDocumento`,{
              headers: {
             token: useToken.token,
           },},{
              name: name,
              acronym: acronym
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function putDocument(id, name, acronym) {
        try {
             await requestAxios.put(`/tipoDocumento/update/${id}`,{
              headers: {
             token: useToken.token,
           },},{
              name: name,
              acronym: acronym
            });
            notifySuccess('Tipo de documento registrado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
         await requestAxios.put(`/tipoDocumento/state/${id}`,{
          headers: {
         token: useToken.token,
       },}, {state:estado});
        notifySuccess('Estado cambiado correctamente');
        //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listDocuments, document, active, newDocument, putDocument, listDocumentsActive }
  }, {
    persist: true,
  }
  );