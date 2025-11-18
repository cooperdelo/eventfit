'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * ImageUploader component
 * Reference: Reference 5 (Instagram Settings) - Image upload pattern
 * Visual Requirements:
 * - Drag & drop area with dashed border
 * - Preview thumbnails grid
 * - Max images limit
 * - Remove image button
 */
export interface ImageUploaderProps {
  maxImages?: number;
  images: File[];
  onImagesChange: (images: File[]) => void;
  previewUrls?: string[];
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxImages = 5,
  images,
  onImagesChange,
  previewUrls = [],
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  // Generate preview URLs from files
  React.useEffect(() => {
    const newPreviews: string[] = [];
    images.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === images.length) {
            setPreviews(newPreviews);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }, [images]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    const totalFiles = images.length + newFiles.length;

    if (totalFiles > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    onImagesChange([...images, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const displayPreviews = previewUrls.length > 0 ? previewUrls : previews;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drag & Drop Area */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors',
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          )}
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm font-medium text-text-primary mb-1">
            Drag & drop images here, or click to upload
          </p>
          <p className="text-xs text-text-secondary">Up to {maxImages} images (PNG, JPG, WEBP)</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            aria-label="Upload images"
          />
        </div>
      )}

      {/* Preview Grid */}
      {displayPreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayPreviews.map((preview, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="h-4 w-4 text-white" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-xs text-white">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image Count */}
      {images.length > 0 && (
        <p className="text-xs text-text-tertiary text-center">
          {images.length} of {maxImages} images
        </p>
      )}
    </div>
  );
};
