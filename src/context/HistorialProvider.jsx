import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const HistorialContext = createContext();

export const HistorialProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await clienteAxios.get("/historial-pagos", config); // Cambio en esta línea
        //console.log(response.data);
        setHistorial(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHistorial();
  }, []);

   const guardarPagos = async ({ id, nombre, anticipo, formadepago, adeudoneto, fechavencimiento }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        id,
        nombre,
        anticipo,
        formadepago,
        adeudoneto,
        fechavencimiento
      };

      const response = await clienteAxios.post(
        "/historial-pagos/almacenar",
        data,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }; 
/*   const guardarPagos = async ({ id, nombre, anticipo, formadepago, adeudoneto, fechavencimiento }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const data = {
        nombre,
        anticipo,
        formadepago,
        adeudoneto,
        fechavencimiento
      };
  
      let response;
  
      if (clienteId) {
        // Si existe un ID, se trata de una actualización
        response = await clienteAxios.put(
          `/historial-pagos/actualizar/${clienteId}`,
          data,
          config
        );
      } else {
        // Si no existe un ID, se trata de crear un nuevo pago
        response = await clienteAxios.post(
          "/historial-pagos/almacenar",
          data,
          config
        );
      } 
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };*/
  

  const eliminarPago = async (id) => {
    //console.log(id);
    const confirmar = confirm("¿Eliminar permanentemente el pago?");

    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { dataPago } = await clienteAxios.delete(`/historial-pagos/${id}`, config);

        const historialActualizado = historial.filter(
          (historialState) => historialState._id !== id
        );

        setHistorial(historialActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <HistorialContext.Provider
      value={{
        historial,
        guardarPagos,
        eliminarPago,
      }}
    >
      {children}
    </HistorialContext.Provider>
  );
};

export default HistorialContext;
