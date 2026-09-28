import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import avatarMorado from "@/imports/Uffito_UFFO_morado_sombra.svg?url";
import avatarVerde from "@/imports/Uffito_UFFO_verde_sombra.svg?url";

type Theme = "light" | "dark";
type IconName =
  | "asterisk"
  | "behance"
  | "cursor"
  | "globe"
  | "instagram"
  | "moon"
  | "pinterest"
  | "share"
  | "sun"
  | "whatsapp";

type LinkItem = {
  title: string;
  icon: IconName;
  subtitle?: string;
  url: string;
};

const siteConfig = {
  logoUrl: "/uffo-logo.svg",
  name: "UFFO studios",
  tagline: "Estudio creativo para personas y marcas",
  footerUrl: "https://uffostudios.com",
  themes: {
    dark: {
      background: "#0A0A0A",
      glow: "#2A3B0C",
      surface: "#1A1A1A",
      border: "rgba(255, 255, 255, 0.08)",
      text: "#FFFFFF",
      muted: "#A3A3A3",
      icon: "#FFFFFF",
      accent: "#BFE61E",
      accentText: "#BFE61E",
      shadow: "none",
      noiseOpacity: "0.075",
    },
    light: {
      background: "#F6F5F0",
      glow: "#D8C0FF",
      surface: "#FFFFFF",
      border: "rgba(0, 0, 0, 0.08)",
      text: "#0A0A0A",
      muted: "#6B6B6B",
      icon: "#0A0A0A",
      accent: "#BFE61E",
      accentText: "#5C7A00",
      shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      noiseOpacity: "0.025",
    },
  },
  links: [
    {
      title: "Contanos tu proyecto",
      icon: "cursor",
      url: "https://uffostudios.com",
    },
    {
      title: "Chateá con nosotros",
      icon: "whatsapp",
      url: "https://wa.me/",
    },
    {
      title: "Visitá nuestra web",
      icon: "globe",
      url: "https://uffostudios.com",
    },
    {
      title: "Portfolio",
      icon: "behance",
      subtitle: "Behance · Portfolio",
      url: "https://www.behance.net/",
    },
    {
      title: "Seguinos en Instagram",
      icon: "instagram",
      subtitle: "Instagram · Profile",
      url: "https://www.instagram.com/",
    },
    {
      title: "¡Inspirate acá!",
      icon: "pinterest",
      subtitle: "Pinterest · Profile",
      url: "https://www.pinterest.com/",
    },
  ] satisfies LinkItem[],
};

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("uffo-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  if (name === "asterisk") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "sun") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "moon") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M20.2 15.4A8.6 8.6 0 0 1 8.6 3.8 8.7 8.7 0 1 0 20.2 15.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "share") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M12 15V3m0 0L8 7m4-4 4 4M6.5 10H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "cursor") {
    return (
      <svg {...common}>
        <path d="m5 3 16 10.2-7.3 1.5-3.8 6.4L5 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m14 15 4.3 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M23.8 13.7a9.8 9.8 0 0 1-14.5 8.6L4 24l1.7-5.1a9.8 9.8 0 1 1 18.1-5.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10.3 8.7c.3-.5.6-.5.9-.2l1.4 2c.2.3.1.6-.1.9l-.8 1c-.2.2-.1.5.1.8.8 1.3 1.8 2.2 3.2 2.9.3.2.6.1.8-.1l.9-1.1c.2-.3.5-.3.8-.2l2.1 1c.4.2.5.4.4.8-.2 1.3-1.4 2.4-2.7 2.5-2 .1-5.6-1.6-7.7-4.2-1.7-2.2-2.2-4.3.7-6.1Z" fill="currentColor" />
      </svg>
    );
  }
  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.8 11h20.4M4.8 18.5h18.4M14 3.5c3 2.8 4.4 6.3 4.4 10.5S17 21.7 14 24.5C11 21.7 9.6 18.2 9.6 14S11 6.3 14 3.5Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (name === "behance") {
    return (
      <svg {...common} viewBox="0 0 32 28">
        <path d="M3 5h8c4 0 6.2 1.9 6.2 5 0 2.1-1 3.6-2.8 4.3 2.5.7 3.8 2.4 3.8 5 0 3.8-2.7 5.7-7.6 5.7H3V5Zm4 3.4v4.4h3.5c1.8 0 2.7-.8 2.7-2.2 0-1.5-.9-2.2-2.7-2.2H7Zm0 7.6v5.5h3.9c2.2 0 3.3-.9 3.3-2.8 0-1.8-1.1-2.7-3.4-2.7H7Z" fill="currentColor" />
        <path d="M21 7h8M25.2 11.4c4.5 0 6.8 2.6 6.8 7.4v1.1h-10c.2 1.9 1.3 2.9 3.3 2.9 1.4 0 2.4-.5 3-1.5h3.3c-.9 2.8-3 4.2-6.4 4.2-4.4 0-7-2.7-7-7.1 0-4.3 2.7-7 7-7Zm-.1 2.8c-1.7 0-2.7.9-3 2.7h6c-.2-1.8-1.2-2.7-3-2.7Z" fill="currentColor" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="21" height="21" rx="6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="20.4" cy="7.8" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M11.1 25c1.1-2.9 2-6 2.7-9.2-.7-1.4-.1-4.2 1.5-4.2 1.2 0 1.8 1 1.8 2.2 0 2.2-1.4 5.5-4.2 5.5-3.4 0-4.8-2.5-4.8-5.5 0-4 3-7 7.5-7 3.7 0 6.2 2.7 6.2 6.2 0 4.6-2.4 7.9-5.9 7.9-1.1 0-2.2-.6-2.6-1.3" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkCard({ item, index }: { item: LinkItem; index: number }) {
  return (
    <a
      className="link-card"
      href={item.url}
      target="_blank"
      rel="noopener"
      style={{ "--delay": `${index * 70}ms` } as CSSProperties}
      aria-label={`${item.title}${item.subtitle ? `, ${item.subtitle}` : ""}`}
    >
      <span className="link-icon"><Icon name={item.icon} /></span>
      <span className="link-copy">
        <span className="link-title">{item.title}</span>
        {item.subtitle && <span className="link-subtitle">{item.subtitle}</span>}
      </span>
      <span className="link-menu" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </a>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const palette = siteConfig.themes[theme];
  const themeVariables = {
    "--background": palette.background,
    "--glow": palette.glow,
    "--surface": palette.surface,
    "--border": palette.border,
    "--text": palette.text,
    "--muted": palette.muted,
    "--icon": palette.icon,
    "--accent": palette.accent,
    "--accent-text": palette.accentText,
    "--surface-shadow": palette.shadow,
    "--noise-opacity": palette.noiseOpacity,
  } as CSSProperties;

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem("uffo-theme")) {
        setTheme(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("uffo-theme", nextTheme);
    setTheme(nextTheme);
  };

  const copyPageUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <main className="app-shell" style={themeVariables}>
      <div className="noise" aria-hidden="true" />
      <div className="content">
        <nav className="topbar" aria-label="Acciones">
          <a className="circle-button brand-button" href="#links" aria-label="Ir a los enlaces">
            <Icon name="asterisk" />
          </a>
          <div className="topbar-actions">
            <button
              className="circle-button"
              type="button"
              onClick={toggleTheme}
              aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
            >
              <span className="theme-icon" key={theme}>
                <Icon name={theme === "dark" ? "sun" : "moon"} />
              </span>
            </button>
            <button
              className="circle-button"
              type="button"
              onClick={copyPageUrl}
              aria-label="Copiar link de esta página"
            >
              <Icon name="share" />
            </button>
          </div>
        </nav>

        <header className="brand-header">
          <div className="avatar">
            <img src={theme === "light" ? avatarMorado : avatarVerde} alt={`Logo de ${siteConfig.name}`} />
          </div>
          <h1>{siteConfig.name}</h1>
          <p>{siteConfig.tagline}</p>
        </header>

        <section className="links" id="links" aria-label="Enlaces de UFFO studios">
          {siteConfig.links.map((item, index) => (
            <LinkCard key={item.title} item={item} index={index} />
          ))}
        </section>

        <footer>
          <a href={siteConfig.footerUrl} target="_blank" rel="noopener">
            <img src={siteConfig.logoUrl} alt="" aria-hidden="true" />
            <span>Made by UFFO studios</span>
          </a>
        </footer>
      </div>

      <div className={`toast ${showToast ? "toast-visible" : ""}`} role="status" aria-live="polite">
        Link copiado
      </div>
    </main>
  );
}
