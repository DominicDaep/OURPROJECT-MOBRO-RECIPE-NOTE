import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import SettingsNavigator from './SettingsNavigator';
import { FontAwesome } from '@expo/vector-icons';
import GuideNavigator from './GuideNavigator';
import CustomDrawer from '../components/CustomeDrawer';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator<RootStackParamList>();

function RootNavigator() {
  return (



    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer{...props}/>}
      initialRouteName='Recipes'
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#112B3C',
          flex: 1,
          paddingBottom: 200,
          paddingTop: 1,
         
        },
        drawerActiveBackgroundColor: '#0AA1DD',
        drawerActiveTintColor: 'black',
       
        
      }}


    >
    
      <Drawer.Screen name="Recipes" component={HomeNavigator}
       options={{
        
         drawerIcon: ({ color }) =>  <DrawerIcon name="book" color={color} />
       }} 
       
      />
      
         <Drawer.Screen name="Gallery" component={GuideNavigator}
        options={{
          drawerIcon: ({ color }) =>  <DrawerIcon name="image" color={color} />
        }} 
      />


     
     

      
    </Drawer.Navigator>
  );
}

function DrawerIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginLeft: 10, marginRight: -20 }} {...props} />;
}


