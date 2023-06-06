import { useEffect, useRef } from "react";

export default function useTraceUpdate(initialProps) {
  const previousPropsRef = useRef(initialProps);

  useEffect(() => {
    const getChangedProps = (currentProps) => {
      return Object.entries(currentProps).reduce((changedProps, [key, value]) => {
        if (previousPropsRef.current[key] !== value) {
          changedProps[key] = [previousPropsRef.current[key], value];
        }
        return changedProps;
      }, {});
    };

    const changedProps = getChangedProps(initialProps);

    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }

    previousPropsRef.current = initialProps;
  }, [initialProps]);
}
