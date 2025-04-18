import React from "react";
import { favsDB } from "@/components/indexedDB";
import Loader from "@/view/components/common/loader";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { DBLists } from "@/types/lists";
import { alternativeImg } from "@/components/common";
import Container from "@mui/material/Container";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { injectIntl, WrappedComponentProps } from "react-intl";
import * as H from "history";
import ListAdd from "./add";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { listNobi11, listNobi12 } from "@/components/lists";
import { UserIcon } from "@/view/components/common/icon";
import { FormattedMessage } from "react-intl";

interface S {
  isLoading: boolean;
  lists: any[];
  addList: boolean;
  currentTarget: number;
  message: string;
  showSnackBar: boolean;
  checked: boolean;
}
class FavLists extends React.Component<{} & RouteComponentProps & WrappedComponentProps, S> {
  constructor(props: {} & RouteComponentProps & WrappedComponentProps) {
    super(props);
    this.state = {
      isLoading: true,
      lists: [],
      addList: false,
      currentTarget: -1,
      message: "",
      showSnackBar: false,
      checked: localStorage.getItem("hideDefaultLists") === "true",
    };
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    await this.updateData();
  }

  async updateData() {
    try {
      const db = new favsDB();
      const res = await db.getAllLists();
      this.setState({
        isLoading: false,
        lists: this.state.checked ? res : [listNobi11, listNobi12].concat(res),
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  toggleAddListScreen = (reload: boolean = false) => {
    if (reload) {
      this.updateData();
    }
    this.setState({ addList: !this.state.addList, currentTarget: -1 });
  };

  toggleEditListScreen = (target: number) => {
    this.setState({ addList: !this.state.addList, currentTarget: target });
  };
  toggleSnack = (message: string = "リストを追加しました") =>
    this.setState({ message: message, showSnackBar: !this.state.showSnackBar });

  handleChange = (_e: React.ChangeEvent, checked: boolean) => {
    localStorage.setItem("hideDefaultLists", String(checked));
    this.setState({ checked: checked });
    this.updateData();
  };

  render() {
    const { isLoading, lists, addList, currentTarget } = this.state;

    if (isLoading) {
      return <Loader />;
    }
    return (
      <Container fixed className="commonLayout">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checked}
                  onChange={this.handleChange}
                  name={this.props.intl.formatMessage({
                    id: "Lists.HideDefaultLists",
                  })}
                  color="primary"
                />
              }
              label={<FormattedMessage id="Lists.HideDefaultLists" />}
            />
          </FormControl>
        </div>
        <List>
          {lists.map((item, i) => {
            return (
              <div key={i}>
                <ListComponent
                  key={i}
                  data={item}
                  history={this.props.history}
                  toggleEditListScreen={this.toggleEditListScreen}
                />
                {i !== lists.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </div>
            );
          })}
        </List>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={() => this.toggleAddListScreen()}
        >
          <FormattedMessage id="Lists.CreateNewList" />
        </Button>
        {addList && (
          <ListAdd
            isCreating={currentTarget === -1}
            target={currentTarget}
            toggleSnack={this.toggleSnack}
            handleToggle={this.toggleAddListScreen}
          />
        )}
      </Container>
    );
  }
}

interface CP {
  data: DBLists;
  toggleEditListScreen: (target: number) => void;
  history: H.History;
}

class ListComponent extends React.Component<CP, {}> {
  render() {
    const { data } = this.props;
    const text = (
      <span>
        {data.description || <FormattedMessage id="Lists.NoDescription" />}
        {data.updatedAt !== "-1" && (
          <span>
            <br />
            <FormattedMessage id="Lists.LastUpdated" />: {data.updatedAt}
          </span>
        )}
      </span>
    );
    return (
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <UserIcon
              defaultURL={data.icon}
              text={data.title}
              altURL={alternativeImg(data.title)}
              style={{ objectFit: "cover" }}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            `${data.title}` + (data.length !== -1 ? `(${data.length})` : "")
          }
          secondary={text}
          onClick={() => this.props.history.push("/lists/" + data.num)}
        />
        {data.length !== -1 && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={() => this.props.toggleEditListScreen(data.num)}
              size="large"
            >
              <SettingsIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
export default withRouter(injectIntl(FavLists));
