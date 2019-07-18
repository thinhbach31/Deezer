
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import axios from 'axios'

class Search extends Component {

    state = {
        isLoadingSong: true,
        isLoadingArtist: true,
        isLoadingPlaylist: true,
        query: '',
    }

    _renderSong = () => {
        if (!this.state.isLoadingSong) {
            return (
                <View>
                    <Text style={styles.textTitle}>song</Text>
                    <FlatList />
                </View>

            );
        } else {
            return (
                <View></View>
            );
        }
    }

    _renderArtist = () => {
        if (!this.state.isLoadingArtist) {
            return (
                <View>
                    <Text style={styles.textTitle}>artist</Text>
                    <FlatList />
                </View>

            );
        } else {
            return null;
        }
    }

    _renderPlaylist = () => {
        if (!this.state.isLoadingPlaylist) {
            return (
                <View>
                    <Text style={styles.textTitle}>playlist</Text>
                    <FlatList />
                </View>

            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.statusBar} />
                <View style={styles.appBar}>
                    <Text style={styles.textAppBar}>Search</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='Songs, Artists or Playlists '
                    value={this.state.query}
                    onChangeText={(query) => {
                        this.setState({ query }, () => {
                            this.fetchDataSong();
                            this.fetchDataArtist();
                            this.fetchDataPlaylist();
                        });
                    }}
                />
                {this._renderArtist()}
                {this._renderSong()}
                {this._renderPlaylist()}

            </View>
        )
    }

    // fetch data from

    fetchDataSong = () => {
        if (this.state.query != '') {
            //search songs
            axios
                .get(
                    "https://api.deezer.com/search/track",
                    {
                        params: {
                            q: this.state.query
                        }
                    }
                )
                .then(({ data }) => {
                    //if data not empty
                    if (data.data.length > 0) {
                        this.setState({
                            dataSong: data,
                            isLoadingSong: false

                        });
                        
                    } else {
                        this.setState({
                            dataSong: data,
                            isLoadingSong: true
                        });
                    }
                    console.log(this.state.dataSong);
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        dataSong: [],
                        isLoadingSong: true
                    });
                })

        } else {
            this.setState({
                dataSong: [],
                isLoadingSong: true
            });
        }
    }

    fetchDataArtist = () => {
        if (this.state.query != '') {
            //search artist
            axios
                .get(
                    "https://api.deezer.com/search/artist",
                    {
                        params: {
                            q: this.state.query
                        }
                    }
                )
                .then(({ data }) => {
                    if (data.data.length > 0) {
                        this.setState({
                            dataArtist: data,
                            isLoadingArtist: false

                        });
                        
                    } else {
                        this.setState({
                            dataArtist: data,
                            isLoadingArtist: true
                        });
                    }
                    console.log(this.state.dataArtist);
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        data: [],
                        isLoadingArtist: true
                    });
                })
        } else {
            this.setState({
                dataArtist: [],
                isLoadingArtist: true
            });
        }
    }

    fetchDataPlaylist = () => {
        if (this.state.query != '') {
            //search Playlists
            axios
                .get(
                    "https://api.deezer.com/search/playlist",
                    {
                        params: {
                            q: this.state.query
                        }
                    }
                )
                .then(({ data }) => {
                    this.setState({
                        dataPlaylist: data,
                        isLoadingPlaylist: false

                    });
                    console.log(this.state.dataPlaylist);
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        data: [],
                        isLoadingPlaylist: true
                    });
                })

        } else {
            this.setState({
                dataPlaylist: [],
                isLoadingPlaylist: true
            });
        }
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
    itemTrack: {
        width: 50
    },
    viewChild: {
        margin: 10
    },
    textTitle: {
        color: 'white',
        fontSize: 30,
        marginTop: 20,
        marginLeft: 10,
    },
    textInput: {
        fontSize: 15,
        color: 'black',
        height: 50,
        backgroundColor: 'white',
        margin: 10,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
    },
    textAppBar: {
        color: 'white',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    appBar: {
        height: 50, 
        backgroundColor: '#191414' 
    },
})

export default Search