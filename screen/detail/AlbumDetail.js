import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'

class AlbumDetail extends Component {

    state = {
        isLoading: true,
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
                <Text style={styles.textAppBar}>{itemAlbum.title}</Text>
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
    }
})

export default AlbumDetail