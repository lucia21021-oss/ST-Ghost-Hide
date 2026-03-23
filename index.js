jQuery(() => {
    const style = document.createElement("style");
    style.id = "st-true-hide-pure-css";
    
    // 追踪那个“小幽灵”并连同整个楼层一起强制抹除
    style.textContent = `
        /* 只要气泡/楼层内出现了小幽灵图标，彻底让它从前端消失 */
        #chat .mes:has(.fa-ghost),
        #chat .sysMessage:has(.fa-ghost),
        #chat .mes_system:has(.fa-ghost),
        #chat [is_hidden="true"] {
            display: none !important;
            opacity: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }
    `;
    
    document.head.appendChild(style);
});
