import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Book } from '../types';

const placeholderImage = require('../../assets/book-cover-placeholder.jpg');

function BookItem({ item }: { item: Book }) {
  return (
    <View style={styles.bookItem}>
      {/* {item.coverImage && (
        <Image source={{ uri: item.coverImage }} style={styles.bookImage} />
      )} */}
      <Image
        source={item.coverImage ? { uri: item.coverImage } : placeholderImage}
        style={styles.bookImage}
      />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPublished}>{item.publishedDate}</Text>
      </View>
    </View>
  );
}

export default BookItem;

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    height: 100,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 5,
  },

  bookImage: {
    width: 55,
    height: 75,
    marginRight: 12,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  bookPublished: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
