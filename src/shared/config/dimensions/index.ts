import {Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export {
    scale as horizontalScale,
    moderateScale,
    verticalScale,
} from 'react-native-size-matters';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
    Dimensions.get('screen');

// PADDING
export const CONTENT_PADDING_HORIZONTAL = moderateScale(15);
export const CONTENT_PADDING_VERTICAL = moderateScale(10);

// MARGIN

// RADIUS
export const CONTENT_RADIUS = moderateScale(30);

// NAVIGATION
