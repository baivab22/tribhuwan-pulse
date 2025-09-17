import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Camera, Upload, X, ImageIcon, Video, FileText, User, Mail, Lock, Eye, EyeOff, Building, AlertCircle } from 'lucide-react';
import { createSuggestionWithMedia, getDepartments, register, login as apiLogin, Department } from '@/lib/api';

const categories = ['academic', 'administrative', 'infrastructure', 'other'];
const roles = ['student', 'teacher', 'staff', 'alumni', 'admin'];

type MediaPreview = { file: File; url: string; kind: 'image' | 'video' };

export default function SubmitPage() {
  const [category, setCategory] = useState('academic');
  const [description, setDescription] = useState('');
  const [assignedToDepartment, setAssignedToDepartment] = useState('none');
  const [anonymous, setAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [error, setError] = useState(null);

  // Department state
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(false);
  const [departmentsError, setDepartmentsError] = useState<string | null>(null);

  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [adminCode, setAdminCode] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Media state
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load departments on component mount
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setDepartmentsLoading(true);
    setDepartmentsError(null);
    try {
      const response = await getDepartments();
      setDepartments(response.departments || []);
    } catch (error) {
      console.error('Failed to load departments:', error);
      setDepartmentsError('Failed to load departments. Using default options.');
      // Fallback to empty array - user can still submit without department selection
      setDepartments([]);
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log('assignedToDepartment state changed:', assignedToDepartment);
  }, [assignedToDepartment]);

  useEffect(() => {
    const list = files.map((f) => {
      const url = URL.createObjectURL(f);
      const kind = f.type.startsWith('image/') ? 'image' : 'video';
      return { file: f, url, kind };
    });
    setPreviews(list);
    return () => {
      list.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [files]);

  const startCamera = async () => {
    try {
      setError(null);
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      // Request camera access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile if available
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
        setShowCamera(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      let errorMessage = 'Camera access failed. ';
      
      if (err.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera access and try again.';
      } else if (err.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported in this browser.';
      } else if (err.name === 'NotReadableError') {
        errorMessage += 'Camera is being used by another application.';
      } else {
        errorMessage += err.message || 'Unknown error occurred.';
      }
      
      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera not ready for capture');
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    if (canvas.width === 0 || canvas.height === 0) {
      setError('Video not ready. Please wait a moment and try again.');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob with good quality
    canvas.toBlob((blob) => {
      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const file = new File([blob], `camera-photo-${timestamp}.jpg`, { 
          type: 'image/jpeg' 
        });
        
        // Add the captured photo to files (max 5 total)
        setFiles(prev => {
          const newFiles = [...prev, file];
          return newFiles.slice(-5); // Keep only last 5 files
        });
        
        setError(null);
        // Don't stop camera immediately, let user take multiple photos if needed
      } else {
        setError('Failed to capture photo. Please try again.');
      }
    }, 'image/jpeg', 0.9);
  };

  function onFileChange(e) {
    const selected = Array.from(e.target.files || []);
    const filtered = selected.filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
    const limited = filtered.slice(0, 5);
    setFiles(prev => [...prev, ...limited].slice(0, 5));
  }

  function removeFile(idx) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function onAuth() {
    setLoginLoading(true);
    setError(null);
    try {
      if (authMode === 'login') {
        const res = await apiLogin(email, password);
        setUser(res.user);
      } else {
        const res = await register(name, email, password, role);
        setUser(res.user);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoginLoading(false);
    }
  }

  // Handle department change with debugging
  const handleDepartmentChange = useCallback((value) => {
    console.log('Department changing from', assignedToDepartment, 'to', value);
    setAssignedToDepartment(value);
  }, [assignedToDepartment]);

  // Use useCallback to ensure we capture the latest state values
  const onSubmit = useCallback(async () => {
    console.log('onSubmit called with assignedToDepartment:', assignedToDepartment);
    console.log('Current state values:', { category, description, assignedToDepartment, anonymous });
    
    setSubmitting(true);
    setError(null);
    setSuccessId(null);
    
    try {
      const form = new FormData();
      form.append('category', category);
      form.append('description', description);
      form.append('anonymous', String(anonymous));
      
      // Handle assignedToDepartment - only append if it has a value and is not 'none'
      if (assignedToDepartment && assignedToDepartment !== 'none' && assignedToDepartment.trim() !== '') {
        console.log('Appending assignedDepartment:', assignedToDepartment);
        form.append('assignedDepartment', assignedToDepartment);
      } else {
        console.log('Not appending assignedDepartment - value is:', assignedToDepartment);
      }
      
      // Append files
      files.forEach((f) => form.append('media', f, f.name));
      
      // Debug: Log all form data
      console.log('FormData contents:');
      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }
      
      const res = await createSuggestionWithMedia(form);
      const id = (res.suggestion._id || res.suggestion.id);
      setSuccessId(id);
      
      // Reset form
      setDescription('');
      setAssignedToDepartment('none');
      setFiles([]);
      
      if (!anonymous) {
        // navigate('/'); // optional: take them home
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Submit failed';
      setError(msg);
      console.error('Submit error:', e);
    } finally {
      setSubmitting(false);
    }
  }, [category, description, assignedToDepartment, anonymous, files]);

  const needLogin = !anonymous && !user;
  const canSubmit = !!category && !!description && (!needLogin) && !submitting;

  const mediaHint = useMemo(
    () => 'You can attach up to 5 files (images or videos), max 15MB each.',
    []
  );

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'academic': return '📚';
      case 'administrative': return '🏢';
      case 'infrastructure': return '🏗️';
      default: return '💡';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Submit Suggestion
          </h1>
          <p className="text-gray-600 text-lg">Share your ideas to help improve our institution</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg p-2">
            <CardTitle className="text-xl flex items-center gap-2 px-2 py-3">
              <FileText className="w-5 h-5" />
              Suggestion Details
            </CardTitle>
            <CardDescription className="text-indigo-100 px-2">
              Provide category, description, and optional media attachments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c} className="hover:bg-indigo-50">
                        <span className="flex items-center gap-2">
                          {getCategoryIcon(c)} {c.charAt(0).toUpperCase() + c.slice(1)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="anon" className="text-gray-700 font-medium">Submission Type</Label>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Switch 
                    id="anon" 
                    checked={anonymous} 
                    onCheckedChange={setAnonymous}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {anonymous ? '🕶️ Anonymous' : '👤 Identified'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label className="text-gray-700 font-medium flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Assign to Department
                </Label>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Optional</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Suggest which department should handle this suggestion. Leave blank if unsure.
              </p>
              <div className="space-y-2">
                <Select 
                  value={assignedToDepartment} 
                  onValueChange={handleDepartmentChange}
                  disabled={departmentsLoading}
                >
                  <SelectTrigger className="border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder={
                      departmentsLoading 
                        ? "Loading departments..." 
                        : departments.length === 0 
                        ? "No departments available"
                        : "Select department (optional)"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No preference</SelectItem>
                    {departments.map((d) => (
                      <SelectItem key={d._id || d.id} value={d.name} className="hover:bg-indigo-50">
                        <div className="flex flex-col">
                          <span className="font-medium">{d.name}</span>
                          {d.description && (
                            <span className="text-xs text-gray-500 line-clamp-1">{d.description}</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Loading state */}
                {departmentsLoading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
                    Loading departments...
                  </div>
                )}

                {/* Error state with retry option */}
                {departmentsError && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 text-sm text-amber-800">
                      <p className="font-medium">Department loading issue</p>
                      <p className="text-amber-700">{departmentsError}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={loadDepartments}
                        className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        Retry loading departments
                      </Button>
                    </div>
                  </div>
                )}

                {/* Success state showing department count */}
                {!departmentsLoading && !departmentsError && departments.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {departments.length} departments available • Current: {assignedToDepartment === 'none' || !assignedToDepartment ? 'None selected' : assignedToDepartment}
                  </p>
                )}

                {/* No departments available */}
                {!departmentsLoading && !departmentsError && departments.length === 0 && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">
                      No departments are currently available. You can still submit your suggestion.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!anonymous && !user && (
              <div className="border-2 border-indigo-100 rounded-xl p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                <Tabs value={authMode} onValueChange={setAuthMode}>
                  <TabsList className="bg-white/70 backdrop-blur-sm">
                    <TabsTrigger value="login" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                      Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </Label>
                        <Input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="you@university.edu"
                          className="border-2 border-gray-200 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Password
                        </Label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-gray-200 focus:border-indigo-500 transition-colors pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={onAuth} 
                      disabled={loginLoading || !email || !password}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                    >
                      {loginLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </TabsContent>
                  <TabsContent value="register" className="space-y-4 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center gap-2">
                          <User className="w-4 h-4" /> Name
                        </Label>
                        <Input 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Your full name"
                          className="border-2 border-gray-200 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Role</Label>
                        <Select value={role} onValueChange={setRole}>
                          <SelectTrigger className="border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 transition-colors">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((r) => (
                              <SelectItem key={r} value={r} className="hover:bg-indigo-50">
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </Label>
                        <Input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="you@university.edu"
                          className="border-2 border-gray-200 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Password
                        </Label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-gray-200 focus:border-indigo-500 transition-colors pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={onAuth} 
                      disabled={loginLoading || !email || !password || !name}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                    >
                      {loginLoading ? 'Registering...' : 'Register'}
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Description</Label>
              <Textarea
                rows={6}
                placeholder="Describe your suggestion in detail. What problem does it solve? How would it improve things?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-gray-200 focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Label className="text-gray-700 font-medium">Media Attachments</Label>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Optional</Badge>
              </div>
              <p className="text-sm text-gray-600">{mediaHint}</p>
              
              <div className="flex gap-3 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={showCamera ? stopCamera : startCamera}
                  className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                  disabled={loginLoading}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {showCamera ? 'Stop Camera' : 'Open Camera'}
                </Button>
                {showCamera && (
                  <Button
                    type="button"
                    onClick={capturePhoto}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                )}
              </div>
              
              <Input 
                ref={fileInputRef}
                type="file" 
                accept="image/*,video/*" 
                multiple 
                onChange={onFileChange} 
                className="hidden"
              />

              {showCamera && (
                <div className="relative bg-black rounded-lg overflow-hidden border-2 border-purple-200">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    muted
                    className="w-full max-h-80 object-cover"
                    onError={() => setError('Camera video failed to load')}
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      size="sm"
                      className="bg-black/50 border-white/30 text-white hover:bg-black/70"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-center">
                      <p className="text-white/80 text-sm mb-3">
                        Position your subject and click "Take Photo"
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <canvas ref={canvasRef} className="hidden" />

              {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {previews.map((p, idx) => (
                    <div key={idx} className="relative group bg-white rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {p.kind === 'image' ? (
                        <div className="relative">
                          <img src={p.url} alt={p.file.name} className="w-full h-32 object-cover" />
                          <div className="absolute top-1 left-1">
                            <Badge className="bg-green-500 text-white">
                              <ImageIcon className="w-3 h-3 mr-1" />
                              Image
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <video src={p.url} className="w-full h-32 object-cover" />
                          <div className="absolute top-1 left-1">
                            <Badge className="bg-blue-500 text-white">
                              <Video className="w-3 h-3 mr-1" />
                              Video
                            </Badge>
                          </div>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <div className="p-2 bg-gray-50">
                        <p className="text-xs text-gray-600 truncate font-medium">{p.file.name}</p>
                        <p className="text-xs text-gray-400">{(p.file.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">❌ {error}</p>
                {error.includes('camera access') && (
                  <div className="mt-2 text-xs text-red-500">
                    <p>💡 <strong>Tips to fix camera issues:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Make sure you clicked "Allow" when prompted for camera access</li>
                      <li>Check if another app is using your camera</li>
                      <li>Try refreshing the page and allowing camera access again</li>
                      <li>Ensure you're using HTTPS (camera requires secure connection)</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {successId && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  ✅ Suggestion submitted successfully! ID: <span className="font-mono">{successId}</span>
                </p>
                <p className="text-sm text-green-600 mt-1">
                  You can track your suggestion status using this ID.
                </p>
              </div>
            )}

            {/* User info display when logged in */}
            {!anonymous && user && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                  <User className="w-4 h-4" />
                  Logged in as: {user.name} ({user.role})
                </div>
                <p className="text-xs text-green-600 mt-1">
                  This suggestion will be submitted under your account.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={onSubmit} 
                disabled={!canSubmit}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Suggestion'
                )}
              </Button>
              
              {/* Form validation feedback */}
              {!canSubmit && !submitting && (
                <div className="flex items-center text-sm text-gray-500">
                  {!category && "Please select a category. "}
                  {!description && "Please provide a description. "}
                  {needLogin && "Please login to submit non-anonymous suggestions."}
                </div>
              )}
            </div>

            {/* Submission guidelines */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Submission Guidelines</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be specific and constructive in your description</li>
                <li>• Focus on actionable improvements</li>
                <li>• Respect others and maintain professionalism</li>
                <li>• Avoid submitting duplicate suggestions</li>
                {departments.length > 0 && (
                  <li>• Selecting a department helps route your suggestion appropriately</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}