// 入口脚本：检查是否已展示过通知，按需加载依赖
(function () {
    // 同一标签页会话内已展示过，跳过加载
    if (sessionStorage.getItem('github-proxy-shown')) {
        return
    }

    // 动态加载 CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/element-plus.css'
    document.head.appendChild(link)

    // 动态加载 JS（按顺序：Vue → Element Plus → notification）
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
        })
    }

    ;(async () => {
        try {
            await loadScript('/js/vue.min.js')
            await loadScript('/js/element-plus.min.js')
            await loadScript('/js/notification.js')
        } catch (e) {
            console.error('github-proxy: 加载依赖失败', e)
        }
    })()
})()
