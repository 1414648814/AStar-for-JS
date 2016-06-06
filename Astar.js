// A星对象
var AStar = {
	// 搜索函数
	SearchPath : function(graph, start, end, options) {

	},

	/*
		几种估价函数，包括曼哈顿估价，几何估价，对角线估价
	 */
	//曼哈顿
	manhattan : function(pos0,pos1) {
		var distance1 = Math.abs(pos1.x - pos0.x);
		var distance2 = Math.abs(pos1.y - pos0.x);
		return distance1 + distance2;
	},

	//几何
	euclidian : function(pos0,pos1) {
		var straightCost = 1;
		var distance1 = Math.abs(pos1.x - pos0.x);
		var distance2 = Math.abs(pos1.y - pos0.x);
		return Math.sqrt(distance1 * distance1 + distance2 * distance2) * straightCost;

	},

	//斜线距离（综合了曼哈顿和几何）
	diagonal : function (pos0,pos1) {
		var distance1 = Math.abs(pos1.x - pos0.x);
		var distance2 = Math.abs(pos1.y - pos0.x);
		var straight = distance1 + distance2;
		var diag = Math.min(distance1,distance2);
		var straightCost = 1;
		var diagCost = Math.sqrt(2);

		return diagCost * diag + straightCost * (straight - 2 * diag);
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

// 数据结构（最小堆）
var BinaryHeap = {

	// 加入到数组的后面，也就是树的叶节点
	Push : function(element) {
		// 在数组后面加入
		this.content.Push(element);
		this.SinkDown(this.content.length - 1);
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
			this.BubbkeUp(0);
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
			if (this.scoreFunction(end) < scoreFunction(node)) {
				this.SinkDown(i);
			}
			else {
				this.BubbkeUp(i);
			}
		}
	},

	// 
	RescoreElement : function(element) {
		this.SinkDown(this.content.indexOf(element));
	},

	// 上移
	BubbkeUp : function(n){
		// 计算子节点的位置
		var length = this.content.length;
		var element = this[n];
		var elemScore = this.scoreEFunction(element);

		while(1) {
			var child2N = (n + 1)<<1;
			var child1N = child2N - 1;

			var swap = null;
			//如果子节点存在
			if(child1N < length){
				//计算分数
				var child1 = this.content[child1N];
				var child1Score = this.scoreFunction(child1);

				//如果子节点的值小于父亲节点，则需要进行交换
				if(child1Score < elemScore){
					swap = child1N;
				}
			}
			//同样操作
			if(child2N < length){
				//计算分数
				var child2 = this.content[child1N];
				var child2Score = this.scoreFunction(child2);

				//如果子节点的值小于父亲节点，则需要进行交换
				if(child2Score < (swap === null ? elemScore : child1Score)){
					swap = child2N;
				}
			}

			//如果父亲节点需要移动，则进行移动，否则continue
			if (swap !== null) {
				this.content[n] = this[swap];
				this.content[swap] = element;
				n = swap;
			}
			else {
				break;
			}
		}

	},

	// 下移
	SinkDown : function(n){
		var element = this.content[n];
		while(n > 0) {
			// 父结点的位置
			var parentN = ((n+1) >> 1)-1;
			var parent = this.content[parentN];

			if(this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;

				n = parentN;
			}
			else {
				break;
			}
		}
	},
 
};

// 游戏控制器
var GameController = {
	pathTo : function(grid) {

	}


};