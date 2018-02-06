angular.module('wageCalc',[])
.controller('wageCalcCon',['$scope','wageCalcSer',function(s,wcs){
    console.log(s)
    s.calc = function(){
        var wages = s.wages || 0;
        var performance = s.performance || 0;
        var bonus = s.bonus || 0;

        s.result = wcs.doCalc(wages,performance,bonus);
        s.showResult = true;
    }
}])
.service('wageCalcSer',[function(){
    this.doCalc = function(wages,performance,bonus){
        // 总额
        var total = wages + performance + bonus;
        // 计税工资（扣除社保后的工资）
        var taxWage = total - wages * (0.08 + 0.02 + 0.005 +0.08) - 20;
        // 计税基数
        var taxBasic = taxWage > 3500 ? taxWage -3500 : 0;
        var personalTax = 0 ;
        // 计算个人所得税
        if(taxBasic <= 0) {personalTax = 0}
        if(taxBasic <= 1500 ) {personalTax = taxBasic * 0.03}
        else if(taxBasic <= 4500 ) { personalTax = taxBasic * 0.1 - 105 }
        else if (taxBasic <= 35000) { personalTax = taxBasic * 0.25 - 1005 }
        else if (taxBasic <= 55000) { personalTax = taxBasic * 0.3 - 2755 }
        else if (taxBasic <= 80000) { personalTax = taxBasic * 0.35 - 5505 }
        else { personalTax = taxBasic * 0.45 - 13505 }

        // 计算实发工资
        var finallyWage = taxWage - personalTax;

        return {
            total:total,
            shebao : {
                pension: wages * 0.08,
                medical: wages * 0.02,
                unemployment: wages * 0.005,
                ingury: 0,
                bear: 0,
                CRP: wages * 0.08,
                ss: 20,
            },
            taxWage: taxWage,
            personalTax:personalTax,
            finallyWage:finallyWage
        }
    }
}])