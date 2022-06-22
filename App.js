import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import React from 'react';
import { RecoilRoot } from "recoil";

import Main from './screens/main'
import RecentKeywords from './screens/recentKeywords'
import MovieSearch from './screens/movieSearch'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="main"
            component={Main} />
          <Stack.Screen
            name="recentKeywords"
            component={RecentKeywords} />
          <Stack.Screen
            name="movieSearch"
            component={MovieSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App;
