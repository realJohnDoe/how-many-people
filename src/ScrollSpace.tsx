type ScrollSpaceProps = {
  numItems: number;
  itemDistance: number; // px
  onIndexChange?: (index: number) => void;

  /** Controlled scroll target */
  scrollToIndex?: number;
};
