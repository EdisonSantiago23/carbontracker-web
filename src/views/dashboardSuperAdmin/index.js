import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import Page from "../../components/Common/Page";

const index = () => {
  console.log('indexindexindex');
  return <Page title="IOT">
      <Container maxWidth="lg">
        <center>
          <h1>BIENVENIDO</h1>
        </center>
       
      </Container>
    </Page>;
};

index.propTypes = {
  children: PropTypes.node
};
export default index;