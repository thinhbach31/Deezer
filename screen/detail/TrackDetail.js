import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';

class TrackDetail extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemTrack');
        axios
            .get(
                "https://api.deezer.com/track/" + itemId
            )
            .then(({ data }) => {
                this.setState({
                    dataTrack: data,
                    isLoading: false

                });
                
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    dataTrack: [],
                    isLoading: true
                });
            })
    }

    gotoArtistDetail(artistId) {
        this.props.navigation.push('ArtistDetail', { itemArtist: artistId })
    }

    gotoAlbumDetail(albumId) {
        this.props.navigation.push('AlbumDetail', { itemAlbum: albumId })
    }

    _renderExplicit = () => {
        if (this.state.dataTrack.explicit_lyrics) {
            return (
                <Text style={styles.textExplicit}>Explicit</Text>
            )
        }
        return (
            <View />
        )
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
        let itemTrack = this.state.dataTrack

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.statusBar} />
                <TouchableOpacity style={styles.appBar} onPress={() => navigation.goBack()}>
                    <IconComponent style={styles.backButton} name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity>
                <ScrollView style={styles.scrollView}>
                    <Image style={styles.itemImage} source={{ uri: itemTrack.album.cover_medium }} />

                    <Text style={styles.textTitle} ellipsizeMode='tail' numberOfLines={1}>{itemTrack.title}</Text>

                    <Text style={styles.textArtist}>{itemTrack.artist.name}</Text>

                    {this._renderExplicit()}

                    <TouchableOpacity>
                        <View style={styles.buttonPlay}>
                            <Text style={styles.textButtonPlay}>Play</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemGoto} onPress={() => this.gotoArtistDetail(itemTrack.artist.id)}>
                        <IconComponent style={styles.backButton} name={'ios-person'} size={30} color={'white'} />
                        <Text style={styles.textItemGoto}>Go to Artist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemGoto} onPress={()=>this.gotoAlbumDetail(itemTrack.album.id)}>
                        <IconComponent style={styles.backButton} name={'ios-albums'} size={30} color={'white'} />
                        <Text style={styles.textItemGoto}>Go to Album</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemGoto}>
                        <IconComponent style={styles.backButton} name={'ios-share'} size={30} color={'white'} />
                        <Text style={styles.textItemGoto}>Share</Text>
                    </TouchableOpacity>
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
    scrollView: {
        paddingBottom: 20,
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
    textExplicit: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'grey',
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

export default TrackDetail