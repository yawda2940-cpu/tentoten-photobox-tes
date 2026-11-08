import React from 'react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  description?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  description,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fff8f0] border-2 border-[#1f1b11] rounded-2xl max-w-2xl w-full p-4 md:p-6 shadow-[8px_8px_0px_#1f1b11] relative flex flex-col gap-4 animate-in zoom-in-95 duration-150"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-3 w-8 h-8 rounded-full border border-[#1f1b11] bg-[#f6eddc] flex items-center justify-center text-[#1f1b11] hover:bg-[#eae2d1] transition-colors cursor-pointer z-10"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="w-full bg-[#f6eddc] rounded-xl overflow-hidden border-2 border-[#1f1b11] shadow-[2px_2px_0px_#1f1b11] max-h-[70vh] flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        <div className="flex flex-col gap-1 px-1">
          <span className="font-label-badge text-[10px] text-[#960011] uppercase tracking-widest font-bold">
            TENTOTEN 35MM ANALOG
          </span>
          <h4 className="font-headline-sm text-lg uppercase font-bold text-[#1f1b11]">
            {title}
          </h4>
          {description && (
            <p className="font-body-sm text-xs text-[#5c403d] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
