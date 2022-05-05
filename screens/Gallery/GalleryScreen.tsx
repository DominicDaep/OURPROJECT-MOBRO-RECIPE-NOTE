import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import Gallery from '../../constants/Gallery';
import Guide from '../../constants/Gallery';

const { width } = Dimensions.get('window')
const height = width * 1.5

export default function GuideScreen() {
  return (

     // Images with scrollView set in horizontal left/right
    <View style={styles.container}>

      
      <ScrollView
        horizontal
        pagingEnabled
        style={{ width, height, }}
      >
        {
          Guide.map((guide, index) => (
            
            <View
                style={{width,justifyContent: 'center', alignItems: 'center'}}
            >
              <Image key={index} source={Gallery.image} style={{ width: width*.9, height: '50%', resizeMode: 'center', borderWidth: 1, borderColor: 'white' }}/>
              <Text style ={{ paddingTop: 30, fontSize: 30, color: '#7FB5FF'}}>
                Mobro Gallery Recipe
              </Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#112B3C',
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  },

});
