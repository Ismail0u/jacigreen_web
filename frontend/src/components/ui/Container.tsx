import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={`mx-auto w-full max-w-page px-5 md:px-8 ${className}`} {...props} />;
}
