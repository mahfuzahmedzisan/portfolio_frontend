import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-left"
  | "external"
  | "github"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "youtube"
  | "mail"
  | "phone"
  | "map-pin"
  | "search"
  | "filter"
  | "sun"
  | "moon"
  | "monitor"
  | "menu"
  | "x"
  | "calendar"
  | "clock"
  | "tag"
  | "code"
  | "layers"
  | "rocket"
  | "spark"
  | "send"
  | "check"
  | "chev-right"
  | "chev-down"
  | "dot"
  | "lock"
  | "logout"
  | "bell"
  | "settings"
  | "edit"
  | "trash"
  | "plus"
  | "user"
  | "briefcase"
  | "graduation"
  | "folder"
  | "feed"
  | "image"
  | "palette"
  | "eye"
  | "eye-off";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 16, ...rest }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
  switch (name) {
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...props}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...props}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "external":
      return (
        <svg {...props}>
          <path d="M14 4h6v6M20 4 10 14M19 13v7H4V5h7" />
        </svg>
      );
    case "github":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a11 11 0 0 1 5.74 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.26 5.65.41.36.78 1.06.78 2.13v3.16c0 .3.21.66.8.55A11.5 11.5 0 0 0 12 .5z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.07 24 18.09 24 12.07z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M23.5 6.51a3 3 0 0 0-2.12-2.13C19.49 3.87 12 3.87 12 3.87s-7.49 0-9.38.51A3 3 0 0 0 .5 6.51 31.27 31.27 0 0 0 0 12a31.27 31.27 0 0 0 .5 5.49 3 3 0 0 0 2.12 2.13c1.89.51 9.38.51 9.38.51s7.49 0 9.38-.51a3 3 0 0 0 2.12-2.13A31.27 31.27 0 0 0 24 12a31.27 31.27 0 0 0-.5-5.49zM9.6 15.57V8.43L15.82 12z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...props}>
          <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "filter":
      return (
        <svg {...props}>
          <path d="M3 5h18M6 12h12M10 19h4" />
        </svg>
      );
    case "sun":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1 1M17.4 17.4l1 1M5.6 18.4l1-1M17.4 6.6l1-1" />
        </svg>
      );
    case "moon":
      return (
        <svg {...props}>
          <path d="M21 13a8 8 0 1 1-9.5-9.5A7 7 0 0 0 21 13z" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M9 21h6M12 17v4" />
        </svg>
      );
    case "menu":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "tag":
      return (
        <svg {...props}>
          <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z" />
          <circle cx="8" cy="8" r="1.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="m9 17-5-5 5-5M15 7l5 5-5 5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...props}>
          <path d="m12 2 10 6-10 6L2 8z" />
          <path d="m2 16 10 6 10-6M2 12l10 6 10-6" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M5 19c-1 0-3 0-3-3 0-2 2-4 4-5l2 2c-1 2-3 4-3 6zM19 5c-2 0-7 1-11 5l4 4c4-4 5-9 5-11z" />
          <circle cx="14" cy="10" r="1.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
        </svg>
      );
    case "send":
      return (
        <svg {...props}>
          <path d="M22 2 11 13M22 2 15 22l-4-9-9-4z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="m5 13 4 4L19 7" />
        </svg>
      );
    case "chev-right":
      return (
        <svg {...props}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "chev-down":
      return (
        <svg {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "dot":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "logout":
      return (
        <svg {...props}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case "edit":
      return (
        <svg {...props}>
          <path d="M11 4H4v16h16v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
        </svg>
      );
    case "trash":
      return (
        <svg {...props}>
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "user":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...props}>
          <path d="M22 10 12 4 2 10l10 6 10-6zM6 12v5c2 2 10 2 12 0v-5" />
        </svg>
      );
    case "folder":
      return (
        <svg {...props}>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "feed":
      return (
        <svg {...props}>
          <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );
    case "image":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      );
    case "palette":
      return (
        <svg {...props}>
          <path d="M12 2a10 10 0 1 0 10 10c0-1.5-2-2-3-2h-2a2 2 0 0 1 0-4h1a3 3 0 0 0 3-3c0-1.5-4-3-9-3z" />
          <circle cx="7" cy="11" r="1.2" fill="currentColor" />
          <circle cx="9" cy="6" r="1.2" fill="currentColor" />
          <circle cx="14" cy="5" r="1.2" fill="currentColor" />
        </svg>
      );
    case "eye":
      return (
        <svg {...props}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "eye-off":
      return (
        <svg {...props}>
          <path d="m3 3 18 18M10.6 6.1A10 10 0 0 1 22 12a10 10 0 0 1-3.7 5.3M6.6 6.6A10 10 0 0 0 2 12s4 7 10 7a10 10 0 0 0 4.4-1.1M9.8 9.8a3 3 0 0 0 4.4 4.4" />
        </svg>
      );
    default:
      return null;
  }
}
