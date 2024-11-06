import {ReactNode} from 'react';
import {
    KeyboardAvoidingView,
    ColorValue,
    ScrollView,
    View,
    FlexStyle,
} from 'react-native';
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
    scrollActivation?: boolean;
    contentStyle?: FlexStyle;
};

export const ScreenContent = (props: ScreenProps) => {
    const {
        children,
        avoiding = true,
        edges = ['top', 'bottom', 'left', 'right'],
        excludeEdges = [],
        backgroundColor = Colors.white,
        scrollEnabled = true,
        scrollActivation = true,
        contentStyle,
    } = props;

    return (
        <KeyboardAvoidingView
            style={[styles.container, {backgroundColor}]}
            behavior="height"
            enabled={avoiding}>
            <SafeAreaView
                edges={edges.filter(el => !excludeEdges.includes(el))}
                style={styles.container}>
                {scrollActivation ? (
                    <ScrollView scrollEnabled={scrollEnabled}>
                        <View style={styles.content}>{children}</View>
                    </ScrollView>
                ) : (
                    <View style={[styles.content, contentStyle]}>
                        {children}
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
