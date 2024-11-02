import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomText} from '../../customText';
import {styles} from './LinkScreenStyle';
import {
    AppNavigation,
    RootStackParamList,
} from '@/shared/config/navigation/navigation';
import {TextSize} from '@/shared/config/font';

type LinkScreenType = TouchableOpacityProps & {
    title: string;
    screenName: AppNavigation;
    params?: RootStackParamList[AppNavigation];
};

export const LinkScreen = (props: LinkScreenType) => {
    const {title = 'Default Link', screenName, params, style, ...res} = props;
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onPressNavigation = () => {
        navigation.navigate(screenName, params);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[style, styles.link]}
                onPress={onPressNavigation}
                {...res}>
                <CustomText style={styles.linkText} size={TextSize.S_BASE}>
                    {title}
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};
