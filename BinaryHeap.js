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
