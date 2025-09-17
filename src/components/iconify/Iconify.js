import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, IconButton, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, tooltip, link, onClick, width = 20, sx, ...other }, ref) => (
  <Tooltip title={tooltip}>
    {link ? <Link to={link}>
      <IconButton aria-label={tooltip} onClick={onClick}>
        <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
      </IconButton>
    </Link> :
      <IconButton aria-label={tooltip} onClick={onClick}>
        <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
      </IconButton>}
  </Tooltip>
));

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  tooltip: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  link: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),



};

export default Iconify;
