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
    const {label = 'Input field', secureTextEntry, isSwitching, ...res} = props;
    const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry || false);

    return (
        <View style={styles.container}>
            <CustomText size={TextSize.S_XL} weight={TextWeight.MEDIUM}>
                {label}
            </CustomText>
            <View style={styles.wrapper}>
                <TextInput
                    {...res}
                    style={[
                        styles.input,
                        styles.borderColor,
                        FontStyle.font_normal,
                        FontStyle.size_lg,
                        secureTextEntry && styles.paddingInput,
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
