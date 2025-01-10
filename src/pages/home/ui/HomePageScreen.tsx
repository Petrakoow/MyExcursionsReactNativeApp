import {FlatList, View} from 'react-native';
import React from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {SearchFilterComponent} from '@/shared/ui/filterPanel';
import {CustomText} from '@/shared/ui/customText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ErrorText} from '@/shared/ui/errorText';
import {useHomePage} from '@/features/home';
import {CategoryType, ProductType, SubCategoryType} from '@/shared/api';
import {CardExcursionByCategory} from '@/widgets/cardExcursionByCategory';
import {TextSize, TextWeight} from '@/shared/config/font';
import {NavigationStackList} from '@/shared/config/navigation';
import {styles} from './HomePageScreenStyle';
import {SplashScreen} from '@/shared/ui/splashScreen';

export const HomePage = () => {
    const {categories, cities, selectedCity, loading, error, handleCityChange} =
        useHomePage();

    const navigation = useNavigation<NavigationProp<NavigationStackList>>();

    const renderExcursion = ({item}: {item: ProductType}) => (
        <CardExcursionByCategory item={item} navigation={navigation} />
    );

    const renderSubCategory = ({item}: {item: SubCategoryType}) => (
        <View style={styles.subCategoryContainer}>
            {item.products.length > 0 && (
                <CustomText
                    weight={TextWeight.BOLD}
                    size={TextSize.S_XL}
                    style={styles.subCategoryTitle}>
                    {item.name}
                </CustomText>
            )}
            <FlatList
                data={item.products}
                renderItem={renderExcursion}
                keyExtractor={product => product.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
            />
        </View>
    );

    const renderCategory = ({item}: {item: CategoryType}) => (
        <FlatList
            data={item.sub_categories}
            renderItem={renderSubCategory}
            keyExtractor={subCategory => subCategory.id.toString()}
        />
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <SplashScreen
                    showLogotype={false}
                    titleIndicator="Получаем информацию по категориям..."
                />
            </View>
        );
    }

    if (error) {
        return <ErrorText title="Ошибка" description={error} />;
    }

    return (
        <ScreenContent>
            <View>
                <View style={styles.filterContent}>
                    <SearchFilterComponent
                        title="Выберите город"
                        itemsList={cities}
                        selectedFilterItem={selectedCity}
                        onSelectionChange={handleCityChange as any}
                        hasDropdownList={true}
                    />
                </View>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(category, index) => index.toString()}
                    contentContainerStyle={styles.flatlistContent}
                />
            </View>
        </ScreenContent>
    );
};
