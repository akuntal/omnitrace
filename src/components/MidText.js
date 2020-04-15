import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Link} from './Link';
import {NavigationLink} from './NavigationLink';

export const MidText = () => (
  <>
    <Text style={styles.intersectionText}>
      Your location data has been compared with 1 million records in the central
      database and found some intersections.
    </Text>
    <Text style={[styles.intersectionText, [{fontWeight: 'bold'}]]}>
      Your risk of infection is medium.
    </Text>
    <Text style={styles.intersectionText}>
      We rocommend you to consult the doctor.
    </Text>
    <Text style={[styles.intersectionText, [{marginBottom: 10}]]}>
      Per Govt guidelines, you need to&nbsp;
      <NavigationLink text="add your location history" screen="Chatbot" />
      &nbsp; history which will be used for research and managing current health
      crisis.
    </Text>
    <Text style={styles.intersectionText}>
      Follow these &nbsp;
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
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
});
