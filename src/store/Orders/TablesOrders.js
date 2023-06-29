import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";
import {LoginStore} from "../../store/Login/login.js"



export const OrderStore = defineStore('counter', () => {
    const order = ref("")
    const useToken = LoginStore();

    async function listOrders() {
        
        try {
          return await requestAxios.get("/pedido", {
            headers: {
              token: useToken.token,
            }});
        } catch (error) {
          console.log(error);
          notifyError('No fue posible obtener los pedidos');
        }
      }

      async function newOrder(Documento, Telefono, TipoPanela, Cantidad, ComprobantePago, SaldoPendiente,
        Nombre,Direccion,TipoEmpaque,Abono,ValorTotal) {
        try {
          return await requestAxios.post(
            '/pedido',         {
                Documento: Documento,
                Telefono: Telefono,
                TipoPanela: TipoPanela,
                Cantidad: Cantidad,
                ComprobantePago:ComprobantePago ,
                SaldoPendiente: SaldoPendiente,
                Nombre: Nombre, 
                Direccion: Direccion,
                TipoEmpaque: TipoEmpaque,
                Abono: Abono,
                ValorTotal: ValorTotal,
           
            }, 
            { headers: {
              token: useToken.token,
            },
          }),
            notifySuccess('Pedido registrado correctamente');
            }catch (error) {
            console.log(error);
            notifyError(error.response.data.errors.join(", "));
            }
      }
    


      async function putOrder(id,documento, telefono, TipoPanela, cantidad, comprobantePago, saldopendiente, nombre,direccion,TipoEmpaque,abono,valorTotal) { //recivir las variables 
        try {

          return await requestAxios.put(
            `/pedido/editar/${id}`,
            {
              Documento: documento,
              Telefono: telefono,
              TipoPanela: TipoPanela,
              Cantidad: cantidad,
              ComprobantePago:comprobantePago ,
              SaldoPendiente: saldopendiente,
              Nombre: nombre,
              Direccion: direccion,
              TipoEmpaque: TipoEmpaque,
              Abono: abono,
              ValorTotal: valorTotal
            },
            { 
              headers: {
              token: useToken.token,
            },
          }),
            notifySuccess('Pedido actualizado correctamente')
            
          } catch (error) {
            console.log(error);
            notifyError(error.response.data.errors.join(", "));
          }
      }
    
      async function active(id,estado) {
        console.log("state");
        try {
          return await requestAxios.put(
            `/pedido/state/${id}`,
            { state: estado },
            { 
              headers: {
              token: useToken.token,
            }}),
            notifySuccess('Estado cambiado correctamente');
        } catch (error) {
          console.log(error);
          console.log("actualiza");
          return error;
        }
      }

      async function listPanelaActive() {
        try {
          return await requestAxios.get("/tipoPanela/active",  { 
            headers: {
            token: useToken.token,
          }})
        } catch (error) {
          console.log(error);
        }
      }

      async function listPackagingActive() {
        try {
          return await requestAxios.get("/tipoEmpaque/active",  { 
            headers: {
            token: useToken.token,
          }})
        } catch (error) {
          console.log(error);
        }
      }


    
      return { listOrders, newOrder, putOrder, active, listPanelaActive, order, listPackagingActive } },
      {persist:true});
 
    