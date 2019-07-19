import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

class ItemRelate extends Component {
    render() {
        item = this.props.item
        return (
            <View style={styles.itemTrack}>
                <View>
                    <Image style={styles.itemImage} source={{ uri: item.picture_medium}} />
                    <Text style={styles.textTitle} ellipsizeMode='tail' numberOfLines={2}>{item.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemTrack: {
        backgroundColor: '#191414',
        width: 150,
    },
    itemImage: {
        height: 90,
        width: 90,
    },
    textTitle: {
        color: 'grey',
        width: 130,
        marginTop: 10,
        alignItems: 'center',
        fontSize: 16
    },
    textArtist: {
        color: 'grey',
        width:130,
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 14
    }
})

export default ItemRelate