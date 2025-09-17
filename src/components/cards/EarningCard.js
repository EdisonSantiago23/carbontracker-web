import PropTypes from 'prop-types';

import { Avatar, Box, Grid, Typography, styled, useTheme } from '@mui/material';

// project imports
import SkeletonEarningCard from './Skeleton/EarningCard';
import {ReportOff,DoneOutline} from '@material-ui/icons';




// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, titulo, }) => {

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <Box border={true} content={true} backgroundColor={titulo==="Compatible"?'#ABFC8C':titulo==="Incompatibles"?'#FC8C8C':'#FCE48C  '} color={titulo==="Compatible"?'#00FF3A':titulo==="Incompatibles"?'#FF0000':'#FFC900'}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">

                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography component={'span'} sx={{color:'#000', fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {titulo}
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography component={'span'}
                                    sx={{fontSize: '1rem',color:'#000',fontWeight: 500}}
                                >
                                    Resultado de la combinación
                                </Typography>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography component={'span'}
                                    sx={{fontSize: '1rem',color:'#000',fontWeight: 500}}
                                >
                                </Typography>
                            </Grid>
                        
                        </Grid>
                        <Grid item  alignItems="center">
                              
                            {titulo==="Compatible"? <DoneOutline style={{ fontSize: 190 }} /> :<ReportOff style={{ fontSize: 190 }} /> }  
                      </Grid>
                    </Box>
                </Box>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool,
    titulo: PropTypes.string,
    tipo:PropTypes.string,
};

export default EarningCard;
