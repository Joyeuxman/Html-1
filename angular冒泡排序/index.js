angular.module('App',[])
.controller('AppController',function($scope,$timeout){
    //排序的所有数字
    var defaultData = [37,28,29,24,23,11,5,9,4,3,8,6,43,12,20,30]

    $scope.reset = function(){
        //map()遍历
        $scope.data = defaultData.map(function(i){
           return i
        })
        //索引
        pointer = 0
        checklen = $scope.data.length
        $scope.alertMsg = ''
    }

    var sorting = function(){
        var data = $scope.data
        //判断前后相邻的数字的大小
        //如果前一个数字大于后一个数字，交换位置
        if(data[pointer] > data[pointer+1]){
            var tmp = data[pointer]
            data[pointer] = data[pointer+1]
            data[pointer+1] = tmp
        }
        pointer++
        //当不断增加的索引大于这个的长度时，说明这一行比较完毕
        //换行比较，索引从0开始
        if(pointer >= checklen){
            checklen--
            pointer = 0
        }
        if(checklen <= 0){
            $scope.alertMsg = '排序结束'
        }else{
            $timeout(sorting,100)
        }
    }
    $scope.start = function(){
        $timeout(sorting,100)
    }
    $scope.reset()
})