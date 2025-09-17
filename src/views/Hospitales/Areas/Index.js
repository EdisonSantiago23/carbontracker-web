import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import Header from "./Header";
import { Container } from "../../../components";
import useAuth from "../../../contextapi/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const { threadKey } = useParams();

  return (
    <Container loading={false} titulo={"Administración"}>
      <Box mt={2}>
        <Header IdHospital={threadKey ? threadKey : user.IdHospital} />
      </Box>
      <Box mt={2}>
        <TabPanel IdHospital={threadKey ? threadKey : user.IdHospital} />
      </Box>
    </Container>
  );
};
export default Index;
