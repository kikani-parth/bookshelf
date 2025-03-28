import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { BookProvider } from './src/context/BookContext';

function MainApp() {
  const { token } = useAuth();
  return (
    <NavigationContainer>
      {/* If authenticated, show the app otherwise, show the Register/Login Screen */}
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <MainApp />
      </BookProvider>
    </AuthProvider>
  );
}
