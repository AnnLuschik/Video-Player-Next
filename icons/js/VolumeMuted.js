function SvgVolumeMuted({ size, ...restProps }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} viewBox="0 0 24 24" height={size} {...restProps}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 9v6h4l5 5V4l-5 5H7z" />
    </svg>
  );
}

export default SvgVolumeMuted;
