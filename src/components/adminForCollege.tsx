import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TablePagination,
  InputAdornment,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Modal,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  CardMedia
} from '@mui/material';
import {
  Visibility,
  FilterList,
  School,
  People,
  Business,
  Computer,
  ExpandMore,
  Download,
  PictureAsPdf,
  Search,
  LocationOn,
  Email,
  Phone,
  CalendarToday,
  AccountCircle,
  Engineering,
  LibraryBooks,
  Wifi,
  Construction,
  TrendingUp,
  CorporateFare,
  Sanitizer,
  Book,
  Group,
  Architecture,
  Storage,
  Cloud,
  Security,
  AdminPanelSettings,
  AccountBalance,
  Apartment,
  LocalLibrary,
  Science,
  Sports,
  Restaurant,
  LocalHospital,
  Water,
  Recycling,
  EmojiPeople,
  WorkspacePremium,
  Assessment,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineAxis,
  Radar as RadarIcon,
  Public,
  Language,
  CastForEducation,
  MenuBook,
  Calculate,
  Biotech,
  Psychology,
  TheaterComedy,
  MusicNote,
  SportsBaseball,
  Eco,
  History,
  Translate,
  Functions,
  Atom,
  Spa,
  Landscape,
  Architecture as ArchIcon,
  Engineering as EngIcon,
  Computer as CompIcon,
  BusinessCenter,
  LocalCafe,
  Hotel,
  MeetingRoom,
  Chair,
  Desk,
  Kitchen,
  Shower,
  HotTub,
  Pool,
  FitnessCenter,
  LocalParking,
  Garden,
  Park,
  SportsTennis,
  SportsSoccer,
  SportsBasketball,
  SportsVolleyball,
  GolfCourse,
  Stadium,
  TrackChanges,
  ScatterPlot,
  ShowChart,
  MultilineChart,
  StackedLineChart,
  DonutLarge,
  DonutSmall,
  BubbleChart,
  Timeline,
  TrendingFlat,
  Analytics,
  Schema,
  Hub,
  Polyline,
  Splitscreen,
  ViewColumn,
  ViewModule,
  ViewQuilt,
  ViewWeek,
  ViewDay,
  ViewAgenda,
  ViewStream,
  ViewCarousel,
  ViewComfy,
  ViewCompact,
  ViewCozy,
  ViewHeadline,
  ViewList,
  ViewSidebar,
  PlayArrow,
  Close,
  ZoomIn,
  Map,
  MiscellaneousServices,
  Place,
  PinDrop,
  Directions,
  AccessTime,
  Terrain,
  MyLocation,
  OpenInNew,
  AttachFile
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
  Sankey,
  FunnelChart,
  Funnel,
  LabelList,
  RadialBarChart,
  RadialBar,
  SunburstChart,
  Sunburst,
  ComposedChart,
  Area as RechartsArea,
  ReferenceLine
} from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { Description } from '@radix-ui/react-dialog';
import { Fullscreen } from 'lucide-react';

// Enhanced color palette
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', 
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  '#F1948A', '#85C1E9', '#D7BDE2', '#F9E79F', '#A9DFBF', '#F5B7B1'
];

const STATUS_COLORS = {
  'Draft': '#f59e0b',
  'Submitted': '#3b82f6',
  'Under Review': '#8b5cf6',
  'Approved': '#10b981',
  'Rejected': '#ef4444'
};

const PROGRAM_COLORS = {
  'Science': '#FF6B6B',
  'Management': '#4ECDC4',
  'Humanities': '#45B7D1',
  'Education': '#96CEB4',
  'Engineering': '#FFEAA7',
  'Medicine': '#DDA0DD',
  'Law': '#98D8C8',
  'Arts': '#F7DC6F'
};

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, fontSize: '1.3rem' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none' }
  },
  palette: {
    primary: { main: '#2563eb', light: '#60a5fa', dark: '#1d4ed8' },
    secondary: { main: '#7c3aed', light: '#a78bfa', dark: '#5b21b6' },
    success: { main: '#059669', light: '#34d399', dark: '#047857' },
    warning: { main: '#d97706', light: '#fbbf24', dark: '#b45309' },
    error: { main: '#dc2626', light: '#ef4444', dark: '#b91c1c' },
    info: { main: '#0891b2', light: '#22d3ee', dark: '#0e7490' }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500
        }
      }
    }
  }
});

const AdminForCollege = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({
    district: '',
    province: '',
    campusType: '',
    formStatus: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const chartRef = useRef();

  useEffect(() => {
    fetchColleges();
  }, [page, rowsPerPage, filters]);

  const fetchColleges = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        ...filters
      };
      const response = await axios.get('http://localhost:4000/api/collegeform', { params });
      if (response.data.success) {
        setColleges(response.data.data);
        setTotalCount(response.data.pagination.totalForms);
      }
    } catch (err) {
      setError('Failed to fetch colleges data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollegeDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/collegeform/${id}`);
      if (response.data.success) {
        setSelectedCollege(response.data.data);
        setDetailOpen(true);
        setTabValue(0);
      }
    } catch (err) {
      setError('Failed to fetch college details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced Media Handler
  const handleMediaClick = (media, type) => {
    setSelectedMedia(media);
    setMediaType(type);
    setMediaModalOpen(true);
  };

  const handleCloseMediaModal = () => {
    setMediaModalOpen(false);
    setSelectedMedia(null);
  };

  // Enhanced Map Display
// const renderMapSection = (college) => {
//   const { location } = college;
  
//   // Using Google Maps Embed API
//   const kathmanduCoordinates = "27.7117604,85.3219601";
//   const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${kathmanduCoordinates}&zoom=15&maptype=roadmap`;
  
//   // Fallback to static map if no API key
//   const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${kathmanduCoordinates}&zoom=15&size=600x400&markers=color:red%7C${kathmanduCoordinates}&key=YOUR_GOOGLE_MAPS_API_KEY`;

//   return (
//     <Card sx={{ mb: 3, boxShadow: 3 }}>
//       <CardHeader
//         title={
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Map color="primary" />
//             <Typography variant="h6" fontWeight="600">
//               Location & Map
//             </Typography>
//           </Box>
//         }
//       />
//       <div style={{display:'flex',gap:'20px'}}>
//         <div style={{display:'flex',gap:'20px'}}>
//           {/* Location Details */}
//           <div>
//             <Card variant="outlined" sx={{ height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <LocationOn color="primary" />
//                   Location Details
//                 </Typography>
//                 <List dense>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 40 }}><Place color="primary" /></ListItemIcon>
//                     <ListItemText 
//                       primary="Address" 
//                       secondary={
//                         <Typography variant="body2" color="text.primary" fontWeight={500}>
//                           Hattisar Sadak 429, Kathmandu, Ward 1
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 40 }}><Public color="primary" /></ListItemIcon>
//                     <ListItemText 
//                       primary="District/Province" 
//                       secondary={
//                         <Typography variant="body2" color="text.primary" fontWeight={500}>
//                           Kathmandu, Bagmati Province
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 40 }}><Landscape color="primary" /></ListItemIcon>
//                     <ListItemText 
//                       primary="Landmark" 
//                       secondary={
//                         <Typography variant="body2" color="text.primary" fontWeight={500}>
//                           Near Hattisar
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 40 }}><PinDrop color="primary" /></ListItemIcon>
//                     <ListItemText 
//                       primary="Coordinates" 
//                       secondary={
//                         <Typography variant="body2" color="text.primary" fontWeight={500}>
//                           27.7117604° N, 85.3219601° E
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                 </List>
                
//                 <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
//                   <Button 
//                     variant="contained" 
//                     startIcon={<Map />}
//                     href="https://maps.google.com/?q=27.7117604,85.3219601"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     sx={{ mb: 1 }}
//                   >
//                     Open in Google Maps
//                   </Button>
//                   <Button 
//                     variant="outlined" 
//                     startIcon={<Directions />}
//                     href="https://www.google.com/maps/dir//27.7117604,85.3219601"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Get Directions
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Map Section */}
//           <div >
//             <Card variant="outlined" sx={{ height: '100%' }}>
//               <CardContent sx={{ p: 2 }}>
//                 <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Map color="primary" />
//                   Interactive Map
//                 </Typography>
                
//                 {/* Option 1: Direct link to Google Maps (No embedding issues) */}
//                 <Box 
//                   sx={{ 
//                     height: 300, 
//                     bgcolor: '#f8fafc', 
//                     borderRadius: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     border: '2px dashed #e2e8f0',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       bgcolor: '#f1f5f9',
//                       borderColor: 'primary.main'
//                     }
//                   }}
//                   onClick={() => window.open('https://maps.google.com/?q=27.7117604,85.3219601', '_blank')}
//                 >
//                   <Map sx={{ fontSize: 64, mb: 2, opacity: 0.7, color: 'primary.main' }} />
//                   <Typography variant="h6" color="primary" gutterBottom>
//                     Click to View Location
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 300 }}>
//                     Opens Google Maps in new window
//                   </Typography>
//                   <Button 
//                     variant="outlined" 
//                     startIcon={<OpenInNew />}
//                     sx={{ mt: 2 }}
//                   >
//                     Open Google Maps
//                   </Button>
//                 </Box>

//                 {/* Static map image as fallback */}
//                 <Box sx={{ mt: 2, textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Coordinates: 27.7117604° N, 85.3219601° E
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Quick Location Info */}
//         <div  style={{flex:1}}>
//           <div >
//             <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
//                 <AccessTime color="primary" />
//                 <Typography variant="body2" fontWeight="bold">Time Zone</Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary">NPT (UTC+5:45)</Typography>
//             </Card>
//           </div>
//           <div >
//             <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
//                 <Language color="primary" />
//                 <Typography variant="body2" fontWeight="bold">Region</Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary">Kathmandu Valley</Typography>
//             </Card>
//           </div>
//           <div >
//             <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
//                 <Terrain color="primary" />
//                 <Typography variant="body2" fontWeight="bold">Elevation</Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary">~1,400m</Typography>
//             </Card>
//           </div>
//           <div >
//             <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
//                 <MyLocation color="primary" />
//                 <Typography variant="body2" fontWeight="bold">Area</Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary">Hattisar</Typography>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

const renderMapSection = (college) => {
  const { location } = college;
  
  // Extract coordinates from Google Maps link
  const extractCoordinates = (mapsLink) => {
    if (!mapsLink) return null;
    
    const atMatch = mapsLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) return { lat: atMatch[1], lng: atMatch[2] };
    
    const paramMatch = mapsLink.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (paramMatch) return { lat: paramMatch[1], lng: paramMatch[2] };
    
    return null;
  };

  const coordinates = extractCoordinates(location.googleMapsLink);
  const coordinatesString = coordinates ? `${coordinates.lat},${coordinates.lng}` : null;

  // Build full address
  const fullAddress = [
    location.streetTole,
    location.localLevel,
    `Ward ${location.wardNo}`,
    location.district,
    location.province
  ].filter(Boolean).join(', ');

  // Directions URL
  const directionsUrl = coordinatesString 
    ? `https://www.google.com/maps/dir//${coordinatesString}`
    : `https://www.google.com/maps/dir//${encodeURIComponent(fullAddress)}`;

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Map color="primary" />
            <Typography variant="h6" fontWeight="600">
              Location & Map
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Location Details */}
          <Box sx={{ flex: { xs: '1', md: '0 0 350px' } }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" />
                  Location Details
                </Typography>
                <List dense>
                  {location.streetTole && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Place color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Street/Tole" 
                        secondary={
                          <Typography variant="body2" color="text.primary" fontWeight={500}>
                            {location.streetTole}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <MyLocation color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Municipality & Ward" 
                      secondary={
                        <Typography variant="body2" color="text.primary" fontWeight={500}>
                          {location.localLevel}, Ward {location.wardNo}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Public color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="District/Province" 
                      secondary={
                        <Typography variant="body2" color="text.primary" fontWeight={500}>
                          {location.district}, {location.province}
                        </Typography>
                      }
                    />
                  </ListItem>

                  {location.landmark && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Landscape color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Landmark" 
                        secondary={
                          <Typography variant="body2" color="text.primary" fontWeight={500}>
                            {location.landmark}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}

                  {coordinatesString && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PinDrop color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Coordinates" 
                        secondary={
                          <Typography variant="body2" color="text.primary" fontWeight={500}>
                            {coordinates.lat}° N, {coordinates.lng}° E
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </List>
                
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<Map />}
                    href={location.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Open in Google Maps
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Directions />}
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Get Directions
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Map Action Card */}
          <Box sx={{ flex: 1 }}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px dashed #e2e8f0',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
              onClick={() => window.open(location.googleMapsLink, '_blank')}
            >
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Map sx={{ fontSize: 80, mb: 3, opacity: 0.7, color: 'primary.main' }} />
                <Typography variant="h5" color="primary" gutterBottom fontWeight="600">
                  View on Map
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                  Click to open the interactive map in Google Maps and explore the exact location
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<OpenInNew />}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a4391 100%)',
                    }
                  }}
                >
                  Open Google Maps
                </Button>
                {coordinatesString && (
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>
                    {coordinates.lat}° N, {coordinates.lng}° E
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* Quick Location Info */}
          <Box sx={{ flex: { xs: '1', md: '0 0 200px' } }}>
            <Stack spacing={2}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Public color="primary" />
                  <Typography variant="body2" fontWeight="bold">Province</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {location.province}
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Landscape color="primary" />
                  <Typography variant="body2" fontWeight="bold">District</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {location.district}
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <MyLocation color="primary" />
                  <Typography variant="body2" fontWeight="bold">Municipality</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {location.localLevel}
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Place color="primary" />
                  <Typography variant="body2" fontWeight="bold">Ward</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Ward {location.wardNo}
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <AccessTime color="primary" />
                  <Typography variant="body2" fontWeight="bold">Time Zone</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  NPT (UTC+5:45)
                </Typography>
              </Card>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

  // Enhanced Building Media Display
// Enhanced Building Media Display
const renderBuildingMedia = (building) => {
  const hasImages = building.media?.images && building.media.images.length > 0;
  const hasVideos = building.media?.videos && building.media.videos.length > 0;

  if (!hasImages && !hasVideos) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'grey.50', borderRadius: 3 }}>
        <ZoomIn sx={{ fontSize: 64, color: 'grey.400', mb: 3 }} />
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No Media Available
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No images or videos have been uploaded for this building.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {/* Images Section */}
      {hasImages && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ZoomIn sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
            Building Gallery ({building.media.images.length} images)
          </Typography>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 16 
          }}>
            {building.media.images.map((image, index) => (
              <Card 
                key={index}
                sx={{ 
                  width: 280,
                  cursor: 'pointer',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)'
                  }
                }}
                onClick={() => handleMediaClick(image, 'image')}
              >
                <Box sx={{ position: 'relative', height: 200 }}>
                  <img
                    src={image.url}
                    alt={image.caption || `Building image ${index + 1}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 2
                  }}>
                    <Typography variant="body1" color="white" fontWeight="500">
                      {image.caption || `Image ${index + 1}`}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </Box>
      )}

      {/* Videos Section */}
      {hasVideos && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PlayArrow sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
            Video Tours ({building.media.videos.length} videos)
          </Typography>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 16 
          }}>
            {building.media.videos.map((video, index) => (
              <Card 
                key={index}
                sx={{ 
                  width: 320,
                  cursor: 'pointer',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)'
                  }
                }}
                onClick={() => handleMediaClick(video, 'video')}
              >
                <Box sx={{ position: 'relative', height: 200 }}>
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.caption || `Building video ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: 'grey.900',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PlayArrow sx={{ color: 'white', fontSize: 48 }} />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <PlayArrow sx={{ color: 'white', fontSize: 48 }} />
                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    padding: 2
                  }}>
                    <Typography variant="body1" color="white" fontWeight="500">
                      {video.caption || `Video ${index + 1}`}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </Box>
      )}
    </Box>
  );
};

  // Enhanced Building Infrastructure Section
  const renderBuildingInfrastructure = (college) => {
    return (
      <Box>
        {college.infrastructure.buildings.map((building, index) => (
          <Card key={building._id || index} sx={{ mb: 3 }}>
            <CardHeader
              title={building.buildingName}
              subheader={`${building.totalRooms} total rooms • ${building.classrooms || 0} classrooms • ${building.labs || 0} labs`}
              action={
                <Chip 
                  label={building.condition} 
                  color={
                    building.condition === 'Excellent' ? 'success' :
                    building.condition === 'Good' ? 'primary' :
                    building.condition === 'Fair' ? 'warning' : 'error'
                  }
                />
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Building Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><MeetingRoom color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Total Rooms" 
                        secondary={building.totalRooms}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Business color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Classrooms" 
                        secondary={building.classrooms || 0}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Science color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Laboratories" 
                        secondary={building.labs || 0}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocalLibrary color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Library" 
                        secondary={building.library || 0}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AdminPanelSettings color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Administrative" 
                        secondary={building.administrative || 0}
                      />
                    </ListItem>
                    <ListItem>
                      {/* <ListItemIcon><MiscellaneousServices color="primary" /></ListItemIcon> */}
                      <ListItemText 
                        primary="Other Rooms" 
                        secondary={building.other || 0}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderBuildingMedia(building)}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  // All existing data processing functions remain exactly the same
  const getEnrollmentData = (college) => {
    return [
      { name: 'Male', value: college.academicPrograms.enrollment.male, fill: '#0088FE' },
      { name: 'Female', value: college.academicPrograms.enrollment.female, fill: '#00C49F' },
      { name: 'Other', value: college.academicPrograms.enrollment.other, fill: '#FFBB28' }
    ].filter(item => item.value > 0);
  };

  const getStaffData = (college) => {
    return [
      { name: 'Academic', value: college.staff.academic.length, fill: '#8884D8' },
      { name: 'Administrative', value: college.staff.administrative.length, fill: '#82CA9D' }
    ];
  };

  const getStaffByDepartment = (college) => {
    const departments = {};
    college.staff.academic.forEach(staff => {
      departments[staff.department] = (departments[staff.department] || 0) + 1;
    });
    return Object.entries(departments).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length]
    }));
  };

  const getBuildingConditionData = (college) => {
    const conditions = {};
    college.infrastructure.buildings.forEach(building => {
      conditions[building.condition] = (conditions[building.condition] || 0) + 1;
    });
    return Object.entries(conditions).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length]
    }));
  };

  const getTechnologyData = (college) => {
    return [
      { name: 'Digital Classrooms', value: college.educationalTechnology.digitalClassrooms, fill: '#0088FE' },
      { name: 'Computer Labs', value: college.educationalTechnology.computerLabs, fill: '#00C49F' },
      { name: 'Computers', value: college.educationalTechnology.computersAvailable, fill: '#FFBB28' },
      { name: 'Projectors', value: college.educationalTechnology.projectors || 0, fill: '#FF8042' },
      { name: 'Smart Boards', value: college.educationalTechnology.smartBoards || 0, fill: '#8884D8' }
    ];
  };

  const getLibraryData = (college) => {
    return [
      { name: 'Physical Books', value: college.educationalTechnology.libraryResources.physicalBooks, fill: '#0088FE' },
      { name: 'eBooks', value: college.educationalTechnology.libraryResources.ebooks, fill: '#00C49F' },
      { name: 'Journals', value: college.educationalTechnology.libraryResources.journals, fill: '#FFBB28' },
      { name: 'Research Papers', value: college.educationalTechnology.libraryResources.researchPapers || 0, fill: '#FF8042' },
      { name: 'Magazines', value: college.educationalTechnology.libraryResources.magazines || 0, fill: '#8884D8' }
    ];
  };

  const getToiletData = (college) => {
    return [
      { name: 'Male', value: college.infrastructure.healthSanitation.toilets.male, fill: '#0088FE' },
      { name: 'Female', value: college.infrastructure.healthSanitation.toilets.female, fill: '#00C49F' },
      { name: 'Disabled Friendly', value: college.infrastructure.healthSanitation.toilets.disabledFriendly, fill: '#FFBB28' }
    ];
  };

  const getProgramLevelData = (college) => {
    const levels = {};
    college.academicPrograms.programs.forEach(program => {
      levels[program.level] = (levels[program.level] || 0) + 1;
    });
    return Object.entries(levels).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length]
    }));
  };

  const getProgramFacultyData = (college) => {
    const faculties = {};
    college.academicPrograms.programs.forEach(program => {
      const faculty = program.faculty || 'General';
      faculties[faculty] = (faculties[faculty] || 0) + 1;
    });
    return Object.entries(faculties).map(([name, value], index) => ({
      name,
      value,
      fill: PROGRAM_COLORS[name] || COLORS[index % COLORS.length]
    }));
  };

  const getRoomDistribution = (college) => {
    const distribution = [];
    college.infrastructure.buildings.forEach(building => {
      distribution.push({
        building: building.buildingName,
        classrooms: building.classrooms || 0,
        labs: building.labs || 0,
        library: building.library || 0,
        administrative: building.administrative || 0,
        other: building.other || 0
      });
    });
    return distribution;
  };

  const getInfrastructureRadarData = (college) => {
    const infra = college.infrastructure;
    return [
      {
        subject: 'Buildings',
        A: infra.buildings.length,
        fullMark: 20,
      },
      {
        subject: 'Classrooms',
        A: infra.buildings.reduce((sum, b) => sum + (b.classrooms || 0), 0),
        fullMark: 100,
      },
      {
        subject: 'Labs',
        A: infra.buildings.reduce((sum, b) => sum + (b.labs || 0), 0),
        fullMark: 50,
      },
      {
        subject: 'Toilets',
        A: infra.healthSanitation.toilets.male + infra.healthSanitation.toilets.female + infra.healthSanitation.toilets.disabledFriendly,
        fullMark: 50,
      },
      {
        subject: 'Area (k m²)',
        A: Math.round((infra.landArea.squareMeters || 0) / 1000),
        fullMark: 100,
      },
    ];
  };

  const getStudentProgressionData = (college) => {
    return [
      { year: '2019', enrolled: 1200, graduated: 980, dropouts: 45 },
      { year: '2020', enrolled: 1350, graduated: 1100, dropouts: 52 },
      { year: '2021', enrolled: 1420, graduated: 1180, dropouts: 48 },
      { year: '2022', enrolled: 1560, graduated: 1280, dropouts: 55 },
      { year: '2023', enrolled: 1680, graduated: 1380, dropouts: 60 }
    ];
  };

  const getStaffQualificationData = (college) => {
    const qualifications = {};
    college.staff.academic.forEach(staff => {
      const qual = staff.qualification || 'Not Specified';
      qualifications[qual] = (qualifications[qual] || 0) + 1;
    });
    return Object.entries(qualifications).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length]
    }));
  };

  const getFinancialData = (college) => {
    return [
      { category: 'Infrastructure', budget: 5000000, spent: 4200000 },
      { category: 'Salaries', budget: 8000000, spent: 7800000 },
      { category: 'Technology', budget: 2000000, spent: 1800000 },
      { category: 'Research', budget: 1500000, spent: 1200000 },
      { category: 'Maintenance', budget: 1000000, spent: 950000 }
    ];
  };

  const getSportsFacilitiesData = (college) => {
    const sports = college.infrastructure.sportsRecreation || {};
    return [
      { name: 'Basketball', value: sports.basketballCourts || 0, fill: '#FF6B6B' },
      { name: 'Volleyball', value: sports.volleyballCourts || 0, fill: '#4ECDC4' },
      { name: 'Football', value: sports.footballGrounds || 0, fill: '#45B7D1' },
      { name: 'Cricket', value: sports.cricketGrounds || 0, fill: '#96CEB4' },
      { name: 'Tennis', value: sports.tennisCourts || 0, fill: '#FFEAA7' },
      { name: 'Badminton', value: sports.badmintonCourts || 0, fill: '#DDA0DD' }
    ];
  };

  // All existing export functions remain exactly the same
  const exportToPDF = () => {
    if (!selectedCollege) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add header with gradient effect
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(selectedCollege.collegeName, 20, 25);
    doc.setFontSize(12);
    doc.text(`${selectedCollege.campusType} • ${selectedCollege.location.district}, ${selectedCollege.location.province}`, 20, 35);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 42);

    let yPosition = 70;

    // College Overview Table
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('College Overview', 20, yPosition);
    yPosition += 10;

    const overviewData = [
      ['Established:', new Date(selectedCollege.establishmentDate).toLocaleDateString()],
      ['College ID:', selectedCollege.collegeId],
      ['Principal:', selectedCollege.principalInfo.name],
      ['Contact:', selectedCollege.principalInfo.contactNumber],
      ['Email:', selectedCollege.principalInfo.email],
      ['Website:', selectedCollege.contactInfo.website || 'N/A'],
      ['Status:', selectedCollege.formStatus],
      ['Total Students:', selectedCollege.academicPrograms.enrollment.total.toString()],
      ['Total Staff:', (selectedCollege.staff.academic.length + selectedCollege.staff.administrative.length).toString()],
      ['Total Buildings:', selectedCollege.infrastructure.buildings.length.toString()]
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [['Field', 'Value']],
      body: overviewData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 10, cellPadding: 3 },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 15;

    // Academic Programs
    if (selectedCollege.academicPrograms.programs.length > 0) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Academic Programs', 20, 20);
      
      const programData = selectedCollege.academicPrograms.programs.map(program => [
        program.programName,
        program.level,
        program.faculty || 'General',
        program.duration || 'N/A'
      ]);

      autoTable(doc, {
        startY: 30,
        head: [['Program Name', 'Level', 'Faculty', 'Duration']],
        body: programData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
        styles: { fontSize: 9, cellPadding: 2 }
      });
    }

    // Staff Details
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Academic Staff', 20, 20);
    
    const academicStaffData = selectedCollege.staff.academic.map(staff => [
      staff.name,
      staff.designation,
      staff.department,
      staff.qualification || 'N/A',
      staff.employmentType
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Designation', 'Department', 'Qualification', 'Employment Type']],
      body: academicStaffData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 8, cellPadding: 2 }
    });

    // Infrastructure Details
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Building Infrastructure', 20, 20);
    
    const buildingData = selectedCollege.infrastructure.buildings.map(building => [
      building.buildingName,
      building.totalRooms.toString(),
      (building.classrooms || 0).toString(),
      (building.labs || 0).toString(),
      building.condition
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Building Name', 'Total Rooms', 'Classrooms', 'Labs', 'Condition']],
      body: buildingData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 8, cellPadding: 2 }
    });

    // Technology Summary
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Technology Infrastructure', 20, 20);
    
    const techData = [
      ['Digital Classrooms', selectedCollege.educationalTechnology.digitalClassrooms.toString()],
      ['Computer Labs', selectedCollege.educationalTechnology.computerLabs.toString()],
      ['Computers Available', selectedCollege.educationalTechnology.computersAvailable.toString()],
      ['Internet Available', selectedCollege.educationalTechnology.internetAvailability.available ? 'Yes' : 'No'],
      ['Internet Speed', selectedCollege.educationalTechnology.internetAvailability.speed || 'N/A'],
      ['Internet Provider', selectedCollege.educationalTechnology.internetAvailability.provider || 'N/A']
    ];

    autoTable(doc, {
      startY: 30,
      head: [['Technology', 'Count/Status']],
      body: techData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 10, cellPadding: 3 }
    });

    // Add summary page with charts data
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Statistical Summary', 20, 20);
    
    const statsData = [
      ['Total Enrollment', selectedCollege.academicPrograms.enrollment.total.toString()],
      ['Male Students', selectedCollege.academicPrograms.enrollment.male.toString()],
      ['Female Students', selectedCollege.academicPrograms.enrollment.female.toString()],
      ['Other Students', selectedCollege.academicPrograms.enrollment.other.toString()],
      ['Academic Staff', selectedCollege.staff.academic.length.toString()],
      ['Admin Staff', selectedCollege.staff.administrative.length.toString()],
      ['Total Programs', selectedCollege.academicPrograms.programs.length.toString()],
      ['Library Books', selectedCollege.educationalTechnology.libraryResources.physicalBooks.toString()],
      ['eBooks', selectedCollege.educationalTechnology.libraryResources.ebooks.toString()],
      ['Land Area (m²)', (selectedCollege.infrastructure.landArea.squareMeters || 0).toString()]
    ];

    autoTable(doc, {
      startY: 30,
      head: [['Metric', 'Value']],
      body: statsData,
      theme: 'grid',
      headStyles: { fillColor: [10, 150, 105] },
      styles: { fontSize: 10, cellPadding: 3 }
    });

    doc.save(`${selectedCollege.collegeName}_Comprehensive_Report.pdf`);
  };

  const exportToExcel = () => {
    if (!selectedCollege) return;

    const workbook = XLSX.utils.book_new();

    // College Overview Sheet
    const overviewData = [
      ['College Overview', ''],
      ['College Name', selectedCollege.collegeName],
      ['Campus Type', selectedCollege.campusType],
      ['District', selectedCollege.location.district],
      ['Province', selectedCollege.location.province],
      ['Established', new Date(selectedCollege.establishmentDate).toLocaleDateString()],
      ['College ID', selectedCollege.collegeId],
      ['Principal', selectedCollege.principalInfo.name],
      ['Contact', selectedCollege.principalInfo.contactNumber],
      ['Email', selectedCollege.principalInfo.email],
      ['Website', selectedCollege.contactInfo.website || 'N/A'],
      ['Status', selectedCollege.formStatus],
      [''],
      ['Enrollment Statistics', ''],
      ['Total Students', selectedCollege.academicPrograms?.enrollment.total],
      ['Male Students', selectedCollege.academicPrograms.enrollment.male],
      ['Female Students', selectedCollege.academicPrograms.enrollment.female],
      ['Other Students', selectedCollege.academicPrograms.enrollment.other],
      [''],
      ['Staff Statistics', ''],
      ['Academic Staff', selectedCollege.staff.academic.length],
      ['Administrative Staff', selectedCollege.staff.administrative.length],
      ['Total Staff', selectedCollege.staff.academic.length + selectedCollege.staff.administrative.length],
      [''],
      ['Infrastructure Statistics', ''],
      ['Total Buildings', selectedCollege.infrastructure.buildings.length],
      ['Land Area (m²)', selectedCollege.infrastructure.landArea.squareMeters || 0],
      ['Total Programs', selectedCollege.academicPrograms.programs.length]
    ];

    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');

    // Academic Programs Sheet
    const programData = [
      ['Program Name', 'Level', 'Faculty', 'Duration', 'Type']
    ];
    selectedCollege.academicPrograms.programs.forEach(program => {
      programData.push([
        program.programName,
        program.level,
        program.faculty || 'General',
        program.duration || 'N/A',
        program.type || 'Regular'
      ]);
    });
    const programSheet = XLSX.utils.aoa_to_sheet(programData);
    XLSX.utils.book_append_sheet(workbook, programSheet, 'Academic Programs');

    // Staff Sheet
    const staffData = [
      ['Name', 'Designation', 'Department', 'Qualification', 'Employment Type', 'Staff Type']
    ];
    selectedCollege.staff.academic.forEach(staff => {
      staffData.push([
        staff.name,
        staff.designation,
        staff.department,
        staff.qualification || 'N/A',
        staff.employmentType,
        'Academic'
      ]);
    });
    selectedCollege.staff.administrative.forEach(staff => {
      staffData.push([
        staff.name,
        staff.designation,
        staff.department,
        staff.qualification || 'N/A',
        staff.employmentType,
        'Administrative'
      ]);
    });
    const staffSheet = XLSX.utils.aoa_to_sheet(staffData);
    XLSX.utils.book_append_sheet(workbook, staffSheet, 'Staff Details');

    // Infrastructure Sheet
    const infraData = [
      ['Building Name', 'Total Rooms', 'Classrooms', 'Labs', 'Library', 'Administrative', 'Other', 'Condition']
    ];
    selectedCollege.infrastructure.buildings.forEach(building => {
      infraData.push([
        building.buildingName,
        building.totalRooms,
        building.classrooms || 0,
        building.labs || 0,
        building.library || 0,
        building.administrative || 0,
        building.other || 0,
        building.condition
      ]);
    });
    const infraSheet = XLSX.utils.aoa_to_sheet(infraData);
    XLSX.utils.book_append_sheet(workbook, infraSheet, 'Buildings');

    // Technology Sheet
    const techData = [
      ['Category', 'Details'],
      ['Digital Classrooms', selectedCollege.educationalTechnology.digitalClassrooms],
      ['Computer Labs', selectedCollege.educationalTechnology.computerLabs],
      ['Computers Available', selectedCollege.educationalTechnology.computersAvailable],
      ['Internet Available', selectedCollege.educationalTechnology.internetAvailability.available ? 'Yes' : 'No'],
      ['Internet Speed', selectedCollege.educationalTechnology.internetAvailability.speed || 'N/A'],
      ['Internet Provider', selectedCollege.educationalTechnology.internetAvailability.provider || 'N/A'],
      ['Physical Books', selectedCollege.educationalTechnology.libraryResources.physicalBooks],
      ['eBooks', selectedCollege.educationalTechnology.libraryResources.ebooks],
      ['Journals', selectedCollege.educationalTechnology.libraryResources.journals],
      ['Digital Database', selectedCollege.educationalTechnology.libraryResources.digitalDatabase ? 'Yes' : 'No']
    ];
    const techSheet = XLSX.utils.aoa_to_sheet(techData);
    XLSX.utils.book_append_sheet(workbook, techSheet, 'Technology');

    // Contact Information Sheet
    const contactData = [
      ['Contact Type', 'Name', 'Position', 'Phone', 'Email'],
      ['Principal', selectedCollege.principalInfo.name, 'Principal', selectedCollege.principalInfo.contactNumber, selectedCollege.principalInfo.email],
      ['Admin Chief', selectedCollege.staffContacts.adminChief.name, 'Admin Chief', selectedCollege.staffContacts.adminChief.mobile, ''],
      ['Account Chief', selectedCollege.staffContacts.accountChief.name, 'Account Chief', selectedCollege.staffContacts.accountChief.mobile, ''],
      ['Data Contact', selectedCollege.dataCollectionContact.name, 'Data Collection', selectedCollege.dataCollectionContact.phone, selectedCollege.dataCollectionContact.email]
    ];
    const contactSheet = XLSX.utils.aoa_to_sheet(contactData);
    XLSX.utils.book_append_sheet(workbook, contactSheet, 'Contacts');

    XLSX.writeFile(workbook, `${selectedCollege.collegeName}_Complete_Data.xlsx`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  };

  // All existing component functions remain exactly the same
  const StatCard = ({ icon, title, value, color, subtitle, trend }) => (
    <Card sx={{ height:'max-content', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1}>
            <Typography component="div" fontWeight="bold" color={color} gutterBottom>
              {value}
            </Typography>
            <Typography  color="text.secondary" gutterBottom style={{fontWeight:'bold'}}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Chip 
                label={trend} 
                size="small" 
                color={trend.includes('+') ? 'success' : 'error'}
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}20`, width: 30, height: 30 }}>
            {React.cloneElement(icon, { sx: { fontSize: 20, color } })}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, icon, children, height = 300 }) => (
    <Card>
      <CardHeader
        title={title}
        avatar={React.cloneElement(icon, { color: 'primary' })}
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <Card sx={{ mb: 3, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent sx={{ color: 'white', py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 700
            }}>
              <School sx={{ mr: 2, fontSize: 40 }} />
              College Administration Dashboard
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Comprehensive management and analytics for educational institutions
            </Typography>
          </CardContent>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Filters Section - Unchanged */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterList sx={{ mr: 1 }} />
                Filters & Search
              </Typography>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{ borderRadius: 2 }}
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
            </Box>
            
            {showFilters && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2.4}>
                  <TextField
                    fullWidth
                    label="Search Colleges"
                    size="small"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="College name..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <TextField
                    fullWidth
                    label="Province"
                    size="small"
                    value={filters.province}
                    onChange={(e) => handleFilterChange('province', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <TextField
                    fullWidth
                    label="District"
                    size="small"
                    value={filters.district}
                    onChange={(e) => handleFilterChange('district', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Select
                    fullWidth
                    size="small"
                    value={filters.campusType}
                    onChange={(e) => handleFilterChange('campusType', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Campus Types</MenuItem>
                    <MenuItem value="Community Campus">Community Campus</MenuItem>
                    <MenuItem value="Constituent Campus">Constituent Campus</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                  <Select
                    fullWidth
                    size="small"
                    value={filters.formStatus}
                    onChange={(e) => handleFilterChange('formStatus', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Submitted">Submitted</MenuItem>
                    <MenuItem value="Under Review">Under Review</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>

        {/* Colleges Table - Unchanged */}
        <Card sx={{ borderRadius: 3 }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Business sx={{ mr: 1 }} />
                  Colleges List
                </Typography>
                <Chip 
                  label={`${totalCount} total colleges`} 
                  color="primary" 
                  variant="filled"
                />
              </Box>
            }
          />
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                <TableRow>
                  <TableCell><strong>College Name</strong></TableCell>
                  <TableCell><strong>Campus Type</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Principal</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Students</strong></TableCell>
                  <TableCell><strong>Created</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Loading colleges data...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : colleges.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <School sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        No colleges found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or search criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  colleges.map((college) => (
                    <TableRow key={college._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
                            <School sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="600">
                              {college.collegeName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {college.collegeId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={college.campusType} 
                          size="small" 
                          variant="outlined"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Box>
                            <Typography variant="body2">{college?.location.district}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {college?.location.province}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccountCircle sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2">{college?.principalInfo?.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={college.formStatus}
                          size="small"
                          sx={{
                            bgcolor: STATUS_COLORS[college.formStatus],
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {college.academicPrograms?.enrollment.total}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2">
                            {new Date(college.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          startIcon={<Visibility />}
                          onClick={() => fetchCollegeDetails(college._id)}
                          size="small"
                          sx={{ borderRadius: 2 }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{ borderTop: '1px solid', borderColor: 'divider' }}
          />
        </Card>

        {/* Enhanced Detail Dialog with Map and Media */}
        <Dialog
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          maxWidth="xl"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3, minHeight: '80vh', maxHeight: '95vh' }
          }}
        >
          {selectedCollege && (
            <>
              <DialogTitle sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                pb: 2,
                position: 'sticky',
                top: 0,
                zIndex: 1000
              }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {selectedCollege.collegeName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Chip 
                      label={selectedCollege.campusType} 
                      variant="outlined" 
                      sx={{ color: 'white', borderColor: 'white' }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 0.5 }} />
                      <Typography>
                        {selectedCollege.location.district}, {selectedCollege.location.province}
                      </Typography>
                    </Box>
                    <Chip
                      label={selectedCollege.formStatus}
                      sx={{
                        bgcolor: 'white',
                        color: STATUS_COLORS[selectedCollege.formStatus]
                      }}
                    />
                  </Box>
                </Box>
              </DialogTitle>

              <DialogContent dividers sx={{ p: 0 }}>
                <Box sx={{ p: 3 }}>
                  {/* Enhanced Export Buttons - Unchanged */}
                  <Card sx={{ mb: 3, bgcolor: '#f8fafc', border: '2px dashed #e2e8f0' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Download sx={{ mr: 1 }} />
                        Export College Data
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button 
                          startIcon={<PictureAsPdf />} 
                          variant="contained" 
                          onClick={exportToPDF}
                          sx={{ borderRadius: 2 }}
                          size="large"
                        >
                          Download Comprehensive PDF Report
                        </Button>
                        <Button 
                          startIcon={<Download />} 
                          variant="outlined" 
                          onClick={exportToExcel}
                          sx={{ borderRadius: 2 }}
                          size="large"
                        >
                          Export Complete Excel Data
                        </Button>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        PDF includes all data with charts, Excel includes raw data in multiple sheets
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Map Section */}
            




   



                  <Tabs 
                    value={tabValue} 
                    onChange={(e, v) => setTabValue(v)} 
                    sx={{ 
                      mb: 3,
                      '& .MuiTab-root': { borderRadius: 2, mx: 0.5, minHeight: 60 }
                    }}
                    TabIndicatorProps={{
                      sx: { height: 4, borderRadius: 2 }
                    }}
                  >
                    <Tab icon={<Assessment />} iconPosition="start" label="Overview" />
                    <Tab icon={<School />} iconPosition="start" label="Academic" />
                    <Tab icon={<Apartment />} iconPosition="start" label="Infrastructure" />
                    <Tab icon={<Computer />} iconPosition="start" label="Technology" />
                    <Tab icon={<Group />} iconPosition="start" label="Staff" />
                    <Tab icon={<Construction />} iconPosition="start" label="Projects" />
                    <Tab icon={<Analytics />} iconPosition="start" label="Analytics" />
                    <Tab icon={<LocationOn />} iconPosition="start" label="Location" />
                  </Tabs>

                  {/* Overview Tab - Unchanged */}
{tabValue === 0 && (
  <Box>
    {/* Header Section */}
    {/* <Card sx={{ 
      mb: 4, 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      borderRadius: 3
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <School sx={{ fontSize: 20, mr: 2 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              College Overview
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Comprehensive dashboard with key metrics and performance indicators
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card> */}

    {/* Key Metrics */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20, 
      marginBottom: 24 
    }}>
      {/* Total Students */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <People sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.academicPrograms.enrollment.total?.toLocaleString()}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Total Students
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Current enrollment
          </Typography>
          <Chip 
            label="+5.2%" 
            size="small"
            sx={{ 
              mt: 1, 
              bgcolor: 'white', 
              color: 'success.main',
              fontWeight: 'bold'
            }}
          />
        </CardContent>
      </Card>

      {/* Total Staff */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Group sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {(selectedCollege.staff.academic.length + selectedCollege.staff.administrative.length)?.toLocaleString()}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Total Staff
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Teaching & Admin
          </Typography>
          <Chip 
            label="+2.1%" 
            size="small"
            sx={{ 
              mt: 1, 
              bgcolor: 'white', 
              color: 'success.main',
              fontWeight: 'bold'
            }}
          />
        </CardContent>
      </Card>

      {/* Programs */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'black', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Business sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.academicPrograms.programs.length}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Programs
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Academic programs
          </Typography>
        </CardContent>
      </Card>

      {/* Buildings */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Apartment sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.infrastructure.buildings.length}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Buildings
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Infrastructure
          </Typography>
        </CardContent>
      </Card>
    </div>

    {/* First Row: Two Charts */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20, 
      marginBottom: 24 
    }}>
      {/* Student Enrollment Distribution */}
      <div style={{ flex: '1 1 480px', minWidth: 380 }}>
        <ChartCard title="Student Enrollment Distribution" icon={<People />} height={350}>
          <PieChart>
            <Pie
              data={getEnrollmentData(selectedCollege)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              innerRadius={50}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {getEnrollmentData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
            <Legend />
          </PieChart>
        </ChartCard>
      </div>

      {/* Staff Composition */}
      <div style={{ flex: '1 1 480px', minWidth: 380 }}>
        <ChartCard title="Staff Composition" icon={<Group />} height={350}>
          <BarChart
            data={getStaffData(selectedCollege)}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} staff`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Staff Count"
              radius={[4, 4, 0, 0]}
              barSize={40}
              label={{ 
                position: 'top', 
                formatter: (value) => value,
                fill: '#374151',
                fontSize: 11,
                fontWeight: 'bold'
              }}
            >
              {getStaffData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>
    </div>

    {/* Second Row: Two Charts */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20, 
      marginBottom: 24 
    }}>
      {/* Infrastructure Capacity */}
      <div style={{ flex: '1 1 480px', minWidth: 380 }}>
        <ChartCard title="Infrastructure Capacity" icon={<Apartment />} height={350}>
          <BarChart
            data={getInfrastructureRadarData(selectedCollege)}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[0, (dataMax) => Math.max(dataMax * 1.1, 100)]}
            />
            <YAxis 
              type="category" 
              dataKey="subject" 
              width={80}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip 
              formatter={(value, name) => [`${value}`, 'Score']}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Bar 
              dataKey="A" 
              name="Current Level"
              radius={[0, 6, 6, 0]}
              barSize={25}
              fill="#8884d8"
              label={{ 
                position: 'right', 
                formatter: (value) => `${value}`,
                fill: '#374151',
                fontSize: 11,
                fontWeight: 'bold'
              }}
            />
            <ReferenceLine 
              x={100} 
              stroke="#ff7300" 
              strokeWidth={2} 
              strokeDasharray="3 3"
              label="Target"
            />
          </BarChart>
        </ChartCard>
      </div>

      {/* Programs by Faculty */}
      <div style={{ flex: '1 1 480px', minWidth: 380 }}>
        <ChartCard title="Programs by Faculty" icon={<Business />} height={350}>
          <BarChart
            data={getProgramFacultyData(selectedCollege)}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={70}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => [`${value} programs`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Programs"
              radius={[0, 4, 4, 0]}
              barSize={30}
              label={{ 
                position: 'right', 
                formatter: (value) => `${value}`,
                fill: '#374151',
                fontSize: 11,
                fontWeight: 'bold'
              }}
            >
              {getProgramFacultyData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>
    </div>

    {/* Additional Overview Metrics */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20 
    }}>
      <Card sx={{ 
        flex: '1 1 250px', 
        bgcolor: 'success.50', 
        border: 'none',
        minWidth: 220
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <LibraryBooks sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" color="success.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.libraryResources.physicalBooks?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Library Books
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Physical collection
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 250px', 
        bgcolor: 'info.50', 
        border: 'none',
        minWidth: 220
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Computer sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
          <Typography variant="h4" color="info.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.computersAvailable?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Computers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available for use
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 250px', 
        bgcolor: 'warning.50', 
        border: 'none',
        minWidth: 220
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Wifi sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
          <Typography variant="h5" color="warning.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.internetAvailability.available ? 'Available' : 'Not Available'}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Internet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connectivity status
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 250px', 
        bgcolor: 'primary.50', 
        border: 'none',
        minWidth: 220
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" color="primary.main" fontWeight="bold" gutterBottom>
            {new Date(selectedCollege.establishmentDate).getFullYear()}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Established
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Foundation year
          </Typography>
        </CardContent>
      </Card>
    </div>
  </Box>
)}

                  {/* Infrastructure Tab - Enhanced with Media */}
{tabValue === 2 && (
  <Box>
    {/* Header Section */}
    {/* <Card sx={{ 
      mb: 4, 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      borderRadius: 3
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Architecture sx={{ fontSize: 20, mr: 2 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Campus Infrastructure
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Comprehensive overview of buildings, facilities, and resources
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card> */}

    {/* Summary Statistics */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20, 
      marginBottom: 24 
    }}>
      {/* Land Area */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <MyLocation sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.infrastructure.landArea.squareMeters?.toLocaleString() || 'N/A'}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Square Meters
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Total campus area
          </Typography>
        </CardContent>
      </Card>

      {/* Total Buildings */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Apartment sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.infrastructure.buildings.length}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Total Buildings
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Academic & administrative
          </Typography>
        </CardContent>
      </Card>

      {/* Classrooms */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'black', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <School sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.infrastructure.buildings.reduce((sum, b) => sum + (b.classrooms || 0), 0)}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Classrooms
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Teaching spaces
          </Typography>
        </CardContent>
      </Card>

      {/* Laboratories */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
        color: 'white',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Science sx={{ fontSize: 36, mb: 1 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.infrastructure.buildings.reduce((sum, b) => sum + (b.labs || 0), 0)}
          </Typography>
          <Typography variant="h6" fontWeight="600">
            Laboratories
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Research & practical spaces
          </Typography>
        </CardContent>
      </Card>
    </div>

    {/* First Row: Two Charts */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20, 
      marginBottom: 24 
    }}>
      {/* Building Conditions Chart */}
      <div style={{ flex: '1 1 480px', minWidth: 380 }}>
        <ChartCard title="Building Conditions" icon={<Engineering />} height={350}>
          <PieChart>
            <Pie
              data={getBuildingConditionData(selectedCollege)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {getBuildingConditionData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [
              `${value} buildings`, 
              props.payload.name
            ]} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ right: -10 }}
            />
          </PieChart>
        </ChartCard>
      </div>

      {/* Sanitation Facilities Chart */}
      <div style={{ flex: '1 1 480px', minWidth: 380 }}>
        <ChartCard title="Sanitation Facilities" icon={<LocalHospital />} height={350}>
          <BarChart
            data={getToiletData(selectedCollege)}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => [`${value} facilities`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Facilities"
              radius={[0, 6, 6, 0]}
              barSize={40}
              label={{ 
                position: 'right', 
                formatter: (value) => `${value}`,
                fill: '#374151',
                fontSize: 11,
                fontWeight: 'bold'
              }}
            >
              {getToiletData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>
    </div>

    {/* Building Infrastructure Section */}
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Apartment sx={{ fontSize: 20, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Building Infrastructure
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Detailed overview of all campus buildings and facilities
              </Typography>
            </Box>
          </Box>
        }
        sx={{ pb: 1, pt: 2 }}
      />
      <CardContent>
        {renderBuildingInfrastructure(selectedCollege)}
      </CardContent>
    </Card>

    {/* Second Row: Room Distribution Chart */}
    <div style={{ marginBottom: 24 }}>
      <ChartCard title="Room Distribution Across Buildings" icon={<ViewQuilt />} height={400}>
        <BarChart
          data={getRoomDistribution(selectedCollege)}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="building" 
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 11 }}
          />
          <YAxis />
          <Tooltip />
          <Legend 
            wrapperStyle={{ 
              paddingTop: 15,
              paddingBottom: 15 
            }}
          />
          <Bar dataKey="classrooms" stackId="a" fill="#0088FE" name="Classrooms" />
          <Bar dataKey="labs" stackId="a" fill="#00C49F" name="Laboratories" />
          <Bar dataKey="library" stackId="a" fill="#FFBB28" name="Library" />
          <Bar dataKey="administrative" stackId="a" fill="#FF8042" name="Administrative" />
          <Bar dataKey="other" stackId="a" fill="#8884D8" name="Other" />
        </BarChart>
      </ChartCard>
    </div>

    {/* Technology Metrics */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 20, 
      marginBottom: 24 
    }}>
      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'success.50', 
        border: 'none',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Wifi sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" color="success.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.internetAvailability.available ? 'Available' : 'Not Available'}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Internet Connectivity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedCollege.educationalTechnology.internetAvailability.speed || 'Speed not specified'}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'info.50', 
        border: 'none',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <LibraryBooks sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
          <Typography variant="h4" color="info.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.libraryResources.physicalBooks?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Library Books
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Physical collection size
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'warning.50', 
        border: 'none',
        minWidth: 250
      }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Computer sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
          <Typography variant="h4" color="warning.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.computersAvailable?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Computers Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For student and staff use
          </Typography>
        </CardContent>
      </Card>
    </div>
  </Box>
)}

                  {/* All other tabs remain exactly the same */}
                  {/* Academic Tab - Unchanged */}
{tabValue === 1 && (
  <Box>
    {/* Header Section */}
    {/* <Card sx={{ 
      mb: 4, 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      borderRadius: 3
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <School sx={{ fontSize: 48, mr: 3 }} />
          <Box>
            <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
              Academic Programs
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9 }}>
              Comprehensive overview of academic offerings and student data
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card> */}

    {/* Summary Statistics */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 24, 
      marginBottom: 32 
    }}>
      {/* Total Faculties */}
      <Card sx={{ 
        flex: '1 1 1 1', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        // minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <School sx={{ fontSize: 24, mb: 2 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.academicPrograms.totalFaculties}
          </Typography>
          <Typography variant="h5" fontWeight="600">
            Total Faculties
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Academic departments
          </Typography>
        </CardContent>
      </Card>

      {/* Total Students */}
      <Card sx={{ 
        flex: '1 1 300px', 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
        color: 'white',
        minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <People sx={{ fontSize: 48, mb: 2 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.academicPrograms.enrollment.total?.toLocaleString()}
          </Typography>
          <Typography variant="h5" fontWeight="600">
            Total Students
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Current enrollment
          </Typography>
        </CardContent>
      </Card>

      {/* Programs Offered */}
      <Card sx={{ 
        flex: '1 1 300px', 
        background: 'black', 
        color: 'white',
        minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Business sx={{ fontSize: 24, mb: 2 }} />
          <Typography style={{fontSize:'20px'}} fontWeight="bold" gutterBottom>
            {selectedCollege.academicPrograms.programs.length}
          </Typography>
          <Typography variant="h5" fontWeight="600">
            Programs Offered
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Academic programs
          </Typography>
        </CardContent>
      </Card>

      {/* Student Distribution */}
      <Card sx={{ 
        flex: '1 1 300px', 
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
        color: 'white',
        minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Group sx={{ fontSize: 24, mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {selectedCollege.academicPrograms.enrollment.male?.toLocaleString()} / {selectedCollege.academicPrograms.enrollment.female?.toLocaleString()}
          </Typography>
          <Typography variant="h5" fontWeight="600">
            Male / Female
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Student ratio
          </Typography>
        </CardContent>
      </Card>
    </div>

    {/* First Row: Two Charts */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 24, 
      marginBottom: 32 
    }}>
      {/* Programs by Level - Enhanced */}
      <div style={{ flex: '1 1 500px', minWidth: 400 }}>
        <ChartCard title="Programs by Academic Level" icon={<TrendingUp />} height={400}>
          <BarChart
            data={getProgramLevelData(selectedCollege)}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} programs`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Programs"
              radius={[6, 6, 0, 0]}
              barSize={50}
              label={{ 
                position: 'top', 
                formatter: (value) => value,
                fill: '#374151',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              {getProgramLevelData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>

      {/* Student Enrollment Distribution - Enhanced */}
      <div style={{ flex: '1 1 500px', minWidth: 400 }}>
        <ChartCard title="Student Enrollment Distribution" icon={<People />} height={400}>
          <PieChart>
            <Pie
              data={getEnrollmentData(selectedCollege)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {getEnrollmentData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
            <Legend />
          </PieChart>
        </ChartCard>
      </div>
    </div>

    {/* Second Row: Two Charts */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 24, 
      marginBottom: 32 
    }}>
      {/* Student Progression - Enhanced */}
      <div style={{ flex: '1 1 500px', minWidth: 400 }}>
        <ChartCard title="Student Progression Trends" icon={<ShowChart />} height={400}>
          <ComposedChart
            data={getStudentProgressionData(selectedCollege)}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="enrolled" 
              name="Students Enrolled"
              fill="#8884d8"
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="graduated" 
              name="Students Graduated"
              stroke="#82ca9d" 
              strokeWidth={3}
              dot={{ fill: '#82ca9d', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="dropouts" 
              name="Student Dropouts"
              stroke="#ff8042" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#ff8042', strokeWidth: 2, r: 6 }}
            />
          </ComposedChart>
        </ChartCard>
      </div>

      {/* Programs by Faculty - Enhanced */}
      <div style={{ flex: '1 1 500px', minWidth: 400 }}>
        <ChartCard title="Programs by Faculty" icon={<Business />} height={400}>
          <BarChart
            data={getProgramFacultyData(selectedCollege)}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={110}
              tick={{ fontSize: 14 }}
            />
            <Tooltip formatter={(value) => [`${value} programs`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Programs"
              radius={[0, 6, 6, 0]}
              barSize={35}
              label={{ 
                position: 'right', 
                formatter: (value) => `${value}`,
                fill: '#374151',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              {getProgramFacultyData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>
    </div>

    {/* Program Details Table */}
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MenuBook sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography style={{fontSize:'20px'}} fontWeight="bold">
                Program Details
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Complete list of academic programs and offerings
              </Typography>
            </Box>
          </Box>
        }
        sx={{ pb: 1, pt: 3 }}
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.50' }}>
              <TableRow>
                <TableCell sx={{ py: 3 }}><Typography variant="h6" fontWeight="bold">Program Name</Typography></TableCell>
                <TableCell sx={{ py: 3 }}><Typography variant="h6" fontWeight="bold">Level</Typography></TableCell>
                <TableCell sx={{ py: 3 }}><Typography variant="h6" fontWeight="bold">Faculty</Typography></TableCell>
                <TableCell sx={{ py: 3 }}><Typography variant="h6" fontWeight="bold">Duration</Typography></TableCell>
                <TableCell sx={{ py: 3 }}><Typography variant="h6" fontWeight="bold">Type</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCollege.academicPrograms.programs.map((program, idx) => (
                <TableRow 
                  key={idx}
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'action.hover' 
                    } 
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body1" fontWeight="500">
                      {program.programName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip 
                      label={program.level} 
                      color="primary" 
                      variant="filled"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body1">
                      {program.faculty || 'General'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body1" fontWeight="500">
                      {program.duration || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip 
                      label={program.type || 'Regular'} 
                      color="secondary" 
                      variant="outlined"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>

    {/* Additional Academic Metrics */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 24 
    }}>
      <Card sx={{ 
        flex: '1 1 300px', 
        bgcolor: 'info.50', 
        border: 'none',
        minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <TrendingUp sx={{ fontSize: 56, color: 'info.main', mb: 3 }} />
          <Typography style={{fontSize:'20px'}} color="info.main" fontWeight="bold" gutterBottom>
            {Math.round((getStudentProgressionData(selectedCollege)[0]?.graduated / getStudentProgressionData(selectedCollege)[0]?.enrolled) * 100) || 0}%
          </Typography>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Graduation Rate
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Current academic year
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 300px', 
        bgcolor: 'success.50', 
        border: 'none',
        minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Group sx={{ fontSize: 56, color: 'success.main', mb: 3 }} />
          <Typography style={{fontSize:'20px'}} color="success.main" fontWeight="bold" gutterBottom>
            {getProgramLevelData(selectedCollege).length}
          </Typography>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Academic Levels
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Different program levels
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 300px', 
        bgcolor: 'warning.50', 
        border: 'none',
        minWidth: 280
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <School sx={{ fontSize: 56, color: 'warning.main', mb: 3 }} />
          <Typography variant="h4" color="warning.main" fontWeight="bold" gutterBottom>
            {getProgramFacultyData(selectedCollege).length}
          </Typography>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Faculties Represented
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Academic departments
          </Typography>
        </CardContent>
      </Card>
    </div>
  </Box>
)}

                  {/* Technology Tab - Unchanged */}
                  {/* {tabValue === 3 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <StatCard
                          icon={<Computer />}
                          title="Total Computers"
                          value={selectedCollege.educationalTechnology.computersAvailable}
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <StatCard
                          icon={<Business />}
                          title="Digital Classrooms"
                          value={selectedCollege.educationalTechnology.digitalClassrooms}
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <StatCard
                          icon={<School />}
                          title="Computer Labs"
                          value={selectedCollege.educationalTechnology.computerLabs}
                          color="success"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Technology Infrastructure" icon={<Storage />} height={300}>
                          <BarChart data={getTechnologyData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {getTechnologyData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Library Resources" icon={<LibraryBooks />} height={300}>
                          <BarChart data={getLibraryData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {getLibraryData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartCard>
                      </Grid>
                    </Grid>
                  )} */}

                  {tabValue === 3 && (
  <Box>
    {/* Header Section */}
    <Card sx={{ 
      mb: 4, 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      borderRadius: 3
    }}>
      {/* <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Computer sx={{ fontSize: 28, mr: 2 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Technology & Resources
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Digital infrastructure and educational resources
            </Typography>
          </Box>
        </Box>
      </CardContent> */}
    </Card>

    {/* Summary Statistics - 2 items per row */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 16, 
      marginBottom: 24 
    }}>
      {/* Total Computers */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <Computer sx={{ fontSize: 32, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.computersAvailable?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="subtitle1" fontWeight="600">
            Total Computers
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Available devices
          </Typography>
        </CardContent>
      </Card>

      {/* Digital Classrooms */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
        color: 'white',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <Business sx={{ fontSize: 32, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.digitalClassrooms}
          </Typography>
          <Typography variant="subtitle1" fontWeight="600">
            Digital Classrooms
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Smart teaching spaces
          </Typography>
        </CardContent>
      </Card>

      {/* Computer Labs */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'black', 
        color: 'white',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <School sx={{ fontSize: 32, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.computerLabs}
          </Typography>
          <Typography variant="subtitle1" fontWeight="600">
            Computer Labs
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Dedicated lab spaces
          </Typography>
        </CardContent>
      </Card>

      {/* Library Books */}
      <Card sx={{ 
        flex: '1 1 280px', 
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
        color: 'white',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <LibraryBooks sx={{ fontSize: 32, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.libraryResources.physicalBooks?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="subtitle1" fontWeight="600">
            Library Books
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Physical collection
          </Typography>
        </CardContent>
      </Card>
    </div>

    {/* First Row: Two Charts */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 16, 
      marginBottom: 24 
    }}>
      {/* Technology Infrastructure */}
      <div style={{ flex: '1 1 480px', minWidth: 360 }}>
        <ChartCard title="Technology Infrastructure" icon={<Storage />} height={320}>
          <BarChart
            data={getTechnologyData(selectedCollege)}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 11 }}
            />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} units`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Resources"
              radius={[4, 4, 0, 0]}
              barSize={32}
              label={{ 
                position: 'top', 
                formatter: (value) => value,
                fill: '#374151',
                fontSize: 10,
                fontWeight: 'bold'
              }}
            >
              {getTechnologyData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>

      {/* Library Resources */}
      <div style={{ flex: '1 1 480px', minWidth: 360 }}>
        <ChartCard title="Library Resources" icon={<LibraryBooks />} height={320}>
          <BarChart
            data={getLibraryData(selectedCollege)}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
            <Bar 
              dataKey="value" 
              name="Resources"
              radius={[4, 4, 0, 0]}
              barSize={32}
              label={{ 
                position: 'top', 
                formatter: (value) => value,
                fill: '#374151',
                fontSize: 10,
                fontWeight: 'bold'
              }}
            >
              {getLibraryData(selectedCollege).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>
    </div>

    {/* Additional Technology Metrics - 2 items per row */}
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 16 
    }}>
      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'success.50', 
        border: 'none',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <Wifi sx={{ fontSize: 36, color: 'success.main', mb: 1.5 }} />
          <Typography variant="h6" color="success.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.internetAvailability.available ? 'Available' : 'Not Available'}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            Internet Connectivity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedCollege.educationalTechnology.internetAvailability.speed || 'Speed not specified'}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'info.50', 
        border: 'none',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <Storage sx={{ fontSize: 36, color: 'info.main', mb: 1.5 }} />
          <Typography variant="h6" color="info.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.libraryResources.ebooks?.toLocaleString() || '0'}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            eBooks Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Digital collection
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'warning.50', 
        border: 'none',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <TrendingUp sx={{ fontSize: 36, color: 'warning.main', mb: 1.5 }} />
          <Typography variant="h6" color="warning.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.projectors || '0'}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            Projectors
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available units
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        flex: '1 1 280px', 
        bgcolor: 'primary.50', 
        border: 'none',
        minWidth: 240
      }}>
        <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
          <Computer sx={{ fontSize: 36, color: 'primary.main', mb: 1.5 }} />
          <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
            {selectedCollege.educationalTechnology.smartBoards || '0'}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            Smart Boards
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interactive displays
          </Typography>
        </CardContent>
      </Card>
    </div>
  </Box>
)}

                  {/* Staff Tab - Unchanged */}
                  {tabValue === 4 && (
                    <div>
                    <div style={{display:'flex',gap:20}}>
                      <div style={{flex:1,gap:20}}>
                        <ChartCard title="Staff Distribution" icon={<Group />} height={300}>
                          <PieChart>
                            <Pie
                              data={getStaffData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getStaffData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ChartCard>
                      </div>
                    

               <div style={{flex:1}}>
  <ChartCard title="Staff Distribution by Department" icon={<Group />} height={400}>
    <BarChart
      data={getStaffByDepartment(selectedCollege)}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      <XAxis type="number" />
      <YAxis 
        type="category" 
        dataKey="name" 
        width={90}
        tick={{ fontSize: 14 }}
      />
      <Tooltip formatter={(value) => [`${value} staff`, 'Count']} />
      <Bar 
        dataKey="value" 
        name="Staff Count"
        radius={[0, 8, 8, 0]}
        barSize={35}
      >
        {getStaffByDepartment(selectedCollege).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  </ChartCard>
</div>
                        </div>
                      

                      <div >
                        <ChartCard title="Academic Qualifications" icon={<WorkspacePremium />} height={300}>
                          <PieChart>
                            <Pie
                              data={getStaffQualificationData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getStaffQualificationData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ChartCard>
                      </div>

                    </div>
                  )}

                  {/* Analytics Tab - Unchanged */}
                  {tabValue === 6 && (
                    <div >
                      <div>
                        <ChartCard title="Financial Allocation vs Spending" icon={<Analytics />} height={350}>
                          <BarChart data={getFinancialData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Amount']} />
                            <Legend />
                            <Bar dataKey="budget" fill="#8884d8" radius={[4, 4, 0, 0]} name="Budget" />
                            <Bar dataKey="spent" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Spent" />
                          </BarChart>
                        </ChartCard>
                      </div>

               <Grid>
  <ChartCard title="Technology Resource Breakdown" icon={<Computer />} height={400}>
    <PieChart>
      <Pie
        data={getTechnologyData(selectedCollege)}
        cx="50%"
        cy="50%"
        labelLine={true}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={120}
        innerRadius={60}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={2}
      >
        {getTechnologyData(selectedCollege).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`${value} units`, 'Count']} />
      <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="right"
        wrapperStyle={{ right: -30 }}
      />
    </PieChart>
  </ChartCard>
</Grid>

                      <Grid item xs={12}>
                        <ChartCard title="Comprehensive Infrastructure Analysis" icon={<Schema />} height={400}>
                          <ComposedChart data={getRoomDistribution(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="building" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="classrooms" stackId="a" fill="#0088FE" name="Classrooms" />
                            <Bar dataKey="labs" stackId="a" fill="#00C49F" name="Labs" />
                            <Bar dataKey="library" stackId="a" fill="#FFBB28" name="Library" />
                            <Bar dataKey="administrative" stackId="a" fill="#FF8042" name="Admin" />
                            <Line type="monotone" dataKey="other" stroke="#ff7300" name="Other Rooms" strokeWidth={2} />
                          </ComposedChart>
                        </ChartCard>
                      </Grid>
                    </div>
                  )}

                  {/* Projects Tab - Unchanged */}
                  {/* {tabValue === 5 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Card>
                          <CardHeader
                            title="Priority Projects & Development Plans"
                            avatar={<Construction color="warning" />}
                          />
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Card sx={{ bgcolor: '#e3f2fd', border: 'none' }}>
                                  <CardContent>
                                    <Typography variant="subtitle1" color="primary" gutterBottom fontWeight="bold">
                                      <TrendingUp sx={{ mr: 1 }} />
                                      Priority 1 - Immediate Focus
                                    </Typography>
                                    <Typography>{selectedCollege.projectPlanning.priorityWork.p1}</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12}>
                                <Card sx={{ bgcolor: '#f3e5f5', border: 'none' }}>
                                  <CardContent>
                                    <Typography variant="subtitle1" color="secondary" gutterBottom fontWeight="bold">
                                      <TrendingUp sx={{ mr: 1 }} />
                                      Priority 2 - Medium Term
                                    </Typography>
                                    <Typography>{selectedCollege.projectPlanning.priorityWork.p2}</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12}>
                                <Card sx={{ bgcolor: '#e8f5e9', border: 'none' }}>
                                  <CardContent>
                                    <Typography variant="subtitle1" color="success.main" gutterBottom fontWeight="bold">
                                      <TrendingUp sx={{ mr: 1 }} />
                                      Priority 3 - Long Term
                                    </Typography>
                                    <Typography>{selectedCollege.projectPlanning.priorityWork.p3}</Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  )} */}

       {tabValue === 5 && (
  <div style={{ padding: '20px' }}>
    {/* Priority Projects & Construction Plans Row */}
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {/* Priority Projects */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <Card sx={{ height: '100%', boxShadow: 2 }}>
          <CardHeader
            title="Priority Projects & Development Plans"
            sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}
          />
          <CardContent sx={{ p: 3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Card sx={{ bgcolor: '#e3f2fd', border: 'none', p: 2 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom fontWeight="bold">
                  Priority 1 - Immediate Focus
                </Typography>
                <Typography variant="body1">
                  {selectedCollege.projectPlanning.priorityWork.p1}
                </Typography>
              </Card>
              
              <Card sx={{ bgcolor: '#f3e5f5', border: 'none', p: 2 }}>
                <Typography variant="subtitle1" color="secondary" gutterBottom fontWeight="bold">
                  Priority 2 - Medium Term
                </Typography>
                <Typography variant="body1">
                  {selectedCollege.projectPlanning.priorityWork.p2}
                </Typography>
              </Card>
              
              <Card sx={{ bgcolor: '#e8f5e9', border: 'none', p: 2 }}>
                <Typography variant="subtitle1" color="success.main" gutterBottom fontWeight="bold">
                  Priority 3 - Long Term
                </Typography>
                <Typography variant="body1">
                  {selectedCollege.projectPlanning.priorityWork.p3}
                </Typography>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Construction Plans */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <Card sx={{ height: '100%', boxShadow: 2 }}>
          <CardHeader
            title="Construction Plans"
            sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}
          />
          <CardContent sx={{ p: 3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Card variant="outlined" sx={{ p: 3, bgcolor: '#fafafa' }}>
                <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                  Immediate Construction
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {selectedCollege.projectPlanning.immediateConstruction || 'No immediate construction plans specified'}
                </Typography>
              </Card>
              
              <Card variant="outlined" sx={{ p: 3, bgcolor: '#fafafa' }}>
                <Typography variant="h6" color="secondary" gutterBottom fontWeight="bold">
                  Future Construction
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {selectedCollege.projectPlanning.futureConstruction || 'No future construction plans specified'}
                </Typography>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Project Statistics Row */}
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {/* Project Status Distribution */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <Card sx={{ boxShadow: 2, height: '100%' }}>
          <CardHeader
            title="Project Status Distribution"
            sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}
          />
          <CardContent sx={{ p: 3 }}>
            {selectedCollege.projectPlanning.ongoingProjects?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {['Planning', 'In Progress', 'Completed', 'On Hold'].map((status) => {
                  const count = selectedCollege.projectPlanning.ongoingProjects.filter(
                    project => project.status === status
                  ).length;
                  const percentage = (count / selectedCollege.projectPlanning.ongoingProjects.length) * 100;
                  
                  return (
                    <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: 
                            status === 'Planning' ? '#ff9800' :
                            status === 'In Progress' ? '#2196f3' :
                            status === 'Completed' ? '#4caf50' : '#f44336'
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 'medium' }}>
                        {status}
                      </Typography>
                      <div style={{ flex: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={percentage}
                          sx={{
                            height: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 
                                status === 'Planning' ? '#ff9800' :
                                status === 'In Progress' ? '#2196f3' :
                                status === 'Completed' ? '#4caf50' : '#f44336',
                              borderRadius: '5px'
                            }
                          }}
                        />
                      </div>
                      <Typography variant="body2" fontWeight="bold" sx={{ minWidth: '70px' }}>
                        {count} ({percentage.toFixed(1)}%)
                      </Typography>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                No projects available for analysis
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Distribution */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <Card sx={{ boxShadow: 2, height: '100%' }}>
          <CardHeader
            title="Budget Distribution"
            sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}
          />
          <CardContent sx={{ p: 3 }}>
            {selectedCollege.projectPlanning.ongoingProjects?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {selectedCollege.projectPlanning.ongoingProjects.map((project, index) => {
                  const totalBudget = selectedCollege.projectPlanning.ongoingProjects.reduce(
                    (sum, p) => sum + (parseInt(p.budget) || 0), 0
                  );
                  const percentage = totalBudget > 0 ? ((parseInt(project.budget) || 0) / totalBudget) * 100 : 0;
                  
                  return (
                    <div key={project._id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', maxWidth: '60%' }}>
                          {project.projectName}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          Rs. {parseInt(project.budget)?.toLocaleString() || 0}
                        </Typography>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage}
                        sx={{
                          height: '12px',
                          borderRadius: '6px',
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                            borderRadius: '6px'
                          }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        {percentage.toFixed(1)}% of total budget
                      </Typography>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                No budget data available
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Ongoing Projects with Attachments */}
    <Card sx={{ boxShadow: 2, mb: 3 }}>
      <CardHeader
        title="Ongoing Projects with Attachments"
        sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}
        action={
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
            {selectedCollege.projectPlanning.ongoingProjects?.filter(p => p.attachments).length || 0} projects with attachments
          </Typography>
        }
      />
      <CardContent sx={{ p: 3 }}>
        {selectedCollege.projectPlanning.ongoingProjects?.length > 0 ? (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {selectedCollege.projectPlanning.ongoingProjects.map((project) => (
              <div key={project._id} style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: '2px solid #e0e0e0',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-4px)',
                      borderColor: '#2196f3'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Project Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <Typography variant="h6" component="h3" sx={{ flex: 1, marginRight: '10px', fontWeight: 'bold' }}>
                        {project.projectName}
                      </Typography>
                      <Chip 
                        label={project.status} 
                        size="small"
                        sx={{
                          backgroundColor: 
                            project.status === 'Completed' ? '#4caf50' :
                            project.status === 'In Progress' ? '#2196f3' :
                            project.status === 'Planning' ? '#ff9800' : '#9e9e9e',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </div>

                    {/* Project Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="medium">Start Date:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {new Date(project.startDate).toLocaleDateString()}
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="medium">Expected Completion:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {new Date(project.expectedCompletion).toLocaleDateString()}
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="medium">Budget:</Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          Rs. {parseInt(project.budget)?.toLocaleString() || '0'}
                        </Typography>
                      </div>
                    </div>

                    {/* Attachment Section */}
                    {project.attachments && (
                      <div style={{ marginTop: '20px' }}>
                        <Typography variant="subtitle2" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                          Project Attachment
                        </Typography>
                        
                        {/* Media Preview */}
                        <div style={{ position: 'relative', marginBottom: '15px' }}>
                          {project.attachments.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) ? (
                            // Image attachment
                            <div>
                              <img
                                src={project.attachments}
                                alt={`Attachment for ${project.projectName}`}
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  borderRadius: '8px',
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                  border: '2px solid #e0e0e0'
                                }}
                                onClick={() => setSelectedMedia({ url: project.attachments, type: 'image', title: project.projectName })}
                              />
                            </div>
                          ) : project.attachments.match(/\.(mp4|avi|mov|wmv|flv|webm)$/i) ? (
                            // Video attachment
                            <div>
                              <video
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  borderRadius: '8px',
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                  border: '2px solid #e0e0e0'
                                }}
                                onClick={() => setSelectedMedia({ url: project.attachments, type: 'video', title: project.projectName })}
                              >
                                <source src={project.attachments} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          ) : (
                            // Document attachment
                            <Card variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                              <Typography variant="body2" gutterBottom sx={{ fontWeight: 'medium' }}>
                                Document Attachment
                              </Typography>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => window.open(project.attachments, '_blank')}
                                sx={{ mt: 1 }}
                              >
                                View Document
                              </Button>
                            </Card>
                          )}
                        </div>

                        {/* Download button */}
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = project.attachments;
                            link.download = `attachment_${project.projectName}`;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          sx={{ mt: 1 }}
                        >
                          Download Attachment
                        </Button>
                      </div>
                    )}

                    {!project.attachments && (
                      <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <Typography variant="body2" color="text.secondary">
                          No attachments available
                        </Typography>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Ongoing Projects
            </Typography>
            <Typography variant="body2" color="text.secondary">
              There are currently no ongoing projects for this college.
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>

    {/* Media Viewer Modal */}
    <Dialog
      open={!!selectedMedia}
      onClose={() => setSelectedMedia(null)}
      maxWidth="lg"
      fullWidth
      sx={{ '& .MuiDialog-paper': { bgcolor: 'transparent', boxShadow: 'none' } }}
    >
      {selectedMedia && (
        <div style={{ position: 'relative', backgroundColor: 'black', borderRadius: '8px' }}>
          <IconButton
            onClick={() => setSelectedMedia(null)}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(255,255,255,0.9)',
              zIndex: 1000,
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          >
            <Close />
          </IconButton>
          
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6" color="white" gutterBottom>
              {selectedMedia.title}
            </Typography>
            
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  borderRadius: '8px',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <video
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  borderRadius: '8px'
                }}
              >
                <source src={selectedMedia.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </Dialog>
  </div>
)}


                  {tabValue === 7 && (

                    <div>
                            {renderMapSection(selectedCollege)}
                    </div>
                
                  )}
                </Box>
              </DialogContent>

              <DialogActions sx={{ p: 2, bgcolor: '#f8fafc', position: 'sticky', bottom: 0 }}>
                <Button 
                  onClick={() => setDetailOpen(false)} 
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Close
                </Button>
                <Button 
                  startIcon={<PictureAsPdf />} 
                  variant="contained" 
                  onClick={exportToPDF}
                  sx={{ borderRadius: 2 }}
                >
                  Export PDF
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Media Modal */}
        <Modal
          open={mediaModalOpen}
          onClose={handleCloseMediaModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Box sx={{ 
            position: 'relative', 
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'hidden'
          }}>
            <IconButton
              onClick={handleCloseMediaModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                zIndex: 1,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
              }}
            >
              <Close />
            </IconButton>
            
            {selectedMedia && (
              mediaType === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.caption || 'Building image'}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              ) : (
                <video
                  controls
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    display: 'block'
                  }}
                >
                  <source src={selectedMedia.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            )}
            
            {selectedMedia?.caption && (
              <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}>
                <Typography variant="body2">
                  {selectedMedia.caption}
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default AdminForCollege;