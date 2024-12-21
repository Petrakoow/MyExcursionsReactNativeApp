import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    GAP_BASE,
    moderateScale,
} from '@/shared/config/dimensions';
import {ScreenContent} from '@/shared/ui/screenContent';
import {ProfilePickerIcon} from '@/widgets/profileIcon';
import {getUserSession} from '@/shared/db/models/user';
import {CustomText} from '@/shared/ui/customText';
import {TextSize} from '@/shared/config/font';
import {User} from '@/shared/db/models';
import {getUser} from '@/entities/user/model';
import {ExpandableComponent} from '@/shared/ui/expandableView';
import * as Icons from '@/shared/assets/icons';
import {ContactDataComponent} from '@/widgets/contactData';
import {FavoriteSettings} from '@/widgets/favoriteSettingsData';
import {useDatabase} from '@/provider';
import {CommentSettingsData} from '@/widgets/commentSettingsData';
import {AccountSettingsData} from '@/widgets/accountSettingsData/ui/AccountSettingsData';

export const ProfilePageScreen = () => {
    const [user, setUser] = useState<User | undefined>();
    const database = useDatabase();
    const session = getUserSession();

    useEffect(() => {
        const userId = session?.userId;
        if (!userId) {
            return;
        }

        const userCollection = database
            .objects<User>(User.schema.name)
            .filtered('userId == $0', userId);

        const handleChange = () => {
            setUser(getUser(database, userId));
        };

        userCollection.addListener(handleChange);

        return () => {
            userCollection.removeListener(handleChange);
        };
    }, [database, session?.userId]);

    if (!session?.userId) {
        return null;
    }
    return (
        <ScreenContent>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.profilePickerContainer}>
                        <ProfilePickerIcon
                            realm={database}
                            userId={session?.userId}
                            iconSize={moderateScale(20)}
                        />
                    </View>
                    <View style={styles.profileContainer}>
                        <CustomText
                            size={TextSize.S_2XL}
                            style={styles.profileText}>
                            {user?.name}
                        </CustomText>
                        <CustomText
                            size={TextSize.S_LG}
                            style={styles.profileText}>
                            @{user?.username}
                        </CustomText>
                    </View>
                    <View style={styles.expandableContainer}>
                        <ExpandableComponent
                            title="Контактные данные"
                            Icon={Icons.User}>
                            <ContactDataComponent
                                session={session}
                                database={database}
                            />
                        </ExpandableComponent>
                        <ExpandableComponent title="Уведомления"></ExpandableComponent>
                        <ExpandableComponent title="Комментарии">
                            <CommentSettingsData />
                        </ExpandableComponent>
                        <ExpandableComponent title="Избранное">
                            <FavoriteSettings />
                        </ExpandableComponent>
                        <ExpandableComponent title="Настройки аккаунта">
                            <AccountSettingsData />
                        </ExpandableComponent>
                    </View>
                </View>
            </ScrollView>
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
    profileContainer: {
        marginBottom: moderateScale(15),
    },
    expandableContainer: {
        gap: GAP_BASE + 4,
    },
    profileText: {
        textAlign: 'center',
    },
});
