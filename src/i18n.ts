import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const storedLng = typeof window !== 'undefined' ? localStorage.getItem('lng') : null;

const resources = {
  en: {
    translation: {
      appTitle: 'University Feedback System',
      nav: {
        home: 'Home',
        submit: 'Submit',
        public: 'Public',
        admin: 'Admin',
        language: 'Language',
        logout: 'Logout'
      },
      home: {
        headline: 'Your voice shapes our university.',
        sub: 'Submit feedback, track status, and see resolved improvements.',
        trackTitle: 'Track Suggestion Status',
        placeholderId: 'Enter Suggestion ID',
        checkStatus: 'Check Status',
        result: 'Result',
        notFound: 'Not found',
        createdAt: 'Created',
        updatedAt: 'Updated',
        status: 'Status',
        category: 'Category',
        quickLinks: 'Quick Links'
      },
      submit: {
        title: 'Submit a Feedback',
        category: 'Category',
        description: 'Description',
        descriptionPlaceholder: 'Describe your suggestion...',
        anonymous: 'Submit anonymously',
        submitBtn: 'Submit',
        needLogin: 'Login to submit with identity',
        email: 'Email',
        password: 'Password',
        login: 'Login',
        or: 'or',
        success: 'Suggestion submitted successfully',
        mySuggestions: 'My Suggestions',
        viewMine: 'View My Submissions'
      },
      categories: {
        academic: 'Academic',
        administrative: 'Administrative',
        infrastructure: 'Infrastructure',
        other: 'Other'
      },
      statuses: {
        Received: 'Received',
        'In Process': 'In Process',
        Resolved: 'Resolved'
      },
      public: {
        title: 'Resolved Suggestions',
        loadMore: 'Load More',
        noMore: 'No more items'
      },
      admin: {
        title: 'Admin Dashboard',
        loginTitle: 'Login',
        email: 'Email',
        password: 'Password',
        login: 'Login',
        filters: 'Filters',
        category: 'Category',
        status: 'Status',
        query: 'Search Text',
        apply: 'Apply',
        suggestionList: 'Suggestions',
        assignedDepartment: 'Assigned Department',
        assignedTo: 'Assigned To',
        update: 'Update',
        delete: 'Delete',
        analytics: 'Analytics',
        byStatus: 'By Status',
        byCategory: 'By Category',
        monthlyTrends: 'Monthly Trends',
        id: 'ID'
      },
      common: {
        select: 'Select',
        required: 'Required',
        error: 'Something went wrong',
        success: 'Success',
        copy: 'Copy',
        copied: 'Copied'
      },
           register: {
        title: 'समाधान भएका सुझावहरू',
        loadMore: 'अझै देखाउनुहोस्',
        noMore: 'थप सामग्री छैन'
      }
    }
  },
  ne: {
    translation: {
      appTitle: 'विश्वविद्यालय सुझाव प्रणाली',
      nav: {
        home: 'गृह',
        submit: 'पेश गर्नुहोस्',
        public: 'सार्वजनिक',
        admin: 'प्रशासन',
        language: 'भाषा',
        logout: 'लगआउट'
      },

           register: {
        title: 'समाधान भएका सुझावहरू',
        loadMore: 'अझै देखाउनुहोस्',
        noMore: 'थप सामग्री छैन'
      },
      home: {
        headline: 'तपाईंको आवाजबाट विश्वविद्यालय सुधारिन्छ।',
        sub: 'सुझाव पेश गर्नुहोस्, स्थिति हेर्नुहोस्, र समाधान भएका हेर्नुहोस्।',
        trackTitle: 'सुझाव स्थिति ट्र्याक',
        placeholderId: 'सुझाव आईडी लेख्नुहोस्',
        checkStatus: 'स्थिति जाँच',
        result: 'नतिजा',
        notFound: 'फेला परेन',
        createdAt: 'सिर्जना',
        updatedAt: 'अद्यावधिक',
        status: 'स्थिति',
        category: 'वर्ग',
        quickLinks: 'छिटो लिङ्कहरू'
      },
      submit: {
        title: 'सुझाव पेश गर्नुहोस्',
        category: 'वर्ग',
        description: 'विवरण',
        descriptionPlaceholder: 'तपाईंको सुझाव वर्णन गर्नुहोस्...',
        anonymous: 'गोप्य रूपमा पेश गर्नुहोस्',
        submitBtn: 'पेश गर्नुहोस्',
        needLogin: 'पहिचानसहित पेश गर्न लगइन गर्नुहोस्',
        email: 'इमेल',
        password: 'पासवर्ड',
        login: 'लगइन',
        or: 'वा',
        success: 'सुझाव सफलतापूर्वक पेश भयो',
        mySuggestions: 'मेरो सुझावहरू',
        viewMine: 'मेरो पेशकृत हेर्नुहोस्'
      },
      categories: {
        academic: 'शैक्षिक',
        administrative: 'प्रशासनिक',
        infrastructure: 'पूर्वाधार',
        other: 'अन्य'
      },
      statuses: {
        Received: 'प्राप्त',
        'In Process': 'प्रक्रियामा',
        Resolved: 'समाधान'
      },
      public: {
        title: 'समाधान भएका सुझावहरू',
        loadMore: 'अझै देखाउनुहोस्',
        noMore: 'थप सामग्री छैन'
      },
       
      admin: {
        title: 'प्रशासन प्यानल',
        loginTitle: 'प्रशासन लगइन',
        email: 'इमेल',
        password: 'पासवर्ड',
        login: 'लगइन',
        filters: 'फिल्टर',
        category: 'वर्ग',
        status: 'स्थिति',
        query: 'खोज पाठ',
        apply: 'लागू',
        suggestionList: 'सुझावहरू',
        assignedDepartment: 'सरहदेय विभाग',
        assignedTo: 'जिम्मेवार',
        update: 'अद्यावधिक',
        delete: 'हटाउनुहोस्',
        analytics: 'विश्लेषण',
        byStatus: 'स्थितिअनुसार',
        byCategory: 'वर्गअनुसार',
        monthlyTrends: 'मासिक प्रवृत्ति',
        id: 'आईडी'
      },
      common: {
        select: 'छान्नुहोस्',
        required: 'आवश्यक',
        error: 'केही त्रुटि भयो',
        success: 'सफल',
        copy: 'कपी',
        copied: 'कपी भयो'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: storedLng || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export function setLanguage(lng: 'en' | 'ne') {
  i18n.changeLanguage(lng);
  try {
    localStorage.setItem('lng', lng);
  } catch (_e) {
    void 0;
  }
}

export default i18n;