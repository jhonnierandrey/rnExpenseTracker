import React from 'react';
import {View} from 'react-native';
import {Icon} from '@rneui/themed';
import {APP_ICONS} from '../constants';

type IconContainerProps = {
  name: string;
};

const IconContainer = ({name}: IconContainerProps) => {
  return (
    <View>
      <Icon
        reverse
        name={APP_ICONS[name as keyof typeof APP_ICONS].icon}
        type="material-community"
        color={APP_ICONS[name as keyof typeof APP_ICONS].color}
        size={30}
      />
    </View>
  );
};

export default IconContainer;
