import { TabHeading } from "../components/settings/settings.styled.tsx";

import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { TopBar } from "../components";
// import { ManagementHeader } from "../styles";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div>
      <TopBar title={t("common.presets")} />
      {/*<ManagementHeader>{t("presets.header")}</ManagementHeader>*/}
      <TabHeading>常用平台</TabHeading>
      <AddView />
    </div>
  );
};

export default Presets;
