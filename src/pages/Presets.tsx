import { TabHeading } from "../components/settings/settings.styled.tsx";

import { AddRounded, SaveRounded } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { TopBar } from "../components";
// import { ManagementHeader } from "../styles";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.tsx";
import { Platform } from "../types/user.ts";
import { DialogBtn } from "../styles";

// const data: Platform =
interface CreatePlatformViewProps {
  isOpen: boolean;
  onClose: () => void;
  handleCloseButtonClick?: () => void;
  data?: Platform;
}

const CreatePlatformView = ({
  onClose,
  isOpen,
  handleCloseButtonClick,
  data,
}: CreatePlatformViewProps) => {
  const { t } = useTranslation();
  if (data) {
    return null;
  }
  const handleSaveButtonClick = () => {
    //TODO: geli Save logic here
  };
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>这是一个默认在屏幕正中央的弹窗。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogBtn onClick={handleCloseButtonClick}>
          {t("common.cancel", { defaultValue: "Cancel" })}
        </DialogBtn>
        <DialogBtn
          // disabled={
          //   profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH ||
          //   !profilePictureURL.startsWith("https://")
          // }
          onClick={handleSaveButtonClick}
        >
          <SaveRounded /> &nbsp; Save
        </DialogBtn>
      </DialogActions>
    </Dialog>
  );
};

interface AddViewProps {
  onClose: () => void;
}

const AddPlatformPresetView = ({ onClose }: AddViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CreatePlatformView
        onClose={onClose}
        isOpen={isOpen}
        handleCloseButtonClick={() => setIsOpen(false)}
      />
      <Button
        variant="outlined"
        sx={{ height: "80", width: "80", mt: 2 }}
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        <AddRounded style={{ fontSize: "44px" }} />
      </Button>
    </div>
  );
};

interface PlatformPresetItemViewProps {
  data: Platform;
}

const PlatformPresetItemView = ({ data }: PlatformPresetItemViewProps) => {
  return (
    // <UserAvatar
    //   // onClick={handleOpenImageDialog}
    //   src={data.icon}
    //   // hasimage={data.icon != undefined}
    //   hasimage={true}
    //   style={{ cursor: "pointer" }}
    //   size="80px"
    // >
    //   {/*{data.name[0].toUpperCase()}*/}
    // </UserAvatar>
    <Avatar
      translate={"no"}
      slotProps={{ img: { loading: "lazy" } }}
      src={data.icon}
      sx={{ width: 80, height: 80 }}
      variant={"rounded"}
    />
  );
};

const Presets = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  return (
    <div>
      <TopBar title={t("common.presets")} />
      <TabHeading>常用平台</TabHeading>
      <Stack direction="row" spacing={2} justifyContent="start" alignItems="center">
        {user.platformsPreset?.map((platform: Platform) => (
          <PlatformPresetItemView key={platform.id} data={platform} />
        ))}
        <AddPlatformPresetView onClose={() => {}} />
      </Stack>
    </div>
  );
};

export default Presets;
