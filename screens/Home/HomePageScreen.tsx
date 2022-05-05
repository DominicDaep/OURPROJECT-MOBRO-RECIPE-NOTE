import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation,   } from '@react-navigation/native';
import { Fragment,useEffect } from "react";
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Dimensions, TextInput, BackHandler, ImageBackground } from 'react-native';
import Colors from '../../constants/Colors';
import { getData } from '../../database/StoreData';
import { Notes } from '../../models/Notes';
import Lottieview from "lottie-react-native";
import ViewWithLoading from '../../components/ViewWithLoading';





export default function HomePageScreen() {
  const [loading, setloading]= useState(false)
  const image = { uri: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" };

  const [note, setNote] = useState<Array<Notes> | null>(null);
  const [search, setSearch] = useState<string>('')
  const [searchRes, setSearchRes] = useState<boolean>(false)

  const navigation = useNavigation();

  const retrieveData = async () => {
    const noteList = await getData('noteList');
    if (noteList) {
      const json = JSON.parse(noteList);
      setNote(json);
    }
  }

  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setSearch('')
      setSearchRes(false)
      retrieveData()
    }
    const filteredNote = note?.filter(notes => {
      if (notes.title.toLowerCase().includes(text.toLowerCase())) {
        return notes;
      }
    })
    if (filteredNote?.length) {
      setNote([...filteredNote])
    } else {
      setSearchRes(true)
    }
  }

  const handleClear = () => {
    setSearch('')
    setSearchRes(false)
    retrieveData()
  }

  useFocusEffect(
    useCallback(() => {
      retrieveData();
    }, [])
  )

  useEffect(() =>{
    setloading(true);
    setTimeout(() => {
    setloading(false);
    console.log(loading);
    4}, 3000);
    },[])

  return (
    <ViewWithLoading loading={loading}>
      <ImageBackground  source={image} resizeMode="cover" style = {styles.background}>
<View style={styles.container}>
      {note?.length ?
        <View
          style={styles.searchbarContainer}
        >
          
          {search ? (
            <AntDesign
              name='close'
              size={20}
              color={Colors.txt}
              onPress={handleClear}
              style={styles.clearIcon}
            />
          ) : null}
        </View>
        
        : null}
      {searchRes ?
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          
          <Text
            style={styles.emptyHeader}
          >
            Note not found!!
          </Text>
        </View>
        :
        <ScrollView style={styles.listcontainer}>
          <View>
          <Text style={{
               fontSize: 30, color: '#0AA1DD', 
               backgroundColor: '#112B3C',
               width: '100%',
               alignSelf: 'center',
               paddingLeft: 10, 
               fontWeight: 'bold'
               }}>MOBRO RECIPE NOTE</Text>
            {note && note.map((notes: Notes, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("NoteView", {
                    note: notes, index: index
                  });
                  setSearch('')
                }}
              >
             

                <View style={styles.notecontainer}

                >
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                  >
                    {notes.title}
                  </Text>
                  <Text
                    style={styles.desc}
                    numberOfLines={2}
                  >
                    {notes.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
      }


      <View style={styles.btncontainer}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
            justifyContent: 'center',
            alignItems: 'center',

            marginRight: 10

          }}
          onPress={() => {
            navigation.navigate("Recipes", {
              screen: "AddNote"
            });
          }}
        >
          <Ionicons style = {styles.icons}
            name='add'
            size={40}
            color='#A0F6D2'
          />
        </TouchableOpacity>
      </View>
      {!note?.length ?
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Text
            style={styles.emptyHeader}
          >
            Add Note
          </Text>
        </View>
        : null}
    </View>
</ImageBackground>
  
      </ViewWithLoading>
  



    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80
  },
  btncontainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  notecontainer: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#7FB5FF',
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
 
  },
  listcontainer: {
    width: Dimensions.get('screen').width - 20,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    color: Colors.txt,
    fontSize: 24,
    fontWeight: 'bold',

  },
  desc: {
    color: Colors.txt,
    fontSize: 16,
    opacity: 0.5
  },
  emptyHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  searchbarContainer: {
    justifyContent: 'center',
  },
  searchbar: {
    borderWidth: 1,
    borderColor: Colors.txt,
    height: 40,
    borderRadius: 40,
    paddingLeft: 20,
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
    marginVertical: 10,
    color: Colors.txt,
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
  },
  lottie: {
    width: Dimensions.get('screen').width * .7,
    height: Dimensions.get('screen').height * .25,
  },
  icons:{
backgroundColor: '#0A3442',
width: 50,
height: 50,
alignItems: 'center',
borderRadius: 30
  },
  background:{
    width: '100%',
    height: '100%',
    
  },
});
