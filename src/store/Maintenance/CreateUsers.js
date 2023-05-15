import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"
import {requestAxios} from "../../Global/axios.js"

export const usersStore = defineStore('counter', () => {
    const user = ref("")
    
    async function listUsers() {
      console.log("listUsers")
      try {
        return await requestAxios.get("/usuarios")
      } catch (error) {
        console.log(error);
      }
    }
    async function newUsers(names, lastNames,typeDocument, numberDocument, rol,cel, address, email) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/usuarios`,{
             names: names,
             lastNames: lastNames,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: numberDocument
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putUsers(id, names, lastNames,typeDocument, numberDocument, rol,cel, address, email) { //recivir las variables 
        try {
            return await axios.put(`https://project-panelero.onrender.com/usuarios/update/${id}`,{
             names: names,
             lastNames: lastNames,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: numberDocument
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/usuarios/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listUsers, user, active, newUsers, putUsers }
  })