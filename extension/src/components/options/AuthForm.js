import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";

const styles = (theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class AuthForm extends React.Component {
  renderError = ({ touched, invalid, error }) => {
    if (touched && invalid) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      variant="outlined"
      margin="normal"
      fullWidth
      {...input}
      {...custom}
    />
  );

  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={classes.form}
      >
        <Field
          name="username"
          component={this.renderTextField}
          type="text"
          label="Username"
        />
        <Field
          name="password"
          component={this.renderTextField}
          type="password"
          label="Password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

const form = reduxForm({ form: "AuthForm", validate })(AuthForm);
export default withStyles(styles)(form);
