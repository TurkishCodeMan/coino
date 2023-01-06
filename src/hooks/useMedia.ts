import React from 'react';
const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return values?.[index] || defaultValue;
  };
  const [value, setValue] = React.useState<T>(getValue);
  React.useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));

    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, []);
  return value;
};

export { useMedia };
