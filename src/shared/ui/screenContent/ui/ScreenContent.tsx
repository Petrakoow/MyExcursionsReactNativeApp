import {ReactNode} from 'react';
import {KeyboardAvoidingView, ColorValue, ScrollView, View} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './ScreenContentStyle';
import {Colors} from '@/shared/config/colors';

type ScreenProps = {
    children: ReactNode;
    edges?: Edge[];
    excludeEdges?: Edge[];
    backgroundColor?: ColorValue;
    avoiding?: boolean;
    scrollEnabled?: boolean;
};

export const ScreenContent = (props: ScreenProps) => {
    const {
        children,
        avoiding = true,
        edges = ['top', 'bottom', 'left', 'right'],
        excludeEdges = [],
        backgroundColor = Colors.white,
        scrollEnabled = true,
    } = props;

    return (
        <KeyboardAvoidingView
            style={[styles.container, {backgroundColor}]}
            behavior="height"
            enabled={avoiding}>
            <SafeAreaView
                edges={edges.filter(el => !excludeEdges.includes(el))}>
                <ScrollView scrollEnabled = {scrollEnabled}>
                    <View style={styles.content}>{children}</View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
