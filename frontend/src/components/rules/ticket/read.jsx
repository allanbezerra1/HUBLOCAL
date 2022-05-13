import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../table/table'
import Styles from '../styles/styles';
import config from '../headers/headers'
export default function ReadTicket() {

  const [APIData, setAPIData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "show.title"
      },
      {
        Header: "Description",
        accessor: "show.description"
      },
      {
        Header: "Accountable",
        accessor: "show.accountable"
      },
      {
        Header: "Clerk",
        accessor: "show.clerk"
      },
      {
        Header: "Status",
        accessor: "show.status"
      },
      {
        Header: "Created At",
        accessor: "show.createdAt"
      },
      {
        Header: "Updated At",
        accessor: "show.updatedAt"
      },
      {
        Header: "Actions",
        accessor: "show.actions"
      },
    ],
    []
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/ticket`, config)
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
      <div className='wrapper'>
        <Table columns={columns} data={APIData} type='Ticket' />
      </div>
    </Styles>
  );
}