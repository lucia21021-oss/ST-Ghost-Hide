(function() {
    // 1. 先清理可能卡住的旧代码
    const oldStyle = document.getElementById("st-true-hide-style");
    if (oldStyle) oldStyle.remove();
    
    // 2. 注入纯净的隐藏样式
    const style = document.createElement("style");
    style.id = "st-true-hide-style";
    
    // 3. 核心：只要酒馆底层判定它是隐藏的，直接让它从前端彻底蒸发
    style.textContent = `
        .mes.mes_hidden,
        .mes[is_hidden="true"],
        .mes[data-is_hidden="true"] {
            display: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 0 !important;
            border: none !important;
            overflow: hidden !important;
        }
    `;
    
    document.head.appendChild(style);
})();
