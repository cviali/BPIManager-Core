import React, { useState } from "react";
import { songData } from "@/types/data";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Filter1Icon from "@mui/icons-material/Filter1";
import Button from "@mui/material/Button";
import { _area, _isSingle, _currentStore } from "@/components/settings";
import { difficultyDiscriminator } from "@/components/songs/filter";
import { FormattedMessage } from "react-intl";

const JumpWeb: React.FC<{
  song: songData;
  onlyList?: boolean;
}> = ({ song, onlyList }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const jumpWeb = async (type: number): Promise<void> => {
    if (!song) return;
    switch (type) {
      case 0:
        window.open("http://textage.cc/score/" + song.textage);
        break;
      case 1:
        window.open("https://www.youtube.com/results?search_query=" + song.title.replace(/-/g, "") + "+IIDX");
        break;
      case 2:
        window.open(`https://rank.poyashi.me/songDetail/${encodeURIComponent(song.title)}/${difficultyDiscriminator(song.difficulty)}/${_currentStore()}`);
        break;
    }
    return setOpenMenu(!openMenu);
  };

  const list = (
    <List>
      {[
        {
          title: "TexTage",
          icon: <FormatListBulletedIcon />,
          func: () => jumpWeb(0),
          text: <FormattedMessage id="JumpWeb.TexTageDescription" />,
        },
        {
          title: "YouTube",
          icon: <YouTubeIcon />,
          func: () => jumpWeb(1),
          text: <FormattedMessage id="JumpWeb.YouTubeDescription" />,
        },
        {
          title: "BPIMRanks",
          icon: <StarHalfIcon />,
          func: () => jumpWeb(2),
          text: <FormattedMessage id="JumpWeb.BPIMRanksDescription" />,
        },
      ].map((item, key: number) => (
        <ListItem button onClick={item.func} key={key}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} secondary={item.text} />
        </ListItem>
      ))}
      <form method="post" name="rivalSearch" action={"https://p.eagate.573.jp/game/2dx/" + _currentStore() + "/ranking/topranker.html#musiclist"}>
        <input type="hidden" name="pref_id" value={_area()} />
        <input type="hidden" name="play_style" value={_isSingle() === 1 ? "0" : "1"} />
        <input type="hidden" name="series_id" value={Number(song["textage"].replace(/\/.*?$/, "")) - 1} />
        <input type="hidden" name="s" value="1" />
        <input type="hidden" name="rival" value="" />
        <Button color="inherit" type="submit" fullWidth disableRipple style={{ padding: 0 }}>
          <ListItem button>
            <ListItemIcon>
              <Filter1Icon />
            </ListItemIcon>
            <ListItemText
              primary="TOP RANKER"
              secondary={<FormattedMessage id="JumpWeb.TopRankerDescription" />}
            />
          </ListItem>
        </Button>
      </form>
    </List>
  );

  if (onlyList) return list;

  return (
    <Grid
      item
      xs={1}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip title="外部サイト連携">
        <IconButton style={{ margin: "0 6px 0", position: "relative", top: "5px" }} aria-haspopup="true" onClick={() => setOpenMenu(true)} size="large">
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer anchor="bottom" className="overlayDrawer" open={openMenu} onClose={() => setOpenMenu(false)} onOpen={() => setOpenMenu(true)}>
        {list}
      </SwipeableDrawer>
    </Grid>
  );
};

export default JumpWeb;
