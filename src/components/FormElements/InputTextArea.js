import React, { Fragment } from 'react';
import { TextField } from '@mui/material';

const renderTextAreaField = ({
    id,
    name,
    label,
    placeholder,
    error,
    helperText,
    onBlur,
    onChange,
    value,
}) => {
    return (
        <Fragment>
            <TextField
                style={{ marginTop: '0.625em', marginBottom: '0.625em' }}
                error={error}
                fullWidth
                helperText={helperText}
                label={label}
                placeholder=""
                name={name}
                id={id}
                onBlur={onBlur}
                onChange={onChange}
                defaultValue={value}
                variant="outlined"
                multiline
            />
        </Fragment>
    );
};

export default renderTextAreaField;