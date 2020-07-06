import React from 'react';

const loadComponent = (importCallback, fallback) => () => {
    const Component = React.lazy(importCallback);
    return (
        <React.Suspense fallback={fallback}>
            <Component/>
        </React.Suspense>
    );
}

export default loadComponent;
