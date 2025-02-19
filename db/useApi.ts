import { useCallback, useState } from "react";
import { Alert } from "react-native";

export function useApi<T extends Record<string, any>>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (fetchParams: Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchParams;
      setData(result);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  return { fetchData, data, loading };
}
