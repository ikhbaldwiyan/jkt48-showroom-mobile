import { useState, useEffect } from 'react';
import { getStorage } from "../storage";

const useUser = () => {
  const [profile, setProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getStorage('profile');
        const userProfileData = await getStorage('userProfile');
        const userData = await getStorage('user');
        const sessionData = await getStorage('session');

        setProfile(profileData);
        setUserProfile(userProfileData);
        setUser(userData);
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { profile, userProfile, user, session };
};

export default useUser;
