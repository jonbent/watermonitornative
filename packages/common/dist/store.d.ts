declare const configureStore: (preloadedState?: {}) => import("redux").Store<any, import("redux").AnyAction> & {
    dispatch: unknown;
};
export default configureStore;
