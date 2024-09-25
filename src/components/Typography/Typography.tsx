import { cva, type VariantProps } from "class-variance-authority";

const typographyVariants = cva(["text-black", "font-normal"], {
  variants: {
    font: {
      comfortaa: "font-comfortaa",
      poppins: "font-poppins",
    },
    size: {
      extralarge: "text-[3rem]",
      large: "text-[2rem]",
      medium: "text-[1.5rem]",
      small: "text-[1rem]",
    },
    weight: {
      superbold: "font-black",
      extrabold: "font-extrabold",
      bold: "font-bold",
      normal: "font-normal",
      light: "font-light",
    },
    color: {
      black: "text-black",
      primary: "text-primary",
      secondary: "text-secondary",
      tertiary: "text-tertiary",
    },
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    font: "poppins",
    size: "medium",
    weight: "normal",
    color: "black",
    alignment: "left",
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  font,
  size,
  weight,
  color,
  alignment,
  className = "",
  children,
}) => {
  const typographyClass = typographyVariants({
    font,
    size,
    weight,
    color,
    alignment,
  });

  return <p className={`${typographyClass} ${className}`}>{children}</p>;
};

export default Typography;
