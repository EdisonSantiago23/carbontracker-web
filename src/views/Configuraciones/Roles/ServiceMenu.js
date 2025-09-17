import * as React from 'react';
import ContentSelect from "./ContentSelect";
import PropTypes from "prop-types";
import {
  Box,Typography
} from '@mui/material';


export default function Index(props) {
  const { items, onChangeValue } = props;



  const handleChanges = (event) => {
    onChangeValue(event)
  };
  React.useEffect(() => {
  }, []);
  return (
    <Box >
      <Typography >{'Menú'}</Typography>

      {items.map((menu, index) => {
        return (
          <ContentSelect menu={menu} onChangeValue={handleChanges} />

        );
      })}
    </Box>
  );
}
Index.propTypes = {
  className: PropTypes.string,
  onChangeValue: PropTypes.func,
  onChangeItem: PropTypes.func,

};
Index.defaultProps = {
  className: '',
  onChangeValue: () => {
  },
  onChangeItem: () => {
  },

};