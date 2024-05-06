import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { cerrarSesion } = useAuth();
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="py-5 bg-green-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-green-200 text-center">
          Administrador de Pacientes de{" "}
          <span className="text-white font-black">Nutri Life</span>{" "}
        </h1>

        <nav className="flex flex-col items-center gap-4 lg:flex-row mt-5 lg:mt-0">
          <div className="lg:flex gap-4 lg:mt-0">
            <button
              type="button"
              className="text-white text-3xl justify-start uppercase font-bold hover:text-green-200 first-letter:"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
          {showMenu && (
            <div className="lg:flex gap-4 lg:mt-0">
              <div className="flex gap-8">
                <Link
                  to="/admin"
                  className="text-white text-sm uppercase font-bold hover:text-green-200"
                >
                  Pacientes
                </Link>

                <Link
                  to="/admin/perfil"
                  className="text-white text-sm uppercase font-bold hover:text-green-200"
                >
                  Perfil
                </Link>
                <Link
                  to="/admin/historial-pagos"
                  className="text-white text-sm uppercase font-bold hover:text-green-200"
                >
                  Pagos
                </Link>

                <button
                  type="button"
                  className="text-white text-sm uppercase font-bold hover:text-red-600"
                  onClick={cerrarSesion}
                >
                    <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
