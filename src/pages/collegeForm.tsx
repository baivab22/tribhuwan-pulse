import React, { useState, useEffect } from 'react';
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
  Loader2,
  LandPlot,
  Trees,
  Sprout,
  Shield,
  DollarSign
} from 'lucide-react';

// Location Data Interface
interface Municipality {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  municipalityList: Municipality[];
}

interface Province {
  id: number;
  name: string;
  districtList: District[];
}

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

// Academic Program Interface
interface AcademicProgram {
  institution: string;
  level: string;
  programName: string;
  totalStudents: string;
  maleStudents: string;
  femaleStudents: string;
  otherStudents: string;
  scholarshipStudents: string;
  newAdmissions: string;
  graduatedStudents: string;
  passPercentage: string;
  affiliatedTo: string;
}

// Program Breakdown Interface
interface ProgramBreakdown {
  programName: string;
  total: string;
  male: string;
  female: string;
  other: string;
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
    programs: AcademicProgram[];
    enrollment: {
      total: string;
      male: string;
      female: string;
      other: string;
      programBreakdown: ProgramBreakdown[];
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

// Tribhuvan University Programs Data Structure
const tuPrograms = {
  "Institute of Science and Technology (IoST)": {
    "Bachelor": [
      "B.Sc. General (Annual System)",
      "B.Sc. (MB)",
      "B.Sc. (Environmental Science)",
      "B.Tech. (Food)",
      "B.Sc. (CSIT) - Semester System",
      "Bachelor of IT (BIT) - Semester System",
      "B. Math.Sc. (Actuarial Science) - Semester System",
      "B.Sc. (Nutrition & Dietetics)"
    ],
    "Master": [
      "M.Sc. CSIT",
      "M.Sc. Mathematics",
      "M.Sc. Microbiology",
      "M.Sc. Environmental Science",
      "M.Sc. Environmental Health in Disaster",
      "M.Sc. Statistics",
      "M.Sc. Biotechnology",
      "M.Sc. Biodiversity and Environmental Management",
      "M.Sc. Physics",
      "M.Sc. Chemistry",
      "M.Sc. Zoology",
      "M.Sc. Biology",
      "M.Sc. Geology",
      "M.Sc. Hydrology & Meteorology",
      "M.Tech. Food Technology",
      "MIT"
    ],
    "MPhil": [
      "M.Phil Mathematics"
    ],
    "PhD": [
      "Biotechnology",
      "Botany",
      "Chemistry",
      "CSIT",
      "Environmental Science",
      "Food Technology",
      "Geology",
      "Hydrology & Meteorology",
      "Mathematics",
      "Microbiology",
      "Physics",
      "Statistics",
      "Zoology"
    ]
  },
  "Institute of Engineering (IOE)": {
    "Bachelor": [
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics Engineering",
      "Computer Engineering",
      "Mechanical Engineering",
      "Automobile Engineering",
      "Geomatics Engineering",
      "Industrial Engineering",
      "Agriculture Engineering",
      "Architecture",
      "Aerospace Engineering",
      "Chemical Engineering"
    ],
    "Master": [
      "Urban Planning",
      "Energy for Sustainable Social Development",
      "Energy Efficient Buildings",
      "Transportation Engineering",
      "Structural Engineering",
      "Construction Management",
      "Disaster Risk Management",
      "Water Resources Engineering",
      "Geo-technical Engineering",
      "Environmental Engineering",
      "Hydropower Engineering",
      "Power System Engineering",
      "Information & Communication Engineering",
      "Computer System & Knowledge Engineering",
      "Renewable Energy Engineering",
      "Energy System Planning & Management",
      "Mechanical System Design and Engineering",
      "Climate Change and Development",
      "Material Science & Engineering",
      "Electrical Engineering in Distributed Generation",
      "Communication & Knowledge Engineering",
      "Infrastructure Engineering and Management",
      "Earthquake Engineering",
      "Land and Water Engineering",
      "Master in Architecture",
      "Rock and Tunnel Engineering",
      "Geospatial Engineering",
      "Sanitation Engineering/Science",
      "Distributed Generation Engineering",
      "Informatics and Intelligent Engineering",
      "Mechanical Engineering Design and Manufacturing",
      "Power Electronics and Drives Engineering",
      "Computer Engineering Specialization in Network and Cyber Security"
    ],
    "PhD": [
      "PhD in Engineering (various disciplines)"
    ]
  },
  "Institute of Medicine (IOM)": {
    "Bachelor": [
      "Bachelor in Dental Surgery (BDS)",
      "Bachelor of Audiology and Speech Language Pathology (BASLP)",
      "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
      "Bachelor of Optometry (B.Optom)",
      "Bachelor of Perfusion Technology (B.Perfusion Tech)",
      "Bachelor of Pharmacy (B.Pharm)",
      "Bachelor of Science in Medical Imaging Technology (B.Sc.MIT)",
      "Bachelor of Science in Medical Laboratory Technology (BSc.MLT)",
      "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
      "Bachelor of Science in Nursing (B.Sc. Nursing)",
      "BNS (Adult Health Nursing)",
      "BNS (Child Health Nursing)",
      "BNS (Community Health Nursing)",
      "BNS (Psychiatric Nursing)",
      "Bachelor in Public Health (BPH)",
      "Bachelor of Midwifery Science (BMS)",
      "Bachelor of Science in Midwifery (BScM)"
    ],
    "Master": [
      "MD Anaesthesiology",
      "MD Biochemistry",
      "MD Clinical Pharmacology",
      "MD Clinical Physiology",
      "MD Dermatology, Venereology & Leprology",
      "MD Forensic Medicine",
      "MD General Practice",
      "MD Internal Medicine",
      "MD Microbiology",
      "MD Obstetrics & Gynaecology",
      "MD Ophthalmology",
      "MD Pathology",
      "MD Pediatrics",
      "MD Psychiatry",
      "MD Radiodiagnosis",
      "MD Kayachikista",
      "MD Community Medicine",
      "MD Emergency Medicine",
      "MS Otorhinolaryngology (ENT)",
      "MS General Surgery",
      "MS Orthopaedics and Trauma Surgery",
      "MS Clinical Anatomy",
      "MDS Conservative Dentistry & Endodontics",
      "MDS Oral & Maxillofacial Surgery",
      "MDS Orthodontics and Dentofacial Orthopedics",
      "MDS Pedodontics & Preventive Dentistry",
      "MDS Periodontology & Oral Implantology",
      "MDS Prosthodontics & Maxillofacial Prosthesis",
      "MDS Oral Medicine & Radiology",
      "MDS Community Health Dentistry",
      "MSc Clinical Biochemistry",
      "MSc Clinical Microbiology",
      "MSc Medical Imaging Technology (MIT)",
      "MN (Adult Nursing)",
      "MN (Pediatric Nursing)",
      "MN (Psychiatric Nursing)",
      "MN (Women Health Development)",
      "MN (Community Health Nursing)",
      "MN (Critical Care Nursing)",
      "Master of Public Health (MPH)",
      "Master of Public Health Nutrition (MPHN)",
      "Master of Health Promotion and Education (MHP&E)",
      "MD Kaumarbhriya"
    ],
    "MPhil": [
      "M.Phil Clinical Psychology"
    ],
    "PhD": [
      "PhD in Microbiology",
      "PhD in Nursing",
      "PhD in Public Health"
    ]
  },
  "Institute of Forestry (IOF)": {
    "Bachelor": [
      "B.Sc. Forestry"
    ],
    "Master": [
      "M.Sc. Forestry",
      "M.Sc. Natural Resources Management and Rural Development",
      "M.Sc. Watershed Management",
      "M.Sc. Wildlife Management and Biodiversity Conservation",
      "M.Sc. Mountain Environment and Development Studies",
      "M.Sc. Community Forestry"
    ],
    "PhD": [
      "PhD in Forestry",
      "PhD in Watershed Management",
      "PhD in Community Forestry",
      "PhD in Natural Resource Management and Rural Development",
      "PhD in Wildlife Management and Biodiversity Conservation"
    ]
  },
  "Institute of Agriculture and Animal Science (IAAS)": {
    "Bachelor": [
      "Bachelor of Science in Agriculture (B.Sc.Ag.)",
      "Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc & A.H.)"
    ],
    "Master": [
      "Master of Science in Agriculture (M.Sc.Ag.)",
      "Master of Science in Animal Science (M.Sc. An.Sc.)",
      "Master of Veterinary Science (M.V.Sc.)",
      "Master of Science in Aquaculture (M.Sc. Aqua.)"
    ],
    "PhD": [
      "Doctor of Philosophy (PhD) in Agriculture and Animal Science"
    ]
  },
  "Faculty of Humanities and Social Sciences (FoHSS)": {
    "Bachelor": [
      "BA (Various subjects)",
      "BFA (Bachelor in Fine Arts)",
      "BFS (Bachelor in Film Study)",
      "BCA (Bachelor in Computer Application)",
      "BPSG (Bachelor in Public Service and Governance)",
      "BSW (Bachelor in Social Work)"
    ],
    "Post Graduate Diploma": [
      "Counseling Psychology",
      "School Counseling",
      "Woman Studies",
      "Yoga Bigyan",
      "Nutrition and Dietetics",
      "Security and Disaster Management"
    ],
    "Master": [
      "Nepali",
      "English",
      "Maithili",
      "Sanskrit",
      "Nepal Bhasa",
      "Hindi",
      "Linguistics",
      "Geography",
      "Economics",
      "Home Science",
      "Political Science",
      "Library Science",
      "Sociology",
      "Anthropology",
      "Psychology",
      "Journalism and Mass Communication",
      "Population Studies",
      "Buddhist Studies",
      "Rural Development",
      "Fine Arts (Music and Sculpture)",
      "History",
      "Nepalese History Culture and Archeology",
      "International Relation and Diplomacy",
      "Conflict, Peace and Development",
      "Gender Studies",
      "Social Work",
      "Counseling Psychology",
      "Sports Science",
      "Tourism and Hospitality",
      "Strategic Studies",
      "Security Peace and Development",
      "Crisis Management",
      "Dance",
      "Labor Studies",
      "Governance and Anti Corruptions",
      "Yogic Science"
    ],
    "MPhil": [
      "M.Phil in Nepali",
      "M.Phil in English",
      "M.Phil in Nepal Bhasa",
      "M.Phil in Hindi",
      "M.Phil in Linguistics",
      "M.Phil in Geography",
      "M.Phil in Economics",
      "M.Phil in Home Science",
      "M.Phil in Political Science",
      "M.Phil in Sociology",
      "M.Phil in Anthropology",
      "M.Phil in Psychology",
      "M.Phil in Journalism and Mass Communication",
      "M.Phil in Population Studies",
      "M.Phil in Buddhist Studies",
      "M.Phil in Rural Development",
      "M.Phil in Fine Arts (Music and Sculpture)",
      "M.Phil in History",
      "M.Phil in Nepalese History, Culture and Archeology",
      "M.Phil in International Relation and Diplomacy",
      "M.Phil in Conflict, Peace and Development",
      "M.Phil in Gender Studies",
      "M.Phil in Social Work"
    ],
    "PhD": [
      "PhD in Nepali",
      "PhD in English",
      "PhD in Nepal Bhasa",
      "PhD in Hindi",
      "PhD in Linguistics",
      "PhD in Geography",
      "PhD in Economics",
      "PhD in Home Science",
      "PhD in Political Science",
      "PhD in Sociology",
      "PhD in Anthropology",
      "PhD in Psychology",
      "PhD in Journalism and Mass Communication",
      "PhD in Population Studies",
      "PhD in Buddhist Studies",
      "PhD in Rural Development",
      "PhD in Fine Arts (Music and Sculpture)",
      "PhD in History",
      "PhD in Nepalese History, Culture and Archeology",
      "PhD in International Relation and Diplomacy",
      "PhD in Conflict, Peace and Development",
      "PhD in Gender Studies",
      "PhD in Social Work"
    ]
  },
  "Faculty of Education (FoE)": {
    "Bachelor": [
      "Four-year B.Ed (Annual)",
      "Eight-Semester Bachelor of Information and Communication Technology Education (BICTE)"
    ],
    "Post Graduate Diploma": [
      "Post-Graduate Diploma in Education (Three-Semester)"
    ],
    "Master": [
      "M.Ed (four semesters)",
      "Master of Social Studies Education (MSSEd) - six semesters",
      "Three-Semester M.Ed. in Science Education (ODL)",
      "M.Ed in ICT",
      "Master in Inclusive Education",
      "Master of Educational Sciences in Digital Pedagogy"
    ],
    "MPhil": [
      "Master of Philosophy (M.Phil) in Education"
    ],
    "PhD": [
      "Doctor of Philosophy (PhD) in Education"
    ]
  },
  "Faculty of Management (FoM)": {
    "Bachelor": [
      "Bachelor of Business Studies (BBS) - Annual System",
      "Bachelor of Business Administration (BBA) - Semester System",
      "Bachelor of Business Administration in Finance (BBA-F) - Semester System",
      "Bachelor of Information Management (BIM) - Semester System",
      "Bachelor of Travel and Tourism Management (BTTM) - Semester System",
      "Bachelor of Hotel Management (BHM) - Semester System",
      "Bachelor of Business Management (BBM) - Semester System",
      "Bachelor of Public Administration (BPA) - Semester System",
      "Bachelor of Mountaineering Studies (BMS) - Semester System"
    ],
    "Post Graduate Diploma": [
      "Post Graduate Diploma in Police Sciences (PGDPS)"
    ],
    "Master": [
      "Master of Business Administration (MBA)",
      "Master of Business Administration in Finance (MBA-F)",
      "Master of Business Administration in Marketing (MBA-Marketing)",
      "Master of Business Administration in Information Technology (MBA-IT)",
      "Master of Business Administration in Corporate Leadership (MBA-Corporate Leadership)",
      "Master of Travel and Tourism Management (MTTM)",
      "Master of Hospitality Management (MHM)",
      "Master of Business Administration in Finance and Control (MBA-FC)",
      "Master of Business Management (MBM)",
      "MBA in Global Leadership Development (MBA-GLM)",
      "Master of Business Studies (MBS)",
      "Master of Adventure Tourism Studies (MATS)",
      "Master of Public Administration (MPA)",
      "Master of Police Science (MPS)"
    ],
    "MPhil": [
      "M.Phil in Management",
      "M.Phil in Public Administration"
    ],
    "PhD": [
      "Ph.D in Management",
      "Ph.D in Public Administration"
    ]
  },
  "Faculty of Law (FoL)": {
    "Bachelor": [
      "LL.B. (Bachelor of Laws) - 3 years",
      "B.A.LL.B. (Bachelor of Arts-Bachelor of Laws) - 5 years"
    ],
    "Master": [
      "LL.M. (Master of Laws) – 2 Years",
      "LL.M (Master of Laws) – 3 Years"
    ],
    "PhD": [
      "Ph.D. (Doctor of Philosophy) in Law"
    ]
  },
  "Open and Distance Education Centre (ODEC)": {
    "Master": [
      "M. Ed. in English Education",
      "M. Ed. in Mathematics Education",
      "Master of Educational Sciences in Digital Pedagogy"
    ]
  }
};

const academicLevels = ["Bachelor", "Master", "MPhil", "PhD", "Post Graduate Diploma"] as const;

// Location Data
   const locationData: Province[] = [
        {
            "id": 1,
            "name": "KOSHI PROVINCE",
            "districtList": [
                {
                    "id": 1,
                    "name": "TAPLEJUNG",
                    "municipalityList": [
                        {
                            "id": 1,
                            "name": "Fattanglung Rural Municipality"
                        },
                        {
                            "id": 2,
                            "name": "Maiwakhola Rural Municipality"
                        },
                        {
                            "id": 3,
                            "name": "Meringden Rural Municipality"
                        },
                        {
                            "id": 4,
                            "name": "Mikawakhola Rural Municipality"
                        },
                        {
                            "id": 5,
                            "name": "Phungling Municipality"
                        },
                        {
                            "id": 6,
                            "name": "Serijdangha Rural Municipality"
                        },
                        {
                            "id": 7,
                            "name": "Sidingwa Rural Municipality"
                        },
                        {
                            "id": 8,
                            "name": "Yangwarak Rural Municipality"
                        },
                        {
                            "id": 9,
                            "name": "Aatharai Triveni Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "SANKHUWASABHA",
                    "municipalityList": [
                        {
                            "id": 10,
                            "name": "Bhotkhola Rural Municipality"
                        },
                        {
                            "id": 11,
                            "name": "Chainpur Municipality"
                        },
                        {
                            "id": 12,
                            "name": "Chichila Rural Municipality"
                        },
                        {
                            "id": 13,
                            "name": "Dharmadevi Municipality"
                        },
                        {
                            "id": 14,
                            "name": "Khadbari Municipality"
                        },
                        {
                            "id": 15,
                            "name": "Madi Municipality"
                        },
                        {
                            "id": 16,
                            "name": "Makalu Rural Municipality"
                        },
                        {
                            "id": 17,
                            "name": "Panchkhapan Municipality"
                        },
                        {
                            "id": 18,
                            "name": "Sabhapokhari Rural Municipality"
                        },
                        {
                            "id": 19,
                            "name": "Silichong Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "SOLUKHUMBU",
                    "municipalityList": [
                        {
                            "id": 20,
                            "name": "Mapya Rural Municipality"
                        },
                        {
                            "id": 21,
                            "name": "Thulung Rural Municipality"
                        },
                        {
                            "id": 22,
                            "name": "Khumbupasanglahmu Rural Municipality"
                        },
                        {
                            "id": 23,
                            "name": "Likhupike Rural Municipality"
                        },
                        {
                            "id": 24,
                            "name": "Mahakulung Rural Municipality"
                        },
                        {
                            "id": 25,
                            "name": "Necha Salyan Rural Municipality"
                        },
                        {
                            "id": 26,
                            "name": "Solududhakunda Municipality"
                        },
                        {
                            "id": 27,
                            "name": "Sotang Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "OKHALDHUNGA",
                    "municipalityList": [
                        {
                            "id": 28,
                            "name": "Champadevi Rural Municipality"
                        },
                        {
                            "id": 29,
                            "name": "Chisankhugadhi Rural Municipality"
                        },
                        {
                            "id": 30,
                            "name": "Khijidemba Rural Municipality"
                        },
                        {
                            "id": 31,
                            "name": "Likhu Rural Municipality"
                        },
                        {
                            "id": 32,
                            "name": "Manebhanjyang Rural Municipality"
                        },
                        {
                            "id": 33,
                            "name": "Molung Rural Municipality"
                        },
                        {
                            "id": 34,
                            "name": "Siddhicharan Municipality"
                        },
                        {
                            "id": 35,
                            "name": "Sunkoshi Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "KHOTANG",
                    "municipalityList": [
                        {
                            "id": 36,
                            "name": "Ainselukhark Rural Municipality"
                        },
                        {
                            "id": 37,
                            "name": "Barahapokhari Rural Municipality"
                        },
                        {
                            "id": 38,
                            "name": "Diprung Rural Municipality"
                        },
                        {
                            "id": 39,
                            "name": "Halesi Tuwachung Municipality"
                        },
                        {
                            "id": 40,
                            "name": "Jantedhunga Rural Municipality"
                        },
                        {
                            "id": 41,
                            "name": "Kepilasagadhi Rural Municipality"
                        },
                        {
                            "id": 42,
                            "name": "Khotehang Rural Municipality"
                        },
                        {
                            "id": 43,
                            "name": "Lamidanda Rural Municipality"
                        },
                        {
                            "id": 44,
                            "name": "Rupakot Majhuwagadhi Municipality"
                        },
                        {
                            "id": 45,
                            "name": "Sakela Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 6,
                    "name": "BHOJPUR",
                    "municipalityList": [
                        {
                            "id": 46,
                            "name": "Aamchowk Rural Municipality"
                        },
                        {
                            "id": 47,
                            "name": "Arun Rural Municipality"
                        },
                        {
                            "id": 48,
                            "name": "Bhojpur Municipality"
                        },
                        {
                            "id": 49,
                            "name": "Hatuwagadhi Rural Municipality"
                        },
                        {
                            "id": 50,
                            "name": "Pauwadungma Rural Municipality"
                        },
                        {
                            "id": 51,
                            "name": "Ram Prasad Rai Rural Municipality"
                        },
                        {
                            "id": 52,
                            "name": "Shadananda Municipality"
                        },
                        {
                            "id": 53,
                            "name": "Salpa silicho Rural Municipality"
                        },
                        {
                            "id": 54,
                            "name": "Tayamkemaiyum Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 7,
                    "name": "DHANKUTA",
                    "municipalityList": [
                        {
                            "id": 55,
                            "name": "Cha Thar Jorpati Rural Municipality"
                        },
                        {
                            "id": 56,
                            "name": "Chaubise Rural Municipality"
                        },
                        {
                            "id": 57,
                            "name": "Dhankuta Municipality"
                        },
                        {
                            "id": 58,
                            "name": "Khalsa Chintang Sahidbhumi Rural Municipality"
                        },
                        {
                            "id": 59,
                            "name": "Mahalakshmi Municipality"
                        },
                        {
                            "id": 60,
                            "name": "Pakhribash Municipality"
                        },
                        {
                            "id": 61,
                            "name": "Sangurigadhi Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 8,
                    "name": "TERHATHUM",
                    "municipalityList": [
                        {
                            "id": 62,
                            "name": "Aathrai Rural Municipality"
                        },
                        {
                            "id": 63,
                            "name": "Chaa Thar Rural Municipality"
                        },
                        {
                            "id": 64,
                            "name": "Laliguransh Municipality"
                        },
                        {
                            "id": 65,
                            "name": "Menchayayam Rural Municipality"
                        },
                        {
                            "id": 66,
                            "name": "Myanglung Municipality"
                        },
                        {
                            "id": 67,
                            "name": "Phedap Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 9,
                    "name": "PANCHTHAR",
                    "municipalityList": [
                        {
                            "id": 68,
                            "name": "Falgunanda Rural Municipality"
                        },
                        {
                            "id": 69,
                            "name": "Hilihang Rural Municipality"
                        },
                        {
                            "id": 70,
                            "name": "Kummayak Rural Municipality"
                        },
                        {
                            "id": 71,
                            "name": "Miklajung Rural Municipality"
                        },
                        {
                            "id": 72,
                            "name": "Phalaelung Rural Municipality"
                        },
                        {
                            "id": 73,
                            "name": "Phidim Municipality"
                        },
                        {
                            "id": 74,
                            "name": "Tumwaewa Rural Municipality"
                        },
                        {
                            "id": 75,
                            "name": "Yangwarak Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 10,
                    "name": "ILAM",
                    "municipalityList": [
                        {
                            "id": 76,
                            "name": "Chulachuli Rural Municipality"
                        },
                        {
                            "id": 77,
                            "name": "Deumai Municipality"
                        },
                        {
                            "id": 78,
                            "name": "Fakfokthum Rural Municipality"
                        },
                        {
                            "id": 79,
                            "name": "Ilam Municipality"
                        },
                        {
                            "id": 80,
                            "name": "Mai Jogmai Rural Municipality"
                        },
                        {
                            "id": 81,
                            "name": "Mai Municipality"
                        },
                        {
                            "id": 82,
                            "name": "Mangsebung Rural Municipality"
                        },
                        {
                            "id": 83,
                            "name": "Rong Rural Municipality"
                        },
                        {
                            "id": 84,
                            "name": "Sandakpur Rural Municipality"
                        },
                        {
                            "id": 85,
                            "name": "Suryaudaya Municipality"
                        }
                    ]
                },
                {
                    "id": 11,
                    "name": "JHAPA",
                    "municipalityList": [
                        {
                            "id": 86,
                            "name": "Arjundhara Municipality"
                        },
                        {
                            "id": 87,
                            "name": "Barhadashi Rural Municipality"
                        },
                        {
                            "id": 88,
                            "name": "Bhadrapur Municipality"
                        },
                        {
                            "id": 89,
                            "name": "Birtamod Municipality"
                        },
                        {
                            "id": 90,
                            "name": "Buddha Shanti Rural Municipality"
                        },
                        {
                            "id": 91,
                            "name": "Damak Municipality"
                        },
                        {
                            "id": 92,
                            "name": "Gauradaha Municipality"
                        },
                        {
                            "id": 93,
                            "name": "Gaurigunj Rural Municipality"
                        },
                        {
                            "id": 94,
                            "name": "Haldibari Rural Municipality"
                        },
                        {
                            "id": 95,
                            "name": "Jhapa Rural Municipality"
                        },
                        {
                            "id": 96,
                            "name": "Kachanakawal Rural Municipality"
                        },
                        {
                            "id": 97,
                            "name": "Kamal Rural Municipality"
                        },
                        {
                            "id": 98,
                            "name": "Kankai Municipality"
                        },
                        {
                            "id": 99,
                            "name": "Mechinagar Municipality"
                        },
                        {
                            "id": 100,
                            "name": "Sitasatakshi Municipality"
                        }
                    ]
                },
                {
                    "id": 12,
                    "name": "MORANG",
                    "municipalityList": [
                        {
                            "id": 101,
                            "name": "Belbari Municipality"
                        },
                        {
                            "id": 102,
                            "name": "Biratnagar Upa Maha Municipality"
                        },
                        {
                            "id": 103,
                            "name": "Budhiganga Rural Municipality"
                        },
                        {
                            "id": 104,
                            "name": "Dha Municipality althan Rural Municipality"
                        },
                        {
                            "id": 105,
                            "name": "Gramthan Rural Municipality"
                        },
                        {
                            "id": 106,
                            "name": "Jahada Rural Municipality"
                        },
                        {
                            "id": 107,
                            "name": "Kanepokhari Rural Municipality"
                        },
                        {
                            "id": 108,
                            "name": "Katahari Rural Municipality"
                        },
                        {
                            "id": 109,
                            "name": "Kerabari Rural Municipality"
                        },
                        {
                            "id": 110,
                            "name": "Letang Municipality"
                        },
                        {
                            "id": 111,
                            "name": "Miklajung Rural Municipality"
                        },
                        {
                            "id": 112,
                            "name": "Patahri shanishchare Municipality"
                        },
                        {
                            "id": 113,
                            "name": "Rangeli Municipality"
                        },
                        {
                            "id": 114,
                            "name": "Ratuwamai Municipality"
                        },
                        {
                            "id": 115,
                            "name": "Sundar Haraicha Municipality"
                        },
                        {
                            "id": 116,
                            "name": "Sunbarshi municipality"
                        },
                        {
                            "id": 117,
                            "name": "Uralabari Municipality"
                        }
                    ]
                },
                {
                    "id": 13,
                    "name": "SUNSARI",
                    "municipalityList": [
                        {
                            "id": 118,
                            "name": "Baraha Municipality"
                        },
                        {
                            "id": 119,
                            "name": "Barju Rural Municipality"
                        },
                        {
                            "id": 120,
                            "name": "Devangunj Rural Municipality"
                        },
                        {
                            "id": 121,
                            "name": "Dharan Upamaha Municipality"
                        },
                        {
                            "id": 122,
                            "name": "Duhabi Municipality"
                        },
                        {
                            "id": 123,
                            "name": "Gadhi Rural Municipality"
                        },
                        {
                            "id": 124,
                            "name": "Harinagar Rural Municipality"
                        },
                        {
                            "id": 125,
                            "name": "Inarwa Municipality"
                        },
                        {
                            "id": 126,
                            "name": "Itahari Upa Maha Municipality"
                        },
                        {
                            "id": 127,
                            "name": "Jhokraha Rural Municipality"
                        },
                        {
                            "id": 128,
                            "name": "Koshi Rural Municipality"
                        },
                        {
                            "id": 129,
                            "name": "Ramdhuni Municipality"
                        }
                    ]
                },
                {
                    "id": 14,
                    "name": "UDAYAPUR",
                    "municipalityList": [
                        {
                            "id": 130,
                            "name": "Belaka Municipality"
                        },
                        {
                            "id": 131,
                            "name": "Chaudandigadhi Municipality"
                        },
                        {
                            "id": 132,
                            "name": "Katari Municipality"
                        },
                        {
                            "id": 133,
                            "name": "Rautamai Rural Municipality"
                        },
                        {
                            "id": 134,
                            "name": "Sunkoshi Rural Municipality"
                        },
                        {
                            "id": 135,
                            "name": "Tapli Rural Municipality"
                        },
                        {
                            "id": 136,
                            "name": "Triyuga Municipality"
                        },
                        {
                            "id": 137,
                            "name": "Udayapurgadhi Rural Municipality"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "MADHESH PROVINCE",
            "districtList": [
                {
                    "id": 15,
                    "name": "SAPTARI",
                    "municipalityList": [
                        {
                            "id": 138,
                            "name": "Rajgadh Rural Municipality"
                        },
                        {
                            "id": 139,
                            "name": "Bishnupur Rural Municipality"
                        },
                        {
                            "id": 140,
                            "name": "Bode Barsain Municipality"
                        },
                        {
                            "id": 141,
                            "name": "Chhinnamasta Rural Municipality"
                        },
                        {
                            "id": 142,
                            "name": "Dakneshwori Municipality"
                        },
                        {
                            "id": 143,
                            "name": "Hanumannagar Kankalani Municipality"
                        },
                        {
                            "id": 144,
                            "name": "Kanchanrup Municipality"
                        },
                        {
                            "id": 145,
                            "name": "Khadak Municipality"
                        },
                        {
                            "id": 146,
                            "name": "Krishna Savaran Rural Municipality"
                        },
                        {
                            "id": 147,
                            "name": "Mahadev Rural Municipality"
                        },
                        {
                            "id": 148,
                            "name": "Rajbiraj Municipality"
                        },
                        {
                            "id": 149,
                            "name": "Rupani Rural Municipality"
                        },
                        {
                            "id": 150,
                            "name": "Saptakoshi Rural Municipality"
                        },
                        {
                            "id": 151,
                            "name": "Shambhunath Municipality"
                        },
                        {
                            "id": 152,
                            "name": "Balanbihul Rural Municipality"
                        },
                        {
                            "id": 153,
                            "name": "Tilathi Koiladi Rural Municipality"
                        },
                        {
                            "id": 154,
                            "name": "Tirahut Rural Municipality"
                        },
                        {
                            "id": 155,
                            "name": "Surunga Municipality"
                        }
                    ]
                },
                {
                    "id": 16,
                    "name": "SIRAHA",
                    "municipalityList": [
                        {
                            "id": 156,
                            "name": "Arnama Rural Municipality"
                        },
                        {
                            "id": 157,
                            "name": "Aurahi Rural Municipality"
                        },
                        {
                            "id": 158,
                            "name": "Bariyarpatti Rural Municipality"
                        },
                        {
                            "id": 159,
                            "name": "Bhagawa Municipality ur Rural Municipality"
                        },
                        {
                            "id": 160,
                            "name": "Dhangadhimai Municipality"
                        },
                        {
                            "id": 161,
                            "name": "Golbazar Municipality"
                        },
                        {
                            "id": 162,
                            "name": "Kalya Municipality ur Municipality"
                        },
                        {
                            "id": 163,
                            "name": "Karjanhya Rural Municipality"
                        },
                        {
                            "id": 164,
                            "name": "Lahan Municipality"
                        },
                        {
                            "id": 165,
                            "name": "Laxmipur Patari Rural Municipality"
                        },
                        {
                            "id": 166,
                            "name": "Mirchaiya Municipality"
                        },
                        {
                            "id": 167,
                            "name": "Naraha Rural Municipality"
                        },
                        {
                            "id": 168,
                            "name": "Nawarajpur Rural Municipality"
                        },
                        {
                            "id": 169,
                            "name": "Sakhuwanankarkatti Rural Municipality"
                        },
                        {
                            "id": 170,
                            "name": "Siraha Municipality"
                        },
                        {
                            "id": 171,
                            "name": "Sukhipur Rural Municipality"
                        },
                        {
                            "id": 172,
                            "name": "Bishnupur Gaunpalika"
                        }
                    ]
                },
                {
                    "id": 17,
                    "name": "DHANUSA",
                    "municipalityList": [
                        {
                            "id": 173,
                            "name": "Chireshwar Nath Municipality"
                        },
                        {
                            "id": 174,
                            "name": "Dhanushadham Municipality"
                        },
                        {
                            "id": 175,
                            "name": "Sabaila Municipality"
                        },
                        {
                            "id": 176,
                            "name": "Mithla Municipality"
                        },
                        {
                            "id": 177,
                            "name": "Ganeshman Charnath N.P."
                        },
                        {
                            "id": 178,
                            "name": "Janakpur Up Municipality"
                        },
                        {
                            "id": 179,
                            "name": "Shahidnagar Nagar palika"
                        },
                        {
                            "id": 180,
                            "name": "Mithala Bihari nagar palika"
                        },
                        {
                            "id": 181,
                            "name": "Hanshpur Nagar Palika"
                        },
                        {
                            "id": 182,
                            "name": "Bideha Nagar Palika"
                        },
                        {
                            "id": 183,
                            "name": "Kamala siddhi Nagar Palika"
                        },
                        {
                            "id": 184,
                            "name": "Nagarain nagar Palika"
                        },
                        {
                            "id": 185,
                            "name": "mukhiya Patti gaun Palika"
                        },
                        {
                            "id": 186,
                            "name": "Bateshwar Gaun Palika"
                        },
                        {
                            "id": 187,
                            "name": "Dhanauji gaun Palika"
                        },
                        {
                            "id": 188,
                            "name": "Janak Nandani gaun Palika"
                        },
                        {
                            "id": 189,
                            "name": "Laxminya Gaun Palika"
                        },
                        {
                            "id": 190,
                            "name": "Aarurahi Gaun Palika"
                        }
                    ]
                },
                {
                    "id": 18,
                    "name": "MAHOTTARI",
                    "municipalityList": [
                        {
                            "id": 191,
                            "name": "Loharpatti Municipality"
                        },
                        {
                            "id": 192,
                            "name": "Bardibas Municipality"
                        },
                        {
                            "id": 193,
                            "name": "Aurhi Municipality"
                        },
                        {
                            "id": 194,
                            "name": "Ramgopalpur Municipality"
                        },
                        {
                            "id": 195,
                            "name": "Gaushala Municipality"
                        },
                        {
                            "id": 196,
                            "name": "Balba Municipality"
                        },
                        {
                            "id": 197,
                            "name": "Manara Siswa Municipality"
                        },
                        {
                            "id": 198,
                            "name": "Bhangha Municipality"
                        },
                        {
                            "id": 199,
                            "name": "Mathihani Municipality"
                        },
                        {
                            "id": 200,
                            "name": "Jaleswar Muncipality"
                        },
                        {
                            "id": 201,
                            "name": "Mahottari Rural Municipality"
                        },
                        {
                            "id": 202,
                            "name": "Samshi Rural Municipality"
                        },
                        {
                            "id": 203,
                            "name": "Sonma Rural Municipality"
                        },
                        {
                            "id": 204,
                            "name": "Ekdara Rural Municipality"
                        },
                        {
                            "id": 205,
                            "name": "Pipra Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 19,
                    "name": "SARLAHI",
                    "municipalityList": [
                        {
                            "id": 206,
                            "name": "Malangwa Municipality"
                        },
                        {
                            "id": 207,
                            "name": "Haripurwa Municipality"
                        },
                        {
                            "id": 208,
                            "name": "Godaita Municipality"
                        },
                        {
                            "id": 209,
                            "name": "Balara Municipality"
                        },
                        {
                            "id": 210,
                            "name": "Ishworpur Municipality"
                        },
                        {
                            "id": 211,
                            "name": "Lalbandi Municipality"
                        },
                        {
                            "id": 212,
                            "name": "Bagmati Municipality"
                        },
                        {
                            "id": 213,
                            "name": "Barhathwa Municipality"
                        },
                        {
                            "id": 214,
                            "name": "Haripur Municipality"
                        },
                        {
                            "id": 215,
                            "name": "Hariwon Municipality"
                        },
                        {
                            "id": 216,
                            "name": "Kabilashi Municipality"
                        },
                        {
                            "id": 217,
                            "name": "Kaudena Rural Municipality"
                        },
                        {
                            "id": 218,
                            "name": "Chandranagar Rural Municipality"
                        },
                        {
                            "id": 219,
                            "name": "Brahmpuri Rural Municipality"
                        },
                        {
                            "id": 220,
                            "name": "Parsa Rural Municipality"
                        },
                        {
                            "id": 221,
                            "name": "Chakraghatta Rural Municipality"
                        },
                        {
                            "id": 222,
                            "name": "Bishnu Rural Municipality"
                        },
                        {
                            "id": 223,
                            "name": "Ramnagar Rural Municipality"
                        },
                        {
                            "id": 224,
                            "name": "Basbariya Rural Municipality"
                        },
                        {
                            "id": 225,
                            "name": "Dhankaul Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 20,
                    "name": "RAUTAHAT",
                    "municipalityList": [
                        {
                            "id": 226,
                            "name": "chandrapur Municipality"
                        },
                        {
                            "id": 227,
                            "name": "garudha Municipality"
                        },
                        {
                            "id": 228,
                            "name": "gaur Municipality"
                        },
                        {
                            "id": 229,
                            "name": "baudhimai Municipality"
                        },
                        {
                            "id": 230,
                            "name": "brindaban Municipality"
                        },
                        {
                            "id": 231,
                            "name": "devahi gonahi Municipality"
                        },
                        {
                            "id": 232,
                            "name": "durgabhagwati Municipality"
                        },
                        {
                            "id": 233,
                            "name": "gadhimai Municipality"
                        },
                        {
                            "id": 234,
                            "name": "gajura Municipality"
                        },
                        {
                            "id": 235,
                            "name": "kathariya Municipality"
                        },
                        {
                            "id": 236,
                            "name": "madab narayan Municipality"
                        },
                        {
                            "id": 237,
                            "name": "mailapur Municipality"
                        },
                        {
                            "id": 238,
                            "name": "fatuwa bijaypur Municipality"
                        },
                        {
                            "id": 239,
                            "name": "isnath Municipality"
                        },
                        {
                            "id": 240,
                            "name": "proha Municipality"
                        },
                        {
                            "id": 241,
                            "name": "rajpur Municipality"
                        },
                        {
                            "id": 242,
                            "name": "yamunamai rural municipality"
                        },
                        {
                            "id": 243,
                            "name": "rajdevi rural municipality"
                        }
                    ]
                },
                {
                    "id": 21,
                    "name": "BARA",
                    "municipalityList": [
                        {
                            "id": 244,
                            "name": "SIMRONGODH Municipality"
                        },
                        {
                            "id": 245,
                            "name": "KOLHABI Municipality"
                        },
                        {
                            "id": 246,
                            "name": "NIJGADH Municipality"
                        },
                        {
                            "id": 247,
                            "name": "AADARSHA KOTWAL Rural Municipality"
                        },
                        {
                            "id": 248,
                            "name": "Baragadhi Rural Munucipality"
                        },
                        {
                            "id": 249,
                            "name": "MAHA GADHIMAI GA. PA."
                        },
                        {
                            "id": 250,
                            "name": "PACHARAUTA Municipality"
                        },
                        {
                            "id": 251,
                            "name": "DEVTAL GA. PA."
                        },
                        {
                            "id": 252,
                            "name": "Subarna Rural Municipality"
                        },
                        {
                            "id": 253,
                            "name": "KARAIYAMAI GA. PA."
                        },
                        {
                            "id": 254,
                            "name": "kalaiya Sub-metropolitian City"
                        },
                        {
                            "id": 255,
                            "name": "JITPUR SIMARA UP. MA. Municipality ."
                        },
                        {
                            "id": 256,
                            "name": "PARWANIPUR GA. PA."
                        },
                        {
                            "id": 257,
                            "name": "PRASAUNI GA. PA."
                        },
                        {
                            "id": 258,
                            "name": "Bishrampur Rural Munucipality"
                        },
                        {
                            "id": 259,
                            "name": "PHETA GA. PA."
                        }
                    ]
                },
                {
                    "id": 22,
                    "name": "PARSA",
                    "municipalityList": [
                        {
                            "id": 260,
                            "name": "Bahudaramai Rural Municipality"
                        },
                        {
                            "id": 261,
                            "name": "Jeerabhawani Rural Municipality"
                        },
                        {
                            "id": 262,
                            "name": "Bindabasini Rural Municipality"
                        },
                        {
                            "id": 263,
                            "name": "Birgunj Municipality"
                        },
                        {
                            "id": 264,
                            "name": "Chhipaharmai Rural Municipality"
                        },
                        {
                            "id": 265,
                            "name": "Dhobini Rural Municipality"
                        },
                        {
                            "id": 266,
                            "name": "Jagarnathpur Rural Municipality"
                        },
                        {
                            "id": 267,
                            "name": "Pakahamai Municipality ur Rural Municipality"
                        },
                        {
                            "id": 268,
                            "name": "Parsagadhi Rural Municipality"
                        },
                        {
                            "id": 269,
                            "name": "Paterwa sugauli Rural Municipality"
                        },
                        {
                            "id": 270,
                            "name": "Pokhariya Municipality"
                        },
                        {
                            "id": 271,
                            "name": "SakhuwaPrasauni Rural Municipality"
                        },
                        {
                            "id": 272,
                            "name": "Thori Rural Municipality"
                        },
                        {
                            "id": 273,
                            "name": "Kalikamai Rural Municipality"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "name": "BAGMATI PROVINCE",
            "districtList": [
                {
                    "id": 23,
                    "name": "DOLAKHA",
                    "municipalityList": [
                        {
                            "id": 274,
                            "name": "Baiteshwor Rural Municipality"
                        },
                        {
                            "id": 275,
                            "name": "Bhimeshwor Municipality"
                        },
                        {
                            "id": 276,
                            "name": "Bigu Rural Municipality"
                        },
                        {
                            "id": 277,
                            "name": "Gaurishankar Rural Municipality"
                        },
                        {
                            "id": 278,
                            "name": "Jiri Municipality"
                        },
                        {
                            "id": 279,
                            "name": "Kalinchok Rural Municipality"
                        },
                        {
                            "id": 280,
                            "name": "Melung Rural Municipality"
                        },
                        {
                            "id": 281,
                            "name": "Sailung Rural Municipality"
                        },
                        {
                            "id": 282,
                            "name": "Tamakoshi Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 24,
                    "name": "SINDHUPALCHOWK",
                    "municipalityList": [
                        {
                            "id": 283,
                            "name": "Balefi Rural Municipality"
                        },
                        {
                            "id": 284,
                            "name": "Barhabise Municipality"
                        },
                        {
                            "id": 285,
                            "name": "Bhotekoshi Rural Municipality"
                        },
                        {
                            "id": 286,
                            "name": "Chautara Sangachokgadhi Municipality"
                        },
                        {
                            "id": 287,
                            "name": "Helambu Rural Municipality"
                        },
                        {
                            "id": 288,
                            "name": "Indrawati Rural Municipality"
                        },
                        {
                            "id": 289,
                            "name": "Jugal Rural Municipality"
                        },
                        {
                            "id": 290,
                            "name": "Lisangkhu Pakhar Rural Municipality"
                        },
                        {
                            "id": 291,
                            "name": "Sunkoshi Rural Municipality"
                        },
                        {
                            "id": 292,
                            "name": "Melamchi Municipality"
                        },
                        {
                            "id": 293,
                            "name": "Panchpokhari ThanRural Municipality"
                        },
                        {
                            "id": 294,
                            "name": "Tripurasundari Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 25,
                    "name": "RASUWA",
                    "municipalityList": [
                        {
                            "id": 295,
                            "name": "Gosaikunda Rural Municipality"
                        },
                        {
                            "id": 296,
                            "name": "Kalika Rural Municipality"
                        },
                        {
                            "id": 297,
                            "name": "Naukunda Rural Municipality"
                        },
                        {
                            "id": 298,
                            "name": "Parbati Kunda Rural Municipality"
                        },
                        {
                            "id": 299,
                            "name": "Uttargaya Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 26,
                    "name": "DHADING",
                    "municipalityList": [
                        {
                            "id": 300,
                            "name": "Benighat Rorang Rural Municipality"
                        },
                        {
                            "id": 301,
                            "name": "Galchhi Rural Municipality"
                        },
                        {
                            "id": 302,
                            "name": "Dhunibesi Municipality"
                        },
                        {
                            "id": 303,
                            "name": "Gajuri Rural Municipality"
                        },
                        {
                            "id": 304,
                            "name": "Gangajamuna Rural Municipality"
                        },
                        {
                            "id": 305,
                            "name": "Jwalamukhi Rural Municipality"
                        },
                        {
                            "id": 306,
                            "name": "Khaniyabash Rural Municipality"
                        },
                        {
                            "id": 307,
                            "name": "Netrawati Rural Municipality"
                        },
                        {
                            "id": 308,
                            "name": "Nilakantha Municipality"
                        },
                        {
                            "id": 309,
                            "name": "Rubi Valley Rural Municipality"
                        },
                        {
                            "id": 310,
                            "name": "Siddhalek Rural Municipality"
                        },
                        {
                            "id": 311,
                            "name": "Thakre Rural Municipality"
                        },
                        {
                            "id": 312,
                            "name": "Tripura Sundari Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 27,
                    "name": "NUWAKOT",
                    "municipalityList": [
                        {
                            "id": 313,
                            "name": "Belkotgadhi Municipality"
                        },
                        {
                            "id": 314,
                            "name": "Bidur Municipality"
                        },
                        {
                            "id": 315,
                            "name": "Dupcheshwar Rural Municipality"
                        },
                        {
                            "id": 316,
                            "name": "Kakani Rural Municipality"
                        },
                        {
                            "id": 317,
                            "name": "Kispang Rural Municipality"
                        },
                        {
                            "id": 318,
                            "name": "Likhu Rural Municipality"
                        },
                        {
                            "id": 319,
                            "name": "Meghang Rural Municipality"
                        },
                        {
                            "id": 320,
                            "name": "Panchakanya Rural Municipality"
                        },
                        {
                            "id": 321,
                            "name": "Shivapuri Rural Municipality"
                        },
                        {
                            "id": 322,
                            "name": "Suryagadhi Rural Municipality"
                        },
                        {
                            "id": 323,
                            "name": "Tadi Rural Municipality"
                        },
                        {
                            "id": 324,
                            "name": "Tarkeshwar Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 28,
                    "name": "KATHMANDU",
                    "municipalityList": [
                        {
                            "id": 325,
                            "name": "Budhanilakantha Municipality"
                        },
                        {
                            "id": 326,
                            "name": "Chandragiri Municipality"
                        },
                        {
                            "id": 327,
                            "name": "Dakshinkali Municipality"
                        },
                        {
                            "id": 328,
                            "name": "Gokarneshwor Municipality"
                        },
                        {
                            "id": 329,
                            "name": "Kageshwori Manahora Municipality"
                        },
                        {
                            "id": 330,
                            "name": "Kathmandu Maha Municipality"
                        },
                        {
                            "id": 331,
                            "name": "Kirtipur Municipality"
                        },
                        {
                            "id": 332,
                            "name": "Nagarjun Municipality"
                        },
                        {
                            "id": 333,
                            "name": "Shankharapur Municipality"
                        },
                        {
                            "id": 334,
                            "name": "Tarakeshwor Municipality"
                        },
                        {
                            "id": 335,
                            "name": "Tokha Municipality"
                        }
                    ]
                },
                {
                    "id": 29,
                    "name": "BHAKTAPUR",
                    "municipalityList": [
                        {
                            "id": 336,
                            "name": "Bhaktapur Municipality"
                        },
                        {
                            "id": 337,
                            "name": "Changunarayan Municipality"
                        },
                        {
                            "id": 338,
                            "name": "Madhyapur Thimi Municipality"
                        },
                        {
                            "id": 339,
                            "name": "Suryabinayak Municipality"
                        }
                    ]
                },
                {
                    "id": 30,
                    "name": "LALITPUR",
                    "municipalityList": [
                        {
                            "id": 340,
                            "name": "Bagmati Rural Municipality"
                        },
                        {
                            "id": 341,
                            "name": "Godawari Municipality"
                        },
                        {
                            "id": 342,
                            "name": "Konjyosom Rural Municipality"
                        },
                        {
                            "id": 343,
                            "name": "Lalitpur Maha Municipality"
                        },
                        {
                            "id": 344,
                            "name": "Mahalaxmi Municipality"
                        },
                        {
                            "id": 345,
                            "name": "Mahankal Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 31,
                    "name": "KAVREPALANCHOK",
                    "municipalityList": [
                        {
                            "id": 346,
                            "name": "Banepa Municipality"
                        },
                        {
                            "id": 347,
                            "name": "Bethanchowk Rural Municipality"
                        },
                        {
                            "id": 348,
                            "name": "Bhumlu Rural Municipality"
                        },
                        {
                            "id": 349,
                            "name": "Chaurideurali Rural Municipality"
                        },
                        {
                            "id": 350,
                            "name": "Dhulikhel Municipality"
                        },
                        {
                            "id": 351,
                            "name": "Khanikola Rural Municipality"
                        },
                        {
                            "id": 352,
                            "name": "Mahabharat Rural Municipality"
                        },
                        {
                            "id": 353,
                            "name": "Mandandeupur Municipality"
                        },
                        {
                            "id": 354,
                            "name": "Namobuddha Municipality"
                        },
                        {
                            "id": 355,
                            "name": "Panauti Municipality"
                        },
                        {
                            "id": 356,
                            "name": "Panchkhal Municipality"
                        },
                        {
                            "id": 357,
                            "name": "Roshi Rural Municipality"
                        },
                        {
                            "id": 358,
                            "name": "Temal Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 32,
                    "name": "RAMECHHAP",
                    "municipalityList": [
                        {
                            "id": 359,
                            "name": "Doramba Rural Municipality"
                        },
                        {
                            "id": 360,
                            "name": "Gokulganga Rural Municipality"
                        },
                        {
                            "id": 361,
                            "name": "Khadadevi Rural Municipality"
                        },
                        {
                            "id": 362,
                            "name": "Manthali Municipality"
                        },
                        {
                            "id": 363,
                            "name": "Likhu Rural Municipality"
                        },
                        {
                            "id": 364,
                            "name": "Ramechhap Municipality"
                        },
                        {
                            "id": 365,
                            "name": "Sunapati Rural Municipality"
                        },
                        {
                            "id": 366,
                            "name": "Umakunda Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 33,
                    "name": "SINDHULI",
                    "municipalityList": [
                        {
                            "id": 367,
                            "name": "Dudhouli Municipality"
                        },
                        {
                            "id": 368,
                            "name": "Ghanglekh Rural Municipality"
                        },
                        {
                            "id": 369,
                            "name": "Golanjor Rural Municipality"
                        },
                        {
                            "id": 370,
                            "name": "Hariharpurgadhi Rural Municipality"
                        },
                        {
                            "id": 371,
                            "name": "Kamalamai Municipality"
                        },
                        {
                            "id": 372,
                            "name": "Marin Rural Municipality"
                        },
                        {
                            "id": 373,
                            "name": "Phikkal Rural Municipality"
                        },
                        {
                            "id": 374,
                            "name": "Sunkoshi Rural Municipality"
                        },
                        {
                            "id": 375,
                            "name": "Ti Municipality atan Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 34,
                    "name": "MAKWANPUR",
                    "municipalityList": [
                        {
                            "id": 376,
                            "name": "Bakaiya Rural Municipality"
                        },
                        {
                            "id": 377,
                            "name": "Bhimphedi Rural Municipality"
                        },
                        {
                            "id": 378,
                            "name": "Bagmati Rural Municipality"
                        },
                        {
                            "id": 379,
                            "name": "Hetauda Upamaha Municipality"
                        },
                        {
                            "id": 380,
                            "name": "Indrasarowar Rural Municipality"
                        },
                        {
                            "id": 381,
                            "name": "Kailash Rural Municipality"
                        },
                        {
                            "id": 382,
                            "name": "Makawa Municipality urgadhi Rural Municipality"
                        },
                        {
                            "id": 383,
                            "name": "Manahari Rural Municipality"
                        },
                        {
                            "id": 384,
                            "name": "Raksirang Rural Municipality"
                        },
                        {
                            "id": 385,
                            "name": "Thaha Municipality"
                        }
                    ]
                },
                {
                    "id": 35,
                    "name": "CHITWAN",
                    "municipalityList": [
                        {
                            "id": 386,
                            "name": "Bharatpur Metropolitian City"
                        },
                        {
                            "id": 387,
                            "name": "Ichchha Kamana Rural Municipality"
                        },
                        {
                            "id": 388,
                            "name": "Kalika Municipality"
                        },
                        {
                            "id": 389,
                            "name": "Khairahani Municipality"
                        },
                        {
                            "id": 390,
                            "name": "Madi Municipality"
                        },
                        {
                            "id": 391,
                            "name": "Rapti Municipality"
                        },
                        {
                            "id": 392,
                            "name": "Ratnanagar Municipality"
                        }
                    ]
                }
            ]
        },
        {
            "id": 4,
            "name": "GANDAKI PROVINCE",
            "districtList": [
                {
                    "id": 36,
                    "name": "GORKHA",
                    "municipalityList": [
                        {
                            "id": 393,
                            "name": "Aarughat Rural Municipality"
                        },
                        {
                            "id": 394,
                            "name": "Ajirkot Rural Municipality"
                        },
                        {
                            "id": 395,
                            "name": "Bhimsen Rural Municipality"
                        },
                        {
                            "id": 396,
                            "name": "Chum Nubri Rural Municipality"
                        },
                        {
                            "id": 397,
                            "name": "Dharche Rural Municipality"
                        },
                        {
                            "id": 398,
                            "name": "Gandaki Rural Municipality"
                        },
                        {
                            "id": 399,
                            "name": "Gorkha Municipality"
                        },
                        {
                            "id": 400,
                            "name": "Palungtar Municipality"
                        },
                        {
                            "id": 401,
                            "name": "Sahid Lakhan Rural Municipality"
                        },
                        {
                            "id": 402,
                            "name": "Siranchok Rural Municipality"
                        },
                        {
                            "id": 403,
                            "name": "Sulikot Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 37,
                    "name": "MANANG",
                    "municipalityList": [
                        {
                            "id": 404,
                            "name": "Chame Rural Municipality"
                        },
                        {
                            "id": 405,
                            "name": "Narphu Rural Municipality"
                        },
                        {
                            "id": 406,
                            "name": "Nashong Rural Municipality"
                        },
                        {
                            "id": 407,
                            "name": "Neshyang Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 38,
                    "name": "MUSTANG",
                    "municipalityList": [
                        {
                            "id": 408,
                            "name": "Barha Gaun Muktikshetra Rural Municipality"
                        },
                        {
                            "id": 409,
                            "name": "Dalome Rural Municipality"
                        },
                        {
                            "id": 410,
                            "name": "Gharapjhong Rural Municipality"
                        },
                        {
                            "id": 411,
                            "name": "Lomanthang Rural Municipality"
                        },
                        {
                            "id": 412,
                            "name": "Thasang Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 39,
                    "name": "MYAGDI",
                    "municipalityList": [
                        {
                            "id": 413,
                            "name": "Beni Municipality"
                        },
                        {
                            "id": 414,
                            "name": "Annapurna Rural Municipality"
                        },
                        {
                            "id": 415,
                            "name": "Dhaulagiri Rural Municipality"
                        },
                        {
                            "id": 416,
                            "name": "Malika Rural Municipality"
                        },
                        {
                            "id": 417,
                            "name": "Mangala Rural Municipality"
                        },
                        {
                            "id": 418,
                            "name": "Raghuganga Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 40,
                    "name": "KASKI",
                    "municipalityList": [
                        {
                            "id": 419,
                            "name": "Machhapuchchhre Rural Municipality"
                        },
                        {
                            "id": 420,
                            "name": "Madi Rural Municipality"
                        },
                        {
                            "id": 421,
                            "name": "Pokhara Maha Municipality"
                        },
                        {
                            "id": 422,
                            "name": "Rupa Rural Municipality"
                        },
                        {
                            "id": 423,
                            "name": "Annapurna Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 41,
                    "name": "LAMJUNG",
                    "municipalityList": [
                        {
                            "id": 424,
                            "name": "Besi Sahar Municipality"
                        },
                        {
                            "id": 425,
                            "name": "Madhya Nepal Municipality"
                        },
                        {
                            "id": 426,
                            "name": "Rainaas Municipality"
                        },
                        {
                            "id": 427,
                            "name": "Sundar Bazar Municipality"
                        },
                        {
                            "id": 428,
                            "name": "Kablasothaar Municipality"
                        },
                        {
                            "id": 429,
                            "name": "Dudhpokhari Municipality"
                        },
                        {
                            "id": 430,
                            "name": "Dordi Municipality"
                        },
                        {
                            "id": 431,
                            "name": "Marsyangdi Municipality"
                        }
                    ]
                },
                {
                    "id": 42,
                    "name": "TANAHU",
                    "municipalityList": [
                        {
                            "id": 432,
                            "name": "Anbukhaireni Rural Municipality"
                        },
                        {
                            "id": 433,
                            "name": "Bandipur Rural Municipality"
                        },
                        {
                            "id": 434,
                            "name": "Bhanu Municipality"
                        },
                        {
                            "id": 435,
                            "name": "Bhimad Municipality"
                        },
                        {
                            "id": 436,
                            "name": "Byas Municipality"
                        },
                        {
                            "id": 437,
                            "name": "Devghat Rural Municipality"
                        },
                        {
                            "id": 438,
                            "name": "Ghiring Rural Municipality"
                        },
                        {
                            "id": 439,
                            "name": "Myagde Rural Municipality"
                        },
                        {
                            "id": 440,
                            "name": "Rhishing Rural Municipality"
                        },
                        {
                            "id": 441,
                            "name": "Shuklagandaki Municipality"
                        }
                    ]
                },
                {
                    "id": 43,
                    "name": "NAWALPARASI (BARDAGHAT SUSTA EAST)",
                    "municipalityList": [
                        {
                            "id": 442,
                            "name": "Binayee Triveni Rural Municipality"
                        },
                        {
                            "id": 443,
                            "name": "Bulingtar Rural Municipality"
                        },
                        {
                            "id": 444,
                            "name": "Bungdikali Rural Municipality"
                        },
                        {
                            "id": 445,
                            "name": "Devchuli Municipality"
                        },
                        {
                            "id": 446,
                            "name": "Gaidakot Municipality"
                        },
                        {
                            "id": 447,
                            "name": "Hupsekot Rural Municipality"
                        },
                        {
                            "id": 448,
                            "name": "Kawasoti Municipality"
                        },
                        {
                            "id": 449,
                            "name": "Madhyabindu Municipality"
                        }
                    ]
                },
                {
                    "id": 44,
                    "name": "SYANGJA",
                    "municipalityList": [
                        {
                            "id": 450,
                            "name": "Arjunchaupari Rural Municipality"
                        },
                        {
                            "id": 451,
                            "name": "Bhirkot Municipality"
                        },
                        {
                            "id": 452,
                            "name": "Biruwa Rural Municipality"
                        },
                        {
                            "id": 453,
                            "name": "Chapakot Municipality"
                        },
                        {
                            "id": 454,
                            "name": "Galyang Municipality"
                        },
                        {
                            "id": 455,
                            "name": "Harinas Rural Municipality"
                        },
                        {
                            "id": 456,
                            "name": "Kaligandaki Rural Municipality"
                        },
                        {
                            "id": 457,
                            "name": "Phedikhola Rural Municipality"
                        },
                        {
                            "id": 458,
                            "name": "Putalibazar Municipality"
                        },
                        {
                            "id": 459,
                            "name": "Waling Municipality"
                        },
                        {
                            "id": 460,
                            "name": "Aandhikhola Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 45,
                    "name": "PARBAT",
                    "municipalityList": [
                        {
                            "id": 461,
                            "name": "Bihadi Rural Municipality"
                        },
                        {
                            "id": 462,
                            "name": "Jaljala Rural Municipality"
                        },
                        {
                            "id": 463,
                            "name": "Kushma Municipality"
                        },
                        {
                            "id": 464,
                            "name": "Mahashila Rural Municipality"
                        },
                        {
                            "id": 465,
                            "name": "Modi Rural Municipality"
                        },
                        {
                            "id": 466,
                            "name": "Painyu Rural Municipality"
                        },
                        {
                            "id": 467,
                            "name": "Phalebas Municipality"
                        }
                    ]
                },
                {
                    "id": 46,
                    "name": "BAGLUNG",
                    "municipalityList": [
                        {
                            "id": 468,
                            "name": "Badigad Rural Municipality"
                        },
                        {
                            "id": 469,
                            "name": "Baglung Municipality"
                        },
                        {
                            "id": 470,
                            "name": "Bareng Rural Municipality"
                        },
                        {
                            "id": 471,
                            "name": "Dhorpatan Municipality"
                        },
                        {
                            "id": 472,
                            "name": "Galkot Municipality"
                        },
                        {
                            "id": 473,
                            "name": "Jaimuni Municipality"
                        },
                        {
                            "id": 474,
                            "name": "Kanthekhola Rural Municipality"
                        },
                        {
                            "id": 475,
                            "name": "Nisikhola Rural Municipality"
                        },
                        {
                            "id": 476,
                            "name": "TamanKhola Rural Municipality"
                        },
                        {
                            "id": 477,
                            "name": "TaraKhola Rural Municipality"
                        }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "name": "LUMBINI PROVINCE",
            "districtList": [
                {
                    "id": 47,
                    "name": "RUKUM EAST",
                    "municipalityList": [
                        {
                            "id": 478,
                            "name": "Bhume Rural Municipality"
                        },
                        {
                            "id": 479,
                            "name": "Putha Uttarganga Rural Municipality"
                        },
                        {
                            "id": 480,
                            "name": "Sisne Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 48,
                    "name": "ROLPA",
                    "municipalityList": [
                        {
                            "id": 481,
                            "name": "Paribartan Rural Municipality"
                        },
                        {
                            "id": 482,
                            "name": "Lungri Rural Municipality"
                        },
                        {
                            "id": 483,
                            "name": "Madi Rural Municipality"
                        },
                        {
                            "id": 484,
                            "name": "Rolpa Municipality"
                        },
                        {
                            "id": 485,
                            "name": "Runtigadi Rural Municipality"
                        },
                        {
                            "id": 486,
                            "name": "Gangadev Rural Municipality"
                        },
                        {
                            "id": 487,
                            "name": "Sunchhahari Rural Municipality"
                        },
                        {
                            "id": 488,
                            "name": "sunil smiriti Rural Municipality"
                        },
                        {
                            "id": 489,
                            "name": "Thawang Rural Municipality"
                        },
                        {
                            "id": 490,
                            "name": "Tribeni Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 49,
                    "name": "PYUTHAN",
                    "municipalityList": [
                        {
                            "id": 491,
                            "name": "Ayirabati Rural Municipality"
                        },
                        {
                            "id": 492,
                            "name": "Gaumukhi Rural Municipality"
                        },
                        {
                            "id": 493,
                            "name": "Jhimruk Rural Municipality"
                        },
                        {
                            "id": 494,
                            "name": "Mallarani Rural Municipality"
                        },
                        {
                            "id": 495,
                            "name": "Mandavi Rural Municipality"
                        },
                        {
                            "id": 496,
                            "name": "Naubahini Rural Municipality"
                        },
                        {
                            "id": 497,
                            "name": "Pyuthan Municipality"
                        },
                        {
                            "id": 498,
                            "name": "Sarumarani Rural Municipality"
                        },
                        {
                            "id": 499,
                            "name": "Sworgadwary Municipality"
                        }
                    ]
                },
                {
                    "id": 50,
                    "name": "GULMI",
                    "municipalityList": [
                        {
                            "id": 500,
                            "name": "Chandrakot Rural Municipality"
                        },
                        {
                            "id": 501,
                            "name": "Chatrakot Rural Municipality"
                        },
                        {
                            "id": 502,
                            "name": "Dhurkot Rural Municipality"
                        },
                        {
                            "id": 503,
                            "name": "Gulmidarbar Rural Municipality"
                        },
                        {
                            "id": 504,
                            "name": "Isma Rural Municipality"
                        },
                        {
                            "id": 505,
                            "name": "Kaligandaki Rural Municipality"
                        },
                        {
                            "id": 506,
                            "name": "Madane Rural Municipality"
                        },
                        {
                            "id": 507,
                            "name": "Malika Rural Municipality"
                        },
                        {
                            "id": 508,
                            "name": "Musikot Municipality"
                        },
                        {
                            "id": 509,
                            "name": "Resunga Municipality"
                        },
                        {
                            "id": 510,
                            "name": "Ruru Rural Municipality"
                        },
                        {
                            "id": 511,
                            "name": "Satyawati Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 51,
                    "name": "ARGHAKHANCHI",
                    "municipalityList": [
                        {
                            "id": 512,
                            "name": "Bhumikasthan Municipality"
                        },
                        {
                            "id": 513,
                            "name": "Chhatradev Rural Municipality"
                        },
                        {
                            "id": 514,
                            "name": "Malarani Rural Municipality"
                        },
                        {
                            "id": 515,
                            "name": "Panini Rural Municipality"
                        },
                        {
                            "id": 516,
                            "name": "Sandhikharka Municipality"
                        },
                        {
                            "id": 517,
                            "name": "Shitaganga Municipality"
                        }
                    ]
                },
                {
                    "id": 52,
                    "name": "PALPA",
                    "municipalityList": [
                        {
                            "id": 518,
                            "name": "Bagnaskali Rural Municipality"
                        },
                        {
                            "id": 519,
                            "name": "Mathagadhi Rural Municipality"
                        },
                        {
                            "id": 520,
                            "name": "Nisdi Rural Municipality"
                        },
                        {
                            "id": 521,
                            "name": "Purbakhola Rural Municipality"
                        },
                        {
                            "id": 522,
                            "name": "Rainadevi Chhahara Rural Municipality"
                        },
                        {
                            "id": 523,
                            "name": "Rambha Rural Municipality"
                        },
                        {
                            "id": 524,
                            "name": "Rampur Municipality"
                        },
                        {
                            "id": 525,
                            "name": "Ribdikot Rural Municipality"
                        },
                        {
                            "id": 526,
                            "name": "Tansen Municipality"
                        },
                        {
                            "id": 527,
                            "name": "Tinau Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 53,
                    "name": "NAWALPARASI (BARDAGHAT SUSTA WEST",
                    "municipalityList": [
                        {
                            "id": 528,
                            "name": "Bardaghat Municipality"
                        },
                        {
                            "id": 529,
                            "name": "Palhi Nandan Rural Municipality"
                        },
                        {
                            "id": 530,
                            "name": "Pratappur Rural Municipality"
                        },
                        {
                            "id": 531,
                            "name": "Ramgram Municipality"
                        },
                        {
                            "id": 532,
                            "name": "Sarawal Rural Municipality"
                        },
                        {
                            "id": 533,
                            "name": "Sunwal Municipality"
                        },
                        {
                            "id": 534,
                            "name": "Tribenisusta Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 54,
                    "name": "RUPANDEHI",
                    "municipalityList": [
                        {
                            "id": 535,
                            "name": "Butwal Upamaha Municipality"
                        },
                        {
                            "id": 536,
                            "name": "Devdaha Municipality"
                        },
                        {
                            "id": 537,
                            "name": "Gaidahawa Rural Municipality"
                        },
                        {
                            "id": 538,
                            "name": "Kanchan Rural Municipality"
                        },
                        {
                            "id": 539,
                            "name": "Kotahimai Rural Municipality"
                        },
                        {
                            "id": 540,
                            "name": "Lumbini SanskritikMunicipality"
                        },
                        {
                            "id": 541,
                            "name": "Marchawari Rural Municipality"
                        },
                        {
                            "id": 542,
                            "name": "Omsatiya Rural Municipality"
                        },
                        {
                            "id": 543,
                            "name": "Rohini Rural Municipality"
                        },
                        {
                            "id": 544,
                            "name": "Sainamaina Municipality"
                        },
                        {
                            "id": 545,
                            "name": "Sammarimai Rural Municipality"
                        },
                        {
                            "id": 546,
                            "name": "Siddharthanagar Municipality"
                        },
                        {
                            "id": 547,
                            "name": "Siyari Rural Municipality"
                        },
                        {
                            "id": 548,
                            "name": "Sudhdhodhan Rural Municipality"
                        },
                        {
                            "id": 549,
                            "name": "Tillotama Municipality"
                        },
                        {
                            "id": 550,
                            "name": "Mayadevi Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 55,
                    "name": "KAPILVASTU",
                    "municipalityList": [
                        {
                            "id": 551,
                            "name": "Banganga Municipality"
                        },
                        {
                            "id": 552,
                            "name": "Bijayanagar Rural Municipality"
                        },
                        {
                            "id": 553,
                            "name": "Buddhabhumi Municipality"
                        },
                        {
                            "id": 554,
                            "name": "Kapilbastu Municipality"
                        },
                        {
                            "id": 555,
                            "name": "Krishnanagar Municipality"
                        },
                        {
                            "id": 556,
                            "name": "Maharajgunj Municipality"
                        },
                        {
                            "id": 557,
                            "name": "Mayadevi Rural Municipality"
                        },
                        {
                            "id": 558,
                            "name": "Shivaraj Municipality"
                        },
                        {
                            "id": 559,
                            "name": "Suddhodhan Rural Municipality"
                        },
                        {
                            "id": 560,
                            "name": "Yashodhara Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 56,
                    "name": "DANG",
                    "municipalityList": [
                        {
                            "id": 561,
                            "name": "Babai Rural Municipality"
                        },
                        {
                            "id": 562,
                            "name": "Banglachuli Rural Municipality"
                        },
                        {
                            "id": 563,
                            "name": "Dangisharan Rural Municipality"
                        },
                        {
                            "id": 564,
                            "name": "Gadhawa Rural Municipality"
                        },
                        {
                            "id": 565,
                            "name": "Ghorahi Upamaha Municipality"
                        },
                        {
                            "id": 566,
                            "name": "Lamahi Municipality"
                        },
                        {
                            "id": 567,
                            "name": "Rajpur Rural Municipality"
                        },
                        {
                            "id": 568,
                            "name": "Rapti Rural Municipality"
                        },
                        {
                            "id": 569,
                            "name": "Shantinagar Rural Municipality"
                        },
                        {
                            "id": 570,
                            "name": "Tulsipur Upamaha Municipality"
                        }
                    ]
                },
                {
                    "id": 57,
                    "name": "BANKE",
                    "municipalityList": [
                        {
                            "id": 571,
                            "name": "Baijanath Rural Municipality"
                        },
                        {
                            "id": 572,
                            "name": "Duduwa Rural Municipality"
                        },
                        {
                            "id": 573,
                            "name": "Janaki Rural Municipality"
                        },
                        {
                            "id": 574,
                            "name": "Khajura Rural Municipality"
                        },
                        {
                            "id": 575,
                            "name": "Kohalpur Municipality"
                        },
                        {
                            "id": 576,
                            "name": "Narainapur Rural Municipality"
                        },
                        {
                            "id": 577,
                            "name": "Nepalganj Upamaha Municipality"
                        },
                        {
                            "id": 578,
                            "name": "Rapti sonari Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 58,
                    "name": "BARDIYA",
                    "municipalityList": [
                        {
                            "id": 579,
                            "name": "Badhaiyatal Rural Municipality"
                        },
                        {
                            "id": 580,
                            "name": "Bansagadhi Municipality"
                        },
                        {
                            "id": 581,
                            "name": "Barbardiya Municipality"
                        },
                        {
                            "id": 582,
                            "name": "Geruwa Rural Municipality"
                        },
                        {
                            "id": 583,
                            "name": "Gulariya Municipality"
                        },
                        {
                            "id": 584,
                            "name": "Madhuwan Municipality"
                        },
                        {
                            "id": 585,
                            "name": "Rajapur Municipality"
                        },
                        {
                            "id": 586,
                            "name": "Thakurbaba Municipality"
                        }
                    ]
                }
            ]
        },
        {
            "id": 6,
            "name": "KARNALI PROVINCE",
            "districtList": [
                {
                    "id": 59,
                    "name": "DOLPA",
                    "municipalityList": [
                        {
                            "id": 587,
                            "name": "Chharka Tangsong Rural Municipality"
                        },
                        {
                            "id": 588,
                            "name": "Dolpo Buddha Rural Municipality"
                        },
                        {
                            "id": 589,
                            "name": "Jagadulla Rural Municipality"
                        },
                        {
                            "id": 590,
                            "name": "Kaike Rural Municipality"
                        },
                        {
                            "id": 591,
                            "name": "Mudkechula Rural Municipality"
                        },
                        {
                            "id": 592,
                            "name": "Shey Phoksundo Rural Municipality"
                        },
                        {
                            "id": 593,
                            "name": "Thuli Bheri Municipality"
                        },
                        {
                            "id": 594,
                            "name": "Tripurasundari Municipality"
                        }
                    ]
                },
                {
                    "id": 60,
                    "name": "MUGU",
                    "municipalityList": [
                        {
                            "id": 595,
                            "name": "Chhayanath Rara Municipality"
                        },
                        {
                            "id": 596,
                            "name": "Khatyad Rural Municipality"
                        },
                        {
                            "id": 597,
                            "name": "Mugum Karmarong Rural Municipality"
                        },
                        {
                            "id": 598,
                            "name": "Soru Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 61,
                    "name": "HUMLA",
                    "municipalityList": [
                        {
                            "id": 599,
                            "name": "Adanchuli Rural Municipality"
                        },
                        {
                            "id": 600,
                            "name": "Chankheli Rural Municipality"
                        },
                        {
                            "id": 601,
                            "name": "Kharpunath Rural Municipality"
                        },
                        {
                            "id": 602,
                            "name": "Namkha Rural Municipality"
                        },
                        {
                            "id": 603,
                            "name": "Sarkegad Rural Municipality"
                        },
                        {
                            "id": 604,
                            "name": "Simkot Rural Municipality"
                        },
                        {
                            "id": 605,
                            "name": "Tanjakot Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 62,
                    "name": "JUMLA",
                    "municipalityList": [
                        {
                            "id": 606,
                            "name": "Chandannath Municipality"
                        },
                        {
                            "id": 607,
                            "name": "Guthichaur Tila Rural Municipality"
                        },
                        {
                            "id": 608,
                            "name": "Hima Rural Municipality"
                        },
                        {
                            "id": 609,
                            "name": "Kanakasundari Rural Municipality"
                        },
                        {
                            "id": 610,
                            "name": "Patarasi Rural Municipality"
                        },
                        {
                            "id": 611,
                            "name": "Sinja Rural Municipality"
                        },
                        {
                            "id": 612,
                            "name": "Tatopani Rural Municipality"
                        },
                        {
                            "id": 613,
                            "name": "Tila Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 63,
                    "name": "KALIKOT",
                    "municipalityList": [
                        {
                            "id": 614,
                            "name": "Kalika Rural Municipality"
                        },
                        {
                            "id": 615,
                            "name": "Khandachakra Municipality"
                        },
                        {
                            "id": 616,
                            "name": "Mahawai Rural Municipality"
                        },
                        {
                            "id": 617,
                            "name": "Naraharinath Rural Municipality"
                        },
                        {
                            "id": 618,
                            "name": "Pachaljharana Rural Municipality"
                        },
                        {
                            "id": 619,
                            "name": "Palata Rural Municipality"
                        },
                        {
                            "id": 620,
                            "name": "Raskot Municipality"
                        },
                        {
                            "id": 621,
                            "name": "Sanni Tribeni Rural Municipality"
                        },
                        {
                            "id": 622,
                            "name": "Tilagufa Municipality"
                        }
                    ]
                },
                {
                    "id": 64,
                    "name": "DAILEKH",
                    "municipalityList": [
                        {
                            "id": 623,
                            "name": "Aathabis Municipality"
                        },
                        {
                            "id": 624,
                            "name": "Bhagawatimai Rural Municipality"
                        },
                        {
                            "id": 625,
                            "name": "Bhairabi Rural Municipality"
                        },
                        {
                            "id": 626,
                            "name": "Chamunda Bindrasain Municipality"
                        },
                        {
                            "id": 627,
                            "name": "Dallu Municipality"
                        },
                        {
                            "id": 628,
                            "name": "Dungeshwor Rural Municipality"
                        },
                        {
                            "id": 629,
                            "name": "Gurans Rural Municipality"
                        },
                        {
                            "id": 630,
                            "name": "Mahabu Gaun Palika"
                        },
                        {
                            "id": 631,
                            "name": "Narayan Municipality"
                        },
                        {
                            "id": 632,
                            "name": "Naumule Rural Municipality"
                        },
                        {
                            "id": 633,
                            "name": "Thantikandh Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 65,
                    "name": "SURKHET",
                    "municipalityList": [
                        {
                            "id": 634,
                            "name": "Barekot Rural Municipality"
                        },
                        {
                            "id": 635,
                            "name": "Bheri Municipality"
                        },
                        {
                            "id": 636,
                            "name": "Chhedagad Municipality"
                        },
                        {
                            "id": 637,
                            "name": "Junichande Rural Municipality"
                        },
                        {
                            "id": 638,
                            "name": "Kuse Rural Municipality"
                        },
                        {
                            "id": 639,
                            "name": "Shiwalaya Rural Municipality"
                        },
                        {
                            "id": 640,
                            "name": "Tribeni Nalagad Municipality"
                        }
                    ]
                },
                {
                    "id": 66,
                    "name": "SALYAN",
                    "municipalityList": [
                        {
                            "id": 641,
                            "name": "Aathbiskot Municipality"
                        },
                        {
                            "id": 642,
                            "name": "Banfikot Rural Municipality"
                        },
                        {
                            "id": 643,
                            "name": "Chaurjahari Municipality"
                        },
                        {
                            "id": 644,
                            "name": "Musikot Municipality"
                        },
                        {
                            "id": 645,
                            "name": "Sani Bheri Rural Municipality"
                        },
                        {
                            "id": 646,
                            "name": "Tribeni Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 67,
                    "name": "DOLPA",
                    "municipalityList": [
                        {
                            "id": 647,
                            "name": "Bagchaur Municipality"
                        },
                        {
                            "id": 648,
                            "name": "Bangad Kupinde Municipality"
                        },
                        {
                            "id": 649,
                            "name": "Chhatreshwori Rural Municipality"
                        },
                        {
                            "id": 650,
                            "name": "Darma Rural Municipality"
                        },
                        {
                            "id": 651,
                            "name": "SIddhaKumakh Rural Municipality"
                        },
                        {
                            "id": 652,
                            "name": "Kalimati Rural Municipality"
                        },
                        {
                            "id": 653,
                            "name": "Kapurkot Rural Municipality"
                        },
                        {
                            "id": 654,
                            "name": "Kumakhmalika Rural Municipality"
                        },
                        {
                            "id": 655,
                            "name": "Sharada Municipality"
                        },
                        {
                            "id": 656,
                            "name": "Tribeni Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 68,
                    "name": "JAJARKOT",
                    "municipalityList": [
                        {
                            "id": 657,
                            "name": "Barahtal Rural Municipality"
                        },
                        {
                            "id": 658,
                            "name": "Bheriganga Municipality"
                        },
                        {
                            "id": 659,
                            "name": "Birendranagar Municipality"
                        },
                        {
                            "id": 660,
                            "name": "Chaukune Rural Municipality"
                        },
                        {
                            "id": 661,
                            "name": "Chingad Rural Municipality"
                        },
                        {
                            "id": 662,
                            "name": "Gurbhakot Municipality"
                        },
                        {
                            "id": 663,
                            "name": "Lekbeshi Municipality"
                        },
                        {
                            "id": 664,
                            "name": "Panchpuri Municipality"
                        },
                        {
                            "id": 665,
                            "name": "Simta Rural Municipality"
                        }
                    ]
                }
            ]
        },
        {
            "id": 7,
            "name": "SUDUR PASHCHIMANCHAL PROVINCE",
            "districtList": [
                {
                    "id": 69,
                    "name": "BAJURA",
                    "municipalityList": [
                        {
                            "id": 666,
                            "name": "Badimalika Municipality"
                        },
                        {
                            "id": 667,
                            "name": "Budhiganga Municipality"
                        },
                        {
                            "id": 668,
                            "name": "Budhinanda Municipality"
                        },
                        {
                            "id": 669,
                            "name": "Chhededaha Rural Municipality"
                        },
                        {
                            "id": 670,
                            "name": "Gaumul Rural Municipality"
                        },
                        {
                            "id": 671,
                            "name": "Himali Rural Municipality"
                        },
                        {
                            "id": 672,
                            "name": "Pandav Gupha Rural Municipality"
                        },
                        {
                            "id": 673,
                            "name": "Swami Kartik Rural Municipality"
                        },
                        {
                            "id": 674,
                            "name": "Tribeni Municipality"
                        }
                    ]
                },
                {
                    "id": 70,
                    "name": "BAJHANG",
                    "municipalityList": [
                        {
                            "id": 675,
                            "name": "Bithadchir Rural Municipality"
                        },
                        {
                            "id": 676,
                            "name": "Bungal Municipality"
                        },
                        {
                            "id": 677,
                            "name": "Chabis pathivera Rural Municipality"
                        },
                        {
                            "id": 678,
                            "name": "Durgathali Rural Municipality"
                        },
                        {
                            "id": 679,
                            "name": "JayaPrithivi Municipality"
                        },
                        {
                            "id": 680,
                            "name": "Kanda Rural Municipality"
                        },
                        {
                            "id": 681,
                            "name": "Kedarsyun Rural Municipality"
                        },
                        {
                            "id": 682,
                            "name": "Khaptad chhanna Rural Municipality"
                        },
                        {
                            "id": 683,
                            "name": "Masta Rural Municipality"
                        },
                        {
                            "id": 684,
                            "name": "Surma Rural Municipality"
                        },
                        {
                            "id": 685,
                            "name": "Talkot Rural Municipality"
                        },
                        {
                            "id": 686,
                            "name": "Thalara Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 71,
                    "name": "DARCHULA",
                    "municipalityList": [
                        {
                            "id": 687,
                            "name": "Apihimal Rural Municipality"
                        },
                        {
                            "id": 688,
                            "name": "Byas Rural Municipality"
                        },
                        {
                            "id": 689,
                            "name": "Dunhun Rural Municipality"
                        },
                        {
                            "id": 690,
                            "name": "Lekam Rural Municipality"
                        },
                        {
                            "id": 691,
                            "name": "Mahakali Municipality"
                        },
                        {
                            "id": 692,
                            "name": "Malikarjun Rural Municipality"
                        },
                        {
                            "id": 693,
                            "name": "Marma Rural Municipality"
                        },
                        {
                            "id": 694,
                            "name": "Naugad Rural Municipality"
                        },
                        {
                            "id": 695,
                            "name": "Shailyashikhar Municipality"
                        }
                    ]
                },
                {
                    "id": 72,
                    "name": "BAITADI",
                    "municipalityList": [
                        {
                            "id": 696,
                            "name": "Dasharathchanda Municipality"
                        },
                        {
                            "id": 697,
                            "name": "Dilasaini Rural Municipality"
                        },
                        {
                            "id": 698,
                            "name": "Dogadakedar Rural Municipality"
                        },
                        {
                            "id": 699,
                            "name": "Melauli Municipality"
                        },
                        {
                            "id": 700,
                            "name": "Pancheshwar Rural Municipality"
                        },
                        {
                            "id": 701,
                            "name": "Patam Municipality"
                        },
                        {
                            "id": 702,
                            "name": "Puchaudi Municipality"
                        },
                        {
                            "id": 703,
                            "name": "Shivanath Rural Municipality"
                        },
                        {
                            "id": 704,
                            "name": "Sigas Rural Municipality"
                        },
                        {
                            "id": 705,
                            "name": "Surnaya Rural Municipality"
                        }
                    ]
                },
                {
                    "id": 73,
                    "name": "DADELDHURA",
                    "municipalityList": [
                        {
                            "id": 706,
                            "name": "Ajaymeru Rural Municipality"
                        },
                        {
                            "id": 707,
                            "name": "Alital Rural Municipality"
                        },
                        {
                            "id": 708,
                            "name": "Amargadhi Municipality"
                        },
                        {
                            "id": 709,
                            "name": "Bhageshwar Rural Municipality"
                        },
                        {
                            "id": 710,
                            "name": "Ganayapdhura Rural Municipality"
                        },
                        {
                            "id": 711,
                            "name": "Nawadurga Rural Municipality"
                        },
                        {
                            "id": 712,
                            "name": "Parashuram Municipality"
                        }
                    ]
                },
                {
                    "id": 74,
                    "name": "KAILALI",
                    "municipalityList": [
                        {
                            "id": 713,
                            "name": "Adharsha Rural Municipality"
                        },
                        {
                            "id": 714,
                            "name": "Badikedar Rural Municipality"
                        },
                        {
                            "id": 715,
                            "name": "Bogtan Rural Municipality"
                        },
                        {
                            "id": 716,
                            "name": "Dipayal Silgadi Municipality"
                        },
                        {
                            "id": 717,
                            "name": "Jorayal Rural Municipality"
                        },
                        {
                            "id": 718,
                            "name": "K I Singh Rural Municipality"
                        },
                        {
                            "id": 719,
                            "name": "Purbichauki Rural Municipality"
                        },
                        {
                            "id": 720,
                            "name": "Sayal Rural Municipality"
                        },
                        {
                            "id": 721,
                            "name": "Shikhar Municipality"
                        }
                    ]
                },
                {
                    "id": 75,
                    "name": "KANCHANPUR",
                    "municipalityList": [
                        {
                            "id": 722,
                            "name": "Bannigadhi Jayagadh Rural Municipality"
                        },
                        {
                            "id": 723,
                            "name": "Chaurpati Rural Municipality"
                        },
                        {
                            "id": 724,
                            "name": "Dhakari Rural Municipality"
                        },
                        {
                            "id": 725,
                            "name": "Kamal Bazar Municipality"
                        },
                        {
                            "id": 726,
                            "name": "Mangalsen Municipality"
                        },
                        {
                            "id": 727,
                            "name": "Mellekh Rural Municipality"
                        },
                        {
                            "id": 728,
                            "name": "Panchadeval Binayak Municipality"
                        },
                        {
                            "id": 729,
                            "name": "Ramaroshan Rural Municipality"
                        },
                        {
                            "id": 730,
                            "name": "Sa Municipality hebagar Municipality"
                        },
                        {
                            "id": 731,
                            "name": "Turmakhad Municipality"
                        }
                    ]
                },
                {
                    "id": 76,
                    "name": "DOTI",
                    "municipalityList": [
                        {
                            "id": 732,
                            "name": "Bardagoriya Rural Municipality"
                        },
                        {
                            "id": 733,
                            "name": "Bhajani Municipality"
                        },
                        {
                            "id": 734,
                            "name": "Chure Rural Municipality"
                        },
                        {
                            "id": 735,
                            "name": "Dhangadhi Upamaha Municipality"
                        },
                        {
                            "id": 736,
                            "name": "gaurignaga Rural Municipality"
                        },
                        {
                            "id": 737,
                            "name": "ghodaghodi Rural Municipality"
                        },
                        {
                            "id": 738,
                            "name": "Godawari Municipality"
                        },
                        {
                            "id": 739,
                            "name": "Janaki Rural Municipality"
                        },
                        {
                            "id": 740,
                            "name": "Joshipur Rural Municipality"
                        },
                        {
                            "id": 741,
                            "name": "Kailari Rural Municipality"
                        },
                        {
                            "id": 742,
                            "name": "Lamki Chuha Municipality"
                        },
                        {
                            "id": 743,
                            "name": "Mohanyal Rural Municipality"
                        },
                        {
                            "id": 744,
                            "name": "Tikapur Municipality"
                        }
                    ]
                },
                {
                    "id": 77,
                    "name": "ACHHAM",
                    "municipalityList": [
                        {
                            "id": 745,
                            "name": "Bedkot Municipality"
                        },
                        {
                            "id": 746,
                            "name": "Belauri Municipality"
                        },
                        {
                            "id": 747,
                            "name": "Beldandi Rural Municipality"
                        },
                        {
                            "id": 748,
                            "name": "Bhimdatta Municipality"
                        },
                        {
                            "id": 749,
                            "name": "Krishnapur Municipality"
                        },
                        {
                            "id": 750,
                            "name": "Laljhadi Rural Municipality"
                        },
                        {
                            "id": 751,
                            "name": "Punarbas Municipality"
                        },
                        {
                            "id": 752,
                            "name": "Shuklaphanta Municipality"
                        },
                        {
                            "id": 753,
                            "name": "Mahakali Municipality"
                        }
                    ]
                }
            ]
        }
];

const primaryCampusTypes = [
  'Constituent Campus',
  'Affiliated Campus'
];

const affiliatedCollegeTypes = [
  'Private Campus',
  'Community Campus'
];

const employmentTypes = ['Permanent', 'Contract', 'Part-time'];
const projectStatuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];
const buildingConditions = ['Excellent', 'Good', 'Fair', 'Poor'];
const taxClearanceStatuses = ['Cleared', 'Pending', 'Not Required'];
const haalsabikStatuses = ['Completed', 'In Progress', 'Not Started'];

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
  
  // Campus type state
  const [selectedPrimaryType, setSelectedPrimaryType] = useState('');
  const [selectedAffiliatedType, setSelectedAffiliatedType] = useState('');
  
  // Location state
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [wards, setWards] = useState<number[]>([]);

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

  // Initialize wards
  useEffect(() => {
    const wardsList = Array.from({ length: 35 }, (_, i) => i + 1);
    setWards(wardsList);
  }, []);

  // Handle primary campus type change
  const handlePrimaryTypeChange = (value: string) => {
    setSelectedPrimaryType(value);
    setSelectedAffiliatedType('');
    
    if (value === 'Constituent Campus') {
      setFormData(prev => ({ ...prev, campusType: 'Constituent Campus' }));
    } else {
      setFormData(prev => ({ ...prev, campusType: '' }));
    }
  };

  // Handle affiliated college type change
  const handleAffiliatedTypeChange = (value: string) => {
    setSelectedAffiliatedType(value);
    setFormData(prev => ({ ...prev, campusType: value }));
  };

  // Handle province change
  const handleProvinceChange = (provinceName: string) => {
    const province = locationData.find(p => p.name === provinceName) || null;
    setSelectedProvince(province);
    setSelectedDistrict(null);
    
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        province: provinceName,
        district: '',
        localLevel: ''
      }
    }));
  };

  // Handle district change
  const handleDistrictChange = (districtName: string) => {
    if (!selectedProvince) return;
    
    const district = selectedProvince.districtList.find(d => d.name === districtName) || null;
    setSelectedDistrict(district);
    
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        district: districtName,
        localLevel: ''
      }
    }));
  };

  // Handle local level change
  const handleLocalLevelChange = (localLevelName: string) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        localLevel: localLevelName
      }
    }));
  };

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
            institution: '',
            level: '',
            programName: '',
            totalStudents: '',
            maleStudents: '',
            femaleStudents: '',
            otherStudents: '',
            scholarshipStudents: '',
            newAdmissions: '',
            graduatedStudents: '',
            passPercentage: '',
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
      
      // Auto-calculate total students if male/female/other students change
      if (field === 'maleStudents' || field === 'femaleStudents' || field === 'otherStudents') {
        const maleStudents = parseInt(newPrograms[index].maleStudents) || 0;
        const femaleStudents = parseInt(newPrograms[index].femaleStudents) || 0;
        const otherStudents = parseInt(newPrograms[index].otherStudents) || 0;
        newPrograms[index].totalStudents = (maleStudents + femaleStudents + otherStudents).toString();
      }
      
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

  // Program selection handler
  const handleProgramSelection = (index: number, institution: string, level: string, programName: string) => {
    setFormData(prev => {
      const newPrograms = [...prev.academicPrograms.programs];
      newPrograms[index] = {
        ...newPrograms[index],
        institution,
        level,
        programName
      };
      return {
        ...prev,
        academicPrograms: { ...prev.academicPrograms, programs: newPrograms }
      };
    });
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

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid file (JPEG, PNG, GIF, MP4, AVI, MOV, PDF)');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploadingAttachments(prev => ({ ...prev, [projectIndex]: true }));

    try {
      const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
      const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
      
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const folderPath = `tu-projects/${formData.collegeId || 'default'}/attachments`;
      uploadFormData.append('folder', folderPath);
      
      const publicId = `project_attachment_${formData.collegeId || 'college'}_${Date.now()}`;
      uploadFormData.append('public_id', publicId);

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

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
      const response = await axios.post('http://202.70.90.11:81/api/collegeform', formData);

      
      if (response.data.success) {
        setSuccess('Campus form submitted successfully!');
        setFormData(initialFormData);
        setSelectedPrimaryType('');
        setSelectedAffiliatedType('');
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
            Campus Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-sm font-medium flex items-center gap-2">
                <School className="h-4 w-4" />
                Campus Name *
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
              <Label htmlFor="primaryCampusType" className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                Campus Type *
              </Label>
              <Select 
                value={selectedPrimaryType} 
                onValueChange={handlePrimaryTypeChange}
              >
                <SelectTrigger className="border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select campus type" />
                </SelectTrigger>
                <SelectContent>
                  {primaryCampusTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPrimaryType === 'Affiliated Campus' && (
              <div className="space-y-2">
                <Label htmlFor="affiliatedCollegeType" className="text-sm font-medium flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Affiliated Campus Type *
                </Label>
                <Select 
                  value={selectedAffiliatedType} 
                  onValueChange={handleAffiliatedTypeChange}
                >
                  <SelectTrigger className="border-2 focus:border-blue-500">
                    <SelectValue placeholder="Select affiliated college type" />
                  </SelectTrigger>
                  <SelectContent>
                    {affiliatedCollegeTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
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
                Campus ID
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
            Campus Location Details
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
                onValueChange={handleProvinceChange}
              >
                <SelectTrigger className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {locationData.map((province) => (
                    <SelectItem key={province.id} value={province.name}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                District *
              </Label>
              <Select 
                value={formData.location.district} 
                onValueChange={handleDistrictChange}
                disabled={!selectedProvince}
              >
                <SelectTrigger className="border-2 focus:border-green-500">
                  <SelectValue placeholder={selectedProvince ? "Select district" : "First select province"} />
                </SelectTrigger>
                <SelectContent>
                  {selectedProvince?.districtList.map((district) => (
                    <SelectItem key={district.id} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="localLevel" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Municipality/Rural Municipality *
              </Label>
              <Select 
                value={formData.location.localLevel} 
                onValueChange={handleLocalLevelChange}
                disabled={!selectedDistrict}
              >
                <SelectTrigger className="border-2 focus:border-green-500">
                  <SelectValue placeholder={selectedDistrict ? "Select local level" : "First select district"} />
                </SelectTrigger>
                <SelectContent>
                  {selectedDistrict?.municipalityList.map((municipality) => (
                    <SelectItem key={municipality.id} value={municipality.name}>
                      {municipality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wardNo" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Ward No. *
              </Label>
              <Select 
                value={formData.location.wardNo} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, wardNo: value }
                }))}
              >
                <SelectTrigger className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Select ward number" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward} value={ward.toString()}>
                      Ward {ward}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                Campus Website
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
      {/* Land Area Information */}
      <Card className="border-l-4 border-l-purple-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
          <CardTitle className="flex items-center gap-3 text-purple-800">
            <LandPlot className="h-6 w-6" />
            Land Area Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                <LandPlot className="h-5 w-5" />
                Traditional Units
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Bigaha</Label>
                  <Input
                    name="infrastructure.landArea.traditionalUnits.bigaha"
                    value={formData.infrastructure.landArea.traditionalUnits.bigaha}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Katha</Label>
                  <Input
                    name="infrastructure.landArea.traditionalUnits.katha"
                    value={formData.infrastructure.landArea.traditionalUnits.katha}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dhur</Label>
                  <Input
                    name="infrastructure.landArea.traditionalUnits.dhur"
                    value={formData.infrastructure.landArea.traditionalUnits.dhur}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ropani</Label>
                  <Input
                    name="infrastructure.landArea.traditionalUnits.ropani"
                    value={formData.infrastructure.landArea.traditionalUnits.ropani}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Land Details
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Square Meters</Label>
                  <Input
                    name="infrastructure.landArea.squareMeters"
                    value={formData.infrastructure.landArea.squareMeters}
                    onChange={handleInputChange}
                    placeholder="Area in square meters"
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Acquisition Date</Label>
                  <Input
                    name="infrastructure.landArea.acquisitionDate"
                    type="date"
                    value={formData.infrastructure.landArea.acquisitionDate}
                    onChange={handleInputChange}
                    className="border-2 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tax Clearance Status</Label>
                  <Select 
                    value={formData.infrastructure.landArea.taxClearanceStatus} 
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      infrastructure: {
                        ...prev.infrastructure,
                        landArea: {
                          ...prev.infrastructure.landArea,
                          taxClearanceStatus: value
                        }
                      }
                    }))}
                  >
                    <SelectTrigger className="border-2 focus:border-purple-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxClearanceStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Haalsabik Status</Label>
                  <Select 
                    value={formData.infrastructure.landArea.haalsabikStatus} 
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      infrastructure: {
                        ...prev.infrastructure,
                        landArea: {
                          ...prev.infrastructure.landArea,
                          haalsabikStatus: value
                        }
                      }
                    }))}
                  >
                    <SelectTrigger className="border-2 focus:border-purple-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {haalsabikStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Land Use Information */}
      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Trees className="h-6 w-6" />
            Land Use Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Building Area (sq. m)</Label>
              <Input
                name="infrastructure.landUse.buildingArea"
                value={formData.infrastructure.landUse.buildingArea}
                onChange={handleInputChange}
                placeholder="0"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Playground Area (sq. m)</Label>
              <Input
                name="infrastructure.landUse.playgroundArea"
                value={formData.infrastructure.landUse.playgroundArea}
                onChange={handleInputChange}
                placeholder="0"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Natural Forest Area (sq. m)</Label>
              <Input
                name="infrastructure.landUse.naturalForestArea"
                value={formData.infrastructure.landUse.naturalForestArea}
                onChange={handleInputChange}
                placeholder="0"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Plantation Area (sq. m)</Label>
              <Input
                name="infrastructure.landUse.plantationArea"
                value={formData.infrastructure.landUse.plantationArea}
                onChange={handleInputChange}
                placeholder="0"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Leased Area (sq. m)</Label>
              <Input
                name="infrastructure.landUse.leasedArea"
                value={formData.infrastructure.landUse.leasedArea}
                onChange={handleInputChange}
                placeholder="0"
                className="border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Lease Income (NPR)</Label>
              <Input
                name="infrastructure.landUse.leaseIncome"
                value={formData.infrastructure.landUse.leaseIncome}
                onChange={handleInputChange}
                placeholder="0"
                className="border-2 focus:border-green-500"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="encroachmentExists"
                name="infrastructure.landUse.encroachmentExists"
                checked={formData.infrastructure.landUse.encroachmentExists}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    infrastructure: {
                      ...prev.infrastructure,
                      landUse: {
                        ...prev.infrastructure.landUse,
                        encroachmentExists: checked
                      }
                    }
                  }))
                }
              />
              <Label htmlFor="encroachmentExists" className="text-sm font-medium">
                Encroachment Exists
              </Label>
            </div>

            {formData.infrastructure.landUse.encroachmentExists && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Encroachment Details</Label>
                <Textarea
                  name="infrastructure.landUse.encroachmentDetails"
                  value={formData.infrastructure.landUse.encroachmentDetails}
                  onChange={handleInputChange}
                  placeholder="Describe the encroachment details..."
                  className="border-2 focus:border-green-500 min-h-[80px]"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Protection Steps</Label>
              <Textarea
                name="infrastructure.landUse.protectionSteps"
                value={formData.infrastructure.landUse.protectionSteps}
                onChange={handleInputChange}
                placeholder="Steps taken for land protection..."
                className="border-2 focus:border-green-500 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Commercial Use Suggestions</Label>
              <Textarea
                name="infrastructure.landUse.commercialUseSuggestions"
                value={formData.infrastructure.landUse.commercialUseSuggestions}
                onChange={handleInputChange}
                placeholder="Suggestions for commercial use of land..."
                className="border-2 focus:border-green-500 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Commercial Plans</Label>
              <Textarea
                name="infrastructure.landUse.commercialPlans"
                value={formData.infrastructure.landUse.commercialPlans}
                onChange={handleInputChange}
                placeholder="Future commercial plans..."
                className="border-2 focus:border-green-500 min-h-[80px]"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="masterPlanExists"
                name="infrastructure.landUse.masterPlanExists"
                checked={formData.infrastructure.landUse.masterPlanExists}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    infrastructure: {
                      ...prev.infrastructure,
                      landUse: {
                        ...prev.infrastructure.landUse,
                        masterPlanExists: checked
                      }
                    }
                  }))
                }
              />
              <Label htmlFor="masterPlanExists" className="text-sm font-medium">
                Master Plan Exists
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Suggestions</Label>
              <Textarea
                name="infrastructure.landUse.suggestions"
                value={formData.infrastructure.landUse.suggestions}
                onChange={handleInputChange}
                placeholder="Any additional suggestions..."
                className="border-2 focus:border-green-500 min-h-[80px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buildings & Rooms with Media */}
      <Card className="border-l-4 border-l-blue-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Building className="h-6 w-6" />
            Buildings & Rooms (with Media)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Button
            onClick={(e) => {e.stopPropagation(); e.preventDefault(); addBuilding()}}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Building
          </Button>
          
          {formData.infrastructure.buildings.map((building, index) => (
            <Card key={index} className="border-2 border-blue-200 bg-blue-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-blue-700 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Building #{index + 1}
                  </span>
                  <Button
                    onClick={(e) => {e.stopPropagation(); e.preventDefault(); removeBuilding(index)}}
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
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Total Rooms</Label>
                    <Input
                      type="number"
                      value={building.totalRooms}
                      onChange={(e) => updateBuilding(index, 'totalRooms', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Classrooms</Label>
                    <Input
                      type="number"
                      value={building.classrooms}
                      onChange={(e) => updateBuilding(index, 'classrooms', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Labs</Label>
                    <Input
                      type="number"
                      value={building.labs}
                      onChange={(e) => updateBuilding(index, 'labs', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Library</Label>
                    <Input
                      type="number"
                      value={building.library}
                      onChange={(e) => updateBuilding(index, 'library', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Administrative</Label>
                    <Input
                      type="number"
                      value={building.administrative}
                      onChange={(e) => updateBuilding(index, 'administrative', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Other</Label>
                    <Input
                      type="number"
                      value={building.other}
                      onChange={(e) => updateBuilding(index, 'other', e.target.value)}
                      placeholder="0"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Condition</Label>
                    <Select 
                      value={building.condition} 
                      onValueChange={(value) => updateBuilding(index, 'condition', value)}
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500">
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
                    <h4 className="font-semibold text-blue-700 flex items-center gap-2">
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
                      onClick={(e) => {e.stopPropagation(); e.preventDefault(); openMediaDialog(index, 'image')}}
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <Button
                      onClick={(e) => {e.stopPropagation(); e.preventDefault(); openMediaDialog(index, 'video')}}
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

      {/* Health & Sanitation */}
      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Shield className="h-6 w-6" />
            Health & Sanitation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
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

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-700">Drinking Water</h4>
              <div className="space-y-3">
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
                    id="qualityTested"
                    name="infrastructure.healthSanitation.drinkingWater.qualityTested"
                    checked={formData.infrastructure.healthSanitation.drinkingWater.qualityTested}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        infrastructure: {
                          ...prev.infrastructure,
                          healthSanitation: {
                            ...prev.infrastructure.healthSanitation,
                            drinkingWater: {
                              ...prev.infrastructure.healthSanitation.drinkingWater,
                              qualityTested: checked
                            }
                          }
                        }
                      }))
                    }
                  />
                  <Label htmlFor="qualityTested" className="text-sm font-medium">
                    Quality Tested
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Purification System</Label>
                  <Input
                    name="infrastructure.healthSanitation.drinkingWater.purificationSystem"
                    value={formData.infrastructure.healthSanitation.drinkingWater.purificationSystem}
                    onChange={handleInputChange}
                    placeholder="Type of purification system"
                    className="border-2 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-green-700">Medical Facilities</h4>
              <div className="space-y-3">
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="healthPost"
                    name="infrastructure.healthSanitation.medicalFacilities.healthPost"
                    checked={formData.infrastructure.healthSanitation.medicalFacilities.healthPost}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        infrastructure: {
                          ...prev.infrastructure,
                          healthSanitation: {
                            ...prev.infrastructure.healthSanitation,
                            medicalFacilities: {
                              ...prev.infrastructure.healthSanitation.medicalFacilities,
                              healthPost: checked
                            }
                          }
                        }
                      }))
                    }
                  />
                  <Label htmlFor="healthPost" className="text-sm font-medium">
                    Health Post Available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="staffAvailable"
                    name="infrastructure.healthSanitation.medicalFacilities.staffAvailable"
                    checked={formData.infrastructure.healthSanitation.medicalFacilities.staffAvailable}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        infrastructure: {
                          ...prev.infrastructure,
                          healthSanitation: {
                            ...prev.infrastructure.healthSanitation,
                            medicalFacilities: {
                              ...prev.infrastructure.healthSanitation.medicalFacilities,
                              staffAvailable: checked
                            }
                          }
                        }
                      }))
                    }
                  />
                  <Label htmlFor="staffAvailable" className="text-sm font-medium">
                    Medical Staff Available
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-green-700">Waste Management</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="segregation"
                  name="infrastructure.healthSanitation.wasteManagement.segregation"
                  checked={formData.infrastructure.healthSanitation.wasteManagement.segregation}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      infrastructure: {
                        ...prev.infrastructure,
                        healthSanitation: {
                          ...prev.infrastructure.healthSanitation,
                          wasteManagement: {
                            ...prev.infrastructure.healthSanitation.wasteManagement,
                            segregation: checked
                          }
                        }
                      }
                    }))
                  }
                />
                <Label htmlFor="segregation" className="text-sm font-medium">
                  Waste Segregation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="recycling"
                  name="infrastructure.healthSanitation.wasteManagement.recycling"
                  checked={formData.infrastructure.healthSanitation.wasteManagement.recycling}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      infrastructure: {
                        ...prev.infrastructure,
                        healthSanitation: {
                          ...prev.infrastructure.healthSanitation,
                          wasteManagement: {
                            ...prev.infrastructure.healthSanitation.wasteManagement,
                            recycling: checked
                          }
                        }
                      }
                    }))
                  }
                />
                <Label htmlFor="recycling" className="text-sm font-medium">
                  Recycling
                </Label>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Disposal Method</Label>
                <Input
                  name="infrastructure.healthSanitation.wasteManagement.disposalMethod"
                  value={formData.infrastructure.healthSanitation.wasteManagement.disposalMethod}
                  onChange={handleInputChange}
                  placeholder="Waste disposal method"
                  className="border-2 focus:border-green-500"
                />
              </div>
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
                onClick={(e) => {e.stopPropagation(); e.preventDefault(); addProgram()}}
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
                      onClick={(e) => {e.stopPropagation(); e.preventDefault(); removeProgram(index)}}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Program Selection Hierarchy */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Institution/Faculty *</Label>
                      <Select
                        value={program.institution}
                        onValueChange={(value) => handleProgramSelection(index, value, program.level, program.programName)}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="Select institution" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(tuPrograms).map((institution) => (
                            <SelectItem key={institution} value={institution}>
                              {institution}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Academic Level *</Label>
                      <Select
                        value={program.level}
                        onValueChange={(value) => handleProgramSelection(index, program.institution, value, program.programName)}
                        disabled={!program.institution}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {program.institution && 
                            Object.keys(tuPrograms[program.institution as keyof typeof tuPrograms] || {}).map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Program Name *</Label>
                      <Select
                        value={program.programName}
                        onValueChange={(value) => handleProgramSelection(index, program.institution, program.level, value)}
                        disabled={!program.level || !program.institution}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {program.institution && program.level && 
                            tuPrograms[program.institution as keyof typeof tuPrograms]?.[program.level as keyof typeof tuPrograms[keyof typeof tuPrograms]]?.map((programName) => (
                              <SelectItem key={programName} value={programName}>
                                {programName}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Student Statistics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Total Students</Label>
                      <Input
                        type="number"
                        value={program.totalStudents}
                        readOnly
                        className="bg-gray-100 border-2 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Scholarship Students</Label>
                      <Input
                        type="number"
                        min="0"
                        value={program.scholarshipStudents}
                        onChange={(e) => updateProgram(index, 'scholarshipStudents', e.target.value)}
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Male Students</Label>
                      <Input
                        type="number"
                        min="0"
                        value={program.maleStudents}
                        onChange={(e) => updateProgram(index, 'maleStudents', e.target.value)}
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Female Students</Label>
                      <Input
                        type="number"
                        min="0"
                        value={program.femaleStudents}
                        onChange={(e) => updateProgram(index, 'femaleStudents', e.target.value)}
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Other Students</Label>
                      <Input
                        type="number"
                        min="0"
                        value={program.otherStudents}
                        onChange={(e) => updateProgram(index, 'otherStudents', e.target.value)}
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">New Admissions</Label>
                      <Input
                        type="number"
                        min="0"
                        value={program.newAdmissions}
                        onChange={(e) => updateProgram(index, 'newAdmissions', e.target.value)}
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Graduated Students</Label>
                      <Input
                        type="number"
                        min="0"
                        value={program.graduatedStudents}
                        onChange={(e) => updateProgram(index, 'graduatedStudents', e.target.value)}
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Pass Percentage (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={program.passPercentage}
                        onChange={(e) => updateProgram(index, 'passPercentage', e.target.value)}
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
              Overall Enrollment Summary
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

          {/* Program Summary */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Program Summary</h4>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Programs:</span> {formData.academicPrograms.programs.length}
              </div>
              <div>
                <span className="font-medium">Total Students:</span>{' '}
                {formData.academicPrograms.programs.reduce((sum, program) => sum + parseInt(program.totalStudents || '0'), 0)}
              </div>
              <div>
                <span className="font-medium">Male Students:</span>{' '}
                {formData.academicPrograms.programs.reduce((sum, program) => sum + parseInt(program.maleStudents || '0'), 0)}
              </div>
              <div>
                <span className="font-medium">Female Students:</span>{' '}
                {formData.academicPrograms.programs.reduce((sum, program) => sum + parseInt(program.femaleStudents || '0'), 0)}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Other Students:</span>{' '}
                {formData.academicPrograms.programs.reduce((sum, program) => sum + parseInt(program.otherStudents || '0'), 0)}
              </div>
              <div>
                <span className="font-medium">Scholarship Students:</span>{' '}
                {formData.academicPrograms.programs.reduce((sum, program) => sum + parseInt(program.scholarshipStudents || '0'), 0)}
              </div>
              <div>
                <span className="font-medium">New Admissions:</span>{' '}
                {formData.academicPrograms.programs.reduce((sum, program) => sum + parseInt(program.newAdmissions || '0'), 0)}
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
                onClick={(e) => {e.stopPropagation(); e.preventDefault(); addAcademicStaff()}}
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
                      onClick={(e) => {e.stopPropagation(); e.preventDefault(); removeAcademicStaff(index)}}
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
                onClick={(e)=>{e.stopPropagation(); e.preventDefault();addProject()}}
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
                        onClick={() => {
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
                            onClick={() => window.open(project.attachments, '_blank')}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateProject(index, 'attachments', '')}
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
            Review Campus Information
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
              <CardTitle className="text-lg text-emerald-700">Campus Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Campus Name:</span>
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
        return !!formData.collegeName && 
               !!formData.campusType && 
               !!formData.establishmentDate && 
               !!formData.principalInfo.name;
      case 1:
        return !!formData.location.province && 
               !!formData.location.district && 
               !!formData.location.localLevel && 
               !!formData.location.wardNo;
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
              Campus Information Collection Form
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
              onClick={(e) => {e.stopPropagation(); e.preventDefault(); setError('')}}
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
              onClick={(e) => {e.stopPropagation(); e.preventDefault(); setSuccess('')}}
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
                  onClick={(e) => {e.stopPropagation(); e.preventDefault(); handleBack()}}
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
                      onClick={handleNext}
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
            <Button variant="outline" onClick={() => setMediaDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddMedia}
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