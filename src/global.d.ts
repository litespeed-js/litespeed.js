type Litespeed = {
    container: ContainerService;
    router: Router;
    view: View;
    filter: Filter;
}

type Router = {
    setParam: (key: string, value: any) => Router;
    getParam: (key: string, def: any) => any;
    getParams: () => object;
    getURL: () => string;
    add: (path: string, view: {
        template: string|((window: Window) => string);
        scope: string;
        project?: boolean;
    }) => Router;
    change: (URL: string, replace: boolean) => Router;
    reload: () => Router;
    match: (location: string) => object|null;
    getCurrent: () => any;
    setCurrent: (value: any) => Router;
    getPrevious: () => any;
    setPrevious: (value: any) => Router;
    params: object;
    hash: string;
}

type View = {
    stock: object;
    add: (object: {
        selector: string;
        controller: (...args: any[]) => void;
        repeat?: boolean;
        protected?: boolean;
        template?: string;
    }) => View;
    render: (element: HTMLElement, callback: any) => void;
}

type HTTP = {
    get: (url: string) => object;
    post: (url: string, headers: object, payload: object) => object;
    put: (url: string, headers: object, payload: object) => object;
    patch: (url: string, headers: object, payload: object) => object;
    delete: (url: string) => object;
    addGlobalParam: (key: string, value: any) => void;
    addGlobalHeader: (key: string, value: any) => void;
}

type Filter = {
    add: (name: string, callback: any) => any;
    apply: (name: string, value: any) => any;
}

type Expression = {
    regex: RegExp;
    parse: (string: string, def: string, cast?: boolean) => string;
    getPaths: () => string[];
}

type Cookie = {
    get: (name: string) => string;
    set: (name: string, value: string, days: number) => Cookie;
}

type ContainerService = {
    stock: object;
    listeners: object;
    namespace: object;

    set: (name: string, object: object, singleton: boolean, watch?: boolean) => ContainerService;
    get: (name: string) => any;
    resolve: (callback: any) => any;
    path: (path: string, value: any) => any;
    bind: (element: HTMLElement, path: string, callback: any) => void;
    addNamespace: (key: string) => ContainerService;
    removeNamespace: (key: string) => ContainerService;
    scope: (path: string) => string;
}

interface Window {
    ls: Litespeed
}
