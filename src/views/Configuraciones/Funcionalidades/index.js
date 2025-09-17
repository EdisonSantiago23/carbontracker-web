import React from "react";
import { Box, Grid} from '@mui/material';
import New from "./New/New";
import { Container } from "../../../components";
import TabPanel from "./TabPanel";


const Index = () => {
  return (
    <Container loading={false}>
      <Grid item xs={12} sm={4}>
        <New />
      </Grid>
      <Box mt={2}>
        <TabPanel />
      </Box>
    </Container>
  );
};
export default Index;
