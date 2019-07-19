import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class ItemTrack extends Component {
    render() {
        itemArtist = this.props.item
        return (
            <TouchableOpacity onPress={() => this.props.gotoTrackDetail()}>
            <View style={styles.itemTrack}>
                <View>
                    <Image style={styles.itemImage} source={{ uri: itemArtist.album.cover_medium }} />
                    <Text style={styles.textTitle} ellipsizeMode='tail' numberOfLines={2}>{itemArtist.title}</Text>
                    <Text style={styles.textArtist}
                        onPress={() => this.props.onArtistClick()}>{itemArtist.artist.name}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemTrack: {
        backgroundColor: '#191414',
        width: 150,
    },
    itemImage: {
        height: 130,
        width: 130
    },
    textTitle: {
        color: 'white',
        width: 130,
        marginTop: 10,
        alignItems: 'center',
        fontSize: 16
    },
    textArtist: {
        color: 'grey',
        width: 130,
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 14
    }
})

export default ItemTrack