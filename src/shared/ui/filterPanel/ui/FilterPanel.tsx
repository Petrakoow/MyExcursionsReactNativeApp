import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import {CustomText} from '@/shared/ui/customText';
import { TextSize, TextWeight } from '@/shared/config/font';
import { CustomInput } from '../../customInput';
import { styles } from './FilterPanelStyle';
type FilterPanelType = {
    children: ReactNode;
};

export const FilterPanel = (props: FilterPanelType) => {
    const {children} = props;
    return <View>{children}</View>;
};

type SearchFilterComponentType = {
    title?: string;
};

FilterPanel.SearchFilterComponent = (props: SearchFilterComponentType) => {
    const {title} = props;
    return (
        <View>
            {title && (
                <View>
                    <CustomText weight={TextWeight.BOLD} size={TextSize.S_XL}>{title}</CustomText>
                </View>
            )}
            <CustomInput style={styles.input}/>
        </View>
    );
};

// export const BottomPanel = (props: BottomPanelType) => {
//     const {children} = props;
//     return <View style={styles.bottomPanel}>{children}</View>;
// };

// BottomPanel.Button = (props: BottomPanelButtonType) => {
//     const {title, Icon, color = Colors.white, ...res} = props;
//     return (
//         <TouchableOpacity {...res}>
//             <View style={styles.bottomPanelButtonContainer}>
//                 {Icon && (
//                     <Icon width={ICON_SIZE} height={ICON_SIZE} fill={color} />
//                 )}
//                 {title && (
//                     <CustomText style={[{color: color}]} numberOfLines={1}>
//                         {title}
//                     </CustomText>
//                 )}
//             </View>
//         </TouchableOpacity>
//     );
// };
