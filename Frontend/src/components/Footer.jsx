import { palette } from "./public/theme";
import { BRAND } from "./public/content";
const { line, muted, coral, text } = palette;
function Footer() {
  return (
    <footer style={{ borderColor: line }} className="border-t">
      <div
        className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px]"
        style={{ color: muted }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{ background: coral }}
            className="w-7 h-7 rounded-full grid place-items-center text-white text-[13px]"
          >
            N
          </span>
          <span
            className="text-[16px]"
            style={{ fontWeight: 600, color: text }}
          >
            {BRAND}
          </span>
        </div>
        <span>
          © {/* @__PURE__ */ new Date().getFullYear()} — Strategic real estate
          investment.
        </span>
      </div>
    </footer>
  );
}
export { Footer as default };
