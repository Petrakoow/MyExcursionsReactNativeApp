import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
} from '@/shared/config/dimensions';
import { palette } from '@/shared/config/colors';

export const styles = StyleSheet.create({
    content: {
        paddingVertical: CONTENT_PADDING_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    coverImage: {
        width: '100%',
        height: 300,
        borderRadius: CONTENT_RADIUS,
        marginBottom: moderateScale(16),
    },
    title: {
        color: palette.light.primary,
        textAlign: 'left',
        marginBottom: moderateScale(10),
    },
    activityType: {
        color: palette.light.textSecondary,
        paddingBottom: moderateScale(4),
    },
    imageSection: {
        height: 80,
        width: 80,
    },
    infoSectionMainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: palette.light.textSecondary,
        marginBottom: moderateScale(20),
        paddingBottom: moderateScale(16),
    },
    infoSectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoSectionContainerImage: {
        justifyContent: 'center',
    },
    infoSection: {
        gap: moderateScale(8),
    },
    infoBase: {
        textAlign: 'right',
    },
    infoPrice: {
        color: palette.light.primary,
    },
    infoDuration: {},
    infoRating: {},
    infoLanguages: {
        textTransform: 'uppercase',
    },
    infoPaymentType: {
        color: palette.light.primary,
    },
    infoProductType: {
        color: palette.light.primary,
    },
    sectionDescription: {
        backgroundColor: palette.light.background,
        marginBottom: moderateScale(16),
    },
    sectionTitleDescrtiption: {
        marginBottom: moderateScale(16),
        color: palette.light.primary,
    },
    sectionContent: {
        lineHeight: moderateScale(24),
        borderBottomWidth: 1,
        borderBottomColor: palette.light.border,
        paddingBottom: moderateScale(16),
    },
    sectionContainerGuide: {
        marginBottom: moderateScale(10),
    },
    sectionTitleGuide: {
        color: palette.light.primary,
        marginBottom: moderateScale(10),
    },
    sectionContainerGuideLocal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionContainerGuideText: {
        gap: moderateScale(12),
    },
    sectionGuideRating: {
        color: palette.light.warning,
    },
    hostInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    hostImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    hostDetails: {
        flexDirection: 'column',
    },
    hostName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    hostRating: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
});
