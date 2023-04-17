import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";
import Report from './Report';

const Reports = () => {

  let navigate = useNavigate();

  const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
  };
  
  const columns = [
    { field: 'id', headerName: 'Report #', type: 'number', width: 70 },
    { field: 'reportTitle', headerName: 'Report Title', width: 300 },
    { field: 'description', headerName: 'Description' },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    // { field: 'details', headerName: 'Details', sortable: false, width: 150 }
    {
      field: 'details',
      headerName: 'Details',
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Link to={"/report/" + cellValues.id} state={{ data: cellValues.row }}>
            Details
          </Link>
        );
      },
    },
    { field: 'date' },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.id || ''} ${params.row || ''}`,
    // },
  ];
  
  const rows = [
    { id: 1, reportTitle: 'Clogged sink in 2016 kitchen', description: "The sink is clogged and has been clogged since last Sunday.", location: 'East Campus', status: 'Submitted', date: "1/20/2023 2:58 PM EST" },
    { id: 3, reportTitle: 'Broken radiator in 2020A', description: "Radiator keeps on making weird noises. It will keep turning on and off for 5 minutes straight every day.", location: 'East Campus', status: 'In progress', date: "2/20/2023 1:00 PM EST" },
    { id: 6, reportTitle: 'Air conditioner not working in 627', description: "AC doesn't work.", location: 'Mudd Hall', status: 'In progress', date: "12/2/2022 11:31 AM EST" },
  ];

  // let tempRows = rows;

  // let selected = [];

  // for (const [key, val] of Object.entries(tempRows)) {
  //   console.log(val);
  //   delete val.description;
  //   delete val.date;
  //   selected.push(val);
  // }

  return (
    <Container maxWidth="lg">
        <div style={{ fontSize: '200%' }}>Reports</div>
        <div style={{ height: 600, width: '100%' }}>
        <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  description: false,
                  date: false,
                },
              },
            }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
        </div>
    </Container>
  );
};

export default Reports;