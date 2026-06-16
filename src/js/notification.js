// 提取的通知逻辑，由 inject.js 动态加载
(function () {
    const vueAppDivElement = document.createElement('div')
    document.body.appendChild(vueAppDivElement)

    const vueApp = Vue.createApp({
        setup() {
            const { h, onMounted } = Vue
            const { ElNotification, ElLink } = ElementPlus

            const showInfo = () => {
                ElNotification.info({
                    title: 'github 镜像站',
                    message: h('div', {}, [
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
                // 标记已展示，后续页面不再加载依赖
                sessionStorage.setItem('github-proxy-shown', '1')
            }

            onMounted(() => {
                showInfo()
            })
        }
    })
    vueApp.mount(vueAppDivElement)
})()
