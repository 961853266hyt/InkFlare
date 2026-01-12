import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Box,
} from "@mui/material";
import { AddRounded, SaveRounded } from "@mui/icons-material";

import { TopBar } from "../components";
import { TabHeading } from "../components/settings/settings.styled.tsx";
import { DialogBtn } from "../styles";
import { UserContext } from "../contexts/UserContext.tsx";
import { Platform, User } from "../types/user.ts";

// ==================== Sub Components ====================

interface PlatformPresetItemProps {
  platform: Platform;
  onClick?: (platform: Platform) => void;
}

const PlatformPresetItem = ({ platform, onClick }: PlatformPresetItemProps) => {
  const handleClick = () => {
    onClick?.(platform);
  };

  return (
    <Avatar
      translate="no"
      slotProps={{ img: { loading: "lazy" } }}
      src={platform.icon}
      sx={{
        width: 80,
        height: 80,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s",
        "&:hover": onClick
          ? {
              transform: "scale(1.05)",
            }
          : {},
      }}
      variant="rounded"
      onClick={handleClick}
    />
  );
};

interface CreatePlatformDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (platform: Platform) => void;
  initialData?: Platform;
}

const CreatePlatformDialog = ({
  open,
  onClose,
  onSave,
  initialData,
}: CreatePlatformDialogProps) => {
  const { t } = useTranslation();

  const handleSave = () => {
    // TODO: Implement platform creation/editing logic
    // This should validate and save the platform data
    onSave({
      id: initialData?.id || `platform-${Date.now()}`,
      name: initialData?.name || "New Platform",
      type: "platform",
      icon: initialData?.icon,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData
          ? t("presets.editPlatform", { defaultValue: "Edit Platform" })
          : t("presets.createPlatform", { defaultValue: "Create Platform" })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("presets.platformDialogDescription", {
            defaultValue: "Configure your platform preset settings.",
          })}
        </DialogContentText>
        {/* TODO: Add form fields for platform name, icon, etc. */}
      </DialogContent>
      <DialogActions>
        <DialogBtn onClick={onClose}>{t("common.cancel", { defaultValue: "Cancel" })}</DialogBtn>
        <DialogBtn onClick={handleSave}>
          <SaveRounded sx={{ mr: 0.5 }} />
          {t("common.save", { defaultValue: "Save" })}
        </DialogBtn>
      </DialogActions>
    </Dialog>
  );
};

interface AddPlatformButtonProps {
  onClick: () => void;
}

const AddPlatformButton = ({ onClick }: AddPlatformButtonProps) => {
  return (
    <Button
      variant="outlined"
      sx={{
        height: "80px",
        width: "80px",
        minWidth: "80px",
        borderRadius: 2,
        borderStyle: "dashed",
        "&:hover": {
          borderStyle: "dashed",
          transform: "scale(1.05)",
        },
        transition: "transform 0.2s",
      }}
      color="primary"
      onClick={onClick}
    >
      <AddRounded sx={{ fontSize: "44px" }} />
    </Button>
  );
};

// ==================== Main Component ====================

const Presets = () => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | undefined>(undefined);

  const handleAddPlatform = () => {
    setEditingPlatform(undefined);
    setIsDialogOpen(true);
  };

  const handleEditPlatform = (platform: Platform) => {
    setEditingPlatform(platform);
    setIsDialogOpen(true);
  };

  const handleSavePlatform = (platform: Platform) => {
    setUser((prevUser: User) => {
      const platforms = prevUser.platformsPreset || [];

      // Check if editing existing platform
      const existingIndex = platforms.findIndex((p) => p.id === platform.id);

      const updatedPlatforms =
        existingIndex >= 0
          ? platforms.map((p, index) => (index === existingIndex ? platform : p))
          : [...platforms, platform];

      return {
        ...prevUser,
        platformsPreset: updatedPlatforms,
      };
    });

    setIsDialogOpen(false);
    setEditingPlatform(undefined);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPlatform(undefined);
  };

  return (
    <Box>
      <TopBar title={t("common.presets", { defaultValue: "Presets" })} />

      <Box sx={{ p: 3 }}>
        <TabHeading>
          {t("presets.platformSection", { defaultValue: "Platform Presets" })}
        </TabHeading>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
          }}
        >
          {user.platformsPreset?.map((platform: Platform) => (
            <PlatformPresetItem
              key={platform.id}
              platform={platform}
              onClick={handleEditPlatform}
            />
          ))}
          <AddPlatformButton onClick={handleAddPlatform} />
        </Stack>
      </Box>

      <CreatePlatformDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSavePlatform}
        initialData={editingPlatform}
      />
    </Box>
  );
};

export default Presets;
