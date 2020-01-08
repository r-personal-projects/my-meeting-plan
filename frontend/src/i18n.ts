import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            'my-meeting-plan': {},
            'navigation-elements': {
                'dashboard': 'Dashboard',
                'schedule': 'Schedule a meeting',
                'quick-planner-label': 'Quick planner',
                'open-drawer': 'Open drawer',
                'app-heading': 'my-meeting.io',
            },
            'navigation-elements-toolbar': {
                'notifications': 'Notifications',
                'profile': 'Profile',
                'admin': 'Admin Dashboard',
            },
            'schedule-steps': {},
            'schedule-time-content': {
                'deactivate-auto-time': 'Deactivate auto time',
                'activate-auto-time': 'Activate auto time',
                'auto-time-on': 'auto-time ON',
                'auto-time-off': 'auto-time OFF',
            },
            'schedule-general-content': {
                'subject-label': 'Subject of your meeting',
                'description-label': 'Describe the agenda of your meeting',
                'presets-label': 'Presets',
            },
            'login-component': {
                'username-label': 'Username',
                'password-label': 'Password',
                'register-label': 'Register',
                'back-label': 'Create an account',
                'login-label': 'Login',
                'login-error-label': 'Login failed',
                'heading': 'Sign in',
            },
            'register-component': {
                'name-label': 'Name',
                'username-label': 'Username',
                'password-label': 'Password',
                'back-label': 'Go to Login',
                'register-label': 'Register',
                'login-error-label': 'Register failed',
                'heading': 'Start using the app',
            },
        },
        de: {},
    },


    debug: true,
    fallbackLng: 'en',
    ns: ['my-meeting-plan'],
    defaultNS: 'my-meeting-plan',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },
    react: {
        wait: true,
    },
});

export default i18n;
