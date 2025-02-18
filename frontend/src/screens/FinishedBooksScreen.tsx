import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useBooks } from '../context/BookContext';
import BookItem from '../components/BookItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

function FinishedBooksScreen() {
  const { finishedBooks } = useBooks();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {finishedBooks.length === 0 ? (
        <Text style={styles.emptyText}>No finished books yet.</Text>
      ) : (
        <FlatList
          data={finishedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookItem
              item={item}
              onPress={() => navigation.navigate('BookDetails', { book: item })}
            />
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
});

export default FinishedBooksScreen;
