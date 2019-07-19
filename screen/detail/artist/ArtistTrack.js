import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'
import ItemAlbum from './ItemArtistAlbum'
import ItemTrack from './ItemArtistTrack'

class ArtistTrack extends Component {

    state = {
        isLoadingAlbum: true,
        isLoadingTrack: true,
    }

    _renderAlbumItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.gotoAlbumDetail(item)}>
            <ItemAlbum
                item={item}
            />
        </TouchableOpacity>
    )

    _renderTrackItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.gotoTrackDetail(item)}>
            <ItemTrack
                item={item}
            />
        </TouchableOpacity>
    )

    gotoAlbumDetail(item) {
        this.props.navigation.navigate('AlbumDetail', { itemAlbum: item.id })
    }

    gotoTrackDetail(item) {
        this.props.navigation.navigate('TrackDetail', { itemTrack: item.id })
    }

    componentDidMount() {
        const itemId = this.props.itemId

        axios
            .get(
                "https://api.deezer.com/artist/" + itemId + '/albums'
            )
            .then(({ data }) => {
                this.setState({
                    dataArtistAlbum: data,
                    isLoadingAlbum: false

                });
                console.log(data)
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    dataArtistAlbum: [],
                    isLoadingAlbum: true
                });
            })

        axios
            .get(
                "https://api.deezer.com/artist/" + itemId + '/top'
            )
            .then(({ data }) => {
                this.setState({
                    dataArtistTrack: data,
                    isLoadingTrack: false

                });
                console.log(data)
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    dataArtistTrack: [],
                    isLoadingTrack: true
                });
            })
    }

    render() {

        if (this.state.isLoadingAlbum || this.state.isLoadingTrack) {
            return (
                <View style={styles.container}>

                </View>
            )
        }
        return (

            <ScrollView style={styles.container}>

                <Text style={styles.textTitle}>Albums</Text>
                <FlatList
                    data={this.state.dataArtistAlbum.data}
                    renderItem={this._renderAlbumItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

                <Text style={styles.textTitle}>Tracks</Text>
                <FlatList
                    data={this.state.dataArtistTrack.data}
                    renderItem={this._renderTrackItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191414',
        flex: 1,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
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

export default ArtistTrack