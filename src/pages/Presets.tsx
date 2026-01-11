import { TabHeading } from "../components/settings/settings.styled.tsx";

import { AddRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TopBar } from "../components";
// import { ManagementHeader } from "../styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";

// const data: Platform =
interface CreatePlatformViewProps {
  isOpen: boolean;
  onClose: () => void;
  handleCloseButtonClick?: () => void;
}

const CreatePlatformView = ({
  onClose,
  isOpen,
  handleCloseButtonClick,
}: CreatePlatformViewProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      // maxWidth="sm" // 可以设置最大宽度
      // fullWidth    // 配合 maxWidth 使用
    >
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>这是一个默认在屏幕正中央的弹窗。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseButtonClick}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};

interface AddViewProps {
  onClose: () => void;
}
const AddView = ({ onClose }: AddViewProps) => {
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

const Presets = () => {
  const { t } = useTranslation();

  return (
    <div>
      <TopBar title={t("common.presets")} />
      <TabHeading>常用平台</TabHeading>

      <AddView onClose={() => {}} />
    </div>
  );
};

export default Presets;
