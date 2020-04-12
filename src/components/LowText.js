import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Link} from './Link';

export const LowText = () => (
  <>
    <Text style={styles.intersectionText}>Your risk of infection is low.</Text>
    <Text style={styles.intersectionText}>
      We recommend that you stay home to avoid chances of exposure.
    </Text>
    <Text style={styles.intersectionText}>
      Continue to follow these &nbsp;
      <Link
        text="Dos and Donts"
        url="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf"
      />
    </Text>
  </>
);

const styles = StyleSheet.create({
  intersectionText: {
    color: '#4B5860',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
  },
});
