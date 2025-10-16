import { 
  GraduationCap, 
  MapPin, 
  Building, 
  BookOpen, 
  Users, 
  Monitor, 
  Hammer, 
  CheckCircle,
  School,
  Phone,
  Mail,
  Globe,
  User,
  Building2,
  Wifi,
  Database,
  FileText,
  Image,
  Video,
  Upload,
  Trash2,
  Edit,
  Plus,
  X
} from 'lucide-react';

export const campusTypes = [
  'Constituent Campus',
  'Affiliated College',
  'Community Campus',
  'Private College'
];

export const provinces = [
  'Province 1',
  'Province 2', 
  'Bagmati Province',
  'Gandaki Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province'
];

export const programLevels = ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'];
export const employmentTypes = ['Permanent', 'Contract', 'Part-time'];
export const projectStatuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];
export const buildingConditions = ['Excellent', 'Good', 'Fair', 'Poor'];

export const steps = [
  {
    id: 0,
    title: 'Basic Information',
    description: 'College details and principal info',
    icon: GraduationCap
  },
  {
    id: 1,
    title: 'Location Details',
    description: 'Address and contact information',
    icon: MapPin
  },
  {
    id: 2,
    title: 'Infrastructure',
    description: 'Buildings, land, and facilities',
    icon: Building
  },
  {
    id: 3,
    title: 'Academic Programs',
    description: 'Programs and enrollment data',
    icon: BookOpen
  },
  {
    id: 4,
    title: 'Staff Information',
    description: 'Academic and administrative staff',
    icon: Users
  },
  {
    id: 5,
    title: 'Technology',
    description: 'Digital resources and facilities',
    icon: Monitor
  },
  {
    id: 6,
    title: 'Projects',
    description: 'Current and planned projects',
    icon: Hammer
  },
  {
    id: 7,
    title: 'Review',
    description: 'Review and submit form',
    icon: CheckCircle
  }
];

export const conditionColors = {
  'Excellent': 'bg-green-100 text-green-800 border-green-200',
  'Good': 'bg-blue-100 text-blue-800 border-blue-200',
  'Fair': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Poor': 'bg-red-100 text-red-800 border-red-200'
};

export const statusColors = {
  'Planning': 'bg-gray-100 text-gray-800 border-gray-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Completed': 'bg-green-100 text-green-800 border-green-200',
  'On Hold': 'bg-red-100 text-red-800 border-red-200'
};