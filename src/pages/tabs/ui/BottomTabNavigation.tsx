import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabBarIcon} from './TabBarIcon';
import {screenOptions} from './BottomTabNavigationStyle';
import {getEnumTranslation} from '@/shared/config/navigation';
import {filterScreensByRole} from '../utils/filterScreensByRole';
import {palette} from '@/shared/config/colors';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
    const filteredScreens = filterScreensByRole();

    return (
        <Tab.Navigator screenOptions={{...screenOptions}}>
            {filteredScreens.map(({name, component, Icon}) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        title: getEnumTranslation(name),
                        headerTransparent: true,
                        headerTitle: '',
                        tabBarIcon: ({focused}) =>
                            TabBarIcon({
                                colorFocus: palette.light.primary,
                                colorUnfocus: palette.light.textPrimary,
                                focused: focused,
                                Icon: Icon,
                            }),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};
