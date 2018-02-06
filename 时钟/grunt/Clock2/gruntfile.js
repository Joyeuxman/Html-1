// 定义一个模块（整体gruntfile.js就是一个模块）
// 模块内的变量在模块外都是不可见的
// 通过exports可以将模块的功能导出
module.exports = grunt => {
    // 初始化grunt配置（定义一系列动作）
    grunt.initConfig({
        // 读取项目配置文件
        package: grunt.file.readJSON('package.json'),
        // 定义一个拼接文件的动作
        concat:{
            options:{
                banner: '/****智游教育****/\n'
            },
            // 与该动作相关的文件
            dist:{
                // 要拼接的文件列表
                src: '<%=package.jsFiles%>',
                // 拼接文件后成的文件
                dest: 'js/myclock.js'
            }
        },
        
        uglify: {
            my_target: {
                files: {
                    'js/myclock.min.js': ['js/myclock.js']
                }
            }
        },
        
        watch: {
            scripts:{
                files: '<%=package.jsFiles%>',
                tasks: ['default']
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    // 加载grunt插件模块包
    
    grunt.registerTask('default', ['concat', 'uglify'])
    // 注册任务，注册后可以使用grunt命令执行任务
    // 可以注册多个任务
    // 如果任务名称是default，就是默认任务
}