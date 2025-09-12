import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import useStyles from "./useStyles";
import { Container } from "@mui/material";
import Page from "../../../../components/Page";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateForm from "./CreateForm";
import Header from "./Header";

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
      <Button color="primary" variant="outlined" onClick={handleOpen}>
        <center>
        <PersonAddIcon />
        <br />
        Nuevo usuario
        </center>        
      </Button>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
      timeout: 500
    }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <Page className={classes.root} title="CrearCuenta">
              <Container maxWidth="lg">
                <Header onClick={() => handleClose()} />
                <CreateForm send={() => handleClose()} />
              </Container>
            </Page>
          </div>
        </Fade>
      </Modal>
    </div>;
}

export default New;