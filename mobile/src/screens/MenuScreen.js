import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const sampleMenuItems = [
  {
    id: '1',
    name: 'Шашлык из свинины',
    description: 'Нежное свиное мясо, маринованное в секретном соусе по семейному рецепту',
    price: 350,
    weight: '100 г',
    category: 'Шашлыки',
    image: 'https://via.placeholder.com/150', // Placeholder image
    cookingTime: '25 мин',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Шашлык из говядины',
    description: 'Отборная говядина, приготовленная на углях до совершенства',
    price: 420,
    weight: '100 г',
    category: 'Шашлыки',
    image: 'https://via.placeholder.com/150',
    cookingTime: '30 мин',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Люля-кебаб',
    description: 'Традиционные люля-кебаб из баранины с ароматными специями',
    price: 380,
    weight: '150 г',
    category: 'Шашлыки',
    image: 'https://via.placeholder.com/150',
    cookingTime: '20 мин',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Салат Овощной',
    description: 'Свежие овощи с домашней заправкой',
    price: 150,
    weight: '200 г',
    category: 'Салаты',
    image: 'https://via.placeholder.com/150',
    cookingTime: '5 мин',
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Картофель по-деревенски',
    description: 'Ароматный картофель, запеченный на углях',
    price: 120,
    weight: '150 г',
    category: 'Гарниры',
    image: 'https://via.placeholder.com/150',
    cookingTime: '25 мин',
    rating: 4.6,
  },
];

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Шашлыки', 'Салаты', 'Гарниры', 'Соусы', 'Напитки'];

  const filteredItems = selectedCategory === 'Все' 
    ? sampleMenuItems 
    : sampleMenuItems.filter(item => item.category === selectedCategory);

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton, 
        selectedCategory === item && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.selectedCategoryText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <View style={styles.menuBottomLine}>
          <Text style={styles.menuPrice}>{item.price} ₽</Text>
          <Text style={styles.menuWeight}>{item.weight}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Наше меню</Text>
      
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesContainer}
      />
      
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 16,
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#D32F2F',
  },
  categoryText: {
    color: '#424242',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: 'white',
  },
  menuList: {
    paddingBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuInfo: {
    flex: 1,
    marginLeft: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  menuBottomLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  menuWeight: {
    fontSize: 14,
    color: '#757575',
  },
  addButton: {
    backgroundColor: '#FF8F00',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
  },
});

export default MenuScreen;