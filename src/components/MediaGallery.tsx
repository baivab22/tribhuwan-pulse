import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image, Video, Plus, Trash2, Eye } from 'lucide-react';
import { BuildingMedia } from '@/lib/formData';

interface MediaGalleryProps {
  media: BuildingMedia | undefined;
  onAddMedia: (type: 'image' | 'video', url: string, caption: string, duration?: string, thumbnail?: string) => void;
  onDeleteMedia: (type: 'images' | 'videos', index: number) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  onAddMedia,
  onDeleteMedia
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<{ url: string; caption: string; type: 'image' | 'video' } | null>(null);

  const handleAddMedia = () => {
    if (!url) return;
    
    onAddMedia(mediaType, url, caption, duration, thumbnail);
    
    // Reset form
    setUrl('');
    setCaption('');
    setDuration('');
    setThumbnail('');
    setIsDialogOpen(false);
  };

  const handlePreview = (url: string, caption: string, type: 'image' | 'video') => {
    setPreviewMedia({ url, caption, type });
    setPreviewOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h4 className="font-medium text-gray-900">Building Media</h4>
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-xs">
              <Image className="h-3 w-3 mr-1" />
              {media?.images?.length || 0} Images
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Video className="h-3 w-3 mr-1" />
              {media?.videos?.length || 0} Videos
            </Badge>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMediaType('image')}
                className="hover:bg-blue-50 hover:border-blue-200"
              >
                <Image className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {mediaType === 'image' ? <Image className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  <span>Add {mediaType === 'image' ? 'Image' : 'Video'}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant={mediaType === 'image' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMediaType('image')}
                  >
                    <Image className="h-4 w-4 mr-1" />
                    Image
                  </Button>
                  <Button
                    variant={mediaType === 'video' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMediaType('video')}
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor="media-url">Media URL *</Label>
                  <Input
                    id="media-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter the URL of the media"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="media-caption">Caption</Label>
                  <Textarea
                    id="media-caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Enter a caption for this media"
                    className="mt-1"
                    rows={2}
                  />
                </div>
                
                {mediaType === 'video' && (
                  <>
                    <div>
                      <Label htmlFor="duration">Duration (seconds)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Duration in seconds"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="thumbnail">Thumbnail URL</Label>
                      <Input
                        id="thumbnail"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        placeholder="Thumbnail image URL"
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMedia} disabled={!url}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Media
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setMediaType('video');
              setIsDialogOpen(true);
            }}
            className="hover:bg-purple-50 hover:border-purple-200"
          >
            <Video className="h-4 w-4 mr-1" />
            Add Video
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      {media?.images && media.images.length > 0 && (
        <div>
          <h5 className="font-medium text-sm text-gray-700 mb-2">Images</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {media.images.map((img, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-md transition-all">
                <div className="relative">
                  <img
                    src={img.url}
                    alt={img.caption || 'Building image'}
                    className="w-full h-24 object-cover cursor-pointer"
                    onClick={() => handlePreview(img.url, img.caption, 'image')}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePreview(img.url, img.caption, 'image')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => onDeleteMedia('images', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {img.caption && (
                  <CardContent className="p-2">
                    <p className="text-xs text-gray-600 truncate">{img.caption}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {media?.videos && media.videos.length > 0 && (
        <div>
          <h5 className="font-medium text-sm text-gray-700 mb-2">Videos</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {media.videos.map((vid, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-md transition-all">
                <div className="relative">
                  {vid.thumbnail ? (
                    <img
                      src={vid.thumbnail}
                      alt={vid.caption || 'Video thumbnail'}
                      className="w-full h-32 object-cover cursor-pointer"
                      onClick={() => handlePreview(vid.url, vid.caption, 'video')}
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center cursor-pointer"
                         onClick={() => handlePreview(vid.url, vid.caption, 'video')}>
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePreview(vid.url, vid.caption, 'video')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => onDeleteMedia('videos', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{vid.caption || 'No caption'}</p>
                  {vid.duration && (
                    <p className="text-xs text-gray-500 mt-1">Duration: {vid.duration}s</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewMedia?.caption || 'Media Preview'}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            {previewMedia?.type === 'image' ? (
              <img 
                src={previewMedia.url} 
                alt={previewMedia.caption} 
                className="max-w-full max-h-96 object-contain rounded-lg" 
              />
            ) : (
              <video 
                src={previewMedia?.url} 
                controls 
                className="max-w-full max-h-96 rounded-lg" 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};