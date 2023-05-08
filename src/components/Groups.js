import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Groups = () => {
  const { session } = useContext(AccountContext);

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queryString, setQueryString] = React.useState("");
  const [building, setBuilding] = React.useState("");
  const [code, setCode] = React.useState("");
  const [stat, setStat] = React.useState("");

  const filterByBuilding = (k, v) => {
    setCode(k);
    setBuilding(v);
  };

  const filterByStatus = (event) => {
    const {
      target: { value },
    } = event;
    setStat(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const buildings = [
    { ALT: "Altschul Hall" },
    { AVH: "Avery Hall" },
    { BAR: "Barnard Hall" },
    { BUT: "Butler Library" },
    { BWY: "Broadway Residence Hall" },
    { DIA: "Diana Center" },
    { DOD: "Dodge Building" },
    { FLS: "Fairchild Life Sciences Building" },
    { HAM: "Hamilton Hall" },
    { IAB: "International Affairs Building" },
    { JRN: "Journalism Building" },
    { KNT: "Kent Hall" },
    { KNX: "Knox Hall" },
    { LEH: "Lehman Hall" },
    { LER: "Alfred Lerner Hall" },
    { LEW: "Lewisohn Hall" },
    { MAT: "Mathematics Building" },
    { MCY: "Macy Hall" },
    { MIL: "Milbank Hall, Barnard" },
    { MLC: "Milstein Center, Barnard" },
    { MUD: "Seeley W. Mudd Building" },
    { NWC: "Northwest Corner" },
    { PHI: "Philosophy Hall" },
    { PRN: "Prentis Hall" },
    { PUP: "Pupin Laboratories" },
    { SCEP: "Schapiro Center" },
    { SCH: "Schermerhorn Hall" },
    { SCHP: "Schapiro Residence Hall" },
    { URI: "Uris Hall" },
    { UTS: "Union Theological Seminary" },
  ];

  const stats = ["SUBMITTED", "REVIEWING", "RESOLVED"];

  const filterGroups = async () => {
    const queryParams = {
      q: queryString,
      status: stat,
      building: code,
    };
    try {
      const response = await apigClient.invokeApi({}, "/groups", "GET", {
        headers: { Authorization: session["idToken"]["jwtToken"] },
        queryParams: queryParams,
      });
      console.log(response);
      setGroups(
        response.data.groups.map((group) => ({
          ...group,
          id: group.groupId,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async () => {
    try {
      const response = await apigClient.invokeApi({}, "/groups", "GET", {
        headers: { Authorization: session["idToken"]["jwtToken"] },
      });
      console.log(response);
      setGroups(
        response.data.groups.map((group) => ({ ...group, id: group.groupId }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const columns = [
    { field: "groupId", headerName: "Group #", type: "number", width: 70 },
    { field: "title", headerName: "Group Title", width: 300 },
    { field: "description", headerName: "Description" },
    { field: "building", headerName: "Building", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      renderCell: (cellValues) => {
        return <Link to={`/groups/${cellValues.id}`}>Details</Link>;
      },
    },
  ];

  return loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      Loading...
      <RefreshIcon />
    </Grid>
  ) : (
    <Container>
      <Grid container spacing={20}>
        <Grid item xs={1} md={1} lg={1}>
          <div>Filters</div>
          <FormControl
            sx={{
              width: 120,
              marginTop: "20px",
            }}
          >
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
              onChange={(event) => setQueryString(event.target.value)}
            />
          </FormControl>
          <FormControl
            sx={{
              width: 120,
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <InputLabel>Building</InputLabel>
            <Select value={building}>
              {buildings.map((option) => (
                <MenuItem
                  key={Object.keys(option)[0]}
                  value={Object.values(option)[0]}
                  onClick={(event) =>
                    filterByBuilding(
                      Object.keys(option)[0],
                      Object.values(option)[0]
                    )
                  }
                >
                  <ListItemText primary={Object.values(option)[0]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 120, marginBottom: "20px" }}>
            <InputLabel>Status</InputLabel>
            <Select value={stat} label="Status" onChange={filterByStatus}>
              {stats.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" onClick={filterGroups}>
            Filter
          </Button>
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
          {/* <div style={{ fontSize: "200%" }}>Reports</div> */}
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    groupId: false,
                    description: false,
                    date: false,
                    userId: false,
                  },
                },
              }}
              rows={groups}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Groups;
