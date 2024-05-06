import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";
import useAuth from "../../hooks/useAuth";
const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const { auth } = useAuth();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/nutriologos/login/olvide-password", {
        email,
      });

      setAlerta({
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className=" text-green-500 font-black text-6xl">
          Recupera el acceso a tu <span className=" text-black"> Cuenta</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl font-bold">
              Email:
            </label>
            <input
              type="text"
              placeholder="Email de Registro"
              className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
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
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
