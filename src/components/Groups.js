import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";

const Groups = () => {
  const { session } = useContext(AccountContext);

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);

  let rows = [
    {
      groupID: 1,
      title: "Clogged sink on 5th floor kitchen",
      description:
        "The sink is clogged and has been clogged since last Sunday.",
      location: "Schapiro Residence Hall",
      status: "CREATED",
    },
    {
      groupID: 3,
      title: "Broken radiator in 555",
      description:
        "Radiator keeps on making weird noises. It will keep turning on and off for 5 minutes straight every day.",
      location: "Alfred Lerner Hall",
      status: "IN PROGRESS",
    },
    {
      groupID: 6,
      title: "Air conditioner not working in 627",
      description: "AC doesn't work.",
      location: "Northwest Corner",
      status: "COMPLETED",
    },
  ];
  rows.map((row) => (row["id"] = row["groupID"]));

  const getReports = async () => {
    try {
      // const response = await apigClient.invokeApi({}, "/admin/reports", "GET", {
      //   headers: { Authorization: session["idToken"]["jwtToken"] },
      // });
      // console.log(response);
      // setReports(
      //   response.data.map((report) => ({ ...report, id: report.reportID }))
      // );
      setGroups(rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const columns = [
    { field: "groupID", headerName: "Group #", type: "number", width: 70 },
    { field: "title", headerName: "Report Title", width: 300 },
    { field: "description", headerName: "Description" },
    { field: "location", headerName: "Location", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Link
            to={`/groups/${cellValues.id}`}
            state={{ data: cellValues.row }}
          >
            Details
          </Link>
        );
      },
    },
    { field: "date" },
  ];

  return loading ? (
    ""
  ) : (
    <Container maxWidth="lg">
      <div style={{ fontSize: "200%" }}>Groups</div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                description: false,
                date: false,
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
