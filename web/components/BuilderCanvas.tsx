"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";

/* ============================================================
   GrapesJS sandbox — OMI branded drag-and-drop builder
   Client-only. Persists to localStorage under `omi-builder-${projectId}`.
   ============================================================ */

const STORAGE_KEY = "omi-builder-default";

const BRAND_CSS = `
  /* Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Kaushan+Script&display=swap');
  body { font-family: 'Inter', system-ui, sans-serif; color: #0B1F3D; background: #F4F6FA; }
  h1,h2,h3,h4 { font-family: 'Montserrat', system-ui, sans-serif; font-weight: 800; letter-spacing: -0.01em; }
  .omi-hero { background: linear-gradient(135deg,#0B1F3D 0%,#152C5B 55%,#17A4C2 100%); color:#fff; padding:96px 48px; text-align:center; }
  .omi-hero h1 { font-size:4rem; line-height:1.05; margin:0 0 16px; }
  .omi-script { font-family:'Kaushan Script',cursive; color:#D4A24C; font-weight:400; }
  .omi-btn { display:inline-block; padding:14px 28px; border-radius:999px; background:linear-gradient(135deg,#D4A24C,#F2C54A); color:#0B1F3D; font-family:'Montserrat',sans-serif; font-weight:600; text-decoration:none; box-shadow:0 8px 24px rgba(212,162,76,.28); }
  .omi-btn-ghost { display:inline-block; padding:14px 28px; border-radius:999px; border:1px solid rgba(255,255,255,.25); color:#fff; font-family:'Montserrat',sans-serif; font-weight:600; text-decoration:none; }
  .omi-section { padding:96px 48px; }
  .omi-section-light { background:#F4F6FA; color:#0B1F3D; }
  .omi-section-dark { background:#0B1F3D; color:#fff; }
  .omi-eyebrow { text-transform:uppercase; letter-spacing:.2em; font-size:12px; font-weight:600; color:#D4A24C; font-family:'Montserrat',sans-serif; }
  .omi-card { background:#fff; border:1px solid #D9DEE8; border-radius:16px; padding:32px; box-shadow:0 1px 2px rgba(11,31,61,.08); }
`;

const OMI_BLOCKS = [
  {
    id: "omi-hero",
    label: "OMI Hero",
    category: "OMI",
    content: `<section class="omi-hero"><div class="omi-eyebrow">Est. 2008 · Faith · Education · Leadership · Impact</div><h1>Transforming Lives. <span class="omi-script">Igniting Futures.</span></h1><p style="max-width:640px;margin:16px auto 32px;font-size:18px;opacity:.85">Short lede copy goes here. Replace with your own.</p><a href="#" class="omi-btn">Primary CTA</a> <a href="#" class="omi-btn-ghost">Secondary</a></section>`,
  },
  {
    id: "omi-section-light",
    label: "Light Section",
    category: "OMI",
    content: `<section class="omi-section omi-section-light"><div style="max-width:1200px;margin:0 auto"><div class="omi-eyebrow">Section eyebrow</div><h2 style="font-size:3rem;margin:16px 0 24px">Section title</h2><p style="font-size:18px;line-height:1.65;max-width:720px">Body copy paragraph — replace with real content.</p></div></section>`,
  },
  {
    id: "omi-section-dark",
    label: "Dark Section",
    category: "OMI",
    content: `<section class="omi-section omi-section-dark"><div style="max-width:1200px;margin:0 auto"><div class="omi-eyebrow">Section eyebrow</div><h2 style="font-size:3rem;margin:16px 0 24px;color:#fff">Section title</h2><p style="font-size:18px;line-height:1.65;max-width:720px;color:rgba(255,255,255,.8)">Body copy paragraph.</p></div></section>`,
  },
  {
    id: "omi-three-cards",
    label: "3-Card Grid",
    category: "OMI",
    content: `<section class="omi-section omi-section-light"><div style="max-width:1200px;margin:0 auto"><h2 style="font-size:3rem;margin:0 0 48px">Three rhythms</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px"><div class="omi-card"><div style="font-weight:900;color:#D4A24C;font-size:24px;font-family:'Montserrat'">01</div><h3 style="font-size:1.5rem;margin:8px 0 16px">Card one</h3><p style="font-size:14px;line-height:1.6;color:#2A2D34">Card copy here.</p></div><div class="omi-card"><div style="font-weight:900;color:#D4A24C;font-size:24px;font-family:'Montserrat'">02</div><h3 style="font-size:1.5rem;margin:8px 0 16px">Card two</h3><p style="font-size:14px;line-height:1.6;color:#2A2D34">Card copy here.</p></div><div class="omi-card"><div style="font-weight:900;color:#D4A24C;font-size:24px;font-family:'Montserrat'">03</div><h3 style="font-size:1.5rem;margin:8px 0 16px">Card three</h3><p style="font-size:14px;line-height:1.6;color:#2A2D34">Card copy here.</p></div></div></div></section>`,
  },
  {
    id: "omi-cta",
    label: "CTA Band",
    category: "OMI",
    content: `<section class="omi-section" style="background:linear-gradient(135deg,#0B1F3D 0%,#152C5B 50%,#17A4C2 100%);color:#fff;text-align:center"><div style="max-width:800px;margin:0 auto"><div class="omi-eyebrow">Partner with us</div><h2 style="font-size:3rem;color:#fff;margin:16px 0 24px">Be part of the <span class="omi-script">Outpouring</span>.</h2><p style="font-size:18px;opacity:.85;margin:0 0 32px">Call-to-action copy goes here.</p><a href="#" class="omi-btn">Give now</a></div></section>`,
  },
];

const BRAND_COLORS = ["#0B1F3D", "#152C5B", "#D4A24C", "#F2C54A", "#17A4C2", "#00C2E0", "#F4F6FA", "#FFFFFF", "#141518"];

type Props = {
  onExport?: (html: string, css: string) => void;
};

export default function BuilderCanvas({ onExport }: Props) {
  const editorEl = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [ready, setReady] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportHtml, setExportHtml] = useState("");
  const [exportCss, setExportCss] = useState("");
  const [saveToast, setSaveToast] = useState("");

  useEffect(() => {
    if (!editorEl.current || editorRef.current) return;

    const saved = (() => {
      if (typeof window === "undefined") return null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    })();

    const editor = grapesjs.init({
      container: editorEl.current,
      height: "100%",
      width: "100%",
      storageManager: false,
      plugins: [grapesjsPresetWebpage, grapesjsBlocksBasic],
      pluginsOpts: {
        [grapesjsPresetWebpage as unknown as string]: {},
        [grapesjsBlocksBasic as unknown as string]: {},
      },
      canvas: { styles: [BRAND_CSS] as unknown as string[] },
      components: saved?.html ?? "",
      style: saved?.css ?? "",
      colorPicker: { appendTo: "parent" },
      blockManager: { appendTo: "#omi-blocks" },
      layerManager: { appendTo: "#omi-layers" },
      styleManager: { appendTo: "#omi-styles" },
      traitManager: { appendTo: "#omi-traits" },
      selectorManager: { appendTo: "#omi-selectors" },
      panels: { defaults: [] },
    });

    OMI_BLOCKS.forEach((b) => editor.BlockManager.add(b.id, b));

    // Inject brand color swatches into any color picker
    editor.on("load", () => {
      const cp = (editor as unknown as { StyleManager?: { getConfig?: () => { colorPicker?: { palette?: string[][] } } } }).StyleManager?.getConfig?.();
      if (cp?.colorPicker) cp.colorPicker.palette = [BRAND_COLORS];
    });

    editorRef.current = editor;
    setReady(true);

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  function handleSave() {
    if (!editorRef.current) return;
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ html, css, at: Date.now() }));
    setSaveToast("Saved to this browser");
    setTimeout(() => setSaveToast(""), 2000);
  }

  function handleExport() {
    if (!editorRef.current) return;
    setExportHtml(editorRef.current.getHtml());
    setExportCss(editorRef.current.getCss() ?? "");
    setExportOpen(true);
  }

  async function handleCopyFull() {
    const full = `<style>${exportCss}</style>\n${exportHtml}`;
    try {
      await navigator.clipboard.writeText(full);
      setSaveToast("Copied HTML + CSS");
      setTimeout(() => setSaveToast(""), 2000);
    } catch {
      setSaveToast("Clipboard failed");
      setTimeout(() => setSaveToast(""), 2000);
    }
  }

  function handleClear() {
    if (!editorRef.current) return;
    if (!confirm("Clear the canvas? This cannot be undone.")) return;
    editorRef.current.DomComponents.clear();
    editorRef.current.CssComposer.clear();
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="flex flex-col h-screen bg-graphite text-white">
      {/* Top bar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 bg-indigo-deep">
        <div className="flex items-center gap-4">
          <span className="font-display font-black text-gold-heritage">OMI Builder</span>
          <span className="text-[11px] uppercase tracking-widest text-mist/50">Sandbox · changes stay in this browser</span>
        </div>
        <div className="flex items-center gap-2">
          {saveToast && <span className="text-xs text-gold-heritage font-display mr-2">{saveToast}</span>}
          <button onClick={handleClear} className="text-xs font-display px-3 py-1.5 rounded border border-white/20 text-white/70 hover:bg-white/5">Clear</button>
          <button onClick={handleSave} className="text-xs font-display px-3 py-1.5 rounded border border-white/20 text-white hover:bg-white/10">Save</button>
          <button onClick={handleExport} className="text-xs font-display px-3 py-1.5 rounded bg-gold-heritage text-indigo-deep font-semibold hover:bg-gold-bright">Export HTML</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        {/* Left panel: blocks */}
        <aside className="w-72 border-r border-white/10 overflow-y-auto bg-indigo-deep/95">
          <div className="p-3 eyebrow text-gold-heritage border-b border-white/10">Blocks</div>
          <div id="omi-blocks" className="p-2" />
        </aside>

        {/* Editor canvas */}
        <div className="flex-1 min-w-0 bg-[#222] relative">
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center text-mist/60 font-display">
              Loading editor…
            </div>
          )}
          <div ref={editorEl} className="h-full w-full" />
        </div>

        {/* Right panel: style / layers / traits */}
        <aside className="w-80 border-l border-white/10 overflow-y-auto bg-indigo-deep/95">
          <div className="p-3 eyebrow text-gold-heritage border-b border-white/10">Selector</div>
          <div id="omi-selectors" />
          <div className="p-3 eyebrow text-gold-heritage border-t border-b border-white/10">Style</div>
          <div id="omi-styles" />
          <div className="p-3 eyebrow text-gold-heritage border-t border-b border-white/10">Traits</div>
          <div id="omi-traits" />
          <div className="p-3 eyebrow text-gold-heritage border-t border-b border-white/10">Layers</div>
          <div id="omi-layers" />
        </aside>
      </div>

      {/* Export modal */}
      {exportOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setExportOpen(false)}>
          <div className="bg-indigo-deep border border-white/10 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="font-display font-black text-gold-heritage">Export</div>
                <div className="text-xs text-mist/60 mt-1">Paste into a component, or ping me and I&apos;ll convert it to React/JSX.</div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleCopyFull} className="text-xs font-display px-3 py-1.5 rounded bg-gold-heritage text-indigo-deep font-semibold hover:bg-gold-bright">Copy HTML + CSS</button>
                <button onClick={() => setExportOpen(false)} className="text-xs font-display px-3 py-1.5 rounded border border-white/20 text-white/70 hover:bg-white/5">Close</button>
              </div>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 font-mono text-xs">
              <div>
                <div className="text-gold-heritage font-display mb-2">HTML</div>
                <pre className="bg-black/40 p-3 rounded text-mist whitespace-pre-wrap break-all">{exportHtml}</pre>
              </div>
              <div>
                <div className="text-gold-heritage font-display mb-2">CSS</div>
                <pre className="bg-black/40 p-3 rounded text-mist whitespace-pre-wrap break-all">{exportCss}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
