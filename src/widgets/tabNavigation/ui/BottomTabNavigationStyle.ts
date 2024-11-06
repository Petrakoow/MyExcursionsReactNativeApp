import {Colors} from '@/shared/config/colors';
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
        backgroundColor: Colors.tabs.backgroundColor,
        borderTopColor: Colors.tabs.borderTop,
    },
    tabBarLabelStyle: {
        fontSize: NAV_FONT_SIZE,
        fontFamily: FontFamily.INTER_REGULAR,
        fontWeight: 400,
    },
    tabBarInactiveTintColor: Colors.tabs.inActive,
    tabBarActiveTintColor: Colors.tabs.active,
} as const;
