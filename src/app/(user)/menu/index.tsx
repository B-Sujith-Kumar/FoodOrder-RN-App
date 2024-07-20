import Colors from "@/src/constants/Colors";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import ProductListItem from "@/src/components/ProductListItem";
import { useProductList } from "../../../api/products/index";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 20, padding: 5 }}
      columnWrapperStyle={{ gap: 10 }}
      ListFooterComponent={
        <Button text="Log Out" onPress={() => supabase.auth.signOut()} />
      }
    />
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
