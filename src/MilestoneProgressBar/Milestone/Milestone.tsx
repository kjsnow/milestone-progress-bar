import * as React from "react";
import { StyleSheet, View } from "react-native";

export interface MilestoneStyleProps {
  incompleteBackgroundColor: string;
  completeBackgroundColor: string;
}

interface MilestoneProps {
  status: string;
  styleProps: MilestoneStyleProps;
}

export const DEFAULT_MILESTONE_STYLE = {
  incompleteBackgroundColor: "#B5B5B6",
  completeBackgroundColor: "#EDEDEF",
}

export function Milestone({status, styleProps = DEFAULT_MILESTONE_STYLE}: MilestoneProps): React.ReactElement {
  const appliedStyles = styles(styleProps.incompleteBackgroundColor, styleProps.completeBackgroundColor)
  return (
    <View
      style={ status === "complete" ? appliedStyles.completeStep : appliedStyles.incompleteStep }
    ></View>
  );
}

const styles = (incompleteBackgroundColor: string = "#B5B5B6", completeBackgroundColor: string = "#EDEDEF") => StyleSheet.create({
  incompleteStep: {
    backgroundColor: {incompleteBackgroundColor},
    height: 8,
    width: 8,
    borderRadius: 4,
    position: "absolute",
    alignSelf: "center",
    right: 3,
  },
  completeStep: {
    backgroundColor: {completeBackgroundColor},
    height: 8,
    width: 8,
    borderRadius: 4,
    position: "absolute",
    alignSelf: "center",
    right: 3,
  },
});
