import {TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';
import {CustomText} from '@/shared/ui/customText';
import {styles as FontStyle, TextSize, TextWeight} from '@/shared/config/font';
import {styles} from './CustomInputStyle';
import {Trailing} from './Trailing';
type CustomTextType = TextInputProps & {
    label?: string;
    isSwitching?: boolean;
};

export const CustomInput = (props: CustomTextType) => {
    const {label, secureTextEntry, isSwitching, style, ...res} = props;
    const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry || false);

    return (
        <View style={styles.container}>
            {label && (
                <CustomText size={TextSize.S_XL} weight={TextWeight.NORMAL}>
                    {label}
                </CustomText>
            )}
            <View style={secureTextEntry && styles.wrapper}>
                <TextInput
                    {...res}
                    style={[
                        styles.input,
                        styles.borderColor,
                        FontStyle.font_normal,
                        FontStyle.size_lg,
                        secureTextEntry && styles.paddingInput,
                        style,
                    ]}
                    numberOfLines={1}
                    secureTextEntry={isSecure}
                    multiline={false}
                />
                {secureTextEntry && (
                    <Trailing show={isSecure} setShow={setIsSecure} />
                )}
            </View>
        </View>
    );
};
