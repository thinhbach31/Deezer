import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import TextTicker from 'react-native-text-ticker'

class ItemTrack extends Component {
    render() {
        item = this.props.item
        return (
            <View style={styles.itemTrack}>
                <View>
                    <TextTicker
                        style={styles.textTitle}
                        duration={20000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}>{item.title}</TextTicker>
                    <Text style={styles.textArtist}>{item.artist.name}</Text>
                    <View style={{height: 20}}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemTrack: {
        backgroundColor: '#191414',
        flexDirection: 'row'
    },
    itemImage: {
        height: 60,
        width: 60,
    },
    textTitle: {
        color: 'white',
        marginLeft: 20,
        alignItems: 'center',
        fontSize: 18
    },
    textArtist: {
        color: 'grey',
        marginLeft: 20,
        alignItems: 'center',
        textDecorationLine: 'underline',
        fontSize: 16
    },

})

export default ItemTrack