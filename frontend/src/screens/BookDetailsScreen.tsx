import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Book } from '../types';
const placeholderImage = require('../../assets/book-cover-placeholder.jpg');
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useBooks } from '../context/BookContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function BookDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BookDetails'>>();
  const { book }: { book: Book } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { addToReadingList } = useBooks();

  function handleAddButtonPress() {
    addToReadingList(book);
    navigation.goBack();
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.detailsContainer}>
        {book.coverImage && (
          <Image
            source={
              book.coverImage ? { uri: book.coverImage } : placeholderImage
            }
            style={styles.coverImage}
          />
        )}
        <Text style={styles.title}>{book.title}</Text>
        {book.author && <Text style={styles.author}>By {book.author}</Text>}
        {book.publishedDate && (
          <Text style={styles.published}>Published: {book.publishedDate}</Text>
        )}
        {book.description && (
          <Text style={styles.description}>{book.description}</Text>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddButtonPress}
        >
          <Text style={styles.addButtonText}>Add to Reading List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  published: {
    fontSize: 16,
    color: '#888',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
