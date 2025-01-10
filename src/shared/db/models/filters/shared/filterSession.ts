import {ExcursionFilterType} from '@/features/excursions';
import {saveItem, getItem} from '@/shared/db/utils';

const FILTER_SESSION_KEY = 'filter_session';

export const saveFilterSession = (session: ExcursionFilterType): void => {
    saveItem<ExcursionFilterType>(FILTER_SESSION_KEY, session);
};

export const getFilterSession = (): ExcursionFilterType | null => {
    return getItem<ExcursionFilterType>(FILTER_SESSION_KEY);
};

export const clearFilterSession = (): void => {
    saveItem<ExcursionFilterType>(FILTER_SESSION_KEY, {
        country: undefined,
        city: undefined,
        product: undefined,
        ascDesc: undefined,
    });
};
