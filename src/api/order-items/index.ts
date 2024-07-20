import { InsertTables, Tables } from "@/assets/types";
import { supabase } from "@/src/lib/supabase";

import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  return useMutation({
    mutationFn: async (items: InsertTables<"order_items">[]) => {
      const { error, data: newProduct } = await supabase
        .from("order_items")
        .insert(items)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};
