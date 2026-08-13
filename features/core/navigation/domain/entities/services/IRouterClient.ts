export type NavigationHref = string | { pathname: string; params?: Record<string, string | number> };

export interface IRouterClient {
  push(href: NavigationHref): void;
  /** Selects an already mounted route (e.g. a tab root) instead of stacking a new screen on top of it. */
  navigate(href: NavigationHref): void;
  replace(href: NavigationHref): void;
  back(): void;
  dismissAll(): void;
}
