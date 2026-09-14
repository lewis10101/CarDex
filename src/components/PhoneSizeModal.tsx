import React from 'react';
import { X, Check, Smartphone } from 'lucide-react';
import { PhonePresetId } from '../types';
import { PHONE_PRESETS } from '../constants/phonePresets';

interface PhoneSizeModalProps {
  isOpen: boolean;
  activePresetId: PhonePresetId;
  onSelectPreset: (presetId: PhonePresetId) => void;
  onClose: () => void;
}

export function PhoneSizeModal({
  isOpen,
  activePresetId,
  onSelectPreset,
  onClose,
}: PhoneSizeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-zinc-600 dark:text-zinc-400" strokeWidth={1.5} />
            <div>
              <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Phone Specifications
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Resize viewport to match device specs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Preset List */}
        <div className="space-y-1 max-h-[60vh] overflow-y-auto">
          {PHONE_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  onSelectPreset(preset.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-colors ${
                  isSelected
                    ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-200 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div>
                  <p className="text-xs font-medium">{preset.name}</p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    {preset.description}
                  </p>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" strokeWidth={1.5} />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors text-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
