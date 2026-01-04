import React, { useContext } from "react";
import { Box, Switch, Typography, FormControlLabel, FormGroup } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import type { Language } from "../../types/user";

const LanguageSwitch: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { i18n } = useTranslation();

  const isZhCN = user.settings.language === "zh-CN";

  const handleToggle = () => {
    const newLanguage: Language = isZhCN ? "en" : "zh-CN";

    const updatedSettings = {
      ...user.settings,
      language: newLanguage,
    };
    setUser((prev) => ({ ...prev, settings: updatedSettings }));

    i18n.changeLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  return (
    <Box sx={{ my: 2, mx: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", fontSize: "16px" }}>
          {isZhCN ? "简体中文 / English" : "English / 简体中文"}
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isZhCN}
                onChange={handleToggle}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleToggle();
                  }
                }}
              />
            }
            label=""
          />
        </FormGroup>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0 }}>
        {isZhCN ? "切换应用界面语言 Switch app language" : "Switch app language 切换应用界面语言"}
      </Typography>
    </Box>
  );
};

export default LanguageSwitch;
