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
export const CONTENT_PADDING_HORIZONTAL = moderateScale(20);
export const CONTENT_PADDING_VERTICAL = moderateScale(20);

// MARGIN
export const CONTENT_MARGIN_HORIZONTAL = moderateScale(20);
export const CONTENT_MARGIN_VERTICAL = moderateScale(20);

// RADIUS
export const CONTENT_RADIUS = moderateScale(30);

// NAVIGATION
export const NAV_HEIGHT = moderateScale(63);
export const NAV_PADDING_VERTICAL = moderateScale(10);
export const NAV_PADDING_TOP = moderateScale(5);
export const NAV_PADDING_BOTTOM = moderateScale(8);
export const NAV_FONT_SIZE = moderateScale(11);

// GAP
export const GAP_BASE = moderateScale(5);

// MODAL
export const MODAL_WIDTH = '90%';
export const MODAL_HEIGHT = '90%';
