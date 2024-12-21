import {Alert} from 'react-native';

export const confirmAction = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmButtonText = 'Удалить',
    cancelButtonText = 'Отмена',
) => {
    Alert.alert(title, message, [
        {
            text: cancelButtonText,
            style: 'cancel',
        },
        {
            text: confirmButtonText,
            onPress: onConfirm,
            style: 'destructive',
        },
    ]);
};
