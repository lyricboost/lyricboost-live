// ** React Imports
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

  const [user, setUser] = useState(null); // State to store the user information
  const [userData, setUserData] = useState(null); // State to store the user information

  const router = useRouter();


  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;

  const getLayout =
    Component.getLayout ?? (page => <UserLayout user={user} userData={userData} contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession(); // Get the user session

        if (error) {
          console.error('Error fetching user session:', error.message);
          router.push('/login'); // Redirect to the login page if there is no session

          return;
        }

        const sessionUser = data;

        console.log(sessionUser.session.user.email)

        if (sessionUser) {
          const email = sessionUser.session.user.email; // Get the user's email from the session

          const { data: userData, error: userError } = await supabase
            .from('user_data')
            .select('*')
            .eq('email', email)
            .single(); // Use .single() to retrieve a single record

          if (userError) {

            console.error('Error fetching user data:', userError.message);
          } else {
            console.log('User data:', userData);
            setUser(sessionUser); // Set the user object from the session
            setUserData(userData); // Set the user data object
          }
        }


      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [router]);


  const StarsBackground = () => {
    return (
      <div className="stars-group">
              <div id="stars"></div>
              <div id="stars2"></div>
              <div id="stars3"></div>
          </div>
    )
    }

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
                  <StarsBackground/>
                  {/* Pass the `user` and `userData` states to the component tree */}
                  {getLayout(<Component {...pageProps} user={user} userData={userData} />)}
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
