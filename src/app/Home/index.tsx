import { Image, View, TouchableOpacity, Text, FlatList } from "react-native";

import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import Item from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

const ITEMS = Array.from({ length: 50 }).map((_, index) => ({
  status: FilterStatus.DONE,
  description: `Item ${index + 1}`,
}));

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" onPress={() => {}} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === FilterStatus.DONE}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Item data={item} onRemove={() => {}} onStatus={() => {}} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentList}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>
                Você ainda não adicionou nenhum item
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
