// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Stepper,
//   Step,
//   StepLabel,
//   Alert,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   Divider,
//   Card,
//   CardContent,
//   FormControlLabel,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Switch,
//   CardMedia,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   Stack,
//   useTheme
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   ExpandMore as ExpandMoreIcon,
//   CloudUpload as CloudUploadIcon,
//   Image as ImageIcon,
//   VideoLibrary as VideoIcon,
//   Edit as EditIcon,
//   Close as CloseIcon,
//   School as SchoolIcon,
//   LocationOn as LocationIcon,
//   Business as BuildingIcon,
//   MenuBook as AcademicIcon,
//   People as StaffIcon,
//   Computer as TechIcon,
//   Construction as ProjectIcon,
//   CheckCircle as ReviewIcon
// } from '@mui/icons-material';
// import { BriefcaseBusinessIcon, PanelsTopLeftIcon } from 'lucide-react';

// // Building Media Interface
// interface BuildingMedia {
//   images: Array<{
//     url: string;
//     caption: string;
//     uploadDate?: Date;
//     fileSize?: number;
//     mimeType?: string;
//   }>;
//   videos: Array<{
//     url: string;
//     caption: string;
//     uploadDate?: Date;
//     fileSize?: number;
//     duration?: number;
//     mimeType?: string;
//     thumbnail?: string;
//   }>;
// }

// // Building Interface with Media
// interface Building {
//   buildingName: string;
//   totalRooms: string;
//   classrooms: string;
//   labs: string;
//   library: string;
//   administrative: string;
//   other: string;
//   condition: string;
//   media?: BuildingMedia;
// }

// // Main Form Interface
// interface CollegeFormData {
//   collegeName: string;
//   campusType: string;
//   establishmentDate: string;
//   collegeId: string;
//   principalInfo: {
//     name: string;
//     contactNumber: string;
//     email: string;
//   };
//   contactInfo: {
//     officialPhone: string;
//     officialEmail: string;
//     website: string;
//   };
//   staffContacts: {
//     adminChief: {
//       name: string;
//       mobile: string;
//     };
//     accountChief: {
//       name: string;
//       mobile: string;
//     };
//   };
//   dataCollectionContact: {
//     name: string;
//     designation: string;
//     phone: string;
//     email: string;
//   };
//   location: {
//     province: string;
//     district: string;
//     localLevel: string;
//     wardNo: string;
//     streetTole: string;
//     landmark: string;
//     latitude: string;
//     longitude: string;
//     googleMapsLink: string;
//   };
//   infrastructure: {
//     landArea: {
//       traditionalUnits: {
//         bigaha: string;
//         katha: string;
//         dhur: string;
//         ropani: string;
//         ana: string;
//         daam: string;
//         paisa: string;
//       };
//       squareMeters: string;
//       acquisitionDate: string;
//       taxClearanceStatus: string;
//       haalsabikStatus: string;
//     };
//     landOwnership: {
//       lalpurja: {
//         area: string;
//         address: string;
//       };
//       bhogadhikar: {
//         area: string;
//         address: string;
//       };
//       localGovernment: {
//         area: string;
//         address: string;
//       };
//       other: {
//         area: string;
//         address: string;
//       };
//     };
//     landUse: {
//       buildingArea: string;
//       playgroundArea: string;
//       naturalForestArea: string;
//       plantationArea: string;
//       leasedArea: string;
//       leaseIncome: string;
//       encroachmentExists: boolean;
//       encroachmentDetails: string;
//       protectionSteps: string;
//       commercialUseSuggestions: string;
//       commercialPlans: string;
//       masterPlanExists: boolean;
//       masterPlanAttachment: string;
//       suggestions: string;
//     };
//     buildings: Building[];
//     healthSanitation: {
//       toilets: {
//         male: string;
//         female: string;
//         disabledFriendly: string;
//       };
//       drinkingWater: {
//         available: boolean;
//         qualityTested: boolean;
//         purificationSystem: string;
//       };
//       wasteManagement: {
//         segregation: boolean;
//         disposalMethod: string;
//         recycling: boolean;
//       };
//       medicalFacilities: {
//         firstAid: boolean;
//         healthPost: boolean;
//         staffAvailable: boolean;
//       };
//     };
//   };
//   academicPrograms: {
//     totalFaculties: string;
//     programs: Array<{
//       programName: string;
//       level: string;
//       duration: string;
//       affiliatedTo: string;
//     }>;
//     enrollment: {
//       total: string;
//       male: string;
//       female: string;
//       other: string;
//       programBreakdown: Array<{
//         programName: string;
//         total: string;
//         male: string;
//         female: string;
//         other: string;
//       }>;
//     };
//   };
//   projectPlanning: {
//     immediateConstruction: string;
//     futureConstruction: string;
//     priorityWork: {
//       p1: string;
//       p2: string;
//       p3: string;
//     };
//     ongoingProjects: Array<{
//       projectName: string;
//       startDate: string;
//       expectedCompletion: string;
//       budget: string;
//       status: string;
//     }>;
//   };
//   staff: {
//     academic: Array<{
//       name: string;
//       designation: string;
//       department: string;
//       qualification: string;
//       experience: string;
//       employmentType: string;
//     }>;
//     administrative: Array<{
//       name: string;
//       designation: string;
//       department: string;
//       employmentType: string;
//     }>;
//   };
//   educationalTechnology: {
//     digitalClassrooms: string;
//     computerLabs: string;
//     computersAvailable: string;
//     internetAvailability: {
//       available: boolean;
//       speed: string;
//       provider: string;
//     };
//     libraryResources: {
//       physicalBooks: string;
//       ebooks: string;
//       journals: string;
//       digitalDatabase: boolean;
//     };
//     learningManagementSystem: {
//       name: string;
//       active: boolean;
//     };
//   };
//   formStatus: string;
// }

// const initialFormData: CollegeFormData = {
//   collegeName: '',
//   campusType: '',
//   establishmentDate: '',
//   collegeId: '',
//   principalInfo: {
//     name: '',
//     contactNumber: '',
//     email: ''
//   },
//   contactInfo: {
//     officialPhone: '',
//     officialEmail: '',
//     website: ''
//   },
//   staffContacts: {
//     adminChief: {
//       name: '',
//       mobile: ''
//     },
//     accountChief: {
//       name: '',
//       mobile: ''
//     }
//   },
//   dataCollectionContact: {
//     name: '',
//     designation: '',
//     phone: '',
//     email: ''
//   },
//   location: {
//     province: '',
//     district: '',
//     localLevel: '',
//     wardNo: '',
//     streetTole: '',
//     landmark: '',
//     latitude: '',
//     longitude: '',
//     googleMapsLink: ''
//   },
//   infrastructure: {
//     landArea: {
//       traditionalUnits: {
//         bigaha: '',
//         katha: '',
//         dhur: '',
//         ropani: '',
//         ana: '',
//         daam: '',
//         paisa: ''
//       },
//       squareMeters: '',
//       acquisitionDate: '',
//       taxClearanceStatus: '',
//       haalsabikStatus: ''
//     },
//     landOwnership: {
//       lalpurja: {
//         area: '',
//         address: ''
//       },
//       bhogadhikar: {
//         area: '',
//         address: ''
//       },
//       localGovernment: {
//         area: '',
//         address: ''
//       },
//       other: {
//         area: '',
//         address: ''
//       }
//     },
//     landUse: {
//       buildingArea: '',
//       playgroundArea: '',
//       naturalForestArea: '',
//       plantationArea: '',
//       leasedArea: '',
//       leaseIncome: '',
//       encroachmentExists: false,
//       encroachmentDetails: '',
//       protectionSteps: '',
//       commercialUseSuggestions: '',
//       commercialPlans: '',
//       masterPlanExists: false,
//       masterPlanAttachment: '',
//       suggestions: ''
//     },
//     buildings: [],
//     healthSanitation: {
//       toilets: {
//         male: '',
//         female: '',
//         disabledFriendly: ''
//       },
//       drinkingWater: {
//         available: false,
//         qualityTested: false,
//         purificationSystem: ''
//       },
//       wasteManagement: {
//         segregation: false,
//         disposalMethod: '',
//         recycling: false
//       },
//       medicalFacilities: {
//         firstAid: false,
//         healthPost: false,
//         staffAvailable: false
//       }
//     }
//   },
//   academicPrograms: {
//     totalFaculties: '',
//     programs: [],
//     enrollment: {
//       total: '',
//       male: '',
//       female: '',
//       other: '',
//       programBreakdown: []
//     }
//   },
//   projectPlanning: {
//     immediateConstruction: '',
//     futureConstruction: '',
//     priorityWork: {
//       p1: '',
//       p2: '',
//       p3: ''
//     },
//     ongoingProjects: []
//   },
//   staff: {
//     academic: [],
//     administrative: []
//   },
//   educationalTechnology: {
//     digitalClassrooms: '',
//     computerLabs: '',
//     computersAvailable: '',
//     internetAvailability: {
//       available: false,
//       speed: '',
//       provider: ''
//     },
//     libraryResources: {
//       physicalBooks: '',
//       ebooks: '',
//       journals: '',
//       digitalDatabase: false
//     },
//     learningManagementSystem: {
//       name: '',
//       active: false
//     }
//   },
//   formStatus: 'Draft'
// };

// // Constants
// const campusTypes = [
//   'Constituent Campus',
//   'Affiliated College',
//   'Community Campus',
//   'Private College'
// ];

// const provinces = [
//   'Province 1',
//   'Province 2',
//   'Bagmati Province',
//   'Gandaki Province',
//   'Lumbini Province',
//   'Karnali Province',
//   'Sudurpashchim Province'
// ];

// const programLevels = ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'];
// const employmentTypes = ['Permanent', 'Contract', 'Part-time'];
// const projectStatuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];
// const buildingConditions = ['Excellent', 'Good', 'Fair', 'Poor'];

// const sectionIcons = {
//   0: <SchoolIcon />,
//   1: <LocationIcon />,
//   2: <BuildingIcon />,
//   3: <AcademicIcon />,
//   4: <StaffIcon />,
//   5: <TechIcon />,
//   6: <ProjectIcon />,
//   7: <ReviewIcon />
// };

// const CollegeDataForm: React.FC = () => {
//   const [formData, setFormData] = useState<CollegeFormData>(initialFormData);
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const theme = useTheme();
  
//   // Media dialog state
//   const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
//   const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
//   const [mediaUrl, setMediaUrl] = useState('');
//   const [mediaCaption, setMediaCaption] = useState('');
//   const [mediaDuration, setMediaDuration] = useState('');
//   const [mediaThumbnail, setMediaThumbnail] = useState('');
  
//   // Image preview dialog
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewMedia, setPreviewMedia] = useState<{ url: string; caption: string; type: 'image' | 'video' } | null>(null);

//   const steps = [
//     'Basic Information',
//     'Location Details',
//     'Infrastructure & Land',
//     'Academic Programs',
//     'Staff Information',
//     'Facilities & Technology',
//     'Project Planning',
//     'Review & Submit'
//   ];

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;
    
//     if (name.includes('.')) {
//       const path = name.split('.');
//       setFormData(prev => {
//         const newData = { ...prev };
//         let current: any = newData;
        
//         for (let i = 0; i < path.length - 1; i++) {
//           current = current[path[i]];
//         }
        
//         current[path[path.length - 1]] = type === 'checkbox' ? checked : value;
//         return newData;
//       });
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   // Building handlers
//   const addBuilding = () => {
//     setFormData(prev => ({
//       ...prev,
//       infrastructure: {
//         ...prev.infrastructure,
//         buildings: [
//           ...prev.infrastructure.buildings,
//           {
//             buildingName: '',
//             totalRooms: '',
//             classrooms: '',
//             labs: '',
//             library: '',
//             administrative: '',
//             other: '',
//             condition: 'Good',
//             media: {
//               images: [],
//               videos: []
//             }
//           }
//         ]
//       }
//     }));
//   };

//   const updateBuilding = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newBuildings = [...prev.infrastructure.buildings];
//       newBuildings[index] = { ...newBuildings[index], [field]: value };
//       return {
//         ...prev,
//         infrastructure: { ...prev.infrastructure, buildings: newBuildings }
//       };
//     });
//   };

//   const removeBuilding = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       infrastructure: {
//         ...prev.infrastructure,
//         buildings: prev.infrastructure.buildings.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Media handlers
//   const openMediaDialog = (buildingIndex: number, type: 'image' | 'video') => {
//     setSelectedBuildingIndex(buildingIndex);
//     setMediaType(type);
//     setMediaUrl('');
//     setMediaCaption('');
//     setMediaDuration('');
//     setMediaThumbnail('');
//     setMediaDialogOpen(true);
//   };

//   const handleAddMedia = () => {
//     if (selectedBuildingIndex === null || !mediaUrl) return;

//     setFormData(prev => {
//       const newBuildings = [...prev.infrastructure.buildings];
//       const building = newBuildings[selectedBuildingIndex];
      
//       if (!building.media) {
//         building.media = { images: [], videos: [] };
//       }

//       if (mediaType === 'image') {
//         building.media.images.push({
//           url: mediaUrl,
//           caption: mediaCaption,
//           uploadDate: new Date()
//         });
//       } else {
//         building.media.videos.push({
//           url: mediaUrl,
//           caption: mediaCaption,
//           duration: mediaDuration ? parseInt(mediaDuration) : undefined,
//           thumbnail: mediaThumbnail,
//           uploadDate: new Date()
//         });
//       }

//       return {
//         ...prev,
//         infrastructure: { ...prev.infrastructure, buildings: newBuildings }
//       };
//     });

//     setMediaDialogOpen(false);
//   };

//   const deleteMedia = (buildingIndex: number, mediaType: 'images' | 'videos', mediaIndex: number) => {
//     setFormData(prev => {
//       const newBuildings = [...prev.infrastructure.buildings];
//       const building = newBuildings[buildingIndex];
      
//       if (building.media) {
//         building.media[mediaType].splice(mediaIndex, 1);
//       }

//       return {
//         ...prev,
//         infrastructure: { ...prev.infrastructure, buildings: newBuildings }
//       };
//     });
//   };

//   const handlePreviewMedia = (url: string, caption: string, type: 'image' | 'video') => {
//     setPreviewMedia({ url, caption, type });
//     setPreviewOpen(true);
//   };

//   // Program handlers
//   const addProgram = () => {
//     setFormData(prev => ({
//       ...prev,
//       academicPrograms: {
//         ...prev.academicPrograms,
//         programs: [
//           ...prev.academicPrograms.programs,
//           {
//             programName: '',
//             level: 'Bachelor',
//             duration: '',
//             affiliatedTo: ''
//           }
//         ]
//       }
//     }));
//   };

//   const updateProgram = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newPrograms = [...prev.academicPrograms.programs];
//       newPrograms[index] = { ...newPrograms[index], [field]: value };
//       return {
//         ...prev,
//         academicPrograms: { ...prev.academicPrograms, programs: newPrograms }
//       };
//     });
//   };

//   const removeProgram = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       academicPrograms: {
//         ...prev.academicPrograms,
//         programs: prev.academicPrograms.programs.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Staff handlers
//   const addAcademicStaff = () => {
//     setFormData(prev => ({
//       ...prev,
//       staff: {
//         ...prev.staff,
//         academic: [
//           ...prev.staff.academic,
//           {
//             name: '',
//             designation: '',
//             department: '',
//             qualification: '',
//             experience: '',
//             employmentType: 'Permanent'
//           }
//         ]
//       }
//     }));
//   };

//   const updateAcademicStaff = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newStaff = [...prev.staff.academic];
//       newStaff[index] = { ...newStaff[index], [field]: value };
//       return {
//         ...prev,
//         staff: { ...prev.staff, academic: newStaff }
//       };
//     });
//   };

//   const removeAcademicStaff = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       staff: {
//         ...prev.staff,
//         academic: prev.staff.academic.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Project handlers
//   const addProject = () => {
//     setFormData(prev => ({
//       ...prev,
//       projectPlanning: {
//         ...prev.projectPlanning,
//         ongoingProjects: [
//           ...prev.projectPlanning.ongoingProjects,
//           {
//             projectName: '',
//             startDate: '',
//             expectedCompletion: '',
//             budget: '',
//             status: 'Planning'
//           }
//         ]
//       }
//     }));
//   };

//   const updateProject = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newProjects = [...prev.projectPlanning.ongoingProjects];
//       newProjects[index] = { ...newProjects[index], [field]: value };
//       return {
//         ...prev,
//         projectPlanning: { ...prev.projectPlanning, ongoingProjects: newProjects }
//       };
//     });
//   };

//   const removeProject = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       projectPlanning: {
//         ...prev.projectPlanning,
//         ongoingProjects: prev.projectPlanning.ongoingProjects.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   const handleNext = () => {
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post('http://localhost:4000/api/collegeform', formData);
      
//       if (response.data.success) {
//         setSuccess('College form submitted successfully!');
//         setFormData(initialFormData);
//         setActiveStep(0);
//       } else {
//         setError(response.data.message || 'Failed to submit form');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 1: Basic Information
//   const renderBasicInfoStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <SchoolIcon color="primary" />
//               <Typography variant="h6">College Basic Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="College Name"
//                   name="collegeName"
//                   value={formData.collegeName}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required variant="outlined">
//                   <InputLabel>Campus Type</InputLabel>
//                   <Select
//                     name="campusType"
//                     value={formData.campusType}
//                     label="Campus Type"
//                     onChange={handleInputChange as any}
//                   >
//                     {campusTypes.map((type) => (
//                       <MenuItem key={type} value={type}>{type}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Establishment Date"
//                   name="establishmentDate"
//                   type="date"
//                   value={formData.establishmentDate}
//                   onChange={handleInputChange}
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="College ID"
//                   name="collegeId"
//                   value={formData.collegeId}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <PanelsTopLeftIcon color="primary" />
//               <Typography variant="h6">Principal Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Principal Name"
//                   name="principalInfo.name"
//                   value={formData.principalInfo.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Contact Number"
//                   name="principalInfo.contactNumber"
//                   value={formData.principalInfo.contactNumber}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="principalInfo.email"
//                   type="email"
//                   value={formData.principalInfo.email}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <PanelsTopLeftIcon color="primary" />
//               <Typography variant="h6">Staff Contacts</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Admin Chief Name"
//                   name="staffContacts.adminChief.name"
//                   value={formData.staffContacts.adminChief.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Admin Chief Mobile"
//                   name="staffContacts.adminChief.mobile"
//                   value={formData.staffContacts.adminChief.mobile}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Account Chief Name"
//                   name="staffContacts.accountChief.name"
//                   value={formData.staffContacts.accountChief.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Account Chief Mobile"
//                   name="staffContacts.accountChief.mobile"
//                   value={formData.staffContacts.accountChief.mobile}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 2: Location Details
//   // const renderLocationStep = () => (
//   //   <Card sx={{ mb: 2 }}>
//   //     <CardContent>
//   //       <Accordion defaultExpanded>
//   //         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//   //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//   //             <LocationIcon color="primary" />
//   //             <Typography variant="h6">College Location Details</Typography>
//   //           </Box>
//   //         </AccordionSummary>
//   //         <AccordionDetails>
//   //           <Grid container spacing={2}>
//   //             <Grid item xs={12} md={6}>
//   //               <FormControl fullWidth required variant="outlined">
//   //                 <InputLabel>Province</InputLabel>
//   //                 <Select
//   //                   name="location.province"
//   //                   value={formData.location.province}
//   //                   label="Province"
//   //                   onChange={handleInputChange as any}
//   //                 >
//   //                   {provinces.map((province) => (
//   //                     <MenuItem key={province} value={province}>{province}</MenuItem>
//   //                   ))}
//   //                 </Select>
//   //               </FormControl>
//   //             </Grid>
              
//   //             <Grid item xs={12} md={6}>
//   //               <TextField
//   //                 required
//   //                 fullWidth
//   //                 label="District"
//   //                 name="location.district"
//   //                 value={formData.location.district}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>
              
//   //             <Grid item xs={12} md={6}>
//   //               <TextField
//   //                 required
//   //                 fullWidth
//   //                 label="Municipality/Rural Municipality"
//   //                 name="location.localLevel"
//   //                 value={formData.location.localLevel}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>
              
//   //             <Grid item xs={12} md={6}>
//   //               <TextField
//   //                 required
//   //                 fullWidth
//   //                 label="Ward No."
//   //                 name="location.wardNo"
//   //                 value={formData.location.wardNo}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>
              
//   //             <Grid item xs={12} md={6}>
//   //               <TextField
//   //                 fullWidth
//   //                 label="Street/Tole Name"
//   //                 name="location.streetTole"
//   //                 value={formData.location.streetTole}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>
              
//   //             <Grid item xs={12} md={6}>
//   //               <TextField
//   //                 fullWidth
//   //                 label="Landmark"
//   //                 name="location.landmark"
//   //                 value={formData.location.landmark}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>
//   //           </Grid>
//   //         </AccordionDetails>
//   //       </Accordion>

//   //       <Accordion>
//   //         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//   //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//   //             <PanelsTopLeftIcon color="primary" />
//   //             <Typography variant="h6">Contact Information</Typography>
//   //           </Box>
//   //         </AccordionSummary>
//   //         <AccordionDetails>
//   //           <Grid container spacing={2}>
//   //             <Grid item xs={12} md={4}>
//   //               <TextField
//   //                 fullWidth
//   //                 label="Official Phone"
//   //                 name="contactInfo.officialPhone"
//   //                 value={formData.contactInfo.officialPhone}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>

//   //             <Grid item xs={12} md={4}>
//   //               <TextField
//   //                 fullWidth
//   //                 label="Official Email"
//   //                 name="contactInfo.officialEmail"
//   //                 type="email"
//   //                 value={formData.contactInfo.officialEmail}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>

//   //             <Grid item xs={12} md={4}>
//   //               <TextField
//   //                 fullWidth
//   //                 label="College Website"
//   //                 name="contactInfo.website"
//   //                 value={formData.contactInfo.website}
//   //                 onChange={handleInputChange}
//   //                 variant="outlined"
//   //               />
//   //             </Grid>
//   //           </Grid>
//   //         </AccordionDetails>
//   //       </Accordion>
//   //     </CardContent>
//   //   </Card>
//   // );

//   const renderLocationStep = () => (
//   <Card sx={{ mb: 2 }}>
//     <CardContent>
//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <LocationIcon color="primary" />
//             <Typography variant="h6">College Location Details</Typography>
//           </Box>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth required variant="outlined">
//                 <InputLabel>Province</InputLabel>
//                 <Select
//                   name="location.province"
//                   value={formData.location.province}
//                   label="Province"
//                   onChange={handleInputChange as any}
//                 >
//                   {provinces.map((province) => (
//                     <MenuItem key={province} value={province}>
//                       {province}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="District"
//                 name="location.district"
//                 value={formData.location.district}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Municipality/Rural Municipality"
//                 name="location.localLevel"
//                 value={formData.location.localLevel}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Ward No."
//                 name="location.wardNo"
//                 value={formData.location.wardNo}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Street/Tole Name"
//                 name="location.streetTole"
//                 value={formData.location.streetTole}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Landmark"
//                 name="location.landmark"
//                 value={formData.location.landmark}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             {/* ✅ Google Maps Link Field with Preview */}
//             <Grid item xs={12} md={12}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Google Maps Link"
//                   name="location.googleMapsLink"
//                   value={formData.location.googleMapsLink || ''}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   placeholder="https://maps.google.com/..."
//                 />
//                 {formData.location.googleMapsLink && (
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => window.open(formData.location.googleMapsLink, '_blank')}
//                   >
//                     Preview
//                   </Button>
//                 )}
//               </Box>
//             </Grid>
//           </Grid>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <PanelsTopLeftIcon color="primary" />
//             <Typography variant="h6">Contact Information</Typography>
//           </Box>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Official Phone"
//                 name="contactInfo.officialPhone"
//                 value={formData.contactInfo.officialPhone}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Official Email"
//                 name="contactInfo.officialEmail"
//                 type="email"
//                 value={formData.contactInfo.officialEmail}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="College Website"
//                 name="contactInfo.website"
//                 value={formData.contactInfo.website}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>
//         </AccordionDetails>
//       </Accordion>
//     </CardContent>
//   </Card>
// );


//   // Step 3: Infrastructure & Land with Media Support
//   const renderInfrastructureStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <BuildingIcon color="primary" />
//               <Typography variant="h6">Buildings & Rooms (with Media)</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Button startIcon={<AddIcon />} onClick={addBuilding} sx={{ mb: 2 }} variant="contained">
//               Add Building
//             </Button>
//             {formData.infrastructure.buildings.map((building, index) => (
//               <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle1" fontWeight="bold" color="primary">
//                       Building #{index + 1}
//                     </Typography>
//                   </Grid>
                  
//                   <Grid item xs={12} md={3}>
//                     <TextField
//                       fullWidth
//                       label="Building Name"
//                       value={building.buildingName}
//                       onChange={(e) => updateBuilding(index, 'buildingName', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <TextField
//                       fullWidth
//                       label="Total Rooms"
//                       type="number"
//                       value={building.totalRooms}
//                       onChange={(e) => updateBuilding(index, 'totalRooms', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <TextField
//                       fullWidth
//                       label="Classrooms"
//                       type="number"
//                       value={building.classrooms}
//                       onChange={(e) => updateBuilding(index, 'classrooms', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <TextField
//                       fullWidth
//                       label="Labs"
//                       type="number"
//                       value={building.labs}
//                       onChange={(e) => updateBuilding(index, 'labs', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormControl fullWidth size="small" variant="outlined">
//                       <InputLabel>Condition</InputLabel>
//                       <Select
//                         value={building.condition}
//                         label="Condition"
//                         onChange={(e) => updateBuilding(index, 'condition', e.target.value)}
//                       >
//                         {buildingConditions.map(condition => (
//                           <MenuItem key={condition} value={condition}>{condition}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   {/* Media Management Section */}
//                   <Grid item xs={12}>
//                     <Divider sx={{ my: 2 }} />
//                     <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Building Media
//                       </Typography>
//                       <Chip 
//                         icon={<ImageIcon />} 
//                         label={`${building.media?.images?.length || 0} Images`} 
//                         size="small" 
//                         color="primary"
//                         variant="outlined"
//                       />
//                       <Chip 
//                         icon={<VideoIcon />} 
//                         label={`${building.media?.videos?.length || 0} Videos`} 
//                         size="small" 
//                         color="secondary"
//                         variant="outlined"
//                       />
//                     </Stack>

//                     <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                       <Button
//                         size="small"
//                         startIcon={<ImageIcon />}
//                         onClick={() => openMediaDialog(index, 'image')}
//                         variant="outlined"
//                         color="primary"
//                       >
//                         Add Image
//                       </Button>
//                       <Button
//                         size="small"
//                         startIcon={<VideoIcon />}
//                         onClick={() => openMediaDialog(index, 'video')}
//                         variant="outlined"
//                         color="secondary"
//                       >
//                         Add Video
//                       </Button>
//                     </Stack>

//                     {/* Display Images */}
//                     {building.media?.images && building.media.images.length > 0 && (
//                       <Box sx={{ mb: 2 }}>
//                         <Typography variant="body2" fontWeight="bold" gutterBottom>
//                           Images:
//                         </Typography>
//                         <ImageList sx={{ width: '100%', height: 200 }} cols={4} rowHeight={164}>
//                           {building.media.images.map((img, imgIndex) => (
//                             <ImageListItem key={imgIndex}>
//                               <img
//                                 src={img.url}
//                                 alt={img.caption || 'Building image'}
//                                 loading="lazy"
//                                 style={{ cursor: 'pointer', objectFit: 'cover' }}
//                                 onClick={() => handlePreviewMedia(img.url, img.caption, 'image')}
//                               />
//                               <ImageListItemBar
//                                 title={img.caption || 'No caption'}
//                                 actionIcon={
//                                   <IconButton
//                                     sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
//                                     onClick={() => deleteMedia(index, 'images', imgIndex)}
//                                   >
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 }
//                               />
//                             </ImageListItem>
//                           ))}
//                         </ImageList>
//                       </Box>
//                     )}

//                     {/* Display Videos */}
//                     {building.media?.videos && building.media.videos.length > 0 && (
//                       <Box>
//                         <Typography variant="body2" fontWeight="bold" gutterBottom>
//                           Videos:
//                         </Typography>
//                         <Grid container spacing={2}>
//                           {building.media.videos.map((vid, vidIndex) => (
//                             <Grid item xs={12} sm={6} md={4} key={vidIndex}>
//                               <Card variant="outlined">
//                                 {vid.thumbnail && (
//                                   <CardMedia
//                                     component="img"
//                                     height="140"
//                                     image={vid.thumbnail}
//                                     alt={vid.caption || 'Video thumbnail'}
//                                     sx={{ cursor: 'pointer' }}
//                                     onClick={() => handlePreviewMedia(vid.url, vid.caption, 'video')}
//                                   />
//                                 )}
//                                 <CardContent>
//                                   <Typography variant="body2" noWrap>
//                                     {vid.caption || 'No caption'}
//                                   </Typography>
//                                   {vid.duration && (
//                                     <Typography variant="caption" color="text.secondary">
//                                       Duration: {vid.duration}s
//                                     </Typography>
//                                   )}
//                                   <IconButton
//                                     size="small"
//                                     color="error"
//                                     onClick={() => deleteMedia(index, 'videos', vidIndex)}
//                                     sx={{ float: 'right' }}
//                                   >
//                                     <DeleteIcon fontSize="small" />
//                                   </IconButton>
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                           ))}
//                         </Grid>
//                       </Box>
//                     )}
//                   </Grid>

//                   {/* Remove Building Button */}
//                   <Grid item xs={12}>
//                     <Button
//                       startIcon={<DeleteIcon />}
//                       onClick={() => removeBuilding(index)}
//                       color="error"
//                       variant="outlined"
//                       size="small"
//                     >
//                       Remove Building
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Card>
//             ))}
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <BriefcaseBusinessIcon color="primary" />
//               <Typography variant="h6">Health & Sanitation</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Male Toilets"
//                   name="infrastructure.healthSanitation.toilets.male"
//                   value={formData.infrastructure.healthSanitation.toilets.male}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Female Toilets"
//                   name="infrastructure.healthSanitation.toilets.female"
//                   value={formData.infrastructure.healthSanitation.toilets.female}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Disabled Friendly Toilets"
//                   name="infrastructure.healthSanitation.toilets.disabledFriendly"
//                   value={formData.infrastructure.healthSanitation.toilets.disabledFriendly}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="infrastructure.healthSanitation.drinkingWater.available"
//                       checked={formData.infrastructure.healthSanitation.drinkingWater.available}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Drinking Water Available"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="infrastructure.healthSanitation.medicalFacilities.firstAid"
//                       checked={formData.infrastructure.healthSanitation.medicalFacilities.firstAid}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="First Aid Available"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 4: Academic Programs
//   const renderAcademicProgramsStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <AcademicIcon color="primary" />
//               <Typography variant="h6">Academic Programs & Enrollment</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Total Faculties/Departments"
//                   name="academicPrograms.totalFaculties"
//                   type="number"
//                   value={formData.academicPrograms.totalFaculties}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Programs Offered
//                 </Typography>
//                 <Button startIcon={<AddIcon />} onClick={addProgram} sx={{ mb: 2 }} variant="contained">
//                   Add Program
//                 </Button>
                
//                 {formData.academicPrograms.programs.map((program, index) => (
//                   <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid item xs={11}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} md={4}>
//                             <TextField
//                               fullWidth
//                               label="Program Name"
//                               value={program.programName}
//                               onChange={(e) => updateProgram(index, 'programName', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <FormControl fullWidth size="small" variant="outlined">
//                               <InputLabel>Level</InputLabel>
//                               <Select
//                                 value={program.level}
//                                 label="Level"
//                                 onChange={(e) => updateProgram(index, 'level', e.target.value)}
//                               >
//                                 {programLevels.map(level => (
//                                   <MenuItem key={level} value={level}>{level}</MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Duration"
//                               value={program.duration}
//                               onChange={(e) => updateProgram(index, 'duration', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item xs={1}>
//                         <IconButton onClick={() => removeProgram(index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Current Enrollment
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Total Students"
//                   name="academicPrograms.enrollment.total"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.total}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Male Students"
//                   name="academicPrograms.enrollment.male"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.male}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Female Students"
//                   name="academicPrograms.enrollment.female"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.female}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Other Students"
//                   name="academicPrograms.enrollment.other"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.other}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 5: Staff Information
//   const renderStaffStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <StaffIcon color="primary" />
//               <Typography variant="h6">Staff Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Academic Staff
//                 </Typography>
//                 <Button startIcon={<AddIcon />} onClick={addAcademicStaff} sx={{ mb: 2 }} variant="contained">
//                   Add Academic Staff
//                 </Button>
                
//                 {formData.staff.academic.map((staff, index) => (
//                   <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid item xs={11}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Name"
//                               value={staff.name}
//                               onChange={(e) => updateAcademicStaff(index, 'name', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Designation"
//                               value={staff.designation}
//                               onChange={(e) => updateAcademicStaff(index, 'designation', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Department"
//                               value={staff.department}
//                               onChange={(e) => updateAcademicStaff(index, 'department', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <FormControl fullWidth size="small" variant="outlined">
//                               <InputLabel>Employment Type</InputLabel>
//                               <Select
//                                 value={staff.employmentType}
//                                 label="Employment Type"
//                                 onChange={(e) => updateAcademicStaff(index, 'employmentType', e.target.value)}
//                               >
//                                 {employmentTypes.map(type => (
//                                   <MenuItem key={type} value={type}>{type}</MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item xs={1}>
//                         <IconButton onClick={() => removeAcademicStaff(index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 6: Facilities & Technology
//   const renderFacilitiesStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <TechIcon color="primary" />
//               <Typography variant="h6">Educational Tools & Technology</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Digital Classrooms"
//                   name="educationalTechnology.digitalClassrooms"
//                   type="number"
//                   value={formData.educationalTechnology.digitalClassrooms}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Computer Labs"
//                   name="educationalTechnology.computerLabs"
//                   type="number"
//                   value={formData.educationalTechnology.computerLabs}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Computers Available"
//                   name="educationalTechnology.computersAvailable"
//                   type="number"
//                   value={formData.educationalTechnology.computersAvailable}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Internet Availability
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="educationalTechnology.internetAvailability.available"
//                       checked={formData.educationalTechnology.internetAvailability.available}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Internet Available"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Internet Speed"
//                   name="educationalTechnology.internetAvailability.speed"
//                   value={formData.educationalTechnology.internetAvailability.speed}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Internet Provider"
//                   name="educationalTechnology.internetAvailability.provider"
//                   value={formData.educationalTechnology.internetAvailability.provider}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Library Resources
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Physical Books"
//                   name="educationalTechnology.libraryResources.physicalBooks"
//                   type="number"
//                   value={formData.educationalTechnology.libraryResources.physicalBooks}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="eBooks"
//                   name="educationalTechnology.libraryResources.ebooks"
//                   type="number"
//                   value={formData.educationalTechnology.libraryResources.ebooks}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Journals"
//                   name="educationalTechnology.libraryResources.journals"
//                   type="number"
//                   value={formData.educationalTechnology.libraryResources.journals}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="educationalTechnology.libraryResources.digitalDatabase"
//                       checked={formData.educationalTechnology.libraryResources.digitalDatabase}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Digital Database"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 7: Project Planning
//   const renderProjectPlanningStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <ProjectIcon color="primary" />
//               <Typography variant="h6">Project Planning</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Immediate Construction Planning"
//                   name="projectPlanning.immediateConstruction"
//                   value={formData.projectPlanning.immediateConstruction}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Future Construction Planning"
//                   name="projectPlanning.futureConstruction"
//                   value={formData.projectPlanning.futureConstruction}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Priority Work
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Priority 1 (P1)"
//                   name="projectPlanning.priorityWork.p1"
//                   value={formData.projectPlanning.priorityWork.p1}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Priority 2 (P2)"
//                   name="projectPlanning.priorityWork.p2"
//                   value={formData.projectPlanning.priorityWork.p2}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Priority 3 (P3)"
//                   name="projectPlanning.priorityWork.p3"
//                   value={formData.projectPlanning.priorityWork.p3}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Ongoing Projects
//                 </Typography>
//                 <Button startIcon={<AddIcon />} onClick={addProject} sx={{ mb: 2 }} variant="contained">
//                   Add Project
//                 </Button>
                
//                 {formData.projectPlanning.ongoingProjects.map((project, index) => (
//                   <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid item xs={11}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Project Name"
//                               value={project.projectName}
//                               onChange={(e) => updateProject(index, 'projectName', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={2}>
//                             <TextField
//                               fullWidth
//                               label="Start Date"
//                               type="date"
//                               value={project.startDate}
//                               onChange={(e) => updateProject(index, 'startDate', e.target.value)}
//                               InputLabelProps={{ shrink: true }}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={2}>
//                             <TextField
//                               fullWidth
//                               label="Expected Completion"
//                               type="date"
//                               value={project.expectedCompletion}
//                               onChange={(e) => updateProject(index, 'expectedCompletion', e.target.value)}
//                               InputLabelProps={{ shrink: true }}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={2}>
//                             <TextField
//                               fullWidth
//                               label="Budget"
//                               type="number"
//                               value={project.budget}
//                               onChange={(e) => updateProject(index, 'budget', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <FormControl fullWidth size="small" variant="outlined">
//                               <InputLabel>Status</InputLabel>
//                               <Select
//                                 value={project.status}
//                                 label="Status"
//                                 onChange={(e) => updateProject(index, 'status', e.target.value)}
//                               >
//                                 {projectStatuses.map(status => (
//                                   <MenuItem key={status} value={status}>{status}</MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item xs={1}>
//                         <IconButton onClick={() => removeProject(index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 8: Review & Submit
//   const renderReviewStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <ReviewIcon color="primary" />
//               <Typography variant="h6">Review College Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   Please review all information before submitting the form.
//                 </Typography>
//               </Grid>

//               <Grid item xs={12}>
//                 <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
//                   <Typography variant="h6" gutterBottom>College Summary</Typography>
//                   <Typography><strong>College Name:</strong> {formData.collegeName}</Typography>
//                   <Typography><strong>Campus Type:</strong> {formData.campusType}</Typography>
//                   <Typography><strong>Location:</strong> {formData.location.district}, {formData.location.province}</Typography>
//                   <Typography><strong>Total Buildings:</strong> {formData.infrastructure.buildings.length}</Typography>
//                   <Typography><strong>Total Programs:</strong> {formData.academicPrograms.programs.length}</Typography>
//                   <Typography><strong>Total Images:</strong> {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.images?.length || 0), 0)}</Typography>
//                   <Typography><strong>Total Videos:</strong> {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.videos?.length || 0), 0)}</Typography>
//                 </Card>
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   const getStepContent = (step: number) => {
//     switch (step) {
//       case 0: return renderBasicInfoStep();
//       case 1: return renderLocationStep();
//       case 2: return renderInfrastructureStep();
//       case 3: return renderAcademicProgramsStep();
//       case 4: return renderStaffStep();
//       case 5: return renderFacilitiesStep();
//       case 6: return renderProjectPlanningStep();
//       case 7: return renderReviewStep();
//       default: return null;
//     }
//   };

//   const isStepValid = (step: number): boolean => {
//     switch (step) {
//       case 0:
//         return !!formData.collegeName && !!formData.campusType && !!formData.establishmentDate && !!formData.principalInfo.name;
//       case 1:
//         return !!formData.location.province && !!formData.location.district && !!formData.location.localLevel && !!formData.location.wardNo;
//       default:
//         return true;
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
//       <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
//         <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
//           Tribhuvan University
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
//           College Information Collection Form
//         </Typography>
        
//         <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
//           {steps.map((label, index) => (
//             <Step key={label}>
//               <StepLabel icon={sectionIcons[index as keyof typeof sectionIcons]}>
//                 {label}
//               </StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
//             {success}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Box sx={{ minHeight: 400 }}>
//             {getStepContent(activeStep)}
//           </Box>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 1 }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//               size="large"
//             >
//               Back
//             </Button>
            
//             <Box>
//               {activeStep === steps.length - 1 ? (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                   size="large"
//                   startIcon={loading ? <CircularProgress size={20} /> : null}
//                   sx={{ px: 4 }}
//                 >
//                   {loading ? 'Submitting...' : 'Submit Form'}
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   disabled={!isStepValid(activeStep)}
//                   size="large"
//                   sx={{ px: 4 }}
//                 >
//                   Next
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </form>
//       </Paper>

//       {/* Add Media Dialog */}
//       <Dialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {mediaType === 'image' ? <ImageIcon color="primary" /> : <VideoIcon color="secondary" />}
//             Add {mediaType === 'image' ? 'Image' : 'Video'}
//           </Box>
//           <IconButton
//             onClick={() => setMediaDialogOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Media URL"
//                 value={mediaUrl}
//                 onChange={(e) => setMediaUrl(e.target.value)}
//                 required
//                 helperText="Enter the URL of the image or video"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Caption"
//                 value={mediaCaption}
//                 onChange={(e) => setMediaCaption(e.target.value)}
//                 multiline
//                 rows={2}
//                 variant="outlined"
//               />
//             </Grid>
//             {mediaType === 'video' && (
//               <>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Duration (seconds)"
//                     type="number"
//                     value={mediaDuration}
//                     onChange={(e) => setMediaDuration(e.target.value)}
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Thumbnail URL"
//                     value={mediaThumbnail}
//                     onChange={(e) => setMediaThumbnail(e.target.value)}
//                     variant="outlined"
//                   />
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setMediaDialogOpen(false)} variant="outlined">
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleAddMedia} 
//             variant="contained" 
//             disabled={!mediaUrl}
//             startIcon={<CloudUploadIcon />}
//           >
//             Add {mediaType === 'image' ? 'Image' : 'Video'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Preview Media Dialog */}
//       <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {previewMedia?.caption || 'Media Preview'}
//           <IconButton
//             onClick={() => setPreviewOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
// //         </DialogTitle>
// //         <DialogContent>
// //           {previewMedia?.type === 'image' ? (
// //             <img 
// //               src={previewMedia.url} 
// //               alt={previewMedia.caption} 
// //               style={{ width: '100%', height: 'auto', borderRadius: 8 }} 
// //             />
// //           ) : (
// //             <video 
// //               src={previewMedia?.url} 
// //               controls 
// //               style={{ width: '100%', height: 'auto', borderRadius: 8 }} 
// //             />
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default CollegeDataForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Stepper,
//   Step,
//   StepLabel,
//   Alert,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   Divider,
//   Card,
//   CardContent,
//   FormControlLabel,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Switch,
//   CardMedia,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   Stack,
//   useTheme
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   ExpandMore as ExpandMoreIcon,
//   CloudUpload as CloudUploadIcon,
//   Image as ImageIcon,
//   VideoLibrary as VideoIcon,
//   Edit as EditIcon,
//   Close as CloseIcon,
//   School as SchoolIcon,
//   LocationOn as LocationIcon,
//   Business as BuildingIcon,
//   MenuBook as AcademicIcon,
//   People as StaffIcon,
//   Computer as TechIcon,
//   Construction as ProjectIcon,
//   CheckCircle as ReviewIcon,
//   AttachFile as AttachFileIcon
// } from '@mui/icons-material';
// import { BriefcaseBusinessIcon, PanelsTopLeftIcon } from 'lucide-react';

// // Building Media Interface
// interface BuildingMedia {
//   images: Array<{
//     url: string;
//     caption: string;
//     uploadDate?: Date;
//     fileSize?: number;
//     mimeType?: string;
//   }>;
//   videos: Array<{
//     url: string;
//     caption: string;
//     uploadDate?: Date;
//     fileSize?: number;
//     duration?: number;
//     mimeType?: string;
//     thumbnail?: string;
//   }>;
// }

// // Building Interface with Media
// interface Building {
//   buildingName: string;
//   totalRooms: string;
//   classrooms: string;
//   labs: string;
//   library: string;
//   administrative: string;
//   other: string;
//   condition: string;
//   media?: BuildingMedia;
// }

// // Project Interface with Attachments
// interface Project {
//   projectName: string;
//   startDate: string;
//   expectedCompletion: string;
//   budget: string;
//   attachments: string;
//   status: string;
// }

// // Main Form Interface
// interface CollegeFormData {
//   collegeName: string;
//   campusType: string;
//   establishmentDate: string;
//   collegeId: string;
//   principalInfo: {
//     name: string;
//     contactNumber: string;
//     email: string;
//   };
//   contactInfo: {
//     officialPhone: string;
//     officialEmail: string;
//     website: string;
//   };
//   staffContacts: {
//     adminChief: {
//       name: string;
//       mobile: string;
//     };
//     accountChief: {
//       name: string;
//       mobile: string;
//     };
//   };
//   dataCollectionContact: {
//     name: string;
//     designation: string;
//     phone: string;
//     email: string;
//   };
//   location: {
//     province: string;
//     district: string;
//     localLevel: string;
//     wardNo: string;
//     streetTole: string;
//     landmark: string;
//     latitude: string;
//     longitude: string;
//     googleMapsLink: string;
//   };
//   infrastructure: {
//     landArea: {
//       traditionalUnits: {
//         bigaha: string;
//         katha: string;
//         dhur: string;
//         ropani: string;
//         ana: string;
//         daam: string;
//         paisa: string;
//       };
//       squareMeters: string;
//       acquisitionDate: string;
//       taxClearanceStatus: string;
//       haalsabikStatus: string;
//     };
//     landOwnership: {
//       lalpurja: {
//         area: string;
//         address: string;
//       };
//       bhogadhikar: {
//         area: string;
//         address: string;
//       };
//       localGovernment: {
//         area: string;
//         address: string;
//       };
//       other: {
//         area: string;
//         address: string;
//       };
//     };
//     landUse: {
//       buildingArea: string;
//       playgroundArea: string;
//       naturalForestArea: string;
//       plantationArea: string;
//       leasedArea: string;
//       leaseIncome: string;
//       encroachmentExists: boolean;
//       encroachmentDetails: string;
//       protectionSteps: string;
//       commercialUseSuggestions: string;
//       commercialPlans: string;
//       masterPlanExists: boolean;
//       masterPlanAttachment: string;
//       suggestions: string;
//     };
//     buildings: Building[];
//     healthSanitation: {
//       toilets: {
//         male: string;
//         female: string;
//         disabledFriendly: string;
//       };
//       drinkingWater: {
//         available: boolean;
//         qualityTested: boolean;
//         purificationSystem: string;
//       };
//       wasteManagement: {
//         segregation: boolean;
//         disposalMethod: string;
//         recycling: boolean;
//       };
//       medicalFacilities: {
//         firstAid: boolean;
//         healthPost: boolean;
//         staffAvailable: boolean;
//       };
//     };
//   };
//   academicPrograms: {
//     totalFaculties: string;
//     programs: Array<{
//       programName: string;
//       level: string;
//       duration: string;
//       affiliatedTo: string;
//     }>;
//     enrollment: {
//       total: string;
//       male: string;
//       female: string;
//       other: string;
//       programBreakdown: Array<{
//         programName: string;
//         total: string;
//         male: string;
//         female: string;
//         other: string;
//       }>;
//     };
//   };
//   projectPlanning: {
//     immediateConstruction: string;
//     futureConstruction: string;
//     priorityWork: {
//       p1: string;
//       p2: string;
//       p3: string;
//     };
//     ongoingProjects: Project[];
//   };
//   staff: {
//     academic: Array<{
//       name: string;
//       designation: string;
//       department: string;
//       qualification: string;
//       experience: string;
//       employmentType: string;
//     }>;
//     administrative: Array<{
//       name: string;
//       designation: string;
//       department: string;
//       employmentType: string;
//     }>;
//   };
//   educationalTechnology: {
//     digitalClassrooms: string;
//     computerLabs: string;
//     computersAvailable: string;
//     internetAvailability: {
//       available: boolean;
//       speed: string;
//       provider: string;
//     };
//     libraryResources: {
//       physicalBooks: string;
//       ebooks: string;
//       journals: string;
//       digitalDatabase: boolean;
//     };
//     learningManagementSystem: {
//       name: string;
//       active: boolean;
//     };
//   };
//   formStatus: string;
// }

// const initialFormData: CollegeFormData = {
//   collegeName: '',
//   campusType: '',
//   establishmentDate: '',
//   collegeId: '',
//   principalInfo: {
//     name: '',
//     contactNumber: '',
//     email: ''
//   },
//   contactInfo: {
//     officialPhone: '',
//     officialEmail: '',
//     website: ''
//   },
//   staffContacts: {
//     adminChief: {
//       name: '',
//       mobile: ''
//     },
//     accountChief: {
//       name: '',
//       mobile: ''
//     }
//   },
//   dataCollectionContact: {
//     name: '',
//     designation: '',
//     phone: '',
//     email: ''
//   },
//   location: {
//     province: '',
//     district: '',
//     localLevel: '',
//     wardNo: '',
//     streetTole: '',
//     landmark: '',
//     latitude: '',
//     longitude: '',
//     googleMapsLink: ''
//   },
//   infrastructure: {
//     landArea: {
//       traditionalUnits: {
//         bigaha: '',
//         katha: '',
//         dhur: '',
//         ropani: '',
//         ana: '',
//         daam: '',
//         paisa: ''
//       },
//       squareMeters: '',
//       acquisitionDate: '',
//       taxClearanceStatus: '',
//       haalsabikStatus: ''
//     },
//     landOwnership: {
//       lalpurja: {
//         area: '',
//         address: ''
//       },
//       bhogadhikar: {
//         area: '',
//         address: ''
//       },
//       localGovernment: {
//         area: '',
//         address: ''
//       },
//       other: {
//         area: '',
//         address: ''
//       }
//     },
//     landUse: {
//       buildingArea: '',
//       playgroundArea: '',
//       naturalForestArea: '',
//       plantationArea: '',
//       leasedArea: '',
//       leaseIncome: '',
//       encroachmentExists: false,
//       encroachmentDetails: '',
//       protectionSteps: '',
//       commercialUseSuggestions: '',
//       commercialPlans: '',
//       masterPlanExists: false,
//       masterPlanAttachment: '',
//       suggestions: ''
//     },
//     buildings: [],
//     healthSanitation: {
//       toilets: {
//         male: '',
//         female: '',
//         disabledFriendly: ''
//       },
//       drinkingWater: {
//         available: false,
//         qualityTested: false,
//         purificationSystem: ''
//       },
//       wasteManagement: {
//         segregation: false,
//         disposalMethod: '',
//         recycling: false
//       },
//       medicalFacilities: {
//         firstAid: false,
//         healthPost: false,
//         staffAvailable: false
//       }
//     }
//   },
//   academicPrograms: {
//     totalFaculties: '',
//     programs: [],
//     enrollment: {
//       total: '',
//       male: '',
//       female: '',
//       other: '',
//       programBreakdown: []
//     }
//   },
//   projectPlanning: {
//     immediateConstruction: '',
//     futureConstruction: '',
//     priorityWork: {
//       p1: '',
//       p2: '',
//       p3: ''
//     },
//     ongoingProjects: []
//   },
//   staff: {
//     academic: [],
//     administrative: []
//   },
//   educationalTechnology: {
//     digitalClassrooms: '',
//     computerLabs: '',
//     computersAvailable: '',
//     internetAvailability: {
//       available: false,
//       speed: '',
//       provider: ''
//     },
//     libraryResources: {
//       physicalBooks: '',
//       ebooks: '',
//       journals: '',
//       digitalDatabase: false
//     },
//     learningManagementSystem: {
//       name: '',
//       active: false
//     }
//   },
//   formStatus: 'Draft'
// };

// // Constants
// const campusTypes = [
//   'Constituent Campus',
//   'Affiliated College',
//   'Community Campus',
//   'Private College'
// ];

// const provinces = [
//   'Province 1',
//   'Province 2',
//   'Bagmati Province',
//   'Gandaki Province',
//   'Lumbini Province',
//   'Karnali Province',
//   'Sudurpashchim Province'
// ];

// const programLevels = ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'];
// const employmentTypes = ['Permanent', 'Contract', 'Part-time'];
// const projectStatuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];
// const buildingConditions = ['Excellent', 'Good', 'Fair', 'Poor'];

// const sectionIcons = {
//   0: <SchoolIcon />,
//   1: <LocationIcon />,
//   2: <BuildingIcon />,
//   3: <AcademicIcon />,
//   4: <StaffIcon />,
//   5: <TechIcon />,
//   6: <ProjectIcon />,
//   7: <ReviewIcon />
// };

// const CollegeDataForm: React.FC = () => {
//   const [formData, setFormData] = useState<CollegeFormData>(initialFormData);
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const theme = useTheme();
  
//   // Media dialog state
//   const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
//   const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
//   const [mediaUrl, setMediaUrl] = useState('');
//   const [mediaCaption, setMediaCaption] = useState('');
//   const [mediaDuration, setMediaDuration] = useState('');
//   const [mediaThumbnail, setMediaThumbnail] = useState('');
  
//   // Image preview dialog
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewMedia, setPreviewMedia] = useState<{ url: string; caption: string; type: 'image' | 'video' } | null>(null);

//   // Project attachment upload state
//   const [uploadingAttachments, setUploadingAttachments] = useState<{[key: number]: boolean}>({});

//   const steps = [
//     'Basic Information',
//     'Location Details',
//     'Infrastructure & Land',
//     'Academic Programs',
//     'Staff Information',
//     'Facilities & Technology',
//     'Project Planning',
//     'Review & Submit'
//   ];

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;
    
//     if (name.includes('.')) {
//       const path = name.split('.');
//       setFormData(prev => {
//         const newData = { ...prev };
//         let current: any = newData;
        
//         for (let i = 0; i < path.length - 1; i++) {
//           current = current[path[i]];
//         }
        
//         current[path[path.length - 1]] = type === 'checkbox' ? checked : value;
//         return newData;
//       });
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   // Building handlers
//   const addBuilding = () => {
//     setFormData(prev => ({
//       ...prev,
//       infrastructure: {
//         ...prev.infrastructure,
//         buildings: [
//           ...prev.infrastructure.buildings,
//           {
//             buildingName: '',
//             totalRooms: '',
//             classrooms: '',
//             labs: '',
//             library: '',
//             administrative: '',
//             other: '',
//             condition: 'Good',
//             media: {
//               images: [],
//               videos: []
//             }
//           }
//         ]
//       }
//     }));
//   };

//   const updateBuilding = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newBuildings = [...prev.infrastructure.buildings];
//       newBuildings[index] = { ...newBuildings[index], [field]: value };
//       return {
//         ...prev,
//         infrastructure: { ...prev.infrastructure, buildings: newBuildings }
//       };
//     });
//   };

//   const removeBuilding = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       infrastructure: {
//         ...prev.infrastructure,
//         buildings: prev.infrastructure.buildings.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Media handlers
//   const openMediaDialog = (buildingIndex: number, type: 'image' | 'video') => {
//     setSelectedBuildingIndex(buildingIndex);
//     setMediaType(type);
//     setMediaUrl('');
//     setMediaCaption('');
//     setMediaDuration('');
//     setMediaThumbnail('');
//     setMediaDialogOpen(true);
//   };

//   const handleAddMedia = () => {
//     if (selectedBuildingIndex === null || !mediaUrl) return;

//     setFormData(prev => {
//       const newBuildings = [...prev.infrastructure.buildings];
//       const building = newBuildings[selectedBuildingIndex];
      
//       if (!building.media) {
//         building.media = { images: [], videos: [] };
//       }

//       if (mediaType === 'image') {
//         building.media.images.push({
//           url: mediaUrl,
//           caption: mediaCaption,
//           uploadDate: new Date()
//         });
//       } else {
//         building.media.videos.push({
//           url: mediaUrl,
//           caption: mediaCaption,
//           duration: mediaDuration ? parseInt(mediaDuration) : undefined,
//           thumbnail: mediaThumbnail,
//           uploadDate: new Date()
//         });
//       }

//       return {
//         ...prev,
//         infrastructure: { ...prev.infrastructure, buildings: newBuildings }
//       };
//     });

//     setMediaDialogOpen(false);
//   };

//   const deleteMedia = (buildingIndex: number, mediaType: 'images' | 'videos', mediaIndex: number) => {
//     setFormData(prev => {
//       const newBuildings = [...prev.infrastructure.buildings];
//       const building = newBuildings[buildingIndex];
      
//       if (building.media) {
//         building.media[mediaType].splice(mediaIndex, 1);
//       }

//       return {
//         ...prev,
//         infrastructure: { ...prev.infrastructure, buildings: newBuildings }
//       };
//     });
//   };

//   const handlePreviewMedia = (url: string, caption: string, type: 'image' | 'video') => {
//     setPreviewMedia({ url, caption, type });
//     setPreviewOpen(true);
//   };

//   // Program handlers
//   const addProgram = () => {
//     setFormData(prev => ({
//       ...prev,
//       academicPrograms: {
//         ...prev.academicPrograms,
//         programs: [
//           ...prev.academicPrograms.programs,
//           {
//             programName: '',
//             level: 'Bachelor',
//             duration: '',
//             affiliatedTo: ''
//           }
//         ]
//       }
//     }));
//   };

//   const updateProgram = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newPrograms = [...prev.academicPrograms.programs];
//       newPrograms[index] = { ...newPrograms[index], [field]: value };
//       return {
//         ...prev,
//         academicPrograms: { ...prev.academicPrograms, programs: newPrograms }
//       };
//     });
//   };

//   const removeProgram = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       academicPrograms: {
//         ...prev.academicPrograms,
//         programs: prev.academicPrograms.programs.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Staff handlers
//   const addAcademicStaff = () => {
//     setFormData(prev => ({
//       ...prev,
//       staff: {
//         ...prev.staff,
//         academic: [
//           ...prev.staff.academic,
//           {
//             name: '',
//             designation: '',
//             department: '',
//             qualification: '',
//             experience: '',
//             employmentType: 'Permanent'
//           }
//         ]
//       }
//     }));
//   };

//   const updateAcademicStaff = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newStaff = [...prev.staff.academic];
//       newStaff[index] = { ...newStaff[index], [field]: value };
//       return {
//         ...prev,
//         staff: { ...prev.staff, academic: newStaff }
//       };
//     });
//   };

//   const removeAcademicStaff = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       staff: {
//         ...prev.staff,
//         academic: prev.staff.academic.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Project handlers
//   const addProject = () => {
//     setFormData(prev => ({
//       ...prev,
//       projectPlanning: {
//         ...prev.projectPlanning,
//         ongoingProjects: [
//           ...prev.projectPlanning.ongoingProjects,
//           {
//             projectName: '',
//             startDate: '',
//             expectedCompletion: '',
//             budget: '',
//             attachments: '',
//             status: 'Planning'
//           }
//         ]
//       }
//     }));
//   };

//   const updateProject = (index: number, field: string, value: string) => {
//     setFormData(prev => {
//       const newProjects = [...prev.projectPlanning.ongoingProjects];
//       newProjects[index] = { ...newProjects[index], [field]: value };
//       return {
//         ...prev,
//         projectPlanning: { ...prev.projectPlanning, ongoingProjects: newProjects }
//       };
//     });
//   };

//   const removeProject = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       projectPlanning: {
//         ...prev.projectPlanning,
//         ongoingProjects: prev.projectPlanning.ongoingProjects.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Project Attachment Upload Handler
//   const handleProjectAttachmentUpload = async (projectIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov', 'application/pdf'];
//     if (!allowedTypes.includes(file.type)) {
//       setError('Please upload a valid file (JPEG, PNG, GIF, MP4, AVI, MOV, PDF)');
//       return;
//     }

//     // Validate file size (10MB max for Cloudinary)
//     const maxSize = 10 * 1024 * 1024; // 10MB in bytes
//     if (file.size > maxSize) {
//       setError('File size must be less than 10MB');
//       return;
//     }

//     setUploadingAttachments(prev => ({ ...prev, [projectIndex]: true }));

//     try {
//       // Cloudinary Configuration
//       const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
//       const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
      
//       // Create FormData for Cloudinary upload
//       const uploadFormData = new FormData();
//       uploadFormData.append('file', file);
//       uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
//       // Add folder structure
//       const folderPath = `tu-projects/${formData.collegeId || 'default'}/attachments`;
//       uploadFormData.append('folder', folderPath);
      
//       // Add public_id
//       const publicId = `project_attachment_${formData.collegeId || 'college'}_${Date.now()}`;
//       uploadFormData.append('public_id', publicId);

//       // Upload to Cloudinary
//       const cloudinaryResponse = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
//         {
//           method: 'POST',
//           body: uploadFormData,
//         }
//       );

//       if (!cloudinaryResponse.ok) {
//         const errorText = await cloudinaryResponse.text();
//         console.error('Cloudinary upload failed:', errorText);
//         throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.status}`);
//       }

//       const cloudinaryResult = await cloudinaryResponse.json();

//       // Update project attachment
//       setFormData(prev => ({
//         ...prev,
//         projectPlanning: {
//           ...prev.projectPlanning,
//           ongoingProjects: prev.projectPlanning.ongoingProjects.map((project, index) => 
//             index === projectIndex 
//               ? { ...project, attachments: cloudinaryResult.secure_url }
//               : project
//           )
//         }
//       }));
      
//       setSuccess('Project attachment uploaded successfully');
//     } catch (error) {
//       console.error('Project attachment upload error:', error);
//       setError('Failed to upload project attachment. Please try again.');
//     } finally {
//       setUploadingAttachments(prev => ({ ...prev, [projectIndex]: false }));
//       event.target.value = '';
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post('http://localhost:4000/api/collegeform', formData);
      
//       if (response.data.success) {
//         setSuccess('College form submitted successfully!');
//         setFormData(initialFormData);
//         setActiveStep(0);
//       } else {
//         setError(response.data.message || 'Failed to submit form');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 1: Basic Information
//   const renderBasicInfoStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <SchoolIcon color="primary" />
//               <Typography variant="h6">College Basic Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="College Name"
//                   name="collegeName"
//                   value={formData.collegeName}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required variant="outlined">
//                   <InputLabel>Campus Type</InputLabel>
//                   <Select
//                     name="campusType"
//                     value={formData.campusType}
//                     label="Campus Type"
//                     onChange={handleInputChange as any}
//                   >
//                     {campusTypes.map((type) => (
//                       <MenuItem key={type} value={type}>{type}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Establishment Date"
//                   name="establishmentDate"
//                   type="date"
//                   value={formData.establishmentDate}
//                   onChange={handleInputChange}
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="College ID"
//                   name="collegeId"
//                   value={formData.collegeId}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <PanelsTopLeftIcon color="primary" />
//               <Typography variant="h6">Principal Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Principal Name"
//                   name="principalInfo.name"
//                   value={formData.principalInfo.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Contact Number"
//                   name="principalInfo.contactNumber"
//                   value={formData.principalInfo.contactNumber}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="principalInfo.email"
//                   type="email"
//                   value={formData.principalInfo.email}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <PanelsTopLeftIcon color="primary" />
//               <Typography variant="h6">Staff Contacts</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Admin Chief Name"
//                   name="staffContacts.adminChief.name"
//                   value={formData.staffContacts.adminChief.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Admin Chief Mobile"
//                   name="staffContacts.adminChief.mobile"
//                   value={formData.staffContacts.adminChief.mobile}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Account Chief Name"
//                   name="staffContacts.accountChief.name"
//                   value={formData.staffContacts.accountChief.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Account Chief Mobile"
//                   name="staffContacts.accountChief.mobile"
//                   value={formData.staffContacts.accountChief.mobile}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 2: Location Details
//   const renderLocationStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <LocationIcon color="primary" />
//               <Typography variant="h6">College Location Details</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required variant="outlined">
//                   <InputLabel>Province</InputLabel>
//                   <Select
//                     name="location.province"
//                     value={formData.location.province}
//                     label="Province"
//                     onChange={handleInputChange as any}
//                   >
//                     {provinces.map((province) => (
//                       <MenuItem key={province} value={province}>{province}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="District"
//                   name="location.district"
//                   value={formData.location.district}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Municipality/Rural Municipality"
//                   name="location.localLevel"
//                   value={formData.location.localLevel}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Ward No."
//                   name="location.wardNo"
//                   value={formData.location.wardNo}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Street/Tole Name"
//                   name="location.streetTole"
//                   value={formData.location.streetTole}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Landmark"
//                   name="location.landmark"
//                   value={formData.location.landmark}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               {/* Google Maps Link Field with Preview */}
//               <Grid item xs={12} md={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <TextField
//                     fullWidth
//                     label="Google Maps Link"
//                     name="location.googleMapsLink"
//                     value={formData.location.googleMapsLink || ''}
//                     onChange={handleInputChange}
//                     variant="outlined"
//                     placeholder="https://maps.google.com/..."
//                   />
//                   {formData.location.googleMapsLink && (
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => window.open(formData.location.googleMapsLink, '_blank')}
//                     >
//                       Preview
//                     </Button>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <PanelsTopLeftIcon color="primary" />
//               <Typography variant="h6">Contact Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Official Phone"
//                   name="contactInfo.officialPhone"
//                   value={formData.contactInfo.officialPhone}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Official Email"
//                   name="contactInfo.officialEmail"
//                   type="email"
//                   value={formData.contactInfo.officialEmail}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="College Website"
//                   name="contactInfo.website"
//                   value={formData.contactInfo.website}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 3: Infrastructure & Land with Media Support
//   const renderInfrastructureStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <BuildingIcon color="primary" />
//               <Typography variant="h6">Buildings & Rooms (with Media)</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Button startIcon={<AddIcon />} onClick={addBuilding} sx={{ mb: 2 }} variant="contained">
//               Add Building
//             </Button>
//             {formData.infrastructure.buildings.map((building, index) => (
//               <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle1" fontWeight="bold" color="primary">
//                       Building #{index + 1}
//                     </Typography>
//                   </Grid>
                  
//                   <Grid item xs={12} md={3}>
//                     <TextField
//                       fullWidth
//                       label="Building Name"
//                       value={building.buildingName}
//                       onChange={(e) => updateBuilding(index, 'buildingName', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <TextField
//                       fullWidth
//                       label="Total Rooms"
//                       type="number"
//                       value={building.totalRooms}
//                       onChange={(e) => updateBuilding(index, 'totalRooms', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <TextField
//                       fullWidth
//                       label="Classrooms"
//                       type="number"
//                       value={building.classrooms}
//                       onChange={(e) => updateBuilding(index, 'classrooms', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <TextField
//                       fullWidth
//                       label="Labs"
//                       type="number"
//                       value={building.labs}
//                       onChange={(e) => updateBuilding(index, 'labs', e.target.value)}
//                       variant="outlined"
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormControl fullWidth size="small" variant="outlined">
//                       <InputLabel>Condition</InputLabel>
//                       <Select
//                         value={building.condition}
//                         label="Condition"
//                         onChange={(e) => updateBuilding(index, 'condition', e.target.value)}
//                       >
//                         {buildingConditions.map(condition => (
//                           <MenuItem key={condition} value={condition}>{condition}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   {/* Media Management Section */}
//                   <Grid item xs={12}>
//                     <Divider sx={{ my: 2 }} />
//                     <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Building Media
//                       </Typography>
//                       <Chip 
//                         icon={<ImageIcon />} 
//                         label={`${building.media?.images?.length || 0} Images`} 
//                         size="small" 
//                         color="primary"
//                         variant="outlined"
//                       />
//                       <Chip 
//                         icon={<VideoIcon />} 
//                         label={`${building.media?.videos?.length || 0} Videos`} 
//                         size="small" 
//                         color="secondary"
//                         variant="outlined"
//                       />
//                     </Stack>

//                     <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                       <Button
//                         size="small"
//                         startIcon={<ImageIcon />}
//                         onClick={() => openMediaDialog(index, 'image')}
//                         variant="outlined"
//                         color="primary"
//                       >
//                         Add Image
//                       </Button>
//                       <Button
//                         size="small"
//                         startIcon={<VideoIcon />}
//                         onClick={() => openMediaDialog(index, 'video')}
//                         variant="outlined"
//                         color="secondary"
//                       >
//                         Add Video
//                       </Button>
//                     </Stack>

//                     {/* Display Images */}
//                     {building.media?.images && building.media.images.length > 0 && (
//                       <Box sx={{ mb: 2 }}>
//                         <Typography variant="body2" fontWeight="bold" gutterBottom>
//                           Images:
//                         </Typography>
//                         <ImageList sx={{ width: '100%', height: 200 }} cols={4} rowHeight={164}>
//                           {building.media.images.map((img, imgIndex) => (
//                             <ImageListItem key={imgIndex}>
//                               <img
//                                 src={img.url}
//                                 alt={img.caption || 'Building image'}
//                                 loading="lazy"
//                                 style={{ cursor: 'pointer', objectFit: 'cover' }}
//                                 onClick={() => handlePreviewMedia(img.url, img.caption, 'image')}
//                               />
//                               <ImageListItemBar
//                                 title={img.caption || 'No caption'}
//                                 actionIcon={
//                                   <IconButton
//                                     sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
//                                     onClick={() => deleteMedia(index, 'images', imgIndex)}
//                                   >
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 }
//                               />
//                             </ImageListItem>
//                           ))}
//                         </ImageList>
//                       </Box>
//                     )}

//                     {/* Display Videos */}
//                     {building.media?.videos && building.media.videos.length > 0 && (
//                       <Box>
//                         <Typography variant="body2" fontWeight="bold" gutterBottom>
//                           Videos:
//                         </Typography>
//                         <Grid container spacing={2}>
//                           {building.media.videos.map((vid, vidIndex) => (
//                             <Grid item xs={12} sm={6} md={4} key={vidIndex}>
//                               <Card variant="outlined">
//                                 {vid.thumbnail && (
//                                   <CardMedia
//                                     component="img"
//                                     height="140"
//                                     image={vid.thumbnail}
//                                     alt={vid.caption || 'Video thumbnail'}
//                                     sx={{ cursor: 'pointer' }}
//                                     onClick={() => handlePreviewMedia(vid.url, vid.caption, 'video')}
//                                   />
//                                 )}
//                                 <CardContent>
//                                   <Typography variant="body2" noWrap>
//                                     {vid.caption || 'No caption'}
//                                   </Typography>
//                                   {vid.duration && (
//                                     <Typography variant="caption" color="text.secondary">
//                                       Duration: {vid.duration}s
//                                     </Typography>
//                                   )}
//                                   <IconButton
//                                     size="small"
//                                     color="error"
//                                     onClick={() => deleteMedia(index, 'videos', vidIndex)}
//                                     sx={{ float: 'right' }}
//                                   >
//                                     <DeleteIcon fontSize="small" />
//                                   </IconButton>
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                           ))}
//                         </Grid>
//                       </Box>
//                     )}
//                   </Grid>

//                   {/* Remove Building Button */}
//                   <Grid item xs={12}>
//                     <Button
//                       startIcon={<DeleteIcon />}
//                       onClick={() => removeBuilding(index)}
//                       color="error"
//                       variant="outlined"
//                       size="small"
//                     >
//                       Remove Building
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Card>
//             ))}
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <BriefcaseBusinessIcon color="primary" />
//               <Typography variant="h6">Health & Sanitation</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Male Toilets"
//                   name="infrastructure.healthSanitation.toilets.male"
//                   value={formData.infrastructure.healthSanitation.toilets.male}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Female Toilets"
//                   name="infrastructure.healthSanitation.toilets.female"
//                   value={formData.infrastructure.healthSanitation.toilets.female}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Disabled Friendly Toilets"
//                   name="infrastructure.healthSanitation.toilets.disabledFriendly"
//                   value={formData.infrastructure.healthSanitation.toilets.disabledFriendly}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="infrastructure.healthSanitation.drinkingWater.available"
//                       checked={formData.infrastructure.healthSanitation.drinkingWater.available}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Drinking Water Available"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="infrastructure.healthSanitation.medicalFacilities.firstAid"
//                       checked={formData.infrastructure.healthSanitation.medicalFacilities.firstAid}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="First Aid Available"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 4: Academic Programs
//   const renderAcademicProgramsStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <AcademicIcon color="primary" />
//               <Typography variant="h6">Academic Programs & Enrollment</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Total Faculties/Departments"
//                   name="academicPrograms.totalFaculties"
//                   type="number"
//                   value={formData.academicPrograms.totalFaculties}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Programs Offered
//                 </Typography>
//                 <Button startIcon={<AddIcon />} onClick={addProgram} sx={{ mb: 2 }} variant="contained">
//                   Add Program
//                 </Button>
                
//                 {formData.academicPrograms.programs.map((program, index) => (
//                   <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid item xs={11}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} md={4}>
//                             <TextField
//                               fullWidth
//                               label="Program Name"
//                               value={program.programName}
//                               onChange={(e) => updateProgram(index, 'programName', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <FormControl fullWidth size="small" variant="outlined">
//                               <InputLabel>Level</InputLabel>
//                               <Select
//                                 value={program.level}
//                                 label="Level"
//                                 onChange={(e) => updateProgram(index, 'level', e.target.value)}
//                               >
//                                 {programLevels.map(level => (
//                                   <MenuItem key={level} value={level}>{level}</MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Duration"
//                               value={program.duration}
//                               onChange={(e) => updateProgram(index, 'duration', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item xs={1}>
//                         <IconButton onClick={() => removeProgram(index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Current Enrollment
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Total Students"
//                   name="academicPrograms.enrollment.total"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.total}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Male Students"
//                   name="academicPrograms.enrollment.male"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.male}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Female Students"
//                   name="academicPrograms.enrollment.female"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.female}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Other Students"
//                   name="academicPrograms.enrollment.other"
//                   type="number"
//                   value={formData.academicPrograms.enrollment.other}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 5: Staff Information
//   const renderStaffStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <StaffIcon color="primary" />
//               <Typography variant="h6">Staff Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Academic Staff
//                 </Typography>
//                 <Button startIcon={<AddIcon />} onClick={addAcademicStaff} sx={{ mb: 2 }} variant="contained">
//                   Add Academic Staff
//                 </Button>
                
//                 {formData.staff.academic.map((staff, index) => (
//                   <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid item xs={11}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Name"
//                               value={staff.name}
//                               onChange={(e) => updateAcademicStaff(index, 'name', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Designation"
//                               value={staff.designation}
//                               onChange={(e) => updateAcademicStaff(index, 'designation', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Department"
//                               value={staff.department}
//                               onChange={(e) => updateAcademicStaff(index, 'department', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <FormControl fullWidth size="small" variant="outlined">
//                               <InputLabel>Employment Type</InputLabel>
//                               <Select
//                                 value={staff.employmentType}
//                                 label="Employment Type"
//                                 onChange={(e) => updateAcademicStaff(index, 'employmentType', e.target.value)}
//                               >
//                                 {employmentTypes.map(type => (
//                                   <MenuItem key={type} value={type}>{type}</MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item xs={1}>
//                         <IconButton onClick={() => removeAcademicStaff(index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 6: Facilities & Technology
//   const renderFacilitiesStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <TechIcon color="primary" />
//               <Typography variant="h6">Educational Tools & Technology</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Digital Classrooms"
//                   name="educationalTechnology.digitalClassrooms"
//                   type="number"
//                   value={formData.educationalTechnology.digitalClassrooms}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Computer Labs"
//                   name="educationalTechnology.computerLabs"
//                   type="number"
//                   value={formData.educationalTechnology.computerLabs}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Computers Available"
//                   name="educationalTechnology.computersAvailable"
//                   type="number"
//                   value={formData.educationalTechnology.computersAvailable}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Internet Availability
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="educationalTechnology.internetAvailability.available"
//                       checked={formData.educationalTechnology.internetAvailability.available}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Internet Available"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Internet Speed"
//                   name="educationalTechnology.internetAvailability.speed"
//                   value={formData.educationalTechnology.internetAvailability.speed}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Internet Provider"
//                   name="educationalTechnology.internetAvailability.provider"
//                   value={formData.educationalTechnology.internetAvailability.provider}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Library Resources
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Physical Books"
//                   name="educationalTechnology.libraryResources.physicalBooks"
//                   type="number"
//                   value={formData.educationalTechnology.libraryResources.physicalBooks}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="eBooks"
//                   name="educationalTechnology.libraryResources.ebooks"
//                   type="number"
//                   value={formData.educationalTechnology.libraryResources.ebooks}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Journals"
//                   name="educationalTechnology.libraryResources.journals"
//                   type="number"
//                   value={formData.educationalTechnology.libraryResources.journals}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="educationalTechnology.libraryResources.digitalDatabase"
//                       checked={formData.educationalTechnology.libraryResources.digitalDatabase}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Digital Database"
//                 />
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 7: Project Planning
//   const renderProjectPlanningStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <ProjectIcon color="primary" />
//               <Typography variant="h6">Project Planning</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Immediate Construction Planning"
//                   name="projectPlanning.immediateConstruction"
//                   value={formData.projectPlanning.immediateConstruction}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Future Construction Planning"
//                   name="projectPlanning.futureConstruction"
//                   value={formData.projectPlanning.futureConstruction}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Priority Work
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Priority 1 (P1)"
//                   name="projectPlanning.priorityWork.p1"
//                   value={formData.projectPlanning.priorityWork.p1}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Priority 2 (P2)"
//                   name="projectPlanning.priorityWork.p2"
//                   value={formData.projectPlanning.priorityWork.p2}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Priority 3 (P3)"
//                   name="projectPlanning.priorityWork.p3"
//                   value={formData.projectPlanning.priorityWork.p3}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Ongoing Projects
//                 </Typography>
//                 <Button startIcon={<AddIcon />} onClick={addProject} sx={{ mb: 2 }} variant="contained">
//                   Add Project
//                 </Button>
                
//                 {formData.projectPlanning.ongoingProjects.map((project, index) => (
//                   <Card key={index} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}` }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid item xs={11}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} md={3}>
//                             <TextField
//                               fullWidth
//                               label="Project Name"
//                               value={project.projectName}
//                               onChange={(e) => updateProject(index, 'projectName', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={2}>
//                             <TextField
//                               fullWidth
//                               label="Start Date"
//                               type="date"
//                               value={project.startDate}
//                               onChange={(e) => updateProject(index, 'startDate', e.target.value)}
//                               InputLabelProps={{ shrink: true }}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={2}>
//                             <TextField
//                               fullWidth
//                               label="Expected Completion"
//                               type="date"
//                               value={project.expectedCompletion}
//                               onChange={(e) => updateProject(index, 'expectedCompletion', e.target.value)}
//                               InputLabelProps={{ shrink: true }}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={2}>
//                             <TextField
//                               fullWidth
//                               label="Budget"
//                               type="number"
//                               value={project.budget}
//                               onChange={(e) => updateProject(index, 'budget', e.target.value)}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={3}>
//                             <FormControl fullWidth size="small" variant="outlined">
//                               <InputLabel>Status</InputLabel>
//                               <Select
//                                 value={project.status}
//                                 label="Status"
//                                 onChange={(e) => updateProject(index, 'status', e.target.value)}
//                               >
//                                 {projectStatuses.map(status => (
//                                   <MenuItem key={status} value={status}>{status}</MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </Grid>

//                           {/* Project Attachments Section */}
//                           <Grid item xs={12}>
//                             <Divider sx={{ my: 2 }} />
//                             <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
//                               Project Attachments
//                             </Typography>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//                               <Button
//                                 variant="outlined"
//                                 component="label"
//                                 startIcon={<AttachFileIcon />}
//                                 disabled={uploadingAttachments[index]}
//                               >
//                                 {uploadingAttachments[index] ? 'Uploading...' : 'Upload Attachment'}
//                                 <input
//                                   type="file"
//                                   hidden
//                                   accept="image/*,video/*,.pdf"
//                                   onChange={(e) => handleProjectAttachmentUpload(index, e)}
//                                 />
//                               </Button>
//                               {project.attachments && (
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                   <Chip
//                                     label="Attachment Uploaded"
//                                     color="success"
//                                     variant="outlined"
//                                     onDelete={() => updateProject(index, 'attachments', '')}
//                                   />
//                                   <Button
//                                     size="small"
//                                     onClick={() => window.open(project.attachments, '_blank')}
//                                   >
//                                     View
//                                   </Button>
//                                 </Box>
//                               )}
//                             </Box>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item xs={1}>
//                         <IconButton onClick={() => removeProject(index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 ))}
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   // Step 8: Review & Submit
//   const renderReviewStep = () => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <ReviewIcon color="primary" />
//               <Typography variant="h6">Review College Information</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   Please review all information before submitting the form.
//                 </Typography>
//               </Grid>

//               <Grid item xs={12}>
//                 <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
//                   <Typography variant="h6" gutterBottom>College Summary</Typography>
//                   <Typography><strong>College Name:</strong> {formData.collegeName}</Typography>
//                   <Typography><strong>Campus Type:</strong> {formData.campusType}</Typography>
//                   <Typography><strong>Location:</strong> {formData.location.district}, {formData.location.province}</Typography>
//                   <Typography><strong>Total Buildings:</strong> {formData.infrastructure.buildings.length}</Typography>
//                   <Typography><strong>Total Programs:</strong> {formData.academicPrograms.programs.length}</Typography>
//                   <Typography><strong>Total Images:</strong> {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.images?.length || 0), 0)}</Typography>
//                   <Typography><strong>Total Videos:</strong> {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.videos?.length || 0), 0)}</Typography>
//                   <Typography><strong>Total Projects:</strong> {formData.projectPlanning.ongoingProjects.length}</Typography>
//                   <Typography><strong>Projects with Attachments:</strong> {formData.projectPlanning.ongoingProjects.filter(p => p.attachments).length}</Typography>
//                 </Card>
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       </CardContent>
//     </Card>
//   );

//   const getStepContent = (step: number) => {
//     switch (step) {
//       case 0: return renderBasicInfoStep();
//       case 1: return renderLocationStep();
//       case 2: return renderInfrastructureStep();
//       case 3: return renderAcademicProgramsStep();
//       case 4: return renderStaffStep();
//       case 5: return renderFacilitiesStep();
//       case 6: return renderProjectPlanningStep();
//       case 7: return renderReviewStep();
//       default: return null;
//     }
//   };

//   const isStepValid = (step: number): boolean => {
//     switch (step) {
//       case 0:
//         return !!formData.collegeName && !!formData.campusType && !!formData.establishmentDate && !!formData.principalInfo.name;
//       case 1:
//         return !!formData.location.province && !!formData.location.district && !!formData.location.localLevel && !!formData.location.wardNo;
//       default:
//         return true;
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
//       <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
//         <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
//           Tribhuvan University
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
//           College Information Collection Form
//         </Typography>
        
//         <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
//           {steps.map((label, index) => (
//             <Step key={label}>
//               <StepLabel icon={sectionIcons[index as keyof typeof sectionIcons]}>
//                 {label}
//               </StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
//             {success}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Box sx={{ minHeight: 400 }}>
//             {getStepContent(activeStep)}
//           </Box>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 1 }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//               size="large"
//             >
//               Back
//             </Button>
            
//             <Box>
//               {activeStep === steps.length - 1 ? (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                   size="large"
//                   startIcon={loading ? <CircularProgress size={20} /> : null}
//                   sx={{ px: 4 }}
//                 >
//                   {loading ? 'Submitting...' : 'Submit Form'}
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   disabled={!isStepValid(activeStep)}
//                   size="large"
//                   sx={{ px: 4 }}
//                 >
//                   Next
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </form>
//       </Paper>

//       {/* Add Media Dialog */}
//       <Dialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {mediaType === 'image' ? <ImageIcon color="primary" /> : <VideoIcon color="secondary" />}
//             Add {mediaType === 'image' ? 'Image' : 'Video'}
//           </Box>
//           <IconButton
//             onClick={() => setMediaDialogOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Media URL"
//                 value={mediaUrl}
//                 onChange={(e) => setMediaUrl(e.target.value)}
//                 required
//                 helperText="Enter the URL of the image or video"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Caption"
//                 value={mediaCaption}
//                 onChange={(e) => setMediaCaption(e.target.value)}
//                 multiline
//                 rows={2}
//                 variant="outlined"
//               />
//             </Grid>
//             {mediaType === 'video' && (
//               <>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Duration (seconds)"
//                     type="number"
//                     value={mediaDuration}
//                     onChange={(e) => setMediaDuration(e.target.value)}
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Thumbnail URL"
//                     value={mediaThumbnail}
//                     onChange={(e) => setMediaThumbnail(e.target.value)}
//                     variant="outlined"
//                   />
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setMediaDialogOpen(false)} variant="outlined">
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleAddMedia} 
//             variant="contained" 
//             disabled={!mediaUrl}
//             startIcon={<CloudUploadIcon />}
//           >
//             Add {mediaType === 'image' ? 'Image' : 'Video'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Preview Media Dialog */}
//       <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {previewMedia?.caption || 'Media Preview'}
//           <IconButton
//             onClick={() => setPreviewOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           {previewMedia?.type === 'image' ? (
//             <img 
//               src={previewMedia.url} 
//               alt={previewMedia.caption} 
//               style={{ width: '100%', height: 'auto', borderRadius: 8 }} 
//             />
//           ) : (
//             <video 
//               src={previewMedia?.url} 
//               controls 
//               style={{ width: '100%', height: 'auto', borderRadius: 8 }} 
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default CollegeDataForm;


import React, { useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { 
  School, 
  MapPin, 
  Building, 
  GraduationCap, 
  Users, 
  Computer, 
  Hammer, 
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Video,
  Eye,
  X,
  Phone,
  Mail,
  Globe,
  Calendar,
  FileText,
  Camera,
  PlayCircle,
  Paperclip,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// Building Media Interface
interface BuildingMedia {
  images: Array<{
    url: string;
    caption: string;
    uploadDate?: Date;
    fileSize?: number;
    mimeType?: string;
  }>;
  videos: Array<{
    url: string;
    caption: string;
    uploadDate?: Date;
    fileSize?: number;
    duration?: number;
    mimeType?: string;
    thumbnail?: string;
  }>;
}

// Building Interface with Media
interface Building {
  buildingName: string;
  totalRooms: string;
  classrooms: string;
  labs: string;
  library: string;
  administrative: string;
  other: string;
  condition: string;
  media?: BuildingMedia;
}

// Project Interface with Attachments
interface Project {
  projectName: string;
  startDate: string;
  expectedCompletion: string;
  budget: string;
  attachments: string;
  status: string;
}

// Main Form Interface
interface CollegeFormData {
  collegeName: string;
  campusType: string;
  establishmentDate: string;
  collegeId: string;
  principalInfo: {
    name: string;
    contactNumber: string;
    email: string;
  };
  contactInfo: {
    officialPhone: string;
    officialEmail: string;
    website: string;
  };
  staffContacts: {
    adminChief: {
      name: string;
      mobile: string;
    };
    accountChief: {
      name: string;
      mobile: string;
    };
  };
  dataCollectionContact: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
  location: {
    province: string;
    district: string;
    localLevel: string;
    wardNo: string;
    streetTole: string;
    landmark: string;
    latitude: string;
    longitude: string;
    googleMapsLink: string;
  };
  infrastructure: {
    landArea: {
      traditionalUnits: {
        bigaha: string;
        katha: string;
        dhur: string;
        ropani: string;
        ana: string;
        daam: string;
        paisa: string;
      };
      squareMeters: string;
      acquisitionDate: string;
      taxClearanceStatus: string;
      haalsabikStatus: string;
    };
    landOwnership: {
      lalpurja: {
        area: string;
        address: string;
      };
      bhogadhikar: {
        area: string;
        address: string;
      };
      localGovernment: {
        area: string;
        address: string;
      };
      other: {
        area: string;
        address: string;
      };
    };
    landUse: {
      buildingArea: string;
      playgroundArea: string;
      naturalForestArea: string;
      plantationArea: string;
      leasedArea: string;
      leaseIncome: string;
      encroachmentExists: boolean;
      encroachmentDetails: string;
      protectionSteps: string;
      commercialUseSuggestions: string;
      commercialPlans: string;
      masterPlanExists: boolean;
      masterPlanAttachment: string;
      suggestions: string;
    };
    buildings: Building[];
    healthSanitation: {
      toilets: {
        male: string;
        female: string;
        disabledFriendly: string;
      };
      drinkingWater: {
        available: boolean;
        qualityTested: boolean;
        purificationSystem: string;
      };
      wasteManagement: {
        segregation: boolean;
        disposalMethod: string;
        recycling: boolean;
      };
      medicalFacilities: {
        firstAid: boolean;
        healthPost: boolean;
        staffAvailable: boolean;
      };
    };
  };
  academicPrograms: {
    totalFaculties: string;
    programs: Array<{
      programName: string;
      level: string;
      duration: string;
      affiliatedTo: string;
    }>;
    enrollment: {
      total: string;
      male: string;
      female: string;
      other: string;
      programBreakdown: Array<{
        programName: string;
        total: string;
        male: string;
        female: string;
        other: string;
      }>;
    };
  };
  projectPlanning: {
    immediateConstruction: string;
    futureConstruction: string;
    priorityWork: {
      p1: string;
      p2: string;
      p3: string;
    };
    ongoingProjects: Project[];
  };
  staff: {
    academic: Array<{
      name: string;
      designation: string;
      department: string;
      qualification: string;
      experience: string;
      employmentType: string;
    }>;
    administrative: Array<{
      name: string;
      designation: string;
      department: string;
      employmentType: string;
    }>;
  };
  educationalTechnology: {
    digitalClassrooms: string;
    computerLabs: string;
    computersAvailable: string;
    internetAvailability: {
      available: boolean;
      speed: string;
      provider: string;
    };
    libraryResources: {
      physicalBooks: string;
      ebooks: string;
      journals: string;
      digitalDatabase: boolean;
    };
    learningManagementSystem: {
      name: string;
      active: boolean;
    };
  };
  formStatus: string;
}

const initialFormData: CollegeFormData = {
  collegeName: '',
  campusType: '',
  establishmentDate: '',
  collegeId: '',
  principalInfo: {
    name: '',
    contactNumber: '',
    email: ''
  },
  contactInfo: {
    officialPhone: '',
    officialEmail: '',
    website: ''
  },
  staffContacts: {
    adminChief: {
      name: '',
      mobile: ''
    },
    accountChief: {
      name: '',
      mobile: ''
    }
  },
  dataCollectionContact: {
    name: '',
    designation: '',
    phone: '',
    email: ''
  },
  location: {
    province: '',
    district: '',
    localLevel: '',
    wardNo: '',
    streetTole: '',
    landmark: '',
    latitude: '',
    longitude: '',
    googleMapsLink: ''
  },
  infrastructure: {
    landArea: {
      traditionalUnits: {
        bigaha: '',
        katha: '',
        dhur: '',
        ropani: '',
        ana: '',
        daam: '',
        paisa: ''
      },
      squareMeters: '',
      acquisitionDate: '',
      taxClearanceStatus: '',
      haalsabikStatus: ''
    },
    landOwnership: {
      lalpurja: {
        area: '',
        address: ''
      },
      bhogadhikar: {
        area: '',
        address: ''
      },
      localGovernment: {
        area: '',
        address: ''
      },
      other: {
        area: '',
        address: ''
      }
    },
    landUse: {
      buildingArea: '',
      playgroundArea: '',
      naturalForestArea: '',
      plantationArea: '',
      leasedArea: '',
      leaseIncome: '',
      encroachmentExists: false,
      encroachmentDetails: '',
      protectionSteps: '',
      commercialUseSuggestions: '',
      commercialPlans: '',
      masterPlanExists: false,
      masterPlanAttachment: '',
      suggestions: ''
    },
    buildings: [],
    healthSanitation: {
      toilets: {
        male: '',
        female: '',
        disabledFriendly: ''
      },
      drinkingWater: {
        available: false,
        qualityTested: false,
        purificationSystem: ''
      },
      wasteManagement: {
        segregation: false,
        disposalMethod: '',
        recycling: false
      },
      medicalFacilities: {
        firstAid: false,
        healthPost: false,
        staffAvailable: false
      }
    }
  },
  academicPrograms: {
    totalFaculties: '',
    programs: [],
    enrollment: {
      total: '',
      male: '',
      female: '',
      other: '',
      programBreakdown: []
    }
  },
  projectPlanning: {
    immediateConstruction: '',
    futureConstruction: '',
    priorityWork: {
      p1: '',
      p2: '',
      p3: ''
    },
    ongoingProjects: []
  },
  staff: {
    academic: [],
    administrative: []
  },
  educationalTechnology: {
    digitalClassrooms: '',
    computerLabs: '',
    computersAvailable: '',
    internetAvailability: {
      available: false,
      speed: '',
      provider: ''
    },
    libraryResources: {
      physicalBooks: '',
      ebooks: '',
      journals: '',
      digitalDatabase: false
    },
    learningManagementSystem: {
      name: '',
      active: false
    }
  },
  formStatus: 'Draft'
};

// Constants
const campusTypes = [
  'Constituent Campus',
  'Affiliated College',
  'Community Campus',
  'Private College'
];

const provinces = [
  'Province 1',
  'Province 2',
  'Bagmati Province',
  'Gandaki Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province'
];

const programLevels = ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'];
const employmentTypes = ['Permanent', 'Contract', 'Part-time'];
const projectStatuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];
const buildingConditions = ['Excellent', 'Good', 'Fair', 'Poor'];

const steps = [
  { id: 0, title: 'Basic Information', icon: School, color: 'text-blue-600' },
  { id: 1, title: 'Location Details', icon: MapPin, color: 'text-green-600' },
  { id: 2, title: 'Infrastructure & Land', icon: Building, color: 'text-purple-600' },
  { id: 3, title: 'Academic Programs', icon: GraduationCap, color: 'text-orange-600' },
  { id: 4, title: 'Staff Information', icon: Users, color: 'text-cyan-600' },
  { id: 5, title: 'Facilities & Technology', icon: Computer, color: 'text-indigo-600' },
  { id: 6, title: 'Project Planning', icon: Hammer, color: 'text-red-600' },
  { id: 7, title: 'Review & Submit', icon: CheckCircle, color: 'text-emerald-600' }
];

const CollegeDataForm: React.FC = () => {
  const [formData, setFormData] = useState<CollegeFormData>(initialFormData);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Media dialog state
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaDuration, setMediaDuration] = useState('');
  const [mediaThumbnail, setMediaThumbnail] = useState('');
  
  // Image preview dialog
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<{ url: string; caption: string; type: 'image' | 'video' } | null>(null);

  // Project attachment upload state
  const [uploadingAttachments, setUploadingAttachments] = useState<{[key: number]: boolean}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name.includes('.')) {
      const path = name.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current: any = newData;
        
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        
        current[path[path.length - 1]] = type === 'checkbox' ? checked : value;
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Building handlers
  const addBuilding = (e) => {

    e.stopPropagation()
    setFormData(prev => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        buildings: [
          ...prev.infrastructure.buildings,
          {
            buildingName: '',
            totalRooms: '',
            classrooms: '',
            labs: '',
            library: '',
            administrative: '',
            other: '',
            condition: 'Good',
            media: {
              images: [],
              videos: []
            }
          }
        ]
      }
    }));
  };

  const updateBuilding = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newBuildings = [...prev.infrastructure.buildings];
      newBuildings[index] = { ...newBuildings[index], [field]: value };
      return {
        ...prev,
        infrastructure: { ...prev.infrastructure, buildings: newBuildings }
      };
    });
  };

  const removeBuilding = (index: number) => {
    setFormData(prev => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        buildings: prev.infrastructure.buildings.filter((_, i) => i !== index)
      }
    }));
  };

  // Media handlers
  const openMediaDialog = (buildingIndex: number, type: 'image' | 'video') => {
    setSelectedBuildingIndex(buildingIndex);
    setMediaType(type);
    setMediaUrl('');
    setMediaCaption('');
    setMediaDuration('');
    setMediaThumbnail('');
    setMediaDialogOpen(true);
  };

  const handleAddMedia = () => {
    if (selectedBuildingIndex === null || !mediaUrl) return;

    setFormData(prev => {
      const newBuildings = [...prev.infrastructure.buildings];
      const building = newBuildings[selectedBuildingIndex];
      
      if (!building.media) {
        building.media = { images: [], videos: [] };
      }

      if (mediaType === 'image') {
        building.media.images.push({
          url: mediaUrl,
          caption: mediaCaption,
          uploadDate: new Date()
        });
      } else {
        building.media.videos.push({
          url: mediaUrl,
          caption: mediaCaption,
          duration: mediaDuration ? parseInt(mediaDuration) : undefined,
          thumbnail: mediaThumbnail,
          uploadDate: new Date()
        });
      }

      return {
        ...prev,
        infrastructure: { ...prev.infrastructure, buildings: newBuildings }
      };
    });

    setMediaDialogOpen(false);
  };

  const deleteMedia = (buildingIndex: number, mediaType: 'images' | 'videos', mediaIndex: number) => {
    setFormData(prev => {
      const newBuildings = [...prev.infrastructure.buildings];
      const building = newBuildings[buildingIndex];
      
      if (building.media) {
        building.media[mediaType].splice(mediaIndex, 1);
      }

      return {
        ...prev,
        infrastructure: { ...prev.infrastructure, buildings: newBuildings }
      };
    });
  };

  const handlePreviewMedia = (url: string, caption: string, type: 'image' | 'video') => {
    setPreviewMedia({ url, caption, type });
    setPreviewOpen(true);
  };

  // Program handlers
  const addProgram = () => {
    setFormData(prev => ({
      ...prev,
      academicPrograms: {
        ...prev.academicPrograms,
        programs: [
          ...prev.academicPrograms.programs,
          {
            programName: '',
            level: 'Bachelor',
            duration: '',
            affiliatedTo: ''
          }
        ]
      }
    }));
  };

  const updateProgram = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newPrograms = [...prev.academicPrograms.programs];
      newPrograms[index] = { ...newPrograms[index], [field]: value };
      return {
        ...prev,
        academicPrograms: { ...prev.academicPrograms, programs: newPrograms }
      };
    });
  };

  const removeProgram = (index: number) => {
    setFormData(prev => ({
      ...prev,
      academicPrograms: {
        ...prev.academicPrograms,
        programs: prev.academicPrograms.programs.filter((_, i) => i !== index)
      }
    }));
  };

  // Staff handlers
  const addAcademicStaff = () => {
    setFormData(prev => ({
      ...prev,
      staff: {
        ...prev.staff,
        academic: [
          ...prev.staff.academic,
          {
            name: '',
            designation: '',
            department: '',
            qualification: '',
            experience: '',
            employmentType: 'Permanent'
          }
        ]
      }
    }));
  };

  const updateAcademicStaff = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newStaff = [...prev.staff.academic];
      newStaff[index] = { ...newStaff[index], [field]: value };
      return {
        ...prev,
        staff: { ...prev.staff, academic: newStaff }
      };
    });
  };

  const removeAcademicStaff = (index: number) => {
    setFormData(prev => ({
      ...prev,
      staff: {
        ...prev.staff,
        academic: prev.staff.academic.filter((_, i) => i !== index)
      }
    }));
  };

  // Project handlers
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projectPlanning: {
        ...prev.projectPlanning,
        ongoingProjects: [
          ...prev.projectPlanning.ongoingProjects,
          {
            projectName: '',
            startDate: '',
            expectedCompletion: '',
            budget: '',
            attachments: '',
            status: 'Planning'
          }
        ]
      }
    }));
  };

  const updateProject = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newProjects = [...prev.projectPlanning.ongoingProjects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return {
        ...prev,
        projectPlanning: { ...prev.projectPlanning, ongoingProjects: newProjects }
      };
    });
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projectPlanning: {
        ...prev.projectPlanning,
        ongoingProjects: prev.projectPlanning.ongoingProjects.filter((_, i) => i !== index)
      }
    }));
  };

  // Project Attachment Upload Handler
  const handleProjectAttachmentUpload = async (projectIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid file (JPEG, PNG, GIF, MP4, AVI, MOV, PDF)');
      return;
    }

    // Validate file size (10MB max for Cloudinary)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploadingAttachments(prev => ({ ...prev, [projectIndex]: true }));

    try {
      // Cloudinary Configuration
      const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
      const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
      
      // Create FormData for Cloudinary upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      // Add folder structure
      const folderPath = `tu-projects/${formData.collegeId || 'default'}/attachments`;
      uploadFormData.append('folder', folderPath);
      
      // Add public_id
      const publicId = `project_attachment_${formData.collegeId || 'college'}_${Date.now()}`;
      uploadFormData.append('public_id', publicId);

      // Upload to Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        const errorText = await cloudinaryResponse.text();
        console.error('Cloudinary upload failed:', errorText);
        throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.status}`);
      }

      const cloudinaryResult = await cloudinaryResponse.json();

      // Update project attachment
      setFormData(prev => ({
        ...prev,
        projectPlanning: {
          ...prev.projectPlanning,
          ongoingProjects: prev.projectPlanning.ongoingProjects.map((project, index) => 
            index === projectIndex 
              ? { ...project, attachments: cloudinaryResult.secure_url }
              : project
          )
        }
      }));
      
      setSuccess('Project attachment uploaded successfully');
    } catch (error) {
      console.error('Project attachment upload error:', error);
      setError('Failed to upload project attachment. Please try again.');
    } finally {
      setUploadingAttachments(prev => ({ ...prev, [projectIndex]: false }));
      event.target.value = '';
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    console.log("submit called")
    e.preventDefault();
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://172.25.205.32/api/collegeform', formData);
      
      if (response.data.success) {
        setSuccess('College form submitted successfully!');
        setFormData(initialFormData);
        setActiveStep(0);
      } else {
        setError(response.data.message || 'Failed to submit form');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  // Step 1: Basic Information
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <School className="h-6 w-6" />
            College Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-sm font-medium flex items-center gap-2">
                <School className="h-4 w-4" />
                College Name *
              </Label>
              <Input
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                placeholder="Enter college name"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campusType" className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                Campus Type *
              </Label>
              <Select 
                value={formData.campusType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, campusType: value }))}
              >
                <SelectTrigger className="border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select campus type" />
                </SelectTrigger>
                <SelectContent>
                  {campusTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="establishmentDate" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Establishment Date *
              </Label>
              <Input
                id="establishmentDate"
                name="establishmentDate"
                type="date"
                value={formData.establishmentDate}
                onChange={handleInputChange}
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collegeId" className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                College ID
              </Label>
              <Input
                id="collegeId"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleInputChange}
                placeholder="Enter college ID"
                className="border-2 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Users className="h-6 w-6" />
            Principal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principalName" className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Principal Name *
              </Label>
              <Input
                id="principalName"
                name="principalInfo.name"
                value={formData.principalInfo.name}
                onChange={handleInputChange}
                placeholder="Enter principal name"
                className="border-2 focus:border-green-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="principalContact" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number
              </Label>
              <Input
                id="principalContact"
                name="principalInfo.contactNumber"
                value={formData.principalInfo.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter contact number"
                className="border-2 focus:border-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="principalEmail" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="principalEmail"
                name="principalInfo.email"
                type="email"
                value={formData.principalInfo.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="border-2 focus:border-green-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
          <CardTitle className="flex items-center gap-3 text-purple-800">
            <Phone className="h-6 w-6" />
            Staff Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin Chief
              </h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="adminChiefName" className="text-sm font-medium">Name</Label>
                  <Input
                    id="adminChiefName"
                    name="staffContacts.adminChief.name"
                    value={formData.staffContacts.adminChief.name}
                    onChange={handleInputChange}
                    placeholder="Enter admin chief name"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminChiefMobile" className="text-sm font-medium">Mobile</Label>
                  <Input
                    id="adminChiefMobile"
                    name="staffContacts.adminChief.mobile"
                    value={formData.staffContacts.adminChief.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Account Chief
              </h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="accountChiefName" className="text-sm font-medium">Name</Label>
                  <Input
                    id="accountChiefName"
                    name="staffContacts.accountChief.name"
                    value={formData.staffContacts.accountChief.name}
                    onChange={handleInputChange}
                    placeholder="Enter account chief name"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountChiefMobile" className="text-sm font-medium">Mobile</Label>
                  <Input
                    id="accountChiefMobile"
                    name="staffContacts.accountChief.mobile"
                    value={formData.staffContacts.accountChief.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 2: Location Details
  const renderLocationStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-3 text-green-800">
            <MapPin className="h-6 w-6" />
            College Location Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Province *
              </Label>
              <Select 
                value={formData.location.province} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, province: value }
                }))}
              >
                <SelectTrigger className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>{province}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-medium">District *</Label>
              <Input
                id="district"
                name="location.district"
                value={formData.location.district}
                onChange={handleInputChange}
                placeholder="Enter district name"
                className="border-2 focus:border-green-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="localLevel" className="text-sm font-medium">Municipality/Rural Municipality *</Label>
              <Input
                id="localLevel"
                name="location.localLevel"
                value={formData.location.localLevel}
                onChange={handleInputChange}
                placeholder="Enter municipality/rural municipality"
                className="border-2 focus:border-green-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wardNo" className="text-sm font-medium">Ward No. *</Label>
              <Input
                id="wardNo"
                name="location.wardNo"
                value={formData.location.wardNo}
                onChange={handleInputChange}
                placeholder="Enter ward number"
                className="border-2 focus:border-green-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="streetTole" className="text-sm font-medium">Street/Tole Name</Label>
              <Input
                id="streetTole"
                name="location.streetTole"
                value={formData.location.streetTole}
                onChange={handleInputChange}
                placeholder="Enter street/tole name"
                className="border-2 focus:border-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="landmark" className="text-sm font-medium">Landmark</Label>
              <Input
                id="landmark"
                name="location.landmark"
                value={formData.location.landmark}
                onChange={handleInputChange}
                placeholder="Enter landmark"
                className="border-2 focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleMapsLink" className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Google Maps Link
            </Label>
            <div className="flex gap-2">
              <Input
                id="googleMapsLink"
                name="location.googleMapsLink"
                value={formData.location.googleMapsLink || ''}
                onChange={handleInputChange}
                placeholder="https://maps.google.com/..."
                className="border-2 focus:border-green-500 flex-1"
              />
              {formData.location.googleMapsLink && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(formData.location.googleMapsLink, '_blank')}
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Phone className="h-6 w-6" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="officialPhone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Official Phone
              </Label>
              <Input
                id="officialPhone"
                name="contactInfo.officialPhone"
                value={formData.contactInfo.officialPhone}
                onChange={handleInputChange}
                placeholder="Enter official phone"
                className="border-2 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officialEmail" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Official Email
              </Label>
              <Input
                id="officialEmail"
                name="contactInfo.officialEmail"
                type="email"
                value={formData.contactInfo.officialEmail}
                onChange={handleInputChange}
                placeholder="Enter official email"
                className="border-2 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                College Website
              </Label>
              <Input
                id="website"
                name="contactInfo.website"
                value={formData.contactInfo.website}
                onChange={handleInputChange}
                placeholder="Enter website URL"
                className="border-2 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 3: Infrastructure & Land with Media Support
  const renderInfrastructureStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
          <CardTitle className="flex items-center gap-3 text-purple-800">
            <Building className="h-6 w-6" />
            Buildings & Rooms (with Media)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Button
            onClick={(e)=>{e.stopPropagation(); e.preventDefault();addBuilding(e)}} 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Building
          </Button>
          
          {formData.infrastructure.buildings.map((building, index) => (
            <Card key={index} className="border-2 border-purple-200 bg-purple-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-purple-700 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Building #{index + 1}
                  </span>
                  <Button
                    onClick={() => removeBuilding(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Building Name</Label>
                    <Input
                      value={building.buildingName}
                      onChange={(e) => updateBuilding(index, 'buildingName', e.target.value)}
                      placeholder="Enter building name"
                      className="border-2 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Total Rooms</Label>
                    <Input
                      type="number"
                      value={building.totalRooms}
                      onChange={(e) => updateBuilding(index, 'totalRooms', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Classrooms</Label>
                    <Input
                      type="number"
                      value={building.classrooms}
                      onChange={(e) => updateBuilding(index, 'classrooms', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Labs</Label>
                    <Input
                      type="number"
                      value={building.labs}
                      onChange={(e) => updateBuilding(index, 'labs', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Condition</Label>
                    <Select 
                      value={building.condition} 
                      onValueChange={(value) => updateBuilding(index, 'condition', value)}
                    >
                      <SelectTrigger className="border-2 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {buildingConditions.map(condition => (
                          <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Building Media
                    </h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {building.media?.images?.length || 0} Images
                      </Badge>
                      <Badge variant="outline" className="border-red-300 text-red-700">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        {building.media?.videos?.length || 0} Videos
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={(e) =>{e.stopPropagation(); e.preventDefault(); openMediaDialog(index, 'image')}}
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <Button
                      onClick={(e) => {e.stopPropagation(); e.preventDefault();openMediaDialog(index, 'video')}}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                  </div>

                  {/* Display Images */}
                  {building.media?.images && building.media.images.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Images:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {building.media.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <img
                              src={img.url}
                              alt={img.caption || 'Building image'}
                              className="w-full h-32 object-cover rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-colors"
                              onClick={() => handlePreviewMedia(img.url, img.caption, 'image')}
                            />
                            <Button
                              onClick={() => deleteMedia(index, 'images', imgIndex)}
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            {img.caption && (
                              <p className="text-xs text-gray-600 mt-1 truncate">{img.caption}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display Videos */}
                  {building.media?.videos && building.media.videos.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Videos:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {building.media.videos.map((vid, vidIndex) => (
                          <Card key={vidIndex} className="border-2 border-gray-200">
                            <CardContent className="p-3">
                              {vid.thumbnail && (
                                <img
                                  src={vid.thumbnail}
                                  alt={vid.caption || 'Video thumbnail'}
                                  className="w-full h-24 object-cover rounded cursor-pointer"
                                  onClick={() => handlePreviewMedia(vid.url, vid.caption, 'video')}
                                />
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <div>
                                  <p className="text-sm font-medium truncate">{vid.caption || 'No caption'}</p>
                                  {vid.duration && (
                                    <p className="text-xs text-gray-500">Duration: {vid.duration}s</p>
                                  )}
                                </div>
                                <Button
                                  onClick={() => deleteMedia(index, 'videos', vidIndex)}
                                  variant="destructive"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Building className="h-6 w-6" />
            Health & Sanitation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Male Toilets</Label>
              <Input
                name="infrastructure.healthSanitation.toilets.male"
                value={formData.infrastructure.healthSanitation.toilets.male}
                onChange={handleInputChange}
                placeholder="Number of male toilets"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Female Toilets</Label>
              <Input
                name="infrastructure.healthSanitation.toilets.female"
                value={formData.infrastructure.healthSanitation.toilets.female}
                onChange={handleInputChange}
                placeholder="Number of female toilets"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Disabled Friendly Toilets</Label>
              <Input
                name="infrastructure.healthSanitation.toilets.disabledFriendly"
                value={formData.infrastructure.healthSanitation.toilets.disabledFriendly}
                onChange={handleInputChange}
                placeholder="Number of disabled friendly toilets"
                className="border-2 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="drinkingWater"
                name="infrastructure.healthSanitation.drinkingWater.available"
                checked={formData.infrastructure.healthSanitation.drinkingWater.available}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    infrastructure: {
                      ...prev.infrastructure,
                      healthSanitation: {
                        ...prev.infrastructure.healthSanitation,
                        drinkingWater: {
                          ...prev.infrastructure.healthSanitation.drinkingWater,
                          available: checked
                        }
                      }
                    }
                  }))
                }
              />
              <Label htmlFor="drinkingWater" className="text-sm font-medium">
                Drinking Water Available
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="firstAid"
                name="infrastructure.healthSanitation.medicalFacilities.firstAid"
                checked={formData.infrastructure.healthSanitation.medicalFacilities.firstAid}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    infrastructure: {
                      ...prev.infrastructure,
                      healthSanitation: {
                        ...prev.infrastructure.healthSanitation,
                        medicalFacilities: {
                          ...prev.infrastructure.healthSanitation.medicalFacilities,
                          firstAid: checked
                        }
                      }
                    }
                  }))
                }
              />
              <Label htmlFor="firstAid" className="text-sm font-medium">
                First Aid Available
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 4: Academic Programs
  const renderAcademicProgramsStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-orange-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="flex items-center gap-3 text-orange-800">
            <GraduationCap className="h-6 w-6" />
            Academic Programs & Enrollment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="totalFaculties" className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              Total Faculties/Departments
            </Label>
            <Input
              id="totalFaculties"
              name="academicPrograms.totalFaculties"
              type="number"
              value={formData.academicPrograms.totalFaculties}
              onChange={handleInputChange}
              placeholder="Enter total number of faculties"
              className="border-2 focus:border-orange-500"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Programs Offered
              </h4>
              <Button 
                onClick={(e)=>{e.stopPropagation(); e.preventDefault();addProgram()}}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </div>
            
            {formData.academicPrograms.programs.map((program, index) => (
              <Card key={index} className="border-2 border-orange-200 bg-orange-50/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-orange-700">Program #{index + 1}</h5>
                    <Button
                      onClick={() => removeProgram(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Program Name</Label>
                      <Input
                        value={program.programName}
                        onChange={(e) => updateProgram(index, 'programName', e.target.value)}
                        placeholder="Enter program name"
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Level</Label>
                      <Select 
                        value={program.level} 
                        onValueChange={(value) => updateProgram(index, 'level', value)}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {programLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Duration</Label>
                      <Input
                        value={program.duration}
                        onChange={(e) => updateProgram(index, 'duration', e.target.value)}
                        placeholder="e.g., 4 years"
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-orange-700 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current Enrollment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Total Students</Label>
                <Input
                  name="academicPrograms.enrollment.total"
                  type="number"
                  value={formData.academicPrograms.enrollment.total}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="border-2 focus:border-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Male Students</Label>
                <Input
                  name="academicPrograms.enrollment.male"
                  type="number"
                  value={formData.academicPrograms.enrollment.male}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="border-2 focus:border-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Female Students</Label>
                <Input
                  name="academicPrograms.enrollment.female"
                  type="number"
                  value={formData.academicPrograms.enrollment.female}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="border-2 focus:border-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Other Students</Label>
                <Input
                  name="academicPrograms.enrollment.other"
                  type="number"
                  value={formData.academicPrograms.enrollment.other}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="border-2 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 5: Staff Information
  const renderStaffStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-cyan-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardTitle className="flex items-center gap-3 text-cyan-800">
            <Users className="h-6 w-6" />
            Staff Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-cyan-700 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Staff
              </h4>
              <Button 
                onClick={(e)=>{
                  e.stopPropagation(); e.preventDefault();
                  addAcademicStaff()} }
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Academic Staff
              </Button>
            </div>
            
            {formData.staff.academic.map((staff, index) => (
              <Card key={index} className="border-2 border-cyan-200 bg-cyan-50/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-cyan-700">Academic Staff #{index + 1}</h5>
                    <Button
                      onClick={() => removeAcademicStaff(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Name</Label>
                      <Input
                        value={staff.name}
                        onChange={(e) => updateAcademicStaff(index, 'name', e.target.value)}
                        placeholder="Enter staff name"
                        className="border-2 focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Designation</Label>
                      <Input
                        value={staff.designation}
                        onChange={(e) => updateAcademicStaff(index, 'designation', e.target.value)}
                        placeholder="Enter designation"
                        className="border-2 focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Department</Label>
                      <Input
                        value={staff.department}
                        onChange={(e) => updateAcademicStaff(index, 'department', e.target.value)}
                        placeholder="Enter department"
                        className="border-2 focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Employment Type</Label>
                      <Select 
                        value={staff.employmentType} 
                        onValueChange={(value) => updateAcademicStaff(index, 'employmentType', value)}
                      >
                        <SelectTrigger className="border-2 focus:border-cyan-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 6: Facilities & Technology
  const renderFacilitiesStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-indigo-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="flex items-center gap-3 text-indigo-800">
            <Computer className="h-6 w-6" />
            Educational Tools & Technology
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Computer className="h-4 w-4" />
                Digital Classrooms
              </Label>
              <Input
                name="educationalTechnology.digitalClassrooms"
                type="number"
                value={formData.educationalTechnology.digitalClassrooms}
                onChange={handleInputChange}
                placeholder="Number of digital classrooms"
                className="border-2 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Computer Labs</Label>
              <Input
                name="educationalTechnology.computerLabs"
                type="number"
                value={formData.educationalTechnology.computerLabs}
                onChange={handleInputChange}
                placeholder="Number of computer labs"
                className="border-2 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Computers Available</Label>
              <Input
                name="educationalTechnology.computersAvailable"
                type="number"
                value={formData.educationalTechnology.computersAvailable}
                onChange={handleInputChange}
                placeholder="Total computers"
                className="border-2 focus:border-indigo-500"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-700 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Internet Availability
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="internetAvailable"
                  name="educationalTechnology.internetAvailability.available"
                  checked={formData.educationalTechnology.internetAvailability.available}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      educationalTechnology: {
                        ...prev.educationalTechnology,
                        internetAvailability: {
                          ...prev.educationalTechnology.internetAvailability,
                          available: checked
                        }
                      }
                    }))
                  }
                />
                <Label htmlFor="internetAvailable" className="text-sm font-medium">
                  Internet Available
                </Label>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Internet Speed</Label>
                <Input
                  name="educationalTechnology.internetAvailability.speed"
                  value={formData.educationalTechnology.internetAvailability.speed}
                  onChange={handleInputChange}
                  placeholder="e.g., 100 Mbps"
                  className="border-2 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Internet Provider</Label>
                <Input
                  name="educationalTechnology.internetAvailability.provider"
                  value={formData.educationalTechnology.internetAvailability.provider}
                  onChange={handleInputChange}
                  placeholder="Provider name"
                  className="border-2 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-700 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Library Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Physical Books</Label>
                <Input
                  name="educationalTechnology.libraryResources.physicalBooks"
                  type="number"
                  value={formData.educationalTechnology.libraryResources.physicalBooks}
                  onChange={handleInputChange}
                  placeholder="Number of books"
                  className="border-2 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">eBooks</Label>
                <Input
                  name="educationalTechnology.libraryResources.ebooks"
                  type="number"
                  value={formData.educationalTechnology.libraryResources.ebooks}
                  onChange={handleInputChange}
                  placeholder="Number of Books"
                  className="border-2 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Journals</Label>
                <Input
                  name="educationalTechnology.libraryResources.journals"
                  type="number"
                  value={formData.educationalTechnology.libraryResources.journals}
                  onChange={handleInputChange}
                  placeholder="Number of journals"
                  className="border-2 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="digitalDatabase"
                  name="educationalTechnology.libraryResources.digitalDatabase"
                  checked={formData.educationalTechnology.libraryResources.digitalDatabase}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      educationalTechnology: {
                        ...prev.educationalTechnology,
                        libraryResources: {
                          ...prev.educationalTechnology.libraryResources,
                          digitalDatabase: checked
                        }
                      }
                    }))
                  }
                />
                <Label htmlFor="digitalDatabase" className="text-sm font-medium">
                  Digital Database
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 7: Project Planning
  const renderProjectPlanningStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
          <CardTitle className="flex items-center gap-3 text-red-800">
            <Hammer className="h-6 w-6" />
            Project Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Hammer className="h-4 w-4" />
                Immediate Construction Planning
              </Label>
              <Textarea
                name="projectPlanning.immediateConstruction"
                value={formData.projectPlanning.immediateConstruction}
                onChange={handleInputChange}
                placeholder="Describe immediate construction plans..."
                className="border-2 focus:border-red-500 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Future Construction Planning</Label>
              <Textarea
                name="projectPlanning.futureConstruction"
                value={formData.projectPlanning.futureConstruction}
                onChange={handleInputChange}
                placeholder="Describe future construction plans..."
                className="border-2 focus:border-red-500 min-h-[100px]"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-red-700 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Priority Work
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority 1 (P1)</Label>
                <Input
                  name="projectPlanning.priorityWork.p1"
                  value={formData.projectPlanning.priorityWork.p1}
                  onChange={handleInputChange}
                  placeholder="Highest priority work"
                  className="border-2 focus:border-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority 2 (P2)</Label>
                <Input
                  name="projectPlanning.priorityWork.p2"
                  value={formData.projectPlanning.priorityWork.p2}
                  onChange={handleInputChange}
                  placeholder="Second priority work"
                  className="border-2 focus:border-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority 3 (P3)</Label>
                <Input
                  name="projectPlanning.priorityWork.p3"
                  value={formData.projectPlanning.priorityWork.p3}
                  onChange={handleInputChange}
                  placeholder="Third priority work"
                  className="border-2 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-red-700 flex items-center gap-2">
                <Hammer className="h-5 w-5" />
                Ongoing Projects
              </h4>
              <Button 
                onClick={(e)=>{e.stopPropagation(); e.preventDefault();addProject()} }
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            
            {formData.projectPlanning.ongoingProjects.map((project, index) => (
              <Card key={index} className="border-2 border-red-200 bg-red-50/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-red-700">Project #{index + 1}</h5>
                    <Button
                      onClick={() => removeProject(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Project Name</Label>
                      <Input
                        value={project.projectName}
                        onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                        placeholder="Enter project name"
                        className="border-2 focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Start Date</Label>
                      <Input
                        type="date"
                        value={project.startDate}
                        onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                        className="border-2 focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Expected Completion</Label>
                      <Input
                        type="date"
                        value={project.expectedCompletion}
                        onChange={(e) => updateProject(index, 'expectedCompletion', e.target.value)}
                        className="border-2 focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Budget</Label>
                      <Input
                        type="number"
                        value={project.budget}
                        onChange={(e) => updateProject(index, 'budget', e.target.value)}
                        placeholder="Enter budget amount"
                        className="border-2 focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Status</Label>
                      <Select 
                        value={project.status} 
                        onValueChange={(value) => updateProject(index, 'status', value)}
                      >
                        <SelectTrigger className="border-2 focus:border-red-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {projectStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <h6 className="font-medium text-red-700 flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      Project Attachments
                    </h6>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        disabled={uploadingAttachments[index]}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          // Trigger file input click
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*,video/*,.pdf';
                          input.onchange = (e) => handleProjectAttachmentUpload(index, e as any);
                          input.click();
                        }}
                      >
                        {uploadingAttachments[index] ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Attachment
                          </>
                        )}
                      </Button>
                      {project.attachments && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-green-300 text-green-700">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Attachment Uploaded
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) =>{e.stopPropagation(); e.preventDefault(); window.open(project.attachments, '_blank')}}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) =>{e.preventDefault(); e.stopPropagation(); updateProject(index, 'attachments', '')}}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 8: Review & Submit
  const renderReviewStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-emerald-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <CardTitle className="flex items-center gap-3 text-emerald-800">
            <CheckCircle className="h-6 w-6" />
            Review College Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Alert className="border-emerald-200 bg-emerald-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-emerald-800">
              Please review all information before submitting the form. Make sure all details are accurate and complete.
            </AlertDescription>
          </Alert>

          <Card className="border-2 border-emerald-200 bg-emerald-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-700">College Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">College Name:</span>
                    <span>{formData.collegeName || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Campus Type:</span>
                    <span>{formData.campusType || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Location:</span>
                    <span>{formData.location.district}, {formData.location.province}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Total Buildings:</span>
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                      {formData.infrastructure.buildings.length}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Total Programs:</span>
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                      {formData.academicPrograms.programs.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Total Images:</span>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.images?.length || 0), 0)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Total Videos:</span>
                    <Badge variant="outline" className="border-red-300 text-red-700">
                      {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.videos?.length || 0), 0)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hammer className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Total Projects:</span>
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                      {formData.projectPlanning.ongoingProjects.length}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0: return renderBasicInfoStep();
      case 1: return renderLocationStep();
      case 2: return renderInfrastructureStep();
      case 3: return renderAcademicProgramsStep();
      case 4: return renderStaffStep();
      case 5: return renderFacilitiesStep();
      case 6: return renderProjectPlanningStep();
      case 7: return renderReviewStep();
      default: return null;
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!formData.collegeName && !!formData.campusType && !!formData.establishmentDate && !!formData.principalInfo.name;
      case 1:
        return !!formData.location.province && !!formData.location.district && !!formData.location.localLevel && !!formData.location.wardNo;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-t-blue-600">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tribhuvan University
            </h1>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              College Information Collection Form
            </h2>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                Step {activeStep + 1} of {steps.length}
              </Badge>
              <span>•</span>
              <span>{steps[activeStep].title}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Form Progress</h3>
              <span className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-4" />
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-blue-100 border-2 border-blue-500' 
                        : isCompleted 
                        ? 'bg-green-100 border-2 border-green-500' 
                        : 'bg-gray-100 border-2 border-gray-300'
                    }`}
                  >
                    <StepIcon 
                      className={`h-5 w-5 mb-1 ${
                        isActive 
                          ? 'text-blue-600' 
                          : isCompleted 
                          ? 'text-green-600' 
                          : 'text-gray-400'
                      }`} 
                    />
                    <span className={`text-xs font-medium text-center ${
                      isActive 
                        ? 'text-blue-600' 
                        : isCompleted 
                        ? 'text-green-600' 
                        : 'text-gray-500'
                    }`}>
                      {step.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {e.stopPropagation();e.preventDefault();setError('')}}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault(0);
                setSuccess('')}}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="min-h-[600px]">
            {getStepContent(activeStep)}
          </div>
          
          {/* Navigation Buttons */}
          <Card className="mt-8 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className="px-6 py-2"
                >
                  <span className="mr-2">←</span>
                  Back
                </Button>
                
                <div className="flex items-center gap-4">
                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Form
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={(e)=>{e.preventDefault();e.stopPropagation();handleNext()}}
                      disabled={!isStepValid(activeStep)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      Next
                      <span className="ml-2">→</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Add Media Dialog */}
      <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {mediaType === 'image' ? (
                <ImageIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <Video className="h-5 w-5 text-red-600" />
              )}
              Add {mediaType === 'image' ? 'Image' : 'Video'}
            </DialogTitle>
            <DialogDescription>
              Add media content to the building information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Media URL *</Label>
              <Input
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Enter the URL of the image or video"
                className="border-2 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mediaCaption">Caption</Label>
              <Textarea
                id="mediaCaption"
                value={mediaCaption}
                onChange={(e) => setMediaCaption(e.target.value)}
                placeholder="Enter a caption for the media"
                className="border-2 focus:border-blue-500"
              />
            </div>
            {mediaType === 'video' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mediaDuration">Duration (seconds)</Label>
                  <Input
                    id="mediaDuration"
                    type="number"
                    value={mediaDuration}
                    onChange={(e) => setMediaDuration(e.target.value)}
                    placeholder="Video duration in seconds"
                    className="border-2 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mediaThumbnail">Thumbnail URL</Label>
                  <Input
                    id="mediaThumbnail"
                    value={mediaThumbnail}
                    onChange={(e) => setMediaThumbnail(e.target.value)}
                    placeholder="Thumbnail image URL"
                    className="border-2 focus:border-blue-500"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={(e) => {e.preventDefault(); e.stopPropagation();setMediaDialogOpen(false)}}>
              Cancel
            </Button>
            <Button 
              onClick={(e)=>{e.stopPropagation(); e.preventDefault(); handleAddMedia()} }
              disabled={!mediaUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Add {mediaType === 'image' ? 'Image' : 'Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Media Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{previewMedia?.caption || 'Media Preview'}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            {previewMedia?.type === 'image' ? (
              <img 
                src={previewMedia.url} 
                alt={previewMedia.caption} 
                className="max-w-full max-h-[500px] object-contain rounded-lg" 
              />
            ) : (
              <video 
                src={previewMedia?.url} 
                controls 
                className="max-w-full max-h-[500px] rounded-lg" 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollegeDataForm;