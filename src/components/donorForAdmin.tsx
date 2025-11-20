import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Donater {
  _id?: string;
  donaterName: string;
  prizeName: string;
  prizeType: string;
  relatedDepart: string;
  contractDate: string;
  photo: string;
  contactNumber: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  prizeAmount:number;
}

      const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
      const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';

const API_URL = 'http://localhost:4000/api/donater';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpipulbgm/image/upload';
// const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

const AdminForDonater: React.FC = () => {
  const [donaters, setDonaters] = useState<Donater[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrizeType, setFilterPrizeType] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState<Donater>({
    donaterName: '',
    prizeName: '',
    prizeType: 'Other',
    relatedDepart: '',
    prizeAmount: 0,
    contractDate: '',
    photo: '',
    contactNumber: '',
    email: ''
  });

  // Memoized fetch functions
  const fetchDonaters = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy,
        sortOrder
      };
      
      if (searchTerm) params.search = searchTerm;
      if (filterPrizeType) params.prizeType = filterPrizeType;
      if (filterDepartment) params.relatedDepart = filterDepartment;

      const response = await axios.get(API_URL, { params });
      setDonaters(response.data.data || []);
    } catch (error) {
      console.error('Error fetching donaters:', error);
      alert('Failed to fetch donaters');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, filterPrizeType, filterDepartment, sortBy, sortOrder]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/stats/summary`);
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonaters();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchDonaters]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Cloudinary file upload function
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!selectedFile) {
      return formData.photo; // Return existing photo if no new file selected
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(selectedFile);
      return imageUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.donaterName.trim()) errors.donaterName = 'Donater name is required';
    if (!formData.prizeName.trim()) errors.prizeName = 'Prize name is required';
    if (!formData.relatedDepart.trim()) errors.relatedDepart = 'Related department is required';
    if (!formData.contractDate) errors.contractDate = 'Contract date is required';
    if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Upload image first if a new file is selected
      let photoUrl = formData.photo;
      if (selectedFile) {
        photoUrl = await handleImageUpload();
      }

      const submitData = {
        ...formData,
        photo: photoUrl
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, submitData);
        alert('Donater updated successfully!');
      } else {
        await axios.post(API_URL, submitData);
        alert('Donater created successfully!');
      }
      resetForm();
      fetchDonaters();
      fetchStats();
    } catch (error: any) {
      console.error('Error saving donater:', error);
      alert(error.response?.data?.message || 'Failed to save donater');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (donater: Donater) => {
    setFormData({
      donaterName: donater.donaterName,
      prizeName: donater.prizeName,
      prizeType: donater.prizeType,
      relatedDepart: donater.relatedDepart,
      contractDate: donater.contractDate.split('T')[0],
      photo: donater.photo,
      contactNumber: donater.contactNumber,
      email: donater.email
    });
    setImagePreview(donater.photo || '');
    setSelectedFile(null);
    setEditingId(donater._id!);
    setShowForm(true);
    setFormErrors({});
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this donater?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Donater deleted successfully!');
      fetchDonaters();
      fetchStats();
    } catch (error) {
      console.error('Error deleting donater:', error);
      alert('Failed to delete donater');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      donaterName: '',
      prizeName: '',
      prizeType: 'Other',
      relatedDepart: '',
      contractDate: '',
      photo: '',
      contactNumber: '',
      email: '',
      prizeAmount:0
    });
    setSelectedFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
    setFormErrors({});
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setSearchTerm('');
    setFilterPrizeType('');
    setFilterDepartment('');
    setCurrentPage(1);
  };

  const prizeTypes = ['Trophy', 'Medal', 'Certificate', 'Cash', 'Scholarship', 'Other'];

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      {/* <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '2.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🏆 Donater Management System
        </h1>
        <p style={{ color: '#718096', fontSize: '1.1rem' }}>Manage donaters and their contributions efficiently</p>
      </div> */}

      {/* Statistics Section */}
      {/* {stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            transition: 'transform 0.3s ease'
          }} className="stat-card">
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.totalDonaters}</h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', fontWeight: '500' }}>Total Donaters</p>
          </div>
          
          {stats.prizeTypeStats?.map((stat: any, index: number) => {
            const colors = [
              'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
            ];
            return (
              <div key={stat._id} style={{
                background: colors[index % colors.length],
                color: 'white',
                padding: '25px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }} className="stat-card">
                <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.count}</h3>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', fontWeight: '500' }}>{stat._id}</p>
              </div>
            );
          })}
        </div>
      )} */}

      {/* Control Panel */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
            <div style={{ position: 'relative', minWidth: '300px' }}>
              <input
                type="text"
                placeholder="Search by name, prize, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '14px 45px 14px 20px',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  width: '100%',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }}>🔍</span>
            </div>
            
            {/* <select
              value={filterPrizeType}
              onChange={(e) => setFilterPrizeType(e.target.value)}
              style={{
                padding: '14px 20px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '15px',
                background: '#f8fafc',
                minWidth: '180px',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="">All Prize Types</option>
              {prizeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select> */}

            {/* <input type='text'
                value={filterPrizeType}
              onChange={(e) => setFilterPrizeType(e.target.value)}
              style={{
                padding: '14px 20px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '15px',
                background: '#f8fafc',
                minWidth: '180px',
                transition: 'all 0.3s ease'
              }}
              placeholder='Filter Prize Type'
            >
            </input> */}

            <input
              type="text"
              placeholder="Filter by department..."
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              style={{
                padding: '14px 20px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '15px',
                background: '#f8fafc',
                minWidth: '200px',
                transition: 'all 0.3s ease'
              }}
            />

            <button
              type="submit"
              style={{
                padding: '14px 25px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🔍 Search
            </button>

            {/* <button
              type="button"
              onClick={handleFilterReset}
              style={{
                padding: '14px 25px',
                backgroundColor: '#718096',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Reset
            </button> */}
          </form>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '16px 32px',
              // background: showForm ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              background:'black',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {showForm ? '✕ Cancel' : '+ Add New Donater'}
          </button>
        </div>

        {/* Quick Actions */}
        {/* <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#4a5568', marginRight: '15px', fontSize: '14px' }}>Quick Filters:</span>
          {prizeTypes.map(type => (
            <button
              key={type}
              onClick={() => {
                setFilterPrizeType(type);
                setCurrentPage(1);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: filterPrizeType === type ? '#667eea' : '#edf2f7',
                color: filterPrizeType === type ? 'white' : '#4a5568',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (filterPrizeType !== type) {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (filterPrizeType !== type) {
                  e.currentTarget.style.backgroundColor = '#edf2f7';
                }
              }}
            >
              {type}
            </button>
          ))}
        </div> */}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ 
            color: '#2d3748', 
            marginBottom: '30px', 
            fontSize: '1.8rem', 
            borderBottom: '3px solid #667eea', 
            paddingBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ 
              // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundColor: 'black',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              {editingId ? '✏️' : '➕'}
            </span>
            {editingId ? 'Edit Donater' : 'Add New Donater'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              
              {/* Donater Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Donater Name *
                </label>
                <input
                  type="text"
                  name="donaterName"
                  value={formData.donaterName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.donaterName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter donater name"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.donaterName ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.donaterName && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.donaterName}
                  </span>
                )}
              </div>

              {/* Prize Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Prize Name *
                </label>
                <input
                  type="text"
                  name="prizeName"
                  value={formData.prizeName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.prizeName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter prize name"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.prizeName ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.prizeName && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.prizeName}
                  </span>
                )}
              </div>

              {/* Prize Type */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Prize Type *
                </label>
                     <input type='text'
                value={filterPrizeType}
              onChange={(e) => setFilterPrizeType(e.target.value)}
              style={{
                padding: '14px 20px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '15px',
                background: '#f8fafc',
                minWidth: '180px',
                transition: 'all 0.3s ease'
              }}
              placeholder=' Prize Type'
            >
            </input>
              </div>



              {/* Related Department */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Related Department *
                </label>
                <input
                  type="text"
                  name="relatedDepart"
                  value={formData.relatedDepart}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.relatedDepart ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter department name"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.relatedDepart ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.relatedDepart && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.relatedDepart}
                  </span>
                )}
              </div>

                <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Prize Amount
                </label>
                <input
                  type="number"
                  name="prizeAmount"
                  value={formData.prizeAmount}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.relatedDepart ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter Prize Amount"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.relatedDepart ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.prizeAmount && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.prizeAmount}
                  </span>
                )}
              </div>

              {/* Contract Date */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Contract Date *
                </label>
                <input
                  type="date"
                  name="contractDate"
                  value={formData.contractDate}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.contractDate ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.contractDate ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.contractDate && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.contractDate}
                  </span>
                )}
              </div>

              {/* Photo Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Donater Photo
                </label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{
                      border: '2px dashed #cbd5e0',
                      borderRadius: '10px',
                      padding: '30px',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.background = '#edf2f7';
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e0';
                      e.currentTarget.style.background = '#f8fafc';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        handleFileChange({ target: { files } } as any);
                      }
                    }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#a0aec0' }}>📷</div>
                      <p style={{ margin: '0 0 10px 0', color: '#4a5568', fontWeight: '600' }}>
                        {selectedFile ? 'File selected: ' + selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
                        PNG, JPG, GIF up to 5MB
                      </p>
                      {uploading && (
                        <div style={{ marginTop: '15px', color: '#667eea', fontWeight: '600' }}>
                          ⏳ Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Image Preview */}
                  {(imagePreview || formData.photo) && (
                    <div style={{ textAlign: 'center', minWidth: '200px' }}>
                      <p style={{ marginBottom: '10px', fontWeight: '600', color: '#4a5568' }}>Preview:</p>
                      <img 
                        src={imagePreview || formData.photo} 
                        alt="Preview" 
                        style={{ 
                          maxWidth: '200px',
                          maxHeight: '200px',
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.contactNumber ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter contact number"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.contactNumber ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.contactNumber && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.contactNumber}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.email ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter email address"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.email ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.email && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={loading || uploading}
                style={{
                  padding: '16px 40px',
                  background: loading || uploading ? '#a0aec0' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading || uploading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  minWidth: '180px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!loading && !uploading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && !uploading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? '⏳ Saving...' : uploading ? '📤 Uploading...' : editingId ? '💾 Update Donater' : '🚀 Create Donater'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '16px 40px',
                  backgroundColor: '#718096',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  minWidth: '180px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                🔄 Reset Form
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && !showForm && (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
          <div style={{ fontSize: '18px', color: '#4a5568', fontWeight: '600' }}>Loading donaters...</div>
        </div>
      )}

      {/* Donaters Grid */}
      {!loading && donaters.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
          {donaters.map((donater, index) => (
            <div
              key={donater._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
              }}
            >
              {/* Header with badge and prize type */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}>
                  #{index + 1 + (currentPage - 1) * itemsPerPage}
                </span>
                <span style={{
                  backgroundColor: '#f56565',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {donater.prizeType}
                </span>
              </div>

              {/* Photo */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={donater.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={donater.donaterName}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '2px solid #f7fafc'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>

              {/* Donater Name */}
              <h3 style={{ 
                color: '#2d3748', 
                marginBottom: '15px', 
                fontSize: '22px', 
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {donater.donaterName}
              </h3>

              {/* Details */}
              <div style={{ marginBottom: '25px', lineHeight: '1.8', color: '#4a5568' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏆 Prize:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.prizeName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏛️ Department:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.relatedDepart}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📅 Contract Date:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{new Date(donater.contractDate).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📞 Contact:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.contactNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ✉️ Email:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500', wordBreak: 'break-all', maxWidth: '60%' }}>{donater.email}</span>
                </div>
                {donater.createdAt && (
                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>
                      Created: {new Date(donater.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleEdit(donater)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                   Edit
                </button>
                <button
                  onClick={() => handleDelete(donater._id!)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && donaters.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: 'white',
          borderRadius: '15px',
          marginTop: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '6rem', marginBottom: '20px' }}>📊</div>
          <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.8rem', fontWeight: 'bold' }}>No donaters found</h3>
          <p style={{ color: '#718096', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px' }}>
            {searchTerm || filterPrizeType || filterDepartment 
              ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
              : 'Get started by adding your first donater to the system.'
            }
          </p>
          {(searchTerm || filterPrizeType || filterDepartment) ? (
            <button
              onClick={handleFilterReset}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🔄 Clear All Filters
            </button>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '14px 28px',
                // background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                background:'black',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              + Add Your First Donater
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {donaters.length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '20px', 
          marginTop: '50px',
          padding: '25px'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '14px 24px',
              backgroundColor: currentPage === 1 ? '#cbd5e0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            ⬅️ Previous
          </button>
          
          <span style={{ 
            color: '#2d3748', 
            fontWeight: 'bold',
            fontSize: '16px',
            background: '#f7fafc',
            padding: '12px 20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            Page {currentPage}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={donaters.length < itemsPerPage}
            style={{
              padding: '14px 24px',
              backgroundColor: donaters.length < itemsPerPage ? '#cbd5e0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: donaters.length < itemsPerPage ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (donaters.length >= itemsPerPage) {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (donaters.length >= itemsPerPage) {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminForDonater;