import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useBooks } from '../context/BookContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BookItem from '../components/BookItem';
import { useNavigation } from '@react-navigation/native';

function ReadingListScreen() {
  const { readingList, fetchReadingList } = useBooks();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchReadingList();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#6200EE" />}
      {readingList.length === 0 ? (
        <Text style={styles.emptyText}>Your reading list is empty.</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={readingList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookContainer}>
              <BookItem
                item={item}
                onPress={() =>
                  navigation.navigate('BookDetails', { book: item })
                }
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  bookContainer: {
    marginBottom: 10,
  },
});

export default ReadingListScreen;
