import { useState, useEffect, useRef } from 'react';
import { SelectedPlace, RouteCalculationResult, RouteCalculationError } from '@/types';
import { RoutingService } from '@/services/routingService';

export interface UseRouteCalculationProps {
  pickup: SelectedPlace | null;
  destination: SelectedPlace | null;
}

export interface UseRouteCalculationReturn {
  routeResult: RouteCalculationResult | null;
  isLoading: boolean;
  error: RouteCalculationError | null;
  recalculate: () => void;
}

export function useRouteCalculation({
  pickup,
  destination,
}: UseRouteCalculationProps): UseRouteCalculationReturn {
  const [routeResult, setRouteResult] = useState<RouteCalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<RouteCalculationError | null>(null);

  // Request ID tracking to prevent race conditions
  const currentRequestId = useRef<number>(0);

  const calculate = async () => {
    const requestId = ++currentRequestId.current;

    if (!pickup || !destination) {
      setRouteResult(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Check identical locations
    if (
      (pickup.placeId && pickup.placeId === destination.placeId) ||
      (pickup.coordinates.lat === destination.coordinates.lat &&
        pickup.coordinates.lng === destination.coordinates.lng)
    ) {
      setRouteResult(null);
      setError({
        kind: 'SAME_LOCATIONS',
        message: 'Pickup and destination cannot be identical. Please select distinct locations.',
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { result, error: calcError } = await RoutingService.calculateRoute(pickup, destination);

    // If a newer request has already started, discard this result
    if (requestId !== currentRequestId.current) {
      return;
    }

    setIsLoading(false);

    if (calcError) {
      setRouteResult(null);
      setError(calcError);
    } else if (result) {
      setRouteResult(result);
      setError(null);
    }
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, destination]);

  return {
    routeResult,
    isLoading,
    error,
    recalculate: calculate,
  };
}
