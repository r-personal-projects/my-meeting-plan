import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            'my-meeting-plan': {},
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
