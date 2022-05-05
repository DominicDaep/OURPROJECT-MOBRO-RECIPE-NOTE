import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// for the user account in the drawer
const CustomeDrawer = props => {
  return (
    <View style={{flex: 1, height: 80,}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#112B3C'}}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={{padding: 20, alignItems: 'center'}}>
          <Image
            source={require('../assets/images/person.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Mia Reid
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              20 Recipes
            </Text>
            <FontAwesome5 name="book" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#112B3C', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>


    <View>
   
    </View>
      
    </View>
  );
};

export default CustomeDrawer;