import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Link} from './Link';
import {STATUS_COLORS} from '../utils';

export const HighText = () => (
  <>
    <Text
      style={[
        styles.intersectionText,
        [{color: STATUS_COLORS.high, marginBottom: 10}],
      ]}>
      You are advised for testing as your risk of infection is high. Pleae call
      the help line 1075 immediately. &nbsp;
    </Text>
    <Text style={styles.intersectionText}>
      Visit &nbsp;
      <Link text="https://www.mohfw.gov.in/" url="https://www.mohfw.gov.in/" />
      &nbsp; for info on testing and quarantine guidelines.
    </Text>
  </>
);

const styles = StyleSheet.create({
  intersectionText: {
    color: '#4B5860',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
});
