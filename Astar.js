// A星对象
var AStar = {
	// 搜索函数
	SearchPath : function(Graph, start, end, options) {
		Graph.cleanDirty();

		options = options || {};
		var heuristic = AStar.manhattan;
		var closest = options.closest || false;

		var openHeap = GameController.getHeap();
		var closetNode = start;
		start.h = manhattan(start,end);

		//标记开始节点
		Graph.markDirty(start);

		openHeap.push(start);

		while(openHeap.size() > 0){
			//取出尾节点
			var currentNode = openHeap.pop();

			//找到结果
			if(currentNode === end)
				return GameController.pathTo(currentNode);

			//移动节点从开列表到闭列表
			currentNode.closed = true;

			//找出所有邻居节点
			var neighbors = Graph.neighbors(currentNode);

			for(var i = 0;i < neighbors.length;++i){
				var neighbor = neighbors[i];

				//闭列表中的和不可到达则不访问
				if(neighbor.closed || neighbor.isWall()){
					continue;
				}

				//计算g值
				var gScore = currentNode.g + neighbor.getCost(currentNode);
				var beenVisited = neighbor.visited;

				//如果邻居节点没有访问过或者节点到达邻居节点的路径长度更短
				if(!beenVisited || gScore < neighbor.g){
					neighbor.visited = true;
					neighbor.parent = currentNode;

					//重新计算h,g值
					neighbor.h = neighbor.h || manhattan(neighbor,end);
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;

					Graph.markDirty(neighbor);

					if(closest){
						if (neighbor.h  < closetNode.h || (neighbor.h === closetNode.h && neighbor.g < closetNode.g)) {
							closetNode = neighbor;
						}
					}

					if(!beenVisited){
						openHeap.push(neighbor);
					}
					else{
						openHeap.RescoreElement(neighbor);
					}
				}

			}

		}
		//找到靠近目标节点
		if(closest) {
			return GameController.pathTo(closetNode);
		}

		return [];
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
	cleanNode : function(node) {
		node.f = 0;
		node.g = 0;
		node.h = 0;
		node.visited = false;
		node.closed = false;
		node.parent = null;

	},

};

//一个内存结构
function Graph(gridIn,options){
	options = options || {};
	this.nodes = [];
	this.diagonal = !!options.diagonal;
	this.grid = [];

	for(var x = 0;x < gridIn.length;x++){
		this.grid[x] = [];

		for(var y = 0,row = gridIn[x];y < row.length;y++){
			var node = new GridNode(x,y,row[y]);
			this.grid[x][y] = node;
			this.nodes.push(node);
		}
	}
	this.init();

};

//初始化
Graph.prototype.init = function(){
	this.dirtyNodes = [];
	for(var i = 0;i < this.nodes.length;i++){
		AStar.cleanNode();
	}

};

//清除节点
Graph.prototype.cleanDirty = function(){
	for(var i = 0;i < this.dirtyNodes.length;i++){
		AStar.cleanNode(this.dirtyNodes[i]);
	}
	this.dirtyNodes = [];
};

//标记节点
Graph.prototype.markDirty = function (node) {
	this.dirtyNodes.push(node);
};

// 获取到结点的所有邻居结点
Graph.prototype.neighbors = function(node) {
	var ret = [];
	var x = node.x;
	var y = node.y;
	var grid = this.grid;

	// West
	if (grid[x - 1] && grid[x - 1][y]) {
		ret.push(grid[x - 1][y]);
	}

	// East
	if (grid[x + 1] && grid[x + 1][y]) {
		ret.push(grid[x + 1][y]);
	}

	// South
	if (grid[x] && grid[x][y - 1]) {
		ret.push(grid[x][y - 1]);
	}

	// North
	if (grid[x] && grid[x][y + 1]) {
		ret.push(grid[x][y + 1]);
	}

	if (this.diagonal) {
		// Southwest
		if (grid[x - 1] && grid[x - 1][y - 1]) {
			ret.push(grid[x - 1][y - 1]);
		}

		// Southeast
		if (grid[x + 1] && grid[x + 1][y - 1]) {
			ret.push(grid[x + 1][y - 1]);
		}

		// Northwest
		if (grid[x - 1] && grid[x - 1][y + 1]) {
			ret.push(grid[x - 1][y + 1]);
		}

		// Northeast
		if (grid[x + 1] && grid[x + 1][y + 1]) {
			ret.push(grid[x + 1][y + 1]);
		}
	}

	return ret;
};

Graph.prototype.toString = function() {
	var graphString = [];
	var nodes = this.grid;
	for (var x = 0; x < nodes.length; x++) {
		var rowDebug = [];
		var row = nodes[x];
		for (var y = 0; y < row.length; y++) {
			rowDebug.push(row[y].weight);
		}
		graphString.push(rowDebug.join(" "));
	}
	return graphString.join("\n");
};

// 方格
function GridNode(x,y,weight){
	this.x = x;
	this.y = y;
	this.weight = weight;
};

GridNode.prototype.toString = function() {
	return "[" + this.x + " " + this.y + "]";

};

//获取到从邻居结点到自己的权重
GridNode.prototype.getCost = function(fromNeighbor) {
	if(fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
		return this.weight * Math.sqrt(2);
	}
	return this.weight;
}

//返回该结点是否可以到达
GridNode.prototype.isWall = function() {
	return this.weight === 0;
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

	//重新排序
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
	pathTo : function(node) {
		var curr = node;
		var path = [];
		while(curr.parent){
			path.unshift(curr);
			curr = curr.parent;
		}
		return path;
	},

	getHeap : function() {
		return new BinaryHeap(function(node) {
			node.f;
		});
	},

};