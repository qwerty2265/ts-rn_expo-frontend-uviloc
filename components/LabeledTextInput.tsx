import React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";

interface LabeledTextInputProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
    value?: string;
    labelStyle?: TextStyle;
    textInputStyle?: TextStyle;
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
    label= '',
    placeholder = '',
    secureTextEntry = false,
    onChangeText = () => null,
    value,
    labelStyle,
    textInputStyle
}) => {
    return (
        <View>
            <CustomText style={labelStyle}>{label}</CustomText>
            <CustomTextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={ textInputStyle}
            />
        </View>
    );
};

export default LabeledTextInput;
