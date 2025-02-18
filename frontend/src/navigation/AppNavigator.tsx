import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import BookDetailsScreen from '../screens/BookDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          headerTitle: 'Book Details',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
}
