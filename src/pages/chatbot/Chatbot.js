import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {Header} from '../../components/Header';
import {CHATBOT_URL_1} from '../../config/config';
import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

// Assets my Risk // Done
export const Chatbot = ({
  route: {
    params: {
      btnLabel = 'Assess My Risk',
      title = 'Update Location History',
      url = CHATBOT_URL_1,
    },
  },
}) => {
  const navigation = useNavigation();

  let [counter, setCounter] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCounter(counter++);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header title={title} />
      <View style={styles.scrollView}>
        <WebView
          key={`key-webview-${counter}`}
          startInLoadingState={true}
          source={{
            uri: `${url}&nocache=${new Date().getTime()}`,
          }}
        />
      </View>
      <View style={styles.button}>
        <Button handlerPress={() => navigation.goBack()} label={btnLabel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: Dimensions.get('window').height - 140,
  },
  button: {
    paddingTop: 20,
    width: 200,
    alignSelf: 'center',
  },
});
