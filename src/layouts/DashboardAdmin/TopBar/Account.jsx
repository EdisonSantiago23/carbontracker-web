import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Avatar, Box, ButtonBase, Hidden, Menu, MenuItem, Typography } from "@mui/material";
import useAuth from "../../../contextapi/hooks/useAuth";

const Account = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate("/"); // reemplaza history.push("/")
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Unable to logout", { variant: "error" });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="User"
          src={user?.avatar}
          sx={{ height: 32, width: 32, mr: 1 }}
        />
        <Hidden smDown>
          <Typography variant="h6" sx={{ color: "#ffffff" }}>
            {user?.Nombre}
          </Typography>
        </Hidden>
      </Box>

      <Menu
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        keepMounted
        anchorEl={ref.current}
        open={isOpen}
        PaperProps={{ sx: { width: 200 } }}
      >
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
