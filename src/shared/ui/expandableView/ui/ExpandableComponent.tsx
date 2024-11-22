import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

type ExpandableComponentProps = {
    title: string;
    Icon?: React.ReactNode;
    children: React.ReactNode;
};

export const ExpandableComponent = ({title, Icon, children}: ExpandableComponentProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => setExpanded((prev) => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpansion} style={styles.header}>
                {Icon && <View style={styles.icon}>{Icon}</View>}
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            {expanded && <View style={styles.dropdown}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: moderateScale(10),
        backgroundColor: '#fff',
        borderRadius: moderateScale(8),
        overflow: 'hidden',
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(15),
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    icon: {
        marginRight: moderateScale(10),
    },
    dropdown: {
        padding: moderateScale(10),
        backgroundColor: '#fafafa',
    },
});
