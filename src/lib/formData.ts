// Form data types and interfaces
export interface BuildingMedia {
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

export interface Building {
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

export interface Project {
  projectName: string;
  startDate: string;
  expectedCompletion: string;
  budget: string;
  attachments: string;
  status: string;
}

export interface CollegeFormData {
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

export const initialFormData: CollegeFormData = {
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