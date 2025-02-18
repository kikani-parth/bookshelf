import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface AuthFormProps {
  title: string;
  onPress(): void;
  username: string;
  setUsername: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  navigationText: string;
  navigationLink: string;
}

function AuthForm({
  title,
  onPress,
  username,
  setUsername,
  password,
  setPassword,
  navigationText,
  navigationLink,
}: AuthFormProps) {
  const navigation: any = useNavigation(); // change this later

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>

      <View style={styles.navigationContainer}>
        <Text style={styles.navigationText}>{navigationText}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(navigationLink)}>
          <Text style={styles.navigationLink}> {navigationLink}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navigationText: {
    fontSize: 16,
    color: '#555',
  },
  navigationLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default AuthForm;
