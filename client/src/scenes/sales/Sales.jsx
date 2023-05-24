import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "../../components/Header";
import SalesChart from "../../components/SalesChart";

const Sales = () => {
  const [view, setView] = useState("units");

  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header
        title={"OVERVIEW"}
        subTitle={"Overview of General Revenue and Profit"}
      />
      <Box height={"75vh"}>
        <FormControl sx={{ mt: "1rem" }}>
            <InputLabel>View</InputLabel>
            <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="units">Units</MenuItem>
            </Select>
        </FormControl>
        <SalesChart view={view} />
      </Box>
    </Box>
  );
};

export default Sales;
