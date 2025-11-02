/**
 * Modern View Transitions API utility
 * Provides smooth page transitions with fallback for unsupported browsers
 */

interface ViewTransitionOptions {
  updateDOM: () => void | Promise<void>;
  skipTransition?: boolean;
}

/**
 * Checks if View Transitions API is supported
 */
export function supportsViewTransitions(): boolean {
  return typeof window !== "undefined" && "startViewTransition" in document;
}

/**
 * Performs a view transition with automatic fallback
 * @param options - Configuration for the transition
 */
export async function withViewTransition({
  updateDOM,
  skipTransition = false,
}: ViewTransitionOptions): Promise<void> {
  // Skip transition if explicitly requested or not supported
  if (skipTransition || !supportsViewTransitions()) {
    await updateDOM();
    return;
  }

  // Use View Transitions API
  const transition = (document as any).startViewTransition(async () => {
    await updateDOM();
  });

  try {
    await transition.ready;
  } catch (error) {
    console.warn("[View Transitions] Transition interrupted:", error);
  }
}

/**
 * Creates a custom view transition with named elements
 * @param name - Unique name for the transition
 * @param element - Element to transition
 */
export function setViewTransitionName(
  element: HTMLElement | null,
  name: string
): void {
  if (!element) return;
  (element.style as any).viewTransitionName = name;
}

/**
 * Removes view transition name from element
 * @param element - Element to clean up
 */
export function clearViewTransitionName(element: HTMLElement | null): void {
  if (!element) return;
  (element.style as any).viewTransitionName = "";
}

/**
 * Hook-like function for managing view transitions in components
 */
export class ViewTransitionManager {
  private static instances = new Map<string, HTMLElement>();

  static register(id: string, element: HTMLElement): void {
    this.instances.set(id, element);
    setViewTransitionName(element, id);
  }

  static unregister(id: string): void {
    const element = this.instances.get(id);
    if (element) {
      clearViewTransitionName(element);
      this.instances.delete(id);
    }
  }

  static clear(): void {
    this.instances.forEach((element) => clearViewTransitionName(element));
    this.instances.clear();
  }
}
