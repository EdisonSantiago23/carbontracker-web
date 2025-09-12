import React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";

export default function CustomArrayChips({ data }) {
  const [chipData, setChipData] = React.useState(data || []);

  const handleDelete = (chipToDelete) => () => {
    setChipData(chips => chips.filter(chip => chip !== chipToDelete));
  };

  return (
    <Paper
      component="ul"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0
      }}
    >
      {chipData.map((chip, index) => (
        <li key={index}>
          <Chip
            label={chip}
            onDelete={handleDelete(chip)}
            sx={{ m: 0.5 }}
          />
        </li>
      ))}
    </Paper>
  );
}

CustomArrayChips.propTypes = {
  data: PropTypes.array
};
