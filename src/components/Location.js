import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Location = ({time, location}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'column',
    height: 50,
  },
  time: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    color: '#4B5860',
    marginRight: 8,
    fontSize: 10,
  },
  location: {fontFamily: 'Helvetica Neue', color: '#4B5860', fontSize: 10},
});
