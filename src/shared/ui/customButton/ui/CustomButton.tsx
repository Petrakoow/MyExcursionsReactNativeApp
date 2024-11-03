import {
    TouchableOpacity,
    TouchableOpacityProps,
    ColorValue,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CustomText} from '@/shared/ui/customText';
import {SvgProps} from 'react-native-svg';
import {styles} from './CustomButtonStyle';
import {TextSize} from '@/shared/config/font';
import {Colors} from '@/shared/config/colors';

type CustomButtonProps = TouchableOpacityProps & {
    Icon?: React.FC<SvgProps>;
    textButton?: string;
    textColor?: ColorValue;
};

const ICON_SIZE = moderateScale(25);

export const CustomButton = (props: CustomButtonProps) => {
    const {
        Icon,
        textButton = 'default text',
        style,
        textColor = Colors.white,
        disabled,
        ...res
    } = props;
    return (
        <TouchableOpacity
            style={[style, styles.container, disabled && styles.disabled]}
            disabled={disabled}
            {...res}>
            <CustomText size={TextSize.S_XL} style={{color: textColor}}>
                {textButton}
            </CustomText>
            {Icon && (
                <Icon width={ICON_SIZE} height={ICON_SIZE} fill={textColor} />
            )}
        </TouchableOpacity>
    );
};
