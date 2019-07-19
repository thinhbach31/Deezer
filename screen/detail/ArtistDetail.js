import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import ArtistDes from './artist/ArtistPageRelate'
import ArtistTrack from './artist/ArtistTrack'
import { PagerDotIndicator, IndicatorViewPager } from 'rn-viewpager';

class ArtistDetail extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemArtist');

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

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={2} />;
    }

    render() {
        const { navigation } = this.props;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>

                </View>
            )
        }
        const itemId = navigation.getParam('itemArtist');
        let IconComponent = Ionicons;
        let itemArtist = this.state.dataArtist
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.statusBar} />
                <TouchableOpacity style={styles.appBar} >
                    <IconComponent onPress={() => navigation.goBack()} style={styles.backButton} name={'ios-arrow-back'} size={25} color={'white'} />
                </TouchableOpacity>

                <Image style={styles.itemImage} source={{ uri: itemArtist.picture_medium }} />
                <Text style={styles.textArtist} ellipsizeMode='tail' numberOfLines={1}>{itemArtist.name}</Text>
                <IndicatorViewPager style={{ height: 200, flex: 1 }} indicator={this._renderDotIndicator()}>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <ArtistTrack itemId={itemArtist.id} navigation={navigation}>

                        </ArtistTrack>
                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <ArtistDes itemId={itemArtist.id} navigation={navigation}>

                        </ArtistDes>
                    </View>

                </IndicatorViewPager>
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