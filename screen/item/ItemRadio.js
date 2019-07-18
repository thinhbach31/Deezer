import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios'

class ItemRadio extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount() {
        this.fetchByAxiosLoadRadio()
    }

    render() {
        item = this.props.item
        if(this.state.isLoading){
            return(
                <View/>
            )
        }
        console.log(item)
        return (
            <View style={styles.itemTrack}>
                <View>
                    <Image style={styles.itemImage} source={{ uri: this.state.data.picture_medium}} />
                    <Text style={styles.textTitle} ellipsizeMode='tail' numberOfLines={2}>{item.title}</Text>
                </View>
            </View>
        )
    }

    fetchByAxiosLoadRadio = () => {

        axios
            .get(
                "https://api.deezer.com/genre/" + this.props.item.id
            )
            .then(({ data }) => {
                this.setState({
                    data,
                    isLoading: false

                });
                console.log('hggg',data)
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    data: [],
                    isLoading: true
                });
            })
    };
}

const styles = StyleSheet.create({
    itemTrack: {
        backgroundColor: '#191414',
        width: 180,
        marginTop: 10,
        marginBottom: 10
    },
    itemImage: {
        height: 130,
        width: 160
    },
    textTitle: {
        color: 'white',
        width: 130,
        marginTop: 10,
        alignItems: 'center',
        fontSize: 17,
    },
    textArtist: {
        color: 'grey',
        width: 130,
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 14
    }
})

export default ItemRadio