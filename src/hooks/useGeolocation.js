import {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {Alert, PermissionsAndroid, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateGeolocation} from '../redux/actions';
import Geolocation from 'react-native-geolocation-service';
import {GEOLOCATION_DELAY} from '../config/config';

Geolocation.setRNConfiguration({authorizationLevel: 'always'});

export const useGeolocation = () => {
  const geolocations = useSelector((state) => state.appState.geolocations);
  const isUserRegistered = useSelector(
    (state) => state.appState.isUserRegistered,
  );
  const dispatch = useDispatch();

  const getGeolocation = () => {
    Geolocation.getCurrentPosition(
      ({timestamp, coords: {latitude, longitude}}) => {
        console.log({timestamp, latitude, longitude});
        dispatch(updateGeolocation({timestamp, latitude, longitude}));
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: GEOLOCATION_DELAY,
      },
    );
  };

  const invokeGetGeolaction = async () => {
    try {
      const permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permission) {
        getGeolocation();
      } else {
        Alert.alert(
          'Location Permission',
          'This app needs location permission to work',
          [{text: 'Settings', onPress: () => Linking.openSettings()}],
          {cancelable: false},
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isUserRegistered) {
      invokeGetGeolaction();
      BackgroundTimer.runBackgroundTimer(async () => {
        invokeGetGeolaction();
      }, GEOLOCATION_DELAY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserRegistered]);

  return geolocations;
};
