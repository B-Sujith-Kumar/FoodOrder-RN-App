import { Alert } from "react-native";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const {data, error} = await supabase.functions.invoke("payment-sheet", { body: { amount } });
  if (data) return data;
  Alert.alert("Error", error);
  return {};
};

export const initializePaymentSheet = async (amount: number) => {
  console.log("Initializing payment sheet with amount: ", amount);
  const {paymentIntent, publishableKey} = await fetchPaymentSheetParams(amount);
  if (!paymentIntent || !publishableKey) return;
  await initPaymentSheet({
    merchantDisplayName: "Sujith Kumar",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
        name: "Jane Doe",
    },
  })
  console.log(paymentIntent);
};

export const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
        Alert.alert("Error", error.message);
        return false;
    }   
    return true;
}