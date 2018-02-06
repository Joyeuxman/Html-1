angular.module('GZCalc', [])
.controller('GZCalcController', ['$scope','GZCalcService', function($scope,GZCalcService){

    

    $scope.calc = function(){
        var jiben = $scope.jiben || 0
        var jixiao = $scope.jixiao || 0
        var jiangjin = $scope.jiangjin || 0

        $scope.result = GZCalcService.doCalc(jiben, jixiao, jiangjin)
        $scope.showResult = true
    }

}])
// service()在模块中创建一个服务，服务是angular中共享的对象，可以包含共享的数据和方法
// 在angular应用中如果有共享的数据和方法，则应该放入服务中，而不要写在和控制器中，
// 也不要单独创建一个对象，因为在angular中，所有的代码都要放在模块中
// service(1,2)方法中   1表示服务的名称  2表示服务的构造函数（以数组[依赖项+函数]的方式定义）
.service('GZCalcService',[function(){
    // 
    this.doCalc = function(jiben, jixiao, jiangjin){
        // 总额
        var total = jiben + jixiao + jiangjin
        // 计税工资（扣除社保后的工资）
        var jishui = total - jiben * (0.08 + 0.02 + 0.005 + 0.08) - 20

        // 计税基数
        var jishu =  jishui > 3500 ?  jishui - 3500 : 0;
        var shui = 0;
        
        // 计算个人所得税
        if (jishu <= 0) { shui = 0 }
        if (jishu <= 1500) { shui = jishu * 0.03 }
        else if (jishu <= 4500) { shui = jishu * 0.1 - 105 }
        else if (jishu <= 9000) { shui = jishu * 0.2 - 555 }
        else if (jishu <= 35000) { shui = jishu * 0.25 - 1005 }
        else if (jishu <= 55000) { shui = jishu * 0.3 - 2755 }
        else if (jishu <= 80000) { shui = jishu * 0.35 - 5505 }
        else { shui = jishu * 0.45 - 13505 }
        
        var shifa = jishui - shui
        
        return {
            total: total,
            shebao: {
                yanglao: jiben * 0.08,
                yiliao: jiben * 0.02,
                shiye: jiben * 0.005,
                gongshang: 0,
                shengyu: 0,
                gongjijin: jiben * 0.08,
                tongchou: 20,
            },
            jishui: jishui,
            jishu: jishu,
            shui: shui,
            shifa: shifa
        }
    }
}])

