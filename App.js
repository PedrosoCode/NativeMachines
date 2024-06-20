import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import TesteScreen from './src/screens/TesteSCreen';
import { setupDatabase } from './src/db/db';

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="pingpong" component={TesteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
