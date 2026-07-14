import logo from "../assets/logo.png";

/**
 * The official emblem. On dark backgrounds pass `onDark` so the logo's own
 * white ring stays legible against the navy.
 */
export default function Emblem({ size = 48, onDark = false, alt = "" }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "inline-block",
        borderRadius: "50%",
        overflow: "hidden",
        background: onDark ? "#fff" : "transparent",
        boxShadow: onDark ? "0 0 0 1px rgba(255,255,255,0.25)" : "none",
      }}
    >
      <img
        src={logo}
        alt={alt}
        width={size}
        height={size}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </span>
  );
}
