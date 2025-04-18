import { config } from "@/config";
import { versionConverter } from "@/components/common/versions";

export const _isSingle = () => {
  return !localStorage.getItem("isSingle") ||
    localStorage.getItem("isSingle") === "1" ||
    localStorage.getItem("isSingle") === "true"
    ? 1
    : 0;
};

export const _currentStore = () => {
  return localStorage.getItem("currentStore") || config.latestStore;
};

export const _lang = () => {
  return localStorage.getItem("lang") || "ja";
};

export const _currentVersion = () => {
  return localStorage.getItem("lastDefFileVer") || "-undefined";
};

export const _goalBPI = () => {
  return Number(localStorage.getItem("goalBPI")) || 0;
};

export const _goalPercentage = () => {
  return Number(localStorage.getItem("goalPercentage")) || 0;
};

export const _currentTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const _area = () => {
  return Number(localStorage.getItem("area")) || 0;
};

export const _showLatestSongs = () => {
  return localStorage.getItem("showLatestSongs") === "true";
};

export const _setShowLatestSongs = (newState: boolean) => {
  return localStorage.setItem("showLatestSongs", String(newState));
};

export const _currentViewComponents = () => {
  return localStorage.getItem("viewComponents") || "last,djLevel";
};

export const _useActionMenu = () => {
  const current = localStorage.getItem("useActionMenu");
  if (!current) return true;
  return current === "true";
};

export const _currentQuickAccessComponents = () => {
  return (
    localStorage.getItem("quickAccess") || "camera,import,songs,rival,sync"
  );
};

export const _currentBPIDefinition = () => {
  return Number(localStorage.getItem("BPIDefinition")) || 1;
};

export const _currentDefaultPage = () => {
  return localStorage.getItem("defaultPage") || "home";
};

export const _setDefaultPage = (url: string = defaultURL) => {
  return localStorage.setItem("defaultPage", url);
};

export const _traditionalMode = () => {
  return Number(localStorage.getItem("traditionalMode")) || 0;
};

export const _setQuickAccessComponents = (array: string[]): string[] => {
  array = array.filter((x, i, self) => self.indexOf(x) === i && x !== "none");
  if (array.length === 0) {
    array.push("none");
  }
  localStorage.setItem("quickAccess", array.join());
  return array;
};

export const _setCurrentViewComponents = (array: string[]): string[] => {
  array = array.filter((x, i, self) => self.indexOf(x) === i && x !== "none");
  if (array.length === 0) {
    array.push("none");
  }
  localStorage.setItem("viewComponents", array.join());
  return array;
};

const defaultURL = "https://bpim.msqkn310.workers.dev/release";

export const _currentDefinitionURL = () => {
  return localStorage.getItem("defURL") || defaultURL;
};

export const _setCurrentDefinitionURL = (url: string = defaultURL) => {
  return localStorage.setItem("defURL", url);
};

export const _autoSync = () => {
  return localStorage.getItem("autoSync") ? true : false;
};

export const _setAutoSync = (isEnable: boolean) => {
  if (!isEnable) {
    _setWeeklyRanking(false);
  }
  return isEnable
    ? localStorage.setItem("autoSync", "true")
    : localStorage.removeItem("autoSync");
};

export const _setTraditionalMode = (newState: number = 0) => {
  return localStorage.setItem("traditionalMode", String(newState));
};

export const _currentStoreWithFullName = () => {
  const t: string = localStorage.getItem("currentStore") || config.latestStore;
  return versionConverter[t]
};

export const _weeklyRanking = () => {
  return localStorage.getItem("weeklyRanking") ? true : false;
};

export const _setWeeklyRanking = (isEnable: boolean) => {
  return isEnable
    ? localStorage.setItem("weeklyRanking", "true")
    : localStorage.removeItem("weeklyRanking");
};

export const _showRichView = () => {
  return localStorage.getItem("showRichView") === "true";
};

export const _setShowRichView = (newState: boolean) => {
  return localStorage.setItem("showRichView", String(newState));
};

export const _setUseActionMenu = (newState: boolean) => {
  return localStorage.setItem("useActionMenu", String(newState));
};

export const _setForegroundNotification = (newState: boolean) => {
  return localStorage.setItem("foregroundNotification", String(newState));
};

export const _foregroundNotification = () => {
  return localStorage.getItem("foregroundNotification") === "true";
};

export const _lastSyncDate = () => {
  return (
    localStorage.getItem(
      "lastSyncDate_" + _currentStore() + "." + _isSingle()
    ) || ""
  );
};

export const _setLastSyncDate = (date: string) => {
  return localStorage.setItem(
    "lastSyncDate_" + +_currentStore() + "." + _isSingle(),
    date
  );
};

export const _chartColor = () => {
  const c = _currentTheme();
  if (c === "dark" || c === "deepsea") {
    return "#eeeeee";
  }
  if (c === "light") {
    return "#666666";
  }
};

export const _chartBarColor = (name: string) => {
  const c = _currentTheme();
  if (c === "light") {
    if (name === "YOU" || name === "RIVAL") {
      return "#B8906D";
    } else if (name === "line") {
      return "#967e62";
    } else if (name === "line2") {
      return "#8095ff";
    } else if (name === "line3") {
      return "#ff7979";
    } else if (name === "line4") {
      return "#7ee7ff";
    } else if (name === "bar") {
      return "#B8906D";
    } else {
      return "#E0D9D0";
    }
  }
  if (c === "dark") {
    if (name === "YOU" || name === "RIVAL") {
      return "#00E3CC";
    } else if (name === "line") {
      return "#00635A";
    } else if (name === "line2") {
      return "#8095ff";
    } else if (name === "line3") {
      return "#ff7979";
    } else if (name === "line4") {
      return "#7ee7ff";
    } else if (name === "bar") {
      return "#009688";
    } else {
      return "#015951";
    }
  }
  if (c === "deepsea") {
    if (name === "YOU" || name === "RIVAL") {
      return "#3E38F2";
    } else if (name === "line") {
      return "#5C73F2";
    } else if (name === "line2") {
      return "#4aff47";
    } else if (name === "line3") {
      return "#ff7a47";
    } else if (name === "line4") {
      return "#45ffee";
    } else {
      return "#829FD9";
    }
  }
};

export const pieColor = (i: number) => {
  const c = _currentTheme();
  let def = [0, 0, 0, 0];
  if (c === "light") {
    def = [148, 51, 0, 1];
  }
  if (c === "dark") {
    def = [200, 200, 200, 1];
  }
  if (c === "deepsea") {
    def = [92, 115, 242, 1];
  }
  const perf = (100 - (c === "light" ? i : 5 - i) * 10) / 100;
  return `rgba(${def[0]},${def[1]},${def[2]},${def[3] * perf})`;
};

export const buttonTextColor = () => {
  const c = _currentTheme();
  if (c !== "light") {
    return "#fff";
  }
  return "#222";
};

export const _currentGreenPreference = () => {
  return Number(localStorage.getItem("greenPreference")) || 0;
};

export const _setGreenPreference = (item: string) => {
  return localStorage.setItem("greenPreference", item);
};
