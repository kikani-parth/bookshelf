import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { searchBooks } from '../services/bookApi';
import BookItem from '../components/BookItem';
import { Book } from '../types';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type BookDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BookDetails'
>;

function DiscoverScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [defaultBooks, setDefaultBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchDefaultBooks() {
      try {
        const results = await searchBooks('harrypotter');
        setDefaultBooks(results);
      } catch (err) {
        setError('Failed to load default books');
      } finally {
        setLoading(false);
      }
    }

    fetchDefaultBooks();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (book: Book) => {
    navigation.navigate('BookDetails', { book });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search books..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#6200EE" />}

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Default Books */}
      {books.length === 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={defaultBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookItem item={item} onPress={() => handleBookPress(item)} />
          )}
        />
      )}

      {/* Searched Books List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookItem item={item} onPress={() => handleBookPress(item)} />
        )}
      />
    </View>
  );
}

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
