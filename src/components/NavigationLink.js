import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CHATBOT_URL_2} from '../config/config';

export const NavigationLink = (props) => {
  const navigation = useNavigation();

  return (
    <Text
      style={styles.link}
      onPress={() =>
        navigation.navigate(props.screen, {
          btnLabel: 'Done',
          url: CHATBOT_URL_2,
        })
      }>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#006BB6',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
});
