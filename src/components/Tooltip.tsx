import React, { useState } from "react";

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
  content,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {isVisible && (
        <div className="tooltip-content" style={tooltipStyles}>
          {content}
        </div>
      )}
    </div>
  );
};

// Estilos en línea para el tooltip, puedes moverlos a un archivo CSS
const tooltipStyles: React.CSSProperties = {
  position: "absolute",
  top: "-35px",
  backgroundColor: "#333",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "4px",
  whiteSpace: "nowrap",
  zIndex: 1000,
  fontSize: "12px",
};

export default Tooltip;
