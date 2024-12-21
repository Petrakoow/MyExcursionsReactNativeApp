import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useCallback} from 'react';
import * as Icons from '@/shared/assets/icons';
import {moderateScale} from 'react-native-size-matters';

type TrailingProps = {
    show: boolean;
    setShow: (value: boolean) => void;
};

const ICON_SIZE = moderateScale(25);

export const Trailing = (props: TrailingProps) => {
    const {show, setShow} = props;

    const onPressHandler = useCallback(() => {
        setShow(!show);
    }, [show]);
    return (
        <Pressable onPress={onPressHandler} style={styles.wrapper}>
            {show ? (
                <Icons.EyeOpenIcon width={ICON_SIZE} height={ICON_SIZE} />
            ) : (
                <Icons.EyeCloseIcon width={ICON_SIZE} height={ICON_SIZE} />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        right: moderateScale(15),
        alignItems: 'center',
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
});
