import React, { Suspense } from "react";
export const lazyLoadIcon = (name: string) => {
  return (
    <Suspense fallback={<></>}>
      {React.createElement(
        lazy(() =>
          import("@ant-design/icons").then((module: any) => {
            return { default: module[name] };
          })
        ),
        {}
      )}
    </Suspense>
  );
};

