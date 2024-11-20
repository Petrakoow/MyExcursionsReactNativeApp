import React, {createContext, useContext, useState, ReactNode} from 'react';
import {ToggleButtonType} from '../type/toggleButtonType';
import {ToggleButton} from '../ui/ToggleButton';
import { GestureResponderEvent } from 'react-native';

type ToggleButtonGroupContextType =
    | {
          activeButton: string | undefined;
          onToggle: (name: string, group: string) => void;
          group: string;
      }
    | undefined;

const ToggleButtonGroupContext =
    createContext<ToggleButtonGroupContextType>(undefined);

type ToggleButtonGroupProps = {
    children: ReactNode;
    group: string;
    state: string | undefined;
};

export const ToggleButtonGroup = (props: ToggleButtonGroupProps) => {
    const {children, group, state} = props;
    const [activeButton, setActiveButton] = useState<string | undefined>(state);

    const onToggle = (name: string, buttonGroup: string) => {
        if (buttonGroup === group) {
            setActiveButton(name);
        }
    };

    return (
        <ToggleButtonGroupContext.Provider
            value={{activeButton, onToggle, group}}>
            {children}
        </ToggleButtonGroupContext.Provider>
    );
};

export const useToggleButtonGroup = () => {
    const context = useContext(ToggleButtonGroupContext);
    if (!context) {
        throw new Error(
            'useToggleButtonGroup must be used within a ToggleButtonGroup',
        );
    }
    return context;
};

type ToggleButtonContextWrapperType = ToggleButtonType & {
    name: string;
};

ToggleButtonGroup.ToggleButtonContextWrapper = (
    props: ToggleButtonContextWrapperType,
) => {
    const {name, onPress, ...res} = props;
    const {activeButton, onToggle, group} = useToggleButtonGroup();

    const handlePress = (event: GestureResponderEvent) => {
        onToggle(name, group);

        if (onPress) onPress(event);
    };

    return (
        <ToggleButton
            {...res}
            isActive={activeButton === name}
            onPress={handlePress}
        />
    );
};