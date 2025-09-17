import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from ".././../../../components/CustomButtons/Button";
import { Container } from '@mui/material';
import CreateForm from "./CreateForm";
import Header from "./Header";

function DarAlta({ className, send, data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    send()
  };

  return (
    <div>

      <Button
        color="danger"
        onClick={handleOpen}
      >
        Dar de alta
      </Button>
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
                <CreateForm data={data} send={() => handleClose()} />
              </Container>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DarAlta;
