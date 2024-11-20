import {StyleProp, View} from 'react-native';
import React, {useCallback} from 'react';
import {CustomButton} from '@/shared/ui/customButton';
import {CustomText} from '@/shared/ui/customText';
import {ViewStyle} from 'react-native-size-matters';
import {styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
import {styles} from './PaginationPanelStyle';

type PaginationPanelType = {
    titleLeftButton?: string;
    titleRightButton?: string;
    titlePage?: string;
    style?: StyleProp<ViewStyle>;
    page: number;
    loading?: boolean;
    fetching?: boolean;
    hasMore?: boolean;
    callbackPrevious: () => void;
    callbackNext: () => void;
};

export const PaginationPanel = (props: PaginationPanelType) => {
    const {
        titleLeftButton = 'Назад',
        titleRightButton = 'Вперёд',
        titlePage = 'Стр.',

        page = 1,
        fetching,
        hasMore,

        callbackPrevious,
        callbackNext,
    } = props;

    const handleLoadNextPage = useCallback(() => {
        if (hasMore && !fetching) {
            callbackNext();
        }
    }, [hasMore, fetching]);

    const handleLoadPreviousPage = useCallback(() => {
        if (page > 1 && !fetching) {
            callbackPrevious();
        }
    }, [page, fetching]);

    return (
        <View style={[styles.pagination]}>
            <CustomButton
                style={[styleButton.primaryTypeButton, styles.pageButton]}
                onPress={handleLoadPreviousPage}
                disabled={page === 1 || fetching}
                textButton={titleLeftButton}
                textSize={TextSize.S_BASE}
            />
            <CustomText
                size={TextSize.S_BASE}
                weight={TextWeight.LIGHT}>{`${titlePage} ${page}`}</CustomText>
            <CustomButton
                style={[styleButton.primaryTypeButton, styles.pageButton]}
                onPress={handleLoadNextPage}
                disabled={!hasMore || fetching}
                textButton={titleRightButton}
                textSize={TextSize.S_BASE}
            />
        </View>
    );
};
