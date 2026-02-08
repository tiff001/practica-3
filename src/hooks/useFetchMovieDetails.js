import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies"; //clvae API desde el otro hook

/**
 * @param {string} selectedID - ID único para la películas seleccionada
 * @returns {Object} - retorna: movie, isLoading, error
 */

export function useFetchMovieDetails(selectedID) {
    //estado para almacenar los detalles de película
    const [movie, setMovie] = useState({});

    //estado para indicar si la solicitud está en curso
    const [isLoading, setIsLoading] = useState(false);

    //manejo de errores
    const [error, setError] = useState("");

    useEffect(() => {
        // si no hay ID, limpiar el estado
        if (!selectedID) {
            setMovie({});
            setError("");
            return;
        }

        /** función asincrónica para detalles de la película 
         * @param {string} selectedID - ID único de la película a consultar
        */
       async function fetchMovieDetails(selectedID) {
            try {
                setIsLoading(true); //activa el estado de carga
                setError(null);    //reinicia los errores previos

                //petición a la API
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`);

                //verifica si la rspuesta es correcta
                if (!response.ok)
                    throw new Error("Error al cargar los detalles de la película");

                const data = await response.json();

                //guarda los detalles de la película
                setMovie(data);
            } catch (err) {
                //manejo de errores
                setError(err.message);
                setMovie({});
            } finally {
                setIsLoading(false);
            }
       }
       //llama a la función para obtener datos
       fetchMovieDetails(selectedID);
    }, [selectedID]);//cada vez que cambia el ID seleccionado

    return { movie, isLoading, error}; //retorna valores necesarios
}