import {useContext} from 'react';
import {AuthContext} from '../provider/ui/RoleProvider';

export const useAuth = () => useContext(AuthContext);
