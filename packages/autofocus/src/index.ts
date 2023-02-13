import { createEffect, onMount, JSX, Accessor } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      autofocus: boolean;
    }
  }
}

/**
 * Directive to autofocus the element on render. Uses the native `autofocus` attribute to decided whether to focus.
 *
 * @param element - Element to focus.
 * @param autofocus - Should this directive be enabled. defaults to false.
 *
 * @example
 * ```ts
 * import { autofocus } from "@solid-primitives/autofocus";
 *
 * <button use:autofocus autofocus={true}>Autofocused</button>;
 * ```
 */
export const autofocus = (element: HTMLInputElement, autofocus: () => boolean) => {
  if (!autofocus()) {
    return;
  }

  onMount(() => {
    // Using a timeout makes it consistent
    if (element.hasAttribute("autofocus"))
      setTimeout(() => {
        element.focus();
      });
  });
};

/**
 * Creates a new reactive primitive for autofocusing the element on render.
 *
 * @param ref - Element to focus.
 * @param autofocus - Whether the element should be autofocused. defaults to true.
 *
 * @example
 * ```ts
 * let ref!: HTMLButtonElement;
 *
 * createAutofocus(() => ref); // Or using a signal accessor.
 *
 * <button ref={ref}>Autofocused</button>;
 * ```
 */
export const createAutofocus = (
  ref: Accessor<HTMLElement | undefined>,
  autofocus: boolean = true
) => {
  createEffect(() => {
    if (autofocus)
      setTimeout(() => {
        ref()?.focus();
      });
  });
};

// only here so the `JSX` import won't be shaken off the tree:
export type E = JSX.Element;
