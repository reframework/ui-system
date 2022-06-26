import { generatePath, matchPath, RouteProps } from "react-router";

const toMap = (array: string[]) =>
  array.reduce(
    (acc, key) => ({ ...acc, [key]: true }),
    {} as Record<string, boolean>
  );

export class Route<T extends object> {
  private readonly $urlSearchKeys: Record<string, boolean>;

  static create<TT extends object>(options: {
    path: string;
    urlSearchKeys?: string[];
  }) {
    return new Route<TT>(options.path, options.urlSearchKeys);
  }

  constructor(private $path: string, urlSearchKeys?: string[]) {
    this.$urlSearchKeys = toMap(urlSearchKeys || []);
  }

  public get path() {
    return this.$path;
  }

  public get<TParams extends T>(
    params?: TParams,
    searchString = "",
    fallback = "/"
  ) {
    try {
      const path = generatePath(this.$path, params as Record<string, string>);
      const search = this.getSearch(searchString);
      return `${path}?${search}`;
    } catch (e) {
      console.error(e);
      return fallback;
    }
  }

  public getPartial<R extends T>(params?: { [k in keyof R]: R[k] | null }) {
    if (!params) return this.$path;

    const $params = Object.fromEntries(
      Object.entries(params).map(([key, value]) => {
        if (value === null) return [key, replacer];

        return [key, value];
      })
    );

    const path = generatePath(this.$path, $params as Record<string, string>);

    const replacer = "*";
    const compiledPathParts = path.split("/");
    const thisPathParts = this.$path.split("/");
    const firstSlash = this.$path.startsWith("/") ? "/" : "";

    const partials = compiledPathParts.map((part, idx) => {
      if (part === replacer) {
        const lastSlash = thisPathParts.length === idx - 1 ? "" : "/";
        return "/" + thisPathParts[idx] + lastSlash;
      }

      return part;
    });

    return firstSlash + partials.join("");
  }

  public match(pathname: string, props?: Omit<RouteProps, "path">) {
    // return matchPath(pathname, {
    //   path: this.$path,
    //   ...(props || { exact: true }),
    // });
  }

  private getSearch(search: string) {
    if (!search.length) return "";

    const urlSearchParams = new URLSearchParams(search);
    const locationurlSearchKeys = Array.from(urlSearchParams.keys());

    locationurlSearchKeys.forEach((key) => {
      if (!this.$urlSearchKeys[key]) urlSearchParams.delete(key);
    });

    const searchString = urlSearchParams.toString();
    if (!searchString.length) return "";
    return searchString;
  }
}
