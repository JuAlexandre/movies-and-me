import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import moment from 'moment';

import {getImageFromApi} from '../API/TMDBApi';

export default class FilmItem extends Component {
    render() {
        const {film, detailForFilm} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => detailForFilm(film.id)}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.poster_path)}}
                />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.titleText}>{film.original_title}</Text>
                        <Text style={styles.voteText}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>
                            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content: {
        flex: 1,
        margin: 5
    },
    header: {
        flex: 3,
        flexDirection: 'row'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    voteText: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description: {
        flex: 7
    },
    descriptionText: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date: {
        flex: 1
    },
    dateText: {
        textAlign: 'right',
        fontSize: 14
    }
});
