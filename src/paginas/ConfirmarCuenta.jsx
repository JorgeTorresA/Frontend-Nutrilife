import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/nutriologos/login/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
        return
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className=" text-green-500 font-black text-6xl">
          Confirma tu<span className=" text-black"> Cuenta</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link
            className="block text-black text-center my-5 hover:text-white bg-green-500 rounded-full shadow-lg focus:outline-none w-1/2 items-center mx-auto py-2 "
            to="/"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
