import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
import DiscoverScreen from '../screens/DiscoverScreen';
import ReadingListScreen from '../screens/ReadingListScreen';
import FinishedBooksScreen from '../screens/FinishedBooksScreen';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

type IconName = 'search' | 'bookmarks' | 'checkmark-done';

export default function BottomTabNavigator() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ fontSize: 16, color: 'red' }}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Discover') iconName = 'search';
          else if (route.name === 'Reading List') iconName = 'bookmarks';
          else if (route.name === 'Finished Books') iconName = 'checkmark-done';

          return (
            <Ionicons name={iconName as IconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Reading List" component={ReadingListScreen} />
      <Tab.Screen name="Finished Books" component={FinishedBooksScreen} />
    </Tab.Navigator>
  );
}
