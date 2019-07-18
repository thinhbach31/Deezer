
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import axios from 'axios'
import * as Progress from 'react-native-progress'
import ProgressBar from 'react-native-progress/Circle';
import ItemRadio from './item/ItemRadio';

class Radio extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount() {
        this.fetchByAxiosLoadMore()
    }

    _renderItemRadio = ({ item }) => (
        <ItemRadio item={item} />
    )

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.statusBar} />
                    <View style={styles.appBar}>
                        <Text style={styles.textAppBar}>Radio</Text>
                    </View>
                    
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.statusBar} />
                <View style={styles.appBar}>
                    <Text style={styles.textAppBar}>Radio</Text>
                </View>
                <ScrollView>

                    <View style={styles.viewChild}>
                        <Text style={styles.textTitle}>Top chart:</Text>
                        <FlatList
                            data={this.state.data.data}
                            renderItem={this._renderItemRadio}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

    fetchByAxiosLoadMore = () => {

        axios
            .get(
                "https://api.deezer.com/radio/genres"
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
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },
    progress: {
        margin: 10,
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

export default Radio