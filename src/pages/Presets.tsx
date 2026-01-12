import { useContext, useState, useEffect, useRef } from "react";
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
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { AddRounded, SaveRounded, ImageRounded, DeleteRounded } from "@mui/icons-material";

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

  const firstLetter = platform.name?.[0]?.toUpperCase() || "?";

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
        fontSize: "2rem",
        fontWeight: 600,
      }}
      variant="rounded"
      onClick={handleClick}
    >
      {!platform.icon && firstLetter}
    </Avatar>
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    iconUrl: "",
  });
  const [iconPreview, setIconPreview] = useState<string>("");
  const [errors, setErrors] = useState({
    name: false,
    iconUrl: false,
  });

  // Initialize form data when dialog opens or initialData changes
  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData?.name || "",
        iconUrl: initialData?.icon || "",
      });
      setIconPreview(initialData?.icon || "");
      setErrors({ name: false, iconUrl: false });
    }
  }, [open, initialData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, name: value }));
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handleIconUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, iconUrl: value }));
    setIconPreview(value);
    setErrors((prev) => ({ ...prev, iconUrl: false }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, iconUrl: true }));
        return;
      }

      // Create object URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, iconUrl: result }));
        setIconPreview(result);
        setErrors((prev) => ({ ...prev, iconUrl: false }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearIcon = () => {
    setFormData((prev) => ({ ...prev, iconUrl: "" }));
    setIconPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      iconUrl: false,
    };
    setErrors(newErrors);
    return !newErrors.name;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    onSave({
      id: initialData?.id || `platform-${Date.now()}`,
      name: formData.name.trim(),
      type: "platform",
      icon: formData.iconUrl || undefined,
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
        <DialogContentText sx={{ mb: 2 }}>
          {t("presets.platformDialogDescription", {
            defaultValue: "Configure your platform preset settings.",
          })}
        </DialogContentText>

        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Platform Name Input */}
          <TextField
            autoFocus
            required
            fullWidth
            label={t("presets.platformName", { defaultValue: "Platform Name" })}
            placeholder={t("presets.platformNamePlaceholder", {
              defaultValue: "e.g., Twitter, YouTube, Instagram",
            })}
            value={formData.name}
            onChange={handleNameChange}
            error={errors.name}
            helperText={
              errors.name
                ? t("presets.platformNameRequired", {
                    defaultValue: "Platform name is required",
                  })
                : ""
            }
          />

          {/* Icon Section */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("presets.platformIcon", { defaultValue: "Platform Icon" })}
            </Typography>

            {/* Icon Preview - Always show when there's a name */}
            {formData.name && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={iconPreview}
                    variant="rounded"
                    sx={{
                      width: 80,
                      height: 80,
                      fontSize: "2rem",
                      fontWeight: 600,
                    }}
                  >
                    {!iconPreview && formData.name[0]?.toUpperCase()}
                  </Avatar>
                  {iconPreview && (
                    <IconButton
                      onClick={handleClearIcon}
                      size="small"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: -12,
                        right: -12,
                        // transform: "translate(-50%, -50%)",
                        backgroundColor: "background.paper",
                        opacity: 0.7,
                        boxShadow: 1,
                        "&:hover": {
                          backgroundColor: "error.light",
                          color: "error.contrastText",
                        },
                      }}
                    >
                      <DeleteRounded fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            )}

            {/* Icon URL Input */}
            <TextField
              fullWidth
              label={t("presets.iconUrl", { defaultValue: "Icon URL" })}
              placeholder="https://example.com/icon.png"
              value={formData.iconUrl}
              onChange={handleIconUrlChange}
              error={errors.iconUrl}
              helperText={
                errors.iconUrl
                  ? t("presets.invalidImage", {
                      defaultValue: "Please provide a valid image",
                    })
                  : t("presets.iconUrlHelper", {
                      defaultValue: "Enter an image URL or upload a file below",
                    })
              }
              sx={{ mb: 1 }}
            />

            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <Button
              variant="outlined"
              startIcon={<ImageRounded />}
              onClick={handleUploadButtonClick}
              fullWidth
            >
              {t("presets.uploadIcon", { defaultValue: "Upload Icon" })}
            </Button>
          </Box>
        </Stack>
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
