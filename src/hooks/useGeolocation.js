import {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {Alert, PermissionsAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateGeolocation} from '../redux/actions';
import {GEOLOCATION_DELAY} from '../utils';

navigator.geolocation = require('@react-native-community/geolocation');

navigator.geolocation.setRNConfiguration({authorizationLevel: 'always'});
export const useGeolocation = () => {
  const geolocations = useSelector((state) => state.appState.geolocations);
  const isUserRegistered = useSelector(
    (state) => state.appState.isUserRegistered,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Location Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  const getGeolocation = () => {
    if (navigator.geolocation) {
      // navigator.geolocation.requestAuthorization();
      navigator.geolocation.getCurrentPosition(
        ({timestamp, coords: {latitude, longitude}}) => {
          dispatch(updateGeolocation({timestamp, latitude, longitude}));
        },
        (error) => {
          console.log(error);
          // Alert.alert('Error', JSON.stringify(error));
        },
        {
          enableHighAccuracy: true,
          maximumAge: GEOLOCATION_DELAY,
        },
      );
    } else {
      Alert.alert('Error', 'geolocation not supported!!!');
    }
  };

  useEffect(() => {
    if (isUserRegistered) {
      getGeolocation();
      BackgroundTimer.runBackgroundTimer(() => {
        getGeolocation();
      }, GEOLOCATION_DELAY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserRegistered]);

  return geolocations;
};
