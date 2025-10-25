import React, { useState, useEffect } from 'react';
import { X, Upload, Server } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';

export const FTPDialog = ({ blocks, isOpen, onClose }) => {
  const [publishType, setPublishType] = useState('ftp'); // 'local' or 'ftp'
  const [ftpConfig, setFtpConfig] = useState({
    host: '',
    port: '21',
    username: '',
    password: '',
    rootFolder: '/',
    publishOnlyChanges: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Load saved FTP config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('ftpConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setFtpConfig(prev => ({ ...prev, ...parsed, password: '' })); // Don't restore password
      } catch (e) {
        console.error('Error loading FTP config:', e);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFtpConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = () => {
    // Save config without password
    const { password, ...configToSave } = ftpConfig;
    localStorage.setItem('ftpConfig', JSON.stringify(configToSave));
    toast({
      title: 'Configurare salvată',
      description: 'Configurarea FTP a fost salvată cu succes'
    });
  };

  const handleUpload = async () => {
    // Validate inputs
    if (!ftpConfig.host || !ftpConfig.username || !ftpConfig.password) {
      toast({
        title: 'Eroare',
        description: 'Te rugăm să completezi toate câmpurile obligatorii',
        variant: 'destructive'
      });
      return;
    }

    if (blocks.length === 0) {
      toast({
        title: 'Eroare',
        description: 'Nu există blocuri de publicat',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL}/api/ftp/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ftpConfig,
          blocks
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Publicare reușită',
          description: `Site-ul a fost încărcat cu succes pe serverul FTP!`
        });
        handleSaveConfig();
        onClose();
      } else {
        throw new Error(result.detail || 'Eroare la încărcarea pe FTP');
      }
    } catch (error) {
      console.error('FTP upload error:', error);
      toast({
        title: 'Eroare la publicare',
        description: error.message || 'A apărut o eroare la încărcarea pe serverul FTP',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Publicare</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Publishing options */}
          <div className="space-y-3">
            <div 
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setPublishType('local')}
            >
              <input
                type="radio"
                name="publishType"
                value="local"
                checked={publishType === 'local'}
                onChange={() => setPublishType('local')}
                className="w-4 h-4 text-indigo-600"
              />
              <Label className="cursor-pointer">Dosar local în calculator</Label>
            </div>

            <div 
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setPublishType('ftp')}
            >
              <input
                type="radio"
                name="publishType"
                value="ftp"
                checked={publishType === 'ftp'}
                onChange={() => setPublishType('ftp')}
                className="w-4 h-4 text-indigo-600"
              />
              <Label className="cursor-pointer font-medium">FTP</Label>
            </div>
          </div>

          {/* FTP Configuration */}
          {publishType === 'ftp' && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="host" className="text-sm font-medium text-gray-700">
                  Server FTP *
                </Label>
                <Input
                  id="host"
                  type="text"
                  placeholder="ftp.example.com"
                  value={ftpConfig.host}
                  onChange={(e) => handleInputChange('host', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Utilizator *
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={ftpConfig.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Parolă *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={ftpConfig.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="port" className="text-sm font-medium text-gray-700">
                  Port
                </Label>
                <Input
                  id="port"
                  type="text"
                  placeholder="21"
                  value={ftpConfig.port}
                  onChange={(e) => handleInputChange('port', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="rootFolder" className="text-sm font-medium text-gray-700">
                  Dosar rădăcină
                </Label>
                <Input
                  id="rootFolder"
                  type="text"
                  placeholder="/"
                  value={ftpConfig.rootFolder}
                  onChange={(e) => handleInputChange('rootFolder', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="publishOnlyChanges"
                checked={ftpConfig.publishOnlyChanges}
                onChange={(e) => handleInputChange('publishOnlyChanges', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <Label htmlFor="publishOnlyChanges" className="text-sm text-gray-700 cursor-pointer">
                Publică doar schimbările
              </Label>
            </div>
          </div>
          )}

          {/* Local save message */}
          {publishType === 'local' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Salvare ca proiect local</strong>
              </p>
              <p className="text-sm text-blue-800">
                Proiectul va fi salvat în browser-ul tău. Poți continua să lucrezi la el oricând revii pe pagină. 
                Când este gata, îl poți publica prin FTP.
              </p>
            </div>
          )}

          {/* Info message */}
          {publishType === 'ftp' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                Pt a exporta proiectul site-ului, te rog utilizează "Site-uri → Setări Site"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
          >
            ANULEAZĂ
          </Button>
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Se încarcă...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                PUBLICARE
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
