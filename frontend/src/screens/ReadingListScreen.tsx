import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useBooks } from '../context/BookContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BookItem from '../components/BookItem';
import { useNavigation } from '@react-navigation/native';

function ReadingListScreen() {
  const {
    readingList,
    moveToFinished,
    removeFromReadingList,
    fetchReadingList,
  } = useBooks();
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={() => moveToFinished(item.id)}
                >
                  <Text style={styles.buttonText}>Mark as Finished</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromReadingList(item.id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
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
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ReadingListScreen;
