import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import usePacientes from "../hooks/usePacientes";
import ListaPaciente from "./ListaPacientes";
import { Link } from "react-router-dom";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  const [busqueda, setBusqueda] = useState("");
  const [indice, setIndice] = useState(0);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  if (!Array.isArray(pacientes)) {
    window.location.reload();
  }

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
    setIndice(0);
    setMostrarTodos(false);
  };

  const handleMostrarTodos = () => {
    setMostrarTodos(true);
  };

  const handleAvanzar = () => {
    if (indice + 5 < pacientesFiltrados.length) {
      setIndice(indice + 5);
    }
  };

  const handleRetroceder = () => {
    if (indice - 5 >= 0) {
      setIndice(indice - 5);
    }
  };

  const handleFechaSeleccionada = (date) => {
    setFechaSeleccionada(date);
    setIndice(0);
    setBusqueda("");
    setMostrarTodos(false);
  };

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const pacientesFiltradosPorFecha = fechaSeleccionada
  ? pacientesFiltrados.filter((paciente) => {
      const fechaPaciente = new Date(paciente.fechaproxcita);
      fechaPaciente.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00
      const fechaSeleccionadaSinHora = new Date(fechaSeleccionada);
      fechaSeleccionadaSinHora.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00
      return fechaPaciente.getTime() === fechaSeleccionadaSinHora.getTime();
    })
  : pacientesFiltrados;

  
  const pacientesOrdenados = pacientesFiltradosPorFecha.reverse(); // Revertir el orden

  const pacientesMostrados = mostrarTodos
    ? pacientesOrdenados
    : pacientesOrdenados.slice(indice, indice + 20);
    
  return (
    <div className="container mx-auto ">
      <h2 className="font-black text-3xl text-center mb-2">
        Listado de Pacientes
      </h2>
      <p className="text-xl mb-50 text-center">
        Administrar Pacientes y
        <span className=" text-green-600 font-bold"> Citas</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center my-6">
        <div className="relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="border border-gray-300 px-4 py-2 rounded-md pr-10 w-5/2"
            value={busqueda}
            onChange={handleBusquedaChange}
          />
          {busqueda && (
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setBusqueda("")}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6.707 6.707a1 1 0 011.414 0L12 10.586l3.879-3.88a1 1 0 111.414 1.414L13.414 12l3.88 3.879a1 1 0 01-1.414 1.414L12 13.414l-3.879 3.88a1 1 0 01-1.414-1.414L10.586 12 6.707 8.121a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="ml-6 md:ml-6"> {/* Separación entre Buscar por nombre y Mostrar Todos */}
          {busqueda && (
            <button
              onClick={handleMostrarTodos}
              className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-1 rounded-md"
            >
              Mostrar Todos
            </button>
          )}
        </div>
        <div className="flex-grow flex justify-center md:mb-0 xl:mb-0 mb-5 mr-14  ">
          <DatePicker
            selected={fechaSeleccionada}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            onChange={handleFechaSeleccionada}
            dateFormat="dd/MM/yyyy"
            placeholderText="Buscar por Fecha de Cita"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            isClearable
          />

        </div>

        <div className="ml-4 md:ml-8">
          <Link to="/admin/Formulario">
            <button
              type="button"
              className="py-2 px-4 bg-green-700 hover:bg-green-800 text-white uppercase font-medium rounded-lg"
            >
              Crear Paciente
            </button>
          </Link>
        </div>
      </div>
      {pacientesMostrados.length ? (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-4 ">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="px-4 py-2 text-center">Nombre</th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Teléfono
                </th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Tipo paquete
                </th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Mesa
                </th>
                <th className="px-4 py-2 text-center hidden xl:table-cell">
                  Dias a Deber
                </th>
                <th className="px-4 py-2 text-center ">
                  Próxima Cita
                </th>
                <th className="px-4 py-2 text-center">Editar</th>
                <th className="px-4 py-2 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {pacientesMostrados.map((paciente) => (
                <ListaPaciente key={paciente._id} paciente={paciente} />
              ))}
            </tbody>
          </table>
          {!mostrarTodos && (
            <div className="flex justify-between items-center">
              <button
                onClick={handleRetroceder}
                disabled={indice === 0}
                className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Retroceder
              </button>
              <p className="text-center mb-4">
                Total de Resultados {pacientesFiltrados.length}
              </p>
              <button
                onClick={handleAvanzar}
                disabled={indice + 10 >= pacientesFiltrados.length}
                className="bg-cyan-700 hover:bg-cyan-800 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Avanzar
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="font-black text-3xl mb-5">
            No hay pacientes en registro
          </h2>
          <p className="text-xl mb-50">
            Comienza agregando pacientes y
            <span className=" text-green-600 font-bold">
              {" "}
              aparecerán en este lugar
            </span>
          </p>
        </div>
      )}
    </div>


  );
};

export default ListadoPacientes;
