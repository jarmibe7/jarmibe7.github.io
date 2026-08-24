document.querySelectorAll('[data-project-source]').forEach(async (container) => {
  try {
    const response = await fetch(container.dataset.projectSource);
    if (!response.ok) throw new Error(`Unable to load ${container.dataset.projectSource}`);
    const markdown = await response.text();
    const body = markdown.replace(/^---[\s\S]*?---\s*/, '');
    const mathBlocks = [];
    const protectedBody = body.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\]|\$[^$\n]+\$)/g, (match) => {
      const token = `MATHBLOCK${mathBlocks.length}TOKEN`;
      mathBlocks.push(match);
      return token;
    });
    let rendered = marked.parse(protectedBody, { gfm: true, breaks: true });
    mathBlocks.forEach((math, index) => {
      rendered = rendered.replace(`MATHBLOCK${index}TOKEN`, math);
    });
    container.innerHTML = rendered;
    if (window.MathJax) {
      await MathJax.typesetPromise([container]);
    }
  } catch (error) {
    container.innerHTML = '<p>Project content could not be loaded. <a href="../projects.html">Return to projects</a>.</p>';
    console.error(error);
  }
});
