import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Popover,
  Badge,
  Tooltip,
  Typography
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/MonetizationOn";
import BuildIcon from "@mui/icons-material/Build";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications"; // reemplazo de BellIcon

import useSettings from "../../../contextapi/hooks/useSettings";
import * as FirestoreService from "./services/firestore";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [transf, setTransf] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [reparaciones, setReparaciones] = useState([]);
  const [count, setCount] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const { settings } = useSettings();
  const ref = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getConjuntoById = useCallback(() => {
    try {
      FirestoreService.getUserByConjunto(
        {
          next: (querySnapshot) => {
            const Itemss = querySnapshot.docs.map((doc) => doc);
            let notiaux = [];
            setNotifications([]);
            Itemss.forEach((element) => {
              try {
                FirestoreService.getPedidos(
                  {
                    next: (querySnapshots) => {
                      const Items = querySnapshots.docs.map((doc) => doc);
                      if (Items.length > 0) {
                        Items.forEach((si) => {
                          notiaux.push({
                            proveedorId: element.id,
                            nombreproveedor: element.data().Nombre,
                            costo: si.data().Costo
                          });
                        });
                      }
                    }
                  },
                  settings.idConjunto,
                  element.id
                );
              } catch (e) {}
            });
            setNotifications(notiaux);
          }
        },
        settings.idConjunto
      );

      setTransf(FirestoreService.getTransfPendientes(settings.idConjunto));
      setPagos(FirestoreService.getCuentasPagar(settings.idConjunto));
      setReparaciones(FirestoreService.getReportes(settings.idConjunto));

      if (transf.length === 0 && pagos.length === 0 && reparaciones.length === 0)
        setCount("!");
    } catch (e) {}
  }, [settings.idConjunto, transf.length, pagos.length, reparaciones.length]);

  useEffect(() => {
    getConjuntoById();
  }, [getConjuntoById]);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={ref} onClick={handleOpen}>
          <Badge
            badgeContent={count}
            color="error"
            sx={{ "& .MuiBadge-badge": { backgroundColor: "#fff", color: "#000" } }}
          >
            <NotificationsIcon color="primary" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        PaperProps={{ sx: { width: 320, maxHeight: 400, overflowY: "auto" } }}
      >
        <Box p={2}>
          <Typography variant="h6">Notificaciones</Typography>
        </Box>

        {count === 0 ? (
          <Box p={2} display="flex" justifyContent="center">
            <Typography>No tienes notificaciones</Typography>
          </Box>
        ) : (
          <List disablePadding>
            <SectionList title="Transferencias pendientes" icon={CreditCardIcon}>
              {transf.length > 0 ? (
                <List disablePadding>
                  {transf.map((item, ind) => (
                    <ListItem
                      component={RouterLink}
                      divider
                      key={ind}
                      to="/administrador/transferenciasporaprobar"
                    >
                      <ListItemText
                        primary={`Ha recibido una transferencia con el valor de: ${item.Valor}$ cubriendo ${item.Deudas} deuda(s)`}
                        primaryTypographyProps={{ variant: "subtitle2" }}
                        secondary={`razón de pago: ${item.Detalle}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box p={2} display="flex" justifyContent="center">
                  <Typography>No tienes transferencias pendientes</Typography>
                </Box>
              )}
              <Box display="flex" justifyContent="center">
                <Button
                  component={RouterLink}
                  size="small"
                  to="/administrador/transferenciasporaprobar"
                >
                  ir a transferencias
                </Button>
              </Box>
            </SectionList>

            <SectionList title="Cuentas por Pagar" icon={MoneyIcon}>
              {pagos.length > 0 ? (
                <List disablePadding>
                  {pagos.map((item, ind) => (
                    <ListItem
                      component={RouterLink}
                      divider
                      key={ind}
                      to="/administrador/proveedores/cuentasporpagar"
                    >
                      <ListItemText
                        primary={`El plazo del pedido de ${item.Articulo} está vencido o cercano a vencerse`}
                        primaryTypographyProps={{ variant: "subtitle2" }}
                        secondary={`Proveedor: ${item.Proveedor} - Valor: ${item.Costo}$`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box p={2} display="flex" justifyContent="center">
                  <Typography>No tienes cuentas por pagar</Typography>
                </Box>
              )}
              <Box display="flex" justifyContent="center">
                <Button
                  component={RouterLink}
                  size="small"
                  to="/administrador/proveedores/cuentasporpagar"
                >
                  ir a cuentas por pagar
                </Button>
              </Box>
            </SectionList>

            <SectionList title="Reportes de daños" icon={BuildIcon}>
              {reparaciones.length > 0 ? (
                <List disablePadding>
                  {reparaciones.map((item, ind) => (
                    <ListItem
                      component={RouterLink}
                      divider
                      key={ind}
                      to="/administrador/informeProblemas"
                    >
                      <ListItemText
                        primary={`${item.Usuario} ha reportado un daño`}
                        primaryTypographyProps={{ variant: "subtitle2" }}
                        secondary={`Daño: ${item.Observaciones}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box p={2} display="flex" justifyContent="center">
                  <Typography>No tienes daños reportados</Typography>
                </Box>
              )}
              <Box display="flex" justifyContent="center">
                <Button
                  component={RouterLink}
                  size="small"
                  to="/administrador/informeProblemas"
                >
                  ir a reportes de daños
                </Button>
              </Box>
            </SectionList>
          </List>
        )}
      </Popover>
    </>
  );
};

const SectionList = ({ title, icon: IconComponent, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

export default Notifications;
