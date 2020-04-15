import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const NavigationLink = (props) => {
  const navigation = useNavigation();

  return (
    <Text style={styles.link} onPress={() => navigation.navigate(props.screen)}>
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
