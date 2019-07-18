import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import Swiper from 'react-native-swiper'

class ArtistDes extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount() {
        // const { navigation } = this.props;
        // const itemId = navigation.getParam('itemArtist');
        const itemId = this.props.itemId

        axios
            .get(
                "https://api.deezer.com/artist/" + itemId
            )
            .then(({ data }) => {
                this.setState({
                    dataArtist: data,
                    isLoading: false

                });
                console.log(data)
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    dataArtist: [],
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
        let itemArtist = this.state.dataArtist
        return (
            <View style={styles.container}>
                {/* <SafeAreaView style={styles.statusBar} />
                <TouchableOpacity style={styles.appBar} onPress={() => navigation.goBack()}>
                    <IconComponent style={styles.backButton} name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity> */}

                <ScrollView>
                    <Image style={styles.itemImage} source={{ uri: itemArtist.picture_medium}} />
                    <Text style={styles.textArtist} ellipsizeMode='tail' numberOfLines={1}>{itemArtist.name}</Text>

                    <TouchableOpacity>
                        <View style={styles.buttonPlay}>
                            <Text style={styles.textButtonPlay}>Play</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemGoto} >
                        <IconComponent style={styles.backButton} name={'ios-musical-notes'} size={30} color={'white'} />
                        <Text style={styles.textItemGoto}>See all {itemArtist.name}'s tracks</Text>
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

export default ArtistDes