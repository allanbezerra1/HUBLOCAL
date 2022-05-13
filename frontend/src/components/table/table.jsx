import React, { useState } from "react";
import { useTable } from "react-table";
import axios from 'axios';
import config from '../rules/headers/headers'

export default function Table({ columns, data, type }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
  } = useTable({
    columns,
    data,
    type
  });

  const [dataPicked, setDataPicked] = useState('')

  const RowClicked = (row) => {
    setDataPicked(row.id)
    console.log(dataPicked)
  };

  async function EditRow(row) {
    localStorage.setItem('rowToEdit', JSON.stringify(row));
    switch (type) {
      case 'Accountable':
        window.location.href = '/accountables/edit'
        break
      case 'Company':
        window.location.href = '/companies/edit'
        break
      case 'Location':
        window.location.href = '/locations/edit'
        break
      case 'Ticket':
        window.location.href = '/tickets/edit'
        break
      default:
        break
    }
  }

  async function DeleteRow(row) {
    const titleRow = row.name ? row.name : row.title;
    const confirmAlert = window.confirm("Deseja excluir o item: " + titleRow + " ?") ? true : false;
    if (confirmAlert) {
      switch (type) {
        case 'Accountable':
          axios.delete('http://localhost:3001/accountable/' + row.id, config)
            .then((response) => {
              alert('Accountable Deleted with Success')
              window.location.href = '/accountables'
            })
            .catch((error) => {
              if (error.message === 'Request failed with status code 401' || error.AxiosError === 'Request failed with status code 401') {
                alert(error)
                window.location.href = '/login'
              }
            })
          break
        case 'Location':
          axios.delete('http://localhost:3001/location/' + row.id, config)
            .then((response) => {
              alert('Location Deleted with Success')
              window.location.href = '/locations'
            })
            .catch((error) => {
              if (error.message === 'Request failed with status code 401' || error.AxiosError === 'Request failed with status code 401') {
                alert(error)
                window.location.href = '/login'
              }
            })
          break
        case 'Company':
          axios.delete('http://localhost:3001/company/' + row.id, config)
            .then((response) => {
              alert('Company Deleted with Success')
              window.location.href = '/companies'
            })
            .catch((error) => {
              if (error.message === 'Request failed with status code 401' || error.AxiosError === 'Request failed with status code 401') {
                alert(error)
                window.location.href = '/login'
              }
            })
          break
        default:
          break
      }
    }
  }

  return (
    <div className="wrapper">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.map((row, i) => {
            switch (type) {
              case 'Accountable':
                return (
                  <tr key={i} onClick={() => RowClicked(row)}>
                    <td>{row.name}</td>
                    <td>{row.phone}</td>
                    <td>{row.address}</td>
                    <td><i className="bx bx-edit-alt" onClick={() => EditRow(row)}></i>{'  '}<i className="bx bx-trash" onClick={() => DeleteRow(row)}></i></td>
                  </tr>
                )

              case 'Company':
                return (
                  <tr key={i} onClick={() => RowClicked(row)}>
                    <td>{row.name}</td>
                    <td>{row.cnpj}</td>
                    <td>{row.description}</td>
                    <td><i className="bx bx-edit-alt" onClick={() => EditRow(row)}></i>{'  '}<i className="bx bx-trash" onClick={() => DeleteRow(row)}></i></td>
                  </tr>
                )

              case 'Location':
                return (
                  <tr key={i} onClick={() => RowClicked(row)}>
                    <td>{row.name}</td>
                    <td>{row.address}</td>
                    <td><i className="bx bx-edit-alt" onClick={() => EditRow(row)}></i>{'  '}<i className="bx bx-trash" onClick={() => DeleteRow(row)}></i></td>
                  </tr>
                )

              case 'Ticket':
                return (
                  <tr key={i} onClick={() => RowClicked(row)}>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td>{row.accountable.name}</td>
                    <td>{row.clerk.name}</td>
                    <td>{row.status}</td>
                    <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
                    <td><i className="bx bx-edit-alt" onClick={() => EditRow(row)}></i></td>
                  </tr>
                )

              default:
                return '';
            }

          })}
        </tbody>
      </table>
    </div>
  );
}