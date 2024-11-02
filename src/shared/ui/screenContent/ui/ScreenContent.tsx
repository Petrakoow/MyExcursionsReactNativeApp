import {ReactNode} from 'react';
import {KeyboardAvoidingView, ColorValue} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './ScreenContentStyle';
import {Colors} from '@/shared/config/colors';

type ScreenProps = {
    children: ReactNode;
    edges?: Edge[];
    excludeEdges?: Edge[];
    backgroundColor?: ColorValue;
    avoiding?: boolean;
};

export const ScreenContent = (props: ScreenProps) => {
    const {
        children,
        avoiding = true,
        edges = ['top', 'bottom', 'left', 'right'],
        excludeEdges = [],
        backgroundColor = Colors.white,
    } = props;

    return (
        <KeyboardAvoidingView
            style={[styles.container, {backgroundColor}]}
            behavior="height"
            enabled={avoiding}>
            <SafeAreaView
                edges={edges.filter(el => !excludeEdges.includes(el))}
                style={styles.content}>
                {children}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
