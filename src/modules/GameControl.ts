import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

class GameControl{
  snake:Snake;
  food:Food;
  scorePanel:ScorePanel;
  // 蛇的移动方向
  direction:string = '';
  isLive: boolean = true;

  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init(); 
  }

  // 游戏初始化
  init(){
    // 监听键盘按下事件
    document.addEventListener('keydown', this.keydownHandle.bind(this));
    this.run();
  }

  keydownHandle(event:KeyboardEvent){
    this.direction = event.key;
    
  }

  // 移动蛇的方法
  run(){
    /**
     * 向上 top减少
     * 向下 top增大
     * 向左 left减小
     * 向右 left增大
     */

    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch(this.direction){
      case 'ArrowUp':
        Y -= 10;
        break;
      case 'ArrowDown':
        Y += 10;
        break;
      case 'ArrowLeft':
        X -= 10;
        break;
      case 'ArrowRight':
        X += 10;
        break;
    }

    if(this.checkEat(X, Y)){
      // 食物改变位置
      this.food.change();
      // 分数 +1
      this.scorePanel.addScore();
      // 蛇增长一节
      this.snake.addBody();
    }

    try{
      // 修改蛇的坐标
      this.snake.X = X;
      this.snake.Y = Y;
    }catch(e){
      alert((e as Error).message + 'GAME OVER');
      this.isLive = false;
    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level - 1) * 30);

    // 检查蛇吃到食物
  }
  checkEat(X: number, Y: number){
    return X === this.food.X && Y === this.food.Y;
  }
}

export default GameControl;