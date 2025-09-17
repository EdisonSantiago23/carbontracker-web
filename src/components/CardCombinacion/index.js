import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Card } from '@mui/material';

export default function Index(props) {
  const {
    numero,
  } = props;
  const [color, setColor] = React.useState('#fff');

  React.useEffect(() => {
    if(numero<=1){
      setColor('#83CADD');
    }
    if(numero>1 ){
      setColor('#FFF');
    }
  
  }, [numero]);
  return (
    <Card style={{
      backgroundColor :'red',
      width: 50,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    }}>
      <Typography component={'span'}  variant="h6" style={{color:numero>1? '#000':'#fff',backgroundColor :color}}>
        {numero}
      </Typography>
    </Card>

  );
}

Index.propTypes = {
  numero: PropTypes.number,

};
