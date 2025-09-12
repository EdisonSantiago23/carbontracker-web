import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Collapse, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const NavItem = ({
  children,
  depth = 0,
  href,
  icon: Icon,
  info: Info,
  open: openProp = false,
  title
}) => {
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const paddingLeft = depth > 0 ? 32 + 8 * depth : 8;

  const buttonStyles = {
    color: '#ffffff',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    padding: '10px 8px',
    pl: paddingLeft
  };

  const buttonLeafStyles = {
    ...buttonStyles,
    fontWeight: '400'
  };

  if (children) {
    return (
      <ListItem disableGutters>
        <Button onClick={handleToggle} sx={buttonStyles} startIcon={Icon ? <Icon /> : null} endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {title}
        </Button>
        <Collapse in={open}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem disableGutters>
      <Button
        component={RouterLink}
        to={href}
        sx={buttonLeafStyles}
        startIcon={Icon ? <Icon /> : null}
      >
        {title}
        {Info && <Info />}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export default NavItem;
