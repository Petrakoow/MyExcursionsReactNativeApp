import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ImageSourcePropType } from 'react-native';
import { getUser, updateUser } from '@/entities/user/model';
import Realm from 'realm';

export const useProfilePicker = (realm: Realm, userId: string) => {
    const [imageUri, setImageUri] = useState<ImageSourcePropType | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        const user = getUser(realm, userId);
        if (user?.profileIcon) {
            setImageUri(user.profileIcon as ImageSourcePropType);
        }
    }, [realm, userId]);

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (!response.didCancel && response.assets?.length) {
                const newUri = response.assets[0].uri;
                setImageUri(newUri as ImageSourcePropType);
                updateUser(realm, userId, { profileIcon: newUri });
            }
        });
        setModalVisible(false);
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, response => {
            if (!response.didCancel && response.assets?.length) {
                const newUri = response.assets[0].uri;
                setImageUri(newUri as ImageSourcePropType);
                updateUser(realm, userId, { profileIcon: newUri });
            }
        });
        setModalVisible(false);
    };

    const resetPhoto = () => {
        setImageUri(undefined);
        updateUser(realm, userId, { profileIcon: undefined });
    };

    return {
        imageUri,
        modalVisible,
        setModalVisible,
        openGallery,
        takePhoto,
        resetPhoto,
    };
};
