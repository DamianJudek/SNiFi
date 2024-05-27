import Slide, { SlideProps } from "@mui/material/Slide";
import { AlertProps } from "./Alert.interface";
import { StyledSnackbar, StyledAlert } from "./Alert.styled";

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export const Alert = ({
  open,
  handleClose,
  message,
  severity,
  vertical,
  horizontal,
  duration,
}: AlertProps) => {
  return (
    <StyledSnackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={duration}
      anchorOrigin={{ vertical, horizontal }}
      TransitionComponent={SlideTransition}
    >
      <StyledAlert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </StyledAlert>
    </StyledSnackbar>
  );
};

export default Alert;
