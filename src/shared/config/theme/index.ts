import {StyleSheet} from 'react-native';
import {Colors} from '../colors';

export const Theme = {
    light: StyleSheet.create({
        input: {
            borderColor: Colors.input,
        },
        buttonFirstType: {
            backgroundColor: Colors.button,
            color: Colors.white,
        },
        buttonSecondType: {
            backgroundColor: Colors.white,
        },
        separator: {
            backgroundColor: Colors.separator,
        },
        link: {
            color: Colors.link,
        },
        error: {
            color: Colors.error,
        },
        errorDescription: {
            color: Colors.descriptionError,
        },
    }),
};
