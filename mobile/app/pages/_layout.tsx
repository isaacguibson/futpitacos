import { Stack } from "expo-router";

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="matchlist" options={{ headerShown: false }} />
      <Stack.Screen name="matchdetail" options={{ headerShown: false }} />
      <Stack.Screen name="orders" options={{ headerShown: false }} />
      <Stack.Screen name="orderdetail" options={{ headerShown: false }} />
      <Stack.Screen name="addresses" options={{ headerShown: false }} />
      <Stack.Screen name="historydetail" options={{ headerShown: false }} />
      <Stack.Screen name="storeaddress" options={{ headerShown: false }} />
      <Stack.Screen name="storeconfirm" options={{ headerShown: false }} />
    </Stack>
  );
}
