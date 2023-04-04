import React from "react";
import { Select, MenuItem, Chip } from "@material-ui/core";

const Chips = () => {
  const chips = ["React", "Material UI", "Web Development", "JavaScript", "HTML/CSS"];

  return (
    <div>
    <Select
      displayEmpty
    //   renderValue={() => (
    //     <div style={{ display: "flex", flexWrap: "wrap" }}>
    //       {chips.map((chip) => (
    //         <Chip key={chip} label={chip} style={{ margin: "2px" }} />
    //       ))}
    //     </div>
    //   )}
      MenuProps={{
        MenuListProps: {
          style: {
            overflow: "hidden",
          },
        },
      }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {chips.map((chip) => (
        <MenuItem key={chip} value={chip}>
          <Chip label={chip} />
        </MenuItem>
      ))}
    </Select>
  </div>
  );
};

export default Chips;
