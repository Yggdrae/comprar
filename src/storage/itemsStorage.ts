import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  try {
    const items = await get();
    return items.filter((item) => item.status === status);
  } catch (error) {
    throw new Error("GET_ITEMS_BY_STATUS: " + error);
  }
}

async function save(items: ItemStorage[]) {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error);
  }
}

async function add(item: ItemStorage): Promise<ItemStorage[]> {
  try {
    const items = await get();
    items.push(item);
    await save(items);

    return items;
  } catch (error) {
    throw new Error("ADD_ITEM: " + error);
  }
}

async function remove(id: string): Promise<void> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);
  await save(updatedItems);
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("CLEAR_ITEMS: " + error);
  }
}

async function toggleStatus(id: string): Promise<void> {
  const items = await get();
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.DONE
              ? FilterStatus.PENDING
              : FilterStatus.DONE,
        }
      : item
  );
  await save(updatedItems);
}

export const itemsStorage = {
  get,
  getByStatus,
  save,
  add,
  remove,
  clear,
  toggleStatus,
};
