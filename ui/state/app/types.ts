export type AppState = {
  language: string;
  loading: boolean;
};

export type AppActions = {
  actions: {
    setLanguage: (value: string) => void;
    setLoading: (value: boolean) => void;
    resetAppState: () => void;
  };
};
