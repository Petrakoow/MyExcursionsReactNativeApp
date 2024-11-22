import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    moderateScale,
} from '@/shared/config/dimensions';
import {ScreenContent} from '@/shared/ui/screenContent';
import {ProfilePickerIcon} from '@/widgets/profileIcon';
import {useDatabase} from '@/app/providers';
import {getUserSession} from '@/shared/db/models/user';
import {CustomText} from '@/shared/ui/customText';
import {TextSize} from '@/shared/config/font';
import {User} from '@/shared/db/models';
import {getUser} from '@/entities/user/model';

export const ProfilePageScreen = () => {
    const [user, setUser] = useState<User | undefined>();
    const database = useDatabase();
    const session = getUserSession();

    useEffect(() => {
        const userId = session?.userId;
        if (userId) {
            const user = getUser(database, userId);
            setUser(user);
        }
    }, []);

    if (!session?.userId) return null;
    return (
        <ScreenContent>
            <View style={styles.content}>
                <View style={styles.profilePickerContainer}>
                    <ProfilePickerIcon
                        realm={database}
                        userId={session?.userId}
                    />
                </View>
                <View>
                    <CustomText
                        size={TextSize.S_2XL}
                        style={styles.profileText}>
                        {user?.name}
                    </CustomText>
                    <CustomText size={TextSize.S_LG} style={styles.profileText}>
                        @{user?.username}
                    </CustomText>
                </View>
            </View>
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
    },
    profilePickerContainer: {
        marginBottom: moderateScale(14),
    },
    profileContainer: {},
    profileText: {
        textAlign: 'center',
    },
});
