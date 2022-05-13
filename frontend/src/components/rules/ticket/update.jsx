import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function UpdateTicket() {
    const [status, setStatus] = useState([]);
    const [rowToEdit, setRowToEdit] = useState('');
    useEffect(() => {
        const rowToEdit = JSON.parse(localStorage.getItem('rowToEdit'));
        console.log(rowToEdit)
        setStatus(rowToEdit.status)
        setRowToEdit(rowToEdit.id)
    }, [])

    async function onSubmit() {

        const ticket = {
            status: status,
        }

        if (ticket.status) {
            await axios.patch('http://localhost:3001/ticket/' + rowToEdit, ticket, config)
                .then((response) => {
                    alert('Ticket edited with Success')
                    window.location.href = '/tickets'
                })
                .catch((error) => {
                    if (error.message === 'Request failed with status code 401') {
                        window.location.href = '/login'
                    }
                })
        }
    }

    return (<>
        <Styles>
            <Box component="form" onSubmit={'handleSubmit'} noValidate sx={{ mt: 1 }}>
                <p>Status</p>
                <Select
                    labelId="demo-simple-select-label"
                    id="status"
                    value={status}
                    label="status"
                    onChange={e => setStatus(e.target.value)}
                    required
                    fullWidth
                >
                    <MenuItem key={1} value="PENDING">PENDING</MenuItem>
                    <MenuItem key={2} value="ON PROGRESS">ON PROGRESS</MenuItem>
                    <MenuItem key={3} value="DONE">DONE</MenuItem>
                </Select>
                <Button
                    type="button"
                    fullWidth
                    onClick={() => onSubmit()}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save
                </Button>
            </Box>
        </Styles>
    </>
    );
}