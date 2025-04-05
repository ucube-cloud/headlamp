import { GlobalStyles } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, useHistory, useLocation } from 'react-router-dom';
import helpers, { setBackendToken } from '../../helpers';
import Plugins from '../../plugin/Plugins';
import ReleaseNotes from '../common/ReleaseNotes/ReleaseNotes';
import Layout from './Layout';
import { PreviousRouteProvider } from './RouteSwitcher';

window.desktopApi?.send('request-backend-token');
window.desktopApi?.receive('backend-token', (token: string) => {
  setBackendToken(token);
});

/**
 * QueryParamRedirect is a component that checks for a 'to' query parameter and redirects accordingly
 * This should be placed near the top of your component hierarchy,
 * typically in your main App component
 * @returns
 */
const QueryParamRedirect = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(location.search);

    // Check if 'to' parameter exists
    const redirectPath = searchParams.get('to');

    if (redirectPath) {
      // Create a new URLSearchParams without the 'to' parameter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('to');

      // Construct the new URL without the 'to' parameter
      const newSearch = newSearchParams.toString();
      const newPathWithSearch = redirectPath + (newSearch ? `?${newSearch}` : '');

      // Perform the redirect
      history.replace(newPathWithSearch);
    }
  }, [location.search, history]);

  return null;
};
export default function AppContainer() {
  const Router = ({ children }: React.PropsWithChildren<{}>) =>
    helpers.isElectron() ? (
      <HashRouter>{children}</HashRouter>
    ) : (
      <BrowserRouter basename={helpers.getBaseUrl()}>{children}</BrowserRouter>
    );

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '@media (prefers-reduced-motion: reduce)': {
              '& *': {
                animationDuration: '0.01ms !important',
                animationIterationCount: '1 !important',
                transitionDuration: '0.01ms !important',
                scrollBehavior: 'auto !important',
              },
            },
          },
        }}
      />
      <Router>
        <PreviousRouteProvider>
          <QueryParamRedirect />
          <Plugins />
          <Layout />
        </PreviousRouteProvider>
      </Router>
      <ReleaseNotes />
    </SnackbarProvider>
  );
}
