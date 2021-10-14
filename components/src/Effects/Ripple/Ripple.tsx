import React, { ComponentType, ComponentProps, useState } from "react";

type Box = ComponentType | keyof JSX.IntrinsicElements;
type Props<C extends Box> = {
  component: C;
  children: React.ReactNode;
} & ComponentProps<C>;

const Ripple = <T extends Box>({
  children,
  component: Component = "div" as any,
  ...props
}: Props<T>) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const handleAnimationEnd = (e: AnimationEvent) => {
    if (!ref || !e.currentTarget) return;
    const node = e.currentTarget as Element;

    if (e.animationName === "exit") {
      if (!ref.contains(node)) return;
      ref.removeChild(node);
    }
  };

  const handleMouseUp = () => {
    if (!ref) return;
    Array.prototype.forEach.call(ref.children, (node) =>
      node.classList.add("exit")
    );
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof props.onMouseDown === "function") {
      props.onMouseDown(e);
    }

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
    <Component {...props} onMouseDown={handleMouseDown}>
      {children}
      <div className="ripple" ref={setRef} />
    </Component>
  );
};

export default Ripple;

//  Usage

const Ex = () => {
  return (
    <div style={{ color: blue }}>
      <h1>Example of Ripple</h1>
      <Ripple component={"div"}>Click Me!</Ripple>
    </div>
  );
};
