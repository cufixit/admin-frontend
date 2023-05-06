import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Reports = () => {
  const { session } = useContext(AccountContext);

  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  const [building, setBuilding] = React.useState([]);
  const [stat, setStat] = React.useState([]);

  const filterByBuilding = (event) => {
    const {
      target: { value },
    } = event;
    setBuilding(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
    ("ALT", "Altschul Hall"),
    ("AVH", "Avery Hall"),
    ("BAR", "Barnard Hall"),
    ("BUT", "Butler Library"),
    ("BWY", "Broadway Residence Hall"),
    ("DIA", "Diana Center"),
    ("DOD", "Dodge Building"),
    ("FLS", "Fairchild Life Sciences Building"),
    ("HAM", "Hamilton Hall"),
    ("IAB", "International Affairs Building"),
    ("JRN", "Journalism Building"),
    ("KNT", "Kent Hall"),
    ("KNX", "Knox Hall"),
    ("LEH", "Lehman Hall"),
    ("LER", "Alfred Lerner Hall"),
    ("LEW", "Lewisohn Hall"),
    ("MAT", "Mathematics Building"),
    ("MCY", "Macy Hall"),
    ("MIL", "Milbank Hall, Barnard"),
    ("MLC", "Milstein Center, Barnard"),
    ("MUD", "Seeley W. Mudd Building"),
    ("NWC", "Northwest Corner"),
    ("PHI", "Philosophy Hall"),
    ("PRN", "Prentis Hall"),
    ("PUP", "Pupin Laboratories"),
    ("SCEP", "Schapiro Center"),
    ("SCH", "Schermerhorn Hall"),
    ("SCHP", "Schapiro Residence Hall"),
    ("URI", "Uris Hall"),
    ("UTS", "Union Theological Seminary"),
  ];

  const stats = ["Created", "In progress", "Completed"];

  let rows = [
    {
      reportID: 1,
      title: "Clogged sink on 5th floor kitchen",
      description:
        "The sink is clogged and has been clogged since last Sunday.",
      building: "SCH",
      status: "Created",
      date: "1/20/2023 2:58 PM EST",
      userID: 2,
    },
    {
      reportID: 3,
      title: "Broken radiator in 555",
      description:
        "Radiator keeps on making weird noises. It will keep turning on and off for 5 minutes straight every day.",
      building: "LER",
      status: "In progress",
      date: "2/20/2023 1:00 PM EST",
      userID: 1,
    },
    {
      reportID: 6,
      title: "Air conditioner not working in 627",
      description: "AC doesn't work.",
      building: "NWC",
      status: "In progress",
      date: "12/2/2022 11:31 AM EST",
      userID: 1,
    },
  ];
  rows.map((row) => (row["id"] = row["reportID"]));

  const getReports = async () => {
    try {
      // const response = await apigClient.invokeApi({}, "/admin/reports", "GET", {
      //   headers: { Authorization: session["idToken"]["jwtToken"] },
      // });
      // console.log(response);
      // setReports(
      //   response.data.map((report) => ({ ...report, id: report.reportID }))
      // );
      setReports(rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const columns = [
    { field: "reportID", headerName: "Report #", type: "number", width: 70 },
    { field: "title", headerName: "Report Title", width: 300 },
    { field: "description", headerName: "Description" },
    { field: "building", headerName: "Building", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Link
            to={`/reports/${cellValues.id}`}
            state={{ data: cellValues.row }}
          >
            Details
          </Link>
        );
      },
    },
    { field: "date" },
    { field: "userID" },
  ];

  return loading ? (
    ""
  ) : (
    <Container>
      <Grid container spacing={20}>
        <Grid item xs={1} md={1} lg={1}>
          <div>Filters</div>
          <FormControl
            sx={{
              width: 120,
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <InputLabel id="demo-multiple-checkbox-label">Building</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={building}
              onChange={filterByBuilding}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {buildings.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={building.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 120, marginBottom: "20px" }}>
            <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={stat}
              onChange={filterByStatus}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {stats.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={stat.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
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
                    description: false,
                    date: false,
                    userID: false,
                  },
                },
              }}
              rows={reports}
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

export default Reports;
