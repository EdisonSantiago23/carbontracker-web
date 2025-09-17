import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Container } from '@mui/material';
import CreateForm from "./CreateForm";
import Header from "./Header";
import Button from "../../../components/CustomButtons/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {EquiposService} from '@services'
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import useAuth from "../../../contextapi/hooks/useAuth";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import {StyledTableRow,StyledTableCell} from "@styles";

import { ReporteTabla } from "@config"

function Reporte(props) {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { isAuthenticated, user } = useAuth();
  const [threadKey, setthreadKey] = React.useState(user.IdHospital);

  
  const [cama, setCama] = React.useState([]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpens(false);

  };
  React.useEffect(() => {
    EquiposService.getReportesById(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);

          setCama(Items);
        },
      },
      threadKey,props.data.id
    );
  }, [props.data.id, threadKey]);

  return (
    <div>
      {!props.data.data().Estado ? (
        <Button color="secondary" onClick={() => setOpens(true)}>
          ver reporte
        </Button>
      ) : (
        <Button color="primary" onClick={() => handleOpen()}>
          Reportar
        </Button>
      )}
      <Dialog
        open={opens}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xl"}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography component={'span'} variant="h3" color="textPrimary">
            Reporte de daño presentado en la bomba  	
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="customized table"
            >
                <TableHead>
                <TableRow>
                  {ReporteTabla().map((column, index) => (
                    <StyledTableCell align="center" key={index}>
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cama
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow hover tabIndex={-1} key={index}>
                        <StyledTableCell align="center">
                          {row.data().Detalle}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(
                            row.data().Fecha?.seconds * 1000
                          ).format("YYYY-MM-DD")}
                        </StyledTableCell>
                        
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="warning">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
        <Box
            sx={{
              position: 'relative',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: (theme) => theme.shadows[5],
              p: 4,
              border: "2px solid #000",
              height: "100%",
              width: "50%",
              right: 0,
              position: "fixed",
              margin: "auto",
              overflow: "scroll",
            }}
          >
              <Container maxWidth="lg">
                <Header onClick={() => handleClose()} />
                <CreateForm data={props.data} send={() => handleClose()} />
              </Container>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Reporte;
