import React, { useState } from 'react';
import { X, Link2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const ImageUploadDialog = ({ isOpen, onClose, onImageSelect, currentImage }) => {
  const [selectedImage, setSelectedImage] = useState(currentImage || null);
  const [imageUrl, setImageUrl] = useState(currentImage?.url || '');
  const [altText, setAltText] = useState(currentImage?.alt || 'Mobirise Website Builder');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgData = {
        url: e.target.result,
        file: file,
        name: file.name
      };
      setSelectedImage(imgData);
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOk = () => {
    if (onImageSelect && selectedImage) {
      onImageSelect({
        url: imageUrl,
        alt: altText,
        ...selectedImage
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Imagine Media</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="computer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-700">
            <TabsTrigger value="computer" className="data-[state=active]:bg-gray-600">
              Navigheză în Calculator
            </TabsTrigger>
            <TabsTrigger value="free" className="data-[state=active]:bg-gray-600">
              Bibliotecă Online Gratis
            </TabsTrigger>
            <TabsTrigger value="site" className="data-[state=active]:bg-gray-600">
              Bibliotecă Site
            </TabsTrigger>
          </TabsList>

          <TabsContent value="computer" className="mt-6">
            <div className="space-y-6">
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-600 bg-gray-700/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-5xl mb-4">📁</div>
                <p className="text-xl mb-2">Drop images here</p>
                <p className="text-gray-400 mb-6">or</p>
                <label htmlFor="file-upload">
                  <Button 
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    NAVIGHEAZĂ ÎN CALCULATOR
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </div>

              {/* Selected Image Section */}
              {selectedImage && (
                <div className="border border-gray-600 rounded-lg p-6 bg-gray-700/50">
                  <div className="flex items-start gap-6">
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                      <Label className="text-sm font-semibold mb-2 flex items-center gap-2">
                        Imagine Selectată
                        <button className="text-indigo-400 hover:text-indigo-300">
                          <Link2 className="w-4 h-4" />
                        </button>
                      </Label>
                      <div className="w-32 h-32 bg-gray-600 rounded-lg overflow-hidden flex items-center justify-center">
                        <img 
                          src={imageUrl} 
                          alt="Preview" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Image Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <Label className="text-sm mb-2 block">Leagă Imaginea de</Label>
                        <div className="flex gap-2">
                          <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://mobiri.se"
                            className="flex-1 bg-gray-600 border-gray-500 text-white"
                          />
                          <Button 
                            variant="outline" 
                            className="border-gray-500 hover:bg-gray-600"
                          >
                            EDITEAZĂ LEGĂTURA
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block">Alt</Label>
                        <Input
                          value={altText}
                          onChange={(e) => setAltText(e.target.value)}
                          placeholder="Mobirise Website Builder"
                          className="bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="free" className="mt-6">
            <div className="text-center py-12 text-gray-400">
              <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Bibliotecă Online Gratis - În curând</p>
            </div>
          </TabsContent>

          <TabsContent value="site" className="mt-6">
            <div className="text-center py-12 text-gray-400">
              <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Bibliotecă Site - În curând</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-500 hover:bg-gray-700"
          >
            ANULEAZĂ
          </Button>
          <Button
            onClick={handleOk}
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={!selectedImage}
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
