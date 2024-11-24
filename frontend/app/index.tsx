import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

const API_URL = "https://127.0.0.1:443/product";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/`);
      setProducts(response.data);
    } catch (error) {
      console.error("Wystąpił problem z pobraniem listy produktów:", error);
      Alert.alert("Error", "Wystąpił problem z pobraniem listy produktów");
    }
  };

  const addProduct = async () => {
    if (!name || !price) {
      Alert.alert("Error", "Wypełnij wszystkie pola");
      return;
    }

    try {
      await axios.post(`${API_URL}/`, {
        name,
        price: parseFloat(price),
      });
      setName("");
      setPrice("");
      fetchProducts();
    } catch (error) {
      console.error("Wystąpił problem z dodaniem produktu:", error);
      Alert.alert("Error", "Wystąpił problem z dodaniem produktu");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Wystąpił problem z usunięciem produktu:", error);
      Alert.alert("Error", "Wystąpił problem z usunięciem produktu");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista produktów</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.name} - {item.price.toFixed(2)} zł</Text>
            <Button title="Usuń" color="red" onPress={() => deleteProduct(item.id)} />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazwa produktu"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="cena"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title="Dodaj produkt" onPress={addProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});