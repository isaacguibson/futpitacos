import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import React from 'react';

/**
 * Custom Text component that applies Schoolbell font globally
 * This component wraps React Native's Text and automatically applies the Schoolbell font
 */
interface TextProps extends RNTextProps {
  children?: React.ReactNode;
}

function AppText(props: TextProps) {
  const { style, ...rest } = props;

  return <RNText {...rest} style={style} />;
}

export default AppText;
