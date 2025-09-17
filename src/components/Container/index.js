import PropTypes from "prop-types";
import {LoadingScreen} from "@components";
import { Helmet } from 'react-helmet';
import {
  Container,
  Typography, Stack
} from '@mui/material';
export default function Index({ loading, component, children, titulo }) {

  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>{titulo}</title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {titulo}
        </Typography>
        {component}
      </Stack>
      {loading ? <LoadingScreen /> : children}
    </Container>
  );
}

Index.propTypes = {
  children: PropTypes.node,
  component: PropTypes.node,
  loading: PropTypes.bool,
};
