import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  Layers,
  Car,
  CheckCircle2,
  Camera,
  Star,
  Sparkles,
  Zap,
  Filter,
} from 'lucide-react';
import { CollectionCar, UserCarCollectionState, CarRarity } from '../../types';
import { MyGarageCollection, removeCarFromCollection, updateUserCollection, deleteUserCollection } from '../../services/myGarageService';
import { BrandLogo } from '../collection/BrandLogo';
import { CarDetailScreen } from '../collection/CarDetailScreen';
import { getCarNotes } from '../../services/myGarageService';
import { normalizeSearchText, matchCarQuery } from '../../utils/textUtils';

interface PlaylistDetailViewProps {
  playlist: MyGarageCollection;
  allSearchableCars: CollectionCar[];
  collectionMap: Record<string, UserCarCollectionState>;
  onBack: () => void;
  onPlaylistUpdated: () => void;
  onOpenAddCars: () => void;
}

export function PlaylistDetailView({
  playlist,
  allSearchableCars,
  collectionMap,
  onBack,
  onPlaylistUpdated,
  onOpenAddCars,
}: PlaylistDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterSpotted, setFilterSpotted] = useState<'all' | 'spotted' | 'unspotted'>('all');
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<CollectionCar | null>(null);

  // Edit title modal state
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [editTitle, setEditTitle] = useState(playlist.title);
  const [editDesc, setEditDesc] = useState(playlist.description || '');

  const notesMap = useMemo(() => getCarNotes(), []);

  // Filter cars in playlist
  const carsInPlaylist = useMemo(() => {
    return allSearchableCars.filter((c) => playlist.carIds.includes(c.id));
  }, [allSearchableCars, playlist.carIds]);

  const filteredCars = useMemo(() => {
    return carsInPlaylist.filter((car) => {
      const matchesSearch = matchCarQuery(car, searchQuery);
      const matchesRarity = filterRarity === 'all' || car.rarity.toLowerCase() === filterRarity.toLowerCase();

      const isSpotted = Boolean(collectionMap[car.id]?.isCollected);
      const matchesSpotted =
        filterSpotted === 'all' ||
        (filterSpotted === 'spotted' && isSpotted) ||
        (filterSpotted === 'unspotted' && !isSpotted);

      return matchesSearch && matchesRarity && matchesSpotted;
    });
  }, [carsInPlaylist, searchQuery, filterRarity, filterSpotted, collectionMap]);

  // Playlist stats
  const spottedCount = useMemo(() => {
    return carsInPlaylist.filter((c) => collectionMap[c.id]?.isCollected).length;
  }, [carsInPlaylist, collectionMap]);

  const percentageSpotted = carsInPlaylist.length > 0 ? Math.round((spottedCount / carsInPlaylist.length) * 100) : 0;

  const handleRemoveCar = (e: React.MouseEvent, carId: string) => {
    e.stopPropagation();
    removeCarFromCollection(playlist.id, carId);
    onPlaylistUpdated();
  };

  const handleSaveMeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    updateUserCollection(playlist.id, {
      title: editTitle.trim(),
      description: editDesc.trim() || undefined,
    });
    setIsEditingMeta(false);
    onPlaylistUpdated();
  };

  const getRarityBadge = (rarity: CarRarity) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-400/40';
      case 'Ultra Rare':
        return 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-400/40';
      case 'Epic':
        return 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-400/40';
      case 'Rare':
        return 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-400/40';
      case 'Uncommon':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-400/40';
      default:
        return 'text-zinc-600 dark:text-zinc-400 bg-zinc-500/10 border-zinc-400/40';
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Playlists</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsEditingMeta(true)}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Edit playlist name & description"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onOpenAddCars}
            className="text-xs px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Cars</span>
          </button>
        </div>
      </div>

      {/* Playlist Hero Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                Custom Playlist
              </span>
              <span className="text-[11px] text-zinc-400">
                {carsInPlaylist.length} {carsInPlaylist.length === 1 ? 'car' : 'cars'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {playlist.title}
            </h2>
            {playlist.description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {playlist.description}
              </p>
            )}
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {spottedCount} / {carsInPlaylist.length}
            </div>
            <div className="text-[10px] text-zinc-400">Spotted ({percentageSpotted}%)</div>
          </div>
        </div>

        {/* Spotted Progress Bar */}
        {carsInPlaylist.length > 0 && (
          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${percentageSpotted}%` }}
            />
          </div>
        )}
      </div>

      {/* Search & Filter Controls inside Playlist */}
      {carsInPlaylist.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80">
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cars in this playlist..."
                className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <select
              value={filterSpotted}
              onChange={(e) => setFilterSpotted(e.target.value as any)}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 font-medium outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="spotted">Spotted Only</option>
              <option value="unspotted">Unspotted Only</option>
            </select>
          </div>
        </div>
      )}

      {/* Cars Grid */}
      {carsInPlaylist.length === 0 ? (
        <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-2xl bg-zinc-200/70 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              This playlist is currently empty
            </h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
              Add your favorite production cars from the catalog or custom builds to curate this collection.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAddCars}
            className="text-xs px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Cars to Playlist</span>
          </button>
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-850/40 border border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
          No cars match your search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredCars.map((car) => {
            const isSpotted = Boolean(collectionMap[car.id]?.isCollected);
            const userState = collectionMap[car.id];
            const note = notesMap[car.id];

            return (
              <div
                key={car.id}
                onClick={() => setSelectedCarForDetail(car)}
                className="group p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-400/60 transition-all shadow-xs space-y-2.5 cursor-pointer relative"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => handleRemoveCar(e, car.id)}
                  className="absolute top-3 right-3 p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer z-10"
                  title="Remove from playlist"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3 pr-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1.5 flex items-center justify-center shrink-0">
                    <BrandLogo brand={car.brand} className="w-7 h-7 object-contain" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {car.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {car.brand} &bull; {car.yearIntroduced || 'Modern'}
                    </p>
                  </div>
                </div>

                {/* Badges row */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRarityBadge(
                      car.rarity
                    )}`}
                  >
                    {car.rarity}
                  </span>

                  <div className="flex items-center gap-1">
                    {isSpotted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Spotted</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                        <Camera className="w-3 h-3" />
                        <span>Unspotted</span>
                      </span>
                    )}
                  </div>
                </div>

                {note && (
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-800/60 p-1.5 rounded-lg truncate">
                    "{note}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Title & Description Modal */}
      {isEditingMeta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveMeta}
            className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Edit Playlist Details
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingMeta(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Playlist Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                maxLength={40}
                required
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Description (Optional)
              </label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                maxLength={120}
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500/30 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingMeta(false)}
                className="px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-xs"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Car Detail Screen Modal */}
      {selectedCarForDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden max-h-[95vh] flex flex-col border border-zinc-200 dark:border-zinc-800">
            <CarDetailScreen
              car={selectedCarForDetail}
              state={collectionMap[selectedCarForDetail.id]}
              onBack={() => setSelectedCarForDetail(null)}
              onStateUpdate={() => {
                onPlaylistUpdated();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
