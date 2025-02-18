import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      await login(username, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={{ paddingTop: 20, flex: 1, marginTop: 50 }}>
      <AuthForm
        title="Login"
        onPress={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        navigationText="Don't have an account?"
        navigationLink="Register"
      />
    </View>
  );
}

export default LoginScreen;
