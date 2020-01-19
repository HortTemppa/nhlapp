import React, { createContext, useContext, useMemo } from "react";
import NHLService from "../services/NHLService";

export const NHLContext = createContext(undefined);

export const NHLProvider = ({ children }) => {
  const hockeyService = useMemo(() => new NHLService(), []);

  return (
    <NHLContext.Provider value={hockeyService}>{children}</NHLContext.Provider>
  );
};

export function useNHLService() {
  const service = useContext(NHLContext);

  if (service === undefined) {
    throw new Error("useSpeciesService called outside of SpeciesProvider");
  }

  return service;
}
