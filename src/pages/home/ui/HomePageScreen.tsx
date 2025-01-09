import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
} from '@/shared/config/dimensions';
import { fetchCategories } from '@/entities/api';
import { CategoryType } from '@/shared/api';
import { ProductType, SubCategoryType } from '@/shared/api/sputnik8/requestType/categoriesTypeRequest';

export const HomePage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories(1); // Replace 1 with the desired city ID
                setCategories(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const renderProduct = ({item}: {item: ProductType}) => (
        <TouchableOpacity
            onPress={() =>
                Alert.alert('Excursion Selected', `You selected: ${item.name}`)
            }>
            <Text style={styles.product}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderSubCategory = ({item}: {item: SubCategoryType}) => (
        <View style={styles.subCategoryContainer}>
            <Text style={styles.subCategoryTitle}>{item.name}</Text>
            <Text style={styles.subCategoryDescription}>{item.description}</Text>
            <FlatList
                data={item.products}
                renderItem={renderProduct}
                keyExtractor={product => product.id.toString()}
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
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScreenContent>
            <View style={styles.content}>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(category, index) => index.toString()}
                />
            </View>
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subCategoryContainer: {
        marginBottom: 16,
    },
    subCategoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subCategoryDescription: {
        fontSize: 14,
        marginBottom: 8,
    },
    product: {
        fontSize: 16,
        paddingVertical: 4,
    },
});
