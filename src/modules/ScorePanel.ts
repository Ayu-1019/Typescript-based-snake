// 定义记分牌类
class ScorePanel{
  score: number = 0;
  level: number = 1;

  scoreEl = document.getElementById('score-value')!;
  levelEl = document.getElementById('level-value')!;

  maxLevel: number;
  upScore: number;

  constructor(maxLevel:number = 10,upScore:number = 10){
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore(){
    this.scoreEl.innerHTML = ++this.score + '';
    if(this.score%this.upScore === 0){
      this.addLevel();
    }
  }
  addLevel(){
    if(this.level <= this.maxLevel){
      this.levelEl.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;