// 👻 Ghost Hide 终极防暴毙版
const extensionName = "st-true-hide";
const defaultSettings = { mode: 'hover' };

// 1. 安全创建并注入 Style 标签
const styleElement = document.createElement("style");
styleElement.id = "true-hide-css";
document.head.appendChild(styleElement);

function updateCSS(mode) {
    // 地毯式轰炸选择器：兼容目前酒馆所有可能用来标记“隐藏”的网页元素标签
    const nuclearSelectors = `
        #chat .mes.mes_hidden, 
        #chat div.mes[is_hidden="true"], 
        #chat div.mes[ch_hidden="true"], 
        #chat div.mes[data-is_hidden="true"]
    `;
    
    if (mode === "invisible") {
        styleElement.textContent = `${nuclearSelectors} { display: none !important; }`;
    } else if (mode === "hover") {
        styleElement.textContent = `
            ${nuclearSelectors} {
                max-height: 4px !important;
                min-height: 0px !important;
                padding: 0px !important;
                margin: 0px !important;
                opacity: 0 !important;
                overflow: hidden !important;
                transition: all 0.3s ease !important;
                border: none !important;
            }
            ${nuclearSelectors}:hover {
                max-height: 5000px !important;
                padding: 10px !important;
                opacity: 0.8 !important;
                border: 1px dashed var(--SmartThemeBorderColor, #ccc) !important;
            }
        `;
    } else {
        styleElement.textContent = ""; 
    }
}

// 2. 使用轮询等待酒馆完全加载（100% 触发，防死机）
const initInterval = setInterval(() => {
    const extSettingsContainer = document.getElementById("extensions_settings");
    if (extSettingsContainer) {
        clearInterval(initInterval);
        initExtension();
    }
}, 500);

function initExtension() {
    // 3. 读取或初始化设置
    let settings = window.extension_settings ? window.extension_settings[extensionName] : null;
    if (!settings) {
        settings = defaultSettings;
        if (window.extension_settings) {
            window.extension_settings[extensionName] = settings;
        }
    }
    
    // 初始化应用 CSS
    updateCSS(settings.mode);

    // 4. 构建原生 HTML5 折叠 UI (抛弃酒馆内置组件，绝对不会卡死)
    const containerHtml = `
        <div class="extension-settings" id="true_hide_settings" style="margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.1); border: 1px solid var(--SmartThemeBorderColor, #555); border-radius: 8px;">
            <details>
                <summary style="cursor: pointer; font-weight: bold; font-size: 1.1em; outline: none;">👻 Ghost Hide (彻底隐形) 🔽</summary>
                <div style="padding-top:15px;">
                    <label for="true_hide_mode" style="display:block; margin-bottom:5px;">选择隐身模式 / Hide Mode</label>
                    <select id="true_hide_mode" class="text_pole" style="width: 100%; margin-bottom: 10px; padding: 5px;">
                        <option value="hover">悬浮显形 (推荐: 鼠标滑过缝隙可显现)</option>
                        <option value="invisible">彻底消失 (最纯净: 仅靠命令恢复)</option>
                        <option value="disabled">禁用扩展 (恢复酒馆默认效果)</option>
                    </select>
                    <small style="color: #aaa;">
                        <b>操作提示：</b><br>
                        🔹 隐藏单层：输入 <code>/hide 5</code> <br>
                        🔹 批量恢复：输入 <code>/unhide 10-15</code> <br>
                        （注：如果在前端点击消息自带的“隐藏/小眼睛”按钮，也会瞬间隐身）
                    </small>
                </div>
            </details>
        </div>
    `;
    
    // 注入 UI
    $("#extensions_settings").append(containerHtml);

    // 5. 绑定下拉菜单事件
    const selectEl = document.getElementById("true_hide_mode");
    selectEl.value = settings.mode;

    selectEl.addEventListener("change", (e) => {
        const newMode = e.target.value;
        settings.mode = newMode;
        
        // 保存到酒馆内存
        if (window.extension_settings) {
            window.extension_settings[extensionName] = settings;
        }
        // 呼叫酒馆保存到文件
        if (typeof window.saveSettingsDebounced === "function") {
            window.saveSettingsDebounced();
        }
        
        // 立刻应用新样式
        updateCSS(newMode);
    });
}
