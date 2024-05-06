import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/nutriologos/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);

      // Verificar si el correo electrónico coincide con el correo específico
      if (data.email === "historial@gmail.com") {
        navigate("/admin/historial-pagos");
      } else {
        navigate("/admin");
      }

      console.log(data);
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
          Inicia tu <span className=" text-black"> Sesión</span>
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
          <div className="my-5">
            <label className=" uppercase text-gray-600 text-xl font-bold">
              Contraseña:
            </label>
            <input
              type="password"
              placeholder="Tu contraseña"
              className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-green-500 w-full py-3 rounded-xl text-wrap uppercase font-bold mt-5 hover:cursor-pointer hover:bg-green-800 hover:text-white md:w-auto p-10"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-gray-500 text-center my-5 hover:text-green-950"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
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

export default Login;
