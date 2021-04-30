export const popper_max_size = {
  name:     'applyMaxSize',
  enabled:  true,
  phase:    'beforeWrite' as 'beforeWrite',
  requires: ['maxSize'],
  fn(st: any): void {
    const {height}                = st.state.modifiersData.maxSize;
    st.state.styles.popper.maxHeight = `${height}px`;
  }
};
