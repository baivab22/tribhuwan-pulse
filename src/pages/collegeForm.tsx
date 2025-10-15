




import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Card,
  CardContent,
  FormControlLabel,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';

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
    ongoingProjects: Array<{
      projectName: string;
      startDate: string;
      expectedCompletion: string;
      budget: string;
      status: string;
    }>;
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

  const steps = [
    'Basic Information',
    'Location Details',
    'Infrastructure & Land',
    'Academic Programs',
    'Staff Information',
    'Facilities & Technology',
    'Project Planning',
    'Review & Submit'
  ];

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
  const addBuilding = () => {
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

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:4000/api/collegeform', formData);
      
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

  // Step 1: Basic Information
  const renderBasicInfoStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          College Basic Information
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="College Name"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Campus Type</InputLabel>
          <Select
            name="campusType"
            value={formData.campusType}
            label="Campus Type"
            onChange={handleInputChange as any}
          >
            {campusTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Establishment Date"
          name="establishmentDate"
          type="date"
          value={formData.establishmentDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="College ID"
          name="collegeId"
          value={formData.collegeId}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Principal Information
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          required
          fullWidth
          label="Principal Name"
          name="principalInfo.name"
          value={formData.principalInfo.name}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Contact Number"
          name="principalInfo.contactNumber"
          value={formData.principalInfo.contactNumber}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Email"
          name="principalInfo.email"
          type="email"
          value={formData.principalInfo.email}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Staff Contacts
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Admin Chief Name"
          name="staffContacts.adminChief.name"
          value={formData.staffContacts.adminChief.name}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Admin Chief Mobile"
          name="staffContacts.adminChief.mobile"
          value={formData.staffContacts.adminChief.mobile}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Account Chief Name"
          name="staffContacts.accountChief.name"
          value={formData.staffContacts.accountChief.name}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Account Chief Mobile"
          name="staffContacts.accountChief.mobile"
          value={formData.staffContacts.accountChief.mobile}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );

  // Step 2: Location Details
  const renderLocationStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          College Location Details
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Province</InputLabel>
          <Select
            name="location.province"
            value={formData.location.province}
            label="Province"
            onChange={handleInputChange as any}
          >
            {provinces.map((province) => (
              <MenuItem key={province} value={province}>{province}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="District"
          name="location.district"
          value={formData.location.district}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Municipality/Rural Municipality"
          name="location.localLevel"
          value={formData.location.localLevel}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Ward No."
          name="location.wardNo"
          value={formData.location.wardNo}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Street/Tole Name"
          name="location.streetTole"
          value={formData.location.streetTole}
          onChange={handleInputChange}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Landmark"
          name="location.landmark"
          value={formData.location.landmark}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Official Phone"
          name="contactInfo.officialPhone"
          value={formData.contactInfo.officialPhone}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Official Email"
          name="contactInfo.officialEmail"
          type="email"
          value={formData.contactInfo.officialEmail}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="College Website"
          name="contactInfo.website"
          value={formData.contactInfo.website}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );

  // Step 3: Infrastructure & Land with Media Support
  const renderInfrastructureStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          Infrastructure & Land Details
        </Typography>
      </Grid>

      {/* Buildings Section with Media */}
      <Grid item xs={12}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Buildings & Rooms (with Media)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button startIcon={<AddIcon />} onClick={addBuilding} sx={{ mb: 2 }} variant="contained">
              Add Building
            </Button>
            {formData.infrastructure.buildings.map((building, index) => (
              <Card key={index} sx={{ mb: 3, p: 2, border: '2px solid #e0e0e0' }}>
                <Grid container spacing={2}>
                  {/* Building Basic Info */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                      Building #{index + 1}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Building Name"
                      value={building.buildingName}
                      onChange={(e) => updateBuilding(index, 'buildingName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Total Rooms"
                      type="number"
                      value={building.totalRooms}
                      onChange={(e) => updateBuilding(index, 'totalRooms', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Classrooms"
                      type="number"
                      value={building.classrooms}
                      onChange={(e) => updateBuilding(index, 'classrooms', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Labs"
                      type="number"
                      value={building.labs}
                      onChange={(e) => updateBuilding(index, 'labs', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                      <InputLabel>Condition</InputLabel>
                      <Select
                        value={building.condition}
                        label="Condition"
                        onChange={(e) => updateBuilding(index, 'condition', e.target.value)}
                      >
                        {buildingConditions.map(condition => (
                          <MenuItem key={condition} value={condition}>{condition}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Media Management Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Building Media
                      </Typography>
                      <Chip 
                        icon={<ImageIcon />} 
                        label={`${building.media?.images?.length || 0} Images`} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        icon={<VideoIcon />} 
                        label={`${building.media?.videos?.length || 0} Videos`} 
                        size="small" 
                        color="secondary"
                        variant="outlined"
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Button
                        size="small"
                        startIcon={<ImageIcon />}
                        onClick={() => openMediaDialog(index, 'image')}
                        variant="outlined"
                        color="primary"
                      >
                        Add Image
                      </Button>
                      <Button
                        size="small"
                        startIcon={<VideoIcon />}
                        onClick={() => openMediaDialog(index, 'video')}
                        variant="outlined"
                        color="secondary"
                      >
                        Add Video
                      </Button>
                    </Stack>

                    {/* Display Images */}
                    {building.media?.images && building.media.images.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                          Images:
                        </Typography>
                        <ImageList sx={{ width: '100%', height: 200 }} cols={4} rowHeight={164}>
                          {building.media.images.map((img, imgIndex) => (
                            <ImageListItem key={imgIndex}>
                              <img
                                src={img.url}
                                alt={img.caption || 'Building image'}
                                loading="lazy"
                                style={{ cursor: 'pointer', objectFit: 'cover' }}
                                onClick={() => handlePreviewMedia(img.url, img.caption, 'image')}
                              />
                              <ImageListItemBar
                                title={img.caption || 'No caption'}
                                actionIcon={
                                  <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                                    onClick={() => deleteMedia(index, 'images', imgIndex)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                }
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Box>
                    )}

                    {/* Display Videos */}
                    {building.media?.videos && building.media.videos.length > 0 && (
                      <Box>
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                          Videos:
                        </Typography>
                        <Grid container spacing={2}>
                          {building.media.videos.map((vid, vidIndex) => (
                            <Grid item xs={12} sm={6} md={4} key={vidIndex}>
                              <Card variant="outlined">
                                {vid.thumbnail && (
                                  <CardMedia
                                    component="img"
                                    height="140"
                                    image={vid.thumbnail}
                                    alt={vid.caption || 'Video thumbnail'}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handlePreviewMedia(vid.url, vid.caption, 'video')}
                                  />
                                )}
                                <CardContent>
                                  <Typography variant="body2" noWrap>
                                    {vid.caption || 'No caption'}
                                  </Typography>
                                  {vid.duration && (
                                    <Typography variant="caption" color="text.secondary">
                                      Duration: {vid.duration}s
                                    </Typography>
                                  )}
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => deleteMedia(index, 'videos', vidIndex)}
                                    sx={{ float: 'right' }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Grid>

                  {/* Remove Building Button */}
                  <Grid item xs={12}>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => removeBuilding(index)}
                      color="error"
                      variant="outlined"
                      size="small"
                    >
                      Remove Building
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* Health & Sanitation */}
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Health & Sanitation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Male Toilets"
                  name="infrastructure.healthSanitation.toilets.male"
                  value={formData.infrastructure.healthSanitation.toilets.male}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Female Toilets"
                  name="infrastructure.healthSanitation.toilets.female"
                  value={formData.infrastructure.healthSanitation.toilets.female}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Disabled Friendly Toilets"
                  name="infrastructure.healthSanitation.toilets.disabledFriendly"
                  value={formData.infrastructure.healthSanitation.toilets.disabledFriendly}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      name="infrastructure.healthSanitation.drinkingWater.available"
                      checked={formData.infrastructure.healthSanitation.drinkingWater.available}
                      onChange={handleInputChange}
                    />
                  }
                  label="Drinking Water Available"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      name="infrastructure.healthSanitation.medicalFacilities.firstAid"
                      checked={formData.infrastructure.healthSanitation.medicalFacilities.firstAid}
                      onChange={handleInputChange}
                    />
                  }
                  label="First Aid Available"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );

  // Step 4: Academic Programs
  const renderAcademicProgramsStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          Academic Programs & Enrollment
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Total Faculties/Departments"
          name="academicPrograms.totalFaculties"
          type="number"
          value={formData.academicPrograms.totalFaculties}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Programs Offered
        </Typography>
        <Button startIcon={<AddIcon />} onClick={addProgram} sx={{ mb: 2 }} variant="contained">
          Add Program
        </Button>
        
        {formData.academicPrograms.programs.map((program, index) => (
          <Card key={index} sx={{ mb: 2, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Program Name"
                      value={program.programName}
                      onChange={(e) => updateProgram(index, 'programName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Level</InputLabel>
                      <Select
                        value={program.level}
                        label="Level"
                        onChange={(e) => updateProgram(index, 'level', e.target.value)}
                      >
                        {programLevels.map(level => (
                          <MenuItem key={level} value={level}>{level}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={program.duration}
                      onChange={(e) => updateProgram(index, 'duration', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeProgram(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Current Enrollment
        </Typography>
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Total Students"
          name="academicPrograms.enrollment.total"
          type="number"
          value={formData.academicPrograms.enrollment.total}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Male Students"
          name="academicPrograms.enrollment.male"
          type="number"
          value={formData.academicPrograms.enrollment.male}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Female Students"
          name="academicPrograms.enrollment.female"
          type="number"
          value={formData.academicPrograms.enrollment.female}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Other Students"
          name="academicPrograms.enrollment.other"
          type="number"
          value={formData.academicPrograms.enrollment.other}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );

  // Step 5: Staff Information
  const renderStaffStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          Staff Information
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Academic Staff
        </Typography>
        <Button startIcon={<AddIcon />} onClick={addAcademicStaff} sx={{ mb: 2 }} variant="contained">
          Add Academic Staff
        </Button>
        
        {formData.staff.academic.map((staff, index) => (
          <Card key={index} sx={{ mb: 2, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={staff.name}
                      onChange={(e) => updateAcademicStaff(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Designation"
                      value={staff.designation}
                      onChange={(e) => updateAcademicStaff(index, 'designation', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={staff.department}
                      onChange={(e) => updateAcademicStaff(index, 'department', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Employment Type</InputLabel>
                      <Select
                        value={staff.employmentType}
                        label="Employment Type"
                        onChange={(e) => updateAcademicStaff(index, 'employmentType', e.target.value)}
                      >
                        {employmentTypes.map(type => (
                          <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeAcademicStaff(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
    </Grid>
  );

  // Step 6: Facilities & Technology
  const renderFacilitiesStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          Educational Tools & Technology
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Digital Classrooms"
          name="educationalTechnology.digitalClassrooms"
          type="number"
          value={formData.educationalTechnology.digitalClassrooms}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Computer Labs"
          name="educationalTechnology.computerLabs"
          type="number"
          value={formData.educationalTechnology.computerLabs}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Computers Available"
          name="educationalTechnology.computersAvailable"
          type="number"
          value={formData.educationalTechnology.computersAvailable}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Internet Availability
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControlLabel
          control={
            <Switch
              name="educationalTechnology.internetAvailability.available"
              checked={formData.educationalTechnology.internetAvailability.available}
              onChange={handleInputChange}
            />
          }
          label="Internet Available"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Internet Speed"
          name="educationalTechnology.internetAvailability.speed"
          value={formData.educationalTechnology.internetAvailability.speed}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Internet Provider"
          name="educationalTechnology.internetAvailability.provider"
          value={formData.educationalTechnology.internetAvailability.provider}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Library Resources
        </Typography>
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Physical Books"
          name="educationalTechnology.libraryResources.physicalBooks"
          type="number"
          value={formData.educationalTechnology.libraryResources.physicalBooks}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="eBooks"
          name="educationalTechnology.libraryResources.ebooks"
          type="number"
          value={formData.educationalTechnology.libraryResources.ebooks}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Journals"
          name="educationalTechnology.libraryResources.journals"
          type="number"
          value={formData.educationalTechnology.libraryResources.journals}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControlLabel
          control={
            <Switch
              name="educationalTechnology.libraryResources.digitalDatabase"
              checked={formData.educationalTechnology.libraryResources.digitalDatabase}
              onChange={handleInputChange}
            />
          }
          label="Digital Database"
        />
      </Grid>
    </Grid>
  );

  // Step 7: Project Planning
  const renderProjectPlanningStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          Project Planning
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Immediate Construction Planning"
          name="projectPlanning.immediateConstruction"
          value={formData.projectPlanning.immediateConstruction}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Future Construction Planning"
          name="projectPlanning.futureConstruction"
          value={formData.projectPlanning.futureConstruction}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Priority Work
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Priority 1 (P1)"
          name="projectPlanning.priorityWork.p1"
          value={formData.projectPlanning.priorityWork.p1}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Priority 2 (P2)"
          name="projectPlanning.priorityWork.p2"
          value={formData.projectPlanning.priorityWork.p2}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Priority 3 (P3)"
          name="projectPlanning.priorityWork.p3"
          value={formData.projectPlanning.priorityWork.p3}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Ongoing Projects
        </Typography>
        <Button startIcon={<AddIcon />} onClick={addProject} sx={{ mb: 2 }} variant="contained">
          Add Project
        </Button>
        
        {formData.projectPlanning.ongoingProjects.map((project, index) => (
          <Card key={index} sx={{ mb: 2, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Project Name"
                      value={project.projectName}
                      onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Expected Completion"
                      type="date"
                      value={project.expectedCompletion}
                      onChange={(e) => updateProject(index, 'expectedCompletion', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Budget"
                      type="number"
                      value={project.budget}
                      onChange={(e) => updateProject(index, 'budget', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={project.status}
                        label="Status"
                        onChange={(e) => updateProject(index, 'status', e.target.value)}
                      >
                        {projectStatuses.map(status => (
                          <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeProject(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
    </Grid>
  );

  // Step 8: Review & Submit
  const renderReviewStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          Review College Information
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Please review all information before submitting the form.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>College Summary</Typography>
          <Typography><strong>College Name:</strong> {formData.collegeName}</Typography>
          <Typography><strong>Campus Type:</strong> {formData.campusType}</Typography>
          <Typography><strong>Location:</strong> {formData.location.district}, {formData.location.province}</Typography>
          <Typography><strong>Total Buildings:</strong> {formData.infrastructure.buildings.length}</Typography>
          <Typography><strong>Total Programs:</strong> {formData.academicPrograms.programs.length}</Typography>
          <Typography><strong>Total Images:</strong> {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.images?.length || 0), 0)}</Typography>
          <Typography><strong>Total Videos:</strong> {formData.infrastructure.buildings.reduce((sum, b) => sum + (b.media?.videos?.length || 0), 0)}</Typography>
        </Card>
      </Grid>
    </Grid>
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
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Tribhuvan University
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          College Information Collection Form
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Submitting...' : 'Submit Form'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStepValid(activeStep)}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>

      {/* Add Media Dialog */}
      <Dialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add {mediaType === 'image' ? 'Image' : 'Video'}
          <IconButton
            onClick={() => setMediaDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Media URL"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                required
                helperText="Enter the URL of the image or video"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Caption"
                value={mediaCaption}
                onChange={(e) => setMediaCaption(e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            {mediaType === 'video' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Duration (seconds)"
                    type="number"
                    value={mediaDuration}
                    onChange={(e) => setMediaDuration(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Thumbnail URL"
                    value={mediaThumbnail}
                    onChange={(e) => setMediaThumbnail(e.target.value)}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMediaDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddMedia} 
            variant="contained" 
            disabled={!mediaUrl}
            startIcon={<CloudUploadIcon />}
          >
            Add {mediaType === 'image' ? 'Image' : 'Video'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Media Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {previewMedia?.caption || 'Media Preview'}
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {previewMedia?.type === 'image' ? (
            <img 
              src={previewMedia.url} 
              alt={previewMedia.caption} 
              style={{ width: '100%', height: 'auto' }} 
            />
          ) : (
            <video 
              src={previewMedia?.url} 
              controls 
              style={{ width: '100%', height: 'auto' }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CollegeDataForm;