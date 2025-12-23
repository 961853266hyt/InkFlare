import { systemInfo } from "../../../utils";
import CustomSwitch from "../CustomSwitch";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../LanguageSwitch";

export default function GeneralTab() {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitch />
      <CustomSwitch
        settingKey="enableCategories"
        header={t("enableCategories")}
        text={t("enableCategories")}
      />
      <CustomSwitch
        settingKey="appBadge"
        header={t("App Badge")}
        text={t("Show a badge on the PWA icon to indicate the number of not done tasks.")}
        disabled={!systemInfo.isPWA || !("setAppBadge" in navigator)}
        disabledReason={t(
          "This feature requires the app to be installed as a PWA and supported by your browser.",
        )}
      />
      <CustomSwitch
        settingKey="doneToBottom"
        header={t("Completed Tasks at Bottom")}
        text={t(
          "Move completed tasks to the bottom of the list to keep your active tasks more visible.",
        )}
      />
      <CustomSwitch
        settingKey="showProgressBar"
        header={t("Show Progress Bar")}
        text={t(
          "Display a progress bar at the top of the screen to visualize your task completion.",
        )}
      />
    </>
  );
}
