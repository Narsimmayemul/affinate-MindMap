// zoomStore.js
import create from 'zustand';

const useZoomStore = create((set) => ({
  zoomLevel: 1, // Initial zoom level
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
}));

export default useZoomStore;
