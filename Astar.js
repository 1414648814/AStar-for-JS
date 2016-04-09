// A星对象
var AStar {
	// 搜索函数
	SearchPath : function (Grid, start, end) {

	},

	//






}；

// 方格
var Grid {
	getPosX : function() {
		return this._PosX;
	},

	setPosX : function(posX) {
		this._PosX = posX;
	},

	getPosY : function() {
		return this._PosY;
	},

	setPosY : function(posY) {
		this._PosY = posY;
	},

	_PosX : null,
	_PosY : null
};

// 数据结构（2叉堆）
BinaryHeap.prototype = {

	// 加入到数组的后面，也就是树的叶节点
	Push : function(element) {
		// 在数组后面加入
		this.content.Push(element);

	},

	// 返回数组的第一个元素，也就是树的根节点
	Pop : function() {
		var result = this.content[0];
		// 返回数组的最后一个元素
		var end = this.content.pop();
		// 将最后一个元素设置为第一个，再进行排序
		if (this.content.length > 0) {
			this.content[0] = end;
			// 重新进行排序

		}
		return result;
	},

	// 大小
	Size : function(){
		return this.content.length;
	},

	// 删除
	Romove : function(element){
		var i = this.content.indexOf(element);
		// 获得数组的最后的元素
		var end = this.content.pop();
		if (i !== this.content.length - 1) {
			this[i] = end;
			// 判断删除的节点的值和数组最后的元素
			if (this.sc) {};
		}
	},

	// 
	RescoreElement : function(element) {
		this.
	},

	// 上移
	HeapUp : function(){

	},

	// 下移
	HeapDown : function(){


	}
 
}；

// 游戏控制器
var Controller {
	pathTo : function(grid) {

	}


};