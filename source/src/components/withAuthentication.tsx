import React, { ComponentType } from 'react';

function withAuthentication<T>(WrappedComponent: ComponentType<T>) {
    return function WithAuthentication(props: T) {
        const isAuthenticated = true; // replace with actual authentication logic
        return isAuthenticated ? (
            <WrappedComponent {...props} />
        ) : (
            <div>You must be logged in to view this content.</div>
        );
    };
}
export default withAuthentication;