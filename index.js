jQuery(() => {
    const style = document.createElement("style");
    style.id = "st-true-hide-pure-css";
    
    // 精确制导：只有当小幽灵图标（.fa-ghost）出现在“文本正文区（.mes_text）”里时，才将整栋楼隐藏。
    // 这样能完美避开隐藏在操作菜单里的按钮图标，100% 杜绝误伤正常楼层！
    style.textContent = `
        #chat .mes:has(.mes_text .fa-ghost) {
            display: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        }
    `;
    
    document.head.appendChild(style);
});
