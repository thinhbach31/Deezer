import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import ItemTrack from '../item/ItemAlbumTracks'

class AlbumDetail extends Component {

    state = {
        isLoading: true,
    }

    _renderTrackItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.gotoTrackDetail(item)}>
            <ItemTrack
                item={item}
            />
        </TouchableOpacity>
    )

    gotoTrackDetail(item) {
        this.props.navigation.push('TrackDetail', { itemTrack: item.id })
    }

    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemAlbum');

        axios
            .get(
                "https://api.deezer.com/album/" + itemId
            )
            .then(({ data }) => {
                this.setState({
                    dataAlbum: data,
                    isLoading: false

                });
                console.log(data)
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    dataAlbum: [],
                    isLoading: true
                });
            })
    }

    render() {

        const { navigation } = this.props;

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>

                </View>
            )
        }
        let IconComponent = Ionicons;
        let itemAlbum = this.state.dataAlbum
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.statusBar} />
                <TouchableOpacity style={styles.appBar} onPress={() => navigation.goBack()}>
                    <IconComponent style={styles.backButton} name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity>
                <Image style={styles.itemImage} source={{ uri: itemAlbum.cover_medium }} />
                <TextTicker style={styles.textTitle}
                    duration={25000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}>{itemAlbum.title}</TextTicker>
                <Text style={styles.textArtist}>{itemAlbum.artist.name}</Text>

                <TouchableOpacity>
                    <View style={styles.buttonPlay}>
                        <Text style={styles.textButtonPlay}>Play</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.textAppBar}>Tracks</Text>
                <FlatList
                    style={{ marginBottom: 20 }}
                    data={itemAlbum.tracks.data}
                    renderItem={this._renderTrackItem}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                />
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
        fontSize: 25,
        margin: 10,
        alignSelf: 'center',
    },
    textAppBar: {
        color: 'white',
        fontSize: 17,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    itemImage: {
        height: 230,
        width: 230,
        alignSelf: 'center',
        marginTop: 50,
    },
    textArtist: {
        color: 'grey',
        textDecorationLine: 'underline',
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
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

export default AlbumDetail