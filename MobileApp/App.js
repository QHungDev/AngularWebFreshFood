import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as splashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {Cart,ProductDetail,NewRivals} from './screens';
const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    'extrabold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'light': require('./assets/fonts/Poppins-Light.ttf'),
    'bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'extrabold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await splashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // You can render a loading indicator here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='Bottom TabNavigation'
        component={BottomTabNavigation}
        options={{headerShown: false}}
        />
         <Stack.Screen 
        name='Cart'
        component={Cart}
        options={{headerShown: false}}
        />
         <Stack.Screen 
        name='ProductDetail'
        component={ProductDetail}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name='ProductList'
        component={NewRivals}
        options={{headerShown: false}}
        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
