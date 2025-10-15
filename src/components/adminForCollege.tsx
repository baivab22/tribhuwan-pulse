// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   CircularProgress,
//   Alert,
//   Tabs,
//   Tab,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Divider,
//   TablePagination,
//   AppBar,
//   Toolbar,
//   InputAdornment,
//   CardHeader,
//   Avatar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   LinearProgress
// } from '@mui/material';
// import {
//   Visibility,
//   FilterList,
//   School,
//   People,
//   Business,
//   Computer,
//   ExpandMore,
//   Download,
//   PictureAsPdf,
//   Search,
//   LocationOn,
//   Email,
//   Phone,
//   CalendarToday,
//   AccountCircle,
//   Engineering,
//   LibraryBooks,
//   Wifi,
//   Construction,
//   TrendingUp,
//   CorporateFare,
//   Sanitizer,
//   Book,
//   Group,
//   Architecture,
//   Storage,
//   Cloud,
//   Security,
//   AdminPanelSettings,
//   AccountBalance,
//   Apartment,
//   LocalLibrary,
//   Science,
//   Sports,
//   Restaurant,
//   LocalHospital,
//   Water,
//   Recycling,
//   EmojiPeople,
//   WorkspacePremium,
//   Assessment,
//   BarChart as BarChartIcon,
//   PieChart as PieChartIcon,
//   LineAxis,
//   Radar as RadarIcon
// } from '@mui/icons-material';
// import {
//   PieChart,
//   Pie,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar
// } from 'recharts';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// // Create a custom theme with better fonts
// const theme = createTheme({
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h4: {
//       fontWeight: 700,
//       fontSize: '2rem',
//     },
//     h5: {
//       fontWeight: 600,
//     },
//     h6: {
//       fontWeight: 600,
//     },
//     subtitle1: {
//       fontWeight: 500,
//     },
//     button: {
//       fontWeight: 600,
//       textTransform: 'none'
//     }
//   },
//   palette: {
//     primary: {
//       main: '#2563eb',
//       light: '#60a5fa',
//       dark: '#1d4ed8'
//     },
//     secondary: {
//       main: '#7c3aed',
//       light: '#a78bfa',
//       dark: '#5b21b6'
//     },
//     success: {
//       main: '#059669',
//       light: '#34d399',
//       dark: '#047857'
//     },
//     warning: {
//       main: '#d97706',
//       light: '#fbbf24',
//       dark: '#b45309'
//     },
//     error: {
//       main: '#dc2626',
//       light: '#ef4444',
//       dark: '#b91c1c'
//     }
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
//           transition: 'all 0.3s ease-in-out',
//           '&:hover': {
//             boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
//           }
//         }
//       }
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           padding: '8px 16px',
//         }
//       }
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: 6,
//           fontWeight: 500
//         }
//       }
//     }
//   }
// });

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];
// const STATUS_COLORS = {
//   'Draft': '#f59e0b',
//   'Submitted': '#3b82f6',
//   'Under Review': '#8b5cf6',
//   'Approved': '#10b981',
//   'Rejected': '#ef4444'
// };

// const AdminForCollege = () => {
//   const [colleges, setColleges] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [filters, setFilters] = useState({
//     district: '',
//     province: '',
//     campusType: '',
//     formStatus: '',
//     search: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const chartRef = useRef();

//   useEffect(() => {
//     fetchColleges();
//   }, [page, rowsPerPage, filters]);

//   const fetchColleges = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const params = {
//         page: page + 1,
//         limit: rowsPerPage,
//         ...filters
//       };
//       const response = await axios.get('http://localhost:4000/api/collegeform', { params });
//       if (response.data.success) {
//         setColleges(response.data.data);
//         setTotalCount(response.data.pagination.totalForms);
//       }
//     } catch (err) {
//       setError('Failed to fetch colleges data');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCollegeDetails = async (id) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:4000/api/collegeform/${id}`);
//       if (response.data.success) {
//         setSelectedCollege(response.data.data);
//         setDetailOpen(true);
//         setTabValue(0);
//       }
//     } catch (err) {
//       setError('Failed to fetch college details');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPage(0);
//   };

//   const exportToPDF = () => {
//     if (!selectedCollege) return;

//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
    
//     // Add header
//     doc.setFillColor(37, 99, 235);
//     doc.rect(0, 0, pageWidth, 40, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(20);
//     doc.setFont('helvetica', 'bold');
//     doc.text(selectedCollege.collegeName, 20, 20);
//     doc.setFontSize(12);
//     doc.text(`${selectedCollege.campusType} • ${selectedCollege.location.district}, ${selectedCollege.location.province}`, 20, 30);

//     // Add content
//     doc.setTextColor(0, 0, 0);
//     let yPosition = 60;

//     // Basic Information
//     doc.setFontSize(16);
//     doc.setFont('helvetica', 'bold');
//     doc.text('Basic Information', 20, yPosition);
//     yPosition += 10;

//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'normal');
//     const basicInfo = [
//       [`Established:`, new Date(selectedCollege.establishmentDate).toLocaleDateString()],
//       [`College ID:`, selectedCollege.collegeId],
//       [`Principal:`, selectedCollege.principalInfo.name],
//       [`Contact:`, selectedCollege.principalInfo.contactNumber],
//       [`Email:`, selectedCollege.principalInfo.email],
//       [`Website:`, selectedCollege.contactInfo.website || 'N/A']
//     ];

//     basicInfo.forEach(([label, value]) => {
//       doc.text(`${label} ${value}`, 20, yPosition);
//       yPosition += 6;
//     });

//     yPosition += 10;

//     // Academic Summary
//     doc.setFontSize(16);
//     doc.setFont('helvetica', 'bold');
//     doc.text('Academic Summary', 20, yPosition);
//     yPosition += 10;

//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'normal');
//     const academicInfo = [
//       [`Total Faculties:`, selectedCollege.academicPrograms.totalFaculties],
//       [`Total Students:`, selectedCollege.academicPrograms.enrollment.total],
//       [`Programs Offered:`, selectedCollege.academicPrograms.programs.length],
//       [`Male Students:`, selectedCollege.academicPrograms.enrollment.male],
//       [`Female Students:`, selectedCollege.academicPrograms.enrollment.female],
//       [`Other Students:`, selectedCollege.academicPrograms.enrollment.other]
//     ];

//     academicInfo.forEach(([label, value]) => {
//       doc.text(`${label} ${value}`, 20, yPosition);
//       yPosition += 6;
//     });

//     // Add footer
//     doc.setFontSize(8);
//     doc.setTextColor(128, 128, 128);
//     doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, doc.internal.pageSize.getHeight() - 10);

//     doc.save(`${selectedCollege.collegeName}_Report.pdf`);
//   };

//   const exportToCSV = () => {
//     if (!selectedCollege) return;

//     const data = [
//       ['College Name', selectedCollege.collegeName],
//       ['Campus Type', selectedCollege.campusType],
//       ['District', selectedCollege.location.district],
//       ['Province', selectedCollege.location.province],
//       ['Established', new Date(selectedCollege.establishmentDate).toLocaleDateString()],
//       ['College ID', selectedCollege.collegeId],
//       ['Principal', selectedCollege.principalInfo.name],
//       ['Contact', selectedCollege.principalInfo.contactNumber],
//       ['Email', selectedCollege.principalInfo.email],
//       ['Total Students', selectedCollege.academicPrograms.enrollment.total],
//       ['Total Faculties', selectedCollege.academicPrograms.totalFaculties],
//       ['Programs Offered', selectedCollege.academicPrograms.programs.length],
//       ['Buildings', selectedCollege.infrastructure.buildings.length],
//       ['Total Staff', selectedCollege.staff.academic.length + selectedCollege.staff.administrative.length]
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'College Data');
//     XLSX.writeFile(workbook, `${selectedCollege.collegeName}_Data.xlsx`);
//   };

//   const getEnrollmentData = (college) => {
//     return [
//       { name: 'Male', value: college.academicPrograms.enrollment.male },
//       { name: 'Female', value: college.academicPrograms.enrollment.female },
//       { name: 'Other', value: college.academicPrograms.enrollment.other }
//     ].filter(item => item.value > 0);
//   };

//   const getStaffData = (college) => {
//     return [
//       { name: 'Academic', value: college.staff.academic.length },
//       { name: 'Administrative', value: college.staff.administrative.length }
//     ];
//   };

//   const getBuildingConditionData = (college) => {
//     const conditions = {};
//     college.infrastructure.buildings.forEach(building => {
//       conditions[building.condition] = (conditions[building.condition] || 0) + 1;
//     });
//     return Object.entries(conditions).map(([name, value]) => ({ name, value }));
//   };

//   const getTechnologyData = (college) => {
//     return [
//       { name: 'Digital Classrooms', value: college.educationalTechnology.digitalClassrooms },
//       { name: 'Computer Labs', value: college.educationalTechnology.computerLabs },
//       { name: 'Computers', value: college.educationalTechnology.computersAvailable }
//     ];
//   };

//   const getLibraryData = (college) => {
//     return [
//       { name: 'Physical Books', value: college.educationalTechnology.libraryResources.physicalBooks },
//       { name: 'eBooks', value: college.educationalTechnology.libraryResources.ebooks },
//       { name: 'Journals', value: college.educationalTechnology.libraryResources.journals }
//     ];
//   };

//   const getToiletData = (college) => {
//     return [
//       { name: 'Male', value: college.infrastructure.healthSanitation.toilets.male },
//       { name: 'Female', value: college.infrastructure.healthSanitation.toilets.female },
//       { name: 'Disabled Friendly', value: college.infrastructure.healthSanitation.toilets.disabledFriendly }
//     ];
//   };

//   const getProgramLevelData = (college) => {
//     const levels = {};
//     college.academicPrograms.programs.forEach(program => {
//       levels[program.level] = (levels[program.level] || 0) + 1;
//     });
//     return Object.entries(levels).map(([name, value]) => ({ name, value }));
//   };

//   const getRoomDistribution = (college) => {
//     const distribution = [];
//     college.infrastructure.buildings.forEach(building => {
//       distribution.push({
//         building: building.buildingName,
//         classrooms: building.classrooms || 0,
//         labs: building.labs || 0,
//         library: building.library || 0,
//         administrative: building.administrative || 0,
//         other: building.other || 0
//       });
//     });
//     return distribution;
//   };

//   const StatCard = ({ icon, title, value, color, subtitle }) => (
//     <Card sx={{ height: '100%' }}>
//       <CardContent>
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Box>
//             <Typography variant="h3" component="div" fontWeight="bold" color={color}>
//               {value}
//             </Typography>
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               {title}
//             </Typography>
//             {subtitle && (
//               <Typography variant="body2" color="text.secondary">
//                 {subtitle}
//               </Typography>
//             )}
//           </Box>
//           <Avatar sx={{ bgcolor: `${color}20`, width: 60, height: 60 }}>
//             {React.cloneElement(icon, { sx: { fontSize: 30, color } })}
//           </Avatar>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
//         <Card sx={{ mb: 3, borderRadius: 3 }}>
//           <CardContent>
//             <Typography variant="h4" gutterBottom color="primary" sx={{ 
//               mb: 3, 
//               display: 'flex', 
//               alignItems: 'center',
//               background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent'
//             }}>
//               <School sx={{ mr: 2, fontSize: 40 }} />
//               College Administration Dashboard
//             </Typography>

//             {error && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>
//                 {error}
//               </Alert>
//             )}
//           </CardContent>
//         </Card>

//         {/* Filters Section */}
//         <Card sx={{ mb: 3, borderRadius: 3 }}>
//           <CardContent>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
//                 <FilterList sx={{ mr: 1 }} />
//                 Filters & Search
//               </Typography>
//               <Button
//                 variant="outlined"
//                 startIcon={<FilterList />}
//                 onClick={() => setShowFilters(!showFilters)}
//                 sx={{ borderRadius: 2 }}
//               >
//                 {showFilters ? 'Hide' : 'Show'} Filters
//               </Button>
//             </Box>
            
//             {showFilters && (
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6} md={2.4}>
//                   <TextField
//                     fullWidth
//                     label="Search Colleges"
//                     size="small"
//                     value={filters.search}
//                     onChange={(e) => handleFilterChange('search', e.target.value)}
//                     placeholder="College name..."
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Search />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{ borderRadius: 2 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={2.4}>
//                   <TextField
//                     fullWidth
//                     label="Province"
//                     size="small"
//                     value={filters.province}
//                     onChange={(e) => handleFilterChange('province', e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOn />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={2.4}>
//                   <TextField
//                     fullWidth
//                     label="District"
//                     size="small"
//                     value={filters.district}
//                     onChange={(e) => handleFilterChange('district', e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOn />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={2.4}>
//                   <Select
//                     fullWidth
//                     size="small"
//                     value={filters.campusType}
//                     onChange={(e) => handleFilterChange('campusType', e.target.value)}
//                     displayEmpty
//                     startAdornment={
//                       <InputAdornment position="start">
//                         <CorporateFare />
//                       </InputAdornment>
//                     }
//                   >
//                     <MenuItem value="">All Campus Types</MenuItem>
//                     <MenuItem value="Community Campus">Community Campus</MenuItem>
//                     <MenuItem value="Constituent Campus">Constituent Campus</MenuItem>
//                   </Select>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={2.4}>
//                   <Select
//                     fullWidth
//                     size="small"
//                     value={filters.formStatus}
//                     onChange={(e) => handleFilterChange('formStatus', e.target.value)}
//                     displayEmpty
//                     startAdornment={
//                       <InputAdornment position="start">
//                         <Assessment />
//                       </InputAdornment>
//                     }
//                   >
//                     <MenuItem value="">All Status</MenuItem>
//                     <MenuItem value="Draft">Draft</MenuItem>
//                     <MenuItem value="Submitted">Submitted</MenuItem>
//                     <MenuItem value="Under Review">Under Review</MenuItem>
//                     <MenuItem value="Approved">Approved</MenuItem>
//                     <MenuItem value="Rejected">Rejected</MenuItem>
//                   </Select>
//                 </Grid>
//               </Grid>
//             )}
//           </CardContent>
//         </Card>

//         {/* Colleges Table */}
//         <Card sx={{ borderRadius: 3 }}>
//           <CardHeader
//             title={
//               <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Business sx={{ mr: 1 }} />
//                 Colleges List
//                 <Chip 
//                   label={`${totalCount} total`} 
//                   size="small" 
//                   color="primary" 
//                   variant="outlined"
//                   sx={{ ml: 2 }}
//                 />
//               </Typography>
//             }
//           />
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ bgcolor: '#f1f5f9' }}>
//                 <TableRow>
//                   <TableCell><strong>College Name</strong></TableCell>
//                   <TableCell><strong>Campus Type</strong></TableCell>
//                   <TableCell><strong>Location</strong></TableCell>
//                   <TableCell><strong>Principal</strong></TableCell>
//                   <TableCell><strong>Status</strong></TableCell>
//                   <TableCell><strong>Created</strong></TableCell>
//                   <TableCell align="center"><strong>Actions</strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                       <CircularProgress />
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                         Loading colleges...
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : colleges.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                       <School sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
//                       <Typography variant="h6" color="text.secondary">
//                         No colleges found
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Try adjusting your filters or search criteria
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   colleges.map((college) => (
//                     <TableRow key={college._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
//                             <School sx={{ fontSize: 18 }} />
//                           </Avatar>
//                           <Box>
//                             <Typography variant="subtitle2" fontWeight="600">
//                               {college.collegeName}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               ID: {college.collegeId}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={college.campusType} 
//                           size="small" 
//                           variant="outlined"
//                           color="primary"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
//                           <Box>
//                             <Typography variant="body2">{college.location.district}</Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {college.location.province}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <AccountCircle sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
//                           <Typography variant="body2">{college.principalInfo.name}</Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={college.formStatus}
//                           size="small"
//                           sx={{
//                             bgcolor: STATUS_COLORS[college.formStatus],
//                             color: 'white',
//                             fontWeight: 600
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
//                           <Typography variant="body2">
//                             {new Date(college.createdAt).toLocaleDateString()}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Button
//                           variant="contained"
//                           startIcon={<Visibility />}
//                           onClick={() => fetchCollegeDetails(college._id)}
//                           size="small"
//                           sx={{ borderRadius: 2 }}
//                         >
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             sx={{ borderTop: '1px solid', borderColor: 'divider' }}
//           />
//         </Card>

//         {/* Detail Dialog */}
//         <Dialog
//           open={detailOpen}
//           onClose={() => setDetailOpen(false)}
//           maxWidth="xl"
//           fullWidth
//           PaperProps={{
//             sx: { borderRadius: 3, minHeight: '80vh' }
//           }}
//         >
//           {selectedCollege && (
//             <>
//               <DialogTitle sx={{ 
//                 bgcolor: 'primary.main', 
//                 color: 'white',
//                 pb: 2
//               }}>
//                 <Box>
//                   <Typography variant="h4" fontWeight="bold" gutterBottom>
//                     {selectedCollege.collegeName}
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                     <Chip 
//                       label={selectedCollege.campusType} 
//                       variant="outlined" 
//                       sx={{ color: 'white', borderColor: 'white' }} 
//                     />
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <LocationOn sx={{ mr: 0.5 }} />
//                       <Typography>
//                         {selectedCollege.location.district}, {selectedCollege.location.province}
//                       </Typography>
//                     </Box>
//                     <Chip
//                       label={selectedCollege.formStatus}
//                       sx={{
//                         bgcolor: 'white',
//                         color: STATUS_COLORS[selectedCollege.formStatus]
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </DialogTitle>

//               <DialogContent dividers sx={{ p: 0 }}>
//                 <Box sx={{ p: 3 }}>
//                   {/* Export Buttons */}
//                   <Card sx={{ mb: 3, bgcolor: '#f8fafc' }}>
//                     <CardContent>
//                       <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                         <Button 
//                           startIcon={<PictureAsPdf />} 
//                           variant="contained" 
//                           onClick={exportToPDF}
//                           sx={{ borderRadius: 2 }}
//                         >
//                           Export PDF Report
//                         </Button>
//                         <Button 
//                           startIcon={<Download />} 
//                           variant="outlined" 
//                           onClick={exportToCSV}
//                           sx={{ borderRadius: 2 }}
//                         >
//                           Export Excel Data
//                         </Button>
//                       </Box>
//                     </CardContent>
//                   </Card>

//                   <Tabs 
//                     value={tabValue} 
//                     onChange={(e, v) => setTabValue(v)} 
//                     sx={{ 
//                       mb: 3,
//                       '& .MuiTab-root': { borderRadius: 2, mx: 0.5 }
//                     }}
//                     TabIndicatorProps={{
//                       sx: { height: 4, borderRadius: 2 }
//                     }}
//                   >
//                     <Tab icon={<Assessment />} iconPosition="start" label="Overview" />
//                     <Tab icon={<School />} iconPosition="start" label="Academic" />
//                     <Tab icon={<Apartment />} iconPosition="start" label="Infrastructure" />
//                     <Tab icon={<Computer />} iconPosition="start" label="Technology" />
//                     <Tab icon={<Group />} iconPosition="start" label="Staff" />
//                     <Tab icon={<Construction />} iconPosition="start" label="Projects" />
//                   </Tabs>

//                   {/* Overview Tab */}
//                   {tabValue === 0 && (
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={8}>
//                         <Card>
//                           <CardHeader
//                             title="College Information"
//                             avatar={<AccountCircle color="primary" />}
//                           />
//                           <CardContent>
//                             <Grid container spacing={3}>
//                               <Grid item xs={12} sm={6}>
//                                 <List dense>
//                                   <ListItem>
//                                     <ListItemIcon><CalendarToday color="primary" /></ListItemIcon>
//                                     <ListItemText 
//                                       primary="Established" 
//                                       secondary={new Date(selectedCollege.establishmentDate).toLocaleDateString()} 
//                                     />
//                                   </ListItem>
//                                   <ListItem>
//                                     <ListItemIcon><WorkspacePremium color="primary" /></ListItemIcon>
//                                     <ListItemText 
//                                       primary="College ID" 
//                                       secondary={selectedCollege.collegeId} 
//                                     />
//                                   </ListItem>
//                                   <ListItem>
//                                     <ListItemIcon><AccountCircle color="primary" /></ListItemIcon>
//                                     <ListItemText 
//                                       primary="Principal" 
//                                       secondary={selectedCollege.principalInfo.name} 
//                                     />
//                                   </ListItem>
//                                 </List>
//                               </Grid>
//                               <Grid item xs={12} sm={6}>
//                                 <List dense>
//                                   <ListItem>
//                                     <ListItemIcon><Phone color="primary" /></ListItemIcon>
//                                     <ListItemText 
//                                       primary="Contact" 
//                                       secondary={selectedCollege.principalInfo.contactNumber} 
//                                     />
//                                   </ListItem>
//                                   <ListItem>
//                                     <ListItemIcon><Email color="primary" /></ListItemIcon>
//                                     <ListItemText 
//                                       primary="Email" 
//                                       secondary={selectedCollege.principalInfo.email} 
//                                     />
//                                   </ListItem>
//                                   <ListItem>
//                                     <ListItemIcon><Business color="primary" /></ListItemIcon>
//                                     <ListItemText 
//                                       primary="Website" 
//                                       secondary={selectedCollege.contactInfo.website || 'N/A'} 
//                                     />
//                                   </ListItem>
//                                 </List>
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<People />}
//                           title="Total Students"
//                           value={selectedCollege.academicPrograms.enrollment.total}
//                           color="primary"
//                         />
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <Card>
//                           <CardHeader
//                             title="Student Enrollment"
//                             avatar={<PieChartIcon color="secondary" />}
//                           />
//                           <CardContent>
//                             <ResponsiveContainer width="100%" height={200}>
//                               <PieChart>
//                                 <Pie
//                                   data={getEnrollmentData(selectedCollege)}
//                                   cx="50%"
//                                   cy="50%"
//                                   labelLine={false}
//                                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                   outerRadius={70}
//                                   fill="#8884d8"
//                                   dataKey="value"
//                                 >
//                                   {getEnrollmentData(selectedCollege).map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                   ))}
//                                 </Pie>
//                                 <Tooltip />
//                               </PieChart>
//                             </ResponsiveContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <Card>
//                           <CardHeader
//                             title="Staff Distribution"
//                             avatar={<BarChartIcon color="success" />}
//                           />
//                           <CardContent>
//                             <ResponsiveContainer width="100%" height={200}>
//                               <BarChart data={getStaffData(selectedCollege)}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="name" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
//                               </BarChart>
//                             </ResponsiveContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <Card>
//                           <CardHeader
//                             title="Building Conditions"
//                             avatar={<Architecture color="warning" />}
//                           />
//                           <CardContent>
//                             <ResponsiveContainer width="100%" height={200}>
//                               <PieChart>
//                                 <Pie
//                                   data={getBuildingConditionData(selectedCollege)}
//                                   cx="50%"
//                                   cy="50%"
//                                   labelLine={false}
//                                   label={({ name, value }) => `${name}: ${value}`}
//                                   outerRadius={70}
//                                   fill="#8884d8"
//                                   dataKey="value"
//                                 >
//                                   {getBuildingConditionData(selectedCollege).map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                   ))}
//                                 </Pie>
//                                 <Tooltip />
//                               </PieChart>
//                             </ResponsiveContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     </Grid>
//                   )}

//                   {/* Academic Tab */}
//                   {tabValue === 1 && (
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<School />}
//                           title="Total Faculties"
//                           value={selectedCollege.academicPrograms.totalFaculties}
//                           color="primary"
//                         />
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<People />}
//                           title="Total Students"
//                           value={selectedCollege.academicPrograms.enrollment.total}
//                           color="secondary"
//                         />
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<Business />}
//                           title="Programs Offered"
//                           value={selectedCollege.academicPrograms.programs.length}
//                           color="success"
//                         />
//                       </Grid>

//                       {/* Rest of the academic tab content remains the same but with better styling */}
//                       {/* ... (previous academic tab content with enhanced styling) ... */}
//                     </Grid>
//                   )}

//                   {/* Other tabs follow similar enhanced patterns */}
//                   {/* Infrastructure Tab */}
//                   {tabValue === 2 && (
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={6}>
//                         <Card>
//                           <CardHeader
//                             title="Land & Infrastructure"
//                             avatar={<Architecture color="primary" />}
//                           />
//                           <CardContent>
//                             <Grid container spacing={3}>
//                               <Grid item xs={6}>
//                                 <Box textAlign="center">
//                                   <Typography variant="h4" color="primary" fontWeight="bold">
//                                     {selectedCollege.infrastructure.landArea.squareMeters || 'N/A'}
//                                   </Typography>
//                                   <Typography variant="body2" color="text.secondary">
//                                     Square Meters
//                                   </Typography>
//                                 </Box>
//                               </Grid>
//                               <Grid item xs={6}>
//                                 <Box textAlign="center">
//                                   <Typography variant="h4" color="secondary" fontWeight="bold">
//                                     {selectedCollege.infrastructure.buildings.length}
//                                   </Typography>
//                                   <Typography variant="body2" color="text.secondary">
//                                     Buildings
//                                   </Typography>
//                                 </Box>
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       <Grid item xs={12} md={6}>
//                         <Card>
//                           <CardHeader
//                             title="Health & Sanitation"
//                             avatar={<LocalHospital color="success" />}
//                           />
//                           <CardContent>
//                             <ResponsiveContainer width="100%" height={200}>
//                               <BarChart data={getToiletData(selectedCollege)}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="name" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="value" fill="#00C49F" radius={[4, 4, 0, 0]} />
//                               </BarChart>
//                             </ResponsiveContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       {/* Additional infrastructure content... */}
//                     </Grid>
//                   )}

//                   {/* Technology Tab */}
//                   {tabValue === 3 && (
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<Computer />}
//                           title="Total Computers"
//                           value={selectedCollege.educationalTechnology.computersAvailable}
//                           color="primary"
//                         />
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<Business />}
//                           title="Digital Classrooms"
//                           value={selectedCollege.educationalTechnology.digitalClassrooms}
//                           color="secondary"
//                         />
//                       </Grid>

//                       <Grid item xs={12} md={4}>
//                         <StatCard
//                           icon={<School />}
//                           title="Computer Labs"
//                           value={selectedCollege.educationalTechnology.computerLabs}
//                           color="success"
//                         />
//                       </Grid>

//                       {/* Additional technology content... */}
//                     </Grid>
//                   )}

//                   {/* Staff Tab */}
//                   {tabValue === 4 && (
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={6}>
//                         <Card>
//                           <CardHeader
//                             title="Staff Overview"
//                             avatar={<Group color="primary" />}
//                           />
//                           <CardContent>
//                             <ResponsiveContainer width="100%" height={250}>
//                               <PieChart>
//                                 <Pie
//                                   data={getStaffData(selectedCollege)}
//                                   cx="50%"
//                                   cy="50%"
//                                   labelLine={false}
//                                   label={({ name, value }) => `${name}: ${value}`}
//                                   outerRadius={80}
//                                   fill="#8884d8"
//                                   dataKey="value"
//                                 >
//                                   {getStaffData(selectedCollege).map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                   ))}
//                                 </Pie>
//                                 <Tooltip />
//                               </PieChart>
//                             </ResponsiveContainer>
//                             <Box sx={{ mt: 2, textAlign: 'center' }}>
//                               <Typography variant="h6" color="primary" fontWeight="bold">
//                                 Total Staff: {selectedCollege.staff.academic.length + selectedCollege.staff.administrative.length}
//                               </Typography>
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       {/* Additional staff content... */}
//                     </Grid>
//                   )}

//                   {/* Projects Tab */}
//                   {tabValue === 5 && (
//                     <Grid container spacing={3}>
//                       <Grid item xs={12}>
//                         <Card>
//                           <CardHeader
//                             title="Priority Projects"
//                             avatar={<Construction color="warning" />}
//                           />
//                           <CardContent>
//                             <Grid container spacing={2}>
//                               <Grid item xs={12}>
//                                 <Card sx={{ bgcolor: '#e3f2fd', border: 'none' }}>
//                                   <CardContent>
//                                     <Typography variant="subtitle1" color="primary" gutterBottom fontWeight="bold">
//                                       <TrendingUp sx={{ mr: 1 }} />
//                                       Priority 1
//                                     </Typography>
//                                     <Typography>{selectedCollege.projectPlanning.priorityWork.p1}</Typography>
//                                   </CardContent>
//                                 </Card>
//                               </Grid>
//                               <Grid item xs={12}>
//                                 <Card sx={{ bgcolor: '#f3e5f5', border: 'none' }}>
//                                   <CardContent>
//                                     <Typography variant="subtitle1" color="secondary" gutterBottom fontWeight="bold">
//                                       <TrendingUp sx={{ mr: 1 }} />
//                                       Priority 2
//                                     </Typography>
//                                     <Typography>{selectedCollege.projectPlanning.priorityWork.p2}</Typography>
//                                   </CardContent>
//                                 </Card>
//                               </Grid>
//                               <Grid item xs={12}>
//                                 <Card sx={{ bgcolor: '#e8f5e9', border: 'none' }}>
//                                   <CardContent>
//                                     <Typography variant="subtitle1" color="success.main" gutterBottom fontWeight="bold">
//                                       <TrendingUp sx={{ mr: 1 }} />
//                                       Priority 3
//                                     </Typography>
//                                     <Typography>{selectedCollege.projectPlanning.priorityWork.p3}</Typography>
//                                   </CardContent>
//                                 </Card>
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Grid>

//                       {/* Additional projects content... */}
//                     </Grid>
//                   )}
//                 </Box>
//               </DialogContent>

//               <DialogActions sx={{ p: 2, bgcolor: '#f8fafc' }}>
//                 <Button 
//                   onClick={() => setDetailOpen(false)} 
//                   variant="outlined"
//                   sx={{ borderRadius: 2 }}
//                 >
//                   Close
//                 </Button>
//               </DialogActions>
//             </>
//           )}
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminForCollege;

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
  LinearProgress
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
  ViewSidebar
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
  Area as RechartsArea
} from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

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
    h4: { fontWeight: 700, fontSize: '2rem' },
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

  // Enhanced Data Processing Functions
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
    // Mock progression data - in real app, this would come from API
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
    // Mock financial data
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

  // Enhanced Export Functions
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

  const StatCard = ({ icon, title, value, color, subtitle, trend }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1}>
            <Typography variant="h3" component="div" fontWeight="bold" color={color} gutterBottom>
              {value}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
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
          <Avatar sx={{ bgcolor: `${color}20`, width: 60, height: 60 }}>
            {React.cloneElement(icon, { sx: { fontSize: 30, color } })}
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

        {/* Filters Section */}
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

        {/* Colleges Table */}
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

        {/* Enhanced Detail Dialog */}
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
                  {/* Enhanced Export Buttons */}
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
                  </Tabs>

                  {/* Overview Tab - Enhanced with more charts */}
                  {tabValue === 0 && (
                    <Grid container spacing={3}>
                      {/* Key Metrics */}
                      <Grid item xs={12} md={3}>
                        <StatCard
                          icon={<People />}
                          title="Total Students"
                          value={selectedCollege.academicPrograms.enrollment.total}
                          color="primary"
                          subtitle="Current enrollment"
                          trend="+5.2%"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <StatCard
                          icon={<Group />}
                          title="Total Staff"
                          value={selectedCollege.staff.academic.length + selectedCollege.staff.administrative.length}
                          color="secondary"
                          subtitle="Teaching & Admin"
                          trend="+2.1%"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <StatCard
                          icon={<Business />}
                          title="Programs"
                          value={selectedCollege.academicPrograms.programs.length}
                          color="success"
                          subtitle="Academic programs"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <StatCard
                          icon={<Apartment />}
                          title="Buildings"
                          value={selectedCollege.infrastructure.buildings.length}
                          color="warning"
                          subtitle="Infrastructure"
                        />
                      </Grid>

                      {/* Main Charts */}
                      <Grid item xs={12} md={6}>
                        <ChartCard title="Student Enrollment Distribution" icon={<PieChartIcon />} height={300}>
                          <PieChart>
                            <Pie
                              data={getEnrollmentData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getEnrollmentData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [value, 'Students']} />
                            <Legend />
                          </PieChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Staff Composition" icon={<BarChartIcon />} height={300}>
                          <BarChart data={getStaffData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {getStaffData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Infrastructure Radar" icon={<RadarIcon />} height={300}>
                          <RadarChart data={getInfrastructureRadarData(selectedCollege)}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar name="College" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Tooltip />
                          </RadarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Programs by Faculty" icon={<DonutLarge />} height={300}>
                          <PieChart>
                            <Pie
                              data={getProgramFacultyData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getProgramFacultyData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ChartCard>
                      </Grid>
                    </Grid>
                  )}

                  {/* Academic Tab - Enhanced */}
                  {tabValue === 1 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <StatCard
                          icon={<School />}
                          title="Total Faculties"
                          value={selectedCollege.academicPrograms.totalFaculties}
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <StatCard
                          icon={<People />}
                          title="Total Students"
                          value={selectedCollege.academicPrograms.enrollment.total}
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <StatCard
                          icon={<Business />}
                          title="Programs Offered"
                          value={selectedCollege.academicPrograms.programs.length}
                          color="success"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Programs by Level" icon={<TrendingUp />} height={300}>
                          <BarChart data={getProgramLevelData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {getProgramLevelData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Student Progression" icon={<ShowChart />} height={300}>
                          <LineChart data={getStudentProgressionData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="enrolled" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="graduated" stroke="#82ca9d" strokeWidth={2} />
                            <Line type="monotone" dataKey="dropouts" stroke="#ff8042" strokeWidth={2} />
                          </LineChart>
                        </ChartCard>
                      </Grid>

                      {/* Program Details Table */}
                      <Grid item xs={12}>
                        <Card>
                          <CardHeader
                            title="Program Details"
                            avatar={<MenuBook color="primary" />}
                          />
                          <CardContent>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell><strong>Program Name</strong></TableCell>
                                    <TableCell><strong>Level</strong></TableCell>
                                    <TableCell><strong>Faculty</strong></TableCell>
                                    <TableCell><strong>Duration</strong></TableCell>
                                    <TableCell><strong>Type</strong></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {selectedCollege.academicPrograms.programs.map((program, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>{program.programName}</TableCell>
                                      <TableCell>
                                        <Chip label={program.level} size="small" color="primary" variant="outlined" />
                                      </TableCell>
                                      <TableCell>{program.faculty || 'General'}</TableCell>
                                      <TableCell>{program.duration || 'N/A'}</TableCell>
                                      <TableCell>
                                        <Chip 
                                          label={program.type || 'Regular'} 
                                          size="small" 
                                          color="secondary" 
                                          variant="outlined" 
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  )}

                  {/* Infrastructure Tab - Enhanced */}
                  {tabValue === 2 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardHeader
                            title="Land & Infrastructure"
                            avatar={<Architecture color="primary" />}
                          />
                          <CardContent>
                            <Grid container spacing={3}>
                              <Grid item xs={6}>
                                <Box textAlign="center">
                                  <Typography variant="h4" color="primary" fontWeight="bold">
                                    {selectedCollege.infrastructure.landArea.squareMeters || 'N/A'}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Square Meters
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box textAlign="center">
                                  <Typography variant="h4" color="secondary" fontWeight="bold">
                                    {selectedCollege.infrastructure.buildings.length}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Buildings
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Building Conditions" icon={<Apartment />} height={300}>
                          <PieChart>
                            <Pie
                              data={getBuildingConditionData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getBuildingConditionData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Room Distribution" icon={<ViewQuilt />} height={350}>
                          <BarChart data={getRoomDistribution(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="building" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="classrooms" stackId="a" fill="#0088FE" />
                            <Bar dataKey="labs" stackId="a" fill="#00C49F" />
                            <Bar dataKey="library" stackId="a" fill="#FFBB28" />
                            <Bar dataKey="administrative" stackId="a" fill="#FF8042" />
                            <Bar dataKey="other" stackId="a" fill="#8884D8" />
                          </BarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Sanitation Facilities" icon={<LocalHospital />} height={350}>
                          <BarChart data={getToiletData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {getToiletData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Sports Facilities" icon={<SportsSoccer />} height={300}>
                          <PieChart>
                            <Pie
                              data={getSportsFacilitiesData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${value > 0 ? name : ''}`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getSportsFacilitiesData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ChartCard>
                      </Grid>
                    </Grid>
                  )}

                  {/* Technology Tab - Enhanced */}
                  {tabValue === 3 && (
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
                  )}

                  {/* Staff Tab - Enhanced */}
                  {tabValue === 4 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
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
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Staff by Department" icon={<BusinessCenter />} height={300}>
                          <BarChart data={getStaffByDepartment(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {getStaffByDepartment(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
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
                      </Grid>
                    </Grid>
                  )}

                  {/* Analytics Tab - New Comprehensive Analytics */}
                  {tabValue === 6 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
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
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ChartCard title="Resource Utilization" icon={<TrendingUp />} height={350}>
                          <RadialBarChart 
                            innerRadius="10%" 
                            outerRadius="80%" 
                            data={getTechnologyData(selectedCollege).map(item => ({
                              ...item,
                              fill: COLORS[getTechnologyData(selectedCollege).indexOf(item)]
                            }))} 
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="value" />
                            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0 }} />
                            <Tooltip />
                          </RadialBarChart>
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
                    </Grid>
                  )}

                  {/* Projects Tab remains similar but enhanced */}
                  {tabValue === 5 && (
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
      </Box>
    </ThemeProvider>
  );
};

export default AdminForCollege;