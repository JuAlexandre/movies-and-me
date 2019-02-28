import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';

import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi';
import icFavorite from '../Images/ic_favorite.png';
import icFavoriteBorder from '../Images/ic_favorite_border.png';

class FilmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: false,
        }
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.getParam('idFilm'));
        if (favoriteFilmIndex !== -1) {
            this.setState({film: this.props.favoritesFilm[favoriteFilmIndex]});
            return;
        }

        this.setState({isLoading: true});
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm'))
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false,
                });
            });
    }

    toggleFavorite() {
        const action = {type: 'TOGGLE_FAVORITE', value: this.state.film};
        this.props.dispatch(action);
    }

    displayFavoriteImage() {
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            return <Image style={styles.favoriteImage} source={icFavorite} />
        } else {
            return <Image style={styles.favoriteImage} source={icFavoriteBorder} />
        }
    }

    renderLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    renderFilm() {
        const {film} = this.state;
        if (film !== undefined) {
            return (
                <ScrollView style={styles.scrollView}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite}
                        onPress={() => this.toggleFavorite()}>
                        {this.displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description}>{film.overview}</Text>
                    <Text style={styles.default}>
                        Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                    </Text>
                    <Text style={styles.default}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default}>
                        Genre(s) : {film.genres.map(genre => {
                            return genre.name;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.default}>
                        Companie(s) : {film.production_companies.map(company => {
                            return company.name;
                        }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderLoading()}
                {this.renderFilm()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm,
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite: {
        alignItems: 'center',
    },
    favoriteImage: {
        width: 40,
        height: 40
    }
});

export default connect(mapStateToProps)(FilmDetail);
