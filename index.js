jQuery(() => {
    // 1. 注入 CSS 样式（注意：我们在前面加了 body.true-hide-active 限定词）
    const style = document.createElement("style");
    style.id = "st-true-hide-pure-css";
    
    style.textContent = `
        /* 只有在 true-hide-active 激活时，才执行你的终极绝杀选择器 */
        body.true-hide-active #chat .mes.mes_hidden,
        body.true-hide-active #chat .mes.is_hidden,
        body.true-hide-active #chat .mes[is_hidden="true"],
        body.true-hide-active #chat .mes[data-is_hidden="true"],
        body.true-hide-active #chat .mes:has(.fa-ghost:not(.mes_buttons *)),
        body.true-hide-active #chat .mes:has(.mes_name .fa-ghost),
        body.true-hide-active #chat .mes:has(.mes_badges .fa-ghost),
        body.true-hide-active #chat .mes:has(.mes_timestamp .fa-ghost) {
            display: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        }
        
        /* 顶部栏切换按钮的样式 */
        #true-hide-toggle {
            cursor: pointer;
            color: var(--SmartThemeBodyColor);
            opacity: 0.6;
            transition: all 0.2s ease;
            margin: 0 10px;
            font-size: 1.2em;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #true-hide-toggle:hover {
            opacity: 1;
        }
        #true-hide-toggle.active {
            color: #ff9800; /* 开启时显示为醒目的橙色 */
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // 2. 读取本地存储的状态（实现刷新页面或重新打开聊天时不失效）
    // 默认值为 true（开启彻底隐藏）
    let isTrueHideActive = localStorage.getItem("st-true-hide-state") !== "false"; 

    // 3. 更新 UI 和拦截状态的函数
    const updateState = () => {
        const toggleBtn = $('#true-hide-toggle');
        if (isTrueHideActive) {
            document.body.classList.add("true-hide-active");
            toggleBtn.addClass("active").removeClass("fa-eye").addClass("fa-eye-slash");
            toggleBtn.attr("title", "True Hide: 已开启 (隐藏楼层已彻底消失)");
        } else {
            document.body.classList.remove("true-hide-active");
            toggleBtn.removeClass("active").removeClass("fa-eye-slash").addClass("fa-eye");
            toggleBtn.attr("title", "True Hide: 已关闭 (显示隐藏楼层以便恢复)");
        }
        // 保存状态到浏览器本地
        localStorage.setItem("st-true-hide-state", isTrueHideActive);
    };

    // 4. 创建切换按钮
    const toggleBtn = $('<div id="true-hide-toggle" class="fa-solid fa-eye-slash" title="True Hide"></div>');
    
    // 绑定点击事件
    toggleBtn.on("click", () => {
        isTrueHideActive = !isTrueHideActive;
        updateState();
    });

    // 5. 将按钮安全地插入到 SillyTavern 的顶部导航栏
    // 使用定时器确保 DOM 已经加载完毕
    const insertInterval = setInterval(() => {
        // 优先插入到扩展图标区域
        if ($('#extensions_info').length) {
            $('#extensions_info').prepend(toggleBtn);
            clearInterval(insertInterval);
            updateState();
        } 
        // 备用：插入到顶部栏右侧
        else if ($('#top-bar').length) {
            $('#top-bar').append(toggleBtn);
            clearInterval(insertInterval);
            updateState();
        }
    }, 1000);
});
