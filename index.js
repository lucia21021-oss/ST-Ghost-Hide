// 极简纯净版：无UI，无存储，无多余功能。
// 仅仅在页面加载时注入一段 CSS，强制让被酒馆标记为“隐藏”的楼层彻底消失。

jQuery(() => {
    const style = document.createElement("style");
    style.id = "st-true-hide-pure-css";
    
    // 兼容目前酒馆所有可能用来标记“隐藏”的网页标签
    style.textContent = `
        #chat .mes_hidden,
        #chat .mes[is_hidden="true"],
        #chat .mes[ch_hidden="true"],
        #chat .mes[data-is_hidden="true"] {
            display: none !important;
        }
    `;
    
    document.head.appendChild(style);
});
