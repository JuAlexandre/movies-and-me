import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

import FilmList from './FilmList';

class Favorites extends Component {
    render() {
        return (
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={true}
            />
        )
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(Favorites);
