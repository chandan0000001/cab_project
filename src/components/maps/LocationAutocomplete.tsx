import { useState, useEffect, useRef, useId, useCallback } from 'react';
import { MapPin, Search, X, Loader2, AlertCircle } from 'lucide-react';
import { SelectedPlace } from '@/types';
import { GeocodingService } from '@/services/geocodingService';
import { IpLocationService, UserIpLocation } from '@/services/ipLocationService';

export interface LocationAutocompleteProps {
  id?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value: SelectedPlace | null;
  onChange: (place: SelectedPlace | null) => void;
  error?: string;
  iconColor?: string;
  excludePlaceId?: string;
  helperText?: string;
}

export function LocationAutocomplete({
  id,
  label,
  placeholder = 'Search cities, railway stations, landmarks...',
  required = false,
  disabled = false,
  value,
  onChange,
  error,
  iconColor = 'text-brand-600',
  excludePlaceId,
  helperText,
}: LocationAutocompleteProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const [inputValue, setInputValue] = useState<string>(value ? value.displayName : '');
  const [predictions, setPredictions] = useState<SelectedPlace[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [userLocation, setUserLocation] = useState<UserIpLocation | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract approximate user location from IP/network headers on mount
  useEffect(() => {
    let mounted = true;
    IpLocationService.getUserIpLocation().then((loc) => {
      if (mounted) {
        setUserLocation(loc);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Sync internal input value when external selected place changes
  useEffect(() => {
    if (value) {
      setInputValue(value.displayName);
    } else {
      setInputValue('');
    }
  }, [value]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch location suggestions with debounce, sorted nearest to farthest from user's IP coordinates
  const fetchSuggestions = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const userCoords = userLocation
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : null;

      const trimmed = query.trim();
      if (trimmed.length < 2) {
        const presets = GeocodingService.getFallbackPresets('', excludePlaceId, userCoords);
        setPredictions(presets);
        setIsLoading(false);
        setIsOpen(true);
        return;
      }

      setIsLoading(true);

      debounceTimerRef.current = setTimeout(async () => {
        const results = await GeocodingService.searchLocations(trimmed, excludePlaceId, userCoords);
        setPredictions(results);
        setIsLoading(false);
        setIsOpen(true);
      }, 300);
    },
    [excludePlaceId, userLocation]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    setActiveIndex(-1);

    // If text was modified after a place was selected, invalidate the selection
    if (value && text !== value.displayName) {
      onChange(null);
    }

    if (text.trim().length >= 1) {
      fetchSuggestions(text);
    } else {
      const userCoords = userLocation
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : null;
      setPredictions(GeocodingService.getFallbackPresets('', excludePlaceId, userCoords));
      setIsOpen(true);
    }
  };

  const handleSelectPlace = (place: SelectedPlace) => {
    setInputValue(place.displayName);
    onChange(place);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange(null);
    setPredictions([]);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        const userCoords = userLocation
          ? { lat: userLocation.latitude, lng: userLocation.longitude }
          : null;
        setPredictions(GeocodingService.getFallbackPresets('', excludePlaceId, userCoords));
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : predictions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < predictions.length) {
          handleSelectPlace(predictions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full space-y-1.5">
      {/* Field Label */}
      <label
        htmlFor={inputId}
        className="block text-xs font-bold text-navy-800 tracking-wide"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input Field Container */}
      <div className="relative flex items-center">
        {/* Left Icon */}
        <div className={`absolute left-3.5 pointer-events-none flex items-center ${iconColor}`}>
          <MapPin className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => {
            const userCoords = userLocation
              ? { lat: userLocation.latitude, lng: userLocation.longitude }
              : null;
            if (inputValue.trim().length >= 1) {
              fetchSuggestions(inputValue);
            } else {
              setPredictions(GeocodingService.getFallbackPresets('', excludePlaceId, userCoords));
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={`${inputId}-listbox`}
          aria-invalid={!!error}
          className={`w-full bg-white text-navy-900 border text-sm rounded-lg py-2.5 pl-10 pr-10 transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 disabled:bg-navy-50 disabled:text-navy-400 disabled:cursor-not-allowed ${
            error
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
              : value
              ? 'border-brand-400 bg-brand-50/20'
              : 'border-navy-200 hover:border-navy-300'
          }`}
        />

        {/* Clear or Loading Icon */}
        <div className="absolute right-3 flex items-center">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
          ) : inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear location"
              className="text-navy-400 hover:text-navy-700 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="w-4 h-4 text-navy-400 pointer-events-none" />
          )}
        </div>
      </div>

      {/* Inline Validation / Helper message */}
      {error && (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
      {!error && helperText && (
        <p className="text-[11px] text-navy-500">{helperText}</p>
      )}

      {/* Autocomplete Dropdown Listbox */}
      {isOpen && (
        <div
          id={`${inputId}-listbox`}
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white rounded-xl shadow-elevated border border-navy-100 max-h-64 overflow-y-auto divide-y divide-navy-50 animate-in fade-in-50 duration-150"
        >
          {predictions.length > 0 ? (
            predictions.map((item, index) => {
              const isSelected = activeIndex === index;
              return (
                <div
                  key={item.placeId || `${item.displayName}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectPlace(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`p-3 cursor-pointer transition-colors flex items-start gap-3 text-left ${
                    isSelected ? 'bg-brand-50/80 text-brand-950' : 'hover:bg-sand-50 text-navy-900'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-sand-100 flex items-center justify-center text-brand-700 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate leading-tight">
                      {item.displayName}
                    </p>
                    {item.formattedAddress && (
                      <p className="text-xs text-navy-500 truncate mt-0.5">
                        {item.formattedAddress}
                      </p>
                    )}
                  </div>
                  {item.isPopularPreset && (
                    <span className="text-[10px] bg-sand-100 text-navy-600 px-1.5 py-0.5 rounded font-medium self-center shrink-0">
                      Odisha Hub
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-navy-500">
              No matching locations found. Try typing a major city, district, or landmark.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
