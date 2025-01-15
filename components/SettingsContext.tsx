import React, { createContext, useContext, useState } from 'react';

// Define el tipo para todas las configuraciones de la aplicación
interface Settings {
  rate: number; // Ratio de conversión
  // Añade más configuraciones aquí si es necesario
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void; // Actualizar una o más configuraciones
}

// Crea el contexto
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Proveedor del contexto
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    rate: 145.23, // Valor inicial para el ratio
    // Inicializa más configuraciones aquí
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook para usar el contexto
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe ser usado dentro de un SettingsProvider');
  }
  return context;
};
