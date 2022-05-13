import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../table/table'
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '../../button/button'
export default function ReadAccountable() {

  const [APIData, setAPIData] = useState([]);

  function clickAccountable() {
    window.location.href = 'accountables/create'
  }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "show.name"
      },
      {
        Header: "Phone",
        accessor: "show.phone"
      },
      {
        Header: "Address",
        accessor: "show.address"
      },
      {
        Header: "Actions",
        accessor: "show.actions"
      },
    ],
    []
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/accountable`, config)
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
      <Button onClick={clickAccountable}>New Accountable</Button>
      <div className='wrapper'>
        <Table columns={columns} data={APIData} type='Accountable' />
      </div>
    </Styles>
  );
}