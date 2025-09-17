import * as React from 'react';
import { styled } from '@mui/system';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ContentAccordion from "./ContentAccordion";
import PropTypes from "prop-types";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Index(props) {
    const { items, onChangeValue,funcionalidadSistema,onChangeItem } = props;

  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChanges = (event) => {
    onChangeValue(event)
  };
  React.useEffect(() => {
  }, [funcionalidadSistema]);
  return (
    <div>
      {items.map((res, index) => {
        return (
          <Accordion key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
            <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
              <Typography key={index}>{res.data().Nombre}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ContentAccordion idFuncion={res.id} funcionalidadSistema={funcionalidadSistema} onChangeValue={handleChanges} onChangeItem={onChangeItem}/>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
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