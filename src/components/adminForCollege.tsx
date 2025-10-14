import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  BarChart as ChartIcon,
  Map as MapIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Business as BuildingIcon,
  Computer as ComputerIcon,
  TrendingUp as TrendingIcon,
  AccountBalance as FinanceIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Types
interface College {
  _id: string;
  collegeName: string;
  campusType: string;
  establishmentDate: string;
  location: {
    province: string;
    district: string;
    localLevel: string;
  };
  academicPrograms: {
    totalFaculties: number;
    programs: Array<{
      programName: string;
      level: string;
    }>;
    enrollment: {
      total: number;
      male: number;
      female: number;
      other: number;
    };
  };
  infrastructure: {
    landArea: {
      squareMeters: number;
    };
    buildings: Array<{
      buildingName: string;
      totalRooms: number;
      condition: string;
    }>;
  };
  formStatus: string;
}

interface CollegeDetails extends College {
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
  staff: {
    academic: Array<any>;
    administrative: Array<any>;
  };
  projectPlanning: {
    immediateConstruction: string;
    futureConstruction: string;
    priorityWork: {
      p1: string;
      p2: string;
      p3: string;
    };
    ongoingProjects: Array<any>;
  };
  educationalTechnology: {
    digitalClassrooms: number;
    computerLabs: number;
    computersAvailable: number;
    internetAvailability: {
      available: boolean;
      speed: string;
    };
    libraryResources: {
      physicalBooks: number;
      ebooks: number;
    };
  };
}

const AdminForCollege: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<CollegeDetails | null>(null);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({
    province: '',
    district: '',
    campusType: '',
    status: ''
  });
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const STATUS_COLORS: { [key: string]: string } = {
    'Draft': '#ff9800',
    'Submitted': '#2196f3',
    'Under Review': '#9c27b0',
    'Approved': '#4caf50',
    'Rejected': '#f44336'
  };

  // Fetch colleges data
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/college-forms');
      if (response.data.success) {
        setColleges(response.data.data);
        setFilteredColleges(response.data.data);
      }
    } catch (err: any) {
      setError('Failed to fetch colleges data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch college details
  const fetchCollegeDetails = async (collegeId: string) => {
    try {
      const response = await axios.get(`/api/college-forms/${collegeId}`);
      if (response.data.success) {
        setSelectedCollege(response.data.data);
        setDetailDialogOpen(true);
      }
    } catch (err: any) {
      setError('Failed to fetch college details');
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/college-forms/stats/overview');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch stats');
    }
  };

  useEffect(() => {
    fetchColleges();
    fetchStats();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = colleges;
    
    if (filters.province) {
      filtered = filtered.filter(college => 
        college.location.province.toLowerCase().includes(filters.province.toLowerCase())
      );
    }
    
    if (filters.district) {
      filtered = filtered.filter(college => 
        college.location.district.toLowerCase().includes(filters.district.toLowerCase())
      );
    }
    
    if (filters.campusType) {
      filtered = filtered.filter(college => college.campusType === filters.campusType);
    }
    
    if (filters.status) {
      filtered = filtered.filter(college => college.formStatus === filters.status);
    }
    
    setFilteredColleges(filtered);
  }, [filters, colleges]);

  // Chart data preparation
  const getEnrollmentData = (college: CollegeDetails) => {
    return [
      { name: 'Male', value: college.academicPrograms.enrollment.male },
      { name: 'Female', value: college.academicPrograms.enrollment.female },
      { name: 'Other', value: college.academicPrograms.enrollment.other }
    ];
  };

  const getProgramLevelData = (college: CollegeDetails) => {
    const levels: { [key: string]: number } = {};
    college.academicPrograms.programs.forEach(program => {
      levels[program.level] = (levels[program.level] || 0) + 1;
    });
    return Object.entries(levels).map(([name, value]) => ({ name, value }));
  };

  const getBuildingConditionData = (college: CollegeDetails) => {
    const conditions: { [key: string]: number } = {};
    college.infrastructure.buildings.forEach(building => {
      conditions[building.condition] = (conditions[building.condition] || 0) + 1;
    });
    return Object.entries(conditions).map(([name, value]) => ({ name, value }));
  };

  const getStaffDistributionData = (college: CollegeDetails) => {
    return [
      { name: 'Academic', value: college.staff.academic.length },
      { name: 'Administrative', value: college.staff.administrative.length }
    ];
  };

  const getTechnologyData = (college: CollegeDetails) => {
    return [
      { name: 'Digital Classrooms', value: college.educationalTechnology.digitalClassrooms },
      { name: 'Computer Labs', value: college.educationalTechnology.computerLabs },
      { name: 'Computers', value: college.educationalTechnology.computersAvailable }
    ];
  };

  // Download handlers
  const downloadPDF = (college: CollegeDetails) => {
    // Implement PDF download logic
    console.log('Downloading PDF for:', college.collegeName);
  };

  const downloadCSV = (college: CollegeDetails) => {
    // Implement CSV download logic
    console.log('Downloading CSV for:', college.collegeName);
  };

  // Statistics charts data
  const campusTypeData = stats?.byCampusType?.map((item: any) => ({
    name: item._id,
    count: item.count
  })) || [];

  const provinceData = stats?.byProvince?.map((item: any) => ({
    name: item._id,
    count: item.count
  })) || [];

  const statusData = stats?.byStatus?.map((item: any) => ({
    name: item._id,
    count: item.count
  })) || [];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        TU College Administration Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Overview Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {stats?.totalColleges || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Colleges
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="secondary">
                    {stats?.totalStudents || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <BuildingIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {colleges.reduce((acc, college) => acc + college.infrastructure.buildings.length, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Buildings
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {colleges.filter(c => c.formStatus === 'Approved').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Approved Colleges
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Statistics Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Colleges by Campus Type</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={campusTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {campusTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Colleges by Province</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={provinceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Form Status Distribution</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Province</InputLabel>
                <Select
                  value={filters.province}
                  label="Province"
                  onChange={(e) => setFilters(prev => ({ ...prev, province: e.target.value }))}
                >
                  <MenuItem value="">All</MenuItem>
                  {Array.from(new Set(colleges.map(c => c.location.province))).map(province => (
                    <MenuItem key={province} value={province}>{province}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>District</InputLabel>
                <Select
                  value={filters.district}
                  label="District"
                  onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                >
                  <MenuItem value="">All</MenuItem>
                  {Array.from(new Set(colleges.map(c => c.location.district))).map(district => (
                    <MenuItem key={district} value={district}>{district}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Campus Type</InputLabel>
                <Select
                  value={filters.campusType}
                  label="Campus Type"
                  onChange={(e) => setFilters(prev => ({ ...prev, campusType: e.target.value }))}
                >
                  <MenuItem value="">All</MenuItem>
                  {Array.from(new Set(colleges.map(c => c.campusType))).map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <MenuItem value="">All</MenuItem>
                  {Object.keys(STATUS_COLORS).map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Colleges Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Colleges ({filteredColleges.length})
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>College Name</TableCell>
                  <TableCell>Campus Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Programs</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Land Area (m²)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredColleges.map((college) => (
                  <TableRow key={college._id}>
                    <TableCell>
                      <Typography variant="subtitle2">{college.collegeName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Est: {new Date(college.establishmentDate).getFullYear()}
                      </Typography>
                    </TableCell>
                    <TableCell>{college.campusType}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{college.location.district}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {college.location.province}
                      </Typography>
                    </TableCell>
                    <TableCell>{college.academicPrograms.programs.length}</TableCell>
                    <TableCell>{college.academicPrograms.enrollment.total.toLocaleString()}</TableCell>
                    <TableCell>{college.infrastructure.landArea.squareMeters?.toLocaleString() || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={college.formStatus} 
                        size="small"
                        color={
                          college.formStatus === 'Approved' ? 'success' :
                          college.formStatus === 'Rejected' ? 'error' :
                          college.formStatus === 'Submitted' ? 'primary' :
                          'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => fetchCollegeDetails(college._id)}
                        color="primary"
                      >
                        <ViewIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* College Details Dialog */}
      <Dialog 
        open={detailDialogOpen} 
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">
            {selectedCollege?.collegeName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {selectedCollege?.campusType} • {selectedCollege?.location.district}, {selectedCollege?.location.province}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          {selectedCollege && (
            <Box>
              {/* Action Buttons */}
              <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
                <Button 
                  startIcon={<PdfIcon />} 
                  variant="outlined"
                  onClick={() => downloadPDF(selectedCollege)}
                >
                  Download PDF
                </Button>
                <Button 
                  startIcon={<CsvIcon />} 
                  variant="outlined"
                  onClick={() => downloadCSV(selectedCollege)}
                >
                  Download CSV
                </Button>
              </Box>

              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
                <Tab label="Overview" />
                <Tab label="Academic" />
                <Tab label="Infrastructure" />
                <Tab label="Staff & Technology" />
                <Tab label="Projects" />
              </Tabs>

              {/* Overview Tab */}
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Basic Information</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Established</Typography>
                            <Typography variant="body1">
                              {new Date(selectedCollege.establishmentDate).toLocaleDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Campus Type</Typography>
                            <Typography variant="body1">{selectedCollege.campusType}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Principal</Typography>
                            <Typography variant="body1">{selectedCollege.principalInfo.name}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Contact</Typography>
                            <Typography variant="body1">{selectedCollege.principalInfo.contactNumber}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Student Enrollment</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={getEnrollmentData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getEnrollmentData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Program Levels</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getProgramLevelData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Building Conditions</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={getBuildingConditionData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getBuildingConditionData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Academic Tab */}
              {tabValue === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Programs Offered</Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Program Name</TableCell>
                                <TableCell>Level</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedCollege.academicPrograms.programs.map((program, index) => (
                                <TableRow key={index}>
                                  <TableCell>{program.programName}</TableCell>
                                  <TableCell>
                                    <Chip label={program.level} size="small" variant="outlined" />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Enrollment Statistics</Typography>
                        <Box sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Total Students</Typography>
                              <Typography variant="h4" color="primary">
                                {selectedCollege.academicPrograms.enrollment.total.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Faculties</Typography>
                              <Typography variant="h4" color="secondary">
                                {selectedCollege.academicPrograms.totalFaculties}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" color="text.secondary">Male</Typography>
                              <Typography variant="h6">{selectedCollege.academicPrograms.enrollment.male.toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" color="text.secondary">Female</Typography>
                              <Typography variant="h6">{selectedCollege.academicPrograms.enrollment.female.toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" color="text.secondary">Other</Typography>
                              <Typography variant="h6">{selectedCollege.academicPrograms.enrollment.other.toLocaleString()}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Infrastructure Tab */}
              {tabValue === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Land & Buildings</Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Total Land Area</Typography>
                            <Typography variant="h6">
                              {selectedCollege.infrastructure.landArea.squareMeters?.toLocaleString() || 'N/A'} m²
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Total Buildings</Typography>
                            <Typography variant="h6">
                              {selectedCollege.infrastructure.buildings.length}
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="subtitle1" gutterBottom>Building Details</Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Building Name</TableCell>
                                <TableCell>Rooms</TableCell>
                                <TableCell>Condition</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedCollege.infrastructure.buildings.map((building, index) => (
                                <TableRow key={index}>
                                  <TableCell>{building.buildingName}</TableCell>
                                  <TableCell>{building.totalRooms}</TableCell>
                                  <TableCell>
                                    <Chip 
                                      label={building.condition} 
                                      size="small"
                                      color={
                                        building.condition === 'Excellent' ? 'success' :
                                        building.condition === 'Good' ? 'primary' :
                                        building.condition === 'Fair' ? 'warning' : 'error'
                                      }
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

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Technology Infrastructure</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getTechnologyData(selectedCollege)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                        
                        <Box sx={{ mt: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Internet</Typography>
                              <Chip 
                                label={selectedCollege.educationalTechnology.internetAvailability.available ? 'Available' : 'Not Available'} 
                                color={selectedCollege.educationalTechnology.internetAvailability.available ? 'success' : 'error'}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Speed</Typography>
                              <Typography variant="body1">
                                {selectedCollege.educationalTechnology.internetAvailability.speed || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Staff & Technology Tab */}
              {tabValue === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Staff Distribution</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={getStaffDistributionData(selectedCollege)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {getStaffDistributionData(selectedCollege).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        
                        <Box sx={{ mt: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Academic Staff</Typography>
                              <Typography variant="h6">{selectedCollege.staff.academic.length}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">Admin Staff</Typography>
                              <Typography variant="h6">{selectedCollege.staff.administrative.length}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Library Resources</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart
                            data={[
                              { name: 'Physical Books', value: selectedCollege.educationalTechnology.libraryResources.physicalBooks },
                              { name: 'eBooks', value: selectedCollege.educationalTechnology.libraryResources.ebooks }
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Projects Tab */}
              {tabValue === 4 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Priority Projects</Typography>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle1" color="primary">P1: {selectedCollege.projectPlanning.priorityWork.p1}</Typography>
                          <Typography variant="subtitle1" color="secondary">P2: {selectedCollege.projectPlanning.priorityWork.p2}</Typography>
                          <Typography variant="subtitle1" color="info.main">P3: {selectedCollege.projectPlanning.priorityWork.p3}</Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="subtitle1" gutterBottom>Construction Plans</Typography>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Immediate Construction</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{selectedCollege.projectPlanning.immediateConstruction}</Typography>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Future Construction</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{selectedCollege.projectPlanning.futureConstruction}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Ongoing Projects</Typography>
                        {selectedCollege.projectPlanning.ongoingProjects.length > 0 ? (
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Project Name</TableCell>
                                  <TableCell>Status</TableCell>
                                  <TableCell>Budget</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {selectedCollege.projectPlanning.ongoingProjects.map((project, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{project.projectName}</TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={project.status} 
                                        size="small"
                                        color={
                                          project.status === 'Completed' ? 'success' :
                                          project.status === 'In Progress' ? 'primary' :
                                          project.status === 'Planning' ? 'warning' : 'default'
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>Rs. {project.budget?.toLocaleString()}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        ) : (
                          <Typography color="text.secondary" sx={{ p: 2 }}>
                            No ongoing projects
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminForCollege;