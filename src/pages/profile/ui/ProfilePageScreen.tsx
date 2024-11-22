import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    GAP_BASE,
    moderateScale,
} from '@/shared/config/dimensions';
import {ScreenContent} from '@/shared/ui/screenContent';
import {ProfilePickerIcon} from '@/widgets/profileIcon';
import {useDatabase} from '@/features/db/provider';
import {getUserSession} from '@/shared/db/models/user';
import {CustomText} from '@/shared/ui/customText';
import {TextSize} from '@/shared/config/font';
import {User} from '@/shared/db/models';
import {getUser} from '@/entities/user/model';
import {ExpandableComponent} from '@/shared/ui/expandableView';
import * as Icons from '@/shared/assets/icons';
import {ContactDataComponent} from '@/widgets/contactData';
import {useCity} from '@/features/map';

export const ProfilePageScreen = () => {
    const [user, setUser] = useState<User | undefined>();
    const database = useDatabase();
    const session = getUserSession();
    const city = useCity();
    console.log(city);

    useEffect(() => {
        const userId = session?.userId;
        if (!userId) return;

        // Получаем коллекцию с фильтром
        const userCollection = database
            .objects<User>(User.schema.name)
            .filtered('userId == $0', userId);

        // Функция слушателя
        const handleChange = () => {
            const user = getUser(database, userId);
            setUser(user);
        };

        userCollection.addListener(handleChange);

        // Убираем слушатель при размонтировании компонента
        return () => {
            userCollection.removeListener(handleChange);
        };
    }, [database, session?.userId]);

    if (!session?.userId) return null;
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
                        <ExpandableComponent title="Геопозиция"></ExpandableComponent>
                        <ExpandableComponent title="Уведомления"></ExpandableComponent>
                        <ExpandableComponent title="Комментарии"></ExpandableComponent>
                        <ExpandableComponent title="Избранное"></ExpandableComponent>
                        <ExpandableComponent title="Настройки аккаунта"></ExpandableComponent>
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
