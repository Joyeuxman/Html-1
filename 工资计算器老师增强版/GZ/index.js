angular.module('GZ', ['ngStorage'])
.controller('CalcController', ['$scope', 'CalcService', function($scope, calcService){

    $scope.calc = function(){
        var jiben = $scope.jiben || 0
        var jixiao = $scope.jixiao || 0
        var jiangjin = $scope.jiangjin || 0

        $scope.result = calcService.doCalc(jiben, jixiao, jiangjin)
        $scope.showResult = true
    }

}])
.controller('SettingController', ['$scope', 'SettingService', function($scope, settingService){
    $scope.shebao = settingService.shebao
}])
.service('SettingService', ['$localStorage', function(storage){
    this.shebao = storage.$default({
        yanglao: 0.08,
        yiliao: 0.02,
        shiye: 0.005,
        gongshang: 0,
        shengyu: 0,
        gongjijin: 0.08,
        tongchou: 20
    })
}])
// service() 在模块中创建一个“服务”，服务是Angular中
// 共享的对象，可以包含共享的数据和方法
// 在angular应用中，如果有共享的数据和方法，则应该
// 放入服务中，而不要写在Controller中，也不要单独创建
// 一个对象，因为在Angular中，所有的代码全部都要放在模块
// 中
// service() 第一个参数是服务的名称，第二个参数是服务的
// 构造函数（以数组[依赖项+函数]的方式定义）
.service('CalcService', ['SettingService', function(settingService) {
    this.doCalc = function(jiben, jixiao, jiangjin){
        // 总额
        var total = jiben + jixiao + jiangjin
        // 计税工资（扣除社保后的工资）
        var jishui = total - jiben * (
                settingService.shebao.yanglao + 
                settingService.shebao.yiliao + 
                settingService.shebao.shiye + 
                settingService.shebao.gongjijin
            ) - settingService.shebao.tongchou

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
                yanglao: jiben * settingService.shebao.yanglao,
                yiliao: jiben * settingService.shebao.yiliao,
                shiye: jiben * settingService.shebao.shiye,
                gongshang: jiben * settingService.shebao.gongshang,
                shengyu: jiben * settingService.shebao.shengyu,
                gongjijin: jiben * settingService.shebao.gongjijin,
                tongchou: settingService.shebao.tongchou,
            },
            jishui: jishui,
            jishu: jishu,
            shui: shui,
            shifa: shifa
        }
    }
}])