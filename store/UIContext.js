import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const openAuthModal = () => setAuthModalVisible(true);
  const closeAuthModal = () => setAuthModalVisible(false);

  const value = {
    authModalVisible,
    openAuthModal,
    closeAuthModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
