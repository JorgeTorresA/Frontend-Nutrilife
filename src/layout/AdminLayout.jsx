import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="mx-auto mt-10 md:w-11/12 lg:w-11/12">
          <Outlet />{" "} 
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default AdminLayout;
