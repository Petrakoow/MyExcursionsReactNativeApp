import {View, Image, ImageSourcePropType} from 'react-native';
import { styles } from './CustomLogoStyle';
import {Logo} from '@/shared/assets/images';
import {CustomText} from '@/shared/ui/customText';
import { TextSize, TextWeight } from '@/shared/config/font';


type LogotypeType = {
    title?: string,
    href?: ImageSourcePropType
}

export const Logotype = (props : LogotypeType) => {
    const {href=Logo, title = "Logotype"} = props;
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={href}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <CustomText size={TextSize.S_4XL} weight={TextWeight.BLACK}>{title}</CustomText>
        </View>
    );
};
