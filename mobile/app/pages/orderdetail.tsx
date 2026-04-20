import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

type OrderStatus = "Pendente" | "Enviado" | "Entregue" | "Cancelado";

const STATUS_CONFIG: Record<
  OrderStatus,
  { bg: string; text: string; icon: string }
> = {
  Pendente: { bg: "#FFF3E0", text: "#E65100", icon: "clock-outline" },
  Enviado: { bg: "#E3F2FD", text: "#1565C0", icon: "truck-delivery-outline" },
  Entregue: { bg: "#E6F9E6", text: "#2E7D32", icon: "check-circle-outline" },
  Cancelado: { bg: "#F0F0F0", text: "#9E9E9E", icon: "close-circle-outline" },
};

const TIMELINE_STEPS = [
  "Pedido realizado",
  "Pagamento confirmado",
  "Enviado",
  "Entregue",
];

function getActiveStep(status: OrderStatus): number {
  switch (status) {
    case "Pendente":
      return 0;
    case "Enviado":
      return 2;
    case "Entregue":
      return 3;
    case "Cancelado":
      return -1;
    default:
      return 0;
  }
}

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    date: string;
    description: string;
    total: string;
    status: string;
    items: string;
  }>();

  const status = (params.status || "Pendente") as OrderStatus;
  const statusStyle = STATUS_CONFIG[status];
  const activeStep = getActiveStep(status);
  const isCancelled = status === "Cancelado";

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
        <Text style={styles.screenTitle}>Detalhes do Pedido</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Status card ──────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.statusHeader}>
            <View
              style={[
                styles.statusIconCircle,
                { backgroundColor: statusStyle.bg },
              ]}
            >
              <MaterialCommunityIcons
                name={statusStyle.icon as any}
                size={32}
                color={statusStyle.text}
              />
            </View>
            <View style={styles.statusInfo}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusStyle.bg },
                ]}
              >
                <Text
                  style={[styles.statusBadgeText, { color: statusStyle.text }]}
                >
                  {status}
                </Text>
              </View>
              <Text style={styles.statusOrderId}>{params.id}</Text>
            </View>
          </View>
        </View>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        {!isCancelled && (
          <View style={styles.card}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Acompanhamento</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.timelineArea}>
              {TIMELINE_STEPS.map((step, index) => {
                const isActive = index <= activeStep;
                const isLast = index === TIMELINE_STEPS.length - 1;
                return (
                  <View key={index} style={styles.timelineRow}>
                    <View style={styles.timelineDotCol}>
                      <View
                        style={[
                          styles.timelineDot,
                          {
                            backgroundColor: isActive
                              ? "#2E7D32"
                              : ColorScheme.LineColor,
                          },
                        ]}
                      >
                        {isActive && (
                          <MaterialCommunityIcons
                            name="check"
                            size={12}
                            color="#FFF"
                          />
                        )}
                      </View>
                      {!isLast && (
                        <View
                          style={[
                            styles.timelineLine,
                            {
                              backgroundColor: isActive
                                ? "#2E7D32"
                                : ColorScheme.LineColor,
                            },
                          ]}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.timelineLabel,
                        {
                          color: isActive
                            ? ColorScheme.TextColor
                            : ColorScheme.SecondaryTextColor,
                          fontWeight: isActive ? "600" : "400",
                        },
                      ]}
                    >
                      {step}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {isCancelled && (
          <View style={styles.card}>
            <View style={styles.cancelledInfo}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={24}
                color="#9E9E9E"
              />
              <Text style={styles.cancelledText}>
                Este pedido foi cancelado.
              </Text>
            </View>
          </View>
        )}

        {/* ── Detalhes ─────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Resumo</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRows}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Data</Text>
              <Text style={styles.detailValue}>{params.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Descrição</Text>
              <Text style={styles.detailValue}>{params.description}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Itens</Text>
              <Text style={styles.detailValue}>{params.items}</Text>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.detailLabel}>Total</Text>
              <Text style={[styles.detailValue, { fontWeight: "bold" }]}>
                {params.total}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Card
  card: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },
  divider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
  },

  // Status header
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  statusIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  statusInfo: {
    flex: 1,
    gap: 6,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusOrderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  // Section title
  sectionTitleRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  // Timeline
  timelineArea: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timelineDotCol: {
    alignItems: "center",
    width: 24,
    marginRight: 14,
  },
  timelineDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineLine: {
    width: 2,
    height: 28,
  },
  timelineLabel: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 12,
  },

  // Cancelled
  cancelledInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  cancelledText: {
    fontSize: 14,
    color: "#9E9E9E",
    flex: 1,
  },

  // Detail rows
  detailRows: {
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: ColorScheme.LineColor,
  },
  detailLabel: {
    fontSize: 13,
    color: ColorScheme.SecondaryTextColor,
  },
  detailValue: {
    fontSize: 14,
    color: ColorScheme.TextColor,
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
});
