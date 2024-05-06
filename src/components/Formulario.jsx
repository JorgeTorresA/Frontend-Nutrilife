import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import { useLocation } from "react-router-dom";

import useHistorial from "../hooks/useHistorial";

const Formulario = () => {
  const { state } = useLocation();

  const [userState] = useState(state?.paciente || "");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccionDeEntrega, setDireccionDeEntrega] = useState("");
  const [ejercicio, setEjercicio] = useState("");
  const [padecimiento, setPadecimiento] = useState("");
  const [fechainiciopaquete, setFechaInicioPaquete] = useState("");
  const [alergias, setAlergias] = useState("");
  const [tipopaquete, setTipopaquete] = useState("");
  const [especial, setEspecial] = useState("");
  const [mesa, setMesa] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mostrarImagenEnGrande, setMostrarImagenEnGrande] = useState(false);
  const [comidas, setComidas] = useState("");
  const fechaActual = new Date().toISOString().split("T")[0];
  const fechaInicial = userState?.fecha
    ? userState.fecha.split("T")[0]
    : fechaActual;

  const [fecha, setFecha] = useState(fechaInicial);
  const [fechavencimiento, setFechaVencimiento] = useState("");
  const [fechaproxcita, setFechaProxCita] = useState("");
  const [fechavencimientoOld, setFechaVencimientoOld]= useState("");

  const [noconsume, setNoConsume] = useState("");
  const [formadepago, setFormadepago] = useState("");
  const [anticipo, setAnticipo] = useState("0");
  const [adeudoneto, setAdeudoNeto] = useState("");
  const [diasadeber, setDiasADeber] = useState("0");
  const [pago, setPago] = useState("0");
  const [id, setId] = useState(null);

  const [resetAdeudo, setResetAdeudo] = useState(0);
  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();
  const { guardarPagos } = useHistorial();

  useEffect(() => {
    if (userState) {
      console.log("Datos de userState:", userState);
      setNombre(userState.nombre);
      setTelefono(userState.telefono);
      setDireccionDeEntrega(userState.direccionDeEntrega);
      setEjercicio(userState.ejercicio);
      setPadecimiento(userState.padecimiento);
      setAlergias(userState.alergias);
      setTipopaquete(userState.tipopaquete);
      setFormadepago(userState.formadepago);
      setPago(userState.pago);
      setEspecial(userState.especial);
      setFechaInicioPaquete(userState.fechainiciopaquete);
      //setFechaVencimiento(userState.fechavencimiento);
      setFechaVencimiento(new Date(userState.fechavencimiento));
      setMesa(userState.mesa);
      setNoConsume(userState.noconsume);
      setDiasADeber(userState.diasadeber);
      setFecha(userState.fecha);
      setFechaProxCita(userState.fechaproxcita);
      setComidas(userState.comidas);
      setImagen(userState.imagen);
      setId(userState._id);
      //setFechaVencimientoOld(userState.fechavencimiento)
      setFechaVencimientoOld(new Date(userState.fechavencimiento).toISOString().split('T')[0]);

      const fechaFormateada = userState.fecha.split("T")[0];
      setFecha(fechaFormateada);

      const formatDateTime = (isoDateTime) => {
        const date = new Date(isoDateTime);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${
          date.getMonth() + 1
        }`;
        const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
        const hours = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}`;
        const minutes = `${
          date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`;
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      const cita = formatDateTime(userState.fechaproxcita);
      setFechaProxCita(cita);

      const fechaFormateadaInicio = userState.fechainiciopaquete.split("T")[0];
      setFechaInicioPaquete(fechaFormateadaInicio);


      const fechaFormateadaVencimiento =
        userState.fechavencimiento.split("T")[0];
      setFechaVencimiento(fechaFormateadaVencimiento);

  

      setAdeudoNeto(userState.adeudoneto);
      setResetAdeudo(userState.adeudoneto);
      setAnticipo(0);
    }
    console.log("userstate", userState);
  }, [userState]);

  // useEffect(() => {
  //   if (paciente?.nombre) {
  //     console.log("adeudo", paciente.adeudoneto)
  //     setNombre(paciente.nombre);
  //     setTelefono(paciente.telefono);
  //     setDireccionDeEntrega(paciente.direccionDeEntrega);
  //     setEjercicio(paciente.ejercicio);
  //     setPadecimiento(paciente.padecimiento);
  //     setAlergias(paciente.alergias);
  //     setTipopaquete(paciente.tipopaquete);
  //     setFechaInicioPaquete(paciente.fechainiciopaquete);
  //     setFormadepago(paciente.formadepago);
  //     setFechaVencimiento(paciente.fechavencimiento);
  //     setPago(paciente.pago);
  //     setEspecial(paciente.especial);
  //     setMesa(paciente.mesa);
  //     setAdeudoNeto(paciente.adeudoneto);
  //     setAnticipo(paciente.anticipo);
  //     setNoConsume(paciente.noconsume);
  //     setDiasADeber(paciente.diasadeber);
  //     setFecha(paciente.fecha);
  //     setFechaProxCita(paciente.fechaproxcita);
  //     setImagen(paciente.imagen)
  //     setId(paciente._id);
  //   }
  // }, [paciente]);

  const handleTelefonoChange = (e) => {
    const inputTelefono = e.target.value;
    // Remover todos los caracteres no numéricos del valor del input
    const telefonoNumerico = inputTelefono.replace(/\D/g, "");
    // Formatear el número de teléfono agregando guiones
    let telefonoFormateado = "";
    if (telefonoNumerico.length <= 10) {
      telefonoFormateado = telefonoNumerico.replace(
        /(\d{3})(\d{1,3})?(\d{1,4})?/,
        (_, p1, p2, p3) => (p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ""}` : p1)
      );
    } else {
      // Si el número de teléfono es mayor de 10 dígitos, solo mostrar los primeros 10 dígitos
      telefonoFormateado = telefonoNumerico
        .substring(0, 10)
        .replace(/(\d{3})(\d{1,3})?(\d{1,4})?/, (_, p1, p2, p3) =>
          p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ""}` : p1
        );
    }
    // Actualizar el estado del teléfono con el nuevo valor formateado
    setTelefono(telefonoFormateado);
  };

  const handleFechaVencimientoChange = (e) => {
    setFechaVencimiento(e.target.value);
  };
  
  /*   const handlePagoChange = (e) => {
    setAdeudoNeto;
  }; */
  const handlePagoChange = (e) => {
    // Obtener el valor actual ingresado
    let inputValue = e.target.value;

    // Filtrar cualquier carácter que no sea numérico
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Convertir el valor a un número entero para evitar decimales
    let numericValue = parseInt(inputValue, 10);

    // Si el valor está vacío o es NaN, establecer el pago en 0
    if (isNaN(numericValue) || inputValue === "") {
      numericValue = 0;
    }

    // Convertir el valor numérico a cadena
    const formattedValue = numericValue.toString();

    // Actualizar el estado de pago con el valor formateado
    setPago(formattedValue);

    // Actualizar el estado de adeudoneto con el mismo valor
    setAdeudoNeto(formattedValue);
    setResetAdeudo(formattedValue);
  };

  const handleAdeudoChange = (e) => {
    const inputValue = e.target.value;
    // Verificar si el valor ingresado es numérico
    if (!isNaN(inputValue)) {
      // Convertir el valor a un número decimal
      const adeudo = parseFloat(inputValue);
      setAdeudoNeto(String(adeudo));
    } else {
      // Si el valor ingresado no es numérico, establecer adeudo neto en 0
      setAdeudoNeto("0");
    }
  };

  const handleAnticipoChange = (e) => {
    let inputValue = parseFloat(e.target.value ? e.target.value : 0);
    setAnticipo(String(inputValue));
    const adeudoneto = parseFloat(resetAdeudo) - parseFloat(inputValue);
    setAdeudoNeto(String(adeudoneto));
  };
 
  

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleImagenEnGrande = () => {
    setMostrarImagenEnGrande(!mostrarImagenEnGrande);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validar Formulario
    if (
      [
        { nombre: "Nombre del Paciente", valor: nombre },
        { nombre: "Teléfono del Paciente", valor: telefono },
        {
          nombre: "Dirección de Entrega del Paciente",
          valor: direccionDeEntrega,
        },
        { nombre: "Fecha de Vencimiento", valor: fechavencimiento },
        { nombre: "Ejercicio", valor: ejercicio },
        { nombre: "Padecimiento", valor: padecimiento },
        { nombre: "Alergias", valor: alergias },
        { nombre: "Fecha de Alta", valor: fecha },
        { nombre: "Próxima Cita", valor: fechaproxcita },
        { nombre: "Tipo de Paquete", valor: tipopaquete },
        { nombre: "Forma de Pago", valor: formadepago },

        { nombre: "Adeudo Neto", valor: adeudoneto },
        { nombre: "Anticipo", valor: anticipo },
        { nombre: "Pago", valor: pago },
        { nombre: "Especial", valor: especial },
        { nombre: "Mesa", valor: mesa },
        { nombre: "Días a deber", valor: diasadeber },
        { nombre: "Comidas del Dia", valor: comidas },
        { nombre: "Alimentos que no consume", valor: noconsume },
      ].some((campo) => campo.valor === "")
    ) {
      const camposFaltantes = [
        { nombre: "Nombre del Paciente", valor: nombre },
        { nombre: "Teléfono del Paciente", valor: telefono },
        {
          nombre: "Dirección de Entrega del Paciente",
          valor: direccionDeEntrega,
        },
        { nombre: "Fecha de Vencimiento", valor: fechavencimiento },
        { nombre: "Ejercicio", valor: ejercicio },
        { nombre: "Padecimiento", valor: padecimiento },
        { nombre: "Alergias", valor: alergias },
        { nombre: "Fecha de Alta", valor: fecha },
        { nombre: "Próxima Cita", valor: fechaproxcita },
        { nombre: "Tipo de Paquete", valor: tipopaquete },
        { nombre: "Forma de Pago", valor: formadepago },

        { nombre: "Adeudo Neto", valor: adeudoneto },
        { nombre: "Anticipo", valor: anticipo },
        { nombre: "Pago", valor: pago },
        { nombre: "Especial", valor: especial },
        { nombre: "Mesa", valor: mesa },
        { nombre: "Días a deber", valor: diasadeber },
        { nombre: "Comidas del Dia", valor: comidas },
        { nombre: "Alimentos que no consume", valor: noconsume },
      ]
        .filter((campo) => campo.valor === "")
        .map((campo) => campo.nombre);

      setAlerta({
        msg: `Los siguientes campos son obligatorios: ${camposFaltantes.join(
          ", "
        )}`,
        error: true,
      });
      return;
    }

    guardarPaciente({
      nombre,
      telefono,
      direccionDeEntrega,
      ejercicio,
      padecimiento,
      fechainiciopaquete,
      alergias,
      fecha,
      fechaproxcita,
      fechavencimiento,
      anticipo,
      adeudoneto,
      tipopaquete,
      formadepago,
      pago,
      especial,
      mesa,
      diasadeber,
      comidas,
      noconsume,
      imagen,
      id,
    });
    console.log(fechavencimiento === fechavencimientoOld);

  
     if (anticipo === "0" || anticipo === 0) {
      console.log("No se guarda el pago");
    } else {
      guardarPagos({
        id,
        nombre,
        anticipo,
        formadepago,
        adeudoneto,
        fechavencimiento,
      });
     
      /*if (fechavencimientoOld !== new Date(userState.fechavencimiento).toISOString().split('T')[0]) {
        guardarPagos({
          id,
          nombre,
          formadepago,
          anticipo,
          adeudoneto,
          fechavencimiento,
        });
      
      } */
    } 
    
 

    setAlerta({
      msg: "Guardado Correctamente",
    });

      setTimeout(() => {
      window.history.back();
    }, 1000); 
  }; 

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl text-center mt-5 mb-10">
        Añadir y administrar{" "}
        <span className=" text-green-600 font-bold"> Pacientes</span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <button
        type="button"
        onClick={() => window.history.back()}
        className="py-2 px-4 bg-green-700 jus hover:bg-green-800 text-white uppercase font-medium rounded-lg mb-5 "
      >
        Regresar
      </button>
      <div className="flex justify-center">
        <form
          encType="multipart/form-data"
          className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md grid grid-cols-1 lg:grid-cols-3 gap-5 lg:items-start lg:justify-center"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-5">
              <label
                htmlFor="nombre"
                className=" uppercase text-gray-700 font-bold"
              >
                Nombre del Paciente:
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre del Paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="nombre"
                className=" uppercase text-gray-700 font-bold"
              >
                Telefono del Paciente:
              </label>
              <input
                id="telefono"
                type="text"
                placeholder="Telefono del Paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="direccionDeEntrega"
                className=" uppercase text-gray-700 font-bold"
              >
                Direccion De Entrega del Paciente:
              </label>
              <input
                id="direccionDeEntrega"
                type="text"
                placeholder="Direccion De Entrega"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={direccionDeEntrega}
                onChange={(e) => setDireccionDeEntrega(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="ejercicio"
                className=" uppercase text-gray-700 font-bold"
              >
                Ejercicio:
              </label>
              <input
                id="ejercicio"
                type="text"
                placeholder="Ejercicio"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={ejercicio}
                onChange={(e) => setEjercicio(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="padecimiento"
                className=" uppercase text-gray-700 font-bold"
              >
                Padecimiento:
              </label>
              <textarea
                id="padecimiento"
                type="text"
                placeholder="Padecimiento del Paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={padecimiento}
                onChange={(e) => setPadecimiento(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="alergias"
                className=" uppercase text-gray-700 font-bold"
              >
                Alergias:
              </label>
              <input
                id="alergias"
                placeholder="Alergias del Paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="especial"
                className="uppercase text-gray-700 font-bold"
              >
                Especial:
              </label>
              <select
                id="especial"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={especial}
                //onChange={handleEspecialChange} // Cambiado a handleEspecialChange
                onChange={(e) => setEspecial(e.target.value)}
              >
                <option value=""></option>
                <option value="No">No</option>
                <option value="Si">Si</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <label
                htmlFor="fecha"
                className=" uppercase text-gray-700 font-bold"
              >
                Fecha de Alta:
              </label>
              <input
                id="fecha"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechaInicial} // Establecer el valor predeterminado
                readOnly
                disabled
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="fechaproxcita"
                className=" uppercase text-gray-700 font-bold"
              >
                Próxima Cita:
              </label>
              <input
                id="fechaproxcita"
                type="datetime-local"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechaproxcita}
                onChange={(e) => setFechaProxCita(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="fechainiciopaquete"
                className=" uppercase text-gray-700 font-bold"
              >
                Inicio de Paquete
              </label>
              <input
                id="fechainiciopaquete"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechainiciopaquete}
                onChange={(e) => setFechaInicioPaquete(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="fechavencimeiento"
                className=" uppercase text-gray-700 font-bold"
              >
                Vencimiento de Paquete
              </label>
              <input
                id="fechavencimeiento"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechavencimiento}
                onChange={handleFechaVencimientoChange}
                //onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="diasadeber"
                className=" uppercase text-gray-700 font-bold"
              >
                Dias a deber:
              </label>
              <input
                id="diasadeber"
                type="text"
                placeholder="Dias que le debo al Paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={diasadeber}
                onChange={(e) => setDiasADeber(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="noconsume"
                className=" uppercase text-gray-700 font-bold"
              >
                Alimentos que no consume:
              </label>
              <textarea
                id="noconsume"
                placeholder="Alimentos que no consume el Paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={noconsume}
                onChange={(e) => setNoConsume(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="mesa"
                className="uppercase text-gray-700 font-bold"
              >
                Mesa
              </label>
              <select
                id="mesa"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={mesa}
                onChange={(e) => setMesa(e.target.value)}
              >
                <option value="">Selecciona Mesa</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <label
                htmlFor="tipopaquete"
                className=" uppercase text-gray-700 font-bold"
              >
                Tipo de Paquete:
              </label>
              <input
                id="tipopaquete"
                placeholder="Paquete"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={tipopaquete}
                onChange={(e) => setTipopaquete(e.target.value)}
              />
            </div>

            {/* <div className="mb-5">
              <label
                htmlFor="pago"
                className=" uppercase text-gray-700 font-bold"
              >
                Costo del paquete:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 font-medium">$</span>
                </span>
                <input
                  id="pago"
                  type="text"
                  placeholder="Monto"
                  className="pl-8 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={pago}
                  onChange={handlePagoChange} // Cambiado a handlePagoChange
                />
              </div>
            </div> */}
            <div className="mb-5">
              <label
                htmlFor="pago"
                className=" uppercase text-gray-700 font-bold"
              >
                pago del Paquete:
              </label>
              <input
                id="pago"
                placeholder="Pago"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={pago}
                onChange={handlePagoChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="formadepago"
                className="uppercase text-gray-700 font-bold"
              >
                Forma de pago:
              </label>
              <select
                id="formadepago"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={formadepago}
                onChange={(e) => setFormadepago(e.target.value)}
              >
                <option value="">Selecciona la forma de pago</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Effectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="anticipo"
                className=" uppercase text-gray-700 font-bold"
              >
                Anticipo:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 font-medium">$</span>
                </span>
                <input
                  id="anticipo"
                  type="text"
                  placeholder="Anticipo"
                  className="pl-8 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={anticipo}
                  onChange={handleAnticipoChange}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="adeudoneto"
                className=" uppercase text-gray-700 font-bold"
              >
                Adeudo Neto:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 font-medium">$</span>
                </span>
                <input
                  id="adeudoneto"
                  type="text"
                  placeholder="Adeudo"
                  className="pl-8 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={adeudoneto}
                  onChange={handleAdeudoChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="comidas"
                className=" uppercase text-gray-700 font-bold"
              >
                Comidas:
              </label>
              <textarea
                id="comidas"
                type="text"
                placeholder="Comidas al Dia"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={comidas}
                onChange={(e) => setComidas(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="imagen"
                className="uppercase text-gray-700 font-bold"
              >
                Imagen Inbody:
              </label>
              {imagen ? (
                <div className="flex justify-center items-center">
                  <img
                    src={imagen}
                    alt="Imagen del paciente"
                    className="w-60 h-32 mt-2 rounded-md cursor-pointer"
                    onClick={toggleImagenEnGrande}
                  />
                  {mostrarImagenEnGrande && (
                    <div
                      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
                      onClick={toggleImagenEnGrande}
                    >
                      <div
                        className="max-w-4xl w-full h-5/6 overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={imagen}
                          alt="Imagen del paciente"
                          className="w-full rounded-md"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>No se encontró ninguna imagen para este paciente</div>
              )}
              <div className="relative">
                <input
                  id="imagen"
                  type="file"
                  name="imagen"
                  placeholder="imagen"
                  accept="image/*"
                  className="pl-8 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  onChange={(e) => handleImagenChange(e)}
                />
              </div>
            </div>
          </div>
          <div>{/* Espacio para que quede centrado el botón */}</div>
          <input
            type="submit"
            className="bg-green-600 w-full items-center mt-5 p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors rounded-md mx-auto block"
            value={id ? "Guardar Cambios" : "Agregar Paciente"}
          />
        </form>
      </div>
    </>
  );
};

export default Formulario;
