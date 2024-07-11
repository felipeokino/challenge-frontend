import { Settings, Trash } from 'lucide-react';
import Button from '../../components/Button/button';
import Loading from '../../components/Loading/loading';
import ProgressBar from '../../components/ProgressBar/progressBar';
import useSeeds from '../../hooks/useSeeds';

const Seeds = () => {
  const { populateSeeds, deleteSeeds, progress, isLoading } = useSeeds();
  const handleClickClear = async () => {
    await deleteSeeds()
  }

  const handleClickStart = async () => {
    await populateSeeds()
  }
  return (
    <div className='flex flex-col gap-4 p-4 text-lg'>
      <h1>Seeds</h1>
      <span>- Create seeds will help you create a 50 products for your store. </span>
      <span>
        - Clear all seeds will delete all the products created.
      </span>
      <div className='mt-6 flex gap-4'>
        <Button onClick={handleClickStart}>Run Seed <Settings /></Button>
        <Button variant='danger' onClick={handleClickClear}>Clear all Seeds <Trash /></Button>
      </div>
      {isLoading && (
        <div className='flex justify-center items-center mt-32'>
          <Loading size='medium' />
        </div>
      )}
      {!!progress && <ProgressBar progress={progress} />}
    </div>
  )
}

export default Seeds