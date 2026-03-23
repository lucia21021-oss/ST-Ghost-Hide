jQuery(() => {
    // 防止重复注入
    if (document.getElementById("st-true-hide-pure-css")) return;

    const style = document.createElement("style");
    style.id = "st-true-hide-pure-css";
    
    // 终极精准打击：只认酒馆官方的隐藏属性，绝对不误伤任何正常楼层！
    style.textContent = `
        #chat .mes[is_hidden="true"],
        #chat .mes[data-is_hidden="true"],
        #chat .mes.mes_hidden {
            display: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        }
    `;
    
    document.head.appendChild(style);
});
