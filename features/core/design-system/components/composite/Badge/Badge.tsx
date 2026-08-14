import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ImageSourcePropType } from 'react-native';
import { View } from 'react-native';
import { CustomIcon } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { CustomImage } from '@/features/core/design-system/components/basic/CustomImage/CustomImage';
import { CustomText } from '@/features/core/design-system/components/basic/CustomText/CustomText';
import { styles as badgeStyle } from '@/features/core/design-system/components/composite/Badge/Badge.style';
import { colors } from '@/features/core/design-system/style/colors';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { icons } from '@/features/core/design-system/style/icons';

type BadgeProps = {
  label: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  active: boolean;
};

export const Badge: FC<BadgeProps> = ({ label, image, backgroundColor, active }) => {
  const { t } = useTranslation();
  const styles = badgeStyle(active, backgroundColor);

  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <View style={styles.circle}>
          <CustomImage source={image} style={styles.badgeImage} accessibilityLabel={t(label)} />
        </View>
        <View style={styles.checkBadge}>
          <CustomIcon
            name={active ? icons.success : icons.closeCircle}
            size={spacing.TripleAndHalf}
            color={active ? colors.lime700 : colors.red500}
          />
        </View>
      </View>
      <CustomText text={label.toLocaleUpperCase()} style={styles.label} />
    </View>
  );
};
