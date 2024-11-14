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
    product?: FilterByQualityProduct;
    ascDesc?: FilterAscDesc;
};

export type FilterByNameAndId = {id: number; name: string} | undefined;

export type FilterAscDesc = OrderType | undefined;

export type FilterByQualityProduct = OrderFieldType | undefined;

export type FilterItem<T = {}> = (FilterByNameAndId & T) | undefined;

export type FilterByName = {name: string} | undefined;
