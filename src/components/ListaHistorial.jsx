import { useNavigate } from "react-router-dom";
import useHistorial from "../hooks/useHistorial";
import usePacientes from "../hooks/usePacientes";

const ListaHistorial = ({ historial, mostrarEncabezado, paciente }) => {
  const { eliminarPago } = useHistorial();
  const { setEdicion } = usePacientes();

  // Desestructuración condicional para paciente
  if (!paciente) {
    return null; // O podrías mostrar un mensaje de error o hacer algo más
  }

  const { tipopaquete, fechainiciopaquete, fechavencimiento } = paciente || {};

  const { _id, clienteNombre, fechaPago, monto, formaPago, deudanetaHisto, vencimiento } = historial;

  const navigate = useNavigate();

  const handleEditar = () => {
    setEdicion(paciente);
    navigate("/admin/Formulario", { state: { paciente } });
  };

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    const opcionesFecha = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC" // Establecer la zona horaria a UTC
    };
    let fechaFormateada = nuevaFecha.toLocaleDateString("es-MX", opcionesFecha);
    fechaFormateada = fechaFormateada.replace(/^\w/, (c) => c.toUpperCase());
    return fechaFormateada;
  };
  

  const formatearHora = (fecha) => {
    const nuevaFecha = new Date(fecha);
    const hora = nuevaFecha.getHours().toString().padStart(2, "0");
    const minutos = nuevaFecha.getMinutes().toString().padStart(2, "0");
    return `${hora}:${minutos}`;
  };

  return (
    
    <table className="w-full text-base text-center text-gray-700">
      <thead>
        {mostrarEncabezado && (
          <tr className="bg-green-800 text-white">
            <th style={{ width: "150px" }} className="py-2 px-4">Nombre</th>
            <th style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">Paquete</th>
            <th style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell" >Método de Pago</th>
            <th style={{ width: "150px" }} className="py-2 px-4">Monto</th>
            <th style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">Hora de Pago</th>
            <th style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">Resta</th>
            <th style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">Inicio</th>
            <th style={{ width: "150px" }} className="py-2 px-4">Vencimiento</th>
            <th style={{ width: "150px" }} className="py-2 px-4">+ Dia a Deber</th>
            <th style={{ width: "150px" }} className="py-2 px-4">Eliminar</th>
          </tr>
        )}
      </thead>
      <tbody>
        <tr className="bg-white hover:bg-gray-200" onDoubleClick={handleEditar}>
          <td style={{ width: "150px" }} className="py-2 px-4">{clienteNombre}</td>
          {/* Usar valores predeterminados si paciente es undefined */}
          <td style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">{tipopaquete || ""}</td>
          <td style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">{formaPago}</td>
          <td style={{ width: "150px" }} className="py-2 px-4">${monto}</td>
          <td style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">{formatearHora(fechaPago)} hrs</td>
          <td style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">${deudanetaHisto}</td>
          <td style={{ width: "150px" }} className="py-2 px-4 hidden lg:table-cell">{formatearFecha(fechainiciopaquete)}</td>
          <td style={{ width: "150px" }} className="py-2 px-4">{formatearFecha(vencimiento)}</td>
          <td style={{ width: "150px" }} className="py-2 px-4">{formatearFecha(fechavencimiento)}</td>
          <td style={{ width: "150px" }} className="py-2 px-4 text-center">
            <button
              type="button"
              className="py-0.5 px-2 bg-red-700 hover:bg-red-800 text-white uppercase font-medium rounded-md"
              onClick={() => eliminarPago(_id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListaHistorial;
