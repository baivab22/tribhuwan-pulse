// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { BookOpen, Users, Target, ChevronDown, ChevronUp, ExternalLink, TrendingUp, BarChart, HardHat, Search, Filter, ChevronLeft, ChevronRight, X, Phone, Mail, ZoomIn, FileText } from 'lucide-react';

// // Content extracted and summarized from the oky.pdf document
// const PDF_CONTENT = [
//   {
//     chapter: "परिच्छेद १: प्रस्तावना",
//     summary: "यो विनियमले विश्वविद्यालयको शैक्षिक गुणस्तर कायम गर्न, दिगो शिक्षा सबल बनाउन, छात्रवृत्ति र अनुसन्धान वृत्ति प्रदान गर्न, अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता अभिवृद्धि गर्न र विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोत जुटाउन दानदातव्य कोष (Endowment Fund) स्थापना गरेको छ।",
//     details: `त्रिभुवन विश्वविद्यालयलाई वैकल्पिक श्रोतको व्यवस्थापनमार्फत अझ बढी शैक्षिक गुणस्तर कायम गर्न, दिगो एवम् उच्च शिक्षा सबल बनाउन, विद्यार्थीलाई छात्रवृत्ति, तथा अनुसंन्धान वृत्ति, विश्वविद्यालयमा अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता तथा दक्षता अभिवृद्धि गर्न र यी कार्यहरूमार्फत् विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोतहरूको खोजी गर्न र प्राप्त भएका आर्थिक एवं वित्तीय स्रोतको प्रभावकारी परिचालन गर्न, सुव्यवस्थित सञ्चालन गर्न वाञ्छनीय भएकोले त्रि.वि. आर्थिक व्यवस्थापन तथा खरिदसम्बन्धी नियम, २०५० को नियम ५ बमोजिमको विशेष कोषको रुपमा दानदातव्य कोष (Endowment Fund) स्थापना गरी सोको व्यवस्थित सञ्चालनका लागि त्रिभुवन विश्वविद्यालय कार्यकारी परिषद्ले यी विनियमहरू बनाई लागु गरेको छ ।`
//   },
//   {
//     chapter: "परिच्छेद २: कोषको किसिम",
//     summary: "स्थायी र आवधिक (समयका आधारमा) तथा प्रतिबन्धित र अर्ध प्रतिबन्धित (दाताको शर्तका आधारमा) गरी कोषहरूलाई वर्गीकरण गरिएको छ। प्रतिबन्धित कोषका लागि न्यूनतम रु. १ करोडको योगदान आवश्यक पर्दछ।",
//     details: `(१) समयका आधारमा कोष स्थायी र आवधिक हुन सक्नेछ । (२) कोषमा दाताको दानदातव्य रकमका आधारमा कोष प्रतिबन्धित वा अर्ध प्रतिबन्धित हुन सक्नेछ। ५. प्रतिबन्धित कोष: (१) प्रतिबन्धित कोषको दानदातव्य रकम कम्तिमा रु. १ करोड हुनुपर्नेछ । यस प्रकारका कोषको सञ्चालन कोषको दातासँगको सम्झौता अनुसार छुट्टै कोषको व्यवस्था गरी गर्न सकिनेछ । ६. अर्ध प्रतिबन्धित कोष (१) रु. १ करोडभन्दा कम शुरुवाती कोषको रकमलाई अर्ध प्रतिबन्धित कोषको रुपमा स्वीकार गरिनेछ ।`
//   },
//   {
//     chapter: "परिच्छेद ३: सञ्चालक समिति",
//     summary: "कोषको प्रभावकारी व्यवस्थापनका लागि रजिष्ट्रारको अध्यक्षतामा केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गरिएको छ। यसले कोष सञ्चालन, लगानी अनुमोदन र समग्र योजनाको व्यवस्थापन गर्दछ।",
//     details: `८. दानदातव्य कोष सञ्चालक समितिको गठन (१) कोषको प्रभावकारी व्यवस्थापनका लागि विश्वविद्यालयले एक केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गर्नेछ । समितिमा रजिष्ट्रार - अध्यक्ष, डीनहरू मध्येबाट एकजना - सदस्य, प्रमुख, आर्थिक प्रशासन महाशाखा - सदस्य लगायतका पदाधिकारी रहनेछन् ।`
//   },
//   {
//     chapter: "परिच्छेद ४: कोषको लगानी",
//     summary: "कोष मुद्दति निक्षेप वा समितिले स्वीकृत गरेका अन्य क्षेत्रमा लगानी गर्न सकिन्छ। आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च गर्न र बाँकी ५०% मूलकोषमा पुन: लगानी गर्नुपर्ने मुख्य नियम छ। यो कोष विश्वविद्यालयको ऋणको लागि धितोको रूपमा प्रयोग गर्न पाइने छैन।",
//     details: `१२. कोषको लगानी : (१) कोषको लगानी मुद्दति निक्षेप वा समितिले तोकिएको क्षेत्रमा लगानी गर्न सक्नेछ । (२) कोषबाट आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च गर्न सकिनेछ भने बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ । (५) दानदातव्यकोषको रकम प्रयोग गरेर विश्वविद्यालयले लिन सक्ने ऋणका निम्ति धितोको रुपमा प्रयोग गर्ने छैन ।`
//   }
// ];

// const API_URL = 'https://digitaldashboard.tu.edu.np/api/donater';
// const PDF_URL = 'https://portal.tu.edu.np/downloads/2025_02_08_21_20_17.pdf';

// const EndowmentFundComponent = () => {
//   const [activeChapter, setActiveChapter] = useState(0);
//   const [donaters, setDonaters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPrizeType, setFilterPrizeType] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [totalCount, setTotalCount] = useState(0);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const fetchDonaters = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sortBy,
//         sortOrder
//       };
      
//       if (searchTerm) params.search = searchTerm;
//       if (filterPrizeType) params.prizeType = filterPrizeType;
//       if (filterDepartment) params.relatedDepart = filterDepartment;

//       const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
//       const data = await response.json();
      
//       setDonaters(data.data || []);
//       setTotalCount(data.total || 0);
      
//       // Calculate total amount (assuming each donater has an amount field)
//       const calculatedTotal = (data.data || []).reduce((sum, donater) => {
//         return sum + (donater.prizeAmount || 0);
//       }, 0);
//       setTotalAmount(calculatedTotal);
//     } catch (error) {
//       console.error('Error fetching donaters:', error);
//       setDonaters([]);
//       setTotalAmount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterPrizeType, filterDepartment, sortBy, sortOrder]);

//   useEffect(() => {
//     fetchDonaters();
//   }, [fetchDonaters]);

//   const handleOpenPdf = () => {
//     window.open(PDF_URL, '_blank');
//   };

//   const openImageModal = (imageUrl, donaterName) => {
//     setSelectedImage({ url: imageUrl, name: donaterName });
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const InvestmentIllustration = useMemo(() => (
//     <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 mt-6">
//       <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
//         <TrendingUp className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
//         कोषको लगानी तथा आम्दानी वितरण रणनीति
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//         विनियम १२(२) अन्तर्गत आम्दानीलाई दिगो विकासका लागि कसरी व्यवस्थापन गर्ने भन्ने नियम उल्लेख गरिएको छ:
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md border-b-4 border-green-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-green-700 dark:text-green-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">वितरण / खर्च</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको मूल उद्देश्य (छात्रवृत्ति, अनुसन्धान, जनशक्ति विकास) मा खर्च गरिने रकम।</p>
//         </div>
//         <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl shadow-md border-b-4 border-indigo-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-indigo-700 dark:text-indigo-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">पुन: लगानी / मूलधन वृद्धि</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको दीर्घकालीन दिगोपन सुनिश्चित गर्न मूलकोषमै थप गरिने रकम।</p>
//         </div>
//       </div>
//       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center border-t border-gray-200 dark:border-gray-700 pt-3">
//         विनियम १२(२): आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च र बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ।
//       </p>
//     </div>
//   ), []);

//   const AccordionItem = ({ index, title, summary, details, icon: Icon }) => {
//     const isActive = index === activeChapter;
//     return (
//       <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//         <button
//           className="flex justify-between items-center w-full p-5 text-left font-extrabold text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
//           onClick={() => setActiveChapter(isActive ? null : index)}
//           aria-expanded={isActive}
//           aria-controls={`content-${index}`}
//         >
//           <span className="flex items-center">
//             <Icon className={`w-6 h-6 mr-4 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`} />
//             {title}
//           </span>
//           {isActive ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
//         </button>
//         {isActive && (
//           <div id={`content-${index}`} className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 ease-in-out">
//             <div className="p-4 border-l-4 border-indigo-400 dark:border-indigo-600 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
//               <p className="text-base font-medium text-gray-800 dark:text-gray-300 leading-relaxed">
//                 मुख्य बुँदा: {summary}
//               </p>
//             </div>
            
//             <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
//               <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">विनियमको मूल पाठ</h4>
//               <p className="text-sm font-normal text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
//                 {details}
//               </p>
//             </div>
//             {index === 3 && InvestmentIllustration}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('ne-NP', {
//       style: 'currency',
//       currency: 'NPR'
//     }).format(amount);
//   };

//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-['Mukta', 'Noto_Sans_Devanagari', sans-serif]">
//       <style jsx global>{`
//         .font-['Mukta', 'Noto_Sans_Devanagari', sans-serif] { 
//           font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif; 
//         }
//         .text-gray-800, .text-gray-900 { color: #1f2937 !important; }
//         .dark .text-gray-100, .dark .text-gray-200 { color: #f9fafb !important; }
        
//         body::-webkit-scrollbar {
//           width: 8px;
//         }
//         body::-webkit-scrollbar-thumb {
//           background-color: #4f46e5;
//           border-radius: 4px;
//         }
//       `}</style>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
//           <div className="relative max-w-4xl max-h-full">
//             <button
//               onClick={closeImageModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <div className="bg-white p-2 rounded-lg">
//               <img 
//                 src={selectedImage.url} 
//                 alt={selectedImage.name}
//                 className="max-w-full max-h-[70vh] object-contain rounded"
//               />
//             </div>
//             <p className="text-white text-center mt-3 text-sm font-medium">{selectedImage.name}</p>
//             <p className="text-gray-400 text-center mt-1 text-xs">फोटो हेर्नको लागि क्लिक गर्नुभएकोमा धन्यवाद</p>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 border-l-8 border-indigo-600">
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
//                 त्रिभुवन विश्वविद्यालय दानदातव्य कोष
//               </h1>
//               <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
//                 विनियम, २०७९ को मुख्य प्रावधानहरू
//               </p>
//             </div>
//             <HardHat className="w-12 h-12 text-indigo-500 mt-1 hidden sm:block opacity-70 flex-shrink-0 ml-4" />
//           </div>
          
//           <p className="mt-5 text-gray-700 dark:text-gray-300 pl-2 text-base font-medium">
//             यो प्रस्तुतिले विश्वविद्यालयको दीर्घकालीन वित्तीय दिगोपन र शैक्षिक उत्कृष्टताका लागि आवश्यक कोष स्थापना र व्यवस्थापन गर्ने ढाँचालाई सरल भाषामा बुझाउँछ।
//           </p>
          
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleOpenPdf}
//               className="flex items-center justify-center px-6 py-3 text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]"
//             >
//               <FileText className="w-5 h-5 mr-2" />
//               पूर्ण विनियम PDF हेर्नुहोस्
//             </button>
//             <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
//               <ExternalLink className="w-4 h-4 mr-1" />
//               त्रिभुवन विश्वविद्यालयको आधिकारिक विनियम
//             </div>
//           </div>
//         </div>

//         {/* Core Content Accordion */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
//           <AccordionItem
//             index={0}
//             title="१. प्रस्तावना र कोषका उद्देश्यहरू"
//             summary={PDF_CONTENT[0].summary}
//             details={PDF_CONTENT[0].details}
//             icon={Target}
//           />
//           <AccordionItem
//             index={1}
//             title="२. कोषको संरचना र वर्गीकरण"
//             summary={PDF_CONTENT[1].summary}
//             details={PDF_CONTENT[1].details}
//             icon={BarChart} 
//           />
//           <AccordionItem
//             index={2}
//             title="३. सञ्चालक समिति र व्यवस्थापन"
//             summary={PDF_CONTENT[2].summary}
//             details={PDF_CONTENT[2].details}
//             icon={Users}
//           />
//           <AccordionItem
//             index={3}
//             title="४. लगानी नीति र आम्दानीको बाँडफाँड"
//             summary={PDF_CONTENT[3].summary}
//             details={PDF_CONTENT[3].details}
//             icon={TrendingUp}
//           />
//         </div>

//         {/* Donaters Table Section */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//               <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
//                 <Users className="w-7 h-7 mr-3 text-indigo-600" />
//                 {/* दानदाताहरूको विवरण */}
//                 दानदातव्य कर्ताको विवरण
//               </h2>
              
//               {/* Total Amount Display */}
//               <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                 कुल रकम: {formatCurrency(totalAmount)}
//               </div>
//             </div>
            
//             {/* Search and Filter */}
//             <div className="flex flex-col sm:flex-row gap-3 mb-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="नाम, पुरस्कार, वा विभाग अनुसार खोज्नुहोस्..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <button
//                 onClick={fetchDonaters}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center gap-2 shadow-md"
//               >
//                 <Filter className="w-4 h-4" />
//                 खोज्नुहोस्
//               </button>
//             </div>

//             {/* Photo Help Text */}
//             {/* <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//               <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
//                 <ZoomIn className="w-4 h-4 mr-2" />
//                 <strong>फोटो हेर्ने तरिका:</strong> तालिकामा देखिएको फोटोमा क्लिक गर्नुहोस् र पूर्ण आकारमा हेर्नुहोस्। फोटो भएको ठाउँमा जुम आइकन देखिनेछ।
//               </p>
//             </div> */}
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="p-12 text-center">
//                 <div className="inline-block animate-spin  h-12 w-12 border-b-2 border-indigo-600"></div>
//                 <p className="mt-4 text-gray-600 dark:text-gray-400">दानदाताहरूको विवरण लोड हुँदैछ...</p>
//               </div>
//             ) : donaters.length === 0 ? (
//               <div className="p-12 text-center">
//                 <div className="text-gray-400 dark:text-gray-500 mb-4">
//                   <Users className="w-16 h-16 mx-auto opacity-50" />
//                 </div>
//                 <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">कुनै दानदाता फेला परेन</p>
//                 <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">कृपया आफ्नो खोज परिवर्तन गर्नुहोस् वा फिल्टर हटाउनुहोस्</p>
//               </div>
//             ) : (
//               <>
//                 <table className="w-full">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">क्र.सं</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानदातव्य कर्ताको नाम </th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">पुरस्कारको नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">पुरस्कारको प्रकृति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्बन्धित विभाग</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्झौता मिति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">फोटो</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्पर्क नम्बर</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">इमेल</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                     {donaters.map((donater, index) => (
//                       <tr key={donater._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           {(currentPage - 1) * itemsPerPage + index + 1}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           {donater.donaterName || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donater.prizeName || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//                             {donater.prizeType || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donater.relatedDepart || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donater.contractDate ? new Date(donater.contractDate).toLocaleDateString('ne-NP') : 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
//                           {donater.prizeAmount ? formatCurrency(donater.prizeAmount) : 'N/A'}
//                         </td>
//                         <td className=" py-3">
//                           {donater.photo ? (
//                             <div className="relative ">
//                               <button
//                                 onClick={() => openImageModal(donater.photo, donater.donaterName)}
//                                 className="relative transition-all duration-200 hover:scale-110 hover:shadow-lg"
//                               >
//                                 <img 
//                                   src={donater.photo} 
//                                   alt={donater.donaterName}
//                                   className="w-48  object-cover  border-gray-300 dark:border-gray-600 cursor-pointer"

//                                   style={{width:'400px !important'}}

                                
//                                   onError={(e) => {
//                                     e.target.style.display = 'none';
//                                     e.target.nextSibling.style.display = 'flex';
//                                   }}
//                                 />
//                                 <div className="w-12 h-12  bg-gray-300 dark:bg-gray-600 flex items-center justify-center hidden">
//                                   <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                                 </div>
//                                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30  transition-all duration-200 flex items-center justify-center">
//                                   <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                                 </div>
//                               </button>
//                               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
//                                 फोटो हेर्न क्लिक गर्नुहोस्
//                                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="w-12 h-12  bg-gray-300 dark:bg-gray-600 flex items-center justify-center group relative">
//                               <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
//                                 फोटो उपलब्ध छैन
//                                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-600"></div>
//                               </div>
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex items-center gap-2">
//                             <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                             <span className="truncate max-w-[120px]">{donater.contactNumber || 'N/A'}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                             <span className="truncate max-w-[150px]">{donater.email || 'N/A'}</span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Row */}
//                     <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-300 dark:border-gray-600 font-bold">
//                       <td colSpan="6" className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 text-right">
//                         कुल जम्मा:
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-green-600 dark:text-green-400">
//                         {formatCurrency(totalAmount)}
//                       </td>
//                       <td colSpan="3" className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
//                         जम्मा {donaters.length} दानदातव्य कर्ता
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </>
//             )}
//           </div>

//           {/* Pagination */}
//           {!loading && donaters.length > 0 && (
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 पृष्ठ {currentPage} को {totalPages} (कुल {totalCount} दानदाताहरू)
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   अघिल्लो
//                 </button>
//                 <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg border">
//                   {currentPage} / {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   अर्को
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Additional Information Section */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Target className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">कोषको उद्देश्य</h3>
//             </div>
//             <p className="text-blue-100 leading-relaxed">
//               विश्वविद्यालयको शैक्षिक गुणस्तर कायम राख्न, छात्रवृत्ति, अनुसन्धान र जनशक्ति विकासका लागि दीर्घकालीन वित्तीय सहयोग प्रदान गर्ने।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <BarChart className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">लगानी नीति</h3>
//             </div>
//             <p className="text-green-100 leading-relaxed">
//               आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च र ५०% मूलकोषमा पुन: लगानी गर्ने दिगो विकासको रणनीति।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Users className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">सञ्चालन समिति</h3>
//             </div>
//             <p className="text-purple-100 leading-relaxed">
//               रजिष्ट्रारको अध्यक्षतामा गठित समितिले कोषको प्रभावकारी व्यवस्थापन र लगानी निर्णय गर्दछ।
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
//           {/* <p className="font-medium">त्रिभुवन विश्वविद्यालय - दानदातव्य कोष विनियम, २०७९</p> */}
//           {/* <p className="mt-2">© {new Date().getFullYear()} त्रिभुवन विश्वविद्यालय। सबै अधिकार सुरक्षित।</p> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EndowmentFundComponent;

// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { BookOpen, Users, Target, ChevronDown, ChevronUp, ExternalLink, TrendingUp, BarChart, HardHat, Search, Filter, ChevronLeft, ChevronRight, X, Phone, Mail, ZoomIn, FileText, MapPin, UserCheck, Calendar, DollarSign, ClipboardList, Package, Clock, Goal } from 'lucide-react';

// // Content extracted and summarized from the oky.pdf document
// const PDF_CONTENT = [
//   {
//     chapter: "परिच्छेद १: प्रस्तावना",
//     summary: "यो विनियमले विश्वविद्यालयको शैक्षिक गुणस्तर कायम गर्न, दिगो शिक्षा सबल बनाउन, छात्रवृत्ति र अनुसन्धान वृत्ति प्रदान गर्न, अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता अभिवृद्धि गर्न र विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोत जुटाउन दानदातव्य कोष (Endowment Fund) स्थापना गरेको छ।",
//     details: `त्रिभुवन विश्वविद्यालयलाई वैकल्पिक श्रोतको व्यवस्थापनमार्फत अझ बढी शैक्षिक गुणस्तर कायम गर्न, दिगो एवम् उच्च शिक्षा सबल बनाउन, विद्यार्थीलाई छात्रवृत्ति, तथा अनुसंन्धान वृत्ति, विश्वविद्यालयमा अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता तथा दक्षता अभिवृद्धि गर्न र यी कार्यहरूमार्फत् विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोतहरूको खोजी गर्न र प्राप्त भएका आर्थिक एवं वित्तीय स्रोतको प्रभावकारी परिचालन गर्न, सुव्यवस्थित सञ्चालन गर्न वाञ्छनीय भएकोले त्रि.वि. आर्थिक व्यवस्थापन तथा खरिदसम्बन्धी नियम, २०५० को नियम ५ बमोजिमको विशेष कोषको रुपमा दानदातव्य कोष (Endowment Fund) स्थापना गरी सोको व्यवस्थित सञ्चालनका लागि त्रिभुवन विश्वविद्यालय कार्यकारी परिषद्ले यी विनियमहरू बनाई लागु गरेको छ ।`
//   },
//   {
//     chapter: "परिच्छेद २: कोषको किसिम",
//     summary: "स्थायी र आवधिक (समयका आधारमा) तथा प्रतिबन्धित र अर्ध प्रतिबन्धित (दाताको शर्तका आधारमा) गरी कोषहरूलाई वर्गीकरण गरिएको छ। प्रतिबन्धित कोषका लागि न्यूनतम रु. १ करोडको योगदान आवश्यक पर्दछ।",
//     details: `(१) समयका आधारमा कोष स्थायी र आवधिक हुन सक्नेछ । (२) कोषमा दाताको दानदातव्य रकमका आधारमा कोष प्रतिबन्धित वा अर्ध प्रतिबन्धित हुन सक्नेछ। ५. प्रतिबन्धित कोष: (१) प्रतिबन्धित कोषको दानदातव्य रकम कम्तिमा रु. १ करोड हुनुपर्नेछ । यस प्रकारका कोषको सञ्चालन कोषको दातासँगको सम्झौता अनुसार छुट्टै कोषको व्यवस्था गरी गर्न सकिनेछ । ६. अर्ध प्रतिबन्धित कोष (१) रु. १ करोडभन्दा कम शुरुवाती कोषको रकमलाई अर्ध प्रतिबन्धित कोषको रुपमा स्वीकार गरिनेछ ।`
//   },
//   {
//     chapter: "परिच्छेद ३: सञ्चालक समिति",
//     summary: "कोषको प्रभावकारी व्यवस्थापनका लागि रजिष्ट्रारको अध्यक्षतामा केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गरिएको छ। यसले कोष सञ्चालन, लगानी अनुमोदन र समग्र योजनाको व्यवस्थापन गर्दछ।",
//     details: `८. दानदातव्य कोष सञ्चालक समितिको गठन (१) कोषको प्रभावकारी व्यवस्थापनका लागि विश्वविद्यालयले एक केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गर्नेछ । समितिमा रजिष्ट्रार - अध्यक्ष, डीनहरू मध्येबाट एकजना - सदस्य, प्रमुख, आर्थिक प्रशासन महाशाखा - सदस्य लगायतका पदाधिकारी रहनेछन् ।`
//   },
//   {
//     chapter: "परिच्छेद ४: कोषको लगानी",
//     summary: "कोष मुद्दति निक्षेप वा समितिले स्वीकृत गरेका अन्य क्षेत्रमा लगानी गर्न सकिन्छ। आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च गर्न र बाँकी ५०% मूलकोषमा पुन: लगानी गर्नुपर्ने मुख्य नियम छ। यो कोष विश्वविद्यालयको ऋणको लागि धितोको रूपमा प्रयोग गर्न पाइने छैन।",
//     details: `१२. कोषको लगानी : (१) कोषको लगानी मुद्दति निक्षेप वा समितिले तोकिएको क्षेत्रमा लगानी गर्न सक्नेछ । (२) कोषबाट आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च गर्न सकिनेछ भने बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ । (५) दानदातव्यकोषको रकम प्रयोग गरेर विश्वविद्यालयले लिन सक्ने ऋणका निम्ति धितोको रुपमा प्रयोग गर्ने छैन ।`
//   }
// ];

// // const API_URL = 'https://digitaldashboard.tu.edu.np/api/donor';
// const API_URL = 'https://digitaldashboard.tu.edu.np/api/donater';
// const PDF_URL = 'https://portal.tu.edu.np/downloads/2025_02_08_21_20_17.pdf';

// interface Donor {
//   _id?: string;
//   donorName: string;
//   fundOfficialName: string;
//   natureOfEndowment: string;
//   relatedDepart: string;
//   agreementDate: string;
//   photo: string;
//   donorContactNumber: string;
//   donorEmail: string;
//   principalAmountOfEndowment: number;
//   personInCareOf: string;
//   reportingContactNumber: string;
//   reportingAddress: string;
//   fundingPlan: string;
//   amountOfEndowment: number;
//   termsOfEndowmentFund: string;
//   typesOfEndowmentPlan: string;
//   installmentsOfEndowment: string;
//   purposeOfUsingEndowmentReturns: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// const EndowmentFundComponent = () => {
//   const [activeChapter, setActiveChapter] = useState(0);
//   const [donors, setDonors] = useState<Donor[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterNature, setFilterNature] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [totalCount, setTotalCount] = useState(0);
//   const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
//   const [totalPrincipalAmount, setTotalPrincipalAmount] = useState(0);
//   const [totalEndowmentAmount, setTotalEndowmentAmount] = useState(0);

//   const fetchDonors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params: any = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sortBy,
//         sortOrder
//       };
      
//       if (searchTerm) params.search = searchTerm;
//       if (filterNature) params.natureOfEndowment = filterNature;
//       if (filterDepartment) params.relatedDepart = filterDepartment;

//       const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
//       const data = await response.json();
      
//       setDonors(data.data || []);
//       setTotalCount(data.pagination?.totalItems || data.total || 0);
      
//       // Calculate total amounts
//       const calculatedPrincipalTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
//         return sum + (donor.principalAmountOfEndowment || 0);
//       }, 0);
      
//       const calculatedEndowmentTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
//         return sum + (donor.amountOfEndowment || 0);
//       }, 0);
      
//       setTotalPrincipalAmount(calculatedPrincipalTotal);
//       setTotalEndowmentAmount(calculatedEndowmentTotal);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//       setDonors([]);
//       setTotalPrincipalAmount(0);
//       setTotalEndowmentAmount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterNature, filterDepartment, sortBy, sortOrder]);

//   useEffect(() => {
//     fetchDonors();
//   }, [fetchDonors]);

//   const handleOpenPdf = () => {
//     window.open(PDF_URL, '_blank');
//   };

//   const openImageModal = (imageUrl: string, donorName: string) => {
//     setSelectedImage({ url: imageUrl, name: donorName });
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const InvestmentIllustration = useMemo(() => (
//     <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 mt-6">
//       <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
//         <TrendingUp className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
//         कोषको लगानी तथा आम्दानी वितरण रणनीति
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//         विनियम १२(२) अन्तर्गत आम्दानीलाई दिगो विकासका लागि कसरी व्यवस्थापन गर्ने भन्ने नियम उल्लेख गरिएको छ:
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md border-b-4 border-green-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-green-700 dark:text-green-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">वितरण / खर्च</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको मूल उद्देश्य (छात्रवृत्ति, अनुसन्धान, जनशक्ति विकास) मा खर्च गरिने रकम।</p>
//         </div>
//         <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl shadow-md border-b-4 border-indigo-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-indigo-700 dark:text-indigo-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">पुन: लगानी / मूलधन वृद्धि</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको दीर्घकालीन दिगोपन सुनिश्चित गर्न मूलकोषमै थप गरिने रकम।</p>
//         </div>
//       </div>
//       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center border-t border-gray-200 dark:border-gray-700 pt-3">
//         विनियम १२(२): आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च र बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ।
//       </p>
//     </div>
//   ), []);

//   const AccordionItem = ({ index, title, summary, details, icon: Icon }: {
//     index: number;
//     title: string;
//     summary: string;
//     details: string;
//     icon: React.ComponentType<any>;
//   }) => {
//     const isActive = index === activeChapter;
//     return (
//       <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//         <button
//           className="flex justify-between items-center w-full p-5 text-left font-extrabold text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
//           onClick={() => setActiveChapter(isActive ? null : index)}
//           aria-expanded={isActive}
//           aria-controls={`content-${index}`}
//         >
//           <span className="flex items-center">
//             <Icon className={`w-6 h-6 mr-4 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`} />
//             {title}
//           </span>
//           {isActive ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
//         </button>
//         {isActive && (
//           <div id={`content-${index}`} className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 ease-in-out">
//             <div className="p-4 border-l-4 border-indigo-400 dark:border-indigo-600 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
//               <p className="text-base font-medium text-gray-800 dark:text-gray-300 leading-relaxed">
//                 मुख्य बुँदा: {summary}
//               </p>
//             </div>
            
//             <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
//               <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">विनियमको मूल पाठ</h4>
//               <p className="text-sm font-normal text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
//                 {details}
//               </p>
//             </div>
//             {index === 3 && InvestmentIllustration}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('ne-NP', {
//       style: 'currency',
//       currency: 'NPR'
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('ne-NP');
//   };

//   const truncateText = (text: string, maxLength: number) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-['Mukta', 'Noto_Sans_Devanagari', sans-serif]">
//       <style jsx global>{`
//         .font-['Mukta', 'Noto_Sans_Devanagari', sans-serif] { 
//           font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif; 
//         }
//         .text-gray-800, .text-gray-900 { color: #1f2937 !important; }
//         .dark .text-gray-100, .dark .text-gray-200 { color: #f9fafb !important; }
        
//         body::-webkit-scrollbar {
//           width: 8px;
//         }
//         body::-webkit-scrollbar-thumb {
//           background-color: #4f46e5;
//           border-radius: 4px;
//         }
//       `}</style>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
//           <div className="relative max-w-4xl max-h-full">
//             <button
//               onClick={closeImageModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <div className="bg-white p-2 rounded-lg">
//               <img 
//                 src={selectedImage.url} 
//                 alt={selectedImage.name}
//                 className="max-w-full max-h-[70vh] object-contain rounded"
//               />
//             </div>
//             <p className="text-white text-center mt-3 text-sm font-medium">{selectedImage.name}</p>
//             <p className="text-gray-400 text-center mt-1 text-xs">फोटो हेर्नको लागि क्लिक गर्नुभएकोमा धन्यवाद</p>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 border-l-8 border-indigo-600">
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
//                 त्रिभुवन विश्वविद्यालय दानदातव्य कोष
//               </h1>
//               <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
//                 विनियम, २०७९ को मुख्य प्रावधानहरू
//               </p>
//             </div>
//             <HardHat className="w-12 h-12 text-indigo-500 mt-1 hidden sm:block opacity-70 flex-shrink-0 ml-4" />
//           </div>
          
//           <p className="mt-5 text-gray-700 dark:text-gray-300 pl-2 text-base font-medium">
//             यो प्रस्तुतिले विश्वविद्यालयको दीर्घकालीन वित्तीय दिगोपन र शैक्षिक उत्कृष्टताका लागि आवश्यक कोष स्थापना र व्यवस्थापन गर्ने ढाँचालाई सरल भाषामा बुझाउँछ।
//           </p>
          
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleOpenPdf}
//               className="flex items-center justify-center px-6 py-3 text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]"
//             >
//               <FileText className="w-5 h-5 mr-2" />
//               पूर्ण विनियम PDF हेर्नुहोस्
//             </button>
//             <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
//               <ExternalLink className="w-4 h-4 mr-1" />
//               त्रिभुवन विश्वविद्यालयको आधिकारिक विनियम
//             </div>
//           </div>
//         </div>

//         {/* Core Content Accordion */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
//           <AccordionItem
//             index={0}
//             title="१. प्रस्तावना र कोषका उद्देश्यहरू"
//             summary={PDF_CONTENT[0].summary}
//             details={PDF_CONTENT[0].details}
//             icon={Target}
//           />
//           <AccordionItem
//             index={1}
//             title="२. कोषको संरचना र वर्गीकरण"
//             summary={PDF_CONTENT[1].summary}
//             details={PDF_CONTENT[1].details}
//             icon={BarChart} 
//           />
//           <AccordionItem
//             index={2}
//             title="३. सञ्चालक समिति र व्यवस्थापन"
//             summary={PDF_CONTENT[2].summary}
//             details={PDF_CONTENT[2].details}
//             icon={Users}
//           />
//           <AccordionItem
//             index={3}
//             title="४. लगानी नीति र आम्दानीको बाँडफाँड"
//             summary={PDF_CONTENT[3].summary}
//             details={PDF_CONTENT[3].details}
//             icon={TrendingUp}
//           />
//         </div>

//         {/* Donors Table Section */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//               <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
//                 <Users className="w-7 h-7 mr-3 text-indigo-600" />
//                 दानदातव्य कर्ताको विवरण
//               </h2>
              
//               {/* Total Amounts Display */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                   मूलधन: {formatCurrency(totalPrincipalAmount)}
//                 </div>
//                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                   दानधन: {formatCurrency(totalEndowmentAmount)}
//                 </div>
//               </div>
//             </div>
            
//             {/* Search and Filter */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="नाम, कोष, वा विभाग अनुसार खोज्नुहोस्..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="दानको प्रकृति फिल्टर गर्नुहोस्..."
//                 value={filterNature}
//                 onChange={(e) => setFilterNature(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="विभाग फिल्टर गर्नुहोस्..."
//                   value={filterDepartment}
//                   onChange={(e) => setFilterDepartment(e.target.value)}
//                   className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//                 <button
//                   onClick={fetchDonors}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center gap-2 shadow-md"
//                 >
//                   <Filter className="w-4 h-4" />
//                   खोज्नुहोस्
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="p-12 text-center">
//                 <div className="inline-block animate-spin h-12 w-12 border-b-2 border-indigo-600"></div>
//                 <p className="mt-4 text-gray-600 dark:text-gray-400">दानदाताहरूको विवरण लोड हुँदैछ...</p>
//               </div>
//             ) : donors.length === 0 ? (
//               <div className="p-12 text-center">
//                 <div className="text-gray-400 dark:text-gray-500 mb-4">
//                   <Users className="w-16 h-16 mx-auto opacity-50" />
//                 </div>
//                 <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">कुनै दानदाता फेला परेन</p>
//                 <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">कृपया आफ्नो खोज परिवर्तन गर्नुहोस् वा फिल्टर हटाउनुहोस्</p>
//               </div>
//             ) : (
//               <>
//                 <table className="w-full">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">क्र.सं</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानदाताको नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कोषको आधिकारिक नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानको प्रकृति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्बन्धित विभाग</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्झौता मिति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">मूलधन रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानधन रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">फोटो</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्पर्क नम्बर</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">इमेल</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">अतिरिक्त विवरण</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                     {donors.map((donor, index) => (
//                       <tr key={donor._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           {(currentPage - 1) * itemsPerPage + index + 1}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           <div className="flex flex-col">
//                             <span>{donor.donorName || 'N/A'}</span>
//                             {donor.personInCareOf && (
//                               <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
//                                 <UserCheck className="w-3 h-3 mr-1" />
//                                 {donor.personInCareOf}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donor.fundOfficialName || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//                             {donor.natureOfEndowment || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donor.relatedDepart || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3 text-gray-400" />
//                             {donor.agreementDate ? formatDate(donor.agreementDate) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="w-3 h-3" />
//                             {donor.principalAmountOfEndowment ? formatCurrency(donor.principalAmountOfEndowment) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="w-3 h-3" />
//                             {donor.amountOfEndowment ? formatCurrency(donor.amountOfEndowment) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           {donor.photo ? (
//                             <div className="relative">
//                               <button
//                                 onClick={() => openImageModal(donor.photo, donor.donorName)}
//                                 className="relative transition-all duration-200 hover:scale-110 hover:shadow-lg"
//                               >
//                                 <img 
//                                   src={donor.photo} 
//                                   alt={donor.donorName}
//                                   className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
//                                   onError={(e) => {
//                                     e.currentTarget.style.display = 'none';
//                                   }}
//                                 />
//                                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
//                                   <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                                 </div>
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-lg group relative">
//                               <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex flex-col gap-1">
//                             <div className="flex items-center gap-2">
//                               <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                               <span className="truncate max-w-[120px]">{donor.donorContactNumber || 'N/A'}</span>
//                             </div>
//                             {donor.reportingContactNumber && (
//                               <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                                 <Phone className="w-3 h-3" />
//                                 <span className="truncate max-w-[120px]">{donor.reportingContactNumber}</span>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                             <span className="truncate max-w-[150px]">{donor.donorEmail || 'N/A'}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex flex-col gap-1 text-xs">
//                             {donor.fundingPlan && (
//                               <div className="flex items-center gap-1" title={donor.fundingPlan}>
//                                 <ClipboardList className="w-3 h-3 text-green-500" />
//                                 <span>{truncateText(donor.fundingPlan, 20)}</span>
//                               </div>
//                             )}
//                             {donor.typesOfEndowmentPlan && (
//                               <div className="flex items-center gap-1" title={donor.typesOfEndowmentPlan}>
//                                 <Package className="w-3 h-3 text-blue-500" />
//                                 <span>{truncateText(donor.typesOfEndowmentPlan, 20)}</span>
//                               </div>
//                             )}
//                             {donor.installmentsOfEndowment && (
//                               <div className="flex items-center gap-1" title={donor.installmentsOfEndowment}>
//                                 <Clock className="w-3 h-3 text-purple-500" />
//                                 <span>{truncateText(donor.installmentsOfEndowment, 20)}</span>
//                               </div>
//                             )}
//                             {donor.reportingAddress && (
//                               <div className="flex items-center gap-1" title={donor.reportingAddress}>
//                                 <MapPin className="w-3 h-3 text-red-500" />
//                                 <span>{truncateText(donor.reportingAddress, 20)}</span>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Row */}
//                     <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-300 dark:border-gray-600 font-bold">
//                       <td colSpan="6" className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 text-right">
//                         कुल जम्मा:
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-green-600 dark:text-green-400">
//                         {formatCurrency(totalPrincipalAmount)}
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-blue-600 dark:text-blue-400">
//                         {formatCurrency(totalEndowmentAmount)}
//                       </td>
//                       <td colSpan="4" className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
//                         जम्मा {donors.length} दानदातव्य कर्ता
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </>
//             )}
//           </div>

//           {/* Pagination */}
//           {!loading && donors.length > 0 && (
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 पृष्ठ {currentPage} को {totalPages} (कुल {totalCount} दानदाताहरू)
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   अघिल्लो
//                 </button>
//                 <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg border">
//                   {currentPage} / {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   अर्को
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Additional Information Section */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Target className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">कोषको उद्देश्य</h3>
//             </div>
//             <p className="text-blue-100 leading-relaxed">
//               विश्वविद्यालयको शैक्षिक गुणस्तर कायम राख्न, छात्रवृत्ति, अनुसन्धान र जनशक्ति विकासका लागि दीर्घकालीन वित्तीय सहयोग प्रदान गर्ने।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <BarChart className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">लगानी नीति</h3>
//             </div>
//             <p className="text-green-100 leading-relaxed">
//               आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च र ५०% मूलकोषमा पुन: लगानी गर्ने दिगो विकासको रणनीति।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Users className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">सञ्चालन समिति</h3>
//             </div>
//             <p className="text-purple-100 leading-relaxed">
//               रजिष्ट्रारको अध्यक्षतामा गठित समितिले कोषको प्रभावकारी व्यवस्थापन र लगानी निर्णय गर्दछ।
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
//           <p className="font-medium">त्रिभुवन विश्वविद्यालय - दानदातव्य कोष विनियम, २०७९</p>
//           <p className="mt-2">© {new Date().getFullYear()} त्रिभुवन विश्वविद्यालय। सबै अधिकार सुरक्षित।</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EndowmentFundComponent;

// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { BookOpen, Users, Target, ChevronDown, ChevronUp, ExternalLink, TrendingUp, BarChart, HardHat, Search, Filter, ChevronLeft, ChevronRight, X, Phone, Mail, ZoomIn, FileText, MapPin, UserCheck, Calendar, DollarSign, ClipboardList, Package, Clock, Goal, Eye, Info } from 'lucide-react';

// // Content extracted and summarized from the oky.pdf document
// const PDF_CONTENT = [
//   {
//     chapter: "परिच्छेद १: प्रस्तावना",
//     summary: "यो विनियमले विश्वविद्यालयको शैक्षिक गुणस्तर कायम गर्न, दिगो शिक्षा सबल बनाउन, छात्रवृत्ति र अनुसन्धान वृत्ति प्रदान गर्न, अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता अभिवृद्धि गर्न र विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोत जुटाउन दानदातव्य कोष (Endowment Fund) स्थापना गरेको छ।",
//     details: `त्रिभुवन विश्वविद्यालयलाई वैकल्पिक श्रोतको व्यवस्थापनमार्फत अझ बढी शैक्षिक गुणस्तर कायम गर्न, दिगो एवम् उच्च शिक्षा सबल बनाउन, विद्यार्थीलाई छात्रवृत्ति, तथा अनुसंन्धान वृत्ति, विश्वविद्यालयमा अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता तथा दक्षता अभिवृद्धि गर्न र यी कार्यहरूमार्फत् विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोतहरूको खोजी गर्न र प्राप्त भएका आर्थिक एवं वित्तीय स्रोतको प्रभावकारी परिचालन गर्न, सुव्यवस्थित सञ्चालन गर्न वाञ्छनीय भएकोले त्रि.वि. आर्थिक व्यवस्थापन तथा खरिदसम्बन्धी नियम, २०५० को नियम ५ बमोजिमको विशेष कोषको रुपमा दानदातव्य कोष (Endowment Fund) स्थापना गरी सोको व्यवस्थित सञ्चालनका लागि त्रिभुवन विश्वविद्यालय कार्यकारी परिषद्ले यी विनियमहरू बनाई लागु गरेको छ ।`
//   },
//   {
//     chapter: "परिच्छेद २: कोषको किसिम",
//     summary: "स्थायी र आवधिक (समयका आधारमा) तथा प्रतिबन्धित र अर्ध प्रतिबन्धित (दाताको शर्तका आधारमा) गरी कोषहरूलाई वर्गीकरण गरिएको छ। प्रतिबन्धित कोषका लागि न्यूनतम रु. १ करोडको योगदान आवश्यक पर्दछ।",
//     details: `(१) समयका आधारमा कोष स्थायी र आवधिक हुन सक्नेछ । (२) कोषमा दाताको दानदातव्य रकमका आधारमा कोष प्रतिबन्धित वा अर्ध प्रतिबन्धित हुन सक्नेछ। ५. प्रतिबन्धित कोष: (१) प्रतिबन्धित कोषको दानदातव्य रकम कम्तिमा रु. १ करोड हुनुपर्नेछ । यस प्रकारका कोषको सञ्चालन कोषको दातासँगको सम्झौता अनुसार छुट्टै कोषको व्यवस्था गरी गर्न सकिनेछ । ६. अर्ध प्रतिबन्धित कोष (१) रु. १ करोडभन्दा कम शुरुवाती कोषको रकमलाई अर्ध प्रतिबन्धित कोषको रुपमा स्वीकार गरिनेछ ।`
//   },
//   {
//     chapter: "परिच्छेद ३: सञ्चालक समिति",
//     summary: "कोषको प्रभावकारी व्यवस्थापनका लागि रजिष्ट्रारको अध्यक्षतामा केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गरिएको छ। यसले कोष सञ्चालन, लगानी अनुमोदन र समग्र योजनाको व्यवस्थापन गर्दछ।",
//     details: `८. दानदातव्य कोष सञ्चालक समितिको गठन (१) कोषको प्रभावकारी व्यवस्थापनका लागि विश्वविद्यालयले एक केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गर्नेछ । समितिमा रजिष्ट्रार - अध्यक्ष, डीनहरू मध्येबाट एकजना - सदस्य, प्रमुख, आर्थिक प्रशासन महाशाखा - सदस्य लगायतका पदाधिकारी रहनेछन् ।`
//   },
//   {
//     chapter: "परिच्छेद ४: कोषको लगानी",
//     summary: "कोष मुद्दति निक्षेप वा समितिले स्वीकृत गरेका अन्य क्षेत्रमा लगानी गर्न सकिन्छ। आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च गर्न र बाँकी ५०% मूलकोषमा पुन: लगानी गर्नुपर्ने मुख्य नियम छ। यो कोष विश्वविद्यालयको ऋणको लागि धितोको रूपमा प्रयोग गर्न पाइने छैन।",
//     details: `१२. कोषको लगानी : (१) कोषको लगानी मुद्दति निक्षेप वा समितिले तोकिएको क्षेत्रमा लगानी गर्न सक्नेछ । (२) कोषबाट आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च गर्न सकिनेछ भने बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ । (५) दानदातव्यकोषको रकम प्रयोग गरेर विश्वविद्यालयले लिन सक्ने ऋणका निम्ति धितोको रुपमा प्रयोग गर्ने छैन ।`
//   }
// ];

// // const API_URL = 'https://digitaldashboard.tu.edu.np/api/donor';

// const API_URL = 'https://digitaldashboard.tu.edu.np/api/donater';
// const PDF_URL = 'https://portal.tu.edu.np/downloads/2025_02_08_21_20_17.pdf';

// interface Donor {
//   _id?: string;
//   donorName: string;
//   fundOfficialName: string;
//   natureOfEndowment: string;
//   relatedDepart: string;
//   agreementDate: string;
//   photo: string;
//   donorContactNumber: string;
//   donorEmail: string;
//   principalAmountOfEndowment: number;
//   personInCareOf: string;
//   reportingContactNumber: string;
//   reportingAddress: string;
//   fundingPlan: string;
//   amountOfEndowment: number;
//   termsOfEndowmentFund: string;
//   typesOfEndowmentPlan: string;
//   installmentsOfEndowment: string;
//   purposeOfUsingEndowmentReturns: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// const EndowmentFundComponent = () => {
//   const [activeChapter, setActiveChapter] = useState(0);
//   const [donors, setDonors] = useState<Donor[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterNature, setFilterNature] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [totalCount, setTotalCount] = useState(0);
//   const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
//   const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
//   const [totalPrincipalAmount, setTotalPrincipalAmount] = useState(0);
//   const [totalEndowmentAmount, setTotalEndowmentAmount] = useState(0);

//   const fetchDonors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params: any = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sortBy,
//         sortOrder
//       };
      
//       if (searchTerm) params.search = searchTerm;
//       if (filterNature) params.natureOfEndowment = filterNature;
//       if (filterDepartment) params.relatedDepart = filterDepartment;

//       const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
//       const data = await response.json();
      
//       setDonors(data.data || []);
//       setTotalCount(data.pagination?.totalItems || data.total || 0);
      
//       // Calculate total amounts
//       const calculatedPrincipalTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
//         return sum + (donor.principalAmountOfEndowment || 0);
//       }, 0);
      
//       const calculatedEndowmentTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
//         return sum + (donor.amountOfEndowment || 0);
//       }, 0);
      
//       setTotalPrincipalAmount(calculatedPrincipalTotal);
//       setTotalEndowmentAmount(calculatedEndowmentTotal);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//       setDonors([]);
//       setTotalPrincipalAmount(0);
//       setTotalEndowmentAmount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterNature, filterDepartment, sortBy, sortOrder]);

//   useEffect(() => {
//     fetchDonors();
//   }, [fetchDonors]);

//   const handleOpenPdf = () => {
//     window.open(PDF_URL, '_blank');
//   };

//   const openImageModal = (imageUrl: string, donorName: string) => {
//     setSelectedImage({ url: imageUrl, name: donorName });
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const openDonorDetails = (donor: Donor) => {
//     setSelectedDonor(donor);
//   };

//   const closeDonorDetails = () => {
//     setSelectedDonor(null);
//   };

//   const InvestmentIllustration = useMemo(() => (
//     <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 mt-6">
//       <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
//         <TrendingUp className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
//         कोषको लगानी तथा आम्दानी वितरण रणनीति
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//         विनियम १२(२) अन्तर्गत आम्दानीलाई दिगो विकासका लागि कसरी व्यवस्थापन गर्ने भन्ने नियम उल्लेख गरिएको छ:
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md border-b-4 border-green-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-green-700 dark:text-green-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">वितरण / खर्च</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको मूल उद्देश्य (छात्रवृत्ति, अनुसन्धान, जनशक्ति विकास) मा खर्च गरिने रकम।</p>
//         </div>
//         <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl shadow-md border-b-4 border-indigo-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-indigo-700 dark:text-indigo-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">पुन: लगानी / मूलधन वृद्धि</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको दीर्घकालीन दिगोपन सुनिश्चित गर्न मूलकोषमै थप गरिने रकम।</p>
//         </div>
//       </div>
//       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center border-t border-gray-200 dark:border-gray-700 pt-3">
//         विनियम १२(२): आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च र बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ।
//       </p>
//     </div>
//   ), []);

//   const AccordionItem = ({ index, title, summary, details, icon: Icon }: {
//     index: number;
//     title: string;
//     summary: string;
//     details: string;
//     icon: React.ComponentType<any>;
//   }) => {
//     const isActive = index === activeChapter;
//     return (
//       <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//         <button
//           className="flex justify-between items-center w-full p-5 text-left font-extrabold text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
//           onClick={() => setActiveChapter(isActive ? null : index)}
//           aria-expanded={isActive}
//           aria-controls={`content-${index}`}
//         >
//           <span className="flex items-center">
//             <Icon className={`w-6 h-6 mr-4 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`} />
//             {title}
//           </span>
//           {isActive ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
//         </button>
//         {isActive && (
//           <div id={`content-${index}`} className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 ease-in-out">
//             <div className="p-4 border-l-4 border-indigo-400 dark:border-indigo-600 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
//               <p className="text-base font-medium text-gray-800 dark:text-gray-300 leading-relaxed">
//                 मुख्य बुँदा: {summary}
//               </p>
//             </div>
            
//             <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
//               <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">विनियमको मूल पाठ</h4>
//               <p className="text-sm font-normal text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
//                 {details}
//               </p>
//             </div>
//             {index === 3 && InvestmentIllustration}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('ne-NP', {
//       style: 'currency',
//       currency: 'NPR'
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('ne-NP');
//   };

//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-['Mukta', 'Noto_Sans_Devanagari', sans-serif]">
//       <style jsx global>{`
//         .font-['Mukta', 'Noto_Sans_Devanagari', sans-serif] { 
//           font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif; 
//         }
//         .text-gray-800, .text-gray-900 { color: #1f2937 !important; }
//         .dark .text-gray-100, .dark .text-gray-200 { color: #f9fafb !important; }
        
//         body::-webkit-scrollbar {
//           width: 8px;
//         }
//         body::-webkit-scrollbar-thumb {
//           background-color: #4f46e5;
//           border-radius: 4px;
//         }
//       `}</style>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
//           <div className="relative max-w-4xl max-h-full">
//             <button
//               onClick={closeImageModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <div className="bg-white p-2 rounded-lg">
//               <img 
//                 src={selectedImage.url} 
//                 alt={selectedImage.name}
//                 className="max-w-full max-h-[70vh] object-contain rounded"
//               />
//             </div>
//             <p className="text-white text-center mt-3 text-sm font-medium">{selectedImage.name}</p>
//             <p className="text-gray-400 text-center mt-1 text-xs">फोटो हेर्नको लागि क्लिक गर्नुभएकोमा धन्यवाद</p>
//           </div>
//         </div>
//       )}

//       {/* Donor Details Modal */}
//       {selectedDonor && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
//           <div className="relative max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
//             <button
//               onClick={closeDonorDetails}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 z-10"
//             >
//               <X className="w-6 h-6" />
//             </button>
            
//             <div className="p-6">
//               {/* Header */}
//               <div className="flex items-start gap-4 mb-6">
//                 {selectedDonor.photo && (
//                   <img 
//                     src={selectedDonor.photo} 
//                     alt={selectedDonor.donorName}
//                     className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                     {selectedDonor.donorName}
//                   </h2>
//                   <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
//                     {selectedDonor.fundOfficialName}
//                   </p>
//                   {selectedDonor.personInCareOf && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
//                       <UserCheck className="w-4 h-4 mr-1" />
//                       व्यक्तिगत हेरचाह: {selectedDonor.personInCareOf}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Basic Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
//                     <Info className="w-5 h-5 mr-2 text-blue-500" />
//                     मूल विवरण
//                   </h3>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-500 dark:text-gray-400">दानको प्रकृति</label>
//                       <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.natureOfEndowment}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500 dark:text-gray-400">सम्बन्धित विभाग</label>
//                       <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.relatedDepart}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500 dark:text-gray-400">सम्झौता मिति</label>
//                       <p className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         {formatDate(selectedDonor.agreementDate)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Financial Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
//                     <DollarSign className="w-5 h-5 mr-2 text-green-500" />
//                     आर्थिक विवरण
//                   </h3>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
//                       <label className="text-sm font-medium text-gray-500 dark:text-gray-400">मूलधन रकम</label>
//                       <p className="text-lg font-bold text-green-600 dark:text-green-400">
//                         {formatCurrency(selectedDonor.principalAmountOfEndowment)}
//                       </p>
//                     </div>
//                     <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
//                       <label className="text-sm font-medium text-gray-500 dark:text-gray-400">दानधन रकम</label>
//                       <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
//                         {formatCurrency(selectedDonor.amountOfEndowment)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
//                     <Phone className="w-5 h-5 mr-2 text-purple-500" />
//                     सम्पर्क विवरण
//                   </h3>
                  
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <Phone className="w-4 h-4 text-gray-400" />
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400">मुख्य सम्पर्क नम्बर</label>
//                         <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.donorContactNumber}</p>
//                       </div>
//                     </div>
                    
//                     {selectedDonor.reportingContactNumber && (
//                       <div className="flex items-center gap-3">
//                         <Phone className="w-4 h-4 text-gray-400" />
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400">प्रतिवेदन सम्पर्क नम्बर</label>
//                           <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.reportingContactNumber}</p>
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="flex items-center gap-3">
//                       <Mail className="w-4 h-4 text-gray-400" />
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400">इमेल ठेगाना</label>
//                         <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.donorEmail}</p>
//                       </div>
//                     </div>
                    
//                     {selectedDonor.reportingAddress && (
//                       <div className="flex items-start gap-3">
//                         <MapPin className="w-4 h-4 text-gray-400 mt-1" />
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400">प्रतिवेदन ठेगाना</label>
//                           <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.reportingAddress}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Additional Details */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
//                     <ClipboardList className="w-5 h-5 mr-2 text-orange-500" />
//                     अतिरिक्त विवरण
//                   </h3>
                  
//                   <div className="space-y-3">
//                     {selectedDonor.fundingPlan && (
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
//                           <ClipboardList className="w-4 h-4" />
//                           कोष योजना
//                         </label>
//                         <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.fundingPlan}
//                         </p>
//                       </div>
//                     )}
                    
//                     {selectedDonor.typesOfEndowmentPlan && (
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
//                           <Package className="w-4 h-4" />
//                           दान योजनाको प्रकार
//                         </label>
//                         <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.typesOfEndowmentPlan}
//                         </p>
//                       </div>
//                     )}
                    
//                     {selectedDonor.installmentsOfEndowment && (
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
//                           <Clock className="w-4 h-4" />
//                           किस्ता योजना
//                         </label>
//                         <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.installmentsOfEndowment}
//                         </p>
//                       </div>
//                     )}
                    
//                     {selectedDonor.termsOfEndowmentFund && (
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
//                           <FileText className="w-4 h-4" />
//                           कोषको शर्तहरू
//                         </label>
//                         <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.termsOfEndowmentFund}
//                         </p>
//                       </div>
//                     )}
                    
//                     {selectedDonor.purposeOfUsingEndowmentReturns && (
//                       <div>
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
//                           <Goal className="w-4 h-4" />
//                           दान फाइदाको उद्देश्य
//                         </label>
//                         <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.purposeOfUsingEndowmentReturns}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 border-l-8 border-indigo-600">
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
//                 त्रिभुवन विश्वविद्यालय दानदातव्य कोष
//               </h1>
//               <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
//                 विनियम, २०७९ को मुख्य प्रावधानहरू
//               </p>
//             </div>
//             <HardHat className="w-12 h-12 text-indigo-500 mt-1 hidden sm:block opacity-70 flex-shrink-0 ml-4" />
//           </div>
          
//           <p className="mt-5 text-gray-700 dark:text-gray-300 pl-2 text-base font-medium">
//             यो प्रस्तुतिले विश्वविद्यालयको दीर्घकालीन वित्तीय दिगोपन र शैक्षिक उत्कृष्टताका लागि आवश्यक कोष स्थापना र व्यवस्थापन गर्ने ढाँचालाई सरल भाषामा बुझाउँछ।
//           </p>
          
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleOpenPdf}
//               className="flex items-center justify-center px-6 py-3 text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]"
//             >
//               <FileText className="w-5 h-5 mr-2" />
//               पूर्ण विनियम PDF हेर्नुहोस्
//             </button>
//             <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
//               <ExternalLink className="w-4 h-4 mr-1" />
//               त्रिभुवन विश्वविद्यालयको आधिकारिक विनियम
//             </div>
//           </div>
//         </div>

//         {/* Core Content Accordion */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
//           <AccordionItem
//             index={0}
//             title="१. प्रस्तावना र कोषका उद्देश्यहरू"
//             summary={PDF_CONTENT[0].summary}
//             details={PDF_CONTENT[0].details}
//             icon={Target}
//           />
//           <AccordionItem
//             index={1}
//             title="२. कोषको संरचना र वर्गीकरण"
//             summary={PDF_CONTENT[1].summary}
//             details={PDF_CONTENT[1].details}
//             icon={BarChart} 
//           />
//           <AccordionItem
//             index={2}
//             title="३. सञ्चालक समिति र व्यवस्थापन"
//             summary={PDF_CONTENT[2].summary}
//             details={PDF_CONTENT[2].details}
//             icon={Users}
//           />
//           <AccordionItem
//             index={3}
//             title="४. लगानी नीति र आम्दानीको बाँडफाँड"
//             summary={PDF_CONTENT[3].summary}
//             details={PDF_CONTENT[3].details}
//             icon={TrendingUp}
//           />
//         </div>

//         {/* Donors Table Section */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//               <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
//                 <Users className="w-7 h-7 mr-3 text-indigo-600" />
//                 दानदातव्य कर्ताको विवरण
//               </h2>
              
//               {/* Total Amounts Display */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                   मूलधन: {formatCurrency(totalPrincipalAmount)}
//                 </div>
//                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                   दानधन: {formatCurrency(totalEndowmentAmount)}
//                 </div>
//               </div>
//             </div>
            
//             {/* Search and Filter */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="नाम, कोष, वा विभाग अनुसार खोज्नुहोस्..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="दानको प्रकृति फिल्टर गर्नुहोस्..."
//                 value={filterNature}
//                 onChange={(e) => setFilterNature(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="विभाग फिल्टर गर्नुहोस्..."
//                   value={filterDepartment}
//                   onChange={(e) => setFilterDepartment(e.target.value)}
//                   className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//                 <button
//                   onClick={fetchDonors}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center gap-2 shadow-md"
//                 >
//                   <Filter className="w-4 h-4" />
//                   खोज्नुहोस्
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="p-12 text-center">
//                 <div className="inline-block animate-spin h-12 w-12 border-b-2 border-indigo-600"></div>
//                 <p className="mt-4 text-gray-600 dark:text-gray-400">दानदाताहरूको विवरण लोड हुँदैछ...</p>
//               </div>
//             ) : donors.length === 0 ? (
//               <div className="p-12 text-center">
//                 <div className="text-gray-400 dark:text-gray-500 mb-4">
//                   <Users className="w-16 h-16 mx-auto opacity-50" />
//                 </div>
//                 <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">कुनै दानदाता फेला परेन</p>
//                 <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">कृपया आफ्नो खोज परिवर्तन गर्नुहोस् वा फिल्टर हटाउनुहोस्</p>
//               </div>
//             ) : (
//               <>
//                 <table className="w-full">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">क्र.सं</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानदाताको नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कोषको आधिकारिक नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानको प्रकृति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्बन्धित विभाग</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्झौता मिति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">मूलधन रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानधन रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">फोटो</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कार्यहरू</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                     {donors.map((donor, index) => (
//                       <tr key={donor._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           {(currentPage - 1) * itemsPerPage + index + 1}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           <div className="flex flex-col">
//                             <span>{donor.donorName || 'N/A'}</span>
//                             {donor.personInCareOf && (
//                               <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
//                                 <UserCheck className="w-3 h-3 mr-1" />
//                                 {donor.personInCareOf}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donor.fundOfficialName || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//                             {donor.natureOfEndowment || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donor.relatedDepart || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3 text-gray-400" />
//                             {donor.agreementDate ? formatDate(donor.agreementDate) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="w-3 h-3" />
//                             {donor.principalAmountOfEndowment ? formatCurrency(donor.principalAmountOfEndowment) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
//                           <div className="flex items-center gap-1">
//                             <DollarSign className="w-3 h-3" />
//                             {donor.amountOfEndowment ? formatCurrency(donor.amountOfEndowment) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           {donor.photo ? (
//                             <div className="relative">
//                               <button
//                                 onClick={() => openImageModal(donor.photo, donor.donorName)}
//                                 className="relative transition-all duration-200 hover:scale-110 hover:shadow-lg"
//                               >
//                                 <img 
//                                   src={donor.photo} 
//                                   alt={donor.donorName}
//                                   className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
//                                   onError={(e) => {
//                                     e.currentTarget.style.display = 'none';
//                                   }}
//                                 />
//                                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
//                                   <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                                 </div>
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-lg group relative">
//                               <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             onClick={() => openDonorDetails(donor)}
//                             className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 text-sm font-medium"
//                           >
//                             <Eye className="w-4 h-4" />
//                             विवरण हेर्नुहोस्
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Row */}
//                     <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-300 dark:border-gray-600 font-bold">
//                       <td colSpan="6" className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 text-right">
//                         कुल जम्मा:
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-green-600 dark:text-green-400">
//                         {formatCurrency(totalPrincipalAmount)}
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-blue-600 dark:text-blue-400">
//                         {formatCurrency(totalEndowmentAmount)}
//                       </td>
//                       <td colSpan="2" className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
//                         जम्मा {donors.length} दानदातव्य कर्ता
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </>
//             )}
//           </div>

//           {/* Pagination */}
//           {!loading && donors.length > 0 && (
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 पृष्ठ {currentPage} को {totalPages} (कुल {totalCount} दानदाताहरू)
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   अघिल्लो
//                 </button>
//                 <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg border">
//                   {currentPage} / {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   अर्को
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Additional Information Section */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Target className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">कोषको उद्देश्य</h3>
//             </div>
//             <p className="text-blue-100 leading-relaxed">
//               विश्वविद्यालयको शैक्षिक गुणस्तर कायम राख्न, छात्रवृत्ति, अनुसन्धान र जनशक्ति विकासका लागि दीर्घकालीन वित्तीय सहयोग प्रदान गर्ने।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <BarChart className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">लगानी नीति</h3>
//             </div>
//             <p className="text-green-100 leading-relaxed">
//               आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च र ५०% मूलकोषमा पुन: लगानी गर्ने दिगो विकासको रणनीति।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Users className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">सञ्चालन समिति</h3>
//             </div>
//             <p className="text-purple-100 leading-relaxed">
//               रजिष्ट्रारको अध्यक्षतामा गठित समितिले कोषको प्रभावकारी व्यवस्थापन र लगानी निर्णय गर्दछ।
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
//           <p className="font-medium">त्रिभुवन विश्वविद्यालय - दानदातव्य कोष विनियम, २०७९</p>
//           <p className="mt-2">© {new Date().getFullYear()} त्रिभुवन विश्वविद्यालय। सबै अधिकार सुरक्षित।</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EndowmentFundComponent;


// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { BookOpen, Users, Target, ChevronDown, ChevronUp, ExternalLink, TrendingUp, BarChart, HardHat, Search, Filter, ChevronLeft, ChevronRight, X, Phone, Mail, ZoomIn, FileText, MapPin, UserCheck, Calendar, DollarSign, ClipboardList, Package, Clock, Goal, Eye, Info, Download, FileIcon } from 'lucide-react';

// // Content extracted and summarized from the oky.pdf document
// const PDF_CONTENT = [
//   {
//     chapter: "परिच्छेद १: प्रस्तावना",
//     summary: "यो विनियमले विश्वविद्यालयको शैक्षिक गुणस्तर कायम गर्न, दिगो शिक्षा सबल बनाउन, छात्रवृत्ति र अनुसन्धान वृत्ति प्रदान गर्न, अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता अभिवृद्धि गर्न र विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोत जुटाउन दानदातव्य कोष (Endowment Fund) स्थापना गरेको छ।",
//     details: `त्रिभुवन विश्वविद्यालयलाई वैकल्पिक श्रोतको व्यवस्थापनमार्फत अझ बढी शैक्षिक गुणस्तर कायम गर्न, दिगो एवम् उच्च शिक्षा सबल बनाउन, विद्यार्थीलाई छात्रवृत्ति, तथा अनुसंन्धान वृत्ति, विश्वविद्यालयमा अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता तथा दक्षता अभिवृद्धि गर्न र यी कार्यहरूमार्फत् विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोतहरूको खोजी गर्न र प्राप्त भएका आर्थिक एवं वित्तीय स्रोतको प्रभावकारी परिचालन गर्न, सुव्यवस्थित सञ्चालन गर्न वाञ्छनीय भएकोले त्रि.वि. आर्थिक व्यवस्थापन तथा खरिदसम्बन्धी नियम, २०५० को नियम ५ बमोजिमको विशेष कोषको रुपमा दानदातव्य कोष (Endowment Fund) स्थापना गरी सोको व्यवस्थित सञ्चालनका लागि त्रिभुवन विश्वविद्यालय कार्यकारी परिषद्ले यी विनियमहरू बनाई लागु गरेको छ ।`
//   },
//   {
//     chapter: "परिच्छेद २: कोषको किसिम",
//     summary: "स्थायी र आवधिक (समयका आधारमा) तथा प्रतिबन्धित र अर्ध प्रतिबन्धित (दाताको शर्तका आधारमा) गरी कोषहरूलाई वर्गीकरण गरिएको छ। प्रतिबन्धित कोषका लागि न्यूनतम रु. १ करोडको योगदान आवश्यक पर्दछ।",
//     details: `(१) समयका आधारमा कोष स्थायी र आवधिक हुन सक्नेछ । (२) कोषमा दाताको दानदातव्य रकमका आधारमा कोष प्रतिबन्धित वा अर्ध प्रतिबन्धित हुन सक्नेछ। ५. प्रतिबन्धित कोष: (१) प्रतिबन्धित कोषको दानदातव्य रकम कम्तिमा रु. १ करोड हुनुपर्नेछ । यस प्रकारका कोषको सञ्चालन कोषको दातासँगको सम्झौता अनुसार छुट्टै कोषको व्यवस्था गरी गर्न सकिनेछ । ६. अर्ध प्रतिबन्धित कोष (१) रु. १ करोडभन्दा कम शुरुवाती कोषको रकमलाई अर्ध प्रतिबन्धित कोषको रुपमा स्वीकार गरिनेछ ।`
//   },
//   {
//     chapter: "परिच्छेद ३: सञ्चालक समिति",
//     summary: "कोषको प्रभावकारी व्यवस्थापनका लागि रजिष्ट्रारको अध्यक्षतामा केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गरिएको छ। यसले कोष सञ्चालन, लगानी अनुमोदन र समग्र योजनाको व्यवस्थापन गर्दछ।",
//     details: `८. दानदातव्य कोष सञ्चालक समितिको गठन (१) कोषको प्रभावकारी व्यवस्थापनका लागि विश्वविद्यालयले एक केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गर्नेछ । समितिमा रजिष्ट्रार - अध्यक्ष, डीनहरू मध्येबाट एकजना - सदस्य, प्रमुख, आर्थिक प्रशासन महाशाखा - सदस्य लगायतका पदाधिकारी रहनेछन् ।`
//   },
//   {
//     chapter: "परिच्छेद ४: कोषको लगानी",
//     summary: "कोष मुद्दति निक्षेप वा समितिले स्वीकृत गरेका अन्य क्षेत्रमा लगानी गर्न सकिन्छ। आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च गर्न र बाँकी ५०% मूलकोषमा पुन: लगानी गर्नुपर्ने मुख्य नियम छ। यो कोष विश्वविद्यालयको ऋणको लागि धितोको रूपमा प्रयोग गर्न पाइने छैन।",
//     details: `१२. कोषको लगानी : (१) कोषको लगानी मुद्दति निक्षेप वा समितिले तोकिएको क्षेत्रमा लगानी गर्न सक्नेछ । (२) कोषबाट आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च गर्न सकिनेछ भने बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ । (५) दानदातव्यकोषको रकम प्रयोग गरेर विश्वविद्यालयले लिन सक्ने ऋणका निम्ति धितोको रुपमा प्रयोग गर्ने छैन ।`
//   }
// ];

// // const API_URL = 'https://digitaldashboard.tu.edu.np/api/donor';

// const API_URL = 'https://digitaldashboard.tu.edu.np/api/donater';
// const PDF_URL = 'https://portal.tu.edu.np/downloads/2025_02_08_21_20_17.pdf';

// interface Donor {
//   _id?: string;
//   donorName: string;
//   fundOfficialName: string;
//   natureOfEndowment: string;
//   relatedDepart: string;
//   agreementDate: string;
//   photo: string;
//   donorContactNumber: string;
//   donorEmail: string;
//   principalAmountOfEndowment: number;
//   personInCareOf: string;
//   reportingContactNumber: string;
//   reportingAddress: string;
//   fundingPlan: string;
//   amountOfEndowment: number;
//   termsOfEndowmentFund: string;
//   typesOfEndowmentPlan: string;
//   installmentsOfEndowment: string;
//   purposeOfUsingEndowmentReturns: string;
//   endowmentDetailsPdf?: string; // Added field for PDF URL
//   createdAt?: string;
//   updatedAt?: string;
// }

// const EndowmentFundComponent = () => {
//   const [activeChapter, setActiveChapter] = useState(0);
//   const [donors, setDonors] = useState<Donor[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterNature, setFilterNature] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [totalCount, setTotalCount] = useState(0);
//   const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
//   const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
//   const [totalPrincipalAmount, setTotalPrincipalAmount] = useState(0);
//   const [totalEndowmentAmount, setTotalEndowmentAmount] = useState(0);

//   const fetchDonors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params: any = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sortBy,
//         sortOrder
//       };
      
//       if (searchTerm) params.search = searchTerm;
//       if (filterNature) params.natureOfEndowment = filterNature;
//       if (filterDepartment) params.relatedDepart = filterDepartment;

//       const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
//       const data = await response.json();
      
//       setDonors(data.data || []);
//       setTotalCount(data.pagination?.totalItems || data.total || 0);
      
//       // Calculate total amounts
//       const calculatedPrincipalTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
//         return sum + (donor.principalAmountOfEndowment || 0);
//       }, 0);
      
//       const calculatedEndowmentTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
//         return sum + (donor.amountOfEndowment || 0);
//       }, 0);
      
//       setTotalPrincipalAmount(calculatedPrincipalTotal);
//       setTotalEndowmentAmount(calculatedEndowmentTotal);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//       setDonors([]);
//       setTotalPrincipalAmount(0);
//       setTotalEndowmentAmount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterNature, filterDepartment, sortBy, sortOrder]);

//   useEffect(() => {
//     fetchDonors();
//   }, [fetchDonors]);

//   const handleOpenPdf = () => {
//     window.open(PDF_URL, '_blank');
//   };

//   const openImageModal = (imageUrl: string, donorName: string) => {
//     setSelectedImage({ url: imageUrl, name: donorName });
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const openDonorDetails = (donor: Donor) => {
//     setSelectedDonor(donor);
//   };

//   const closeDonorDetails = () => {
//     setSelectedDonor(null);
//   };

//   const openEndowmentPdf = (pdfUrl: string) => {
//     if (pdfUrl) {
//       window.open(pdfUrl, '_blank');
//     }
//   };

//   const downloadEndowmentPdf = (pdfUrl: string, donorName: string) => {
//     if (pdfUrl) {
//       const link = document.createElement('a');
//       link.href = pdfUrl;
//       link.download = `${donorName}_Endowment_Details.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const InvestmentIllustration = useMemo(() => (
//     <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 mt-6">
//       <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
//         <TrendingUp className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
//         कोषको लगानी तथा आम्दानी वितरण रणनीति
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//         विनियम १२(२) अन्तर्गत आम्दानीलाई दिगो विकासका लागि कसरी व्यवस्थापन गर्ने भन्ने नियम उल्लेख गरिएको छ:
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md border-b-4 border-green-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-green-700 dark:text-green-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">वितरण / खर्च</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको मूल उद्देश्य (छात्रवृत्ति, अनुसन्धान, जनशक्ति विकास) मा खर्च गरिने रकम।</p>
//         </div>
//         <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl shadow-md border-b-4 border-indigo-600 transition-shadow duration-300 hover:shadow-lg">
//           <p className="text-4xl font-black text-indigo-700 dark:text-indigo-400">५०%</p>
//           <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">पुन: लगानी / मूलधन वृद्धि</p>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको दीर्घकालीन दिगोपन सुनिश्चित गर्न मूलकोषमै थप गरिने रकम।</p>
//         </div>
//       </div>
//       <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center border-t border-gray-200 dark:border-gray-700 pt-3">
//         विनियम १२(२): आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च र बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ।
//       </p>
//     </div>
//   ), []);

//   const AccordionItem = ({ index, title, summary, details, icon: Icon }: {
//     index: number;
//     title: string;
//     summary: string;
//     details: string;
//     icon: React.ComponentType<any>;
//   }) => {
//     const isActive = index === activeChapter;
//     return (
//       <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//         <button
//           className="flex justify-between items-center w-full p-5 text-left font-extrabold text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
//           onClick={() => setActiveChapter(isActive ? null : index)}
//           aria-expanded={isActive}
//           aria-controls={`content-${index}`}
//         >
//           <span className="flex items-center">
//             <Icon className={`w-6 h-6 mr-4 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`} />
//             {title}
//           </span>
//           {isActive ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
//         </button>
//         {isActive && (
//           <div id={`content-${index}`} className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 ease-in-out">
//             <div className="p-4 border-l-4 border-indigo-400 dark:border-indigo-600 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
//               <p className="text-base font-medium text-gray-800 dark:text-gray-300 leading-relaxed">
//                 मुख्य बुँदा: {summary}
//               </p>
//             </div>
            
//             <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
//               <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">विनियमको मूल पाठ</h4>
//               <p className="text-sm font-normal text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
//                 {details}
//               </p>
//             </div>
//             {index === 3 && InvestmentIllustration}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('ne-NP', {
//       style: 'currency',
//       currency: 'NPR'
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('ne-NP');
//   };

//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-['Mukta', 'Noto_Sans_Devanagari', sans-serif]">
//       <style jsx global>{`
//         .font-['Mukta', 'Noto_Sans_Devanagari', sans-serif] { 
//           font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif; 
//         }
//         .text-gray-800, .text-gray-900 { color: #1f2937 !important; }
//         .dark .text-gray-100, .dark .text-gray-200 { color: #f9fafb !important; }
        
//         body::-webkit-scrollbar {
//           width: 8px;
//         }
//         body::-webkit-scrollbar-thumb {
//           background-color: #4f46e5;
//           border-radius: 4px;
//         }
//       `}</style>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
//           <div className="relative max-w-4xl max-h-full">
//             <button
//               onClick={closeImageModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <div className="bg-white p-2 rounded-lg">
//               <img 
//                 src={selectedImage.url} 
//                 alt={selectedImage.name}
//                 className="max-w-full max-h-[70vh] object-contain rounded"
//               />
//             </div>
//             <p className="text-white text-center mt-3 text-sm font-medium">{selectedImage.name}</p>
//             <p className="text-gray-400 text-center mt-1 text-xs">फोटो हेर्नको लागि क्लिक गर्नुभएकोमा धन्यवाद</p>
//           </div>
//         </div>
//       )}

//       {/* Donor Details Modal */}
//       {selectedDonor && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
//             <button
//               onClick={closeDonorDetails}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 z-10 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl"
//             >
//               <X className="w-6 h-6" />
//             </button>
            
//             <div className="p-6 sm:p-8">
//               {/* Header with PDF Actions */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-start gap-4">
//                   {selectedDonor.photo && (
//                     <img 
//                       src={selectedDonor.photo} 
//                       alt={selectedDonor.donorName}
//                       className="w-24 h-24 object-cover rounded-lg border-4 border-white dark:border-gray-700 shadow-lg"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                       {selectedDonor.donorName}
//                     </h2>
//                     <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
//                       {selectedDonor.fundOfficialName}
//                     </p>
//                     {selectedDonor.personInCareOf && (
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
//                         <UserCheck className="w-4 h-4 mr-1" />
//                         व्यक्तिगत हेरचाह: {selectedDonor.personInCareOf}
//                       </p>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* PDF Action Buttons */}
//                 {selectedDonor.endowmentDetailsPdf && (
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       onClick={() => openEndowmentPdf(selectedDonor.endowmentDetailsPdf!)}
//                       className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                     >
//                       <FileIcon className="w-5 h-5" />
//                       <span className="font-semibold">पीडीएफ हेर्नुहोस्</span>
//                     </button>
//                     <button
//                       onClick={() => downloadEndowmentPdf(selectedDonor.endowmentDetailsPdf!, selectedDonor.donorName)}
//                       className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                     >
//                       <Download className="w-5 h-5" />
//                       <span className="font-semibold">डाउनलोड गर्नुहोस्</span>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Left Column */}
//                 <div className="space-y-6">
//                   {/* Basic Information */}
//                   <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                       <Info className="w-5 h-5 mr-2 text-blue-500" />
//                       मूल विवरण
//                     </h3>
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400">दानको प्रकृति</label>
//                         <p className="text-sm text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.natureOfEndowment}
//                         </p>
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400">सम्बन्धित विभाग</label>
//                         <p className="text-sm text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                           {selectedDonor.relatedDepart}
//                         </p>
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400">सम्झौता मिति</label>
//                         <p className="text-sm text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           {formatDate(selectedDonor.agreementDate)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                       <Phone className="w-5 h-5 mr-2 text-purple-500" />
//                       सम्पर्क विवरण
//                     </h3>
                    
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                         <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
//                           <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <div className="flex-1">
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400">मुख्य सम्पर्क नम्बर</label>
//                           <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.donorContactNumber}</p>
//                         </div>
//                       </div>
                      
//                       {selectedDonor.reportingContactNumber && (
//                         <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                           <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
//                             <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                           </div>
//                           <div className="flex-1">
//                             <label className="text-sm font-medium text-gray-500 dark:text-gray-400">प्रतिवेदन सम्पर्क नम्बर</label>
//                             <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.reportingContactNumber}</p>
//                           </div>
//                         </div>
//                       )}
                      
//                       <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                         <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
//                           <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <div className="flex-1">
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400">इमेल ठेगाना</label>
//                           <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.donorEmail}</p>
//                         </div>
//                       </div>
                      
//                       {selectedDonor.reportingAddress && (
//                         <div className="flex items-start gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                           <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mt-1">
//                             <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//                           </div>
//                           <div className="flex-1">
//                             <label className="text-sm font-medium text-gray-500 dark:text-gray-400">प्रतिवेदन ठेगाना</label>
//                             <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.reportingAddress}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-6">
//                   {/* Financial Information */}
//                   <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                       {/* <DollarSign className="w-5 h-5 mr-2 text-green-500" /> */}
//                       आर्थिक विवरण
//                     </h3>
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">मूलधन रकम</label>
//                         <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                           {formatCurrency(selectedDonor.principalAmountOfEndowment)}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">कोषको आधारभूत रकम</p>
//                       </div>
//                       <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
//                         <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">दानधन रकम</label>
//                         <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                           {formatCurrency(selectedDonor.amountOfEndowment)}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">सम्पूर्ण दान रकम</p>
//                       </div>
//                     </div>
                    
//                     {/* PDF Document Card */}
//                     {selectedDonor.endowmentDetailsPdf && (
//                       <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
//                               {/* <DocumentText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> */}
//                             </div>
//                             <div>
//                               <h4 className="font-bold text-gray-900 dark:text-white">दान योजना विवरण पीडीएफ</h4>
//                               <p className="text-sm text-gray-600 dark:text-gray-400">सम्पूर्ण विवरण र शर्तहरूको लागि</p>
//                             </div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => openEndowmentPdf(selectedDonor.endowmentDetailsPdf!)}
//                               className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                               title="हेर्नुहोस्"
//                             >
//                               <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                             </button>
//                             <button
//                               onClick={() => downloadEndowmentPdf(selectedDonor.endowmentDetailsPdf!, selectedDonor.donorName)}
//                               className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                               title="डाउनलोड गर्नुहोस्"
//                             >
//                               <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Additional Details */}
//                   <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                       <ClipboardList className="w-5 h-5 mr-2 text-orange-500" />
//                       अतिरिक्त विवरण
//                     </h3>
                    
//                     <div className="space-y-4">
//                       {selectedDonor.fundingPlan && (
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
//                             <ClipboardList className="w-4 h-4" />
//                             कोष योजना
//                           </label>
//                           <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                             {selectedDonor.fundingPlan}
//                           </p>
//                         </div>
//                       )}
                      
//                       {selectedDonor.typesOfEndowmentPlan && (
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
//                             <Package className="w-4 h-4" />
//                             दान योजनाको प्रकार
//                           </label>
//                           <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                             {selectedDonor.typesOfEndowmentPlan}
//                           </p>
//                         </div>
//                       )}
                      
//                       {selectedDonor.installmentsOfEndowment && (
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             किस्ता योजना
//                           </label>
//                           <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                             {selectedDonor.installmentsOfEndowment}
//                           </p>
//                         </div>
//                       )}
                      
//                       {selectedDonor.termsOfEndowmentFund && (
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
//                             <FileText className="w-4 h-4" />
//                             कोषको शर्तहरू
//                           </label>
//                           <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                             {selectedDonor.termsOfEndowmentFund}
//                           </p>
//                         </div>
//                       )}
                      
//                       {selectedDonor.purposeOfUsingEndowmentReturns && (
//                         <div>
//                           <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
//                             <Goal className="w-4 h-4" />
//                             दान फाइदाको उद्देश्य
//                           </label>
//                           <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                             {selectedDonor.purposeOfUsingEndowmentReturns}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 border-l-8 border-indigo-600">
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
//                 त्रिभुवन विश्वविद्यालय दानदातव्य कोष
//               </h1>
//               <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
//                 विनियम, २०७९ को मुख्य प्रावधानहरू
//               </p>
//             </div>
//             <HardHat className="w-12 h-12 text-indigo-500 mt-1 hidden sm:block opacity-70 flex-shrink-0 ml-4" />
//           </div>
          
//           <p className="mt-5 text-gray-700 dark:text-gray-300 pl-2 text-base font-medium">
//             यो प्रस्तुतिले विश्वविद्यालयको दीर्घकालीन वित्तीय दिगोपन र शैक्षिक उत्कृष्टताका लागि आवश्यक कोष स्थापना र व्यवस्थापन गर्ने ढाँचालाई सरल भाषामा बुझाउँछ।
//           </p>
          
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleOpenPdf}
//               className="flex items-center justify-center px-6 py-3 text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]"
//             >
//               <FileText className="w-5 h-5 mr-2" />
//               पूर्ण विनियम PDF 
//             </button>
//             <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
//               <ExternalLink className="w-4 h-4 mr-1" />
//               त्रिभुवन विश्वविद्यालयको आधिकारिक विनियम
//             </div>
//           </div>
//         </div>

//         {/* Core Content Accordion */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
//           <AccordionItem
//             index={0}
//             title="१. प्रस्तावना र कोषका उद्देश्यहरू"
//             summary={PDF_CONTENT[0].summary}
//             details={PDF_CONTENT[0].details}
//             icon={Target}
//           />
//           <AccordionItem
//             index={1}
//             title="२. कोषको संरचना र वर्गीकरण"
//             summary={PDF_CONTENT[1].summary}
//             details={PDF_CONTENT[1].details}
//             icon={BarChart} 
//           />
//           <AccordionItem
//             index={2}
//             title="३. सञ्चालक समिति र व्यवस्थापन"
//             summary={PDF_CONTENT[2].summary}
//             details={PDF_CONTENT[2].details}
//             icon={Users}
//           />
//           <AccordionItem
//             index={3}
//             title="४. लगानी नीति र आम्दानीको बाँडफाँड"
//             summary={PDF_CONTENT[3].summary}
//             details={PDF_CONTENT[3].details}
//             icon={TrendingUp}
//           />
//         </div>

//         {/* Donors Table Section */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//               <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
//                 <Users className="w-7 h-7 mr-3 text-indigo-600" />
//                 दानदातव्य कर्ताको विवरण
//               </h2>
              
//               {/* Total Amounts Display */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                   मूलधन: {formatCurrency(totalPrincipalAmount)}
//                 </div>
//                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
//                   दानधन: {formatCurrency(totalEndowmentAmount)}
//                 </div>
//               </div>
//             </div>
            
//             {/* Search and Filter */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="नाम, कोष, वा विभाग अनुसार खोज्नुहोस्..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="दानको प्रकृति फिल्टर गर्नुहोस्..."
//                 value={filterNature}
//                 onChange={(e) => setFilterNature(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="विभाग फिल्टर गर्नुहोस्..."
//                   value={filterDepartment}
//                   onChange={(e) => setFilterDepartment(e.target.value)}
//                   className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//                 <button
//                   onClick={fetchDonors}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center gap-2 shadow-md"
//                 >
//                   <Filter className="w-4 h-4" />
//                   खोज्नुहोस्
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="p-12 text-center">
//                 <div className="inline-block animate-spin h-12 w-12 border-b-2 border-indigo-600"></div>
//                 <p className="mt-4 text-gray-600 dark:text-gray-400">दानदाताहरूको विवरण लोड हुँदैछ...</p>
//               </div>
//             ) : donors.length === 0 ? (
//               <div className="p-12 text-center">
//                 <div className="text-gray-400 dark:text-gray-500 mb-4">
//                   <Users className="w-16 h-16 mx-auto opacity-50" />
//                 </div>
//                 <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">कुनै दानदाता फेला परेन</p>
//                 <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">कृपया आफ्नो खोज परिवर्तन गर्नुहोस् वा फिल्टर हटाउनुहोस्</p>
//               </div>
//             ) : (
//               <>
//                 <table className="w-full">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">क्र.सं</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानदाताको नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कोषको आधिकारिक नाम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानको प्रकृति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्बन्धित विभाग</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्झौता मिति</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">मूलधन रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानधन रकम</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">फोटो</th>
//                       <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कार्यहरू</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                     {donors.map((donor, index) => (
//                       <tr key={donor._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           {(currentPage - 1) * itemsPerPage + index + 1}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                           <div className="flex flex-col">
//                             <span>{donor.donorName || 'N/A'}</span>
//                             {donor.personInCareOf && (
//                               <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
//                                 <UserCheck className="w-3 h-3 mr-1" />
//                                 {donor.personInCareOf}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donor.fundOfficialName || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//                             {donor.natureOfEndowment || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           {donor.relatedDepart || 'N/A'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3 text-gray-400" />
//                             {donor.agreementDate ? formatDate(donor.agreementDate) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
//                           <div className="flex items-center gap-1">
//                             {/* <DollarSign className="w-3 h-3" /> */}
//                             {donor.principalAmountOfEndowment ? formatCurrency(donor.principalAmountOfEndowment) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
//                           <div className="flex items-center gap-1">
//                             {/* <DollarSign className="w-3 h-3" /> */}
//                             {donor.amountOfEndowment ? formatCurrency(donor.amountOfEndowment) : 'N/A'}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           {donor.photo ? (
//                             <div className="relative">
//                               <button
//                                 onClick={() => openImageModal(donor.photo, donor.donorName)}
//                                 className="relative transition-all duration-200 hover:scale-110 hover:shadow-lg"
//                               >
//                                 <img 
//                                   src={donor.photo} 
//                                   alt={donor.donorName}
//                                   className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
//                                   onError={(e) => {
//                                     e.currentTarget.style.display = 'none';
//                                   }}
//                                 />
//                                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
//                                   <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                                 </div>
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-lg group relative">
//                               <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex flex-col gap-2">
//                             <button
//                               onClick={() => openDonorDetails(donor)}
//                               className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 text-sm font-medium shadow-md"
//                               style={{width:'max-content'}}
//                             >
//                               <Eye className="w-4 h-4" />
//                               विवरण 
//                             </button>
//                             {/* {donor.endowmentDetailsPdf && (
//                               <button
//                                 onClick={() => openEndowmentPdf(donor.endowmentDetailsPdf!)}
//                                 className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 text-sm font-medium shadow-md"
//                               >
//                                 <FileIcon className="w-4 h-4" />
//                                 पीडीएफ हेर्नुहोस्
//                               </button>
//                             )} */}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Row */}
//                     <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-300 dark:border-gray-600 font-bold">
//                       <td colSpan="6" className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 text-right">
//                         कुल जम्मा:
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-green-600 dark:text-green-400">
//                         {formatCurrency(totalPrincipalAmount)}
//                       </td>
//                       <td className="px-4 py-4 text-lg font-bold text-blue-600 dark:text-blue-400">
//                         {formatCurrency(totalEndowmentAmount)}
//                       </td>
//                       <td colSpan="2" className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
//                         जम्मा {donors.length} दानदातव्य कर्ता
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </>
//             )}
//           </div>

//           {/* Pagination */}
//           {!loading && donors.length > 0 && (
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 पृष्ठ {currentPage} को {totalPages} (कुल {totalCount} दानदाताहरू)
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   अघिल्लो
//                 </button>
//                 <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg border">
//                   {currentPage} / {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
//                 >
//                   अर्को
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Additional Information Section */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Target className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">कोषको उद्देश्य</h3>
//             </div>
//             <p className="text-blue-100 leading-relaxed">
//               विश्वविद्यालयको शैक्षिक गुणस्तर कायम राख्न, छात्रवृत्ति, अनुसन्धान र जनशक्ति विकासका लागि दीर्घकालीन वित्तीय सहयोग प्रदान गर्ने।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <BarChart className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">लगानी नीति</h3>
//             </div>
//             <p className="text-green-100 leading-relaxed">
//               आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च र ५०% मूलकोषमा पुन: लगानी गर्ने दिगो विकासको रणनीति।
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <div className="flex items-center mb-4">
//               <Users className="w-8 h-8 mr-3" />
//               <h3 className="text-xl font-bold">सञ्चालन समिति</h3>
//             </div>
//             <p className="text-purple-100 leading-relaxed">
//               रजिष्ट्रारको अध्यक्षतामा गठित समितिले कोषको प्रभावकारी व्यवस्थापन र लगानी निर्णय गर्दछ।
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
//           <p className="font-medium">त्रिभुवन विश्वविद्यालय - दानदातव्य कोष विनियम, २०७९</p>
//           <p className="mt-2">© {new Date().getFullYear()} त्रिभुवन विश्वविद्यालय। सबै अधिकार सुरक्षित।</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EndowmentFundComponent;

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BookOpen, Users, Target, ChevronDown, ChevronUp, ExternalLink, TrendingUp, BarChart, HardHat, Search, Filter, ChevronLeft, ChevronRight, X, Phone, Mail, ZoomIn, FileText, MapPin, UserCheck, Calendar, DollarSign, ClipboardList, Package, Clock, Goal, Eye, Info, Download, FileIcon } from 'lucide-react';

// Content extracted and summarized from the oky.pdf document
const PDF_CONTENT = [
  {
    chapter: "परिच्छेद १: प्रस्तावना",
    summary: "यो विनियमले विश्वविद्यालयको शैक्षिक गुणस्तर कायम गर्न, दिगो शिक्षा सबल बनाउन, छात्रवृत्ति र अनुसन्धान वृत्ति प्रदान गर्न, अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता अभिवृद्धि गर्न र विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोत जुटाउन दानदातव्य कोष (Endowment Fund) स्थापना गरेको छ।",
    details: `त्रिभुवन विश्वविद्यालयलाई वैकल्पिक श्रोतको व्यवस्थापनमार्फत अझ बढी शैक्षिक गुणस्तर कायम गर्न, दिगो एवम् उच्च शिक्षा सबल बनाउन, विद्यार्थीलाई छात्रवृत्ति, तथा अनुसंन्धान वृत्ति, विश्वविद्यालयमा अनुसन्धान तथा विकास प्रवर्द्धन गर्न, जनशक्तिको क्षमता तथा दक्षता अभिवृद्धि गर्न र यी कार्यहरूमार्फत् विश्वविद्यालयको लक्ष्य प्राप्तिका लागि थप स्रोतहरूको खोजी गर्न र प्राप्त भएका आर्थिक एवं वित्तीय स्रोतको प्रभावकारी परिचालन गर्न, सुव्यवस्थित सञ्चालन गर्न वाञ्छनीय भएकोले त्रि.वि. आर्थिक व्यवस्थापन तथा खरिदसम्बन्धी नियम, २०५० को नियम ५ बमोजिमको विशेष कोषको रुपमा दानदातव्य कोष (Endowment Fund) स्थापना गरी सोको व्यवस्थित सञ्चालनका लागि त्रिभुवन विश्वविद्यालय कार्यकारी परिषद्ले यी विनियमहरू बनाई लागु गरेको छ ।`
  },
  {
    chapter: "परिच्छेद २: कोषको किसिम",
    summary: "स्थायी र आवधिक (समयका आधारमा) तथा प्रतिबन्धित र अर्ध प्रतिबन्धित (दाताको शर्तका आधारमा) गरी कोषहरूलाई वर्गीकरण गरिएको छ। प्रतिबन्धित कोषका लागि न्यूनतम रु. १ करोडको योगदान आवश्यक पर्दछ।",
    details: `(१) समयका आधारमा कोष स्थायी र आवधिक हुन सक्नेछ । (२) कोषमा दाताको दानदातव्य रकमका आधारमा कोष प्रतिबन्धित वा अर्ध प्रतिबन्धित हुन सक्नेछ। ५. प्रतिबन्धित कोष: (१) प्रतिबन्धित कोषको दानदातव्य रकम कम्तिमा रु. १ करोड हुनुपर्नेछ । यस प्रकारका कोषको सञ्चालन कोषको दातासँगको सम्झौता अनुसार छुट्टै कोषको व्यवस्था गरी गर्न सकिनेछ । ६. अर्ध प्रतिबन्धित कोष (१) रु. १ करोडभन्दा कम शुरुवाती कोषको रकमलाई अर्ध प्रतिबन्धित कोषको रुपमा स्वीकार गरिनेछ ।`
  },
  {
    chapter: "परिच्छेद ३: सञ्चालक समिति",
    summary: "कोषको प्रभावकारी व्यवस्थापनका लागि रजिष्ट्रारको अध्यक्षता र सदस्य सचिव योजना निर्देशनालय  निर्देशक हुनेगरि केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गरिएको छ। यसले कोष सञ्चालन, लगानी अनुमोदन र समग्र योजनाको व्यवस्थापन गर्दछ।",
    details: `८. दानदातव्य कोष सञ्चालक समितिको गठन (१) कोषको प्रभावकारी व्यवस्थापनका लागि विश्वविद्यालयले एक केन्द्रीय दानदातव्य कोष सञ्चालक समिति गठन गर्नेछ । समितिमा रजिष्ट्रार - अध्यक्ष,योजना निर्देशनालय निर्देशक-सदस्य सचिव,डीनहरू मध्येबाट एकजना - सदस्य, प्रमुख, आर्थिक प्रशासन महाशाखा - सदस्य लगायतका पदाधिकारी रहनेछन् ।`
  },
  {
    chapter: "परिच्छेद ४: कोषको लगानी",
    summary: "कोष मुद्दति निक्षेप वा समितिले स्वीकृत गरेका अन्य क्षेत्रमा लगानी गर्न सकिन्छ। आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च गर्न र बाँकी ५०% मूलकोषमा पुन: लगानी गर्नुपर्ने मुख्य नियम छ। यो कोष विश्वविद्यालयको ऋणको लागि धितोको रूपमा प्रयोग गर्न पाइने छैन।",
    details: `१२. कोषको लगानी : (१) कोषको लगानी मुद्दति निक्षेप वा समितिले तोकिएको क्षेत्रमा लगानी गर्न सक्नेछ । (२) कोषबाट आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च गर्न सकिनेछ भने बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ । (५) दानदातव्यकोषको रकम प्रयोग गरेर विश्वविद्यालयले लिन सक्ने ऋणका निम्ति धितोको रुपमा प्रयोग गर्ने छैन ।`
  }
];

// const API_URL = 'https://digitaldashboard.tu.edu.np/api/donor';

const API_URL = 'https://digitaldashboard.tu.edu.np/api/donater';
const PDF_URL = 'https://res.cloudinary.com/dpipulbgm/image/upload/v1765094952/okayu_removed_kdhw0o.pdf';
interface Donor {
  _id?: string;
  donorName: string;
  fundOfficialName: string;
  natureOfEndowment: string;
  relatedDepart: string;
  agreementDate: string;
  photo: string;
  donorContactNumber: string;
  donorEmail: string;
  principalAmountOfEndowment: number;
  personInCareOf: string;
  reportingContactNumber: string;
  reportingAddress: string;
  fundingPlan: string;
  amountOfEndowment: number;
  termsOfEndowmentFund: string;
  typesOfEndowmentPlan: string;
  installmentsOfEndowment: string;
  purposeOfUsingEndowmentReturns: string;
  endowmentDetailsPdf?: string; // Added field for PDF URL
  createdAt?: string;
  updatedAt?: string;
}

const EndowmentFundComponent = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNature, setFilterNature] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [sortBy, setSortBy] = useState('agreementDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [totalCount, setTotalCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [totalPrincipalAmount, setTotalPrincipalAmount] = useState(0);
  const [totalEndowmentAmount, setTotalEndowmentAmount] = useState(0);

  const fetchDonors = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy,
        sortOrder
      };
      
      if (searchTerm) params.search = searchTerm;
      if (filterNature) params.natureOfEndowment = filterNature;
      if (filterDepartment) params.relatedDepart = filterDepartment;

      const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
      const data = await response.json();
      
      setDonors(data.data || []);
      setTotalCount(data.pagination?.totalItems || data.total || 0);
      
      // Calculate total amounts
      const calculatedPrincipalTotal = (data.data || []).reduce((sum: number, donor: Donor) => {

        console.log(donor.principalAmountOfEndowment,"donor value")
        return sum + (donor.principalAmountOfEndowment || 0);
      }, 0);
      
      const calculatedEndowmentTotal = (data.data || []).reduce((sum: number, donor: Donor) => {
        return sum + (donor.amountOfEndowment || 0);
      }, 0);
      
      setTotalPrincipalAmount(calculatedPrincipalTotal);
      setTotalEndowmentAmount(calculatedEndowmentTotal);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setDonors([]);
      setTotalPrincipalAmount(0);
      setTotalEndowmentAmount(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, filterNature, filterDepartment, sortBy, sortOrder]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const handleOpenPdf = () => {
    window.open(PDF_URL, '_blank');
  };

  const openImageModal = (imageUrl: string, donorName: string) => {
    setSelectedImage({ url: imageUrl, name: donorName });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const openDonorDetails = (donor: Donor) => {
    setSelectedDonor(donor);
  };

  const closeDonorDetails = () => {
    setSelectedDonor(null);
  };

  const openEndowmentPdf = (pdfUrl: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  const downloadEndowmentPdf = (pdfUrl: string, donorName: string) => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${donorName}_Endowment_Details.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const InvestmentIllustration = useMemo(() => (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 mt-6">
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
        कोषको लगानी तथा आम्दानी वितरण रणनीति
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        विनियम १२(२) अन्तर्गत आम्दानीलाई दिगो विकासका लागि कसरी व्यवस्थापन गर्ने भन्ने नियम उल्लेख गरिएको छ:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md border-b-4 border-green-600 transition-shadow duration-300 hover:shadow-lg">
          <p className="text-4xl font-black text-green-700 dark:text-green-400">५०%</p>
          <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">वितरण / खर्च</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको मूल उद्देश्य (छात्रवृत्ति, अनुसन्धान, जनशक्ति विकास) मा खर्च गरिने रकम।</p>
        </div>
        <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl shadow-md border-b-4 border-indigo-600 transition-shadow duration-300 hover:shadow-lg">
          <p className="text-4xl font-black text-indigo-700 dark:text-indigo-400">५०%</p>
          <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">पुन: लगानी / मूलधन वृद्धि</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">कोषको दीर्घकालीन दिगोपन सुनिश्चित गर्न मूलकोषमै थप गरिने रकम।</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center border-t border-gray-200 dark:border-gray-700 pt-3">
        विनियम १२(२): आर्जित ५० प्रतिशत रकम मूलकोषको प्रयोजनार्थ खर्च र बाँकी ५० प्रतिशत रकम सम्बन्धित कोषमा पुन लगानी गर्नु पर्नेछ।
      </p>
    </div>
  ), []);

  const AccordionItem = ({ index, title, summary, details, icon: Icon }: {
    index: number;
    title: string;
    summary: string;
    details: string;
    icon: React.ComponentType<any>;
  }) => {
    const isActive = index === activeChapter;
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        <button
          className="flex justify-between items-center w-full p-5 text-left font-extrabold text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          onClick={() => setActiveChapter(isActive ? -1 : index)}
          aria-expanded={isActive}
          aria-controls={`content-${index}`}
        >
          <span className="flex items-center">
            <Icon className={`w-6 h-6 mr-4 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`} />
            {title}
          </span>
          {isActive ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
        </button>
        {isActive && (
          <div id={`content-${index}`} className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 ease-in-out">
            <div className="p-4 border-l-4 border-indigo-400 dark:border-indigo-600 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm">
              <p className="text-base font-medium text-gray-800 dark:text-gray-300 leading-relaxed">
                मुख्य बुँदा: {summary}
              </p>
            </div>
            
            <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">विनियमको मूल पाठ</h4>
              <p className="text-sm font-normal text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {details}
              </p>
            </div>
            {index === 3 && InvestmentIllustration}
          </div>
        )}
      </div>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR'
    }).format(amount);
  };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('ne-NP');
  // };

  const formatDate = (dateString: string) => {
  const parts = new Intl.DateTimeFormat('ne-NP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date(dateString));

  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;

  return `${year}-${month}-${day}`;
};

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-['Mukta', 'Noto_Sans_Devanagari', sans-serif]">
      <style jsx global>{`
        .font-['Mukta', 'Noto_Sans_Devanagari', sans-serif] { 
          font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif; 
        }
        .text-gray-800, .text-gray-900 { color: #1f2937 !important; }
        .dark .text-gray-100, .dark .text-gray-200 { color: #f9fafb !important; }
        
        body::-webkit-scrollbar {
          width: 8px;
        }
        body::-webkit-scrollbar-thumb {
          background-color: #4f46e5;
          border-radius: 4px;
        }
      `}</style>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white p-2 rounded-lg">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
            <p className="text-white text-center mt-3 text-sm font-medium">{selectedImage.name}</p>
            <p className="text-gray-400 text-center mt-1 text-xs">फोटो हेर्नको लागि क्लिक गर्नुभएकोमा धन्यवाद</p>
          </div>
        </div>
      )}

      {/* Donor Details Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
            <button
              onClick={closeDonorDetails}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 z-10 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6 sm:p-8">
              {/* Header with PDF Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  {selectedDonor.photo && (
                    <img 
                      src={selectedDonor.photo} 
                      alt={selectedDonor.donorName}
                      className="w-24 h-24 object-cover rounded-lg border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedDonor.donorName}
                    </h2>
                    <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                      {selectedDonor.fundOfficialName}
                    </p>
                    {selectedDonor.personInCareOf && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                        <UserCheck className="w-4 h-4 mr-1" />
                        व्यक्तिगत हेरचाह: {selectedDonor.personInCareOf}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* PDF Action Buttons */}
                {selectedDonor.endowmentDetailsPdf && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openEndowmentPdf(selectedDonor.endowmentDetailsPdf!)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <FileIcon className="w-5 h-5" />
                      <span className="font-semibold">पीडीएफ हेर्नुहोस्</span>
                    </button>
                    <button
                      onClick={() => downloadEndowmentPdf(selectedDonor.endowmentDetailsPdf!, selectedDonor.donorName)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-semibold">डाउनलोड गर्नुहोस्</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-blue-500" />
                      मूल विवरण
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">दानको प्रकृति</label>
                        <p className="text-sm text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          {selectedDonor.natureOfEndowment}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">सम्बन्धित विभाग</label>
                        <p className="text-sm text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          {selectedDonor.relatedDepart}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">सम्झौता मिति</label>
                        <p className="text-sm text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(selectedDonor.agreementDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-purple-500" />
                      सम्पर्क विवरण
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                          <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">मुख्य सम्पर्क नम्बर</label>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.donorContactNumber}</p>
                        </div>
                      </div>
                      
                      {selectedDonor.reportingContactNumber && (
                        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                            <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">प्रतिवेदन सम्पर्क नम्बर</label>
                            <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.reportingContactNumber}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                          <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">इमेल ठेगाना</label>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.donorEmail}</p>
                        </div>
                      </div>
                      
                      {selectedDonor.reportingAddress && (
                        <div className="flex items-start gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mt-1">
                            <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">प्रतिवेदन ठेगाना</label>
                            <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedDonor.reportingAddress}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Financial Information */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      {/* <DollarSign className="w-5 h-5 mr-2 text-green-500" /> */}
                      आर्थिक विवरण
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">मूलधन रकम</label>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(selectedDonor.principalAmountOfEndowment)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">कोषको आधारभूत रकम</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">दानधन रकम</label>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {formatCurrency(selectedDonor.amountOfEndowment)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">सम्पूर्ण दान रकम</p>
                      </div>
                    </div>
                    
                    {/* PDF Document Card */}
                    {selectedDonor.endowmentDetailsPdf && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                              <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">दान योजना विवरण पीडीएफ</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">सम्पूर्ण विवरण र शर्तहरूको लागि</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEndowmentPdf(selectedDonor.endowmentDetailsPdf!)}
                              className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                              title="हेर्नुहोस्"
                            >
                              <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </button>
                            <button
                              onClick={() => downloadEndowmentPdf(selectedDonor.endowmentDetailsPdf!, selectedDonor.donorName)}
                              className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                              title="डाउनलोड गर्नुहोस्"
                            >
                              <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <ClipboardList className="w-5 h-5 mr-2 text-orange-500" />
                      अतिरिक्त विवरण
                    </h3>
                    
                    <div className="space-y-4">
                      {selectedDonor.fundingPlan && (
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                            <ClipboardList className="w-4 h-4" />
                            कोष योजना
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            {selectedDonor.fundingPlan}
                          </p>
                        </div>
                      )}
                      
                      {selectedDonor.typesOfEndowmentPlan && (
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            दान योजनाको प्रकार
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            {selectedDonor.typesOfEndowmentPlan}
                          </p>
                        </div>
                      )}
                      
                      {selectedDonor.installmentsOfEndowment && (
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            किस्ता योजना
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            {selectedDonor.installmentsOfEndowment}
                          </p>
                        </div>
                      )}
                      
                      {selectedDonor.termsOfEndowmentFund && (
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            कोषको शर्तहरू
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            {selectedDonor.termsOfEndowmentFund}
                          </p>
                        </div>
                      )}
                      
                      {selectedDonor.purposeOfUsingEndowmentReturns && (
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                            <Goal className="w-4 h-4" />
                            दान फाइदाको उद्देश्य
                          </label>
                          <p className="text-sm text-gray-900 dark:text-white mt-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            {selectedDonor.purposeOfUsingEndowmentReturns}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 border-l-8 border-indigo-600">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
                त्रिभुवन विश्वविद्यालय दानदातव्य कोष
              </h1>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                विनियम, २०७९ को मुख्य प्रावधानहरू
              </p>
            </div>
            <HardHat className="w-12 h-12 text-indigo-500 mt-1 hidden sm:block opacity-70 flex-shrink-0 ml-4" />
          </div>
          
          <p className="mt-5 text-gray-700 dark:text-gray-300 pl-2 text-base font-medium">
            यो प्रस्तुतिले विश्वविद्यालयको दीर्घकालीन वित्तीय दिगोपन र शैक्षिक उत्कृष्टताका लागि आवश्यक कोष स्थापना र व्यवस्थापन गर्ने ढाँचालाई सरल भाषामा बुझाउँछ।
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleOpenPdf}
              className="flex items-center justify-center px-6 py-3 text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01]"
            >
              <FileText className="w-5 h-5 mr-2" />
              पूर्ण विनियम PDF 
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              त्रिभुवन विश्वविद्यालयको आधिकारिक विनियम
            </div>
          </div>
        </div>

        {/* Core Content Accordion */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
          <AccordionItem
            index={0}
            title="१. प्रस्तावना र कोषका उद्देश्यहरू"
            summary={PDF_CONTENT[0].summary}
            details={PDF_CONTENT[0].details}
            icon={Target}
          />
          <AccordionItem
            index={1}
            title="२. कोषको संरचना र वर्गीकरण"
            summary={PDF_CONTENT[1].summary}
            details={PDF_CONTENT[1].details}
            icon={BarChart} 
          />
          <AccordionItem
            index={2}
            title="३. सञ्चालक समिति र व्यवस्थापन"
            summary={PDF_CONTENT[2].summary}
            details={PDF_CONTENT[2].details}
            icon={Users}
          />
          <AccordionItem
            index={3}
            title="४. लगानी नीति र आम्दानीको बाँडफाँड"
            summary={PDF_CONTENT[3].summary}
            details={PDF_CONTENT[3].details}
            icon={TrendingUp}
          />
        </div>

        {/* Donors Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
                <Users className="w-7 h-7 mr-3 text-indigo-600" />
                दानदातव्य कर्ताको विवरण
              </h2>
              
              {/* Total Amounts Display */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
                  मूलधन: {formatCurrency(totalPrincipalAmount)}
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg">
                  दानधन: {formatCurrency(totalEndowmentAmount)}
                </div>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="नाम, कोष, वा विभाग अनुसार खोज्नुहोस्..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <input
                type="text"
                placeholder="दानको प्रकृति फिल्टर गर्नुहोस्..."
                value={filterNature}
                onChange={(e) => setFilterNature(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="विभाग फिल्टर गर्नुहोस्..."
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={fetchDonors}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center gap-2 shadow-md"
                >
                  <Filter className="w-4 h-4" />
                  खोज्नुहोस्
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">दानदाताहरूको विवरण लोड हुँदैछ...</p>
              </div>
            ) : donors.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Users className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">कुनै दानदाता फेला परेन</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">कृपया आफ्नो खोज परिवर्तन गर्नुहोस् वा फिल्टर हटाउनुहोस्</p>
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">क्र.सं</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानदाताको नाम</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कोषको आधिकारिक नाम</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानको प्रकृति</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">सम्बन्धित विभाग</th>
                      <th 
                        className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => {
                          if (sortBy === 'agreementDate') {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy('agreementDate');
                            setSortOrder('asc');
                          }
                        }}
                      >
                        <div className="flex items-center">
                          सम्झौता मिति
                          {sortBy === 'agreementDate' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="w-4 h-4 ml-1 text-indigo-600" /> : 
                              <ChevronDown className="w-4 h-4 ml-1 text-indigo-600" />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">मूलधन रकम</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">दानधन रकम</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">फोटो</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200">कार्यहरू</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {donors.map((donor, index) => (
                      <tr key={donor._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                          <div className="flex flex-col">
                            <span>{donor.donorName || 'N/A'}</span>
                            {donor.personInCareOf && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                <UserCheck className="w-3 h-3 mr-1" />
                                {donor.personInCareOf}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {donor.fundOfficialName || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {donor.natureOfEndowment || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {donor.relatedDepart || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {donor.agreementDate ? formatDate(donor.agreementDate) : 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
                          <div className="flex items-center gap-1">
                            {/* <DollarSign className="w-3 h-3" /> */}
                            {donor.principalAmountOfEndowment ? formatCurrency(donor.principalAmountOfEndowment) : 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
                          <div className="flex items-center gap-1">
                            {/* <DollarSign className="w-3 h-3" /> */}
                            {donor.amountOfEndowment ? formatCurrency(donor.amountOfEndowment) : 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {donor.photo ? (
                            <div className="relative">
                              <button
                                onClick={() => openImageModal(donor.photo, donor.donorName)}
                                className="relative transition-all duration-200 hover:scale-110 hover:shadow-lg"
                              >
                                <img 
                                  src={donor.photo} 
                                  alt={donor.donorName}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
                                  <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-lg group relative">
                              <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => openDonorDetails(donor)}
                              className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 text-sm font-medium shadow-md"
                              style={{width:'max-content'}}
                            >
                              <Eye className="w-4 h-4" />
                              विवरण 
                            </button>
                            {donor.endowmentDetailsPdf && (
                              <button
                                onClick={() => openEndowmentPdf(donor.endowmentDetailsPdf!)}
                                className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 text-sm font-medium shadow-md"
                                style={{width:'max-content'}}
                              >
                                <FileIcon className="w-4 h-4" />
                                पीडीएफ हेर्नुहोस्
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Row */}
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-300 dark:border-gray-600 font-bold">
                      <td colSpan="6" className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 text-right">
                        कुल जम्मा:
                      </td>
                      <td className="px-4 py-4 text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(totalPrincipalAmount)}
                      </td>
                      <td className="px-4 py-4 text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(totalEndowmentAmount)}
                      </td>
                      <td colSpan="2" className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        जम्मा {donors.length} दानदातव्य कर्ता
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>

          {/* Pagination */}
          {!loading && donors.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                पृष्ठ {currentPage} को {totalPages} (कुल {totalCount} दानदाताहरू)
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  अघिल्लो
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg border">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                >
                  अर्को
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-bold">कोषको उद्देश्य</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              विश्वविद्यालयको शैक्षिक गुणस्तर कायम राख्न, छात्रवृत्ति, अनुसन्धान र जनशक्ति विकासका लागि दीर्घकालीन वित्तीय सहयोग प्रदान गर्ने।
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <BarChart className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-bold">लगानी नीति</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              आर्जित आम्दानीको ५०% कोषको उद्देश्यमा खर्च र ५०% मूलकोषमा पुन: लगानी गर्ने दिगो विकासको रणनीति।
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-bold">सञ्चालन समिति</h3>
            </div>
            <p className="text-purple-100 leading-relaxed">
              रजिष्ट्रारको अध्यक्षतामा गठित समितिले कोषको प्रभावकारी व्यवस्थापन र लगानी निर्णय गर्दछ।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="font-medium">त्रिभुवन विश्वविद्यालय - दानदातव्य कोष विनियम, २०७९</p>
          <p className="mt-2">© {new Date().getFullYear()} त्रिभुवन विश्वविद्यालय। सबै अधिकार सुरक्षित।</p>
        </div>
      </div>
    </div>
  );
};

export default EndowmentFundComponent;