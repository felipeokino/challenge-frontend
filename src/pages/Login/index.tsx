import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/')
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-zinc-700 gap-8'>
            <h1 className='text-4xl font-bold text-white'>Login</h1>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all' onClick={handleClickLogin}>Login</button>
        </div>
    )
}

export default Login