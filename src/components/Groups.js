import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Grid } from "@mui/material";

const Groups = () => {
  const { session } = useContext(AccountContext);

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);

  const getGroups = async () => {
    try {
      const response = await apigClient.invokeApi({}, "/groups", "GET", {
        headers: { Authorization: session["idToken"]["jwtToken"] },
      });
      console.log(response);
      setGroups(
        response.data.map((group) => ({ ...group, id: group.groupId }))
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
    { field: "title", headerName: "Report Title", width: 300 },
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
    <Container maxWidth="lg">
      <div style={{ fontSize: "200%" }}>Groups</div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                description: false,
                groupId: false,
              },
            },
          }}
          rows={groups}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Container>
  );
};

export default Groups;
