import {LanguageType, OrderFieldType} from '@/shared/api/sputnik8';
import {OrderType} from '@/shared/api/sputnik8';

export type ExcursionSettingsType = {
    language: LanguageType;
    limit?: number;
    filters?: ExcursionFilterType;
};

export type ExcursionFilterType = {
    country?: FilterByNameAndId;
    city?: FilterByNameAndId;
    product?: OrderFieldType;
    ascDesc?: OrderType;
};

export type FilterByNameAndId = {id: number; name: string};

export type FilterItem<T = {}> =
    | ({
          id: string | number;
          name: string;
      } & T)
    | undefined;
