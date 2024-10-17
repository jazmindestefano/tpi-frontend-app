import type {VariantProps} from "class-variance-authority";
import {buttonVariants} from "./buttonVariants.ts";
import React from "react";
import Button from "./Button.tsx";
import {VolumeIcon} from "../icons/Icons.tsx";

interface VolumeButtonProps extends Omit<VariantProps<typeof buttonVariants>, 'size' | 'shape'> {
  onClick?: () => void;
  className?: string
}

export const VolumeButton: React.FC<VolumeButtonProps> = ({variant, onClick, className}) => {
  return (
    <Button size={"circle"} variant={variant} shape={"circle"} onClick={onClick} className={className}>
      <VolumeIcon/>
    </Button>
  )
}