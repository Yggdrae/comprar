import {
  Image,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";

import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import Item from "@/components/Item";
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  useEffect(() => {
    itemsStorage.get().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (!filter) return;

    itemByStatus();
  }, [filter]);

  function updateFilter(value: FilterStatus) {
    setFilter(value);
  }

  async function handleAdd() {
    if (!description) {
      return Alert.alert(
        "Descrição vazia",
        "Informe uma descrição para o item."
      );
    }

    const newItem = {
      id: Math.random().toString().substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.add(newItem);
    itemByStatus();
    setFilter(FilterStatus.PENDING);
    setDescription("");
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemByStatus();
    } catch (error) {
      Alert.alert("Remover item", "Não foi possível remover o item.");
    }
  }

  function handleClear() {
    Alert.alert("Limpar itens", "Deseja realmente limpar os itens?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => onClear(),
      },
    ]);
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemByStatus();
    } catch (error) {
      Alert.alert("Alterar status", "Não foi possível alterar o status.");
    }
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      Alert.alert("Limpar itens", "Não foi possível limpar os itens.");
    }
  }

  async function itemByStatus() {
    await itemsStorage.getByStatus(filter).then((data) => setItems(data));
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />

      <View style={styles.form}>
        <Input
          value={description}
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={() => handleAdd()} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => updateFilter(status)}
            />
          ))}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleClear()}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentList}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>Nenhum item aqui.</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
