/** muestra una lista de película
 * @param {Object[]} movies - películas a renderizar
 * @param {Function} onSelectMovie - función que se ejecuta al seleccionar una película
 */

export const MovieList = ({movies, onSelectMovie}) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                    />
            ))}
        </ul>
    );
};

/**
* muestra los detalles básicos de una película.
* @param {Object} movie - Datos de la película.
* @param {Function} onSelectMovie - Función que se ejecuta al hacer clic en la película.
*/

export const Movie = ({movie, onSelectMovie}) => {
    return(
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
};