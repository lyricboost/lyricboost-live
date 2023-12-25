// ** React Imports
import { useEffect, useState } from 'react';

// ** Next Imports
import Head from 'next/head';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { store } from 'src/store/index'; // Path to your Redux store

// ** Loader Import
import NProgress from 'nprogress';

import { supabase } from '../hooks/auth/supabase';

// ** Emotion Imports
import { CacheProvider } from '@emotion/react';

import AuthProvider from '../context/authProvider';

// ** Config Imports
import themeConfig from 'src/configs/themeConfig';

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Fake-DB Import
import 'src/@fake-db';

// ** Third Party Import
import { Toaster } from 'react-hot-toast';

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout';

import ThemeComponent from 'src/@core/theme/ThemeComponent';

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';

// ** Prismjs Styles
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

import 'src/iconify-bundle/icons-bundle-react';

// ** Global css styles
import '../../styles/globals.css';

// ** Extend App Props with Emotion
const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

// ** Configure JSS & ClassName
function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;

  const getLayout =
    Component.getLayout ?? (page => <UserLayout user={user} contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;

  const [user, setUser] = useState(null); // State to store the user information

  // Use the `useEffect` hook to fetch the currently authenticated user when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      console.log(user);
    };

    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('Users')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching user data:', error.message);
            console.log("ERROR");
          } else {
            console.log('User data:', data);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:');
      }
    };

    fetchUser();
    fetchUserData();
  }, []);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} | AI Powered Songwriting`}</title>
          <meta name='description' content={`${themeConfig.description}`} />
          <meta name='keywords' content='songwriting app, AI songwriting, text editor' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    {/* Pass the `user` state to the component tree */}
                    {getLayout(<Component {...pageProps} user={user} />)}
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
}

export default App;
