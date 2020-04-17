export function Auth({ component: Component, user, loginUser, ...rest }: {
    [x: string]: any;
    component: any;
    user: any;
    loginUser: any;
}): JSX.Element;
export function Protected({ component: Component, user, loginUser, ...rest }: {
    [x: string]: any;
    component: any;
    user: any;
    loginUser?: (() => void) | undefined;
}): JSX.Element;
