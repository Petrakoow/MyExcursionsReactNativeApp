import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {palette} from '@/shared/config/colors';

type AvatarProps = {
    size?: AvatarSize;
    avatarImage: ImageSourcePropType | string;
};

export enum AvatarSize {
    small = 'small',
    medium = 'medium',
    big = 'big',
}

export const Avatar = (props: AvatarProps) => {
    const {size = AvatarSize.medium, avatarImage} = props;
    const avatarStyles = [styles[size]];

    return (
        <View style={[styles.iconContainer, avatarStyles]}>
            <Image
                source={
                    typeof avatarImage === 'string'
                        ? {uri: avatarImage}
                        : avatarImage
                }
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: moderateScale(2),
        borderColor: palette.light.primary,
        backgroundColor: palette.light.background,
        borderRadius: '50%',
    },
    small: {
        width: moderateScale(50),
        height: moderateScale(50),
    },
    medium: {
        width: moderateScale(100),
        height: moderateScale(100),
    },
    big: {
        width: moderateScale(150),
        height: moderateScale(150),
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
