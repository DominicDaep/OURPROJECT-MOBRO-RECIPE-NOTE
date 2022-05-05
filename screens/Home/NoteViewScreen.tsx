import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Alert, ImageBackground } from 'react-native';

import Colors from '../../constants/Colors';
import { getData, storeData } from '../../database/StoreData';
import { HomeParamList } from '../../types';


type IRoute = {
  "params": HomeParamList['NoteView'];
}

export default function NoteViewScreen() {
  const image = { uri: "https://images.unsplash.com/photo-1636743713732-125909a35dcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1370&q=80" };
  const route = useRoute<RouteProp<IRoute, "params">>();
  const { title, description, time } = route.params.note
  const index = route.params.index;


  const removeItem = async () => {
    const data = {
      title: title,
      description: description,
      time: Date.now(),
    }
    const noteList = await getData('noteList')
    if (noteList) {
      const json = JSON.parse(noteList);
      json.splice(index, 1)
      storeData('noteList', JSON.stringify(json));
    } else {
      storeData('noteList', JSON.stringify([data]));
    }

    navigation.navigate("Recipes", {
      screen: "HomePage"
    })
  }

  const popUpAlert = () => {
    Alert.alert('Are You Sure you want to delete this recipe note?', 'Permanent Deletion',
      [
        {
          text: 'Cancel',
          onPress: () => { }
        },
        {
          text: 'Delete',
          onPress: removeItem
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const navigation = useNavigation();


  return (

<ImageBackground  source={image} resizeMode="cover" style = {styles.background}>

<View style={styles.container}>
      <View style={{backgroundColor: '#E6F8F6', opacity: 10, borderRadius: 30}}>
        <Text
          style={styles.time}
        >
         
        </Text>
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <ScrollView style={styles.desccontainer}>
          <Text
            style={styles.desc}
          >
            {description}
          </Text>
        </ScrollView>

        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
              backgroundColor: '#7FB5FF',
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor:'#0074E4',

            }}
            onPress={popUpAlert}
          >
            <Ionicons
              name='trash'
              size={25}
              color='#03414D'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
              backgroundColor: '#C4DDFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.txt,

            }}
            onPress={() => {
              navigation.navigate("Recipes", {
                screen: "EditNote",
                params: { note: route.params.note, index: index }
              })
            }}
          >
            <Ionicons
              name='pencil-sharp'
              size={25}
              color='black'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

</ImageBackground>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    
  },
  btncontainer: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    flexDirection: 'row',
  
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
    color: Colors.txt,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 30,
    color: Colors.txt,
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingHorizontal: 5,
    paddingLeft: 10
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
    color: Colors.txt,
    paddingLeft: 10
  },
  desccontainer: {
    marginBottom: 75,
  },
  background:{
    width: '100%',
    height: '100%',
    
  },
});
