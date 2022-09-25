/**
 *
 * DetailsScreen
 *
 */

import { getSensors, setLoading } from 'containers/SensorsScreen/actions';
import { Button, Divider, HStack, Image, Text, TextArea, VStack } from 'native-base';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'containers/HomeScreen/actions';
import { getSensorImage, getStatus, getType } from '../../utils/helper';

let Alert = require('app/images/alert.png');
let ImagePlaceholder = require('app/images/image.png');
let Power = require('app/images/power.png');
let LeftIcon = require('app/images/chevron-left.png');
var ObjectID = require('bson-objectid');

const DetailsScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const primaryRealm = useSelector(state => state?.home?.primaryRealm);
  const user = useSelector(state => state?.home?.user);
  const [sensor, setSensor] = React.useState(props?.route?.params?.sensor ?? {});
  const [notes, setNotes] = React.useState(sensor?.notes ?? '');
  const [isAcknowledging, setIsAcknowledging] = React.useState(false);
  const isAcknowledgeButtonRef = useRef();

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#053333',
      },
      headerTitle: () => (
        <Text fontSize={18} fontWeight={700} color={'white'}>
          Alert Detail
        </Text>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            dispatch(logoutUser(navigation));
            navigation.navigate('Home');
          }}
        >
          <Image alt="Img" size={6} marginRight={3} source={Power} />
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Image alt="Img" size={7} marginLeft={3} source={LeftIcon} />
        </Pressable>
      ),
    });
  }, []);

  const onSubmitAcknowledgeOrBack = async () => {
    setIsAcknowledging(true);
    if (sensor?.acknowledged) {
      setIsAcknowledging(false);
      return navigation.navigate('Sensors');
    } else {
      dispatch(setLoading(true));
      primaryRealm.write(() => {
        let sensorFromRealm = primaryRealm.objects('sensors').filtered('_id = $0', ObjectID(sensor?._id));
        sensorFromRealm[0].notes = notes ?? '';
        sensorFromRealm[0].acknowledged = true;
        sensorFromRealm[0].acknowledgedBy = user?.id;
        setSensor(sensorFromRealm[0]);
        setIsAcknowledging(false);
        dispatch(getSensors(primaryRealm));
      });
    }
  };

  return (
    <InputScrollView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ padding: 15 }}>
            <View style={{ backgroundColor: 'white' }}>
              <VStack space={2}>
                <HStack marginRight={2} h={7} alignItems="center" justifyContent="center">
                  <Image marginTop={3} alt="Img" height={55} width={50} source={Alert} />
                  <Text marginBottom={0} fontSize={25} fontWeight={600}>
                    Alert
                  </Text>
                </HStack>
                <Text h={8} paddingTop={-60} textAlign={'center'} fontSize={25} fontWeight={600}>{`${getType(
                  sensor?.code
                )} Detected`}</Text>
                <HStack h={8} alignItems={'center'} justifyContent="center">
                  <Text fontSize={20} fontWeight={400}>
                    Status:{' '}
                  </Text>
                  <Text color={sensor?.acknowledged ? 'green.700' : 'orange.400'} fontSize={20} bold fontWeight={400}>
                    {getStatus(sensor?.acknowledged)}
                  </Text>
                </HStack>
              </VStack>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ padding: 15 }}>
            <View style={{ backgroundColor: 'white' }}>
              <VStack space={2}>
                <HStack paddingRight={0} space={2} h={7} alignItems="center">
                  <Image alt="Img" height={25} width={25} source={ImagePlaceholder} />
                  <Text paddingBottom={5} fontSize={20} fontWeight={300}>
                    Images
                  </Text>
                </HStack>
                <Divider />
                <Image
                  h={'80'}
                  source={{
                    uri: getSensorImage(sensor?.data),
                  }}
                />
              </VStack>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ padding: 15 }}>
            <View style={{ backgroundColor: 'white' }}>
              <VStack space={2}>
                <Text fontSize={15} fontWeight={600}>
                  Provide Clarifications
                </Text>
                <TextArea
                  blurOnSubmit={true}
                  ref={isAcknowledgeButtonRef}
                  isDisabled={sensor?.acknowledged}
                  value={notes}
                  onChangeText={value => {
                    setNotes(value);
                  }}
                  h={20}
                  placeholder="Add Notes..."
                />
                <Button
                  _spinner={{
                    color: 'black',
                  }}
                  _loading={{
                    bg: 'amber.400:alpha.70',
                    _text: {
                      color: 'black',
                      fontSize: 19,
                      fontWeight: 600,
                    },
                  }}
                  isLoadingText="Acknowledging"
                  isLoading={isAcknowledging}
                  onPress={() => onSubmitAcknowledgeOrBack()}
                  color={'black'}
                  backgroundColor={'green.500'}
                  borderColor={'black.500'}
                  variant="outline"
                >
                  <Text fontSize={19} fontWeight={600}>
                    {sensor?.acknowledged ? 'Back To Alerts' : 'Acknowledge'}
                  </Text>
                </Button>
              </VStack>
            </View>
          </View>
        </View>
      </ScrollView>
    </InputScrollView>
  );
};

export default DetailsScreen;
