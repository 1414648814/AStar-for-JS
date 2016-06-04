// A星对象
var AStar = {
	// 搜索函数
	SearchPath : function(graph, start, end, options) {

	},

	// 启发式搜索
	heuristics : function() {

	},

	//重置结点
	cleanNode : function() {

	},

};

//一个内存结构
function Graph(gridIn,options){

}

// 方格
function GridNode(x,y,weight){
	this.x = x;
	this.y = y;
	this.weight = weight;
}

GridNode.prototype.toString = function() {
	return "[" + this.x + " " + this.y + "]";

};

//获取到从邻居结点到自己的权重
GridNode.prototype.getCost = function(fromNeighbor) {

}

//返回该结点是否可以到达
GridNode.prototype.isWall = function() {

}


// 数据结构（2叉堆）
var BinaryHeap = {
	Push : function() {
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

	},

	rescoreElement : function(){

	},
 
};

// 游戏控制器
var GameController = {
	pathTo : function(grid) {

	}


};