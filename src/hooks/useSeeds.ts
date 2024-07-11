import { useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

const useSeeds = () => {
  const [cookies] = useCookies(['user']);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const deleteSeeds = async () => {
    setIsLoading(true)
    try {
      await api.delete('/seeds', {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        },
        responseType: 'stream',
        onDownloadProgress: (progressEvent) => {
          const progress = progressEvent.event.currentTarget.response
          setProgress(progress.match(/.*(\s\d+)/)?.[1].trim() || '0')
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  const populateSeeds = async () => {
    try {
      await api.post('/seeds', {}, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        },
      })
    } catch (error) {
      console.log(error)
    }
  };

  return {
    populateSeeds,
    deleteSeeds,
    progress,
    isLoading
  };
}

export default useSeeds;