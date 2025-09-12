import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import useStyles from "./useStyles";
import { Container } from "@mui/material";
import Page from "../../../../components/Page";
import PersonAddIcon from "@mui/icons-material/EmojiFoodBeverage";
import CreateForm from "./CreateForm";
import Header from "./Header";
import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function New(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <div>
      {props.data ? <Tooltip title="Editar">
          <IconButton aria-label="editar" onClick={() => handleOpen()}>
            <EditIcon />
          </IconButton>
        </Tooltip> : <Button color="primary" variant="outlined" onClick={handleOpen}>
          <center>
            <PersonAddIcon />
            <br />
            Nuevo Paciente
          </center>
        </Button>}

      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
      timeout: 500
    }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <Page className={classes.root} title="CrearCuenta">
              <Container maxWidth="lg">
                <Header onClick={() => handleClose()} />
                <CreateForm data={props.data} send={() => handleClose()} />
              </Container>
            </Page>
          </div>
        </Fade>
      </Modal>
    </div>;
}

export default New;