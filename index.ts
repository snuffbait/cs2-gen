import definePlugin from "@utils/types";
import { CloudUpload } from "@webpack/common";

const t = /\.tar\.\w+$/;
const s = [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".opus", ".txt"];
const i = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const n = [];

function show(o) {
    const e = document.createElement("div");
    e.style.cssText = `position:fixed;top:${70 + n.length * 70}px;right:380px;background:rgba(0,0,0,.85);color:#fff;padding:10px 15px;border-radius:5px;font-size:14px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.5);pointer-events:none;transition:top .3s,opacity .3s;min-width:200px`;
    e.innerHTML = `<div style="font-weight:bold;margin-bottom:3px">Uploading:</div><div style="color:#aaa;word-break:break-all">${o}</div>`;
    
    document.body.appendChild(e);
    n.push(e);
    
    setTimeout(() => {
        e.style.opacity = "0";
        setTimeout(() => {
            e.remove();
            const x = n.indexOf(e);
            if (x > -1) {
                n.splice(x, 1);
                n.forEach((a, b) => a.style.top = `${70 + b * 70}px`);
            }
        }, 300);
    }, 3000);
}

async function clean(f) {
    const m = new Image();
    const u = URL.createObjectURL(f);
    m.src = u;
    await new Promise(r => m.onload = r);
    
    const c = document.createElement("canvas");
    c.width = m.width;
    c.height = m.height;
    c.getContext("2d").drawImage(m, 0, 0);
    URL.revokeObjectURL(u);
    
    const b = await new Promise(r => c.toBlob(r, f.type || "image/png", 0.95));
    return new File([b], f.name, { type: f.type || "image/png", lastModified: Date.now() });
}

function rand(len) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let j = 0; j < len; j++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export default definePlugin({
    name: "AAAAAAAAAAA FAE",
    description: "fae fae fae",
    authors: [{ id: "832999544844845056", name: "Fae" }],
    
    patches: [{
        find: "async uploadFiles(",
        replacement: [{
            match: /async uploadFiles\((\i)\){/,
            replace: "$&await Promise.all($1.map($self.run));"
        }]
    }],
    
    async run(u) {
        const l = u.filename.toLowerCase();
        if (s.some(e => l.endsWith(e))) return;
        
        const o = u.filename;
        
        if (i.some(e => l.endsWith(e)) && u.item.file) {
            u.item.file = await clean(u.item.file);
        }
        
        const m = t.exec(u.filename);
        const x = m?.index ?? u.filename.lastIndexOf(".");
        const e = x !== -1 ? u.filename.slice(x) : "";
        const r = rand(8);
        u.filename = `Fae_was_here_${r}${e}`;
        
        show(o);
    }
});