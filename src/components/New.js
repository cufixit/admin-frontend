import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// import AWS from 'aws-sdk';
// import apigClientFactory from '../sdk/apigClient';

const New = () => {
  // var sdk = apigClientFactory.newClient();
  const { session } = useContext(AccountContext);
  const navigate = useNavigate();

  const data = useLocation().state.data;

  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.location);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState(data.status);

  const locations = [
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

  const onSubmit = (event) => {
    event.preventDefault();

    const submission = {
      id: 1,
      title: title.trim(),
      location: location,
      description: description.trim(),
      status: status,
    };
    console.log(submission);
    navigate("/groups/1", { state: { data: submission, report: data } });
    <Link
      to={{
        pathname: "/groups/1",
        state: { data: submission },
      }}
    />;
  };

  return (
    <Container fixed sx={{ marginTop: "100px" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          {
            <Paper sx={{ padding: "20px 30px 30px", marginBottom: "20px" }}>
              <Typography variant="h5" marginBottom="10px">
                New Group
              </Typography>
              <Divider sx={{ marginBottom: "25px" }} />
              <form onSubmit={onSubmit}>
                <FormControl fullWidth>
                  <Stack spacing={4}>
                    <div>
                      <TextField
                        label="Group Title"
                        sx={{ width: "60%", marginRight: "10%" }}
                        required
                        onChange={(event) => setTitle(event.target.value)}
                        defaultValue={data.title}
                      />
                      <TextField
                        select
                        label="Location"
                        defaultValue={data.location}
                        helperText="Select the location of the issue"
                        onChange={(event) => setLocation(event.target.value)}
                      >
                        {locations.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <TextField
                      label="Description"
                      fullWidth
                      required
                      onChange={(event) => setDescription(event.target.value)}
                      defaultValue={data.description}
                    />
                  </Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px", fontWeight: "800", width: "20%" }}
                  >
                    Create Group
                  </Button>
                </FormControl>
              </form>
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default New;
