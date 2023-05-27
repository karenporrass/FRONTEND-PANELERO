import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const usersStore = defineStore('counter', () => {
    const user = ref("")
    // const axios = requestAxios()
    
    async function listUsers() {
      console.log("listUsers")
      try {
        return await requestAxios.get("/usuarios/user")
      } catch (error) {
        console.log(error);
      }
    }

    async function listDocuments() {
      try {
        return await requestAxios.get("/tipoDocumento/state")
      } catch (error) {
        console.log(error);
      }
    }
    
    async function newUsers(names, lastNames,typeDocument, numberDocument, rol,cel, address, email, emergencyPersonName, emergencyPersonPhone ) {
        try {
            return await requestAxios.post(`/usuarios`,{
             names: names,
             lastNames: lastNames,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: numberDocument,
             emergencyPersonName: emergencyPersonName,
            emergencyPersonPhone: emergencyPersonPhone

            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putUsers(id, names, lastNames,typeDocument, numberDocument, rol,cel, address, email, password , emergencyPersonName, emergencyPersonPhone ) { //recivir las variables 
        try {
            return await requestAxios.put(`/usuarios/update/${id}`,{
             names: names,
             lastNames: lastNames,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: password,
             emergencyPersonName: emergencyPersonName,
              emergencyPersonPhone: emergencyPersonPhone
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await requestAxios.put(`/usuarios/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    async function listUsersActive() {
      try {
        return await requestAxios.get("/usuarios/active")
      } catch (error) {
        console.log(error);
      }
    }

    return { listUsers, user, active, newUsers, putUsers, listDocuments, listUsersActive}
  })