import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
import moment from 'moment';
import numeral from 'numeral';

import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi';

export default class FilmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true,
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm'))
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false,
                })
            });
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
    }
});
