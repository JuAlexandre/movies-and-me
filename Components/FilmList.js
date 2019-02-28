import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';

import FilmItem from './FilmItem';

class FilmList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
    }

    detailForFilm = (idFilm) => this.props.navigation.navigate('FilmDetail', {idFilm: idFilm});

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FilmItem
                        film={item}
                        isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1)}
                        detailForFilm={this.detailForFilm}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(FilmList);