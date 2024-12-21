import {auth, firestore, doc, deleteDoc} from '@/shared/api/firebase/firebase';
import {confirmAction} from '@/shared/utils';
import {Alert} from 'react-native';
import {useAuth} from '@/provider'; // Import useAuth to access updateRole
import {saveUserSession} from '@/shared/db/models/user';
import {UNAUTHORIZED_USER} from '@/shared/config/constants';
import {RolesEnum} from '@/entities/user/model';

export const useAccountActions = () => {
    const {reloadState, updateRole} = useAuth(); // Destructure updateRole from useAuth

    const logoutUser = async () => {
        try {
            await auth().signOut();
            await reloadState();
            updateRole(); // Call updateRole after logout
        } catch (err) {
            throw new Error('Failed to log out: ' + (err as Error).message);
        }
    };

    const deleteUserAccount = async () => {
        const user = auth().currentUser;
        if (!user) throw new Error('No authenticated user found');

        const userDocRef = doc(firestore(), 'users', user.uid);

        try {
            await deleteDoc(userDocRef);
            await user.delete();
            saveUserSession({
                userId: UNAUTHORIZED_USER,
                username: UNAUTHORIZED_USER,
                role: RolesEnum.GUEST,
            });
            updateRole();
        } catch (err) {
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
