import { defineStore } from 'pinia'
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"


export const usersStore = defineStore('usersStore', () => {
  const useToken = LoginStore();
  
    async function listUsers() {
      console.log("listUsers")
      try {
        return await requestAxios.get("/usuarios/all", {
          headers: {
            token: useToken.token,
          },
      });

      } catch (error) {
        console.log(error);
        notifyError('No fue posible obtener los Usuarios');

      }
    }

    async function listUsersActive() {
      console.log("listUsersActive")
      try {
        let r= await requestAxios.get("/usuarios/active", {
          headers: {
            token: useToken.token,
          },
      });
      console.log("hola users");
      return r
      } catch (error) {
        console.log(error);
        return error
      }
    }

    async function listDocuments() {
      try {
        return await requestAxios.get("/tipoDocumento/active",{ headers: {
          token: useToken.token,
        },})
      } catch (error) {
        console.log(error);
      }
    }
    
    async function newUsers(names,typeDocument, numberDocument, rol,cel, address, email, emergencyPersonName, emergencyPersonPhone, token ) {
        try {
             await requestAxios.post(`/usuarios`,{
             names: names,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: numberDocument,
             emergencyPersonName: emergencyPersonName,
            emergencyPersonPhone: emergencyPersonPhone
            },
            { headers: {
              token: useToken.token,
            },
          });
            notifySuccess('Nuevo usuario registrado correctamente');
          } catch (error) {
            console.log(error);
          }
      }

      async function putUsers(id, names, typeDocument, numberDocument, rol,cel, address, email, password , emergencyPersonName, emergencyPersonPhone ) { //recivir las variables 
        try {
            await requestAxios.put(`/usuarios/update/${id}`,
            {
             names: names,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: password,
             emergencyPersonName: emergencyPersonName,
              emergencyPersonPhone: emergencyPersonPhone
            },
            { headers: {
              token: useToken.token,
            },
          });
            notifySuccess('Usuario actualizado correctamente');

          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
       await requestAxios.put(`/usuarios/state/${id}`,
       {state:estado},
       {
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
  
    

    return { listUsers, active, newUsers, putUsers, listDocuments, listUsersActive}
  },
  {
    persist: true,
  }
  );