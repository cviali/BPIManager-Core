import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { scoreData, songData } from "@/types/data";
import DetailedSongInformation from "../detailsScreen";
import { difficultyDiscriminator, _prefix } from "@/components/songs/filter";
import { _isSingle, _currentStore, _useActionMenu } from "@/components/settings";
import { defaultBackground } from "@/themes/ifColor";
import Menu from "../common/longTapMenu";
import { FormattedMessage } from "react-intl";

const columns = [
  { id: "difficultyLevel", label: "☆" },
  { id: "title", label: <FormattedMessage id="Orders.Title" /> },
];

interface P {
  data: songData[];
  sort: number;
  isDesc: boolean;
  changeSort: (newNum: number) => void;
  updateScoreData: (willDelete?: boolean, willDeleteItems?: { title: string; difficulty: string }) => void;
  page: number;
  handleChangePage: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
}

interface S {
  rowsPerPage: number;
  isOpen: boolean;
  FV: number;
  currentSongData: songData | null;
  currentScoreData: scoreData | null;
  isMenuOpen: boolean;
}

export default class SongsTable extends React.Component<Readonly<P>, S> {
  private buttonPressTimer: number = 0;
  constructor(props: Readonly<P>) {
    super(props);
    this.state = {
      rowsPerPage: 10,
      isOpen: false,
      FV: 0,
      currentSongData: null,
      currentScoreData: null,
      isMenuOpen: false,
    };
  }

  private default = (row: songData): scoreData => {
    const t = {
      difficulty: difficultyDiscriminator(row.difficulty),
      title: row.title,
      currentBPI: NaN,
      exScore: 0,
      difficultyLevel: row.difficultyLevel,
      storedAt: _currentStore(),
      isSingle: _isSingle(),
      clearState: 7,
      lastScore: -1,
      updatedAt: "-",
    };
    return t;
  };

  handleOpen = (updateFlag: boolean = false, row: songData | null, willDeleteItems: { title: string; difficulty: string } | null | undefined = { title: "", difficulty: "" }): void => {
    if (updateFlag) {
      this.props.updateScoreData(true, willDeleteItems || { title: "", difficulty: "" });
    }
    const t = row ? this.default(row) : null;
    return this.setState({
      FV: 0,
      isOpen: !this.state.isOpen,
      currentSongData: row ? row : null,
      currentScoreData: t,
    });
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.handleChangePage(null, 0);
    this.setState({ rowsPerPage: +event.target.value });
  };

  handleButtonPress = (row: songData) => {
    this.buttonPressTimer = window.setTimeout(() => {
      if (!_useActionMenu()) return;
      return this.setState({
        isOpen: false,
        isMenuOpen: true,
        currentSongData: row,
      });
    }, 1000);
    return;
  };

  handleButtonRelease = () => window.clearTimeout(this.buttonPressTimer);

  menuClose = () => this.setState({ isMenuOpen: false });

  render() {
    const { rowsPerPage, isOpen, currentSongData, currentScoreData, FV, isMenuOpen } = this.state;
    const { page, data, changeSort, sort, isDesc } = this.props;
    return (
      <Paper
        style={{
          borderRadius: 0,
          width: "100%",
          overflowX: "auto",
          background: defaultBackground(),
        }}
      >
        <div>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell key={column.id} onClick={() => changeSort(i)}>
                    {column.label}
                    {i === sort && (
                      <span>
                        {isDesc && <span>▼</span>}
                        {!isDesc && <span>▲</span>}
                      </span>
                    )}
                    {i !== sort && <span>△</span>}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: songData, i: number) => {
                return (
                  <TableRow
                    onTouchStart={() => this.handleButtonPress(row)}
                    onTouchEnd={() => this.handleButtonRelease()}
                    onMouseDown={() => this.handleButtonPress(row)}
                    onMouseUp={() => this.handleButtonRelease()}
                    onMouseLeave={() => this.handleButtonRelease()}
                    onClick={() => this.handleOpen(false, row)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.title + row.difficulty + i}
                    className={i % 2 ? "songCell isOdd" : "songCell isEven"}
                  >
                    {columns.map((column) => {
                      const d = difficultyDiscriminator(row.difficulty);
                      const prefix = _prefix(d);
                      return (
                        <TableCell key={column.id + prefix}>
                          {row[column.id]}
                          {column.id === "title" && prefix}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={this.props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage=""
          backIconButtonProps={{
            "aria-label": "previous page",
          }}
          nextIconButtonProps={{
            "aria-label": "next page",
          }}
          onPageChange={this.props.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
        <Menu close={this.menuClose} open={isMenuOpen} song={currentSongData} />
        {isOpen && <DetailedSongInformation isOpen={isOpen} song={currentSongData} score={currentScoreData} handleOpen={this.handleOpen} willDelete={true} firstView={FV} />}
      </Paper>
    );
  }
}
