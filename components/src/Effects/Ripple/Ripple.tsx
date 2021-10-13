import React, { PropsWithChildren, useState } from "react";

type Override<T extends object, O extends object> = {
  [K in Exclude<keyof O, keyof T>]?: O[K];
} &
  { [K in Extract<keyof T, keyof O>]?: O[K] };

type ButtonBaseProps<T extends object> = {
  element: keyof JSX.IntrinsicElements | React.ComponentType<T>;
  className?: string;
} & Override<{}, T>;

export const ButtonBase = <T extends object>({
  children,
  className,
  element,
  ...props
}: PropsWithChildren<ButtonBaseProps<T>>) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const handleAnimationEnd = (e: AnimationEvent) => {
    if (!ref || !e.currentTarget) return;
    const node = e.currentTarget as Element;

    if (e.animationName === "exit") {
      if (!ref.contains(node)) return;
      ref.removeChild(node);
    }
  };

  const handleContextMenu = () => {
    if (!ref) return;
  };

  const handleMouseUp = () => {
    if (!ref) return;

    Array.prototype.forEach.call(ref.children, (node) =>
      node.classList.add("exit")
    );
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const span = document.createElement("span");

    if (!ref) return;

    span.addEventListener("animationend", handleAnimationEnd);
    window.addEventListener("mouseup", handleMouseUp);

    const rect = ref.getBoundingClientRect();

    const top = e.clientY - rect.top;
    const left = e.clientX - rect.left;

    const size =
      Math.round(
        Math.max(
          left,
          Math.abs(left - rect.width),
          top,
          Math.abs(top - rect.height)
        ) * 2
      ) + 20;

    span.style.top = top - size / 2 + "px";
    span.style.left = left - size / 2 + "px";
    span.style.width = size + "px";
    span.style.height = size + "px";

    setTimeout(() => {
      if (!span) return;
      span.classList.add("enter");
    }, 0);

    if (ref.children.length >= 3) {
      const first = ref.children[0];
      if (first !== undefined) ref.removeChild(first);
    }
    ref.appendChild(span);
  };

  return (
    <div
      {...props}
      as={element as React.ComponentType<any>}
      className={className} // styles.root
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      spellCheck="false"
    >
      {children}
      <div className="ripple" ref={setRef} />
    </div>
  );
};
