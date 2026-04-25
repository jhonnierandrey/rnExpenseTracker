import { StyleSheet, View } from "react-native";

import { AppTheme } from "../constants/theme";

type Props = {
  percentage: number;
  theme: AppTheme;
};

export function ProgressBar({ percentage, theme }: Props) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={[styles.track, { backgroundColor: theme.progressTrack }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${safePercentage}%`,
            backgroundColor: theme.primary,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
