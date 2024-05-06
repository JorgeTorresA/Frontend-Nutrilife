import { useState, useEffect } from "react";
import useHistorial from "../hooks/useHistorial";
import ListaHistorial from "./ListaHistorial";
import usePacientes from "../hooks/usePacientes";

const ListadoHistorial = () => {
  const { historial } = useHistorial();
  const { pacientes } = usePacientes();
  

  const [error, setError] = useState(null); // Estado para manejar errores
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtrovencimiento, setFiltroVencimiento] = useState("");
  const [filtroFecha, setFiltroFecha] = useState(""); // Nuevo estado para el filtro de fecha
  const [fechasExpandidas, setFechasExpandidas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
 

  useEffect(() => {
    if (!Array.isArray(pacientes)) {
      setError("No se pudieron cargar los pacientes"); // Establecer un mensaje de error
    }
  }, [pacientes]);

  if (error) {
    // Si hay un error, recargar la página
    window.location.reload();
  }

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, "0");
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, "0");
    const año = fechaObj.getFullYear();
    return `${año}-${mes}-${dia}`; // Formato de fecha compatible con el input type="date"
  };

  const agruparPagosPorDia = (pagos) => {
    const pagosPorDia = {};
    pagos.forEach((item) => {
      const fecha = formatearFecha(item.fechaPago);
      if (!pagosPorDia[fecha]) {
        pagosPorDia[fecha] = [];
      }
      pagosPorDia[fecha].push(item);
    });
    return pagosPorDia;
  };

  const obtenerFechasOrdenadas = () => {
    return Object.keys(agruparPagosPorDia(historial))
      .sort((a, b) => {
        const fechaA = new Date(a);
        const fechaB = new Date(b);
        return fechaA - fechaB;
      })
      .reverse(); // Revertir el orden para obtener de la más reciente a la más antigua
  };

  const limpiarFiltroNombre = () => {
    setFiltroNombre("");
  };

  const limpiarFiltroFecha = () => {
    setFiltroFecha("");
  };
  const limpiarFiltrovencimiento = () => {
    setFiltroVencimiento('');
  }
  const totalPages = Math.ceil(
    Object.keys(agruparPagosPorDia(historial)).length / itemsPerPage
  );

  const filtrarPorNombre = (pagos) => {
    return pagos.filter((item) => {
      return item.clienteNombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase());
    });
  };
  const filtrarPorVencimiento = (pagos, filtroVencimiento) => {
    return pagos.filter((item) => {
      const fechaPago = new Date(item.vencimiento);
      const fechaFiltro = new Date(filtroVencimiento);
      
      const fechaPagoSinHora = new Date(
        fechaPago.getFullYear(),
        fechaPago.getMonth(),
        fechaPago.getDate()
      );
      const fechaFiltroSinHora = new Date(
        fechaFiltro.getFullYear(),
        fechaFiltro.getMonth(),
        fechaFiltro.getDate()
      );
      
      return fechaPagoSinHora.getTime() === fechaFiltroSinHora.getTime();
    });
  };
  

  const filtrarPorFecha = (pagos) => {
    if (!filtroFecha) return pagos; // Si no hay filtro de fecha, retornar todos los pagos
    const fechaFiltro = new Date(filtroFecha);
    return pagos.filter((item) => {
      const fechaPago = new Date(formatearFecha(item.fechaPago));
      return fechaPago.getTime() === fechaFiltro.getTime();
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="font-black text-3xl text-center mb-12">
        Historial de Pagos
      </h2>
      <div className="mb-4 mt-4 flex items-center justify-start mx-14 gap-9 relative">
      <div className="mb-4 mt-4 flex flex-col items-center sm:flex-row sm:justify-start sm:items-center mx-14 gap-9 relative">
  <div className="flex relative mb-2 sm:mb-0">
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={filtroNombre}
      onChange={(e) => setFiltroNombre(e.target.value)}
      className="border border-gray-300 rounded-md p-2 pr-8"
    />
    {filtroNombre && (
      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 text-gray-500 cursor-pointer"
        onClick={limpiarFiltroNombre}
      >
        &#x2716;
      </span>
    )}
  </div>
  <div className="flex relative">
    <input
      type="date"
      placeholder="Vencimiento"
      value={filtrovencimiento}
      onChange={(e) => setFiltroVencimiento(e.target.value)}
      className="border border-gray-300 rounded-md p-2 pr-12 w-full sm:w-auto"
    />
    {filtrovencimiento && (
      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 text-gray-500 cursor-pointer"
        onClick={limpiarFiltrovencimiento}
      >
        &#x2716;
      </span>
    )}
  </div>
</div>

      </div>

      {obtenerFechasOrdenadas()
        .slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
        .map((fecha) => {
          const estaExpandida = fechasExpandidas.includes(fecha);
          let pagosDelDia; 
          if (filtrovencimiento) {
            // Si hay un filtro de vencimiento, aplicar el filtrado por vencimiento
            pagosDelDia = filtrarPorVencimiento(
              filtrarPorNombre(agruparPagosPorDia(historial)[fecha]),
              filtrovencimiento
            );
          } else {
            // Si no hay filtro de vencimiento, aplicar el filtrado por fecha
            pagosDelDia = filtrarPorFecha(
              filtrarPorNombre(agruparPagosPorDia(historial)[fecha])
            );
          }
        
          return (
            pagosDelDia.length > 0 && (
              <div key={fecha} className="">
                <h1
                  className="ps-6 cursor-pointer text-lg font-bold mt-4 mb-2"
                  onClick={() => {
                    setFechasExpandidas((prevFechasExpandidas) => {
                      if (estaExpandida) {
                        return prevFechasExpandidas.filter((f) => f !== fecha);
                      } else {
                        return [...prevFechasExpandidas, fecha];
                      }
                    });
                  }}
                >
                  Pagos del día {fecha}
                </h1>
                {estaExpandida &&
                  pagosDelDia.map((item, index) => (
                    <ListaHistorial
                      key={`${fecha}-${index}`}
                      historial={item}
                      mostrarEncabezado={index === 0}
                      paciente={
                        pacientes.find(
                          (paciente) => paciente._id === item.clienteId 
                        ) ||
                        pacientes.find(
                          (paciente) => paciente.nombre === item.clienteNombre
                        )  ||
                         pacientes.find(
                          (paciente) => paciente.fechavencimiento === item.fechavencimiento ===item.vencimiento
                        )  
                      }
                    />
                  ))}
              </div>
            )
          );
        })}

      <div className="flex justify-between items-center mx-14 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md"
        >
          Anterior
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md mb-4"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListadoHistorial;
