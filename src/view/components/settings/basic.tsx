import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FormattedMessage, injectIntl } from "react-intl";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { Subscribe } from "unstated";
import GlobalContainer from "@/components/context/global";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import {
  _currentVersion,
  _currentDefinitionURL,
  _setCurrentDefinitionURL,
  _setAutoSync,
  _autoSync,
  _weeklyRanking,
} from "@/components/settings";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Switch from "@mui/material/Switch";
import { area } from "@/config";
import TextField from "@mui/material/TextField";
import { Link as RefLink } from "@mui/material/";
import Loader from "@/view/components/common/loader";
import { updateDefFile } from "@/components/settings/updateDef";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LoadingButton from "@mui/lab/LoadingButton";
import SSelector from "@/partial/select";
import { versionTitles } from "@/components/common/versions";

interface S {
  isLoading: boolean;
  disableUpdateBtn: boolean;
  disableDeleteBtn: boolean;
  currentVersion: string;
  message: string;
  message2: string;
  currentResetStore: string;
  isDialogOpen: boolean;
  isURLDialogOpen: boolean;
  autoSync: boolean;
  weeklyRanking: boolean;
}

interface P {
  intl: any;
  global: any;
}

class Settings extends React.Component<P, S> {
  ref: React.MutableRefObject<any> | null = null;

  constructor(props: P) {
    super(props);
    this.state = {
      isLoading: false,
      disableUpdateBtn: false,
      currentVersion: _currentVersion(),
      message: "",
      message2: "",
      currentResetStore: "27",
      disableDeleteBtn: false,
      isDialogOpen: false,
      isURLDialogOpen: false,
      autoSync: _autoSync(),
      weeklyRanking: _weeklyRanking(),
    };
  }

  toggleURLDialog = () =>
    this.setState({ isURLDialogOpen: !this.state.isURLDialogOpen });

  changeDefinitionURL = (url: string): void => {
    return _setCurrentDefinitionURL(url);
  };

  updateDef = async () => {
    const end = () => {
      this.props.global.setMove(false);
    };
    try {
      this.props.global.setMove(true);
      this.setState({ disableUpdateBtn: true, message: "" });
      const updater = await updateDefFile(this.ref, true);
      end();
      this.setState({
        currentVersion: updater.newVersion,
        disableUpdateBtn: false,
        message: updater.message,
      });
    } catch (e: any) {
      console.log(e);
      this.setState({
        disableUpdateBtn: false,
        message: "更新に失敗しました:" + e.message,
      });
    }
    end();
    return;
  };

  render() {
    const {
      isLoading,
      isURLDialogOpen,
      disableUpdateBtn,
      message,
      autoSync,
      weeklyRanking,
    } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <Subscribe to={[GlobalContainer]}>
        {({
          state,
          setLang,
          setStore,
          setTheme,
          setIsSingle,
          setGoalBPI,
          setGoalPercentage,
          setArea,
        }: GlobalContainer) => (
          <Container fixed style={{ padding: 0 }}>
            <Paper style={{ padding: "15px" }}>
              <SSelector
                title={<FormattedMessage id="Settings.language" />}
                currentState={state.lang}
                func={(e: SelectChangeEvent<string>) => {
                  if (typeof e.target.value === "string") {
                    setLang(e.target.value);
                  }
                }}
                items={[
                  { key: "ja", value: "日本語" },
                  { key: "en", value: "English" },
                ]}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.noteLang" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <SSelector
                title={<FormattedMessage id="Settings.theme" />}
                currentState={state.theme}
                func={(e: SelectChangeEvent<string>) => {
                  if (typeof e.target.value === "string") {
                    setTheme(e.target.value);
                  }
                }}
                items={[
                  { key: "light", value: "Light" },
                  { key: "dark", value: "Dark" },
                  { key: "deepsea", value: "DeepSea" },
                ]}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.Themes" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <SSelector
                title={<FormattedMessage id="Settings.dataStore" />}
                currentState={state.store}
                func={(e: SelectChangeEvent<string>) => {
                  if (typeof e.target.value === "string") {
                    setStore(e.target.value);
                  }
                }}
                items={versionTitles.reduce(
                  (array: { key: string; value: any }[], item) => {
                    if (!array) array = [] as { key: string; value: any }[];
                    array.push({ key: item.num, value: item.title });
                    return array;
                  },
                  []
                )}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.noteMes1" />
              </Typography>
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.inaccurateMes" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography
                variant="caption"
                display="block"
                className="MuiFormLabel-root MuiInputLabel-animated MuiInputLabel-shrink"
              >
                Auto-sync
              </Typography>
              <Switch
                checked={autoSync}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (typeof e.target.checked === "boolean") {
                    _setAutoSync(e.target.checked);
                    return this.setState({
                      autoSync: e.target.checked,
                      weeklyRanking: e.target.checked ? weeklyRanking : false,
                    });
                  }
                }}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.AutoSync1" />
                <br />
                <FormattedMessage id="Settings.AutoSync2" />
                <br />
                <FormattedMessage id="Settings.AutoSync3" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography
                variant="caption"
                display="block"
                className="MuiFormLabel-root MuiInputLabel-animated MuiInputLabel-shrink"
              >
                <FormattedMessage id="Settings.DPMode" />
                (beta)
              </Typography>
              <Switch
                checked={state.isSingle === 0 ? true : false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (typeof e.target.checked === "boolean") {
                    setIsSingle(e.target.checked === true ? 0 : 1);
                  }
                }}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.dpDescription" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <TextField
                value={state.goalBPI}
                label={<FormattedMessage id="Settings.MyGoalBPI" />}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (typeof e.target.value === "string") {
                    setGoalBPI(
                      Number(e.target.value) > 100
                        ? 100
                        : Number(e.target.value)
                    );
                  }
                }}
                style={{ margin: "0 0 5px 0", width: "100%" }}
              />
              <TextField
                value={state.goalPercentage}
                label={<FormattedMessage id="Settings.MyGoalPercentage" />}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (typeof e.target.value === "string") {
                    setGoalPercentage(
                      Number(e.target.value) > 100
                        ? 100
                        : Number(e.target.value)
                    );
                  }
                }}
                style={{ margin: "0 0 5px 0", width: "100%" }}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.MyGoalDescription" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <FormControl>
                <Typography
                  variant="caption"
                  display="block"
                  className="MuiFormLabel-root MuiInputLabel-animated MuiInputLabel-shrink"
                >
                  <FormattedMessage id="Settings.Update" />
                </Typography>
                <div style={{ position: "relative" }}>
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    onClick={this.updateDef}
                    loading={disableUpdateBtn}
                    loadingPosition="start"
                    disabled={disableUpdateBtn}
                    startIcon={<UpdateIcon />}
                  >
                    <FormattedMessage id="Settings.UpdateResourcePacks" />
                  </LoadingButton>
                </div>
              </FormControl>
              <Typography variant="caption" display="block">
                {message}
                <span ref={this.ref} id="_progressText" />
              </Typography>
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.currentVersion" />
                {this.state.currentVersion}
              </Typography>
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.updateWarning" />
                <br />
                <RefLink
                  component="a"
                  onClick={this.toggleURLDialog}
                  color="secondary"
                >
                  <FormattedMessage id="Settings.defFileURLButton" />
                </RefLink>
              </Typography>
              <Typography variant="caption" display="block">
                <RefLink
                  color="secondary"
                  href="https://github.com/BPIManager/BPIM-Scores/issues/"
                >
                  <FormattedMessage id="Settings.reportDefinitionError" />
                </RefLink>
              </Typography>
              {isURLDialogOpen && (
                <URLDialog
                  isDialogOpen={isURLDialogOpen}
                  exec={this.changeDefinitionURL}
                  close={this.toggleURLDialog}
                />
              )}
              <Divider style={{ margin: "10px 0" }} />
              <SSelector
                title={<FormattedMessage id="Settings.AreaTitle" />}
                currentState={state.area}
                func={(e: SelectChangeEvent<number>) => {
                  if (typeof e.target.value === "number") {
                    setArea(e.target.value);
                  }
                }}
                items={area.reduce(
                  (array: { key: number; value: any }[], item, i) => {
                    if (!array) array = [] as { key: number; value: any }[];
                    array.push({ key: i, value: item });
                    return array;
                  },
                  []
                )}
              />
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.Area" />
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <FormControl>
                <Typography
                  variant="caption"
                  display="block"
                  className="MuiFormLabel-root MuiInputLabel-animated MuiInputLabel-shrink"
                >
                  <FormattedMessage id="Settings.clearCache" />
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (navigator) {
                      navigator.serviceWorker
                        .getRegistration()
                        .then((registration) => {
                          if (registration) {
                            registration.unregister();
                            alert(
                              this.props.intl.formatMessage({ id: "Settings.cacheCleared" })
                            );
                          } else {
                            alert(
                              this.props.intl.formatMessage({ id: "Settings.noDataToDelete" })
                            );
                          }
                        });
                    }
                  }}
                  disabled={disableUpdateBtn}
                  startIcon={<AutorenewIcon />}
                >
                  <FormattedMessage id="Settings.clearCache" />
                </Button>
              </FormControl>
              <Typography variant="caption" display="block">
                <FormattedMessage id="Settings.clearCacheDescription" />
              </Typography>
            </Paper>
          </Container>
        )}
      </Subscribe>
    );
  }
}

export default injectIntl(Settings);

interface UP {
  isDialogOpen: boolean;
  exec: (url: string) => void;
  close: () => void;
}

class URLDialog extends React.Component<UP, { url: string }> {
  constructor(props: UP) {
    super(props);
    this.state = {
      url: _currentDefinitionURL(),
    };
  }

  handleOk = () => {
    this.props.exec(this.state.url);
    this.props.close();
  };

  handleClose = () => {
    this.props.close();
  };

  render() {
    const { isDialogOpen } = this.props;
    return (
      <div>
        <Dialog open={isDialogOpen} onClose={this.handleClose}>
          <DialogTitle>定義URLの変更</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage id="Settings.ChangeDefinitionURL" />
              <RefLink
                color="secondary"
                href="https://docs2.poyashi.me/other/def/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FormattedMessage id="Settings.ChangeDefinitionURL2" />
              </RefLink>
              <FormattedMessage id="Settings.ChangeDefinitionURL3" />
              <br />
              <FormattedMessage id="Settings.ChangeDefinitionURL4" />
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="定義データURL"
              type="text"
              value={this.state.url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ url: e.target.value })
              }
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="secondary" autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
