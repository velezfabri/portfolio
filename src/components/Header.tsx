import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../content";

const nav = [
  { id: "inicio", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
];

export function Header({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark",
  );
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#101714" : "#f5f3ed");
    try {
      localStorage.setItem("fabricio-theme", next);
    } catch {
      /* Theme still works without storage. */
    }
    // Text metrics are unchanged, but refresh any viewport-based animations.
    window.dispatchEvent(new Event("resize"));
  };
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Fabricio Velez, inicio"
          onClick={event => { event.preventDefault(); setMenuOpen(false); onNavigate("inicio"); }}
        >
          <span className="monogram">
            fv<span>.</span>
          </span>
          <span className="wordmark-name">
            Fabricio Velez<span>INGENIERO BIOMÉDICO</span>
          </span>
        </a>
        <nav
          id="principal-nav"
          className={`nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Navegación principal"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={event => { event.preventDefault(); setMenuOpen(false); onNavigate(item.id); }}
            >
              {item.label}
            </a>
          ))}
          <a
            className="nav-cv"
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Ver CV
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
        <div className="header-controls">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
          <a
            className="header-cv"
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver CV en PDF"
          >
            CV
            <FileText size={16} aria-hidden="true" />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="principal-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
