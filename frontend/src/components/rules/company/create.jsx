import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function CreateCompany() {
    const [accountables, setAccountables] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [Name, setName] = useState('');
    const [Cnpj, setCnpj] = useState('');
    const [Description, setDescription] = useState('');
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
            await axios.post(`http://localhost:3001/company`, company, config)
                .then((response) => {
                    alert('Company created with Success')
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