import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";
import {
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BUILDINGS, STATUSES } from "../constants";

const Reports = () => {
  const { session } = useContext(AccountContext);

  const [totalHits, setTotalHits] = useState(undefined);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [queryString, setQueryString] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [ungroupedFilter, setUngroupedFilter] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const getReports = async () => {
    const queryParams = {
      q: queryString,
      status: statusFilter,
      building: buildingFilter,
      ungrouped: ungroupedFilter,
      from: paginationModel.page * paginationModel.pageSize,
      size: paginationModel.pageSize,
    };
    try {
      const response = await apigClient.invokeApi({}, "/reports", "GET", {
        headers: { Authorization: session["idToken"]["jwtToken"] },
        queryParams: queryParams,
      });
      setReports(
        response.data.reports.map((report) => ({
          ...report,
          id: report.reportId,
        }))
      );
      setTotalHits(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getReports();
  }, [paginationModel]);

  const columns = [
    { field: "title", headerName: "Report Title", sortable: false, width: 300 },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 200,
    },
    { field: "building", headerName: "Building", sortable: false, width: 80 },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 130,
      renderCell: (cellValues) => <Chip label={cellValues.value} />,
    },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      width: 100,
      renderCell: (cellValues) => (
        <Button
          variant="text"
          component={Link}
          to={`/reports/${cellValues.id}`}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            Filter By
          </Typography>
          <Stack spacing={2} sx={{ marginTop: "10px" }}>
            <FormControl fullWidth>
              <TextField
                label="Search field"
                type="search"
                variant="standard"
                onChange={(event) => setQueryString(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Building</InputLabel>
              <Select
                value={buildingFilter}
                label="Building"
                onChange={(event) => {
                  setBuildingFilter(event.target.value);
                }}
              >
                {Object.entries(BUILDINGS).map(([k, v]) => (
                  <MenuItem key={k} value={k}>
                    <ListItemText primary={v} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                }}
              >
                {STATUSES.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox checked={ungroupedFilter} />}
                label="Ungrouped only"
                onChange={(event) => {
                  setUngroupedFilter(event.target.checked);
                }}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                getReports();
              }}
            >
              Filter
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <DataGrid
            autoHeight
            rows={reports}
            columns={columns}
            loading={loading}
            rowCount={totalHits || 0}
            pageSizeOptions={[10, 20, 30]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
