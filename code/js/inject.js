// 创建div
const vueAppDivElement = document.createElement('div')
// 将div挂载到body
document.body.appendChild(vueAppDivElement)

const vueApp = Vue.createApp({
    setup() {
        const {h, onMounted, onUnmounted} = Vue
        const {ElNotification, ElLink} = ElementPlus

        /**显示站点信息*/
        const showInfo = () => {
            ElNotification.info({
                title: 'XCLHove的github镜像站',
                message: h('div', {}, [
                    h('div', {style: 'color: var(--el-color-success)'}, '欢迎来到XCLHove的github镜像站！'),
                    h('div', {}, h(ElLink, {
                        href: 'https://xclhove.top',
                        target: '_blank',
                        type: 'primary'
                    }, 'XCLHove的神秘空间')),
                    h('div', {}, [
                        '自行搭建镜像站：',
                        h(ElLink, {
                            href: 'https://github.com/XCLHove/github-proxy',
                            target: '_blank',
                            type: 'primary'
                        }, 'github-proxy')
                    ])
                ]),
                duration: 10 * 1000,
                showClose: true
            })
        }

        /**处理502页面*/
        const handle502 = () => {
            // 获取当前页面title
            const title = document.title
            // 如果title不以502开头（仅针对nginx），则结束
            if (!title.startsWith('502')) return

            // 路径 '/session' 出现502代表需要验证设备，暂未实现，所以无法登录
            const path = window.location.pathname
            if (path === '/session') {
                const timer = setTimeout(() => {
                    ElNotification.error({
                        message: h('div', {}, [
                            h('div', {}, [
                                '见到此提示代表无法登录，请前往其他镜像站尝试！'
                            ]),
                            h('div', {}, [
                                h(ElLink, {
                                    href: window.location.origin,
                                    type: 'primary'
                                }, '点我返回主页')
                            ])
                        ])
                    })
                }, 1000)
                onUnmounted(() => {
                    clearTimeout(timer)
                })
                return
            }

            // 处理阿里云函数冷启动导致的502
            window.open(window.location.href, '_self')
        }

        onMounted(() => {
            showInfo()
            handle502()
        })
    }
})
vueApp.mount(vueAppDivElement)