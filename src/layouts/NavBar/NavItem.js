import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Button,
    Collapse,
    ListItem,
} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { ListItemText } from '@mui/material';


const NavItem = ({
    children,
    className,
    depth,
    href,
    icon: Icon,
    info: Info,
    open: openProp,
    title,
    ...rest
}) => {
    const [open, setOpen] = useState(openProp);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    let paddingLeft = 4;

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth;
    }

    const style = { paddingLeft,color:"#fff" };

    if (children) {
        return (
            <ListItem sx={{
                display: "block",
                paddingTop: 0,
                paddingBottom: 0,
            }} disableGutters key={title} {...rest} >
                <Button sx={{
                    color: "#ffffff",
                    padding: "10px 8px",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    letterSpacing: 0,
                    width: "90%",
                }} onClick={handleToggle} style={style} >
                    {Icon && (<Icon  size="20" />)}
                    <ListItemText disableTypography primary={title} />

                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>
                <Collapse in={open}>
                    {children}
                </Collapse>
            </ListItem>
        );
    }

    return (
        <ListItem sx={{
            display: "block",
            paddingTop: 0,
            paddingBottom: 0,
        }} disableGutters key={title} {...rest} >
            <Button   component={RouterLink} exact style={style} to={href} >
                <ListItemText disableTypography primary={title} />
            </Button>
        </ListItem>
    );
};

NavItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    depth: PropTypes.number.isRequired,
    href: PropTypes.string,
    icon: PropTypes.elementType,
    info: PropTypes.elementType,
    open: PropTypes.bool,
    title: PropTypes.string.isRequired
};

NavItem.defaultProps = {
    open: false
};

export default NavItem;
