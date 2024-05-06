import { useContext } from "react";
import HistorialContext from "../context/HistorialProvider";

const useHistorial = () => {
    return useContext(HistorialContext)
}

export default useHistorial