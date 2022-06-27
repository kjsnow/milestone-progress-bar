import * as React from "react";
import { StyleSheet, View } from "react-native";

export interface ProgressBarStyleProps {
  defaultBackgroundColor: string;
  leftCurvedProgressBar: string;
  flatProgressBar: string;
  rightCurvedProgressBar: string;
  blankProgressBar: string;
}

interface ProgressBarProps {
  type: string;
  key: string;
  percentage: string;
  styleProps?: ProgressBarStyleProps;
}

export const DEFAULT_PROGRESS_BAR_STYLE = {
  defaultBackgroundColor: "#B5B5B6",
  leftCurvedProgressBar: "#B5B5B6",
  flatProgressBar: "#B5B5B6",
  rightCurvedProgressBar: "#B5B5B6",
  blankProgressBar: "#EDEDEF",
}

const getStyleFromType = (type: string, styleProps: ProgressBarStyleProps): object => {
  if (type === "flat") return styles(styleProps.flatProgressBar).flatProgressBar;
  else if (type === "leftCurved") return styles(styleProps.leftCurvedProgressBar).leftCurvedProgressBar;
  else if (type === "rightCurved") return styles(styleProps.rightCurvedProgressBar).rightCurvedProgressBar;
  else if (type === "default") return styles(styleProps.defaultBackgroundColor).defaultProgressBar;
  return styles(styleProps.blankProgressBar).blankProgressBar;
};

export function ProgressBar({type, percentage, styleProps = DEFAULT_PROGRESS_BAR_STYLE}: ProgressBarProps): React.ReactElement {
  return (
    <View style={[getStyleFromType(type, styleProps), { width: percentage }]}></View>
  );
}

const styles = (backgroundColor: string) => StyleSheet.create({
  defaultProgressBar: {
    backgroundColor: {backgroundColor},
    height: 15,
    borderRadius: 10.5,
  },
  leftCurvedProgressBar: {
    backgroundColor: {backgroundColor},
    height: 15,
    borderTopLeftRadius: 10.5,
    borderBottomLeftRadius: 10.5,
  },
  flatProgressBar: {
    backgroundColor: {backgroundColor},
    height: 15,
  },
  rightCurvedProgressBar: {
    backgroundColor: {backgroundColor},
    height: 15,
    borderTopRightRadius: 10.5,
    borderBottomRightRadius: 10.5,
  },
  blankProgressBar: {
    backgroundColor: {backgroundColor},
    height: 15,
    borderRadius: 10.5,
  },
});
