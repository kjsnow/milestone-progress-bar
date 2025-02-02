import * as React from "react";
import { StyleSheet, View } from "react-native";
import Milestone from "./Milestone";
import MilestoneStyleProps from "./Milestone";
import DEFAULT_MILESTONE_STYLE from "./Milestone";
import ProgressBar from "./ProgressBar";
import ProgressBarStyleProps from "./ProgressBar";
import DEFAULT_PROGRESS_BAR_STYLE from "./ProgressBar";
import ProgressText from "./ProgressText";

interface Progress {
  completed: number;
  total: number;
}

interface MilestoneProgressBarProps {
  totalMilestones: number;
  progress: Progress[];
  milestoneStyleProps?: MilestoneStyleProps;
  progressBarStyleProps?: ProgressBarStyleProps;
  progressTextColor?: string;
  containerBackgroundcolor?: string;
}

const progressBar = (
  completed: number,
  total: number,
  index: number,
  nextStepStarted: boolean,
  progressBarStyleProps: ProgressBarStyleProps,
): React.ReactElement => {
  let completePercentage = (completed * 100) / total;
  let completePercentageString = `${completePercentage}%`;
  let progressBarStyle = "blank";
  var progress: any[] = new Array();
  if (index === 0 && completed > 0) {
    if (nextStepStarted) progressBarStyle = "leftCurved";
    else progressBarStyle = "default";
  } else if (completed > 0) {
    if (nextStepStarted) progressBarStyle = "flat";
    else progressBarStyle = "rightCurved";
  }
  return (
    <ProgressBar
      type={progressBarStyle}
      key={`0-${index}`}
      percentage={completePercentageString}
      styleProps={progressBarStyleProps}
    />
  );
};

const generateProgressBar = (
  args: MilestoneProgressBarProps
): React.ReactElement[] => {
  const {
    totalMilestones,
    progress,
    milestoneStyleProps = DEFAULT_MILESTONE_STYLE,
    progressBarStyleProps = DEFAULT_PROGRESS_BAR_STYLE
   } = args;
  return progress.map((step, index) => {
    var nextStepStarted = true;
    if (index === totalMilestones - 1 || progress[index + 1].completed === 0) {
      nextStepStarted = false;
    }
    return (
      <View
        style={{ flex: 1, flexDirection: "row" }}
        key={`ProgressBar${index}`}
      >
        {progressBar(step.completed, step.total, index, nextStepStarted, progressBarStyleProps)}
        {index === totalMilestones - 1 ? (
          <></>
        ) : (
          <Milestone
            status={step.completed == step.total ? "complete" : "incomplete"}
            styleProps={milestoneStyleProps}
          />
        )}
      </View>
    );
  });
};

function MilestoneProgressBar(
  props: MilestoneProgressBarProps
): React.ReactElement {
  const { totalMilestones, progress, progressTextColor, containerBackgroundcolor } = props;
  return (
    <View style={styles().tripProgressBarContainer}>
      <View style={styles(containerBackgroundcolor).progressBarContainer}>
        {generateProgressBar(props)}
      </View>
      <ProgressText totalMilestones={totalMilestones} progress={progress} textColor={progressTextColor} />
    </View>
  );
}

const styles = (progressBarContainerBackgroundColor: string = "#EDEDEF") => StyleSheet.create({
  progressBarContainer: {
    backgroundColor: {progressBarContainerBackgroundColor},
    height: 15,
    flexDirection: "row",
    borderRadius: 10.5,
    flex: 10,
  },
  tripProgressBarContainer: {
    flexDirection: "row",
    margin: 5,
  },
});

export default MilestoneProgressBar;
