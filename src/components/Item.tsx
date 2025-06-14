import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { icons, Trash2 } from "lucide-react-native";
import { StatusIcon } from "./StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

interface ItemProps {
  status: FilterStatus;
  description: string;
}

interface Props {
  data: ItemProps;
  onRemove: () => void;
  onStatus: () => void;
}

export default function Item({ data, onRemove, onStatus }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  description: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
});
