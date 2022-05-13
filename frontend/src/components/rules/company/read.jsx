import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../table/table'
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '../../button/button'
export default function ReadCompany() {

  const [APIData, setAPIData] = useState([]);

  function clickCompany() {
    window.location.href = 'companies/create'
  }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "show.name"
      },
      {
        Header: "CNPJ",
        accessor: "show.cpnj"
      },
      {
        Header: "Description",
        accessor: "show.decription"
      },
      {
        Header: "Action",
        accessor: "show.action"
      }
    ],
    []
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/company`, config)
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          window.location.href = '/login'
        }
      })
  }, [])

  return (
    <Styles>
      <Button onClick={clickCompany}>New Company</Button>
      <div className='wrapper'>
        <Table columns={columns} data={APIData} type='Company' />
      </div>
    </Styles>
  );
}