import {auth, firestore, doc, deleteDoc} from '@/shared/api/firebase/firebase';
import {confirmAction} from '@/shared/utils';
import {Alert} from 'react-native';
import {useAuth, useDatabase} from '@/provider';
import {clearFilterSession} from '@/shared/db/models/filters';
import {deleteAllFavoriteExcursions} from '@/entities/excursion';
import {deleteUserBookings} from '@/entities/booking';
import {deleteAllReviews} from '@/entities/reviews';
import {deleteUserStatus} from '@/entities/status';
import notifee from '@notifee/react-native';
import { resetNotificationSettings } from '@/shared/db/notifications';

export const useAccountActions = () => {
    const {reloadState, updateRole} = useAuth();
    const database = useDatabase();

    const logoutUser = async () => {
        try {
            clearFilterSession();
            await auth().signOut();
            await reloadState();
            updateRole();
        } catch (err) {
            throw new Error('Failed to log out: ' + (err as Error).message);
        }
    };

    const deleteUserAccount = async () => {
        const user = auth().currentUser;
        if (!user) throw new Error('No authenticated user found');

        const userDocRef = doc(firestore(), 'users', user.uid);

        try {
            console.log(user.uid);
            deleteAllReviews(database, user.uid);
            deleteAllFavoriteExcursions(database, user.uid);
            deleteUserBookings(database, user.uid);
            deleteUserStatus(database, user.uid);
            resetNotificationSettings(user.uid);
            await deleteDoc(userDocRef);

            await notifee.cancelAllNotifications();
            await user.delete();

            await reloadState();
            updateRole();
        } catch (err) {
            console.log(err);
            throw new Error(
                'Failed to delete account: ' + (err as Error).message,
            );
        }
    };

    const confirmDeleteAccount = () => {
        confirmAction(
            'Подтверждение удаления',
            'Вы уверены, что хотите удалить вашу учетную запись? Это действие невозможно отменить.',
            async () => {
                try {
                    await deleteUserAccount();
                } catch (err) {
                    Alert.alert('Ошибка', (err as Error).message);
                }
            },
        );
    };

    return {logoutUser, confirmDeleteAccount};
};
