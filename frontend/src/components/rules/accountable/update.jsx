import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function CreateAccountable() {
    const [locations, setLocations] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [AddressCEP, setAddressCEP] = useState('');
    const [rowToEdit, setRowToEdit] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3001/location`, config)
            .then((response) => {
                setLocations(response.data)
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 401') {
                    window.location.href = '/login'
                }
            })
        const rowToEdit = JSON.parse(localStorage.getItem('rowToEdit'));
        setName(rowToEdit.name)
        setPhone(rowToEdit.phone)
        setAddressCEP(rowToEdit.address)
        setSelectedOption(rowToEdit.location?.id)
        setRowToEdit(rowToEdit.id)
    }, [])

    async function consultaCEP(CEP) {
        if (CEP.length === 8) {
            axios.get('http://viacep.com.br/ws/' + CEP + '/json')
                .then((response) => {
                    console.log(response.data)
                    setAddressCEP(response.data.logradouro + ', ' + response.data.bairro + ', ' + response.data.localidade + ', ' + response.data.uf)
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
    }

    async function onSubmit() {

        let selectedLocation = [];

        if (selectedOption) {
            selectedLocation = locations.filter(element => element.id === selectedOption)
        }

        const accountable = {
            name: Name,
            phone: Phone,
            address: AddressCEP,
            location: selectedLocation[0]
        }

        if (selectedLocation.length > 0) {
            await axios.patch('http://localhost:3001/accountable/' + rowToEdit, accountable, config)
                .then((response) => {
                    alert('Location edited with Success')
                    window.location.href = '/accountables'
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
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={Name}
                    onChange={e => setName(e.target.value)}
                />
                <p>Phone</p>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    autoComplete="phone"
                    value={Phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <p>CEP</p>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cep"
                    label="CEP"
                    id="cep"
                    autoComplete="cep"
                    onChange={e => consultaCEP(e.target.value)}
                />
                <p>Address</p>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    id="address"
                    autoComplete="address"
                    value={AddressCEP}
                    onChange={e => setAddressCEP(e.target.value)}
                />
                <p>Location</p>
                <Select
                    labelId="demo-simple-select-label"
                    id="location"
                    value={selectedOption}
                    label="Location"
                    onChange={e => setSelectedOption(e.target.value)}
                    required
                    fullWidth
                >{locations.map((obj, index) => (
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