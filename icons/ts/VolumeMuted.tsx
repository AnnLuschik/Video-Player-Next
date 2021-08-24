import * as React from 'react';

function SvgVolumeMuted(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 9v6h4l5 5V4l-5 5H7z" />
    </svg>
  );
}

export default SvgVolumeMuted;
