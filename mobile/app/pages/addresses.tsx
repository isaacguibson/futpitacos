import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
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

  const handleAdd = () => {
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
    resetForm();
    setModalVisible(false);
  };

  const handleRemove = (id: string) => {
    Alert.alert("Remover endereço", "Deseja realmente remover este endereço?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => setAddresses((prev) => prev.filter((a) => a.id !== id)),
      },
    ]);
  };

  const renderAddress = ({ item }: { item: Address }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={[styles.labelBadge]}>
          <MaterialCommunityIcons
            name={
              item.label === "Trabalho" ? "briefcase-outline" : "home-outline"
            }
            size={16}
            color={ColorScheme.MainColor}
          />
          <Text style={styles.labelText}>{item.label}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color="#DC2626"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.addressBody}>
        <Text style={styles.addressStreet}>
          {item.street}, {item.number}
          {item.complement ? ` - ${item.complement}` : ""}
        </Text>
        <Text style={styles.addressCity}>
          {item.neighborhood} · {item.city}/{item.state}
        </Text>
        <Text style={styles.addressZip}>{item.zip}</Text>
      </View>
    </View>
  );

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
        <Text style={styles.screenTitle}>Endereços</Text>
        <TouchableOpacity
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
          style={styles.addButton}
        >
          <MaterialCommunityIcons name="plus" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddress}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="map-marker-off-outline"
              size={48}
              color={ColorScheme.LineColor}
            />
            <Text style={styles.emptyText}>Nenhum endereço cadastrado.</Text>
          </View>
        }
      />

      {/* ── Modal: Novo endereço ────────────────────────────────────────── */}
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
                onPress={handleAdd}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ColorScheme.MainColor,
    justifyContent: "center",
    alignItems: "center",
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
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  labelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  divider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
  },
  addressBody: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addressStreet: {
    fontSize: 14,
    color: ColorScheme.TextColor,
    fontWeight: "500",
  },
  addressCity: {
    fontSize: 13,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 4,
  },
  addressZip: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
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
  formArea: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  formRow: {
    flexDirection: "row",
  },
  fieldContainer: {
    marginBottom: 12,
  },
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
  modalConfirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
