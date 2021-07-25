import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function MaterialCheckbox(props) {
  const GreenCheckbox = withStyles({
    root: {
      color: props.color,
      "&$checked": {
        color: props.color,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const [state, setState] = React.useState({
    checkedG: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControlLabel
      control={
        <GreenCheckbox
          checked={state.checkedG}
          onChange={handleChange}
          onClick={props.functions.bind(this, props.color)}
          name="checkedG"
        />
      }
    />
  );
}
