        document.addEventListener('DOMContentLoaded', (event) => {
            const escapeHtml = (unsafe) => {
                return unsafe.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
            };

            const highlightCode = (code) => {
                return code.replace(/(&lt;\/?)([a-zA-Z0-9\-]+)(.*?&gt;)/g, function(match, p1, p2, p3) {
                    return `${p1}<span class="element-name">${p2}</span>${p3.replace(/(class|id)=("[^"]*")/g, function(m, p4, p5) {
                        return `<span class="attribute-name">${p4}</span>=<span class="attribute-value">${p5}</span>`;
                    })}`;
                }).replace(/&lt;!--.*?--&gt;/g, function(match) {
                    return `<span class="comment">${match}</span>`;
                });
            };

            document.querySelectorAll('.code-block').forEach(codeBlock => {
                const codeContent = codeBlock.getAttribute('data-code-content');
                codeBlock.innerHTML = highlightCode(escapeHtml(codeContent));
            });

            document.querySelectorAll('.copyButton').forEach(button => {
                button.addEventListener('click', function() {
                    const codeBlock = button.nextElementSibling.querySelector('.code-block');
                    const range = document.createRange();
                    range.selectNode(codeBlock);
                    window.getSelection().removeAllRanges(); // Clear any current selection
                    window.getSelection().addRange(range);   // Select the code block
                    document.execCommand('copy');            // Copy the selected text
                    window.getSelection().removeAllRanges(); // Deselect the text

                    alert('Code copied to clipboard!');
                });
            });
        });
