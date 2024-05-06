import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const {setEdicion, eliminarPaciente} = usePacientes();
  const { email, fecha, nombre, peso, sintomas, _id } = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <>
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-2 rounded-xl">
        <p className=" font-bold uppercase my-2 text-green-700">
          Nombre:{" "}
          <span className="font-normal text-black normal-case">{nombre}</span>
        </p>

        <p className=" font-bold uppercase my-2 text-green-700">
          Peso:{" "}
          <span className="font-normal text-black normal-case">
            {peso}
          </span>
        </p>

        <p className=" font-bold uppercase my-2 text-green-700">
          Telefono de Contacto:{" "}
          <span className="font-normal text-black normal-case">{telefono}</span>
        </p>

        <p className=" font-bold uppercase my-2 text-green-700">
          Sintomas:{" "}
          <span className="font-normal text-black normal-case">{sintomas}</span>
        </p>

        <p className=" font-bold uppercase my-2 text-green-700">
          Fecha de Alta:{" "}
          <span className="font-normal text-black normal-case">
            {formatearFecha(fecha)}
          </span>
        </p>

        <div className="flex justify-between my-5">
          <button
            type="button"
            className="py-2 px-10 bg-green-600 hover:bg-green-700 text-white uppercase font-bold rounded-lg"
            onClick={() => setEdicion(paciente)}
          >
            Editar
          </button>
          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={() => eliminarPaciente(_id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default Paciente;
