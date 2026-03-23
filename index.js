import { extension_settings } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

const extensionName = "st-true-hide";
const defaultSettings = { mode: 'hover' };

// 初始化设置
if (!extension_settings[extensionName]) {
    extension_settings[extensionName] = defaultSettings;
}

// 动态注入样式表
let styleElement = document.createElement("style");
styleElement.id = "true-hide-css";
document.head.appendChild(styleElement);

function updateCSS() {
    const mode = extension_settings[extensionName].mode;
    if (mode === "invisible") {
        styleElement.innerHTML = `.mes.mes_hidden { display: none !important; }`;
    } else if (mode === "hover") {
        styleElement.innerHTML = `
            .mes.mes_hidden {
                max-height: 4px !important;
                min-height: 0px !important;
                padding: 0px !important;
                margin: 0px !important;
                opacity: 0 !important;
                overflow: hidden !important;
                transition: all 0.3s ease !important;
                border: none !important;
            }
            .mes.mes_hidden:hover {
                max-height: 5000px !important;
                padding: 10px !important;
                opacity: 0.8 !important;
                border: 1px dashed var(--SmartThemeBorderColor, #ccc) !important;
            }
        `;
    } else {
        styleElement.innerHTML = ""; // 禁用扩展时的默认效果
    }
}

// 在酒馆加载完毕后生成前端 UI
jQuery(async () => {
    updateCSS();

    // 构建原生风格的折叠菜单UI
    const container = $(`
        <div class="extension-settings" id="true_hide_settings">
            <div class="inline-drawer">
                <div class="inline-drawer-toggle inline-drawer-header">
                    <b>👻 Ghost Hide (彻底隐形)</b>
                    <div class="inline-drawer-icon fa-solid fa-chevron-down down"></div>
                </div>
                <div class="inline-drawer-content" style="display:none; padding-top:10px;">
                    <label for="true_hide_mode">选择隐身模式 / Hide Mode</label>
                    <select id="true_hide_mode" class="text_pole">
                        <option value="hover">悬浮显形 (推荐: 鼠标滑过接缝可显现)</option>
                        <option value="invisible">彻底消失 (最纯净: 仅靠命令恢复)</option>
                        <option value="disabled">禁用扩展 (恢复酒馆默认效果)</option>
                    </select>
                    <small>
                        <br><b>提示：</b> 使用 <code>/hide 5</code> 隐藏单楼层；使用 <code>/unhide 10-15</code> 批量恢复楼层。
                    </small>
                </div>
            </div>
        </div>
    `);

    // 将菜单添加到扩展面板
    $("#extensions_settings").append(container);

    // 绑定设置变更事件
    const selectEl = $("#true_hide_mode");
    selectEl.val(extension_settings[extensionName].mode);

    selectEl.on("change", function() {
        extension_settings[extensionName].mode = $(this).val();
        saveSettingsDebounced();
        updateCSS(); // 切换模式时立即生效
    });
    
    // 绑定折叠菜单的开合动画
    container.find('.inline-drawer-toggle').on('click', function() {
        const content = $(this).next('.inline-drawer-content');
        const icon = $(this).find('.inline-drawer-icon');
        content.slideToggle();
        icon.toggleClass('down up');
        if(icon.hasClass('fa-chevron-down')) {
            icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });
});
