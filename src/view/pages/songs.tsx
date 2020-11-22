import * as React from 'react';
import SongsList from '@/view/components/songs/played/songsList';
import { scoresDB } from '@/components/indexedDB';
import { scoreData } from '@/types/data';
import Loader from '@/view/components/common/loader';
import AdsCard from '@/components/ad';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Link as RLink} from "react-router-dom";
import { _showLatestSongs } from '@/components/settings';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

interface S {
  full:scoreData[],
  isLoading:boolean,
}

export default class Songs extends React.Component<{},S> {

  constructor(props:Object){
    super(props);
    this.state ={
      full:[],
      isLoading:true
    }
    this.updateScoreData = this.updateScoreData.bind(this);
  }

  async componentDidMount(){
    await this.updateScoreData();
  }

  async updateScoreData(){
    let full:scoreData[] = await new scoresDB().getAll();
    if(!_showLatestSongs()){
        full = full.filter((item)=>item.currentBPI !== Infinity);
    }
    this.setState({full:full,isLoading:false});
  }

  render(){
    if(!this.state.full || this.state.isLoading){
      return (<Loader/>);
    }
    if(this.state.full.length === 0){
      return (
        <Container fixed className="commonLayout">
          <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <HowToVoteIcon style={{fontSize:80,marginBottom:"10px"}}/>
            <Typography variant="h4">
              スコアを追加
            </Typography>
          </div>
          <Divider style={{margin:"10px 0"}}/>
          <p>
            「<RLink to="/data" style={{textDecoration:"none"}}><Link color="secondary" component="span">データ取り込み</Link></RLink>」ページからCSVまたはブックマークレットを用いて一括インポートするか、「<RLink to="/notPlayed" style={{textDecoration:"none"}}><Link color="secondary" component="span">未プレイ楽曲</Link></RLink>」ページから手動でスコアを登録してください。
          </p>
          <p>
            *1 CSVを用いたインポートにはeAMUSEMENTプレミアムコースへの加入が必要です。<br/>
            *2 ブックマークレットを用いたインポートにはeAMUSEMENTベーシックコースまたはプレミアムコースへの加入が必要です。<br/>
            CSV・ブックマークレットを用いたインポートの方法については、「データ取り込み」ページに記載の説明文をお読みください。
          </p>
        </Container>
      )
    }
    return (
      <div>
        <SongsList isFav={false} title="Songs.title" full={this.state.full} updateScoreData={this.updateScoreData}/>
        <AdsCard/>
      </div>
    );
  }
}
