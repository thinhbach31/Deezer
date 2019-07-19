
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import ItemTrack from './item/ItemTrack'
import ItemAlbum from './item/ItemAlbum';
import ItemArtist from './item/ItemArtist';
import ItemPlaylist from './item/ItemPlaylist';

class Home extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount() {
        this.fetchByAxiosLoadMore()
    }

    fetchByAxiosLoadMore = () => {

        axios
            .get(
                "https://api.deezer.com/chart/0"
            )
            .then(({ data }) => {
                this.setState({
                    data,
                    isLoading: false

                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    data: [],
                    isLoading: true
                });
            })
    };

    _renderTrackItem = ({ item }) => (
            <ItemTrack
                gotoTrackDetail={() => this.gotoTrackDetail(item)}
                onArtistClick={() => this.gotoArtistDetail(item.artist)}
                item={item}
            />
    )

    _renderAlbumItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            this.gotoAlbumDetail(item)
        }}>
            <ItemAlbum
                onArtistClick={() => this.gotoArtistDetail(item.artist)}
                item={item}
            />
        </TouchableOpacity>
    )

    _renderArtistItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.gotoArtistDetail(item)}>
            <ItemArtist
                item={item}
            />
        </TouchableOpacity>

    )

    _renderPlaylistItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.gotoListDetail(item)}>
            <ItemPlaylist
                item={item}
            />
        </TouchableOpacity>
    )

    gotoListDetail(item) {
        this.props.navigation.navigate('ListDetail', { itemPlaylist: item.id })
    }

    gotoAlbumDetail(item) {
        this.props.navigation.navigate('AlbumDetail', { itemAlbum: item.id })
    }

    gotoTrackDetail = (item) => {
        this.props.navigation.navigate('TrackDetail', { itemTrack: item.id })
    }

    gotoArtistDetail = (item) => {
        this.props.navigation.navigate('ArtistDetail', { itemArtist: item.id })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.statusBar} />
                    <View style={styles.appBar}>
                        <Text style={styles.textAppBar}>Home</Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.statusBar} />
                <View style={styles.appBar}>
                    <Text style={styles.textAppBar}>Home</Text>
                </View>
                <ScrollView>
                    <View style={styles.viewChild}>
                        <Text style={styles.textTitle}>Top chart:</Text>
                        <FlatList
                            data={this.state.data.tracks.data}
                            renderItem={this._renderTrackItem.bind(this)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.viewChild}>
                        <Text style={styles.textTitle}>Top album:</Text>
                        <FlatList
                            data={this.state.data.albums.data}
                            renderItem={this._renderAlbumItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.viewChild}>
                        <Text style={styles.textTitle}>Top artist:</Text>
                        <FlatList
                            data={this.state.data.artists.data}
                            renderItem={this._renderArtistItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.viewChild}>
                        <Text style={styles.textTitle}>Discovery:</Text>
                        <FlatList
                            data={this.state.data.playlists.data}
                            renderItem={this._renderPlaylistItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>

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
        height: 50,
        backgroundColor: '#191414'
    },
    itemTrack: {
        width: 50
    },
    viewChild: {
        margin: 10
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },
    textAppBar: {
        color: 'white',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    }
})

export default Home