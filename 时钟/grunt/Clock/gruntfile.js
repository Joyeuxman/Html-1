// 定义一个模块，并且导出一个函数
module.exports = grunt => {
    // 初始化grunt配置
    grunt.initConfig({
        // 定义一个动作：concat的作用是连接多个文件为一个文件
        concat: {
            // 动作的选项
            options: {
                banner: '/*智游教育*/\n'
            },
            // 动作涉及的文件
            dist: {
                // 要连接的文件
                src: ['js/control.js', 'js/dot.js', 
                    'js/second.js', 'js/minute.js', 
                    'js/hour.js', 'js/diamond.js', 
                    'js/clock.js'],
                // 连连后生成的文件
                dest: 'js/myclock.js'
            }
        },
        
        // 压缩js的动作
        uglify: {
            // 动作目标
            my_target: {
                // 涉及的文件
                files: {
                    // 压缩后生成的文件    ：    需要压缩的文件列表
                    'js/myclock.min.js': ['js/myclock.js']
                }
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    // 加载grunt插件模块包
    
    grunt.registerTask('default', ['concat', 'uglify'])
    // 注册任务，注册后可以使用名字执行已注册的任务
    // 第1个参数：任务名字
    // 第2个参数：具体要执行动作，可以是多个动作按顺序执行
}