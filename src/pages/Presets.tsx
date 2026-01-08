import { SectionHeading } from "../components/settings/settings.styled.tsx";

import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

// const data: Platform =

const AddView = () => {
  return (
    <div>
      <Button variant="outlined" sx={{ height: "80", width: "80", mt: 2 }} color="primary">
        <AddRounded style={{ fontSize: "44px" }} />
      </Button>
    </div>
  );
};

const Presets = () => {
  return (
    <div>
      <SectionHeading>接单平台</SectionHeading>
      <AddView />
    </div>
  );
};

export default Presets;
