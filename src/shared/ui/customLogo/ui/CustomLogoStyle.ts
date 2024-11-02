import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        height: 130,
        width: 130,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 130,
        width: 130,
    },
});
