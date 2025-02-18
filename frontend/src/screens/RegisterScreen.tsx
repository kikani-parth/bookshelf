import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function RegisterScreen() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      await register(username, password);
      Alert.alert('Success', 'Account created!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={{ paddingTop: 20, flex: 1, marginTop: 50 }}>
      <AuthForm
        title="Register"
        onPress={handleRegister}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        navigationText="Already have an account?"
        navigationLink="Login"
      />
    </View>
  );
}

export default RegisterScreen;
