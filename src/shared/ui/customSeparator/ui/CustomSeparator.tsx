import {View, ColorValue} from 'react-native';
import {styles} from './CustomSeparatorStyle';
import {CustomText} from '../../customText';
import {palette} from '@/shared/config/colors';
import {TextSize} from '@/shared/config/font';

type LineSeparatorType = {
    title?: string;
    textColor?: ColorValue;
};

export const LineSeparator = (props: LineSeparatorType) => {
    const {title = 'or', textColor = palette.light.textPrimary} = props;
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <CustomText
                style={[{color: textColor}, styles.text]}
                size={TextSize.S_XL}>
                {title}
            </CustomText>
            <View style={styles.line} />
        </View>
    );
};
