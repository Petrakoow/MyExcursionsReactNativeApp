import {ReactNode} from 'react';
import {KeyboardAvoidingView, ColorValue, View, FlexStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './ScreenContentStyle';
import {palette} from '@/shared/config/colors';
import React from 'react';
type ScreenProps = {
    children: ReactNode;
    edges?: Edge[];
    excludeEdges?: Edge[];
    backgroundColor?: ColorValue;
    avoiding?: boolean;
    scrollEnabled?: boolean;
    scrollActivation?: boolean;
    contentStyle?: FlexStyle;
};

export const ScreenContent = (props: ScreenProps) => {
    const {
        children,
        avoiding = true,
        edges = ['top', 'bottom', 'left', 'right'],
        excludeEdges = [],
        backgroundColor = palette.light.background,
    } = props;

    return (
        <KeyboardAvoidingView
            style={[styles.container, {backgroundColor}]}
            behavior="height"
            enabled={avoiding}>
            <SafeAreaView
                edges={edges.filter(el => !excludeEdges.includes(el))}
                style={styles.container}>
                <View style={[styles.content]}>{children}</View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
