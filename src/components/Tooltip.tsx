import React, { useState } from "react";

interface TooltipProps {
  content: string;
  position?: "top" | "right" | "bottom" | "left"; // Posiciones posibles
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const tooltipWrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  };

  // Estilos para el contenedor del tooltip
  const tooltipBubbleStyle: React.CSSProperties = {
    position: position === "left" ? "relative" : "absolute",
    backgroundColor: "#FFA500",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    whiteSpace: "nowrap",
    zIndex: 1000,
    visibility: visible ? "visible" : "hidden",
    minWidth: "120px", // Mínimo ancho para evitar colapso
    // Posición del tooltip dependiendo del valor de "position"
    top:
      position === "bottom"
        ? "calc(100% + 15px)"
        : position === "top"
        ? "calc(-100% - 28px)"
        : "50%",
    left:
      position === "right"
        ? "calc(100% + 18px)"
        : position === "left"
        ? "-110%" // Posiciona el tooltip completamente a la izquierda del botón
        : "50%",
    transform:
      position === "top" || position === "bottom"
        ? "translateX(-50%)"
        : position === "left"
        ? "translateY(-80%)"
        : "translateY(-50%)",
  };

  // Estilos para la flecha del tooltip
  const tooltipArrowStyle = (): React.CSSProperties => {
    const baseArrowStyle: React.CSSProperties = {
      position: "absolute",
      width: "0",
      height: "0",
    };

    switch (position) {
      case "top":
        return {
          ...baseArrowStyle,
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid #FFA500",
        };
      case "right":
        return {
          ...baseArrowStyle,
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: "8px solid transparent",
          borderBottom: "8px solid transparent",
          borderRight: "8px solid #FFA500",
        };
      case "bottom":
        return {
          ...baseArrowStyle,
          top: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid #FFA500",
        };
      case "left":
        return {
          ...baseArrowStyle,
          right: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: "8px solid transparent",
          borderBottom: "8px solid transparent",
          borderLeft: "8px solid #FFA500",
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={tooltipWrapperStyle}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div style={tooltipBubbleStyle}>
        {content}
        <div style={tooltipArrowStyle()} />
      </div>
    </div>
  );
};

export default Tooltip;
