const host = document.getElementById('host');
const root = host.createShadowRoot();
const template = document.getElementById('template');
const clone = document.importNode(template.content, true);

root.appendChild(clone);