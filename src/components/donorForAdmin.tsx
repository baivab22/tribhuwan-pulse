// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// interface Donater {
//   _id?: string;
//   donaterName: string;
//   prizeName: string;
//   prizeType: string;
//   relatedDepart: string;
//   contractDate: string;
//   photo: string;
//   contactNumber: string;
//   email: string;
//   createdAt?: string;
//   updatedAt?: string;
//   prizeAmount:number;
// }

//       const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
//       const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';

// const API_URL = 'http://202.70.90.11:81/api/donater';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpipulbgm/image/upload';
// // const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

// const AdminForDonater: React.FC = () => {
//   const [donaters, setDonaters] = useState<Donater[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPrizeType, setFilterPrizeType] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [stats, setStats] = useState<any>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');

//   const [formData, setFormData] = useState<Donater>({
//     donaterName: '',
//     prizeName: '',
//     prizeType: '',
//     relatedDepart: '',
//     prizeAmount: 0,
//     contractDate: '',
//     photo: '',
//     contactNumber: '',
//     email: ''
//   });

//   // Memoized fetch functions
//   const fetchDonaters = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params: any = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sortBy,
//         sortOrder
//       };
      
//       if (searchTerm) params.search = searchTerm;
//       if (filterPrizeType) params.prizeType = filterPrizeType;
//       if (filterDepartment) params.relatedDepart = filterDepartment;

//       const response = await axios.get(API_URL, { params });
//       setDonaters(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching donaters:', error);
//       alert('Failed to fetch donaters');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterPrizeType, filterDepartment, sortBy, sortOrder]);

//   const fetchStats = useCallback(async () => {
//     try {
//       const response = await axios.get(`${API_URL}/stats/summary`);
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchDonaters();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [fetchDonaters]);

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   // Cloudinary file upload function
//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
//     try {
//       const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         alert('Please select an image file');
//         return;
//       }

//       // Validate file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB');
//         return;
//       }

//       setSelectedFile(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async (): Promise<string> => {
//     if (!selectedFile) {
//       return formData.photo; // Return existing photo if no new file selected
//     }

//     setUploading(true);
//     try {
//       const imageUrl = await uploadToCloudinary(selectedFile);
//       return imageUrl;
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Failed to upload image. Please try again.');
//       throw error;
//     } finally {
//       setUploading(false);
//     }
//   };

//   const validateForm = (): boolean => {
//     const errors: {[key: string]: string} = {};
    
//     if (!formData.donaterName.trim()) errors.donaterName = 'Donater name is required';
//     if (!formData.prizeName.trim()) errors.prizeName = 'Prize name is required';
//     if (!formData.relatedDepart.trim()) errors.relatedDepart = 'Related department is required';
//     if (!formData.contractDate) errors.contractDate = 'Contract date is required';
//     if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
//     if (!formData.email.trim()) errors.email = 'Email is required';
    
//     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       errors.email = 'Please provide a valid email';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // Upload image first if a new file is selected
//       let photoUrl = formData.photo;
//       if (selectedFile) {
//         photoUrl = await handleImageUpload();
//       }

//       const submitData = {
//         ...formData,
//         photo: photoUrl
//       };

//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, submitData);
//         alert('Donater updated successfully!');
//       } else {
//         await axios.post(API_URL, submitData);
//         alert('Donater created successfully!');
//       }
//       resetForm();
//       fetchDonaters();
//       fetchStats();
//     } catch (error: any) {
//       console.error('Error saving donater:', error);
//       alert(error.response?.data?.message || 'Failed to save donater');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (donater: Donater) => {
//     setFormData({
//       donaterName: donater.donaterName,
//       prizeName: donater.prizeName,
//       prizeType: donater.prizeType,
//       relatedDepart: donater.relatedDepart,
//       contractDate: donater.contractDate.split('T')[0],
//       photo: donater.photo,
//       contactNumber: donater.contactNumber,
//       email: donater.email,
//       prizeAmount: donater.prizeAmount
//     });
//     setImagePreview(donater.photo || '');
//     setSelectedFile(null);
//     setEditingId(donater._id!);
//     setShowForm(true);
//     setFormErrors({});
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this donater?')) return;

//     setLoading(true);
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       alert('Donater deleted successfully!');
//       fetchDonaters();
//       fetchStats();
//     } catch (error) {
//       console.error('Error deleting donater:', error);
//       alert('Failed to delete donater');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       donaterName: '',
//       prizeName: '',
//       prizeType: '',
//       relatedDepart: '',
//       contractDate: '',
//       photo: '',
//       contactNumber: '',
//       email: '',
//       prizeAmount:0
//     });
//     setSelectedFile(null);
//     setImagePreview('');
//     setEditingId(null);
//     setShowForm(false);
//     setFormErrors({});
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handleFilterReset = () => {
//     setSearchTerm('');
//     setFilterPrizeType('');
//     setFilterDepartment('');
//     setCurrentPage(1);
//   };

//   // const prizeTypes = ['Trophy', 'Medal', 'Certificate', 'Cash', 'Scholarship', 'Other'];

//   return (
//     <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>
//       {/* Header */}
//       {/* <div style={{ textAlign: 'center', marginBottom: '40px' }}>
//         <h1 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '2.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//           🏆 Donater Management System
//         </h1>
//         <p style={{ color: '#718096', fontSize: '1.1rem' }}>Manage donaters and their contributions efficiently</p>
//       </div> */}

//       {/* Statistics Section */}
//       {/* {stats && (
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
//           gap: '20px', 
//           marginBottom: '40px' 
//         }}>
//           <div style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             padding: '25px',
//             borderRadius: '15px',
//             textAlign: 'center',
//             boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
//             transition: 'transform 0.3s ease'
//           }} className="stat-card">
//             <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.totalDonaters}</h3>
//             <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', fontWeight: '500' }}>Total Donaters</p>
//           </div>
          
//           {stats.prizeTypeStats?.map((stat: any, index: number) => {
//             const colors = [
//               'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//               'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//               'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//               'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//               'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
//             ];
//             return (
//               <div key={stat._id} style={{
//                 background: colors[index % colors.length],
//                 color: 'white',
//                 padding: '25px',
//                 borderRadius: '15px',
//                 textAlign: 'center',
//                 boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
//                 transition: 'transform 0.3s ease'
//               }} className="stat-card">
//                 <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.count}</h3>
//                 <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', fontWeight: '500' }}>{stat._id}</p>
//               </div>
//             );
//           })}
//         </div>
//       )} */}

//       {/* Control Panel */}
//       <div style={{
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         marginBottom: '30px',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//         border: '1px solid #e2e8f0'
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
//           <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
//             <div style={{ position: 'relative', minWidth: '300px' }}>
//               <input
//                 type="text"
//                 placeholder="Search by name, prize, or department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   padding: '14px 45px 14px 20px',
//                   borderRadius: '10px',
//                   border: '2px solid #e2e8f0',
//                   width: '100%',
//                   fontSize: '15px',
//                   transition: 'all 0.3s ease',
//                   background: '#f8fafc'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                 onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//               />
//               <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }}>🔍</span>
//             </div>
            
//             {/* <select
//               value={filterPrizeType}
//               onChange={(e) => setFilterPrizeType(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '180px',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               <option value="">All Prize Types</option>
//               {prizeTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select> */}

//             {/* <input type='text'
//                 value={filterPrizeType}
//               onChange={(e) => setFilterPrizeType(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '180px',
//                 transition: 'all 0.3s ease'
//               }}
//               placeholder='Filter Prize Type'
//             >
//             </input> */}

//             <input
//               type="text"
//               placeholder="Filter by department..."
//               value={filterDepartment}
//               onChange={(e) => setFilterDepartment(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '200px',
//                 transition: 'all 0.3s ease'
//               }}
//             />

//             <button
//               type="submit"
//               style={{
//                 padding: '14px 25px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '15px',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               🔍 Search
//             </button>

//             {/* <button
//               type="button"
//               onClick={handleFilterReset}
//               style={{
//                 padding: '14px 25px',
//                 backgroundColor: '#718096',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '15px',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               🔄 Reset
//             </button> */}
//           </form>

//           <button
//             onClick={() => setShowForm(!showForm)}
//             style={{
//               padding: '16px 32px',
//               // background: showForm ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//               background:'black',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               whiteSpace: 'nowrap',
//               transition: 'all 0.3s ease',
//               boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             {showForm ? '✕ Cancel' : '+ Add New Donater'}
//           </button>
//         </div>

//         {/* Quick Actions */}
//         {/* <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#4a5568', marginRight: '15px', fontSize: '14px' }}>Quick Filters:</span>
//           {prizeTypes.map(type => (
//             <button
//               key={type}
//               onClick={() => {
//                 setFilterPrizeType(type);
//                 setCurrentPage(1);
//               }}
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: filterPrizeType === type ? '#667eea' : '#edf2f7',
//                 color: filterPrizeType === type ? 'white' : '#4a5568',
//                 border: 'none',
//                 borderRadius: '25px',
//                 cursor: 'pointer',
//                 fontSize: '13px',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 if (filterPrizeType !== type) {
//                   e.currentTarget.style.backgroundColor = '#e2e8f0';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (filterPrizeType !== type) {
//                   e.currentTarget.style.backgroundColor = '#edf2f7';
//                 }
//               }}
//             >
//               {type}
//             </button>
//           ))}
//         </div> */}
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div style={{
//           backgroundColor: 'white',
//           padding: '40px',
//           borderRadius: '15px',
//           marginBottom: '30px',
//           boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//           border: '1px solid #e2e8f0'
//         }}>
//           <h2 style={{ 
//             color: '#2d3748', 
//             marginBottom: '30px', 
//             fontSize: '1.8rem', 
//             borderBottom: '3px solid #667eea', 
//             paddingBottom: '15px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px'
//           }}>
//             <span style={{ 
//               // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               backgroundColor: 'black',
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '1.2rem'
//             }}>
//               {editingId ? '✏️' : '➕'}
//             </span>
//             {editingId ? 'Edit Donater' : 'Add New Donater'}
//           </h2>
          
//           <form onSubmit={handleSubmit}>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              
//               {/* Donater Name */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donater Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="donaterName"
//                   value={formData.donaterName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donaterName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter donater name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donaterName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donaterName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donaterName}
//                   </span>
//                 )}
//               </div>

//               {/* Prize Name */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Prize Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="prizeName"
//                   value={formData.prizeName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.prizeName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter prize name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.prizeName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.prizeName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.prizeName}
//                   </span>
//                 )}
//               </div>

//               {/* Prize Type */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Prize Type *
//                 </label>
//                      <input type='text'
//                      name='prizeType'
//                 value={formData.prizeType}
//               onChange={ handleInputChange}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '180px',
//                 transition: 'all 0.3s ease'
//               }}
//               placeholder=' Prize Type'
//             >
//             </input>
//               </div>

//               {/* Related Department */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Related Department *
//                 </label>
//                 <input
//                   type="text"
//                   name="relatedDepart"
//                   value={formData.relatedDepart}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.relatedDepart ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter department name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.relatedDepart ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.relatedDepart && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.relatedDepart}
//                   </span>
//                 )}
//               </div>

//                 <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Prize Amount
//                 </label>
//                 <input
//                   type="number"
//                   name="prizeAmount"
//                   value={formData.prizeAmount}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.relatedDepart ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter Prize Amount"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.relatedDepart ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.prizeAmount && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.prizeAmount}
//                   </span>
//                 )}
//               </div>

//               {/* Contract Date */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Contract Date *
//                 </label>
//                 <input
//                   type="date"
//                   name="contractDate"
//                   value={formData.contractDate}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.contractDate ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.contractDate ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.contractDate && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.contractDate}
//                   </span>
//                 )}
//               </div>

//               {/* Photo Upload */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donater Photo
//                 </label>
//                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
//                   <div style={{ flex: 1, minWidth: '300px' }}>
//                     <div style={{
//                       border: '2px dashed #cbd5e0',
//                       borderRadius: '10px',
//                       padding: '30px',
//                       textAlign: 'center',
//                       transition: 'all 0.3s ease',
//                       background: '#f8fafc',
//                       cursor: 'pointer',
//                       position: 'relative'
//                     }}
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                       e.currentTarget.style.borderColor = '#667eea';
//                       e.currentTarget.style.background = '#edf2f7';
//                     }}
//                     onDragLeave={(e) => {
//                       e.currentTarget.style.borderColor = '#cbd5e0';
//                       e.currentTarget.style.background = '#f8fafc';
//                     }}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       const files = e.dataTransfer.files;
//                       if (files.length > 0) {
//                         handleFileChange({ target: { files } } as any);
//                       }
//                     }}
//                     >
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         style={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           opacity: 0,
//                           cursor: 'pointer'
//                         }}
//                       />
//                       <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#a0aec0' }}>📷</div>
//                       <p style={{ margin: '0 0 10px 0', color: '#4a5568', fontWeight: '600' }}>
//                         {selectedFile ? 'File selected: ' + selectedFile.name : 'Click to upload or drag and drop'}
//                       </p>
//                       <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
//                         PNG, JPG, GIF up to 5MB
//                       </p>
//                       {uploading && (
//                         <div style={{ marginTop: '15px', color: '#667eea', fontWeight: '600' }}>
//                           ⏳ Uploading...
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Image Preview */}
//                   {(imagePreview || formData.photo) && (
//                     <div style={{ textAlign: 'center', minWidth: '200px' }}>
//                       <p style={{ marginBottom: '10px', fontWeight: '600', color: '#4a5568' }}>Preview:</p>
//                       <img 
//                         src={imagePreview || formData.photo} 
//                         alt="Preview" 
//                         style={{ 
//                           maxWidth: '200px',
//                           maxHeight: '200px',
//                           borderRadius: '10px',
//                           border: '2px solid #e2e8f0',
//                           objectFit: 'cover'
//                         }}
//                         onError={(e) => {
//                           e.currentTarget.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Contact Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.contactNumber ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter contact number"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.contactNumber ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.contactNumber && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.contactNumber}
//                   </span>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.email ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter email address"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.email ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.email && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.email}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
//               <button
//                 type="submit"
//                 disabled={loading || uploading}
//                 style={{
//                   padding: '16px 40px',
//                   background: loading || uploading ? '#a0aec0' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '10px',
//                   cursor: loading || uploading ? 'not-allowed' : 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   minWidth: '180px',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!loading && !uploading) {
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!loading && !uploading) {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                   }
//                 }}
//               >
//                 {loading ? '⏳ Saving...' : uploading ? '📤 Uploading...' : editingId ? '💾 Update Donater' : '🚀 Create Donater'}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 style={{
//                   padding: '16px 40px',
//                   backgroundColor: '#718096',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '10px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   minWidth: '180px',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//               >
//                 🔄 Reset Form
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && !showForm && (
//         <div style={{ textAlign: 'center', padding: '60px' }}>
//           <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
//           <div style={{ fontSize: '18px', color: '#4a5568', fontWeight: '600' }}>Loading donaters...</div>
//         </div>
//       )}

//       {/* Donaters Grid */}
//       {!loading && donaters.length > 0 && (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
//           {donaters.map((donater, index) => (
//             <div
//               key={donater._id}
//               style={{
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 padding: '25px',
//                 boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
//                 transition: 'all 0.3s ease',
//                 border: '1px solid #e2e8f0',
//                 position: 'relative',
//                 overflow: 'hidden'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-8px)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
//               }}
//             >
//               {/* Header with badge and prize type */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                 <span style={{
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold',
//                   boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//                 }}>
//                   #{index + 1 + (currentPage - 1) * itemsPerPage}
//                 </span>
//                 <span style={{
//                   backgroundColor: '#f56565',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold'
//                 }}>
//                   {donater.prizeType}
//                 </span>
//               </div>

//               {/* Photo */}
//               <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <img
//                   src={donater.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
//                   alt={donater.donaterName}
//                   style={{
//                     width: '100%',
//                     height: '220px',
//                     objectFit: 'cover',
//                     borderRadius: '12px',
//                     border: '2px solid #f7fafc'
//                   }}
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                   }}
//                 />
//               </div>

//               {/* Donater Name */}
//               <h3 style={{ 
//                 color: '#2d3748', 
//                 marginBottom: '15px', 
//                 fontSize: '22px', 
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}>
//                 {donater.donaterName}
//               </h3>

//               {/* Details */}
//               <div style={{ marginBottom: '25px', lineHeight: '1.8', color: '#4a5568' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     🏆 Prize:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.prizeName}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     🏛️ Department:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.relatedDepart}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     📅 Contract Date:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{new Date(donater.contractDate).toLocaleDateString()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     📞 Contact:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.contactNumber}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     ✉️ Email:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500', wordBreak: 'break-all', maxWidth: '60%' }}>{donater.email}</span>
//                 </div>
//                 {donater.createdAt && (
//                   <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
//                     <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>
//                       Created: {new Date(donater.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <button
//                   onClick={() => handleEdit(donater)}
//                   style={{
//                     flex: 1,
//                     padding: '14px',
//                     background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                 >
//                    Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(donater._id!)}
//                   style={{
//                     flex: 1,
//                     padding: '14px',
//                     background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                 >
//                  Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && donaters.length === 0 && (
//         <div style={{
//           textAlign: 'center',
//           padding: '80px 20px',
//           backgroundColor: 'white',
//           borderRadius: '15px',
//           marginTop: '20px',
//           boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
//           border: '1px solid #e2e8f0'
//         }}>
//           <div style={{ fontSize: '6rem', marginBottom: '20px' }}>📊</div>
//           <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.8rem', fontWeight: 'bold' }}>No donaters found</h3>
//           <p style={{ color: '#718096', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px' }}>
//             {searchTerm || filterPrizeType || filterDepartment 
//               ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
//               : 'Get started by adding your first donater to the system.'
//             }
//           </p>
//           {(searchTerm || filterPrizeType || filterDepartment) ? (
//             <button
//               onClick={handleFilterReset}
//               style={{
//                 padding: '14px 28px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               🔄 Clear All Filters
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowForm(true)}
//               style={{
//                 padding: '14px 28px',
//                 // background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                 background:'black',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               + Add Your First Donater
//             </button>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
//       {donaters.length > 0 && (
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           gap: '20px', 
//           marginTop: '50px',
//           padding: '25px'
//         }}>
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             style={{
//               padding: '14px 24px',
//               backgroundColor: currentPage === 1 ? '#cbd5e0' : '#667eea',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (currentPage !== 1) {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (currentPage !== 1) {
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             ⬅️ Previous
//           </button>
          
//           <span style={{ 
//             color: '#2d3748', 
//             fontWeight: 'bold',
//             fontSize: '16px',
//             background: '#f7fafc',
//             padding: '12px 20px',
//             borderRadius: '8px',
//             border: '1px solid #e2e8f0'
//           }}>
//             Page {currentPage}
//           </span>
          
//           <button
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             disabled={donaters.length < itemsPerPage}
//             style={{
//               padding: '14px 24px',
//               backgroundColor: donaters.length < itemsPerPage ? '#cbd5e0' : '#667eea',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: donaters.length < itemsPerPage ? 'not-allowed' : 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (donaters.length >= itemsPerPage) {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (donaters.length >= itemsPerPage) {
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             Next ➡️
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminForDonater;

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// interface Donater {
//   _id?: string;
//   donaterName: string;
//   prizeName: string;
//   prizeType: string;
//   relatedDepart: string;
//   contractDate: string;
//   photo: string;
//   contactNumber: string;
//   email: string;
//   createdAt?: string;
//   updatedAt?: string;
//   prizeAmount: number;
//   // New fields from screenshot
//   fundOfficialName: string;
//   donorName: string;
//   donorContactNumber: string;
//   donorEmail: string;
//   personInCareOf: string;
//   reportingContactNumber: string;
//   reportingAddress: string;
//   fundingPlan: string;
//   natureOfEndowment: string;
//   amountOfEndowment: number;
//   termsOfEndowmentFund: string;
//   typesOfEndowmentPlan: string;
//   installmentsOfEndowment: string;
//   purposeOfUsingEndowmentReturns: string;
//   principalAmountOfEndowment: number;
//   agreementDate: string;
// }

// const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
// const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';

// const API_URL = 'http://202.70.90.11:81/api/donater';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpipulbgm/image/upload';

// const AdminForDonater: React.FC = () => {
//   const [donaters, setDonaters] = useState<Donater[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPrizeType, setFilterPrizeType] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [stats, setStats] = useState<any>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');

//   const [formData, setFormData] = useState<Donater>({
//     donaterName: '',
//     prizeName: '',
//     prizeType: '',
//     relatedDepart: '',
//     prizeAmount: 0,
//     contractDate: '',
//     photo: '',
//     contactNumber: '',
//     email: '',
//     // New fields initialization
//     fundOfficialName: '',
//     donorName: '',
//     donorContactNumber: '',
//     donorEmail: '',
//     personInCareOf: '',
//     reportingContactNumber: '',
//     reportingAddress: '',
//     fundingPlan: '',
//     natureOfEndowment: '',
//     amountOfEndowment: 0,
//     termsOfEndowmentFund: '',
//     typesOfEndowmentPlan: '',
//     installmentsOfEndowment: '',
//     purposeOfUsingEndowmentReturns: '',
//     principalAmountOfEndowment: 0,
//     agreementDate: ''
//   });

//   // Memoized fetch functions - UNCHANGED
//   const fetchDonaters = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params: any = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sortBy,
//         sortOrder
//       };
      
//       if (searchTerm) params.search = searchTerm;
//       if (filterPrizeType) params.prizeType = filterPrizeType;
//       if (filterDepartment) params.relatedDepart = filterDepartment;

//       const response = await axios.get(API_URL, { params });
//       setDonaters(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching donaters:', error);
//       alert('Failed to fetch donaters');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterPrizeType, filterDepartment, sortBy, sortOrder]);

//   const fetchStats = useCallback(async () => {
//     try {
//       const response = await axios.get(`${API_URL}/stats/summary`);
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   }, []);

//   // Debounced search - UNCHANGED
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchDonaters();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [fetchDonaters]);

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   // Cloudinary file upload function - UNCHANGED
//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
//     try {
//       const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Please select an image file');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB');
//         return;
//       }

//       setSelectedFile(file);
      
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async (): Promise<string> => {
//     if (!selectedFile) {
//       return formData.photo;
//     }

//     setUploading(true);
//     try {
//       const imageUrl = await uploadToCloudinary(selectedFile);
//       return imageUrl;
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Failed to upload image. Please try again.');
//       throw error;
//     } finally {
//       setUploading(false);
//     }
//   };

//   const validateForm = (): boolean => {
//     const errors: {[key: string]: string} = {};
    
//     // Original validations - UNCHANGED
//     if (!formData.donaterName.trim()) errors.donaterName = 'Donater name is required';
//     if (!formData.prizeName.trim()) errors.prizeName = 'Prize name is required';
//     if (!formData.relatedDepart.trim()) errors.relatedDepart = 'Related department is required';
//     if (!formData.contractDate) errors.contractDate = 'Contract date is required';
//     if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
//     if (!formData.email.trim()) errors.email = 'Email is required';
    
//     // New field validations
//     if (!formData.fundOfficialName.trim()) errors.fundOfficialName = 'Fund official name is required';
//     if (!formData.donorName.trim()) errors.donorName = 'Donor name is required';
//     if (!formData.agreementDate) errors.agreementDate = 'Agreement date is required';

//     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       errors.email = 'Please provide a valid email';
//     }
//     if (formData.donorEmail && !emailRegex.test(formData.donorEmail)) {
//       errors.donorEmail = 'Please provide a valid donor email';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       let photoUrl = formData.photo;
//       if (selectedFile) {
//         photoUrl = await handleImageUpload();
//       }

//       const submitData = {
//         ...formData,
//         photo: photoUrl
//       };

//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, submitData);
//         alert('Donater updated successfully!');
//       } else {
//         await axios.post(API_URL, submitData);
//         alert('Donater created successfully!');
//       }
//       resetForm();
//       fetchDonaters();
//       fetchStats();
//     } catch (error: any) {
//       console.error('Error saving donater:', error);
//       alert(error.response?.data?.message || 'Failed to save donater');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (donater: Donater) => {
//     setFormData({
//       donaterName: donater.donaterName,
//       prizeName: donater.prizeName,
//       prizeType: donater.prizeType,
//       relatedDepart: donater.relatedDepart,
//       contractDate: donater.contractDate.split('T')[0],
//       photo: donater.photo,
//       contactNumber: donater.contactNumber,
//       email: donater.email,
//       prizeAmount: donater.prizeAmount,
//       // New fields
//       fundOfficialName: donater.fundOfficialName || '',
//       donorName: donater.donorName || '',
//       donorContactNumber: donater.donorContactNumber || '',
//       donorEmail: donater.donorEmail || '',
//       personInCareOf: donater.personInCareOf || '',
//       reportingContactNumber: donater.reportingContactNumber || '',
//       reportingAddress: donater.reportingAddress || '',
//       fundingPlan: donater.fundingPlan || '',
//       natureOfEndowment: donater.natureOfEndowment || '',
//       amountOfEndowment: donater.amountOfEndowment || 0,
//       termsOfEndowmentFund: donater.termsOfEndowmentFund || '',
//       typesOfEndowmentPlan: donater.typesOfEndowmentPlan || '',
//       installmentsOfEndowment: donater.installmentsOfEndowment || '',
//       purposeOfUsingEndowmentReturns: donater.purposeOfUsingEndowmentReturns || '',
//       principalAmountOfEndowment: donater.principalAmountOfEndowment || 0,
//       agreementDate: donater.agreementDate || ''
//     });
//     setImagePreview(donater.photo || '');
//     setSelectedFile(null);
//     setEditingId(donater._id!);
//     setShowForm(true);
//     setFormErrors({});
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this donater?')) return;

//     setLoading(true);
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       alert('Donater deleted successfully!');
//       fetchDonaters();
//       fetchStats();
//     } catch (error) {
//       console.error('Error deleting donater:', error);
//       alert('Failed to delete donater');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       donaterName: '',
//       prizeName: '',
//       prizeType: '',
//       relatedDepart: '',
//       contractDate: '',
//       photo: '',
//       contactNumber: '',
//       email: '',
//       prizeAmount: 0,
//       // New fields
//       fundOfficialName: '',
//       donorName: '',
//       donorContactNumber: '',
//       donorEmail: '',
//       personInCareOf: '',
//       reportingContactNumber: '',
//       reportingAddress: '',
//       fundingPlan: '',
//       natureOfEndowment: '',
//       amountOfEndowment: 0,
//       termsOfEndowmentFund: '',
//       typesOfEndowmentPlan: '',
//       installmentsOfEndowment: '',
//       purposeOfUsingEndowmentReturns: '',
//       principalAmountOfEndowment: 0,
//       agreementDate: ''
//     });
//     setSelectedFile(null);
//     setImagePreview('');
//     setEditingId(null);
//     setShowForm(false);
//     setFormErrors({});
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handleFilterReset = () => {
//     setSearchTerm('');
//     setFilterPrizeType('');
//     setFilterDepartment('');
//     setCurrentPage(1);
//   };

//   // Options for select fields
//   const fundingPlanOptions = ['Perpetual', 'Terms'];
//   const natureOfEndowmentOptions = ['Quasi-restricted'];
//   const termsOfEndowmentOptions = ['Perpetual', 'Terms'];
//   const endowmentPlanOptions = ['Quasi-restricted'];
//   const installmentOptions = ['One-time', 'Installments'];

//   return (
//     <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>
      
//       {/* Control Panel - UNCHANGED */}
//       <div style={{
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         marginBottom: '30px',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//         border: '1px solid #e2e8f0'
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
//           <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
//             <div style={{ position: 'relative', minWidth: '300px' }}>
//               <input
//                 type="text"
//                 placeholder="Search by name, prize, or department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   padding: '14px 45px 14px 20px',
//                   borderRadius: '10px',
//                   border: '2px solid #e2e8f0',
//                   width: '100%',
//                   fontSize: '15px',
//                   transition: 'all 0.3s ease',
//                   background: '#f8fafc'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                 onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//               />
//               <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }}>🔍</span>
//             </div>

//             <input
//               type="text"
//               placeholder="Filter by department..."
//               value={filterDepartment}
//               onChange={(e) => setFilterDepartment(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '200px',
//                 transition: 'all 0.3s ease'
//               }}
//             />

//             <button
//               type="submit"
//               style={{
//                 padding: '14px 25px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '15px',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               🔍 Search
//             </button>
//           </form>

//           <button
//             onClick={() => setShowForm(!showForm)}
//             style={{
//               padding: '16px 32px',
//               background:'black',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               whiteSpace: 'nowrap',
//               transition: 'all 0.3s ease',
//               boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             {showForm ? '✕ Cancel' : '+ Add New Donater'}
//           </button>
//         </div>
//       </div>

//       {/* Add/Edit Form - UPDATED WITH NEW FIELDS */}
//       {showForm && (
//         <div style={{
//           backgroundColor: 'white',
//           padding: '40px',
//           borderRadius: '15px',
//           marginBottom: '30px',
//           boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//           border: '1px solid #e2e8f0'
//         }}>
//           <h2 style={{ 
//             color: '#2d3748', 
//             marginBottom: '30px', 
//             fontSize: '1.8rem', 
//             borderBottom: '3px solid #667eea', 
//             paddingBottom: '15px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px'
//           }}>
//             <span style={{ 
//               backgroundColor: 'black',
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '1.2rem'
//             }}>
//               {editingId ? '✏️' : '➕'}
//             </span>
//             {editingId ? 'Edit Donater' : 'Add New Donater'}
//           </h2>
          
//           <form onSubmit={handleSubmit}>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              
//               {/* Section 1: Fund Information */}
//               <div style={{ gridColumn: '1 / -1', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '10px' }}>
//                 <h3 style={{ color: '#2d3748', fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                   📊 Fund Information
//                 </h3>
//               </div>

//               {/* Fund Official Name */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषको अधिकृत नाम (Fund Official Name) *
//                 </label>
//                 <input
//                   type="text"
//                   name="fundOfficialName"
//                   value={formData.fundOfficialName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.fundOfficialName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter fund official name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.fundOfficialName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.fundOfficialName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.fundOfficialName}
//                   </span>
//                 )}
//               </div>

//               {/* Donor Name */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   दानदाताको विवरण – दानदाताको नाम (Donor Name) *
//                 </label>
//                 <input
//                   type="text"
//                   name="donorName"
//                   value={formData.donorName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donorName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter donor name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donorName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donorName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donorName}
//                   </span>
//                 )}
//               </div>

//               {/* Donor Contact Number */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   दाताको सम्पर्क नम्बर (Donor Contact Number)
//                 </label>
//                 <input
//                   type="tel"
//                   name="donorContactNumber"
//                   value={formData.donorContactNumber}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter donor contact number"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Donor Email */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   दाताको इमेल (Donor Email)
//                 </label>
//                 <input
//                   type="email"
//                   name="donorEmail"
//                   value={formData.donorEmail}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donorEmail ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter donor email"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donorEmail ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donorEmail && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donorEmail}
//                   </span>
//                 )}
//               </div>

//               {/* Person in Care Of */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   अन्तिमवारी प्राप्त इच्छाअनुसार व्यक्ति (Person in Care Of)
//                 </label>
//                 <input
//                   type="text"
//                   name="personInCareOf"
//                   value={formData.personInCareOf}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter person in care of"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Reporting Contact Number */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   सम्पर्क नम्बर (Reporting Contact Number)
//                 </label>
//                 <input
//                   type="tel"
//                   name="reportingContactNumber"
//                   value={formData.reportingContactNumber}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter reporting contact number"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Reporting Address */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   इमेल / ठेगाना (Reporting Address/Email)
//                 </label>
//                 <input
//                   type="text"
//                   name="reportingAddress"
//                   value={formData.reportingAddress}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter reporting address or email"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Section 2: Endowment Details */}
//               <div style={{ gridColumn: '1 / -1', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '10px', marginTop: '20px' }}>
//                 <h3 style={{ color: '#2d3748', fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                   💰 Endowment Details
//                 </h3>
//               </div>

//               {/* Funding Plan */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषमा योगदान सम्बन्धी योजना (Funding Plan)
//                 </label>
//                 <select
//                   name="fundingPlan"
//                   value={formData.fundingPlan}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                 >
//                   <option value="">Select Funding Plan</option>
//                   {fundingPlanOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Nature of Endowment */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषको प्रकृति (Nature of Endowment)
//                 </label>
//                 <select
//                   name="natureOfEndowment"
//                   value={formData.natureOfEndowment}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                 >
//                   <option value="">Select Nature</option>
//                   {natureOfEndowmentOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Amount of Endowment */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषमा योगदान रकम (Amount of Endowment)
//                 </label>
//                 <input
//                   type="number"
//                   name="amountOfEndowment"
//                   value={formData.amountOfEndowment}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter amount"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Terms of Endowment Fund */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषको अवधि (Terms of Endowment Fund)
//                 </label>
//                 <select
//                   name="termsOfEndowmentFund"
//                   value={formData.termsOfEndowmentFund}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                 >
//                   <option value="">Select Terms</option>
//                   {termsOfEndowmentOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Types of Endowment Plan */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषकाे प्रकृति (Types of Endowment Plan)
//                 </label>
//                 <select
//                   name="typesOfEndowmentPlan"
//                   value={formData.typesOfEndowmentPlan}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                 >
//                   <option value="">Select Plan Type</option>
//                   {endowmentPlanOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Installments of Endowment Contribution */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषमा योगदान किस्ता (Installments of Endowment Contribution)
//                 </label>
//                 <select
//                   name="installmentsOfEndowment"
//                   value={formData.installmentsOfEndowment}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                 >
//                   <option value="">Select Installment Type</option>
//                   {installmentOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Purpose of Using Endowment Returns */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोष रकमबाट खर्च गर्न सकिने इकाई (Purpose of Using Endowment Returns)
//                 </label>
//                 <textarea
//                   name="purposeOfUsingEndowmentReturns"
//                   value={formData.purposeOfUsingEndowmentReturns}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc',
//                     resize: 'vertical'
//                   }}
//                   placeholder="Enter purpose details"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Principal Amount of Endowment Fund */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   कोषको मूल रकम (Principal Amount of Endowment Fund)
//                 </label>
//                 <input
//                   type="number"
//                   name="principalAmountOfEndowment"
//                   value={formData.principalAmountOfEndowment}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter principal amount"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Agreement Date */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   सम्झौता मिति (Agreement Date) *
//                 </label>
//                 <input
//                   type="date"
//                   name="agreementDate"
//                   value={formData.agreementDate}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.agreementDate ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.agreementDate ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.agreementDate && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.agreementDate}
//                   </span>
//                 )}
//               </div>

//               {/* Section 3: Original Fields */}
//               <div style={{ gridColumn: '1 / -1', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '10px', marginTop: '20px' }}>
//                 <h3 style={{ color: '#2d3748', fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                   🎯 Prize Information
//                 </h3>
//               </div>

//               {/* Donater Name - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donater Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="donaterName"
//                   value={formData.donaterName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donaterName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter donater name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donaterName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donaterName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donaterName}
//                   </span>
//                 )}
//               </div>

//               {/* Prize Name - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Prize Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="prizeName"
//                   value={formData.prizeName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.prizeName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter prize name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.prizeName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.prizeName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.prizeName}
//                   </span>
//                 )}
//               </div>

//               {/* Prize Type - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Prize Type *
//                 </label>
//                 <input 
//                   type="text"
//                   name="prizeType"
//                   value={formData.prizeType}
//                   onChange={handleInputChange}
//                   style={{
//                     padding: '14px 20px',
//                     borderRadius: '10px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     background: '#f8fafc',
//                     width: '100%',
//                     transition: 'all 0.3s ease'
//                   }}
//                   placeholder="Prize Type"
//                 />
//               </div>

//               {/* Related Department - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Related Department *
//                 </label>
//                 <input
//                   type="text"
//                   name="relatedDepart"
//                   value={formData.relatedDepart}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.relatedDepart ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter department name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.relatedDepart ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.relatedDepart && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.relatedDepart}
//                   </span>
//                 )}
//               </div>

//               {/* Prize Amount - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Prize Amount
//                 </label>
//                 <input
//                   type="number"
//                   name="prizeAmount"
//                   value={formData.prizeAmount}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter Prize Amount"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Contract Date - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Contract Date *
//                 </label>
//                 <input
//                   type="date"
//                   name="contractDate"
//                   value={formData.contractDate}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.contractDate ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.contractDate ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.contractDate && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.contractDate}
//                   </span>
//                 )}
//               </div>

//               {/* Contact Number - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Contact Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.contactNumber ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter contact number"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.contactNumber ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.contactNumber && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.contactNumber}
//                   </span>
//                 )}
//               </div>

//               {/* Email - ORIGINAL FIELD */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.email ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter email address"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.email ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.email && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.email}
//                   </span>
//                 )}
//               </div>

//               {/* Photo Upload - ORIGINAL FIELD */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donater Photo
//                 </label>
//                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
//                   <div style={{ flex: 1, minWidth: '300px' }}>
//                     <div style={{
//                       border: '2px dashed #cbd5e0',
//                       borderRadius: '10px',
//                       padding: '30px',
//                       textAlign: 'center',
//                       transition: 'all 0.3s ease',
//                       background: '#f8fafc',
//                       cursor: 'pointer',
//                       position: 'relative'
//                     }}
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                       e.currentTarget.style.borderColor = '#667eea';
//                       e.currentTarget.style.background = '#edf2f7';
//                     }}
//                     onDragLeave={(e) => {
//                       e.currentTarget.style.borderColor = '#cbd5e0';
//                       e.currentTarget.style.background = '#f8fafc';
//                     }}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       const files = e.dataTransfer.files;
//                       if (files.length > 0) {
//                         handleFileChange({ target: { files } } as any);
//                       }
//                     }}
//                     >
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         style={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           opacity: 0,
//                           cursor: 'pointer'
//                         }}
//                       />
//                       <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#a0aec0' }}>📷</div>
//                       <p style={{ margin: '0 0 10px 0', color: '#4a5568', fontWeight: '600' }}>
//                         {selectedFile ? 'File selected: ' + selectedFile.name : 'Click to upload or drag and drop'}
//                       </p>
//                       <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
//                         PNG, JPG, GIF up to 5MB
//                       </p>
//                       {uploading && (
//                         <div style={{ marginTop: '15px', color: '#667eea', fontWeight: '600' }}>
//                           ⏳ Uploading...
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Image Preview */}
//                   {(imagePreview || formData.photo) && (
//                     <div style={{ textAlign: 'center', minWidth: '200px' }}>
//                       <p style={{ marginBottom: '10px', fontWeight: '600', color: '#4a5568' }}>Preview:</p>
//                       <img 
//                         src={imagePreview || formData.photo} 
//                         alt="Preview" 
//                         style={{ 
//                           maxWidth: '200px',
//                           maxHeight: '200px',
//                           borderRadius: '10px',
//                           border: '2px solid #e2e8f0',
//                           objectFit: 'cover'
//                         }}
//                         onError={(e) => {
//                           e.currentTarget.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Form Actions - UNCHANGED */}
//             <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
//               <button
//                 type="submit"
//                 disabled={loading || uploading}
//                 style={{
//                   padding: '16px 40px',
//                   background: loading || uploading ? '#a0aec0' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '10px',
//                   cursor: loading || uploading ? 'not-allowed' : 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   minWidth: '180px',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!loading && !uploading) {
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!loading && !uploading) {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                   }
//                 }}
//               >
//                 {loading ? '⏳ Saving...' : uploading ? '📤 Uploading...' : editingId ? '💾 Update Donater' : '🚀 Create Donater'}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 style={{
//                   padding: '16px 40px',
//                   backgroundColor: '#718096',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '10px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   minWidth: '180px',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//               >
//                 🔄 Reset Form
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* The rest of the component (loading state, donaters grid, pagination) remains EXACTLY THE SAME */}
//       {/* Loading State - UNCHANGED */}
//       {loading && !showForm && (
//         <div style={{ textAlign: 'center', padding: '60px' }}>
//           <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
//           <div style={{ fontSize: '18px', color: '#4a5568', fontWeight: '600' }}>Loading donaters...</div>
//         </div>
//       )}

//       {/* Donaters Grid - UNCHANGED */}
//       {!loading && donaters.length > 0 && (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
//           {donaters.map((donater, index) => (
//             <div
//               key={donater._id}
//               style={{
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 padding: '25px',
//                 boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
//                 transition: 'all 0.3s ease',
//                 border: '1px solid #e2e8f0',
//                 position: 'relative',
//                 overflow: 'hidden'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-8px)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
//               }}
//             >
//               {/* Header with badge and prize type - UNCHANGED */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                 <span style={{
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold',
//                   boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//                 }}>
//                   #{index + 1 + (currentPage - 1) * itemsPerPage}
//                 </span>
//                 <span style={{
//                   backgroundColor: '#f56565',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold'
//                 }}>
//                   {donater.prizeType}
//                 </span>
//               </div>

//               {/* Photo - UNCHANGED */}
//               <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <img
//                   src={donater.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
//                   alt={donater.donaterName}
//                   style={{
//                     width: '100%',
//                     height: '220px',
//                     objectFit: 'cover',
//                     borderRadius: '12px',
//                     border: '2px solid #f7fafc'
//                   }}
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                   }}
//                 />
//               </div>

//               {/* Donater Name - UNCHANGED */}
//               <h3 style={{ 
//                 color: '#2d3748', 
//                 marginBottom: '15px', 
//                 fontSize: '22px', 
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}>
//                 {donater.donaterName}
//               </h3>

//               {/* Details - UNCHANGED */}
//               <div style={{ marginBottom: '25px', lineHeight: '1.8', color: '#4a5568' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     🏆 Prize:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.prizeName}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     🏛️ Department:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.relatedDepart}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     📅 Contract Date:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{new Date(donater.contractDate).toLocaleDateString()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     📞 Contact:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donater.contactNumber}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     ✉️ Email:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500', wordBreak: 'break-all', maxWidth: '60%' }}>{donater.email}</span>
//                 </div>
//                 {donater.createdAt && (
//                   <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
//                     <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>
//                       Created: {new Date(donater.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons - UNCHANGED */}
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <button
//                   onClick={() => handleEdit(donater)}
//                   style={{
//                     flex: 1,
//                     padding: '14px',
//                     background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                 >
//                    Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(donater._id!)}
//                   style={{
//                     flex: 1,
//                     padding: '14px',
//                     background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                 >
//                  Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Empty State - UNCHANGED */}
//       {!loading && donaters.length === 0 && (
//         <div style={{
//           textAlign: 'center',
//           padding: '80px 20px',
//           backgroundColor: 'white',
//           borderRadius: '15px',
//           marginTop: '20px',
//           boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
//           border: '1px solid #e2e8f0'
//         }}>
//           <div style={{ fontSize: '6rem', marginBottom: '20px' }}>📊</div>
//           <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.8rem', fontWeight: 'bold' }}>No donaters found</h3>
//           <p style={{ color: '#718096', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px' }}>
//             {searchTerm || filterPrizeType || filterDepartment 
//               ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
//               : 'Get started by adding your first donater to the system.'
//             }
//           </p>
//           {(searchTerm || filterPrizeType || filterDepartment) ? (
//             <button
//               onClick={handleFilterReset}
//               style={{
//                 padding: '14px 28px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               🔄 Clear All Filters
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowForm(true)}
//               style={{
//                 padding: '14px 28px',
//                 background:'black',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               + Add Your First Donater
//             </button>
//           )}
//         </div>
//       )}

//       {/* Pagination - UNCHANGED */}
//       {donaters.length > 0 && (
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           gap: '20px', 
//           marginTop: '50px',
//           padding: '25px'
//         }}>
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             style={{
//               padding: '14px 24px',
//               backgroundColor: currentPage === 1 ? '#cbd5e0' : '#667eea',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (currentPage !== 1) {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (currentPage !== 1) {
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             ⬅️ Previous
//           </button>
          
//           <span style={{ 
//             color: '#2d3748', 
//             fontWeight: 'bold',
//             fontSize: '16px',
//             background: '#f7fafc',
//             padding: '12px 20px',
//             borderRadius: '8px',
//             border: '1px solid #e2e8f0'
//           }}>
//             Page {currentPage}
//           </span>
          
//           <button
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             disabled={donaters.length < itemsPerPage}
//             style={{
//               padding: '14px 24px',
//               backgroundColor: donaters.length < itemsPerPage ? '#cbd5e0' : '#667eea',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: donaters.length < itemsPerPage ? 'not-allowed' : 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (donaters.length >= itemsPerPage) {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (donaters.length >= itemsPerPage) {
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             Next ➡️
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminForDonater;


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

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

// const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
// const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
// const API_URL = 'http://202.70.90.11:81/api/donater';
// const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// const AdminForDonor: React.FC = () => {
//   const [donors, setDonors] = useState<Donor[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterNature, setFilterNature] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('');
//   const [stats, setStats] = useState<any>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');

//   const [formData, setFormData] = useState<Donor>({
//     donorName: '',
//     fundOfficialName: '',
//     natureOfEndowment: '',
//     relatedDepart: '',
//     agreementDate: '',
//     photo: '',
//     donorContactNumber: '',
//     donorEmail: '',
//     principalAmountOfEndowment: 0,
//     personInCareOf: '',
//     reportingContactNumber: '',
//     reportingAddress: '',
//     fundingPlan: '',
//     amountOfEndowment: 0,
//     termsOfEndowmentFund: '',
//     typesOfEndowmentPlan: '',
//     installmentsOfEndowment: '',
//     purposeOfUsingEndowmentReturns: ''
//   });

//   // Memoized fetch functions
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

//       const response = await axios.get(API_URL, { params });
//       setDonors(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//       alert('Failed to fetch donors');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, searchTerm, filterNature, filterDepartment, sortBy, sortOrder]);

//   const fetchStats = useCallback(async () => {
//     try {
//       const response = await axios.get(`${API_URL}/stats/summary`);
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchDonors();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [fetchDonors]);

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   // Cloudinary file upload function
//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
//     try {
//       const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Please select an image file');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB');
//         return;
//       }

//       setSelectedFile(file);
      
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async (): Promise<string> => {
//     if (!selectedFile) {
//       return formData.photo;
//     }

//     setUploading(true);
//     try {
//       const imageUrl = await uploadToCloudinary(selectedFile);
//       return imageUrl;
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Failed to upload image. Please try again.');
//       throw error;
//     } finally {
//       setUploading(false);
//     }
//   };

//   const validateForm = (): boolean => {
//     const errors: {[key: string]: string} = {};
    
//     if (!formData.donorName.trim()) errors.donorName = 'Donor name is required';
//     if (!formData.fundOfficialName.trim()) errors.fundOfficialName = 'Fund official name is required';
//     if (!formData.relatedDepart.trim()) errors.relatedDepart = 'Related department is required';
//     if (!formData.agreementDate) errors.agreementDate = 'Agreement date is required';
//     if (!formData.donorContactNumber.trim()) errors.donorContactNumber = 'Contact number is required';
//     if (!formData.donorEmail.trim()) errors.donorEmail = 'Email is required';
//     if (formData.principalAmountOfEndowment <= 0) errors.principalAmountOfEndowment = 'Principal amount must be greater than 0';
//     if (formData.amountOfEndowment <= 0) errors.amountOfEndowment = 'Endowment amount must be greater than 0';
    
//     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     if (formData.donorEmail && !emailRegex.test(formData.donorEmail)) {
//       errors.donorEmail = 'Please provide a valid email';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) || 0 : value
//     }));
    
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       let photoUrl = formData.photo;
//       if (selectedFile) {
//         photoUrl = await handleImageUpload();
//       }

//       const submitData = {
//         ...formData,
//         photo: photoUrl
//       };

//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, submitData);
//         alert('Donor updated successfully!');
//       } else {
//         await axios.post(API_URL, submitData);
//         alert('Donor created successfully!');
//       }
//       resetForm();
//       fetchDonors();
//       fetchStats();
//     } catch (error: any) {
//       console.error('Error saving donor:', error);
//       alert(error.response?.data?.message || 'Failed to save donor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (donor: Donor) => {
//     setFormData({
//       donorName: donor.donorName,
//       fundOfficialName: donor.fundOfficialName,
//       natureOfEndowment: donor.natureOfEndowment,
//       relatedDepart: donor.relatedDepart,
//       agreementDate: donor.agreementDate.split('T')[0],
//       photo: donor.photo,
//       donorContactNumber: donor.donorContactNumber,
//       donorEmail: donor.donorEmail,
//       principalAmountOfEndowment: donor.principalAmountOfEndowment,
//       personInCareOf: donor.personInCareOf,
//       reportingContactNumber: donor.reportingContactNumber,
//       reportingAddress: donor.reportingAddress,
//       fundingPlan: donor.fundingPlan,
//       amountOfEndowment: donor.amountOfEndowment,
//       termsOfEndowmentFund: donor.termsOfEndowmentFund,
//       typesOfEndowmentPlan: donor.typesOfEndowmentPlan,
//       installmentsOfEndowment: donor.installmentsOfEndowment,
//       purposeOfUsingEndowmentReturns: donor.purposeOfUsingEndowmentReturns
//     });
//     setImagePreview(donor.photo || '');
//     setSelectedFile(null);
//     setEditingId(donor._id!);
//     setShowForm(true);
//     setFormErrors({});
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this donor?')) return;

//     setLoading(true);
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       alert('Donor deleted successfully!');
//       fetchDonors();
//       fetchStats();
//     } catch (error) {
//       console.error('Error deleting donor:', error);
//       alert('Failed to delete donor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       donorName: '',
//       fundOfficialName: '',
//       natureOfEndowment: '',
//       relatedDepart: '',
//       agreementDate: '',
//       photo: '',
//       donorContactNumber: '',
//       donorEmail: '',
//       principalAmountOfEndowment: 0,
//       personInCareOf: '',
//       reportingContactNumber: '',
//       reportingAddress: '',
//       fundingPlan: '',
//       amountOfEndowment: 0,
//       termsOfEndowmentFund: '',
//       typesOfEndowmentPlan: '',
//       installmentsOfEndowment: '',
//       purposeOfUsingEndowmentReturns: ''
//     });
//     setSelectedFile(null);
//     setImagePreview('');
//     setEditingId(null);
//     setShowForm(false);
//     setFormErrors({});
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handleFilterReset = () => {
//     setSearchTerm('');
//     setFilterNature('');
//     setFilterDepartment('');
//     setCurrentPage(1);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>
//       {/* Control Panel */}
//       <div style={{
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         marginBottom: '30px',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//         border: '1px solid #e2e8f0'
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
//           <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
//             <div style={{ position: 'relative', minWidth: '300px' }}>
//               <input
//                 type="text"
//                 placeholder="Search by donor name, fund name, or department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   padding: '14px 45px 14px 20px',
//                   borderRadius: '10px',
//                   border: '2px solid #e2e8f0',
//                   width: '100%',
//                   fontSize: '15px',
//                   transition: 'all 0.3s ease',
//                   background: '#f8fafc'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                 onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//               />
//               <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }}>🔍</span>
//             </div>
            
//             <input
//               type="text"
//               placeholder="Filter by nature of endowment..."
//               value={filterNature}
//               onChange={(e) => setFilterNature(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '200px',
//                 transition: 'all 0.3s ease'
//               }}
//             />

//             <input
//               type="text"
//               placeholder="Filter by department..."
//               value={filterDepartment}
//               onChange={(e) => setFilterDepartment(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 borderRadius: '10px',
//                 border: '2px solid #e2e8f0',
//                 fontSize: '15px',
//                 background: '#f8fafc',
//                 minWidth: '200px',
//                 transition: 'all 0.3s ease'
//               }}
//             />

//             <button
//               type="submit"
//               style={{
//                 padding: '14px 25px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '15px',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               🔍 Search
//             </button>
//           </form>

//           <button
//             onClick={() => setShowForm(!showForm)}
//             style={{
//               padding: '16px 32px',
//               background: 'black',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               whiteSpace: 'nowrap',
//               transition: 'all 0.3s ease',
//               boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             {showForm ? '✕ Cancel' : '+ Add New Donor'}
//           </button>
//         </div>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div style={{
//           backgroundColor: 'white',
//           padding: '40px',
//           borderRadius: '15px',
//           marginBottom: '30px',
//           boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//           border: '1px solid #e2e8f0'
//         }}>
//           <h2 style={{ 
//             color: '#2d3748', 
//             marginBottom: '30px', 
//             fontSize: '1.8rem', 
//             borderBottom: '3px solid #667eea', 
//             paddingBottom: '15px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px'
//           }}>
//             <span style={{ 
//               backgroundColor: 'black',
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '1.2rem'
//             }}>
//               {editingId ? '✏️' : '➕'}
//             </span>
//             {editingId ? 'Edit Donor' : 'Add New Donor'}
//           </h2>
          
//           <form onSubmit={handleSubmit}>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              
//               {/* Donor Name */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donor Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="donorName"
//                   value={formData.donorName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donorName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter donor name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donorName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donorName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donorName}
//                   </span>
//                 )}
//               </div>

//               {/* Fund Official Name */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Fund Official Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="fundOfficialName"
//                   value={formData.fundOfficialName}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.fundOfficialName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter fund official name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.fundOfficialName ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.fundOfficialName && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.fundOfficialName}
//                   </span>
//                 )}
//               </div>

//               {/* Nature of Endowment */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Nature of Endowment *
//                 </label>
//                 <input
//                   type="text"
//                   name="natureOfEndowment"
//                   value={formData.natureOfEndowment}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter nature of endowment"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Related Department */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Related Department *
//                 </label>
//                 <input
//                   type="text"
//                   name="relatedDepart"
//                   value={formData.relatedDepart}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.relatedDepart ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter department name"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.relatedDepart ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.relatedDepart && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.relatedDepart}
//                   </span>
//                 )}
//               </div>

//               {/* Principal Amount of Endowment */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Principal Amount of Endowment *
//                 </label>
//                 <input
//                   type="number"
//                   name="principalAmountOfEndowment"
//                   value={formData.principalAmountOfEndowment}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.principalAmountOfEndowment ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter principal amount"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.principalAmountOfEndowment ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.principalAmountOfEndowment && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.principalAmountOfEndowment}
//                   </span>
//                 )}
//               </div>

//               {/* Agreement Date */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Agreement Date *
//                 </label>
//                 <input
//                   type="date"
//                   name="agreementDate"
//                   value={formData.agreementDate}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.agreementDate ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.agreementDate ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.agreementDate && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.agreementDate}
//                   </span>
//                 )}
//               </div>

//               {/* Person in Care Of */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Person in Care Of
//                 </label>
//                 <input
//                   type="text"
//                   name="personInCareOf"
//                   value={formData.personInCareOf}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter person in care of"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Donor Contact Number */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donor Contact Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="donorContactNumber"
//                   value={formData.donorContactNumber}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donorContactNumber ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter contact number"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donorContactNumber ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donorContactNumber && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donorContactNumber}
//                   </span>
//                 )}
//               </div>

//               {/* Reporting Contact Number */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Reporting Contact Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="reportingContactNumber"
//                   value={formData.reportingContactNumber}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter reporting contact number"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Donor Email */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donor Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="donorEmail"
//                   value={formData.donorEmail}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.donorEmail ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter email address"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.donorEmail ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.donorEmail && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.donorEmail}
//                   </span>
//                 )}
//               </div>

//               {/* Amount of Endowment */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Amount of Endowment *
//                 </label>
//                 <input
//                   type="number"
//                   name="amountOfEndowment"
//                   value={formData.amountOfEndowment}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: formErrors.amountOfEndowment ? '2px solid #e53e3e' : '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter endowment amount"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = formErrors.amountOfEndowment ? '#e53e3e' : '#e2e8f0'}
//                 />
//                 {formErrors.amountOfEndowment && (
//                   <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
//                     ⚠️ {formErrors.amountOfEndowment}
//                   </span>
//                 )}
//               </div>

//               {/* Funding Plan */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Funding Plan
//                 </label>
//                 <input
//                   type="text"
//                   name="fundingPlan"
//                   value={formData.fundingPlan}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter funding plan"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Types of Endowment Plan */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Types of Endowment Plan
//                 </label>
//                 <input
//                   type="text"
//                   name="typesOfEndowmentPlan"
//                   value={formData.typesOfEndowmentPlan}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter types of endowment plan"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Installments of Endowment */}
//               <div>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Installments of Endowment
//                 </label>
//                 <input
//                   type="text"
//                   name="installmentsOfEndowment"
//                   value={formData.installmentsOfEndowment}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc'
//                   }}
//                   placeholder="Enter installments details"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Full-width text areas */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Reporting Address
//                 </label>
//                 <textarea
//                   name="reportingAddress"
//                   value={formData.reportingAddress}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc',
//                     resize: 'vertical'
//                   }}
//                   placeholder="Enter reporting address"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Terms of Endowment Fund
//                 </label>
//                 <textarea
//                   name="termsOfEndowmentFund"
//                   value={formData.termsOfEndowmentFund}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc',
//                     resize: 'vertical'
//                   }}
//                   placeholder="Enter terms of endowment fund"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Purpose of Using Endowment Returns
//                 </label>
//                 <textarea
//                   name="purposeOfUsingEndowmentReturns"
//                   value={formData.purposeOfUsingEndowmentReturns}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     borderRadius: '8px',
//                     border: '2px solid #e2e8f0',
//                     fontSize: '15px',
//                     transition: 'all 0.3s ease',
//                     background: '#f8fafc',
//                     resize: 'vertical'
//                   }}
//                   placeholder="Enter purpose of using endowment returns"
//                   onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//                 />
//               </div>

//               {/* Photo Upload */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
//                   Donor Photo
//                 </label>
//                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
//                   <div style={{ flex: 1, minWidth: '300px' }}>
//                     <div style={{
//                       border: '2px dashed #cbd5e0',
//                       borderRadius: '10px',
//                       padding: '30px',
//                       textAlign: 'center',
//                       transition: 'all 0.3s ease',
//                       background: '#f8fafc',
//                       cursor: 'pointer',
//                       position: 'relative'
//                     }}
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                       e.currentTarget.style.borderColor = '#667eea';
//                       e.currentTarget.style.background = '#edf2f7';
//                     }}
//                     onDragLeave={(e) => {
//                       e.currentTarget.style.borderColor = '#cbd5e0';
//                       e.currentTarget.style.background = '#f8fafc';
//                     }}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       const files = e.dataTransfer.files;
//                       if (files.length > 0) {
//                         handleFileChange({ target: { files } } as any);
//                       }
//                     }}
//                     >
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         style={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           opacity: 0,
//                           cursor: 'pointer'
//                         }}
//                       />
//                       <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#a0aec0' }}>📷</div>
//                       <p style={{ margin: '0 0 10px 0', color: '#4a5568', fontWeight: '600' }}>
//                         {selectedFile ? 'File selected: ' + selectedFile.name : 'Click to upload or drag and drop'}
//                       </p>
//                       <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
//                         PNG, JPG, GIF up to 5MB
//                       </p>
//                       {uploading && (
//                         <div style={{ marginTop: '15px', color: '#667eea', fontWeight: '600' }}>
//                           ⏳ Uploading...
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Image Preview */}
//                   {(imagePreview || formData.photo) && (
//                     <div style={{ textAlign: 'center', minWidth: '200px' }}>
//                       <p style={{ marginBottom: '10px', fontWeight: '600', color: '#4a5568' }}>Preview:</p>
//                       <img 
//                         src={imagePreview || formData.photo} 
//                         alt="Preview" 
//                         style={{ 
//                           maxWidth: '200px',
//                           maxHeight: '200px',
//                           borderRadius: '10px',
//                           border: '2px solid #e2e8f0',
//                           objectFit: 'cover'
//                         }}
//                         onError={(e) => {
//                           e.currentTarget.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
//               <button
//                 type="submit"
//                 disabled={loading || uploading}
//                 style={{
//                   padding: '16px 40px',
//                   background: loading || uploading ? '#a0aec0' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '10px',
//                   cursor: loading || uploading ? 'not-allowed' : 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   minWidth: '180px',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!loading && !uploading) {
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!loading && !uploading) {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                   }
//                 }}
//               >
//                 {loading ? '⏳ Saving...' : uploading ? '📤 Uploading...' : editingId ? '💾 Update Donor' : '🚀 Create Donor'}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 style={{
//                   padding: '16px 40px',
//                   backgroundColor: '#718096',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '10px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   minWidth: '180px',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//               >
//                 🔄 Reset Form
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && !showForm && (
//         <div style={{ textAlign: 'center', padding: '60px' }}>
//           <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
//           <div style={{ fontSize: '18px', color: '#4a5568', fontWeight: '600' }}>Loading donors...</div>
//         </div>
//       )}

//       {/* Donors Grid */}
//       {!loading && donors.length > 0 && (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
//           {donors.map((donor, index) => (
//             <div
//               key={donor._id}
//               style={{
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 padding: '25px',
//                 boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
//                 transition: 'all 0.3s ease',
//                 border: '1px solid #e2e8f0',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 // position: 'relative',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-8px)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
//               }}
//             >
//               {/* Header with badge and nature */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',

//               position: 'absolute',
//               top: '20px',
//               left: '20px',
              
//               //  marginBottom: '20px' 


//               }}>
//                 <span style={{
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold',
//                   boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//                 }}>
//                   #{index + 1 + (currentPage - 1) * itemsPerPage}
//                 </span>
//                 <span style={{
//                   backgroundColor: '#f56565',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: 'bold'
//                 }}>
//                   {donor.natureOfEndowment}
//                 </span>
//               </div>

//               {/* Photo */}
//               <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <img
//                   src={donor.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
//                   alt={donor.donorName}
//                   style={{
//                     width: '100%',
//                     height: '220px',
//                     objectFit: 'cover',
//                     borderRadius: '12px',
//                     border: '2px solid #f7fafc'
//                   }}
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                   }}
//                 />
//               </div>

//               {/* Donor Name */}
//               <h3 style={{ 
//                 color: '#2d3748', 
//                 marginBottom: '15px', 
//                 fontSize: '22px', 
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}>
//                 {donor.donorName}
//               </h3>

//               {/* Details */}
//               <div style={{  color: '#4a5568' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     🏦 Fund:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donor?.fundOfficialName}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     🏛️ Department:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donor?.relatedDepart}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     💰 Principal Amount:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>${donor?.principalAmountOfEndowment?.toLocaleString()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     📅 Agreement Date:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{new Date(donor?.agreementDate).toLocaleDateString()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     📞 Contact:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500' }}>{donor?.donorContactNumber}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0' }}>
//                   <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     ✉️ Email:
//                   </strong>
//                   <span style={{ textAlign: 'right', fontWeight: '500', wordBreak: 'break-all', maxWidth: '60%' }}>{donor.donorEmail}</span>
//                 </div>
//                 {donor?.personInCareOf && (
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
//                     <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                       👤 In Care Of:
//                     </strong>
//                     <span style={{ textAlign: 'right', fontWeight: '500' }}>{donor?.personInCareOf ?? '-'}</span>
//                   </div>
//                 )}
//                 {donor.createdAt && (
//                   <div style={{ borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
//                     {/* <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>
//                       Created: {new Date(donor.createdAt).toLocaleDateString()}
//                     </span> */}
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <button
//                   onClick={() => handleEdit(donor)}
//                   style={{
//                     flex: 1,
//                     padding: '14px',
//                     background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                 >
//                    Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(donor._id!)}
//                   style={{
//                     flex: 1,
//                     padding: '14px',
//                     background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                 >
//                  Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && donors.length === 0 && (
//         <div style={{
//           textAlign: 'center',
//           padding: '80px 20px',
//           backgroundColor: 'white',
//           borderRadius: '15px',
//           marginTop: '20px',
//           boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
//           border: '1px solid #e2e8f0'
//         }}>
//           <div style={{ fontSize: '6rem', marginBottom: '20px' }}>📊</div>
//           <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.8rem', fontWeight: 'bold' }}>No donors found</h3>
//           <p style={{ color: '#718096', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px' }}>
//             {searchTerm || filterNature || filterDepartment 
//               ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
//               : 'Get started by adding your first donor to the system.'
//             }
//           </p>
//           {(searchTerm || filterNature || filterDepartment) ? (
//             <button
//               onClick={handleFilterReset}
//               style={{
//                 padding: '14px 28px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               🔄 Clear All Filters
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowForm(true)}
//               style={{
//                 padding: '14px 28px',
//                 background: 'black',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               + Add Your First Donor
//             </button>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
//       {donors.length > 0 && (
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           gap: '20px', 
//           marginTop: '50px',
//           padding: '25px'
//         }}>
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             style={{
//               padding: '14px 24px',
//               backgroundColor: currentPage === 1 ? '#cbd5e0' : '#667eea',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (currentPage !== 1) {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (currentPage !== 1) {
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             ⬅️ Previous
//           </button>
          
//           <span style={{ 
//             color: '#2d3748', 
//             fontWeight: 'bold',
//             fontSize: '16px',
//             background: '#f7fafc',
//             padding: '12px 20px',
//             borderRadius: '8px',
//             border: '1px solid #e2e8f0'
//           }}>
//             Page {currentPage}
//           </span>
          
//           <button
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             disabled={donors.length < itemsPerPage}
//             style={{
//               padding: '14px 24px',
//               backgroundColor: donors.length < itemsPerPage ? '#cbd5e0' : '#667eea',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               cursor: donors.length < itemsPerPage ? 'not-allowed' : 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (donors.length >= itemsPerPage) {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (donors.length >= itemsPerPage) {
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             Next ➡️
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminForDonor;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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
  endowmentDetailsPdf?: string;
  createdAt?: string;
  updatedAt?: string;
}

const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
const API_URL = 'http://202.70.90.11:81/api/donater';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const AdminForDonor: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNature, setFilterNature] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [pdfPreview, setPdfPreview] = useState<string>('');

  const [formData, setFormData] = useState<Donor>({
    donorName: '',
    fundOfficialName: '',
    natureOfEndowment: '',
    relatedDepart: '',
    agreementDate: '',
    photo: '',
    donorContactNumber: '',
    donorEmail: '',
    principalAmountOfEndowment: 0,
    personInCareOf: '',
    reportingContactNumber: '',
    reportingAddress: '',
    fundingPlan: '',
    amountOfEndowment: 0,
    termsOfEndowmentFund: '',
    typesOfEndowmentPlan: '',
    installmentsOfEndowment: '',
    purposeOfUsingEndowmentReturns: '',
    endowmentDetailsPdf: ''
  });

  // Memoized fetch functions
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

      const response = await axios.get(API_URL, { params });
      setDonors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching donors:', error);
      alert('Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, filterNature, filterDepartment, sortBy, sortOrder]);

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
      fetchDonors();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchDonors]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Cloudinary file upload function
  // const uploadToCloudinary = async (file: File, resourceType: 'image' | 'raw' = 'image'): Promise<string> => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  //   if (resourceType === 'raw') {
  //     formData.append('resource_type', 'raw');
  //   }
    
  //   try {
  //     const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error('Error uploading to Cloudinary:', error);
  //     throw new Error('Failed to upload file');
  //   }
  // };

  const uploadToCloudinary = async (
  file: File,
  resourceType: 'image' | 'raw' = 'image'
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload file');
  }
};


  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('PDF size must be less than 10MB');
        return;
      }

      setSelectedPdfFile(file);
      setPdfPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!selectedFile) {
      return formData.photo;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(selectedFile, 'image');
      return imageUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (): Promise<string> => {
    if (!selectedPdfFile) {
      return formData.endowmentDetailsPdf || '';
    }

    setUploadingPdf(true);
    try {
      const pdfUrl = await uploadToCloudinary(selectedPdfFile, 'raw');
      return pdfUrl;
    } catch (error) {
      console.error('PDF upload failed:', error);
      alert('Failed to upload PDF. Please try again.');
      throw error;
    } finally {
      setUploadingPdf(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.donorName.trim()) errors.donorName = 'Donor name is required';
    if (!formData.fundOfficialName.trim()) errors.fundOfficialName = 'Fund official name is required';
    if (!formData.relatedDepart.trim()) errors.relatedDepart = 'Related department is required';
    if (!formData.agreementDate) errors.agreementDate = 'Agreement date is required';
    if (!formData.donorContactNumber.trim()) errors.donorContactNumber = 'Contact number is required';
    if (!formData.donorEmail.trim()) errors.donorEmail = 'Email is required';
    if (formData.principalAmountOfEndowment <= 0) errors.principalAmountOfEndowment = 'Principal amount must be greater than 0';
    if (formData.amountOfEndowment <= 0) errors.amountOfEndowment = 'Endowment amount must be greater than 0';
    
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (formData.donorEmail && !emailRegex.test(formData.donorEmail)) {
      errors.donorEmail = 'Please provide a valid email';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
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
      let photoUrl = formData.photo;
      let pdfUrl = formData.endowmentDetailsPdf;

      // Upload image if selected
      if (selectedFile) {
        photoUrl = await handleImageUpload();
      }

      // Upload PDF if selected
      if (selectedPdfFile) {
        pdfUrl = await handlePdfUpload();
      }

      const submitData = {
        ...formData,
        photo: photoUrl,
        endowmentDetailsPdf: pdfUrl
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, submitData);
        alert('Donor updated successfully!');
      } else {
        await axios.post(API_URL, submitData);
        alert('Donor created successfully!');
      }
      resetForm();
      fetchDonors();
      fetchStats();
    } catch (error: any) {
      console.error('Error saving donor:', error);
      alert(error.response?.data?.message || 'Failed to save donor');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (donor: Donor) => {
    setFormData({
      donorName: donor.donorName,
      fundOfficialName: donor.fundOfficialName,
      natureOfEndowment: donor.natureOfEndowment,
      relatedDepart: donor.relatedDepart,
      agreementDate: donor.agreementDate.split('T')[0],
      photo: donor.photo,
      donorContactNumber: donor.donorContactNumber,
      donorEmail: donor.donorEmail,
      principalAmountOfEndowment: donor.principalAmountOfEndowment,
      personInCareOf: donor.personInCareOf,
      reportingContactNumber: donor.reportingContactNumber,
      reportingAddress: donor.reportingAddress,
      fundingPlan: donor.fundingPlan,
      amountOfEndowment: donor.amountOfEndowment,
      termsOfEndowmentFund: donor.termsOfEndowmentFund,
      typesOfEndowmentPlan: donor.typesOfEndowmentPlan,
      installmentsOfEndowment: donor.installmentsOfEndowment,
      purposeOfUsingEndowmentReturns: donor.purposeOfUsingEndowmentReturns,
      endowmentDetailsPdf: donor.endowmentDetailsPdf || ''
    });
    setImagePreview(donor.photo || '');
    if (donor.endowmentDetailsPdf) {
      setPdfPreview(donor.endowmentDetailsPdf);
    }
    setSelectedFile(null);
    setSelectedPdfFile(null);
    setEditingId(donor._id!);
    setShowForm(true);
    setFormErrors({});
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Donor deleted successfully!');
      fetchDonors();
      fetchStats();
    } catch (error) {
      console.error('Error deleting donor:', error);
      alert('Failed to delete donor');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      donorName: '',
      fundOfficialName: '',
      natureOfEndowment: '',
      relatedDepart: '',
      agreementDate: '',
      photo: '',
      donorContactNumber: '',
      donorEmail: '',
      principalAmountOfEndowment: 0,
      personInCareOf: '',
      reportingContactNumber: '',
      reportingAddress: '',
      fundingPlan: '',
      amountOfEndowment: 0,
      termsOfEndowmentFund: '',
      typesOfEndowmentPlan: '',
      installmentsOfEndowment: '',
      purposeOfUsingEndowmentReturns: '',
      endowmentDetailsPdf: ''
    });
    setSelectedFile(null);
    setSelectedPdfFile(null);
    setImagePreview('');
    setPdfPreview('');
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
    setFilterNature('');
    setFilterDepartment('');
    setCurrentPage(1);
  };

  const openPdfInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>
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
                placeholder="Search by donor name, fund name, or department..."
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
            
            <input
              type="text"
              placeholder="Filter by nature of endowment..."
              value={filterNature}
              onChange={(e) => setFilterNature(e.target.value)}
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
          </form>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '16px 32px',
              background: 'black',
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
            {showForm ? '✕ Cancel' : '+ Add New Donor'}
          </button>
        </div>
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
            {editingId ? 'Edit Donor' : 'Add New Donor'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              
              {/* Donor Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Donor Name *
                  दाताको विवरण

                </label>
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.donorName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter donor name"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.donorName ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.donorName && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.donorName}
                  </span>
                )}
              </div>

              {/* Fund Official Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Fund Official Name - कोषको अधिकृत नाम* 
                </label>
                <input
                  type="text"
                  name="fundOfficialName"
                  value={formData.fundOfficialName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.fundOfficialName ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter fund official name"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.fundOfficialName ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.fundOfficialName && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.fundOfficialName}
                  </span>
                )}
              </div>

              {/* Nature of Endowment */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Nature of Endowment -कोषको प्रकृति *
                </label>
                <input
                  type="text"
                  name="natureOfEndowment"
                  value={formData.natureOfEndowment}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter nature of endowment"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
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

              {/* Principal Amount of Endowment */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Principal Amount of Endowment कोषको मूल रकम *
                </label>
                <input
                  type="number"
                  name="principalAmountOfEndowment"
                  value={formData.principalAmountOfEndowment}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.principalAmountOfEndowment ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter principal amount"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.principalAmountOfEndowment ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.principalAmountOfEndowment && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.principalAmountOfEndowment}
                  </span>
                )}
              </div>

              {/* Agreement Date */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Agreement Date -सम्झौताको मिति*
                </label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.agreementDate ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.agreementDate ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.agreementDate && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.agreementDate}
                  </span>
                )}
              </div>

              {/* Person in Care Of */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Person in Care Of-अभिभावकीय प्राप्त इच्छाअनुसार व्यक्तिको नाम
                </label>
                <input
                  type="text"
                  name="personInCareOf"
                  value={formData.personInCareOf}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter person in care of"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Donor Contact Number */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Donor Contact Number -दाताको सम्पर्क नम्बर*
                </label>
                <input
                  type="tel"
                  name="donorContactNumber"
                  value={formData.donorContactNumber}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.donorContactNumber ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter contact number"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.donorContactNumber ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.donorContactNumber && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.donorContactNumber}
                  </span>
                )}
              </div>

              {/* Reporting Contact Number */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Reporting Contact Number-सम्पर्क नम्बर
                </label>
                <input
                  type="tel"
                  name="reportingContactNumber"
                  value={formData.reportingContactNumber}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter reporting contact number"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Donor Email */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Donor Email -दाताको इमेल*
                </label>
                <input
                  type="email"
                  name="donorEmail"
                  value={formData.donorEmail}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.donorEmail ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter email address"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.donorEmail ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.donorEmail && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.donorEmail}
                  </span>
                )}
              </div>

              {/* Amount of Endowment */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Amount of Endowment-कोषमा योगदान रकम*
                </label>
                <input
                  type="number"
                  name="amountOfEndowment"
                  value={formData.amountOfEndowment}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: formErrors.amountOfEndowment ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter endowment amount"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = formErrors.amountOfEndowment ? '#e53e3e' : '#e2e8f0'}
                />
                {formErrors.amountOfEndowment && (
                  <span style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    ⚠️ {formErrors.amountOfEndowment}
                  </span>
                )}
              </div>

              {/* Funding Plan */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Funding Plan -कोषमा योगदान सम्बन्धी योजना
                </label>
                <input
                  type="text"
                  name="fundingPlan"
                  value={formData.fundingPlan}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter funding plan"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Types of Endowment Plan */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Types of Endowment Plan
                </label>
                <input
                  type="text"
                  name="typesOfEndowmentPlan"
                  value={formData.typesOfEndowmentPlan}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter types of endowment plan"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Installments of Endowment */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Installments of Endowment-कोषमा योगदान किस्ता
                </label>
                <input
                  type="text"
                  name="installmentsOfEndowment"
                  value={formData.installmentsOfEndowment}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
                  }}
                  placeholder="Enter installments details"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Full-width text areas */}
              {/* <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Reporting Address
                </label>
                <textarea
                  name="reportingAddress"
                  value={formData.reportingAddress}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc',
                    resize: 'vertical'
                  }}
                  placeholder="Enter reporting address"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div> */}

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Terms of Endowment Fund
                </label>
                <textarea
                  name="termsOfEndowmentFund"
                  value={formData.termsOfEndowmentFund}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc',
                    resize: 'vertical'
                  }}
                  placeholder="Enter terms of endowment fund"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Purpose of Using Endowment Returns - क्ष्य तथा उद्देश्य
                </label>
                <textarea
                  name="purposeOfUsingEndowmentReturns"
                  value={formData.purposeOfUsingEndowmentReturns}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc',
                    resize: 'vertical'
                  }}
                  placeholder="Enter purpose of using endowment returns"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Photo Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Donor Photo
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
                        handleImageFileChange({ target: { files } } as any);
                      }
                    }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
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
                        {selectedFile ? 'Image selected: ' + selectedFile.name : 'Click to upload image or drag and drop'}
                      </p>
                      <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
                        PNG, JPG, GIF up to 5MB
                      </p>
                      {uploading && (
                        <div style={{ marginTop: '15px', color: '#667eea', fontWeight: '600' }}>
                          ⏳ Uploading image...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Image Preview */}
                  {(imagePreview || formData.photo) && (
                    <div style={{ textAlign: 'center', minWidth: '200px' }}>
                      <p style={{ marginBottom: '10px', fontWeight: '600', color: '#4a5568' }}>Photo Preview:</p>
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

              {/* PDF Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>
                  Endowment Details PDF
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
                        handlePdfFileChange({ target: { files } } as any);
                      }
                    }}
                    >
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handlePdfFileChange}
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
                      <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#a0aec0' }}>📄</div>
                      <p style={{ margin: '0 0 10px 0', color: '#4a5568', fontWeight: '600' }}>
                        {selectedPdfFile ? 'PDF selected: ' + selectedPdfFile.name : 'Click to upload endowment details PDF or drag and drop'}
                      </p>
                      <p style={{ margin: 0, color: '#718096', fontSize: '13px' }}>
                        PDF up to 10MB
                      </p>
                      {uploadingPdf && (
                        <div style={{ marginTop: '15px', color: '#667eea', fontWeight: '600' }}>
                          ⏳ Uploading PDF...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* PDF Preview */}
                  {(pdfPreview || formData.endowmentDetailsPdf) && (
                    <div style={{ textAlign: 'center', minWidth: '200px' }}>
                      <p style={{ marginBottom: '10px', fontWeight: '600', color: '#4a5568' }}>PDF Preview:</p>
                      <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        background: '#f7fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px', color: '#e53e3e' }}>📄</div>
                        <p style={{ 
                          margin: '0 0 5px 0', 
                          color: '#2d3748', 
                          fontWeight: '600',
                          fontSize: '14px',
                          textAlign: 'center'
                        }}>
                          Endowment Details PDF
                        </p>
                        <p style={{ 
                          margin: '0 0 15px 0', 
                          color: '#718096', 
                          fontSize: '12px',
                          textAlign: 'center'
                        }}>
                          {selectedPdfFile?.name || 'Document.pdf'}
                        </p>
                        <button
                          onClick={() => openPdfInNewTab(pdfPreview || formData.endowmentDetailsPdf!)}
                          style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          👁️ View PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={loading || uploading || uploadingPdf}
                style={{
                  padding: '16px 40px',
                  background: loading || uploading || uploadingPdf ? '#a0aec0' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading || uploading || uploadingPdf ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  minWidth: '180px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!loading && !uploading && !uploadingPdf) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && !uploading && !uploadingPdf) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? '⏳ Saving...' : uploading ? '📤 Uploading Image...' : uploadingPdf ? '📤 Uploading PDF...' : editingId ? '💾 Update Donor' : '🚀 Create Donor'}
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
          <div style={{ fontSize: '18px', color: '#4a5568', fontWeight: '600' }}>Loading donors...</div>
        </div>
      )}

      {/* Donors Grid */}
      {!loading && donors.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
          {donors.map((donor, index) => (
            <div
              key={donor._id}
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
              {/* Header with badge and nature */}
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
                  {donor.natureOfEndowment}
                </span>
              </div>

              {/* Photo */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={donor.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={donor.donorName}
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

              {/* Donor Name */}
              <h3 style={{ 
                color: '#2d3748', 
                marginBottom: '15px', 
                fontSize: '22px', 
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {donor.donorName}
              </h3>

              {/* Details */}
              <div style={{ color: '#4a5568', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏦 Fund:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{donor?.fundOfficialName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏛️ Department:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{donor?.relatedDepart}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     Principal Amount:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>NPR{donor?.principalAmountOfEndowment?.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                  <strong style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📅 Agreement Date:
                  </strong>
                  <span style={{ textAlign: 'right', fontWeight: '500' }}>{new Date(donor?.agreementDate).toLocaleDateString()}</span>
                </div>
                
                {/* PDF Document */}
                {donor.endowmentDetailsPdf && (
                  <div style={{ 
                    marginTop: '15px', 
                    padding: '12px',
                    backgroundColor: '#f7fafc',
                    borderRadius: '10px',
                    border: '2px dashed #cbd5e0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.5rem' }}>📄</span>
                      <strong style={{ color: '#2d3748', fontSize: '14px' }}>Endowment Details:</strong>
                    </div>
                    <button
                      onClick={() => openPdfInNewTab(donor.endowmentDetailsPdf!)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      👁️ View Endowment Details PDF
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleEdit(donor)}
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
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(donor._id!)}
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
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && donors.length === 0 && (
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
          <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.8rem', fontWeight: 'bold' }}>No donors found</h3>
          <p style={{ color: '#718096', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px' }}>
            {searchTerm || filterNature || filterDepartment 
              ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
              : 'Get started by adding your first donor to the system.'
            }
          </p>
          {(searchTerm || filterNature || filterDepartment) ? (
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
                background: 'black',
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
              + Add Your First Donor
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {donors.length > 0 && (
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
            disabled={donors.length < itemsPerPage}
            style={{
              padding: '14px 24px',
              backgroundColor: donors.length < itemsPerPage ? '#cbd5e0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: donors.length < itemsPerPage ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (donors.length >= itemsPerPage) {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (donors.length >= itemsPerPage) {
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

export default AdminForDonor;