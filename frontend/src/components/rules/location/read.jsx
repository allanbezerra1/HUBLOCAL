import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../table/table'
import Styles from '../styles/styles';
import config from '../headers/headers'
import Button from '../../button/button'
export default function ReadLocation() {

  const [APIData, setAPIData] = useState([]);
  function clickLocation() {
    window.location.href = 'locations/create'
  }
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "show.name"
      },
      {
        Header: "Address",
        accessor: "show.address"
      },
      {
        Header: "Action",
        accessor: "show.action"
      }
    ],
    []
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/location`, config)
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
      <Button onClick={clickLocation}>New Location</Button>
      <div className='wrapper'>
        <Table columns={columns} data={APIData} type='Location' />
      </div>
    </Styles>
  );
}