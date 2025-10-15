import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Image as ImageIcon,
  Visibility as EyeIcon,
  Description as FileTextIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';

const FinancialDocumentsSection = ({ selectedCollege }) => {
  const [selectedImage, setSelectedImage] = useState<{url: string; filename: string} | null>(null);
  const [zoom, setZoom] = useState<number>(100);

  console.log(selectedImage, "selected image value");

  const handleFileView = (url: string, filename: string) => {
    setSelectedImage({ url, filename });
    setZoom(100);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setZoom(100);
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage.url;
      link.download = selectedImage.filename;
      link.click();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4">
            {selectedCollege.financialStatus?.attachments?.auditedFinancialStatements && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <FileTextIcon className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">
                      {selectedCollege.financialStatus.attachments.auditedFinancialStatementsFilename || 'Audited Financial Statements'}
                    </div>
                    <div className="text-sm text-green-600">Financial audit report</div>
                  </div>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => handleFileView(
                    selectedCollege.financialStatus!.attachments.auditedFinancialStatements!,
                    selectedCollege.financialStatus!.attachments.auditedFinancialStatementsFilename || 'audited_financial_statements.jpg'
                  )}
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            )}

            {selectedCollege.financialStatus?.attachments?.budgetCopy && (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <FileTextIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      {selectedCollege.financialStatus.attachments.budgetCopyFilename || 'Budget Copy'}
                    </div>
                    <div className="text-sm text-blue-600">Annual budget document</div>
                  </div>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => handleFileView(
                    selectedCollege.financialStatus!.attachments.budgetCopy!,
                    selectedCollege.financialStatus!.attachments.budgetCopyFilename || 'budget_copy.jpg'
                  )}
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            )}

            {!selectedCollege.financialStatus?.attachments?.auditedFinancialStatements && 
             !selectedCollege.financialStatus?.attachments?.budgetCopy && (
              <div className="text-center py-8 text-gray-500">
                <FileTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No financial documents available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Image Viewer Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseImage}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            height: '90vh'
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {selectedImage?.filename}
            </Typography>
            <IconButton onClick={handleCloseImage}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Image Controls */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<ZoomOutIcon />}
                  onClick={handleZoomOut}
                  disabled={zoom <= 50}
                  size="small"
                >
                  Zoom Out
                </Button>
                
                <Typography variant="body2" fontWeight="medium">
                  {zoom}%
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<ZoomInIcon />}
                  onClick={handleZoomIn}
                  disabled={zoom >= 200}
                  size="small"
                >
                  Zoom In
                </Button>

                <Button
                  variant="text"
                  onClick={handleResetZoom}
                  size="small"
                >
                  Reset
                </Button>
              </Box>

              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                size="small"
              >
                Download
              </Button>
            </Box>
          </Box>

          {/* Image Content */}
          <Box 
            sx={{ 
              flex: 1, 
              overflow: 'auto', 
              p: 2, 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'grey.100'
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage.url}
                alt={selectedImage.filename}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: `${zoom}%`,
                  height: 'auto',
                  objectFit: 'contain',
                  transition: 'width 0.2s ease'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const errorBox = target.nextElementSibling as HTMLElement;
                  if (errorBox) errorBox.style.display = 'block';
                }}
              />
            ) : null}
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                display: 'none'
              }}
              className="error-message"
            >
              <ImageIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
              <Typography variant="h6" color="error.main" gutterBottom>
                Failed to load image
              </Typography>
              <Button
                variant="outlined"
                onClick={handleDownload}
              >
                Download Instead
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinancialDocumentsSection;