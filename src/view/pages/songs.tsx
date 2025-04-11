import React, { useState, useEffect } from "react";
import SongsList from "@/view/components/songs/played/songsList";
import { scoresDB } from "@/components/indexedDB";
import { scoreData } from "@/types/data";
import Loader from "@/view/components/common/loader";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {
  Link as RLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { _showLatestSongs } from "@/components/settings";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { FormattedMessage } from "react-intl";

const Songs: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [full, setFull] = useState<scoreData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [defToday, setDefToday] = useState<boolean>(false);

  const updateData = async () => {
    let full: scoreData[] = await new scoresDB().getAll();
    if (!_showLatestSongs()) {
      full = full.filter((item) => item.currentBPI !== Infinity);
    }
    setFull(full);
    setIsLoading(false);
  };

  useEffect(() => {
    const d = !!(props.match.params as any).today || false;
    setDefToday(d);
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!full || isLoading) {
    return <Loader />;
  }
  if (full.length === 0) {
    return (
      <Container fixed className="commonLayout">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <HowToVoteIcon style={{ fontSize: 80, marginBottom: "10px" }} />
          <Typography variant="h4">
            <FormattedMessage id="Songs.AddScore" />
          </Typography>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <p>
          <FormattedMessage id="Songs.NoScoresRegistered" />
        </p>
        <p>
          <FormattedMessage id="Songs.ImportInstructions1" />
          <RLink to="/data" style={{ textDecoration: "none" }}>
            <Link color="secondary" component="span">
              <FormattedMessage id="Songs.ImportPage" />
            </Link>
          </RLink>
          <FormattedMessage id="Songs.ImportInstructions2" />
        </p>
        <p>
          <FormattedMessage id="Songs.ImportHelp" />{" "}
          <Link
            href="https://docs2.poyashi.me/docs/imports/"
            color="secondary"
            target="_blank"
          >
            <FormattedMessage id="Songs.ImportHelpLink" />
          </Link>
          <FormattedMessage id="Songs.ImportHelpEnd" />
        </p>
      </Container>
    );
  }
  return (
    <div>
      <SongsList
        isFav={false}
        title="Songs.title"
        full={full}
        updateScoreData={updateData}
        defToday={defToday}
      />
    </div>
  );
};

export default withRouter(Songs);
