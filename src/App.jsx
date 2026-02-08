import { useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from
"./components/WatchedMovies";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

// componente principal
export default function App() {
    
    // búsqueda de una película
    const [query, setQuery] = useState("");

    // obtiene películas
    const {movies, isLoading, error} = useFetchMovies(query);

    // películas vistas
    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }      

    // estado la película seleccionada
    const [selectedId, setSelectedId] = useState(null);

    /**
    * Maneja la selección de una película.
    * @param {string} id - ID de la película seleccionada.
    */

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    // cierra detalles de la película
    function handleCloseMovie() {
        setSelectedId(null);
    }

    /**
    * Agrega una película a la lista de vistas.
    * @param {Object} movie - Película a agregar.
    */

    function handleAddWatched(movie) {
        const isAlreadyWatched = watched.some((m) => m.imdbID === movie.imdbID);

        if (!isAlreadyWatched) {
            setWatched((watched) => [...watched, movie]);
            handleCloseMovie();
        } else {
        // si ya existe, simplemente cerramos el detalle
        handleCloseMovie();
    }
    }

    return (
        <>
            <Nav>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Nav>
            <main className="main">
                <Box>
                    {isLoading && <p className="loader">Cargando...</p>}
                    {!isLoading && !error && (
                        <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                    )}
                    {error && <p className="error">⛔ {error}</p>}
                    <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                </Box>

                <Box>
                    <WatchedMoviesContainer>
                        {selectedId ? (
                            <MovieDetails
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            />
                        ) : (
                            <>
                                <WatchedSummary watched={watched} />
                                <WatchedMoviesList watched={watched} 
                                onDeleteWatched={handleDeleteWatched}/>
                            </>
                        )}
                    </WatchedMoviesContainer>
                </Box>
            </main>
        </>
    );
}