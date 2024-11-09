import { Colors } from "@/shared/config/colors";
import { CONTENT_PADDING_VERTICAL, CONTENT_PADDING_HORIZONTAL } from "@/shared/config/dimensions";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentHeader: {
        paddingTop: CONTENT_PADDING_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    contentBottom: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    contentReview: {
        flex: 1,
    },
    title: {
        paddingVertical: moderateScale(5),
    },
    header: {
        color: Colors.widget.informationTourCard.reviews.header,
        marginBottom: moderateScale(12),
    },
    ratingTitle: {
        color: Colors.widget.informationTourCard.reviews.title,
    },
    rating: {
        marginBottom: moderateScale(4),
        color: Colors.widget.informationTourCard.reviews.mark,
    },
    summary: {
        marginBottom: moderateScale(12),
        color: Colors.widget.informationTourCard.reviews.title,
    },
    noReviewsText: {
        textAlign: 'center',
        marginTop: moderateScale(16),
        color: Colors.widget.informationTourCard.reviews.noReviews,
    },
    pagination: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: moderateScale(5),
    }
});
