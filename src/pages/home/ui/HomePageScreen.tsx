import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
} from '@/shared/config/dimensions';

export const HomePage = () => {
    return (
        <ScreenContent>
            <View style={styles.content}>
                <View>
                    <Text>a</Text>
                </View>
            </View>
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
    },
});
