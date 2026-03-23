jQuery(() => {
    // 核心执行函数：强制隐藏或恢复
    const enforceHide = (node) => {
        if (node.nodeType === 1 && node.classList.contains('mes')) {
            // 如果酒馆判定它是隐藏的
            if (node.getAttribute('is_hidden') === 'true') {
                // 强行注入内联样式，优先级最高，无视任何主题覆盖
                node.style.setProperty('display', 'none', 'important');
            } else {
                // 如果被 /unhide 恢复了，就移除隐藏样式
                if (node.style.display === 'none') {
                    node.style.removeProperty('display');
                }
            }
        }
    };

    // 1. 建立一个“监控探头”（MutationObserver）
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // 情况A：当你刷新页面、重新打开酒馆时，聊天记录被加载出来
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList.contains('mes')) {
                            enforceHide(node);
                        } else if (node.querySelectorAll) {
                            // 扫描内部加载的楼层
                            node.querySelectorAll('.mes').forEach(enforceHide);
                        }
                    }
                });
            }
            // 情况B：当你在输入框使用 /hide 或 /unhide 时，属性发生变化
            if (mutation.type === 'attributes' && mutation.attributeName === 'is_hidden') {
                enforceHide(mutation.target);
            }
        });
    });

    // 2. 开始全天候监控整个网页
    observer.observe(document.body, {
        childList: true,
        attributes: true,
        attributeFilter: ['is_hidden'], // 只盯着隐藏属性看，绝对不误伤
        subtree: true
    });

    // 3. 刚打开网页时，立刻对现有的楼层执行一次大扫除
    setTimeout(() => {
        document.querySelectorAll('.mes').forEach(enforceHide);
    }, 500);
});
