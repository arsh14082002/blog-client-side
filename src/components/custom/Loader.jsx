import { LoaderCircle } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="animate-spin text-blue-500" size={48} />
    </div>
  );
};

export default Loader;
