import React from "react";
import Header from "./Header";
import PropTypes from 'prop-types';
import {
    Fade,
    Container,
    Modal,
    Button,
    Box,
} from '@mui/material';
import { Iconify } from '@components';

export default function Index(props) {
    const { titulo, openModal, data, content, icono } = props;
    const [open, setOpen] = React.useState(openModal);
    React.useEffect(() => {
        setOpen(openModal);
    }, [openModal]);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box >
            {data ? (
                <Iconify onClick={handleOpen} icon={icono} tooltip={titulo} />
            ) : (<Box mt={2}>
                <Button size="small" variant="contained"
                    onClick={handleOpen}
                    startIcon={<Iconify icon={icono} color={'#fff'} />}>
                    {titulo}
                </Button>
            </Box>)}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition>
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
                            <Header titulo={titulo} onClick={() => handleClose()} />
                            {content}
                            {/* <CreateForm data={props.data} send={() => handleClose()} /> */}
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

Index.propTypes = {
    titulo: PropTypes.string,
    icono: PropTypes.string,
    openModal: PropTypes.bool

}
Index.defaultProps = {
    titulo: "Nuevo",
    icono: "material-symbols:edit",
    openModal: false

}