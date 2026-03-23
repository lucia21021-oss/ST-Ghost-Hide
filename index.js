(function() {
    // 防止重复加载
    if (document.getElementById("st-true-hide-style")) return;
    
    const style = document.createElement("style");
    style.id = "st-true-hide-style";
    
    // 核心逻辑：只要带有 is_hidden="true" 属性，就在聊天界面彻底抹除
    style.textContent = `
        #chat .mes[is_hidden="true"],
        #chat .mes[data-is_hidden="true"] {
            display: none !important;
        }
    `;
    
    document.head.appendChild(style);
    console.log("True Hide 极简版已成功加载！"); // 用于测试是否加载成功
})();
