// 定义food类
class Food{

  element: HTMLElement;

  constructor(){
    // 获取food元素
    this.element = document.getElementById('food')!;
  }

  // 定义方法获取食物X、Y轴的方法
  get X(){
    return this.element.offsetLeft;
  }
  get Y(){
    return this.element.offsetTop;
  }
  // 改变食物的位置的方法
  change(){
    // 食物的位置最小为0 最大为290
    // 定义食物偏移量
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.top = top + 'px';
    this.element.style.left = left + 'px';
  }
}

export default Food;