import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { injectIntl, FormattedMessage } from "react-intl";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import {
  _currentViewComponents,
  _setCurrentViewComponents,
  _setShowLatestSongs,
  _showLatestSongs,
  _currentQuickAccessComponents,
  _setQuickAccessComponents,
  _showRichView,
  _setShowRichView,
  _foregroundNotification,
  _setForegroundNotification,
  _setUseActionMenu,
  _useActionMenu,
} from "@/components/settings";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Loader from "@/view/components/common/loader";
import { quickAccessTable } from "@/components/common/quickAccess";

interface S {
  isLoading: boolean;
  currentVersion: string[];
  quickAccess: string[];
  showLatestSongs: boolean;
  showRichView: boolean;
  foregroundNotification: boolean;
  useActionMenu: boolean;
}

interface P {
  intl: any;
  global: any;
}

class Settings extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      isLoading: false,
      currentVersion: _currentViewComponents().split(","),
      quickAccess: _currentQuickAccessComponents().split(","),
      showLatestSongs: _showLatestSongs(),
      showRichView: _showRichView(),
      useActionMenu: _useActionMenu(),
      foregroundNotification: _foregroundNotification(),
    };
  }

  indexOf = (needle: string): boolean => {
    return this.state.currentVersion.indexOf(needle) > -1;
  };

  indexOfQA = (needle: string): boolean => {
    return this.state.quickAccess.indexOf(needle) > -1;
  };

  changeQA =
    (value: string) =>
    (_e: React.ChangeEvent<HTMLInputElement>): void => {
      let p = Array.from(this.state.quickAccess);
      if (this.indexOfQA(value)) {
        p = p.filter((v) => v !== value);
      } else {
        p.push(value);
      }
      return this.setState({ quickAccess: _setQuickAccessComponents(p) });
    };

  changeView =
    (value: string) =>
    (_e: React.ChangeEvent<HTMLInputElement>): void => {
      let p = Array.from(this.state.currentVersion);
      if (this.indexOf(value)) {
        p = p.filter((v) => v !== value);
      } else {
        p.push(value);
      }
      return this.setState({ currentVersion: _setCurrentViewComponents(p) });
    };

  render() {
    const { isLoading, showLatestSongs, showRichView, foregroundNotification, useActionMenu } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <Container fixed style={{ padding: 0 }}>
        <Paper style={{ padding: "15px" }}>
          <FormControl fullWidth>
            <FormLabel component="legend">
              <FormattedMessage id="Settings.View" />
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.indexOf("last")} onChange={this.changeView("last")} value="last" />}
                label={<FormattedMessage id="Settings.ViewLastScoreUpdate" />}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.indexOf("djLevel")} onChange={this.changeView("djLevel")} value="djLevel" />}
                label={<FormattedMessage id="Settings.ViewDJLevel" />}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.indexOf("estRank")} onChange={this.changeView("estRank")} value="estRank" />}
                label={<FormattedMessage id="Settings.ViewEstimatedRank" />}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.indexOf("lastVer")} onChange={this.changeView("lastVer")} value="lastVer" />}
                label={<FormattedMessage id="Settings.ViewLastVersionScoreUpdate" />}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.indexOf("percentage")} onChange={this.changeView("percentage")} value="percentage" />}
                label={<FormattedMessage id="Settings.ViewSingleSongScoreRate" />}
              />
            </FormGroup>
          </FormControl>
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.View1" />
            <br />
            <FormattedMessage id="Settings.View2" />
            <br />
            <FormattedMessage id="Settings.ViewOverlapWarning" />
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <FormLabel component="legend">
            <FormattedMessage id="Settings.SongListDisplay" />
          </FormLabel>
          <Switch
            checked={showLatestSongs}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (typeof e.target.checked === "boolean") {
                _setShowLatestSongs(e.target.checked);
                return this.setState({ showLatestSongs: e.target.checked });
              }
            }}
          />
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.ShowLatestSongsDescription1" />
            <br />
            <FormattedMessage id="Settings.ShowLatestSongsDescription2" />
            <br />
            <br />
            <FormattedMessage id="Settings.ShowLatestSongsDescription3" />
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <FormControl fullWidth>
            <FormLabel component="legend">
              <FormattedMessage id="Settings.QuickAccess" />
            </FormLabel>
            {quickAccessTable.map((item: any) => {
              return (
                <FormGroup key={item.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.indexOfQA(item.com)}
                        onChange={this.changeQA(item.com)}
                        value={item.com}
                      />
                    }
                    label={item.name}
                  />
                </FormGroup>
              );
            })}
          </FormControl>
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.QuickAccessDescription1" />
            <br />
            <FormattedMessage id="Settings.QuickAccessDescription2" />
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <FormLabel component="legend">
            <FormattedMessage id="Settings.ActionMenu" />
          </FormLabel>
          <Switch
            checked={useActionMenu}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (typeof e.target.checked === "boolean") {
                _setUseActionMenu(e.target.checked);
                return this.setState({ useActionMenu: e.target.checked });
              }
            }}
          />
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.ActionMenuDescription" />
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <FormLabel component="legend">
            <FormattedMessage id="Settings.RichView" />
          </FormLabel>
          <Switch
            checked={showRichView}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (typeof e.target.checked === "boolean") {
                _setShowRichView(e.target.checked);
                return this.setState({ showRichView: e.target.checked });
              }
            }}
          />
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.RichViewDescription1" />
            <br />
            <FormattedMessage id="Settings.RichViewDescription2" />
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <FormLabel component="legend">
            <FormattedMessage id="Settings.ForegroundNotification" />
          </FormLabel>
          <Switch
            checked={foregroundNotification}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (typeof e.target.checked === "boolean") {
                _setForegroundNotification(e.target.checked);
                return this.setState({ foregroundNotification: e.target.checked });
              }
            }}
          />
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.ForegroundNotificationDescription" />
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default injectIntl(Settings);
