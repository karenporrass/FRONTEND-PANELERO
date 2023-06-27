import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";



export const OrderStore = defineStore('counter', () => {
    const order = ref("")
    
    async function listOrders() {
        
        try {
          return await requestAxios.get("/pedido");
        } catch (error) {
          console.log(error);
          notifyError('No fue posible obtener los pedidos');
        }
      }

      async function newOrder(documento, telefono, tipoPanela, cantidad, comprobantePago, saldopendiente,
        nombre,direccion,tipoEmpaque,abono,valorTotal,token) {
        try {
          return await requestAxios.post(
            '/pedido',         {
                Documento: documento,
                Telefono: telefono,
                TipoPanela: tipoPanela,
                Cantidad: cantidad,
                ComprobantePago:comprobantePago ,
                SaldoPendiente: saldopendiente,
                Nombre: nombre, 
                Direccion: direccion,
                TipoEmpaque: tipoEmpaque,
                Abono: abono,
                ValorTotal: valorTotal,
                token: token
            }, 
            { headers: {
              token: useToken.token,
            },
          });
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
          });
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
            }});
            notifySuccess('Estado cambiado correctamente');
        } catch (error) {
          console.log(error);
          console.log("actualiza");
          return error;
        }
      }

      async function listPanelaActive() {
        try {
          return await requestAxios.get("/tipoPanela/active")
        } catch (error) {
          console.log(error);
        }
      }

      async function listPackagingActive() {
        try {
          return await requestAxios.get("/tipoEmpaque/active")
        } catch (error) {
          console.log(error);
        }
      }


    
      return { listOrders, newOrder, putOrder, active, listPanelaActive, order, listPackagingActive } },
      {persist:true});
 
    