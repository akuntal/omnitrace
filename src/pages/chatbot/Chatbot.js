import React from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {Header} from '../../components/Header';
import {CHATBOT_URL_1} from '../../config/config';

export const Chatbot = () => (
  <View style={styles.container}>
    <Header title="Chatbot" />

    <WebView
      source={{
        uri: CHATBOT_URL_1,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
