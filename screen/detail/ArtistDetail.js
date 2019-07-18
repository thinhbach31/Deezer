import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import Swiper from 'react-native-swiper'
import ArtistDes from './artist/ArtistPageDes'
import ArtistTrack from './artist/ArtistTrack'

class ArtistDetail extends Component {

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemArtist');
        let IconComponent = Ionicons;
        return (
            <View>
                <SafeAreaView style={styles.statusBar} />
                <TouchableOpacity style={styles.appBar} >
                    <IconComponent onPress={() => navigation.goBack()} style={styles.backButton} name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity>
                <Swiper>
                    <ArtistDes itemId={itemId}>

                    </ArtistDes>

                    <ArtistTrack >

                    </ArtistTrack>
                </Swiper>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191414',
        flex: 1
    },
    statusBar: {
        backgroundColor: 'black',
    },
    appBar: {
        backgroundColor: '#191414',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    itemTrack: {
        width: 50
    },
    backButton: {
        marginLeft: 10
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },
    textAppBar: {
        color: 'white',
        fontSize: 17,
        marginLeft: 10,
    },
    itemImage: {
        height: 230,
        width: 230,
        alignSelf: 'center',
        marginTop: 50,
    },
    textArtist: {
        color: 'white',
        fontSize: 25,
        margin: 10,
        alignSelf: 'center',
    },
    buttonPlay: {
        height: 45,
        width: 200,
        borderRadius: 20,
        backgroundColor: '#1db954',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textButtonPlay: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    itemGoto: {
        flexDirection: 'row',
        marginTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        alignSelf: 'center',
    },
    textItemGoto: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20,
    }
})

export default ArtistDetail