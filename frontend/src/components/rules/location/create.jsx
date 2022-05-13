import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function CreateLocation() {
    const [companies, setCompanies] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [Name, setName] = useState('');
    const [AddressCEP, setAddressCEP] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3001/company`, config)
            .then((response) => {
                setCompanies(response.data)
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 401') {
                    window.location.href = '/login'
                }
            })
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

        let selectedCompany = [];

        if (selectedOption) {
            selectedCompany = companies.filter(element => element.id === selectedOption)
        }

        const location = {
            name: Name,
            address: AddressCEP,
            company: selectedCompany[0]
        }

        if (selectedCompany.length > 0) {
            await axios.post(`http://localhost:3001/location`, location, config)
                .then((response) => {
                    alert('Location created with Success')
                    window.location.href = '/locations'
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
                <p>Company</p>
                <Select
                    labelId="demo-simple-select-label"
                    id="company"
                    value={selectedOption}
                    label="Company"
                    onChange={e => setSelectedOption(e.target.value)}
                    required
                    fullWidth
                >{companies.map((obj, index) => (
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