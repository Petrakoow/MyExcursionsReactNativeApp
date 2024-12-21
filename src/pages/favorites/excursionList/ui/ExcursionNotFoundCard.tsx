import {View, StyleSheet} from 'react-native';
import React from 'react';
import {CustomText} from '@/shared/ui/customText';
import {NotFound} from '@/shared/assets/icons';
import {moderateScale} from 'react-native-size-matters';
import {ScreenContent} from '@/shared/ui/screenContent';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
} from '@/shared/config/dimensions';
import {TextSize, TextWeight} from '@/shared/config/font';
import {palette} from '@/shared/config/colors';

export const ExcursionNotFoundCard = () => {
    return (
        <ScreenContent>
            <View style={styles.container}>
                <CustomText
                    style={styles.title}
                    size={TextSize.S_2XL}
                    weight={TextWeight.BOLD}>
                    К сожалению ничего не найдено!
                </CustomText>
                <View style={styles.containerRow}>
                    <NotFound width={50} height={50} />
                    <CustomText style={styles.text}>
                        Пока у вас нет избранных экскурсий. Мы ждём, когда вы
                        что-нибудь сохраните!
                    </CustomText>
                </View>
            </View>
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
        flex: 1,
    },
    title: {
        color: palette.light.primary,
        marginBottom: moderateScale(12),
    },
    containerRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: moderateScale(10),
    },
    text: {
        flexShrink: 1,
    },
});
