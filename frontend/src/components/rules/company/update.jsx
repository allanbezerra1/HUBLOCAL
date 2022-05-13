import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function UpdateCompany() {
    const [accountables, setAccountables] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [Name, setName] = useState('');
    const [Cnpj, setCnpj] = useState('');
    const [Description, setDescription] = useState('');

    const [rowToEdit, setRowToEdit] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3001/accountable`, config)
            .then((response) => {
                setAccountables(response.data)
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 401') {
                    window.location.href = '/login'
                }
            })
        const rowToEdit = JSON.parse(localStorage.getItem('rowToEdit'));
        setName(rowToEdit.name)
        setCnpj(rowToEdit.cnpj)
        setDescription(rowToEdit.description)
        setSelectedOption(rowToEdit.accountable?.id)
        setRowToEdit(rowToEdit.id)
    }, [])

    async function onSubmit() {

        let selectedAccountable = [];

        if (selectedOption) {
            selectedAccountable = accountables.filter(element => element.id === selectedOption)
        }

        const company = {
            name: Name,
            cnpj: Cnpj,
            description: Description,
            accountable: selectedAccountable[0]
        }

        if (selectedAccountable.length > 0) {
            await axios.patch('http://localhost:3001/company/' + rowToEdit, company, config)
                .then((response) => {
                    alert('Company edited with Success')
                    window.location.href = '/companies'
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
                <p>Name</p>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={Name}
                    onChange={e => setName(e.target.value)}
                />
                <p>Cnpj</p>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cnpj"
                    label="Cnpj"
                    id="cnpj"
                    autoComplete="cnpj"
                    value={Cnpj}
                    onChange={e => setCnpj(e.target.value)}
                />
                <p>Description</p>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    autoComplete="description"
                    value={Description}
                    onChange={e => setDescription(e.target.value)}
                />
                <p>Accountable</p>
                <Select
                    labelId="demo-simple-select-label"
                    id="accountable"
                    value={selectedOption}
                    label="Accountable"
                    onChange={e => setSelectedOption(e.target.value)}
                    required
                    fullWidth
                >{accountables.map((obj, index) => (
                    <MenuItem key={index} value={obj.id}>{obj.name}</MenuItem>
                ))}
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