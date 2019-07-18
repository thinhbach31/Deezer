import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default function InjectMain(Com) {
  class InjMan extends Component {
    render() {
      return (
        <SafeAreaView style={{ flexGrow: 1 }}>
          <Com {...this.props} />
        </SafeAreaView>
      )
    }
  }
  return InjMan;
}
