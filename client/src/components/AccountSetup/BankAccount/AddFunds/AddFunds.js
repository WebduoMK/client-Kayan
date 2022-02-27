import React from "react";
import { Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// TABS
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import Textfield from "./../../../FormsUI/Textfield/index";
import { Button } from "@mui/material";
// const INITIAL_FORM_STATE = {
//   roth: "",
//   traditional: "",
// };

const Tab = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #a8dcc5;
  }

  &:focus {
    color: #fff;
    border-radius: 10;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #53b88c;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: transparetn;
  border-radius: 25px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const AddFunds = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  const FORM_VALIDATION = Yup.object().shape({
    roth: Yup.number(),
    traditional: Yup.number(),
  });
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10} md={8}>
        <Formik
          initialValues={props.data}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
                Roth IRA
              </Typography>
              <Textfield name="roth" placeholder="Amount in USD" />
              <Typography
                variant="h3"
                sx={{ marginBottom: "1rem", marginTop: "3rem" }}
              >
                Traditional IRA
              </Typography>
              <Textfield name="traditional" placeholder="Amount in USD" />

              {/* <TabsUnstyled defaultValue={0}>
                <TabsList></TabsList>
                <TabPanel value={0}></TabPanel>
                <TabPanel value={1}></TabPanel>
              </TabsUnstyled> */}

              <Grid item xs={12} sx={{ marginTop: "7rem", textAlign: "right" }}>
                <Button
                  href="/"
                  variant="outlined"
                  sx={{
                    marginRight: { xs: "0", lg: "1rem" },
                    marginTop: { xs: "2rem", sm: "0" },
                  }}
                >
                  Skip For Now
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    marginLeft: "1rem",
                    marginTop: { xs: "2rem", sm: "0" },
                  }}
                >
                  Deposit
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddFunds;
