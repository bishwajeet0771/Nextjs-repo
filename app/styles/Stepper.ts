import { rem } from "@mantine/core";

export const step = {
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "5px",
};

export const styles = {
  steps: {
    marginBottom: "5%",
  },

  step: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "5px",
  },

  stepIcon: {
    borderWidth: 4,
  },

  separator: {
    marginLeft: rem(-2),
    marginRight: rem(-2),
    height: rem(0.5),
    border: "1px dashed green",
    width: "100%",
    position: "relative",
    bottom: "13px",
  },
};
