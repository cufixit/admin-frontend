import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Report #', type: 'number', width: 70 },
  { field: 'reportTitle', headerName: 'Report Title', width: 300 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'status', headerName: 'Status', width: 200 },
  { field: 'details', headerName: 'Details', sortable: false, width: 150 }
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, reportTitle: 'Clogged sink in 2016 kitchen', location: 'East Campus', status: 'Submitted' },
  { id: 3, reportTitle: 'Broken radiator in 2020A', location: 'East Campus', status: 'In progress' },
  { id: 6, reportTitle: 'Air conditioner not working in 627', location: 'Mudd Hall', status: 'In progress' },
];

export default function Reports() {
  return (
    <Container maxWidth="lg">
        <div style={{ fontSize: '200%' }}>Reports</div>
        <div style={{ height: 600, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
        </div>
    </Container>
  );
}