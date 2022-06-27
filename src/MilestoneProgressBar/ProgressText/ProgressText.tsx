import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

interface Progress {
  completed: number;
  total: number;
}

interface ProgressTextProps {
  totalMilestones: number;
  progress: Progress[];
  textColor?: string;
}

const getTextFromProgress = (args: ProgressTextProps): string => {
  const { totalMilestones, progress } = args;
  var completedSteps = progress.reduce((pv, cv) => {
    return pv + (cv.completed === cv.total ? 1 : 0);
  }, 0);
  return `${completedSteps}/${totalMilestones}`;
};

function ProgressText(props: ProgressTextProps): React.ReactElement {
  return (
    <View style={styles(props.textColor).container}>
      <Text style={styles(props.textColor).text}>{getTextFromProgress(props)}</Text>
    </View>
  );
}

const styles = (textColor: string = "#B5B5B6") => StyleSheet.create({
  text: {
    color: {textColor},
    fontFamily: "Celias-Bold",
    fontSize: 12,
    lineHeight: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProgressText;
