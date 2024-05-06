import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../../components/Alerta";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return
    }

    if (password.length < 6) {
      setAlerta({ msg: "La contraseña es muy corta", error: true });
      return
    }
    setAlerta({})

    //Crear usuario
    try {
       await clienteAxios.post('/nutriologos', {nombre, email, password});
       setAlerta({
        msg: 'Creado Correctamente, revisa tu email',
        error: false
       })
    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
  }

  const {msg} = alerta

  return (
    <>
      <div>
        <h1 className=" text-green-500 font-black text-6xl">
          Crea tu <span className=" text-black"> Cuenta</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl font-bold">
              Nombre:
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl font-bold">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl font-bold">
              Contraseña:
            </label>
            <input
              type="password"
              placeholder="Tu Contraseña"
              className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl font-bold">
              Repetir Contraseña:
            </label>
            <input
              type="password"
              placeholder="Repite tu Contraseña"
              className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-green-500 w-full py-3 rounded-xl text-wrap uppercase font-bold mt-5 hover:cursor-pointer hover:bg-green-800 hover:text-white md:w-auto p-10"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-gray-500 text-center my-5 hover:text-green-950"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-gray-500 text-center my-5 hover:text-green-950"
            to="/olvide-password"
          >
            Olvide mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
