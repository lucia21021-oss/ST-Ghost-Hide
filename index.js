jQuery(() => {
    const style = document.createElement("style");
    style.id = "st-true-hide-pure-css";
    
    // 终极绝杀选择器：
    style.textContent = `
        /* 1. 命中任何被打上标准隐藏标签的楼层 */
        #chat .mes.mes_hidden,
        #chat .mes.is_hidden,
        #chat .mes[is_hidden="true"],
        #chat .mes[data-is_hidden="true"],
        
        /* 2. 核心排除法：捕获任何出现在“操作菜单（.mes_buttons）”之外的幽灵图标！*/
        #chat .mes:has(.fa-ghost:not(.mes_buttons *)),
        
        /* 3. 补刀方案：幽灵图标出现在名字、徽章或时间区域时必定击杀 */
        #chat .mes:has(.mes_name .fa-ghost),
        #chat .mes:has(.mes_badges .fa-ghost),
        #chat .mes:has(.mes_timestamp .fa-ghost) {
            display: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        }
    `;
    
    document.head.appendChild(style);
});
