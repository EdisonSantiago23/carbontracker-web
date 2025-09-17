import React, { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  IconButton,
  MenuItem,
  Typography,
  Select,
  Popover
} from '@mui/material';
import useAuth from "../../contextapi/hooks/useAuth";
import { AreaService } from "@services";
import Img from "../../assets/img/c18.png";
import { alpha } from '@mui/material/styles';

const Account = () => {
  const {
    user,
    logout,
    IdArea,
    selectArea,
  } = useAuth();
  const IdHospital = user.IdHospital;
  const rol = user?.Rol;
  const [areas, setAreas] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const spanRef = React.useRef();

  const handleOpen = () => {
    setAnchorEl(spanRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null)

  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
    } catch (err) {
      enqueueSnackbar("Unable to logout", {
        variant: "error",
      });
    }
  };

  const getAreasByIdHospital = React.useCallback(() => {
    AreaService.getAreaById(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setAreas(Items);
        },
      },
      IdHospital
    );
  }, [IdHospital]);
  React.useEffect(() => {
    if (rol.areaMonitoreo) {
      getAreasByIdHospital();
    }
  }, [getAreasByIdHospital, rol.areaMonitoreo, IdHospital]);

  const changeArea = async (e) => {
    const estado = areas.find((x) => x.id === e.target.value);

    await selectArea(estado);
  };

  return (
    <>
      <IconButton
        ref={spanRef}
        onClick={handleOpen}

        sx={{
          p: 0,
          ...(isOpen && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={Img} alt="photoURL" />
      </IconButton>


      <Popover
        open={Boolean(isOpen)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.Nombre}{" "} {user.Apellido}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {rol.Nombre}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {areas.length > 0 && (
            <Box alignItems="center" p={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={IdArea}
                label="Age"
                style={{ width: 150 }}
                onChange={(e) => changeArea(e)}
              >
                {areas.map((row, index) => {
                  return (
                    <MenuItem
                      value={row.id}
                      sx={{ typography: 'body2' }}
                      key={index.toString()}>
                      {row.data().Nombre}
                    </MenuItem>
                  );
                })}
              </Select>


            </Box>
          )}

        </Stack>

        <MenuItem disableRipple onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Popover>
    </>
  );
};

export default Account;
