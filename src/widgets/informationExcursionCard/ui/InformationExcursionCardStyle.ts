import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CONTENT_RADIUS} from '@/shared/config/dimensions';
import {Colors} from '@/shared/config/colors';

export const styles = StyleSheet.create({
    coverImage: {
        width: '100%',
        height: 300,
        borderRadius: CONTENT_RADIUS,
        marginBottom: moderateScale(16),
    },
    title: {
        color: Colors.widget.informationTourCard.title,
        textAlign: 'left',
        marginBottom: moderateScale(10),
    },
    activityType: {
        color: Colors.widget.informationTourCard.activityType,
        marginBottom: moderateScale(20),
        paddingBottom: moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: Colors.widget.informationTourCard.activityType,
    },
    imageSection: {
        height: 80,
        width: 80,
    },
    infoSectionMainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.widget.informationTourCard.activityType,
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
        color: Colors.widget.informationTourCard.price,
    },
    infoDuration: {},
    infoRating: {},
    infoLanguages: {
        textTransform: 'uppercase',
    },
    infoPaymentType: {
        color: Colors.widget.informationTourCard.paymentType,
    },
    infoProductType: {
        color: Colors.widget.informationTourCard.productType,
    },
    sectionDescription: {
        backgroundColor: Colors.white,
        marginBottom: moderateScale(16),
    },
    sectionTitleDescrtiption: {
        marginBottom: moderateScale(16),
        color: Colors.widget.informationTourCard.title,
    },
    sectionContent: {
        lineHeight: moderateScale(24),
        borderBottomWidth: 1,
        borderBottomColor: Colors.widget.informationTourCard.activityType,
        paddingBottom: moderateScale(16),
    },
    sectionContainerGuide: {
        marginBottom: moderateScale(10),
    },
    sectionTitleGuide: {
        color: Colors.widget.informationTourCard.guideTitle,
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
        color: Colors.widget.informationTourCard.rating,
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
