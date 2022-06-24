import React, { useState, useEffect } from "react";

import {
  TextField,
  Paper,
  Button,
  makeStyles,
  Drawer,
} from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useFormik,
} from "Formik";
import * as yup from "yup";

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: "10px",
    },
  },
  cotainer: {
    margin: "20px 0px",
    //padding:'10px'
  },
  innerForm: {
    padding: "20px",
  },
  fieldGap: {
    margin: "5px 0px",
  },
});

const Create = (props: any) => {
  const [state, setState] = React.useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setState(props.open);
  }, [props.open]);
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    time: yup.string().required("Published yea ris reuired is required"),
    description: yup.string().required("Published time is required"),
    status: yup.string().required("Status field is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      time: "",
      description: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values: any) => {
    setProgress(true);
    if (values.title != "" && values.time != "" && values.description != "") {
      formik.resetForm();

      // bookCreate(values)
      setProgress(false);
      props.AddAgenda(values);
      props.onClose();
    }
  };

  const classes = useStyles();
  return (
    <Drawer
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
    >
      <div>
        <div className={classes.cotainer}>
          <Paper className={classes.innerForm} elevation={3}>
            <h1>Add an Agenda</h1>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                className={classes.fieldGap}
                fullWidth
              />

              <TextField
                value={formik.values.time}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={formik.handleChange}
                type="datetime-local"
                error={formik.touched.time && Boolean(formik.errors.time)}
                helperText={formik.touched.time && formik.errors.time}
                className={classes.fieldGap}
                id="time"
                name="time"
                placeholder="time"
                label="Date & Time"
                variant="outlined"
                fullWidth
              />

              <TextField
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                className={classes.fieldGap}
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
              />

              <TextField
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
                className={classes.fieldGap}
                id="status"
                name="status"
                label="Status"
                variant="outlined"
                fullWidth
              />
              {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" variant="outlined" placeholder="First Name" /> */}
              <Button variant="contained" color="primary" type="submit">
                {!progress ? <p>Submit</p> : <CircularProgress />}
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    </Drawer>
  );
};

export default Create;
