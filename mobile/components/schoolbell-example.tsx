import { StyleSheet, View } from 'react-native';
import ColorScheme from '@/components/ui/color-scheme';
import AppText from './text';

const Text = AppText;

/**
 * Componente de exemplo usando a fonte Schoolbell do Google Fonts
 *
 * Para usar em seus componentes, basta adicionar:
 * style={{ fontFamily: 'Schoolbell' }}
 */

export default function SchoolbellExample() {
  return (
    <View style={styles.container}>
      {/* Título com a fonte Schoolbell */}
      <Text style={styles.schoolbellTitle}>
        FutPitacos
      </Text>

      {/* Subtítulo com a fonte Schoolbell */}
      <Text style={styles.schoolbellSubtitle}>
        Palpite de Futebol
      </Text>

      {/* Texto decorativo */}
      <View style={styles.decorativeBox}>
        <Text style={styles.schoolbellDecoration}>
          ✨ Bem-vindo! ✨
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  schoolbellTitle: {
    fontFamily: 'Schoolbell',
    fontSize: 48,
    fontWeight: 'bold',
    color: ColorScheme.MainColor,
    marginBottom: 10,
  },
  schoolbellSubtitle: {
    fontFamily: 'Schoolbell',
    fontSize: 24,
    color: ColorScheme.SecondaryTextColor,
    marginBottom: 40,
  },
  decorativeBox: {
    backgroundColor: ColorScheme.CardBackgroundColor,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ColorScheme.LineColor,
  },
  schoolbellDecoration: {
    fontFamily: 'Schoolbell',
    fontSize: 20,
    color: ColorScheme.TextColor,
    textAlign: 'center',
  },
});
