import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  Camera,
  Database,
  Edit3,
  Search,
  Calendar,
  Check,
  Car,
  AlertCircle,
} from 'lucide-react';
import {
  ScannedCarEntry,
  CustomCarItem,
  CorrectionEntry,
  getScannedCarsHistory,
  deleteScannedCar,
  getCustomCarsList,
  deleteCustomCar,
  getCorrectionsList,
  deleteCorrectionEntry,
} from '../data/userDataStorage';
import { normalizeSearchText } from '../utils/textUtils';

export type UserDataTab = 'scanned' | 'custom' | 'edits';

interface UserDataManagerModalProps {
  isOpen: boolean;
  initialTab?: UserDataTab;
  onClose: () => void;
  onDataChanged: () => void;
}

export function UserDataManagerModal({
  isOpen,
  initialTab = 'scanned',
  onClose,
  onDataChanged,
}: UserDataManagerModalProps) {
  const [activeTab, setActiveTab] = useState<UserDataTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Data lists
  const [scannedList, setScannedList] = useState<ScannedCarEntry[]>([]);
  const [customList, setCustomList] = useState<CustomCarItem[]>([]);
  const [correctionsList, setCorrectionsList] = useState<CorrectionEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery('');
      loadAllData();
    }
  }, [isOpen, initialTab]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      // 1. Scanned
      const scans = getScannedCarsHistory();
      setScannedList(scans);

      // 2. Custom cars
      const customs = await getCustomCarsList();
      setCustomList(customs);

      // 3. Corrections / Edits
      const corrections = await getCorrectionsList();
      setCorrectionsList(corrections);
    } catch (err) {
      console.warn('Error loading user data lists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 2500);
  };

  // Delete handlers
  const handleDeleteScanned = (id: string, name: string) => {
    setDeletingId(id);
    try {
      const updated = deleteScannedCar(id);
      setScannedList(updated);
      showNotification(`Deleted "${name}" from scan history.`);
      onDataChanged();
    } catch (err) {
      console.error('Failed to delete scanned car:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCustom = async (id: string, fullName: string) => {
    setDeletingId(id);
    try {
      await deleteCustomCar(id, fullName);
      setCustomList((prev) => prev.filter((c) => c.id !== id && c.fullName !== fullName));
      showNotification(`Deleted "${fullName}" from custom database.`);
      onDataChanged();
    } catch (err) {
      console.error('Failed to delete custom car:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCorrection = async (id: string, correctionName?: string) => {
    setDeletingId(id);
    try {
      await deleteCorrectionEntry(id, correctionName);
      setCorrectionsList((prev) => prev.filter((c) => c.id !== id));
      if (correctionName) {
        setCustomList((prev) => prev.filter((c) => c.fullName.toLowerCase() !== correctionName.toLowerCase()));
      }
      showNotification(`Permanently deleted edit correction "${correctionName || id}".`);
      onDataChanged();
    } catch (err) {
      console.error('Failed to delete correction:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  // Filtered lists based on search
  const q = normalizeSearchText(searchQuery);

  const filteredScanned = scannedList.filter((item) => {
    if (!q) return true;
    return (
      normalizeSearchText(item.carName).includes(q) ||
      (item.make && normalizeSearchText(item.make).includes(q)) ||
      (item.model && normalizeSearchText(item.model).includes(q)) ||
      (item.yearRange && normalizeSearchText(item.yearRange).includes(q))
    );
  });

  const filteredCustom = customList.filter((item) => {
    if (!q) return true;
    return (
      normalizeSearchText(item.fullName).includes(q) ||
      normalizeSearchText(item.make).includes(q) ||
      normalizeSearchText(item.model).includes(q) ||
      (item.category && normalizeSearchText(item.category).includes(q))
    );
  });

  const filteredCorrections = correctionsList.filter((item) => {
    if (!q) return true;
    return (
      (item.userCorrection && normalizeSearchText(item.userCorrection).includes(q)) ||
      normalizeSearchText(item.aiIdentifiedFull).includes(q)
    );
  });

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Recent';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>Manage User Data</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Inspect your entries and delete individual items
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 p-1.5 gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('scanned');
              setSearchQuery('');
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'scanned'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scanned</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'scanned'
                  ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                  : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {scannedList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('custom');
              setSearchQuery('');
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'custom'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Custom</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'custom'
                  ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                  : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {customList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('edits');
              setSearchQuery('');
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'edits'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edits</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'edits'
                  ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                  : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {correctionsList.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'scanned'
                  ? 'Search scanned cars...'
                  : activeTab === 'custom'
                  ? 'Search custom cars...'
                  : 'Search corrections or edits...'
              }
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Status Toast / Notification */}
        {statusMessage && (
          <div className="mx-4 mt-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs animate-in fade-in">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs">
          {isLoading ? (
            <div className="text-center py-10 text-zinc-400 dark:text-zinc-500 text-xs">
              Loading entries...
            </div>
          ) : activeTab === 'scanned' ? (
            filteredScanned.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Camera className="w-8 h-8 mx-auto text-zinc-300 dark:text-zinc-600" />
                <p className="text-zinc-600 dark:text-zinc-300 font-medium">No scanned cars found</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-[11px] max-w-xs mx-auto">
                  {searchQuery
                    ? 'No scans match your search query.'
                    : 'Cars you scan with the camera or photo upload will appear here.'}
                </p>
              </div>
            ) : (
              filteredScanned.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between gap-3 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail or icon */}
                    <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-700/60 overflow-hidden flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-zinc-700">
                      {item.imageThumbnail ? (
                        <img
                          src={item.imageThumbnail}
                          alt={item.carName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Car className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {item.carName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {item.yearRange && item.yearRange !== 'N/A' && (
                          <span className="px-1.5 py-0.2 bg-zinc-200/60 dark:bg-zinc-700/60 rounded text-[10px]">
                            {item.yearRange}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-400" />
                          <span>{formatDate(item.scannedAt)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    title="Delete this scanned car"
                    disabled={deletingId === item.id}
                    onClick={() => handleDeleteScanned(item.id, item.carName)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )
          ) : activeTab === 'custom' ? (
            filteredCustom.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Database className="w-8 h-8 mx-auto text-zinc-300 dark:text-zinc-600" />
                <p className="text-zinc-600 dark:text-zinc-300 font-medium">No custom cars found</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-[11px] max-w-xs mx-auto">
                  {searchQuery
                    ? 'No custom cars match your search.'
                    : 'When you tap "Can\'t find your car? Enter it here" in the scanner, custom models are saved here.'}
                </p>
              </div>
            ) : (
              filteredCustom.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between gap-3 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {item.fullName}
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium border border-blue-200/60 dark:border-blue-800/50">
                        {item.category || 'User Added'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>Make: {item.make || 'Custom'}</span>
                      <span>&bull;</span>
                      <span>Model: {item.model || item.fullName}</span>
                      <span>&bull;</span>
                      <span>{formatDate(item.addedAt)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    title="Delete custom model from database"
                    disabled={deletingId === item.id}
                    onClick={() => handleDeleteCustom(item.id, item.fullName)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )
          ) : (
            // Edits / Corrections Tab
            filteredCorrections.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Edit3 className="w-8 h-8 mx-auto text-zinc-300 dark:text-zinc-600" />
                <p className="text-zinc-600 dark:text-zinc-300 font-medium">No name corrections found</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-[11px] max-w-xs mx-auto">
                  {searchQuery
                    ? 'No name edits match your search.'
                    : 'When you correct an identified car name in the scanner ("Got it wrong?"), your corrections appear here.'}
                </p>
              </div>
            ) : (
              filteredCorrections.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between gap-3 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-zinc-500 dark:text-zinc-400 line-through text-[11px] truncate">
                        {item.aiIdentifiedFull}
                      </span>
                      <span className="text-zinc-400 text-[10px]">&rarr;</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                        {item.userCorrection}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    title="Delete this correction entry"
                    disabled={deletingId === item.id}
                    onClick={() => handleDeleteCorrection(item.id, item.userCorrection)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Deleting an entry removes it from that list and recalculates counts.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
