import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------
// component
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------


NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }} style={{ alignContent: "center", flex: 1, width: "100%" }}>
        {data.map((item,index) => (
          <NavItem key={index.toString()} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { Title, Path, Icon } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={Path}
      sx={{
        '&.active': {
          backgroundColor: 'action.selected',
          fontWeight: 'fontWeightBold',
          color:"#fff",
        }
      }}
    >
      <StyledNavItemIcon >
      <Iconify icon={Icon} sx={{ width: 1, height: 1,}}  />
        </StyledNavItemIcon>

      <ListItemText disableTypography primary={Title} />

    </StyledNavItem>
  );
}
