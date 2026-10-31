// Keep images uploaded through the CMS working on GitHub Pages project paths.
export default function rehypeBase({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    if (!prefix) return;
    const visit = (node) => {
      if (node.type === 'element' && node.properties) {
        for (const property of ['src', 'href']) {
          const value = node.properties[property];
          if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
            && value !== prefix && !value.startsWith(`${prefix}/`)) {
            node.properties[property] = `${prefix}${value}`;
          }
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
