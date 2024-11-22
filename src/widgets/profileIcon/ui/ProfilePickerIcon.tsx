import {palette} from '@/shared/config/colors';
import React, {FC} from 'react';
import {
    View,
    Image,
    Modal,
    ImageSourcePropType,
} from 'react-native';
import * as Images from '@/shared/assets/images';
import {SvgProps} from 'react-native-svg';
import * as Icons from '@/shared/assets/icons';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize} from '@/shared/config/font';
import Realm from 'realm';
import {useProfilePicker} from '../hook/useProfilePicker';
import { styles } from './ProfilePickerIconStyle';

type ProfilePickerIconType = {
    Icon?: FC<SvgProps>;
    basicImage?: ImageSourcePropType;
    userId: string;
    realm: Realm;
    transparent?: boolean;
    animationType?: 'none' | 'fade' | 'slide';
};

export const ProfilePickerIcon = (props: ProfilePickerIconType) => {
    const {
        Icon = Icons.Camera,
        realm,
        userId,
        transparent = true,
        animationType = 'fade',
        basicImage = Images.ProfileLogo,
    } = props;

    const {
        imageUri,
        modalVisible,
        setModalVisible,
        openGallery,
        takePhoto,
        resetPhoto,
    } = useProfilePicker(realm, userId);

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={imageUri ? {uri: imageUri} : basicImage}
                        style={styles.avatar}
                    />
                </View>
                <CustomButton
                    Icon={Icon}
                    style={styles.buttonIconContainer}
                    onPress={() => setModalVisible(true)}
                />
            </View>
            <Modal
                transparent={transparent}
                animationType={animationType}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalSelectPhotoContainer}>
                            <CustomButton
                                textButton="Открыть галлерею"
                                textSize={TextSize.S_BASE}
                                style={[
                                    styleButton.primaryTypeButton,
                                    styles.modalButton,
                                    styles.flexRowButton,
                                ]}
                                onPress={openGallery}
                            />
                            <CustomButton
                                textButton="Сделать фото"
                                textSize={TextSize.S_BASE}
                                style={[
                                    styleButton.primaryTypeButton,
                                    styles.modalButton,
                                    styles.flexRowButton,
                                ]}
                                onPress={takePhoto}
                            />
                        </View>

                        <CustomButton
                            textButton="Сбросить"
                            textSize={TextSize.S_BASE}
                            style={[
                                styleButton.warningTypeButton,
                                styles.modalButton,
                            ]}
                            onPress={resetPhoto}
                        />
                        <CustomButton
                            textButton="Отменить"
                            textSize={TextSize.S_BASE}
                            style={[
                                styleButton.secondaryTypeButton,
                                styles.modalButton,
                                styles.modalCancelButton,
                            ]}
                            onPress={() => setModalVisible(false)}
                            textColor={palette.light.textPrimary}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};