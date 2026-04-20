import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

type OrderStatus = "Pendente" | "Enviado" | "Entregue" | "Cancelado";

interface Order {
  id: string;
  date: string;
  description: string;
  total: string;
  status: OrderStatus;
  items: number;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "PED-001",
    date: "18/03/2026",
    description: "Pacote de PitaCards Raras x3",
    total: "R$ 29,90",
    status: "Entregue",
    items: 3,
  },
  {
    id: "PED-002",
    date: "15/03/2026",
    description: "500 PitaCoins",
    total: "R$ 9,90",
    status: "Enviado",
    items: 1,
  },
  {
    id: "PED-003",
    date: "10/03/2026",
    description: "Camiseta Futpitacos GG",
    total: "R$ 79,90",
    status: "Pendente",
    items: 1,
  },
  {
    id: "PED-004",
    date: "01/03/2026",
    description: "PitaCard Épica - Hat-trick",
    total: "R$ 49,90",
    status: "Cancelado",
    items: 1,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { bg: string; text: string }> = {
  Pendente: { bg: "#FFF3E0", text: "#E65100" },
  Enviado: { bg: "#E3F2FD", text: "#1565C0" },
  Entregue: { bg: "#E6F9E6", text: "#2E7D32" },
  Cancelado: { bg: "#F0F0F0", text: "#9E9E9E" },
};

function OrderCard({ order, onPress }: { order: Order; onPress: () => void }) {
  const statusStyle = STATUS_CONFIG[order.status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardTop}>
        <View style={styles.cardTopLeft}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBody}>
        <View style={styles.cardBodyLeft}>
          <Text style={styles.orderDesc} numberOfLines={2}>
            {order.description}
          </Text>
          <Text style={styles.orderItems}>
            {order.items} {order.items === 1 ? "item" : "itens"}
          </Text>
        </View>
        <View style={styles.cardBodyRight}>
          <Text style={styles.orderTotal}>{order.total}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={ColorScheme.SecondaryTextColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={ColorScheme.TextColor}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Meus Pedidos</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() =>
              router.push({
                pathname: "/pages/orderdetail",
                params: {
                  id: item.id,
                  date: item.date,
                  description: item.description,
                  total: item.total,
                  status: item.status,
                  items: String(item.items),
                },
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="package-variant"
              size={48}
              color={ColorScheme.LineColor}
            />
            <Text style={styles.emptyText}>Você ainda não tem pedidos.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ColorScheme.BackgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // Card
  card: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardTopLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  orderDate: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardBodyLeft: {
    flex: 1,
    marginRight: 12,
  },
  orderDesc: {
    fontSize: 13,
    color: ColorScheme.TextColor,
    fontWeight: "500",
  },
  orderItems: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 4,
  },
  cardBodyRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  // Empty
  emptyContainer: {
    alignItems: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: ColorScheme.SecondaryTextColor,
  },
});
