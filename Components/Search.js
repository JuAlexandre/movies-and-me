import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';

class Search extends Component {
    constructor(props) {
        super(props);

        this.searchedText = '';
        this.page = 0;
        this.totalPages = 0;

        this.state = {
            films: [],
            isLoading: false,
        };
    }

    searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState(
            {films: []},
            () => {
                this.loadFilms();
            }
        );
    }

    loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true});
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1)
                .then(data => {
                    this.page = data.page;
                    this.totalPages = data.total_pages;
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false,
                    });
                });
        }
    }

    detailForFilm = idFilm => {
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm});
    };

    renderLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Titre du film'
                    onChangeText={value => this.searchedText = value}
                    onSubmitEditing={() => this.loadFilms()}
                />
                <Button title='Rechercher' onPress={() => this.searchFilms()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <FilmItem film={item}
                                  isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1)}
                                  detailForFilm={this.detailForFilm}
                        />
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this.loadFilms();
                        }
                    }}
                />
                {this.renderLoading()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect(mapStateToProps)(Search);