import React from "react";
import { FormattedMessage } from "react-intl";

import { scoreData, songData } from "@/types/data";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import { alternativeImg } from "@/components/common";
import Loader from "../common/loader";
import { datasets, rivalShow } from "@/components/rivals/letters";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link as RLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { UserIcon } from "../common/icon";

interface P {
  song: songData | null;
  score: scoreData | null;
}

interface S {
  isLoading: boolean;
  dataset: datasets[];
  yourEx: number;
}

class SongRivals extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      isLoading: true,
      dataset: [],
      yourEx: 0,
    };
  }

  componentDidMount() {
    this.updateScoreData();
  }

  async updateScoreData() {
    const { song, score } = this.props;
    if (!song || !score) {
      return;
    }
    return this.setState({
      dataset: await rivalShow(song, score),
      isLoading: false,
      yourEx: score.exScore,
    });
  }

  render() {
    const { isLoading, dataset, yourEx } = this.state;
    const { song, score } = this.props;
    if (!song || !score) {
      return null;
    }
    return (
      <div>
        <Container fixed>
          {isLoading && <Loader />}
          {!isLoading && <DiffsTable scoreTable={dataset} yourEx={yourEx} />}
        </Container>
      </div>
    );
  }
}

export default SongRivals;

export class DiffsTable extends React.Component<{ scoreTable: datasets[]; yourEx: number }, {}> {
  render() {
    const columns: {
      id: "rivalName" | "exScore" | "BPI" | "icon";
      label: React.ReactNode;
    }[] = [
      { id: "icon", label: "" },
      { id: "rivalName", label: <FormattedMessage id="SongRivals.Rival" /> },
      { id: "exScore", label: <FormattedMessage id="SongRivals.EX" /> },
      { id: "BPI", label: <FormattedMessage id="SongRivals.BPI" /> },
    ];
    if (this.props.scoreTable.length === 1) {
      // 自分以外いない場合
      return (
        <React.Fragment>
          <Alert severity="warning" variant="outlined" style={{ marginTop: "10px" }}>
            <AlertTitle>
              <FormattedMessage id="SongRivals.NoRivalsTitle" />
            </AlertTitle>
            <p>
              <FormattedMessage id="SongRivals.NoRivalsMessage" />
            </p>
          </Alert>
          <RLink to="/rivals" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" fullWidth style={{ margin: "10px 0" }}>
              <FormattedMessage id="SongRivals.FindRivals" />
            </Button>
          </RLink>
        </React.Fragment>
      );
    }
    return (
      <Table className="rivalTable forceWith">
        <TableHead>
          <TableRow>
            {columns.map((column, _i) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.scoreTable.map((row: datasets, i: number) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={i} className={i % 2 ? "isOdd" : "isEven"}>
                {columns.map((column, _j) => {
                  return (
                    <TableCell
                      key={column.id}
                      style={{
                        width: column.id === "icon" ? "40px" : "auto",
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      {column.id === "icon" && <UserIcon _legacy disableZoom defaultURL={row.icon} text={row.rivalName} altURL={alternativeImg(row.rivalName)} />}
                      {column.id !== "icon" && <span>{row[column.id] === Infinity ? "-" : row[column.id]}</span>}
                      {column.id === "exScore" && (
                        <span className={"plusOverlayScore"}>
                          {row["exScore"] - this.props.yourEx > 0 && "+"}
                          {row["exScore"] - this.props.yourEx !== 0 && row["exScore"] - this.props.yourEx}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
