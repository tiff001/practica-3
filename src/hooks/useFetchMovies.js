// Custom Hook para buscar películas en la API de OMDb según su término de búsqueda (query)
import { useEffect, useState } from "react";

// clave de API 
export const API_KEY = "df8e446e";

/** Hook personalizado para obtener películas desde la API
* @param {string} query - Término de búsqueda ingresado por el usuario
* @returns {Object} - Retorna:
* - movies: lista de películas encontradas
* - isLoading: estado de carga de la solicitud
* - error: mensaje de error en caso de fallo
*/

export function useFetchMovies(query) {
    // almacenar películas obtenidas
    const [movies, setMovies] = useState([]);

    // indicar si la solicitud está en curso
    const [isLoading, setIsLoading] = useState(false);

    // estado para manear errores
    const [error, setError] = useState("");

    useEffect(() => {
        // si en  la búsqueda hay menos de 3 caracteres, limpiar, resultados y error
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        /** 
         * función asincrónica para obtener las películas de la API 
         */
        async function fetchMovies() {
            try {
                setIsLoading(true); // inicia carga
                setError(null); // reinicia errores previos

                //Petición a la API OMDB    
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`); 

                //si la respuest HTTP es correcta
                if (!response.ok)
                    throw new Error("Error al cargar películas");

                const data = await response.json();

                // si la API responde con error:
                if (data.Response === "False")
                    throw new Error("No se encontraron resultados");

                // guardar películas
                setMovies(data.Search);
            } catch (err) {
                // guardar mensaje de error y limpiar la lista
                setError(err.message);
                setMovies([]);
            } finally {
                setIsLoading(false) // finaliza estado de carga
            }
        }

        fetchMovies();
    }, [query]); //cada vez que cambia la consulta

    // retornar valores n ecesarios
    return {movies, isLoading, error};
}