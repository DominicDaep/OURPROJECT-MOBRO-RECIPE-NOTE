import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { getData, storeData } from '../../database/StoreData';
import { useNavigation } from '@react-navigation/native';

export default function AddNoteScreen() {

  const image = { uri: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" };

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation();

  const submitNote = async () => {
    setLoading(true)
    setTimeout(async () => {
      const data = {
        title: title,
        description: description,
        time: Date.now(),
      }

      const noteList = await getData('noteList');
      if (noteList) {
        const json = JSON.parse(noteList);
        const mergeNoteList = [data, ...json];
        storeData('noteList', JSON.stringify(mergeNoteList));
      } else {
        storeData('noteList', JSON.stringify([data]));
      }
      setTitle('');
      setDescription('');
      navigation.navigate("Recipes", {
        screen: "HomePage"
      })
      setLoading(true)
    }, 1200)
  }

  return (
<ImageBackground  source={image} resizeMode="cover" style = {styles.background}>

<View style={styles.container}>
      <TextInput 
        label='Recipe Name'
        autoComplete={false}
        mode={'flat'}
        style={styles.title}
        underlineColor={Colors.txt}
        activeUnderlineColor={Colors.btn}
        value={title}
        onChangeText={setTitle}
        theme={{
          colors: {
            text: Colors.txt,
          }
        }}
      />
      <TextInput
        label=''
        autoComplete={false}
        mode={'outlined'}
        style={styles.desc}
        outlineColor={Colors.txt}
        activeOutlineColor={Colors.btn}
        multiline={true}
        value={description}
        onChangeText={setDescription}
        theme={{
          colors: {
            text: Colors.txt,
          }
        }}
      />

      {title !== '' && description !== '' ?
        <Button
          title="SUBMIT"
          loading={loading}
         
          iconRight
          iconContainerStyle={{ marginRight: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: '#2155CD',
            borderColor: 'transparent',
            borderWidth: 0,
        
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => {
            submitNote();
          }}
        />
        : null}
    </View>

</ImageBackground>

    
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 90,
  },
  title: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    height: 50,
    width: Dimensions.get('screen').width - 70,
    marginVertical: 10,
    backgroundColor: '#C4DDFF'
  },
  desc: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    height: 300,
    width: Dimensions.get('screen').width - 70,
    marginVertical: 10,
    paddingVertical: 20,
    backgroundColor: '#C4DDFF'
  },
  background:{
    width: '100%',
    height: '100%',
    
  },
});
