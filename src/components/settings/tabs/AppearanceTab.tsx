import { useContext, useEffect, useState } from "react";
import CustomRadioGroup from "../CustomRadioGroup";
import {
  SectionDescription,
  SectionHeading,
  StyledMenuItem,
  StyledSelect,
} from "../settings.styled";
import { UserContext } from "../../../contexts/UserContext";
import {
  BrightnessAutoRounded,
  DarkModeRounded,
  ExpandMoreRounded,
  LightModeRounded,
  MotionPhotosAutoRounded,
  MotionPhotosOffRounded,
  PersonalVideoRounded,
} from "@mui/icons-material";
import type { DarkModeOptions, ReduceMotionOption } from "../../../types/user";
import { SelectChangeEvent } from "@mui/material";
import { OPTION_ICON_SIZE } from "../settingsConstants";
import type { OptionItem } from "../settingsTypes";
import CustomSwitch from "../CustomSwitch";
import { useSystemTheme } from "../../../hooks/useSystemTheme";
import { Themes } from "../../../theme/createTheme";
import { ColorElement } from "../../../styles";
import { useTranslation } from "react-i18next";

const darkModeOptions: OptionItem<DarkModeOptions>[] = [
  {
    label: "Auto",
    value: "auto",
    icon: <BrightnessAutoRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
  {
    label: "System",
    value: "system",
    icon: <PersonalVideoRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
  {
    label: "Light",
    value: "light",
    icon: <LightModeRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
  {
    label: "Dark",
    value: "dark",
    icon: <DarkModeRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
];

const reduceMotionOptions: OptionItem<ReduceMotionOption>[] = [
  {
    label: "System",
    value: "system",
    icon: <PersonalVideoRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
  {
    label: "Always",
    value: "on",
    icon: <MotionPhotosOffRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
  {
    label: "Never",
    value: "off",
    icon: <MotionPhotosAutoRounded sx={{ fontSize: OPTION_ICON_SIZE }} />,
  },
];

export default function AppearanceTab() {
  const { user, setUser } = useContext(UserContext);
  const [darkModeValue, setDarkModeValue] = useState<DarkModeOptions>(user.darkmode);
  const [reduceMotionValue, setReduceMotionValue] = useState<ReduceMotionOption>(
    user.settings.reduceMotion,
  );

  const systemTheme = useSystemTheme();
  const { t } = useTranslation();

  // update local state when user settings change (e.g. after P2P sync)
  useEffect(() => {
    setDarkModeValue(user.darkmode);
  }, [user.darkmode, user.emojisStyle]);

  const handleAppThemeChange = (event: SelectChangeEvent<unknown>) => {
    const selectedTheme = event.target.value as string;
    setUser((prevUser) => ({
      ...prevUser,
      theme: selectedTheme,
    }));
  };

  return (
    <>
      <SectionHeading>{t("Dark Mode Options")}</SectionHeading>
      <CustomRadioGroup
        options={darkModeOptions}
        value={darkModeValue}
        onChange={(val) => {
          setDarkModeValue(val);
          setUser((prevUser) => ({
            ...prevUser,
            darkmode: val,
          }));
        }}
      />
      <SectionHeading>{t("Theme Selection")}</SectionHeading>
      <StyledSelect
        value={user.theme}
        onChange={handleAppThemeChange}
        IconComponent={ExpandMoreRounded}
      >
        <StyledMenuItem value="system">
          <PersonalVideoRounded />
          &nbsp; System ({systemTheme === "dark" ? Themes[0].name : Themes[1].name})
        </StyledMenuItem>
        {Themes.map((theme) => (
          <StyledMenuItem key={theme.name} value={theme.name}>
            <ColorElement
              tabIndex={-1}
              clr={theme.MuiTheme.palette.primary.main}
              secondClr={theme.MuiTheme.palette.secondary.main}
              aria-label={`Change theme - ${theme.name}`}
              size="24px"
              disableHover
            />
            &nbsp;
            {theme.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      <SectionHeading>{t("Reduce Motion Options")}</SectionHeading>
      <SectionDescription>
        {t("Reduce animations and transitions for a more stable experience.")}
      </SectionDescription>
      <CustomRadioGroup
        options={reduceMotionOptions}
        value={reduceMotionValue}
        onChange={(val) => {
          setReduceMotionValue(val);
          setUser((prevUser) => ({
            ...prevUser,
            settings: {
              ...prevUser.settings,
              reduceMotion: val,
            },
          }));
        }}
      />
      <CustomSwitch
        settingKey="enableGlow"
        header={t("Enable Glow Effect")}
        text={t("Add a soft glow to tasks for better visibility.")}
      />
    </>
  );
}
