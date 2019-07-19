import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import Swiper from 'react-native-swiper'
import ItemRelated from './ItemArtistRelate'

class ArtistDes extends Component {

    state = {
        isLoading: true,
    }

    _renderRelatedItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
                this.gotoArtistDetail(item)
                
            }}>
            <ItemRelated
                item={item}
            />
        </TouchableOpacity>
    )

    gotoArtistDetail(item) {
        this.props.navigation.push('ArtistDetail', { itemArtist: item.id })
    }

    componentDidMount() {
        const itemId = this.props.itemId

        axios
            .get(
                "https://api.deezer.com/artist/" + itemId + '/related'
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
        let IconComponent = Ionicons;

        if (this.state.isLoading) {
            return (
                <View style={styles.container} />
            )
        }
        return (
            <View style={styles.container}>

                <Text style={styles.textTitle}>Related artists</Text>
                <FlatList
                    data={this.state.dataArtist.data}
                    renderItem={this._renderRelatedItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191414',
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

export default ArtistDes