import React, { lazy, Suspense } from 'react';

const LazyLoadedComponent = lazy(() => import('./LazyLoadedComponentImpl'));
function LazyLoadedComponentWrapper() {
    return (
        <Suspense fallback= {< div > Loading...</div>}>
            < LazyLoadedComponent />
            </Suspense>
  );
}
export default LazyLoadedComponentWrapper;