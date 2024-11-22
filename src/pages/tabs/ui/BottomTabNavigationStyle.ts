import { palette } from '@/shared/config/colors';
import {
    NAV_PADDING_BOTTOM,
    NAV_PADDING_TOP,
    NAV_HEIGHT,
    NAV_FONT_SIZE,
    CONTENT_PADDING_HORIZONTAL,
} from '@/shared/config/dimensions';
import {FontFamily} from '@/shared/config/font';

export const screenOptions = {
    headerShown: false,
    tabBarStyle: {
        paddingTop: NAV_PADDING_TOP,
        paddingBottom: NAV_PADDING_BOTTOM,
        height: NAV_HEIGHT,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL - 10,
        backgroundColor: palette.light.background,
        borderTopColor: palette.light.border,
    },
    tabBarLabelStyle: {
        fontSize: NAV_FONT_SIZE,
        fontFamily: FontFamily.INTER_REGULAR,
        fontWeight: 400,
    },
    tabBarInactiveTintColor: palette.light.textPrimary,
    tabBarActiveTintColor: palette.light.primary,
} as const;
