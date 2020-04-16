import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {STATUS_COLORS} from '../../utils';
import {Location} from '../../components/Location';
import {useGeolocation} from '../../hooks/useGeolocation';
import {uploadGeolocation} from './uploadGeolocation';
import {fetchStatus, fetchAllAddress} from '../../hooks/useGetStatus';
import {Header} from '../../components/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AlertComponent} from '../../components/Alert';
import {Button} from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateWaitingStatus,
  updateStatus,
  updateLastUploadTime,
} from '../../redux/actions';
import {LowText} from '../../components/LowText';
import {MidText} from '../../components/MidText';
import {HighText} from '../../components/HighText';
import Images from '../../components/Images';
import {FETCH_STATUS_DELAY} from '../../config/config';

const afterUploadNotification =
  'Your location data is uploaded. Please wait for assessment results. ';
const normalNotification = 'Your location is being tracked.';

const uploadingNotification = 'Your location data is uploading...';

export default function Home() {
  const isUserRegistered = useSelector(
    (state) => state.appState.isUserRegistered,
  );

  const user = useSelector((state) => state.appState.user);

  const status = useSelector((state) => state.appState.status);

  const isStatusWaiting = useSelector(
    (state) => state.appState.isStatusWaiting,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  if (!isUserRegistered) {
    navigation.navigate('Profile');
  }

  const geolocations = useGeolocation();

  const [notification, setNotification] = useState(normalNotification);

  const [showAlert, setShowAlert] = useState(false);

  const fetchStatusNow = () => {
    fetchStatus(user.phone).then(async (res) => {
      if (res && res.data.length) {
        const [originalStatus] = res.data;
        try {
          const addresses = await fetchAllAddress(originalStatus.intersections);

          originalStatus.intersections = originalStatus.intersections.map(
            ({timestamp}, i) => ({
              timestamp,
              display_name: addresses[i].display_name,
            }),
          );
          console.log(originalStatus);
          dispatch(updateStatus(originalStatus));
        } catch (err) {
          dispatch(updateStatus(originalStatus));
        }
        dispatch(updateWaitingStatus(false));
        resetNotification(0);
      } else {
        setTimeout(fetchStatusNow, FETCH_STATUS_DELAY);
      }
    });
  };

  useEffect(() => {
    if (isStatusWaiting) {
      setNotification(afterUploadNotification);
      fetchStatusNow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerUploadPress = () => {
    setShowAlert(false);

    setNotification(uploadingNotification);

    uploadGeolocation({...user, userData: geolocations}).then((res) => {
      if (res) {
        setNotification(afterUploadNotification);

        dispatch(updateWaitingStatus(true));
        dispatch(updateLastUploadTime(new Date().getTime()));

        fetchStatusNow();
      } else {
        resetNotification(0);
      }
    });
  };

  const resetNotification = (time = 5000) => {
    setTimeout(() => {
      setNotification(normalNotification);
    }, time);
  };

  const circleStyles = (color) => {
    return {...styles.circle, borderColor: color};
  };

  const statusTextStyles = (color) => {
    return {...styles.statusText, color};
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header showLogo={true} />
      <ScrollView>
        <SafeAreaView style={styles.mainContainer}>
          {!status.status && (
            <View style={styles.message}>
              <Text style={styles.messageText_HomeScreen}>
                Your current location data is being gathered.
              </Text>
              <View style={styles.imageContainer}>
                <Image
                  source={Images.image4}
                  style={{height: 100, width: 100}}
                />
              </View>

              <Text style={styles.messageText_HomeScreen}>
                You can assess your risk, basis your location data by clicking
                the button below.
              </Text>
              <Text style={styles.messageText_HomeScreen}>
                You can also assess your risk basis your past location data by
                navigating to menu
              </Text>
              <Text style={styles.messageText_HomeScreen}>
                We recommend you not to close the app or disable GPS location
                sharing, for unambiguous results.
              </Text>
            </View>
          )}
          {status.status && (
            <View style={styles.containerTop}>
              <Text style={styles.headText}>Risk Factor</Text>
              <View
                style={circleStyles(
                  STATUS_COLORS[status.status.toLowerCase()],
                )}>
                <Text
                  style={statusTextStyles(
                    STATUS_COLORS[status.status.toLowerCase()],
                  )}>
                  {status.status.toUpperCase()}
                </Text>
              </View>
              <View style={styles.intersectionTextContainer}>
                {status.status.toLowerCase() === 'high' && <HighText />}
                {status.status.toLowerCase() === 'mid' && <MidText />}
                {status.status.toLowerCase() === 'low' && <LowText />}
              </View>
            </View>
          )}
          {status.intersections && !!status.intersections.length && (
            <>
              <View style={styles.exposureHeaderTextContainer}>
                <Text
                  style={[
                    styles.messageText,
                    [{textAlign: 'left', paddingBottom: 8}],
                  ]}>
                  Your potential exposure(s)
                </Text>
              </View>
              <View style={styles.locationsContainer}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                  <View style={styles.body}>
                    {status.intersections.map(
                      ({timestamp, lat, long, display_name}, index) => (
                        <Location
                          key={`key-${timestamp + index}`}
                          time={timestamp}
                          location={
                            display_name
                              ? display_name
                              : `Lat-${lat}, Long-${long}`
                          }
                        />
                      ),
                    )}
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </SafeAreaView>
      </ScrollView>
      <View style={styles.upload}>
        <Button
          handlerPress={() => setShowAlert(true)}
          label="Assess My Risk"
        />
      </View>
      <View style={styles.notificationArea}>
        <Text style={styles.notification}>{notification}</Text>
      </View>
      <AlertComponent
        showAlert={showAlert}
        onCancel={() => setShowAlert(false)}
        onOk={() => handlerUploadPress()}
        message="We will share your location data and will fetch your intersections with infected people. Do you wish to proceed?"
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 90,
  },
  message: {
    //padding: 20,
    paddingTop: 20,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fefefe',
    backgroundColor: '#ffffff',
  },
  messageText: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    color: '#343C41',
  },
  messageText_HomeScreen: {
    paddingBottom: 30,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
    color: '#343C41',
  },
  headText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    color: '#343C41',
  },
  containerTop: {
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  circle: {
    borderRadius: 60,
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
  },
  intersectionTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  exposureHeaderTextContainer: {
    marginTop: 8,
  },
  locationsContainer: {
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  container: {
    opacity: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  scrollView: {
    maxHeight: 150,
  },
  upload: {
    position: 'absolute',
    marginTop: 20,
    width: 150,
    bottom: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  notificationArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#232527',
  },
  notification: {
    color: Colors.light,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    fontFamily: 'Helvetica Neue',
  },
  imageContainer: {
    padding: 10,
    margin: 20,
    marginTop: 10,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
