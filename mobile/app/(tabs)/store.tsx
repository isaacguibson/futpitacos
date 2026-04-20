import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

type StoreTab = "pitacards" | "currency" | "products";

type CardType = "common" | "rare" | "epic";

interface Envelope {
  id: string;
  type: CardType;
  label: string;
  description: string;
  price: number;
  currency: "pitacoins";
  cardCount: number;
  color: string;
  borderColor: string;
  icon: string;
}

interface DiamondPack {
  id: string;
  amount: number;
  price: string;
  bonus?: string;
  highlight?: boolean;
}

interface PitacoinExchange {
  id: string;
  diamonds: number;
  pitacoins: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  priceDiamonds: number;
  icon: string;
  category: string;
}

interface RevealedCard {
  id: string;
  name: string;
  type: CardType;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const ENVELOPES: Envelope[] = [
  {
    id: "env1",
    type: "common",
    label: "Envelope Comum",
    description: "3 cartas com chance de raras",
    price: 500,
    currency: "pitacoins",
    cardCount: 3,
    color: "#3B82F6",
    borderColor: "#2563EB",
    icon: "email-outline",
  },
  {
    id: "env2",
    type: "rare",
    label: "Envelope Raro",
    description: "3 cartas com 1 rara garantida",
    price: 1500,
    currency: "pitacoins",
    cardCount: 3,
    color: "#F97316",
    borderColor: "#EA580C",
    icon: "email-seal-outline",
  },
  {
    id: "env3",
    type: "epic",
    label: "Envelope Épico",
    description: "3 cartas com 1 épica garantida",
    price: 4000,
    currency: "pitacoins",
    cardCount: 3,
    color: "#8B5CF6",
    borderColor: "#7C3AED",
    icon: "email-seal",
  },
];

const DIAMOND_PACKS: DiamondPack[] = [
  { id: "d1", amount: 50, price: "R$ 4,90" },
  { id: "d2", amount: 120, price: "R$ 9,90", bonus: "+20 bônus" },
  {
    id: "d3",
    amount: 300,
    price: "R$ 19,90",
    bonus: "+60 bônus",
    highlight: true,
  },
  { id: "d4", amount: 650, price: "R$ 39,90", bonus: "+150 bônus" },
  { id: "d5", amount: 1500, price: "R$ 79,90", bonus: "+400 bônus" },
];

const PITACOIN_EXCHANGES: PitacoinExchange[] = [
  { id: "x1", diamonds: 10, pitacoins: 500 },
  { id: "x2", diamonds: 25, pitacoins: 1500 },
  { id: "x3", diamonds: 50, pitacoins: 3500 },
  { id: "x4", diamonds: 100, pitacoins: 8000 },
];

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Camisa Futpitacos",
    description: "Camisa oficial do app",
    priceDiamonds: 500,
    icon: "tshirt-crew-outline",
    category: "Vestuário",
  },
  {
    id: "p2",
    name: "Caneca Futpitacos",
    description: "Caneca personalizada",
    priceDiamonds: 200,
    icon: "coffee-outline",
    category: "Acessórios",
  },
  {
    id: "p3",
    name: "Boné Futpitacos",
    description: "Boné bordado exclusivo",
    priceDiamonds: 350,
    icon: "hat-fedora",
    category: "Vestuário",
  },
  {
    id: "p4",
    name: "Adesivo Pack",
    description: "Kit com 5 adesivos",
    priceDiamonds: 80,
    icon: "sticker-emoji",
    category: "Acessórios",
  },
];

const CARD_POOL: Record<CardType, RevealedCard[]> = {
  common: [
    { id: "rc1", name: "Ataque Certeiro", type: "common" },
    { id: "rc2", name: "Defesa Sólida", type: "common" },
    { id: "rc3", name: "Meio de Campo", type: "common" },
    { id: "rc4", name: "Lateral Veloz", type: "common" },
    { id: "rc5", name: "Zagueiro Firme", type: "common" },
  ],
  rare: [
    { id: "rr1", name: "Goleiro Inspirado", type: "rare" },
    { id: "rr2", name: "Contra-ataque", type: "rare" },
    { id: "rr3", name: "Falta Perfeita", type: "rare" },
  ],
  epic: [
    { id: "re1", name: "Hat-trick", type: "epic" },
    { id: "re2", name: "Gol de Placa", type: "epic" },
    { id: "re3", name: "Virada Épica", type: "epic" },
  ],
};

const CARD_TYPE_STYLES: Record<
  CardType,
  { label: string; color: string; borderColor: string }
> = {
  common: { label: "Comum", color: "#3B82F6", borderColor: "#2563EB" },
  rare: { label: "Rara", color: "#F97316", borderColor: "#EA580C" },
  epic: { label: "Épica", color: "#8B5CF6", borderColor: "#7C3AED" },
};

// Simulated user wallet
let USER_WALLET = { pitacoins: 4500, diamonds: 120 };

// ── Helpers ────────────────────────────────────────────────────────────────────

function generateLoot(envelope: Envelope): RevealedCard[] {
  const cards: RevealedCard[] = [];
  const pool = { ...CARD_POOL };

  // Guarantee at least 1 card of the envelope type for rare/epic
  if (envelope.type === "rare" || envelope.type === "epic") {
    const guaranteed = pool[envelope.type];
    cards.push(guaranteed[Math.floor(Math.random() * guaranteed.length)]);
  }

  while (cards.length < envelope.cardCount) {
    const roll = Math.random();
    let type: CardType;
    if (envelope.type === "epic") {
      type = roll < 0.4 ? "common" : roll < 0.75 ? "rare" : "epic";
    } else if (envelope.type === "rare") {
      type = roll < 0.5 ? "common" : roll < 0.9 ? "rare" : "epic";
    } else {
      type = roll < 0.7 ? "common" : roll < 0.95 ? "rare" : "epic";
    }
    const typePool = pool[type];
    cards.push(typePool[Math.floor(Math.random() * typePool.length)]);
  }

  return cards;
}

// ── Animated Coin Burst ────────────────────────────────────────────────────────

function CoinBurst({
  icon,
  color,
  onDone,
}: {
  icon: string;
  color: string;
  onDone: () => void;
}) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, { toValue: 1.3, useNativeDriver: true }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(600),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(onDone);
  }, []);

  return (
    <View style={styles.burstOverlay} pointerEvents="none">
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <View style={styles.burstCircle}>
          <MaterialCommunityIcons name={icon as any} size={48} color={color} />
          <Text style={[styles.burstText, { color }]}>+</Text>
        </View>
      </Animated.View>
    </View>
  );
}

// ── Envelope Reveal Modal ──────────────────────────────────────────────────────

function EnvelopeRevealModal({
  visible,
  envelope,
  cards,
  onClose,
}: {
  visible: boolean;
  envelope: Envelope | null;
  cards: RevealedCard[];
  onClose: () => void;
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const cardAnimsRef = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (visible && envelope) {
      setRevealedCount(0);
      // Recreate animated values for new cards
      cardAnimsRef.current = cards.map(() => new Animated.Value(0));
      // Shake envelope
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reveal cards one by one
        revealNext(0);
      });
    }
  }, [visible]);

  const revealNext = (index: number) => {
    if (index >= cards.length || !cardAnimsRef.current[index]) return;
    Animated.spring(cardAnimsRef.current[index], {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start(() => {
      setRevealedCount(index + 1);
      setTimeout(() => revealNext(index + 1), 300);
    });
  };

  if (!envelope) return null;

  const shakeInterpolate = shakeAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-8deg", "0deg", "8deg"],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.revealOverlay}>
        <View style={styles.revealSheet}>
          {/* Envelope icon */}
          <Animated.View style={{ transform: [{ rotate: shakeInterpolate }] }}>
            <View
              style={[
                styles.envelopeRevealIcon,
                { backgroundColor: envelope.color },
              ]}
            >
              <MaterialCommunityIcons
                name={envelope.icon as any}
                size={48}
                color="#FFFFFF"
              />
            </View>
          </Animated.View>

          <Text style={styles.revealTitle}>{envelope.label}</Text>
          <Text style={styles.revealSubtitle}>Cartas reveladas:</Text>

          {/* Cards */}
          <View style={styles.revealCardsRow}>
            {cards.map((card, i) => {
              const cs = CARD_TYPE_STYLES[card.type];
              const animScale =
                cardAnimsRef.current[i] || new Animated.Value(0);
              return (
                <Animated.View
                  key={`${card.id}-${i}`}
                  style={[
                    styles.revealCardBox,
                    {
                      backgroundColor: cs.color,
                      borderColor: cs.borderColor,
                      transform: [{ scale: animScale }],
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="cards"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.revealCardLabel}>{cs.label}</Text>
                  <Text style={styles.revealCardName} numberOfLines={1}>
                    {card.name}
                  </Text>
                </Animated.View>
              );
            })}
          </View>

          {revealedCount >= cards.length && (
            <TouchableOpacity
              style={styles.revealCloseButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.revealCloseText}>Fechar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────────

export default function StoreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StoreTab>("pitacards");
  const [wallet, setWallet] = useState({ ...USER_WALLET });

  // Envelope reveal state
  const [revealVisible, setRevealVisible] = useState(false);
  const [revealEnvelope, setRevealEnvelope] = useState<Envelope | null>(null);
  const [revealCards, setRevealCards] = useState<RevealedCard[]>([]);

  // Coin animation
  const [showBurst, setShowBurst] = useState<{
    icon: string;
    color: string;
  } | null>(null);

  const handleBuyEnvelope = (envelope: Envelope) => {
    if (wallet.pitacoins < envelope.price) {
      Alert.alert(
        "Saldo insuficiente",
        "Você não tem PitaCoins suficientes para este envelope.",
      );
      return;
    }
    Alert.alert(
      "Comprar " + envelope.label,
      `Trocar ${envelope.price} PitaCoins por ${envelope.label}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Comprar",
          onPress: () => {
            setWallet((w) => ({
              ...w,
              pitacoins: w.pitacoins - envelope.price,
            }));
            const loot = generateLoot(envelope);
            setRevealEnvelope(envelope);
            setRevealCards(loot);
            setRevealVisible(true);
          },
        },
      ],
    );
  };

  const handleBuyDiamonds = (pack: DiamondPack) => {
    // Simulates purchase — in the future will integrate Google Pay / Apple Pay
    Alert.alert(
      "Comprar Diamantes",
      `Confirmar compra de ${pack.amount} diamantes por ${pack.price}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Comprar",
          onPress: () => {
            const bonus = pack.bonus
              ? parseInt(pack.bonus.replace(/\D/g, ""), 10)
              : 0;
            setWallet((w) => ({
              ...w,
              diamonds: w.diamonds + pack.amount + bonus,
            }));
            setShowBurst({ icon: "diamond-stone", color: "#8B5CF6" });
          },
        },
      ],
    );
  };

  const handleExchangePitacoins = (exchange: PitacoinExchange) => {
    if (wallet.diamonds < exchange.diamonds) {
      Alert.alert("Saldo insuficiente", "Você não tem Diamantes suficientes.");
      return;
    }
    Alert.alert(
      "Trocar Diamantes",
      `Trocar ${exchange.diamonds} diamantes por ${exchange.pitacoins} PitaCoins?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Trocar",
          onPress: () => {
            setWallet((w) => ({
              ...w,
              diamonds: w.diamonds - exchange.diamonds,
              pitacoins: w.pitacoins + exchange.pitacoins,
            }));
            setShowBurst({ icon: "circle-multiple", color: "#F59E0B" });
          },
        },
      ],
    );
  };

  const handleBuyProduct = (product: Product) => {
    if (wallet.diamonds < product.priceDiamonds) {
      Alert.alert(
        "Saldo insuficiente",
        "Você não tem Diamantes suficientes para este produto.",
      );
      return;
    }
    // Navigate to address selection -> confirmation flow
    router.push({
      pathname: "/pages/storeaddress",
      params: {
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        productPrice: String(product.priceDiamonds),
        productIcon: product.icon,
      },
    });
  };

  // ── Tab: PitaCards ──

  const renderPitaCardsTab = () => (
    <ScrollView
      contentContainerStyle={styles.tabContent}
      showsVerticalScrollIndicator={false}
    >
      {ENVELOPES.map((env) => (
        <View
          key={env.id}
          style={[styles.envelopeCard, { borderColor: env.borderColor }]}
        >
          <View
            style={[styles.envelopeIconBox, { backgroundColor: env.color }]}
          >
            <MaterialCommunityIcons
              name={env.icon as any}
              size={36}
              color="#FFFFFF"
            />
          </View>
          <View style={styles.envelopeInfo}>
            <Text style={styles.envelopeName}>{env.label}</Text>
            <Text style={styles.envelopeDesc}>{env.description}</Text>
            <View style={styles.envelopeMeta}>
              <MaterialCommunityIcons
                name="cards-outline"
                size={14}
                color={ColorScheme.SecondaryTextColor}
              />
              <Text style={styles.envelopeMetaText}>
                {env.cardCount} cartas
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.buyButton, { backgroundColor: env.color }]}
            onPress={() => handleBuyEnvelope(env)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="circle-multiple"
              size={14}
              color="#FFFFFF"
            />
            <Text style={styles.buyButtonText}>
              {env.price.toLocaleString("pt-BR")}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  // ── Tab: Diamantes e PitaCoins ──

  const renderCurrencyTab = () => (
    <ScrollView
      contentContainerStyle={styles.tabContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Diamantes */}
      <Text style={styles.sectionLabel}>Comprar Diamantes</Text>
      {DIAMOND_PACKS.map((pack) => (
        <TouchableOpacity
          key={pack.id}
          style={[
            styles.currencyCard,
            pack.highlight && styles.currencyCardHighlight,
          ]}
          onPress={() => handleBuyDiamonds(pack)}
          activeOpacity={0.7}
        >
          <View style={styles.currencyLeft}>
            <View style={styles.diamondIconCircle}>
              <MaterialCommunityIcons
                name="diamond-stone"
                size={24}
                color="#8B5CF6"
              />
            </View>
            <View>
              <Text style={styles.currencyAmount}>{pack.amount} Diamantes</Text>
              {pack.bonus && (
                <Text style={styles.currencyBonus}>{pack.bonus}</Text>
              )}
            </View>
          </View>
          <View
            style={[
              styles.priceTag,
              pack.highlight && styles.priceTagHighlight,
            ]}
          >
            <Text
              style={[
                styles.priceText,
                pack.highlight && styles.priceTextHighlight,
              ]}
            >
              {pack.price}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Trocar Diamantes por PitaCoins */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
        Trocar por PitaCoins
      </Text>
      {PITACOIN_EXCHANGES.map((ex) => (
        <TouchableOpacity
          key={ex.id}
          style={styles.currencyCard}
          onPress={() => handleExchangePitacoins(ex)}
          activeOpacity={0.7}
        >
          <View style={styles.currencyLeft}>
            <View
              style={[styles.diamondIconCircle, { backgroundColor: "#FEF3C7" }]}
            >
              <MaterialCommunityIcons
                name="circle-multiple"
                size={24}
                color="#F59E0B"
              />
            </View>
            <Text style={styles.currencyAmount}>
              {ex.pitacoins.toLocaleString("pt-BR")} PitaCoins
            </Text>
          </View>
          <View style={styles.exchangeTag}>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={14}
              color="#8B5CF6"
            />
            <Text style={styles.exchangeText}>{ex.diamonds}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // ── Tab: Produtos ──

  const renderProductsTab = () => (
    <ScrollView
      contentContainerStyle={styles.tabContent}
      showsVerticalScrollIndicator={false}
    >
      {PRODUCTS.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productIconBox}>
            <MaterialCommunityIcons
              name={product.icon as any}
              size={36}
              color={ColorScheme.MainColor}
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDesc}>{product.description}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
          </View>
          <TouchableOpacity
            style={styles.productBuyButton}
            onPress={() => handleBuyProduct(product)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="diamond-stone"
              size={14}
              color="#FFFFFF"
            />
            <Text style={styles.productBuyText}>{product.priceDiamonds}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Wallet bar */}
      <View style={styles.walletBar}>
        <Text style={styles.screenTitle}>Loja</Text>
        <View style={styles.walletChips}>
          <View style={styles.walletChip}>
            <MaterialCommunityIcons
              name="circle-multiple"
              size={16}
              color="#F59E0B"
            />
            <Text style={styles.walletChipText}>
              {wallet.pitacoins.toLocaleString("pt-BR")}
            </Text>
          </View>
          <View style={styles.walletChip}>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={16}
              color="#8B5CF6"
            />
            <Text style={styles.walletChipText}>
              {wallet.diamonds.toLocaleString("pt-BR")}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {[
          { key: "pitacards" as StoreTab, label: "PitaCards" },
          { key: "currency" as StoreTab, label: "Diamantes" },
          { key: "products" as StoreTab, label: "Produtos" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === "pitacards" && renderPitaCardsTab()}
      {activeTab === "currency" && renderCurrencyTab()}
      {activeTab === "products" && renderProductsTab()}

      {/* Envelope reveal */}
      <EnvelopeRevealModal
        visible={revealVisible}
        envelope={revealEnvelope}
        cards={revealCards}
        onClose={() => setRevealVisible(false)}
      />

      {/* Coin burst animation */}
      {showBurst && (
        <CoinBurst
          icon={showBurst.icon}
          color={showBurst.color}
          onDone={() => setShowBurst(null)}
        />
      )}
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "transparent" },

  // Wallet bar
  walletBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  walletChips: { flexDirection: "row", gap: 10 },
  walletChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: ColorScheme.BackgroundColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
  },
  walletChipText: {
    fontSize: 13,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  // Tabs
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },
  tab: { flex: 1, paddingVertical: 11, alignItems: "center" },
  tabActive: { backgroundColor: ColorScheme.MainColor },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: ColorScheme.SecondaryTextColor,
  },
  tabTextActive: { color: "#FFFFFF" },

  tabContent: { paddingHorizontal: 16, paddingBottom: 24 },

  // ── PitaCards tab ──
  envelopeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },
  envelopeIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  envelopeInfo: { flex: 1, marginLeft: 14 },
  envelopeName: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  envelopeDesc: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },
  envelopeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  envelopeMetaText: { fontSize: 11, color: ColorScheme.SecondaryTextColor },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonText: { fontSize: 13, fontWeight: "bold", color: "#FFFFFF" },

  // ── Currency tab ──
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
    marginBottom: 12,
    marginTop: 4,
  },
  currencyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  currencyCardHighlight: {
    borderColor: "#8B5CF6",
    borderWidth: 2,
  },
  currencyLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  diamondIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  currencyAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  currencyBonus: {
    fontSize: 11,
    color: "#2E7D32",
    fontWeight: "600",
    marginTop: 2,
  },
  priceTag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  priceTagHighlight: { backgroundColor: "#8B5CF6" },
  priceText: { fontSize: 13, fontWeight: "bold", color: ColorScheme.TextColor },
  priceTextHighlight: { color: "#FFFFFF" },
  exchangeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  exchangeText: { fontSize: 13, fontWeight: "bold", color: "#8B5CF6" },

  // ── Products tab ──
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },
  productIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: { flex: 1, marginLeft: 14 },
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
  productCategory: {
    fontSize: 11,
    color: ColorScheme.MainColor,
    fontWeight: "600",
    marginTop: 3,
  },
  productBuyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  productBuyText: { fontSize: 13, fontWeight: "bold", color: "#FFFFFF" },

  // ── Envelope Reveal Modal ──
  revealOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  revealSheet: {
    width: SCREEN_WIDTH - 48,
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  envelopeRevealIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  revealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
    marginBottom: 4,
  },
  revealSubtitle: {
    fontSize: 13,
    color: ColorScheme.SecondaryTextColor,
    marginBottom: 20,
  },
  revealCardsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  revealCardBox: {
    width: (SCREEN_WIDTH - 48 - 40 - 24) / 3,
    height: 110,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  revealCardLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 6,
  },
  revealCardName: {
    fontSize: 9,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  revealCloseButton: {
    backgroundColor: ColorScheme.MainColor,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
  revealCloseText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },

  // ── Coin Burst ──
  burstOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  burstCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  burstText: { fontSize: 22, fontWeight: "bold", marginTop: -4 },
});
