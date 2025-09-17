import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Container } from '@mui/material';
import PersonAddIcon from "@material-ui/icons/AccountBalance";
import CreateForm from "./CreateForm";
import Header from "./Header";
import { Tooltip, Box, IconButton } from '@mui/material';
import EditIcon from "@material-ui/icons/Edit";

function New(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {props.data ? (
        <Tooltip title="Editar">
          <IconButton aria-label="editar" onClick={() => handleOpen()}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button color="primary" variant="outlined" onClick={handleOpen}>
          <center>
            <PersonAddIcon />
            <br />
            Nueva área
          </center>
        </Button>
      )}

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
              <CreateForm data={props.data} info={props.IdHospital} send={() => handleClose()} />
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default New;
