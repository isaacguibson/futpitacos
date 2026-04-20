import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorScheme from "../components/ui/color-scheme";
import AppText from "../components/text";

const Text = AppText;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    header: {
      marginBottom: 32,
      alignItems: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: ColorScheme.MainColor,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: "#11181C",
      textAlign: "center",
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: "#687076",
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#FFB3B3",
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 14,
      color: "#11181C",
      backgroundColor: "#fff",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: ColorScheme.BorderColor,
      borderRadius: 8,
      paddingHorizontal: 16,
      backgroundColor: ColorScheme.BackgroundColor,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 14,
      color: ColorScheme.TextColor,
    },
    eyeIcon: {
      padding: 8,
    },
    forgotPasswordContainer: {
      alignItems: "flex-end",
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: ColorScheme.MainColor,
      fontSize: 12,
      fontWeight: "600",
    },
    signInButton: {
      backgroundColor: ColorScheme.MainColor,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 24,
    },
    signInButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    createAccountContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    createAccountText: {
      color: "#687076",
      fontSize: 14,
    },
    createAccountLink: {
      color: ColorScheme.MainColor,
      fontWeight: "600",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: ColorScheme.LineColor,
    },
    dividerText: {
      color: ColorScheme.SecondaryTextColor,
      marginHorizontal: 12,
      fontSize: 12,
    },
    socialButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 24,
    },
    socialButton: {
      width: 56,
      height: 56,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: ColorScheme.BorderColor,
      backgroundColor: ColorScheme.BackgroundColor,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Futpitacos</Text>
          <Text style={styles.subtitle}>
            Bem-vindo de volta,{"\n"}sentimos sua falta!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe seu e-mail"
            placeholderTextColor="#C0C0C0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Informe sua senha"
              placeholderTextColor="#C0C0C0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#687076"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.signInButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>
            Não tem uma conta?{" "}
            <Text style={styles.createAccountLink}>Crie uma nova conta</Text>
          </Text>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Ou continue com</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="google" size={28} color="#4285F4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={28} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="apple" size={28} color="#11181C" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
