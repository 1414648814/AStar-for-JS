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

	},

	Pop : function() {

	},

	// 排序
	Sort : function(){

	},

	// 大小
	Size : function(){

	},

	// 删除
	Romove : function(){

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