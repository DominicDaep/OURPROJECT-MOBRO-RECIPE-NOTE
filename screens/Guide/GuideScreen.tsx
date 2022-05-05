import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import Guide from '../../constants/Guide';

const { width } = Dimensions.get('window')
const height = width * 1.5

export default function GuideScreen() {
  return (


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
              <Image
                key={index}
                source={guide.image}
                style={{ width: width*.9, height: '50%', resizeMode: 'center', borderWidth: 1, borderColor: 'white' }}
              />
              <Text style ={{
                paddingTop: 30,
                fontSize: 30,
                color: '#7FB5FF'}}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#112B3C',
    paddingVertical: 20,
  },

});
