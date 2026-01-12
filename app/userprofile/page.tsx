"use client"
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Star, Info } from 'lucide-react';

const DevAskProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [userdetails, setUserdetails] = useState<any>(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("/api/userprofile");
        const data = await response.json();
        setUserdetails(data);
      } catch (error) {
        console.error("Error fetching achu's profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  if (isLoading) return <div className="p-20 text-center">Loading Achu's Profile...</div>;
  console.log(setUserdetails);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img 
            src={`https://ui-avatars.com/api/?name=${userdetails?.name || 'achu'}&background=0D8ABC&color=fff`} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            alt="Avatar"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{userdetails?.name || "achu"}</h1>
            <p className="text-blue-600 font-medium">{userdetails?.role || "Developer"}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400"/> {userdetails?.reputation || 0} Rep</span>
              <span className="flex items-center gap-1"><MapPin size={14}/> Kochi, Kerala</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Tab */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h3 className="font-bold text-gray-900 mb-4">About Me</h3>
          <p className="text-gray-600 italic mb-6">
            {userdetails?.bio || "No bio added yet. Click settings to update!"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-400 font-bold uppercase">Email</span>
              <p className="text-gray-900">{userdetails?.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-400 font-bold uppercase">Account ID</span>
              <p className="text-gray-500 font-mono text-xs">{userdetails?.userId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevAskProfile;