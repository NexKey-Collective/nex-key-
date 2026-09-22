import { palette } from "./public/theme";
import logo from "../assets/logo.png";
const { line, muted } = palette;
function Footer() {
  return (
    <footer style={{ borderColor: line }} className="border-t">
      <div
        className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px]"
        style={{ color: muted }}
      >
        <div className="flex items-center gap-2">
          <img src={logo} alt="NexKey Collective" className="h-7 w-auto" />
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
