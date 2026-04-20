import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function StoreConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: string;
    productIcon: string;
    addressLabel: string;
    addressFull: string;
  }>();

  const [confirmed, setConfirmed] = useState(false);
  const checkScale = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const handleConfirm = () => {
    setConfirmed(true);
    Animated.sequence([
      Animated.spring(checkScale, {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 100,
        friction: 6,
      }),
      Animated.spring(checkScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 400,
      delay: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleGoStore = () => {
    // Go back to store (pop all store flow screens)
    router.dismiss(2);
  };

  if (confirmed) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <Animated.View
            style={[
              styles.successCircle,
              { transform: [{ scale: checkScale }] },
            ]}
          >
            <MaterialCommunityIcons
              name="check-bold"
              size={48}
              color="#FFFFFF"
            />
          </Animated.View>
          <Animated.View style={{ opacity: fadeIn, alignItems: "center" }}>
            <Text style={styles.successTitle}>Pedido Confirmado!</Text>
            <Text style={styles.successSubtitle}>
              Seu pedido de {params.productName} foi realizado com sucesso.
            </Text>
            <Text style={styles.successAddress}>
              Entrega em: {params.addressLabel}
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={handleGoStore}
              activeOpacity={0.7}
            >
              <Text style={styles.successButtonText}>Voltar à Loja</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
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
        <Text style={styles.screenTitle}>Confirmar Compra</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Product card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Produto</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardBody}>
            <View style={styles.productRow}>
              <View style={styles.productIconBox}>
                <MaterialCommunityIcons
                  name={params.productIcon as any}
                  size={32}
                  color={ColorScheme.MainColor}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{params.productName}</Text>
                <Text style={styles.productDesc}>
                  {params.productDescription}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Address card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Endereço de Entrega</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardBody}>
            <View style={styles.addressRow}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={20}
                color={ColorScheme.MainColor}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.addressLabel}>{params.addressLabel}</Text>
                <Text style={styles.addressFull}>{params.addressFull}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Total */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Resumo</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardBody}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Produto</Text>
              <Text style={styles.summaryValue}>{params.productName}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete</Text>
              <Text style={[styles.summaryValue, { color: "#2E7D32" }]}>
                Grátis
              </Text>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <View style={styles.totalValueRow}>
                <MaterialCommunityIcons
                  name="diamond-stone"
                  size={18}
                  color="#8B5CF6"
                />
                <Text style={styles.totalValue}>
                  {params.productPrice} diamantes
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Confirm button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "transparent" },

  // Header
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

  content: { flex: 1, paddingHorizontal: 16 },

  // Card
  card: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },
  cardHeader: { paddingHorizontal: 16, paddingVertical: 12 },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: ColorScheme.TextColor },
  divider: { height: 1, backgroundColor: ColorScheme.LineColor },
  cardBody: { padding: 16 },

  // Product
  productRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  productIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  productDesc: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },

  // Address
  addressRow: { flexDirection: "row", gap: 10 },
  addressLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  addressFull: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 4,
    lineHeight: 18,
  },

  // Summary
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 13, color: ColorScheme.SecondaryTextColor },
  summaryValue: {
    fontSize: 13,
    fontWeight: "600",
    color: ColorScheme.TextColor,
  },
  totalDivider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  totalValueRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  totalValue: { fontSize: 15, fontWeight: "bold", color: "#8B5CF6" },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: ColorScheme.LineColor,
    backgroundColor: "#F5F5F5",
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: ColorScheme.MainColor,
    paddingVertical: 14,
    borderRadius: 10,
  },
  confirmButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },

  // Success screen
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 20,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  successSubtitle: {
    fontSize: 14,
    color: ColorScheme.SecondaryTextColor,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 4,
  },
  successAddress: {
    fontSize: 13,
    fontWeight: "600",
    color: ColorScheme.MainColor,
    marginTop: 4,
  },
  successButton: {
    backgroundColor: ColorScheme.MainColor,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  successButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
});
