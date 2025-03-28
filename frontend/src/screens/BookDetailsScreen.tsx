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

  const {
    readingList,
    finishedBooks,
    addToReadingList,
    moveToFinished,
    removeBook,
  } = useBooks();

  // Check if book exists in reading list or finished books
  const isInReadingList = readingList.some((b) => b.id === book.id);
  const isInFinishedBooks = finishedBooks.some((b) => b.id === book.id);

  // Determine button label based on book status
  const actionButtonLabel = isInReadingList
    ? 'Mark as Finished'
    : 'Add to Reading List';

  async function handleActionButtonPress() {
    if (isInReadingList) {
      await moveToFinished(book.id);
    } else {
      await addToReadingList(book);
    }
    navigation.goBack();
  }

  async function handleRemoveButtonPress() {
    console.log(book.id);
    await removeBook(book.id);
    navigation.goBack();
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.detailsContainer}>
        {book.cover_image && (
          <Image
            source={
              book.cover_image ? { uri: book.cover_image } : placeholderImage
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

        {/* Add/Mark as Finished Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleActionButtonPress}
        >
          <Text style={styles.buttonText}>{actionButtonLabel}</Text>
        </TouchableOpacity>

        {/* Remove Button (Disabled if book isn't in any list) */}
        <TouchableOpacity
          style={[
            styles.removeButton,
            !(isInReadingList || isInFinishedBooks) && styles.disabledButton,
          ]}
          onPress={handleRemoveButtonPress}
          disabled={!(isInReadingList || isInFinishedBooks)}
        >
          <Text style={styles.buttonText}>Remove</Text>
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
