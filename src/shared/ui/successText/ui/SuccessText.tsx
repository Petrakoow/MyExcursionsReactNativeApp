import {View} from 'react-native';
import {CustomText} from '../../customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {styles} from './SuccessTextStyle';

type SuccessTextType = {
    title?: string;
    description?: string;
};

export const SuccessText = (props: SuccessTextType) => {
    const {title = 'Success', description} = props;
    return (
        <View style={styles.container}>
            <CustomText
                size={TextSize.S_LG}
                weight={TextWeight.MEDIUM}
                style={styles.titleSuccess}>
                {title}
            </CustomText>
            {description && (
                <View>
                    <CustomText style={styles.descriptionSuccess}>
                        {description}
                    </CustomText>
                </View>
            )}
        </View>
    );
};
