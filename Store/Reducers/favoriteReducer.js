const initialState = {
    favoritesFilm: [],
};

const toggleFavorite = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id);
            if (favoriteFilmIndex !== -1) {
                // The movie is in the favorites list, we delete it from the list
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            } else {
                // The movie is not in the favorites list, we add it to the list
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value],
                }
            }
            return nextState || state;
        default:
            return state;
    }
};

export default toggleFavorite;