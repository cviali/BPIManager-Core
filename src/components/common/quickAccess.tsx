import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import PeopleIcon from "@mui/icons-material/People";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { FormattedMessage } from "react-intl";

export const quickAccessTable = [
  {
    name: <FormattedMessage id="QuickAccess.Camera" />,
    com: "camera",
    icon: <CameraAltIcon />,
    href: "/camera",
  },
  {
    name: <FormattedMessage id="QuickAccess.Import" />,
    com: "import",
    icon: <SaveAltIcon />,
    href: "/data",
  },
  {
    name: <FormattedMessage id="QuickAccess.Songs" />,
    com: "songs",
    icon: <QueueMusicIcon />,
    href: "/songs",
  },
  {
    name: <FormattedMessage id="QuickAccess.Rival" />,
    com: "rival",
    icon: <PeopleIcon />,
    href: "/rivals",
  },
  {
    name: <FormattedMessage id="QuickAccess.Sync" />,
    com: "sync",
    icon: <SyncProblemIcon />,
    href: "/sync/settings",
  },
  {
    name: <FormattedMessage id="QuickAccess.Stats" />,
    com: "stats",
    icon: <TrendingUpIcon />,
    href: "/stats",
  },
  {
    name: <FormattedMessage id="QuickAccess.List" />,
    com: "list",
    icon: <BookmarkIcon />,
    href: "/lists",
  },
  {
    name: <FormattedMessage id="QuickAccess.AAATable" />,
    com: "aaatable",
    icon: <WbIncandescentIcon />,
    href: "/AAATable",
  },
  {
    name: <FormattedMessage id="QuickAccess.Compare" />,
    com: "compare",
    icon: <FilterNoneIcon />,
    href: "/compare",
  },
  {
    name: <FormattedMessage id="QuickAccess.Notes" />,
    com: "notes",
    icon: <SpeakerNotesIcon />,
    href: "/notes",
  },
  {
    name: <FormattedMessage id="QuickAccess.Ranking" />,
    com: "ranking",
    icon: <EventNoteIcon />,
    href: "/ranking/",
  },
];
