import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import bytesToSize from '../../src/utils/bytesToSize';

const FilesDropzone = ({ className, onChange, ...rest }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      if (onChange) onChange([...files, ...acceptedFiles]);
    },
    [files, onChange]
  );

  const handleRemoveAll = () => setFiles([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  const dropZoneStyles = {
    border: '1px dashed',
    padding: 6,
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'action.hover',
      opacity: 0.5
    },
    ...(isDragActive && {
      backgroundColor: 'action.active',
      opacity: 0.5
    })
  };

  return (
    <div className={className} {...rest}>
      <Box sx={dropZoneStyles} {...getRootProps()}>
        <input {...getInputProps()} />
        <Box>
          <img alt="Imagen" src="/assets/img/1.png" style={{ width: 130 }} />
        </Box>
        <Box ml={2}>
          <Typography gutterBottom variant="h5">
            Selecciona imagen
          </Typography>
          <Typography color="text.primary">
            Suelta los archivos aquí o haz clic{' '}
            <Link underline="always">aquí</Link> para acceder en tu máquina
          </Typography>
        </Box>
      </Box>

      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List sx={{ maxHeight: 320 }}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'body1' }}
                    secondary={bytesToSize(file.size)}
                  />
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default FilesDropzone;
