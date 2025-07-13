// gradient_text_raw.js
/**
 * 生成带有黑白渐变效果的文本 (纯 ANSI 转义序列)
 * @param {string} text 要渐变的文本
 * @returns {string} 带有 ANSI 颜色代码的字符串
 */
function generateBlackToWhiteGradientTextRaw(text) {
    let output = '';
    const numChars = text.length;

    for (let i = 0; i < numChars; i++) {
        const factor = numChars === 1 ? 0 : i / (numChars - 1);
        const colorValue = Math.round(255 * factor); // R, G, B 值相同

        // ANSI 转义序列用于设置前景色的 24 位真彩色: \x1b[38;2;<R>;<G>;<B>m
        output += `\x1b[38;2;${colorValue};${colorValue};${colorValue}m${text[i]}`;
    }

    // 重置 ANSI 样式: \x1b[0m
    output += '\x1b[0m';
    return output;
}

const textToDisplay = "双子谈";
const gradientOutput = generateBlackToWhiteGradientTextRaw(textToDisplay);

// 打印到控制台
console.log(gradientOutput);