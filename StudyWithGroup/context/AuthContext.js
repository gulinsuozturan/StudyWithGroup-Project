import React, {createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const register = (email, password) => {
        setIsLoading(true);
    
        axios
          .post('${BASE_URL}/User/Login', {
            Email: email,
            Password: password,
          })
          .then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
          })
          .catch(e => {
            console.log('register error ${e}');
            setIsLoading(false);
          });
      };

    return(
        <AuthContext.Provider value = {register}>{children}</AuthContext.Provider>
    );
    
};
