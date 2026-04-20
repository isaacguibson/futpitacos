import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Mock data ──────────────────────────────────────────────────────────────────

const USER = {
  username: "pitaco_mestre",
  email: "jogador@futpitacos.com",
  avatar: "PM",
};

const STATS = {
  weeklyPoints: 1250,
  annualPoints: 34800,
  weeklyRank: 12,
  annualRank: 87,
};

const WALLET = {
  pitacoins: 4500,
  diamonds: 120,
};

const PITACARDS = {
  common: 8,
  rare: 3,
  epic: 1,
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function StatBox({
  label,
  value,
  icon,
  iconColor,
}: {
  label: string;
  value: string | number;
  icon: string;
  iconColor: string;
}) {
  return (
    <View style={styles.statBox}>
      <MaterialCommunityIcons name={icon as any} size={20} color={iconColor} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuRow({
  icon,
  iconColor,
  label,
  subtitle,
  onPress,
}: {
  icon: string;
  iconColor: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={[styles.menuIconBox, { backgroundColor: iconColor + "18" }]}>
        <MaterialCommunityIcons
          name={icon as any}
          size={22}
          color={iconColor}
        />
      </View>
      <View style={styles.menuTextArea}>
        <Text style={styles.menuLabel}>{label}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={ColorScheme.SecondaryTextColor}
      />
    </TouchableOpacity>
  );
}

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          setLoggingOut(true);
          // Futuramente: limpar sessão via API
          router.replace("/login");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            // Futuramente: excluir via API
            router.replace("/login");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Perfil</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dados do usuário ──────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.userRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{USER.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{USER.username}</Text>
              <Text style={styles.email}>{USER.email}</Text>
            </View>
          </View>
        </View>

        {/* ── Pontos e ranking ──────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Pontuação & Ranking</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statsGrid}>
            <StatBox
              label="Pts Semana"
              value={STATS.weeklyPoints.toLocaleString("pt-BR")}
              icon="star-outline"
              iconColor="#F59E0B"
            />
            <StatBox
              label="Pts Ano"
              value={STATS.annualPoints.toLocaleString("pt-BR")}
              icon="star"
              iconColor="#F59E0B"
            />
            <StatBox
              label="Rank Semana"
              value={`#${STATS.weeklyRank}`}
              icon="trophy-outline"
              iconColor="#10B981"
            />
            <StatBox
              label="Rank Ano"
              value={`#${STATS.annualRank}`}
              icon="trophy"
              iconColor="#10B981"
            />
          </View>
        </View>

        {/* ── Carteira ─────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Carteira</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.walletRow}>
            <View style={styles.walletItem}>
              <MaterialCommunityIcons
                name="circle-multiple"
                size={28}
                color="#F59E0B"
              />
              <Text style={styles.walletValue}>
                {WALLET.pitacoins.toLocaleString("pt-BR")}
              </Text>
              <Text style={styles.walletLabel}>PitaCoins</Text>
            </View>
            <View style={styles.walletDivider} />
            <View style={styles.walletItem}>
              <MaterialCommunityIcons
                name="diamond-stone"
                size={28}
                color="#3B82F6"
              />
              <Text style={styles.walletValue}>
                {WALLET.diamonds.toLocaleString("pt-BR")}
              </Text>
              <Text style={styles.walletLabel}>Diamantes</Text>
            </View>
          </View>
        </View>

        {/* ── PitaCards ─────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>PitaCards</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.pitaCardsRow}>
            <View style={[styles.pitaCardBox, { backgroundColor: "#3B82F6" }]}>
              <MaterialCommunityIcons name="cards" size={24} color="#FFF" />
              <Text style={styles.pitaCardCount}>{PITACARDS.common}</Text>
              <Text style={styles.pitaCardType}>Comum</Text>
            </View>
            <View style={[styles.pitaCardBox, { backgroundColor: "#F97316" }]}>
              <MaterialCommunityIcons name="cards" size={24} color="#FFF" />
              <Text style={styles.pitaCardCount}>{PITACARDS.rare}</Text>
              <Text style={styles.pitaCardType}>Rara</Text>
            </View>
            <View style={[styles.pitaCardBox, { backgroundColor: "#8B5CF6" }]}>
              <MaterialCommunityIcons name="cards" size={24} color="#FFF" />
              <Text style={styles.pitaCardCount}>{PITACARDS.epic}</Text>
              <Text style={styles.pitaCardType}>Épica</Text>
            </View>
          </View>
        </View>

        {/* ── Menu de navegação ─────────────────────────────────────────── */}
        <View style={styles.card}>
          <MenuRow
            icon="package-variant-closed"
            iconColor="#F97316"
            label="Meus Pedidos"
            subtitle="Acompanhe seus pedidos"
            onPress={() => router.push("/pages/orders")}
          />
          <View style={styles.menuDivider} />
          <MenuRow
            icon="map-marker-outline"
            iconColor="#3B82F6"
            label="Endereços"
            subtitle="Gerencie seus endereços"
            onPress={() => router.push("/pages/addresses")}
          />
        </View>

        {/* ── Ações da conta ────────────────────────────────────────────── */}
        <View style={styles.actionsArea}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color={ColorScheme.MainColor}
            />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color="#DC2626"
            />
            <Text style={styles.deleteText}>Excluir conta</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  screenTitle: {
    fontSize: 24,
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

  // User
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ColorScheme.MainColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  email: {
    fontSize: 13,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
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

  // Stats
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  statBox: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },

  // Wallet
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  walletItem: {
    flex: 1,
    alignItems: "center",
  },
  walletValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
    marginTop: 6,
  },
  walletLabel: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },
  walletDivider: {
    width: 1,
    height: 48,
    backgroundColor: ColorScheme.LineColor,
  },

  // PitaCards
  pitaCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  pitaCardBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  pitaCardCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  pitaCardType: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },

  // Menu rows
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTextArea: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorScheme.TextColor,
  },
  menuSubtitle: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
    marginHorizontal: 16,
  },

  // Actions
  actionsArea: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: ColorScheme.BackgroundColor,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorScheme.MainColor,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.MainColor,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 10,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
});
