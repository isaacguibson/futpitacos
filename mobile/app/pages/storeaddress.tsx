import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

interface Address {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "1",
    label: "Casa",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 401",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zip: "01001-000",
  },
  {
    id: "2",
    label: "Trabalho",
    street: "Av. Paulista",
    number: "1000",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zip: "01310-100",
  },
];

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function StoreAddressScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: string;
    productIcon: string;
  }>();

  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    label: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zip: "",
  });

  const resetForm = () =>
    setForm({
      label: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip: "",
    });

  const handleAddAddress = () => {
    if (!form.street.trim() || !form.number.trim() || !form.city.trim()) {
      Alert.alert("Atenção", "Preencha ao menos rua, número e cidade.");
      return;
    }
    const newAddr: Address = {
      id: Date.now().toString(),
      label: form.label || "Endereço",
      street: form.street,
      number: form.number,
      complement: form.complement || undefined,
      neighborhood: form.neighborhood,
      city: form.city,
      state: form.state,
      zip: form.zip,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedId(newAddr.id);
    resetForm();
    setModalVisible(false);
  };

  const handleContinue = () => {
    if (!selectedId) {
      Alert.alert(
        "Selecione um endereço",
        "Escolha um endereço de entrega para continuar.",
      );
      return;
    }
    const address = addresses.find((a) => a.id === selectedId);
    if (!address) return;
    router.push({
      pathname: "/pages/storeconfirm",
      params: {
        productId: params.productId,
        productName: params.productName,
        productDescription: params.productDescription,
        productPrice: params.productPrice,
        productIcon: params.productIcon,
        addressLabel: address.label,
        addressFull: `${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ""}, ${address.neighborhood} · ${address.city}/${address.state} · ${address.zip}`,
      },
    });
  };

  const renderAddress = ({ item }: { item: Address }) => {
    const isSelected = selectedId === item.id;
    return (
      <TouchableOpacity
        style={[styles.addressCard, isSelected && styles.addressCardSelected]}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.addressRow}>
          <View
            style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
          >
            {isSelected && <View style={styles.radioInner} />}
          </View>
          <View style={styles.addressContent}>
            <View style={styles.addressLabelRow}>
              <MaterialCommunityIcons
                name={
                  item.label === "Trabalho"
                    ? "briefcase-outline"
                    : "home-outline"
                }
                size={16}
                color={
                  isSelected
                    ? ColorScheme.MainColor
                    : ColorScheme.SecondaryTextColor
                }
              />
              <Text
                style={[
                  styles.addressLabel,
                  isSelected && styles.addressLabelSelected,
                ]}
              >
                {item.label}
              </Text>
            </View>
            <Text style={styles.addressStreet}>
              {item.street}, {item.number}
              {item.complement ? ` - ${item.complement}` : ""}
            </Text>
            <Text style={styles.addressCity}>
              {item.neighborhood} · {item.city}/{item.state}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.screenTitle}>Endereço de Entrega</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Product summary */}
      <View style={styles.productSummary}>
        <View style={styles.productIconBox}>
          <MaterialCommunityIcons
            name={params.productIcon as any}
            size={28}
            color={ColorScheme.MainColor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{params.productName}</Text>
          <View style={styles.productPriceRow}>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={14}
              color="#8B5CF6"
            />
            <Text style={styles.productPriceText}>
              {params.productPrice} diamantes
            </Text>
          </View>
        </View>
      </View>

      {/* Address list */}
      <Text style={styles.selectLabel}>Selecione o endereço:</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddress}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={() => {
              resetForm();
              setModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              color={ColorScheme.MainColor}
            />
            <Text style={styles.addAddressText}>Adicionar novo endereço</Text>
          </TouchableOpacity>
        }
      />

      {/* Continue button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedId && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* ── Modal: Novo endereço ──────────────────────────────────────── */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Endereço</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color={ColorScheme.SecondaryTextColor}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.formArea}>
              <FormField
                label="Apelido"
                placeholder="Ex: Casa, Trabalho"
                value={form.label}
                onChangeText={(v) => setForm((f) => ({ ...f, label: v }))}
              />
              <FormField
                label="Rua *"
                placeholder="Nome da rua"
                value={form.street}
                onChangeText={(v) => setForm((f) => ({ ...f, street: v }))}
              />
              <View style={styles.formRow}>
                <View style={{ flex: 1 }}>
                  <FormField
                    label="Número *"
                    placeholder="Nº"
                    value={form.number}
                    onChangeText={(v) => setForm((f) => ({ ...f, number: v }))}
                  />
                </View>
                <View style={{ flex: 2, marginLeft: 12 }}>
                  <FormField
                    label="Complemento"
                    placeholder="Apto, Bloco..."
                    value={form.complement}
                    onChangeText={(v) =>
                      setForm((f) => ({ ...f, complement: v }))
                    }
                  />
                </View>
              </View>
              <FormField
                label="Bairro"
                placeholder="Bairro"
                value={form.neighborhood}
                onChangeText={(v) =>
                  setForm((f) => ({ ...f, neighborhood: v }))
                }
              />
              <View style={styles.formRow}>
                <View style={{ flex: 2 }}>
                  <FormField
                    label="Cidade *"
                    placeholder="Cidade"
                    value={form.city}
                    onChangeText={(v) => setForm((f) => ({ ...f, city: v }))}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <FormField
                    label="UF"
                    placeholder="UF"
                    value={form.state}
                    onChangeText={(v) => setForm((f) => ({ ...f, state: v }))}
                    maxLength={2}
                  />
                </View>
              </View>
              <FormField
                label="CEP"
                placeholder="00000-000"
                value={form.zip}
                onChangeText={(v) => setForm((f) => ({ ...f, zip: v }))}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleAddAddress}
                activeOpacity={0.7}
              >
                <Text style={styles.modalConfirmText}>Adicionar Endereço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ── Componente de campo ────────────────────────────────────────────────────────

function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  maxLength,
  keyboardType,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  maxLength?: number;
  keyboardType?: "default" | "numeric";
}) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        placeholder={placeholder}
        placeholderTextColor="#C0C0C0"
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
        autoCapitalize="words"
      />
    </View>
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

  // Product summary
  productSummary: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    padding: 14,
    gap: 12,
  },
  productIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  productPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  productPriceText: { fontSize: 13, fontWeight: "600", color: "#8B5CF6" },

  // Select label
  selectLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorScheme.TextColor,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 12 },

  // Address card
  addressCard: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    padding: 14,
    marginBottom: 10,
  },
  addressCardSelected: { borderColor: ColorScheme.MainColor, borderWidth: 2 },
  addressRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: ColorScheme.LineColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  radioOuterSelected: { borderColor: ColorScheme.MainColor },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ColorScheme.MainColor,
  },
  addressContent: { flex: 1 },
  addressLabelRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  addressLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  addressLabelSelected: { color: ColorScheme.MainColor },
  addressStreet: { fontSize: 13, color: ColorScheme.TextColor, marginTop: 4 },
  addressCity: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },

  // Add address button
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.MainColor,
    borderStyle: "dashed",
    marginTop: 4,
  },
  addAddressText: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorScheme.MainColor,
  },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: ColorScheme.LineColor,
    backgroundColor: "#F5F5F5",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: ColorScheme.MainColor,
    paddingVertical: 14,
    borderRadius: 10,
  },
  continueButtonDisabled: { opacity: 0.5 },
  continueButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: { height: 1, backgroundColor: ColorScheme.LineColor },
  formArea: { paddingHorizontal: 20, paddingVertical: 12 },
  formRow: { flexDirection: "row" },
  fieldContainer: { marginBottom: 12 },
  fieldLabel: {
    fontSize: 13,
    color: ColorScheme.SecondaryTextColor,
    marginBottom: 6,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: ColorScheme.TextColor,
    backgroundColor: "#FAFAFA",
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: ColorScheme.LineColor,
  },
  modalConfirmButton: {
    backgroundColor: ColorScheme.MainColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalConfirmText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
});
