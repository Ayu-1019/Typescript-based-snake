class Snake{
  // 表示蛇头的元素
  head: HTMLElement;
  // 表示蛇身体（）包括蛇头
  bodies:HTMLCollection;
  // 获取蛇的身体
  element:HTMLElement;

  constructor(){
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')! as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }           

  // 获取蛇头坐标
  get X(){
    return this.head.offsetLeft;
  }
  get Y(){
    return this.head.offsetTop;
  }
  set X(value: number){

    if(this.X === value){
      return;
    }

    if(value < 0 || value > 290){
      throw new Error('蛇撞墙了！')
    }

    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
      // 如果蛇发生了掉头 让蛇向反方向移动
      // 如果新值value大于X 说明在向下走 此时发生了掉头 应该继续让蛇向上走
      if(value > this.X){
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }  

    // 移动身体
    this.moveBody();

    this.head.style.left = value + 'px';

    // 检查有没有撞到自己
    this.checkHeadBody();
  }
  set Y(value: number){

    if(this.Y === value){
      return;
    }

    if(value < 0 || value > 290){
      throw new Error('蛇撞墙了！')
    }

    // 蛇在向上移动时不能直接向下移动 反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
      // 如果蛇发生了掉头 让蛇向反方向移动
      // 如果新值value大于X 说明在向右走 此时发生了掉头 应该继续让蛇向左走
      if(value > this.Y){
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }  

    // 移动身体
    this.moveBody();

    this.head.style.top = value + 'px';

    // 检查有没有撞到自己
    this.checkHeadBody();
  }

  // 蛇增加身体
  addBody(){
    // 向element中添加一个div
    this.element.insertAdjacentHTML('beforeend','<div></div>');
  }

  // 蛇移动身体
  moveBody(){
    // 后一节身体的位置设置为前一节身体的位置
    for(let i=this.bodies.length-1; i>0; i--){
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      // 把值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检查身体是否和头坐标相同
  checkHeadBody(){
    for(let i=1; i<this.bodies.length; i++){
      if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop){
        throw new Error('撞到自己了~~~')
      }
    }
  }
}

export default Snake;